const assert = require('node:assert/strict')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

// Smoke test with the installed Edge browser; no browser download is needed.
async function main() {
  const { createServer } = await import('vite')
  const server = await createServer({ server: { host: '127.0.0.1', port: 0 } })
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-browser-'))
  let browser
  let socket
  try {
    await server.listen()
    const url = `http://127.0.0.1:${server.httpServer.address().port}`
    const executable =
      process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
    browser = spawn(
      executable,
      [
        '--headless',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--remote-debugging-port=0',
        `--user-data-dir=${profile}`,
        'about:blank'
      ],
      { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] }
    )
    const endpoint = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Edge startup timed out')), 20000)
      let output = ''
      browser.once('error', reject)
      browser.stderr.on('data', (chunk) => {
        output += chunk
        const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/)
        if (match) {
          clearTimeout(timer)
          resolve(match[1])
        }
      })
    })
    socket = new WebSocket(endpoint)
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true })
      socket.addEventListener('error', reject, { once: true })
    })
    let nextId = 0
    const pending = new Map()
    const errors = []
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data)
      if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails)
      const handler = pending.get(message.id)
      if (handler) {
        pending.delete(message.id)
        clearTimeout(handler.timer)
        message.error
          ? handler.reject(new Error(message.error.message))
          : handler.resolve(message.result)
      }
    })
    const send = (method, params = {}, sessionId) =>
      new Promise((resolve, reject) => {
        const id = ++nextId
        const timer = setTimeout(() => {
          pending.delete(id)
          reject(new Error(`CDP timed out: ${method}`))
        }, 15000)
        pending.set(id, { resolve, reject, timer })
        socket.send(JSON.stringify({ id, method, params, sessionId }))
      })
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
    const command = (method, params) => send(method, params, sessionId)
    const evaluate = async (expression) => {
      const result = await command('Runtime.evaluate', {
        expression,
        awaitPromise: true,
        returnByValue: true
      })
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
      return result.result.value
    }
    await command('Runtime.enable')
    await command('Page.enable')
    await command('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false
    })
    await command('Page.navigate', { url })
    await evaluate(`new Promise((resolve, reject) => {
      const started = Date.now();
      const timer = setInterval(() => {
        if (document.querySelectorAll('.project-card').length === 13) { clearInterval(timer); resolve(true); }
        else if (Date.now() - started > 12000) { clearInterval(timer); reject(new Error('Projects did not render')); }
      }, 50);
    })`)

    const projects = JSON.parse(fs.readFileSync('src/data/data.json', 'utf8'))
    for (const [buttonIndex, category] of [
      [1, 'profissional'],
      [2, 'academico'],
      [3, 'wordpress'],
      [0, null]
    ]) {
      const expected = (category ? [category] : ['profissional', 'academico', 'wordpress'])
        .flatMap((group) => projects.filter((project) => project.category === group))
        .map((project) => project.name)
      const actual = await evaluate(`(async () => {
        const buttons = document.querySelectorAll('.category-selector__button');
        buttons[${buttonIndex}].click();
        await new Promise(resolve => requestAnimationFrame(resolve));
        return {
          names: [...document.querySelectorAll('.project-card__title')].map(el => el.textContent),
          active: [...buttons].filter(el => el.getAttribute('aria-pressed') === 'true').length,
          selected: buttons[${buttonIndex}].getAttribute('aria-pressed')
        };
      })()`)
      assert.deepEqual(actual.names, expected)
      assert.equal(actual.active, 1)
      assert.equal(actual.selected, 'true')
    }
    assert.equal(await evaluate("document.querySelectorAll('.project-card__section').length"), 39)
    assert.equal(
      await evaluate('document.querySelectorAll(\'.project-card__link[href=""]\').length'),
      0
    )
    assert.equal(
      await evaluate("document.querySelectorAll('.project-card__unavailable').length"),
      projects.filter((project) => !project.url).length
    )
    assert.equal(await evaluate("document.querySelectorAll('.project-card__category').length"), 13)

    fs.mkdirSync('node_modules/.tmp', { recursive: true })
    for (const width of [1440, 1100, 768, 390, 320]) {
      await command('Emulation.setDeviceMetricsOverride', {
        width,
        height: 1000,
        deviceScaleFactor: 1,
        mobile: false
      })
      await evaluate(`(async () => {
        document.querySelector('.projects').scrollIntoView();
        await Promise.all([...document.querySelectorAll('.project-card__preview')].slice(0, 2).map(el => el.decode()));
        await new Promise(resolve => setTimeout(resolve, 600));
      })()`)
      const layout = await evaluate(`(() => {
        const grid = document.querySelector('.projects__grid');
        const section = document.querySelector('.projects').getBoundingClientRect();
        return {
          columns: getComputedStyle(grid).gridTemplateColumns.split(' ').length,
          overflow: grid.scrollWidth > grid.clientWidth,
          outside: [...grid.children].some(el => el.getBoundingClientRect().right > section.right + 1),
          x: section.x, y: section.y + window.scrollY, width: section.width
        };
      })()`)
      assert.equal(layout.columns, width > 1100 ? 3 : width > 760 ? 2 : 1)
      assert.equal(layout.overflow, false)
      assert.equal(layout.outside, false)
      if (width === 1440 || width === 390) {
        const screenshot = await command('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: true,
          clip: { x: layout.x, y: layout.y, width: layout.width, height: 1150, scale: 1 }
        })
        fs.writeFileSync(
          `node_modules/.tmp/projects-${width}.png`,
          Buffer.from(screenshot.data, 'base64')
        )
      }
    }

    const fixture = {
      ...projects[1],
      id: 'video-fixture',
      media: {
        type: 'video',
        src: '/test-demo.webm',
        poster: '/images/ghibli.png',
        alt: 'Project video preview',
        captions: '/test-captions.vtt'
      }
    }
    await command('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false
    })
    await evaluate(`(async () => {
      const vueUrl = performance.getEntriesByType('resource').find(entry => new URL(entry.name).pathname.endsWith('/deps/vue.js')).name;
      const { createApp, nextTick } = await import(vueUrl);
      const { default: CardProject } = await import('/src/components/CardProject.vue');
      const canvas = document.createElement('canvas'); canvas.width = 640; canvas.height = 360;
      const context = canvas.getContext('2d');
      const draw = () => {
        context.fillStyle = '#183f36'; context.fillRect(0, 0, 640, 360);
        context.fillStyle = '#ffffff'; context.font = '32px sans-serif';
        context.fillText('Portfolio video preview', 140, 185);
      };
      draw();
      const stream = canvas.captureStream(10);
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      const chunks = [];
      recorder.ondataavailable = event => chunks.push(event.data);
      const recorded = new Promise(resolve => recorder.onstop = resolve);
      recorder.start();
      const drawing = setInterval(draw, 100);
      await new Promise(resolve => setTimeout(resolve, 2000));
      recorder.stop(); await recorded; clearInterval(drawing);
      stream.getTracks().forEach(track => track.stop());
      const clipUrl = URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
      const project = ${JSON.stringify(fixture)};
      project.media.src = clipUrl; delete project.media.captions;
      const host = document.createElement('div'); host.id = 'video-fixture-host'; document.body.append(host);
      host.style.cssText = 'position:fixed;top:80px;left:40px;width:320px;z-index:9999;max-height:800px;overflow:auto';
      const app = createApp(CardProject, { project });
      app.mount(host); await nextTick();
      window.videoTest = { app, host, clipUrl, createApp, CardProject, project, nextTick, dialog: [...document.querySelectorAll('.video-modal')].at(-1) };
      return true;
    })()`)
    const click = async (selector) => {
      const { x, y } = await evaluate(`(() => {
        const rect = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      })()`)
      await command('Input.dispatchMouseEvent', {
        type: 'mousePressed',
        x,
        y,
        button: 'left',
        clickCount: 1
      })
      await command('Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        x,
        y,
        button: 'left',
        clickCount: 1
      })
      await evaluate('new Promise(resolve => requestAnimationFrame(resolve))')
    }
    assert.equal(await evaluate("!!videoTest.host.querySelector('.video-preview__play')"), true)
    assert.equal(
      await evaluate("videoTest.host.querySelector('.video-preview img').getAttribute('src')"),
      '/images/ghibli.png'
    )
    assert.equal(await evaluate('videoTest.dialog.open'), false)
    assert.equal(
      await evaluate("videoTest.dialog.querySelector('.video-modal__player').hasAttribute('src')"),
      false
    )
    await click('#video-fixture-host .video-preview')
    const video = await evaluate(`(async () => {
      const el = videoTest.dialog.querySelector('.video-modal__player');
      await new Promise((resolve, reject) => {
        const started = Date.now();
        const timer = setInterval(() => {
          if (el.readyState >= 2 && !el.paused) { clearInterval(timer); resolve(); }
          else if (Date.now() - started > 4000) { clearInterval(timer); reject(new Error('Video did not play')); }
        }, 20);
      });
      const dialog = videoTest.dialog;
      const bounds = dialog.getBoundingClientRect();
      return { controls: el.controls, playsInline: el.playsInline, open: dialog.open,
        scrollLocked: document.body.style.overflow === 'hidden',
        focused: document.activeElement.classList.contains('video-modal__close'),
        centered: Math.abs(bounds.x + bounds.width / 2 - innerWidth / 2) < 2 && Math.abs(bounds.y + bounds.height / 2 - innerHeight / 2) < 2,
        enlarged: el.clientWidth > videoTest.host.clientWidth };
    })()`)
    assert.deepEqual(video, {
      controls: true,
      playsInline: true,
      open: true,
      scrollLocked: true,
      focused: true,
      centered: true,
      enlarged: true
    })
    const screenshot = await command('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('node_modules/.tmp/video-modal.png', Buffer.from(screenshot.data, 'base64'))
    for (const method of ['button', 'escape', 'backdrop']) {
      if (method !== 'button') await click('#video-fixture-host .video-preview')
      if (method === 'button') await click('.video-modal[open] .video-modal__close')
      if (method === 'escape') {
        await command('Input.dispatchKeyEvent', {
          type: 'keyDown',
          key: 'Escape',
          code: 'Escape',
          windowsVirtualKeyCode: 27
        })
        await command('Input.dispatchKeyEvent', {
          type: 'keyUp',
          key: 'Escape',
          code: 'Escape',
          windowsVirtualKeyCode: 27
        })
      }
      if (method === 'backdrop') {
        await command('Input.dispatchMouseEvent', {
          type: 'mousePressed',
          x: 5,
          y: 5,
          button: 'left',
          clickCount: 1
        })
        await command('Input.dispatchMouseEvent', {
          type: 'mouseReleased',
          x: 5,
          y: 5,
          button: 'left',
          clickCount: 1
        })
      }
      await evaluate('new Promise(resolve => setTimeout(resolve, 50))')
      assert.deepEqual(
        await evaluate(`(() => ({
        open: videoTest.dialog.open,
        paused: videoTest.dialog.querySelector('.video-modal__player').paused,
        scrollRestored: document.body.style.overflow === '',
        focusRestored: document.activeElement === videoTest.host.querySelector('.video-preview')
      }))()`),
        { open: false, paused: true, scrollRestored: true, focusRestored: true }
      )
    }
    await command('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: false
    })
    await click('#video-fixture-host .video-preview')
    assert.equal(
      await evaluate(`(() => {
      const rect = videoTest.dialog.getBoundingClientRect();
      return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight;
    })()`),
      true
    )
    await evaluate(`(async () => {
      videoTest.dialog.querySelector('.video-modal__player').dispatchEvent(new Event('error'));
      await videoTest.nextTick();
    })()`)
    assert.equal(
      await evaluate("!!document.querySelector('.video-modal[open] .video-modal__error')"),
      true
    )
    await evaluate(`(async () => {
      const { host, app, createApp, CardProject, project, nextTick } = videoTest;
      app.unmount();
      delete project.media.poster;
      videoTest.app = createApp(CardProject, { project });
      videoTest.app.mount(host); await nextTick();
      videoTest.dialog = [...document.querySelectorAll('.video-modal')].at(-1);
    })()`)
    assert.equal(await evaluate('document.body.style.overflow'), '')
    assert.equal(await evaluate("videoTest.host.querySelector('.video-preview video').muted"), true)
    await click('#video-fixture-host .video-preview')
    assert.equal(await evaluate('videoTest.dialog.open'), true)
    await evaluate(
      'videoTest.app.unmount(); videoTest.host.remove(); URL.revokeObjectURL(videoTest.clipUrl)'
    )
    assert.equal(await evaluate('videoTest.dialog.isConnected'), false)
    assert.equal(await evaluate('document.body.style.overflow'), '')
    assert.equal(new Set(projects.map((project) => project.id)).size, projects.length)
    for (const project of projects) {
      assert.ok(project.objective && project.learnings && project.features.length)
      if (project.media.src.startsWith('/')) {
        assert.ok(fs.existsSync(path.join('public', project.media.src)))
      }
      assert.ok(!JSON.stringify(project).includes('\uFFFD'))
    }
    assert.deepEqual(errors, [])
    console.log(
      'PASS: filters, cards, grid at 5 widths, video preview, real playback, centered modal, close button/Escape/backdrop, focus restoration, mobile layout and error fallback.'
    )
  } finally {
    if (socket?.readyState === WebSocket.OPEN) socket.close()
    if (browser && browser.exitCode === null) {
      const closed = new Promise((resolve) => browser.once('exit', resolve))
      browser.kill()
      await closed
    }
    await server.close()
    // Delete only the unique temporary browser profile created by this test.
    if (
      path.dirname(profile) === path.resolve(os.tmpdir()) &&
      path.basename(profile).startsWith('portfolio-browser-')
    ) {
      fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 })
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
