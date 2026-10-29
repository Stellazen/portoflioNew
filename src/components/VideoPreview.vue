<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { ProjectMedia } from '../data/projects'

const props = defineProps<{
  media: Extract<ProjectMedia, { type: 'video' }>
  name: string
}>()

const dialog = ref<HTMLDialogElement | null>(null)
const player = ref<HTMLVideoElement | null>(null)
const isOpen = ref(false)
const posterFailed = ref(false)
const previewFailed = ref(false)
const playbackFailed = ref(false)
let previousOverflow: string | null = null

async function openVideo() {
  if (!dialog.value || dialog.value.open) return
  playbackFailed.value = false
  isOpen.value = true
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  dialog.value.showModal()
  await nextTick()
  // The controls remain available if the browser declines programmatic playback.
  await player.value?.play().catch(() => {})
}

function onClosed() {
  player.value?.pause()
  isOpen.value = false
  if (previousOverflow !== null) {
    document.body.style.overflow = previousOverflow
    previousOverflow = null
  }
}

function closeVideo() {
  dialog.value?.close()
  onClosed()
}

function onDialogClick(event: MouseEvent) {
  if (event.target !== dialog.value || !dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    closeVideo()
}

watch(
  () => props.media.src,
  () => {
    closeVideo()
    posterFailed.value = false
    previewFailed.value = false
  }
)
onBeforeUnmount(closeVideo)
</script>

<template>
  <button
    class="video-preview"
    type="button"
    aria-haspopup="dialog"
    :aria-label="`Reproduzir vídeo de ${name}`"
    @click="openVideo"
  >
    <img
      v-if="media.poster && !posterFailed"
      class="video-preview__image"
      :src="media.poster"
      :alt="media.alt"
      loading="lazy"
      decoding="async"
      @error="posterFailed = true"
    />
    <video
      v-else-if="!previewFailed"
      class="video-preview__image"
      :src="media.src"
      preload="metadata"
      muted
      playsinline
      aria-hidden="true"
      tabindex="-1"
      @error="previewFailed = true"
    />
    <span v-else class="video-preview__fallback">Vídeo do projeto</span>
    <span class="video-preview__play" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  </button>

  <Teleport to="body">
    <dialog
      ref="dialog"
      class="video-modal"
      :aria-label="`Vídeo do projeto ${name}`"
      @click="onDialogClick"
      @close="onClosed"
    >
      <div class="video-modal__header">
        <h2 class="video-modal__title">{{ name }}</h2>
        <button
          class="video-modal__close"
          type="button"
          aria-label="Fechar vídeo"
          autofocus
          @click="closeVideo"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <p v-if="playbackFailed" class="video-modal__error" role="status">
        Não foi possível carregar este vídeo.
        <a :href="media.src" target="_blank" rel="noopener noreferrer">Abrir arquivo de vídeo</a>
      </p>
      <video
        v-else
        ref="player"
        class="video-modal__player"
        :src="isOpen ? media.src : undefined"
        :poster="media.poster"
        :aria-label="media.alt"
        controls
        playsinline
        preload="none"
        @error="playbackFailed = true"
      >
        <track
          v-if="media.captions"
          kind="captions"
          :src="media.captions"
          srclang="pt-BR"
          label="Português"
          default
        />
        Seu navegador não suporta vídeos.
      </video>
    </dialog>
  </Teleport>
</template>

<style scoped>
.video-preview {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: #111;
  color: var(--white);
  cursor: pointer;
}
.video-preview__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
}
.video-preview__play {
  position: absolute;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  border: 2px solid var(--white);
  border-radius: 50%;
  background: rgb(0 0 0 / 72%);
  box-shadow: 0 4px 24px rgb(0 0 0 / 35%);
  transition:
    background-color 0.2s,
    transform 0.2s;
}
.video-preview:hover .video-preview__play {
  background: #2d413b;
  transform: scale(1.08);
}
.video-preview:focus-visible {
  outline: 3px solid var(--soft_yellow);
  outline-offset: -5px;
}
.video-preview__fallback {
  padding: 24px;
  font: inherit;
}
.video-modal {
  width: min(1100px, calc(100% - 32px));
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 20px;
  overflow: auto;
  border: 1px solid #555;
  border-radius: 16px;
  background: var(--black);
  color: var(--white);
  box-shadow: 0 24px 80px rgb(0 0 0 / 50%);
}
.video-modal::backdrop {
  background: rgb(0 0 0 / 82%);
}
.video-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}
.video-modal__title {
  font: 1.125rem var(--font-title);
  overflow-wrap: anywhere;
}
.video-modal__close {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid #666;
  border-radius: 50%;
  background: transparent;
  color: var(--white);
  cursor: pointer;
}
.video-modal__close:hover {
  background: #333;
}
.video-modal__close:focus-visible,
.video-modal__error a:focus-visible {
  outline: 3px solid var(--soft_yellow);
  outline-offset: 3px;
}
.video-modal__player {
  display: block;
  width: 100%;
  max-height: calc(100dvh - 160px);
  aspect-ratio: 16 / 9;
  background: #000;
  object-fit: contain;
}
.video-modal__error {
  padding: 40px 16px;
}
.video-modal__error a {
  color: var(--soft_green);
}
@media (max-width: 480px) {
  .video-modal {
    padding: 12px;
  }
  .video-modal__title {
    font-size: 1rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .video-preview__play {
    transition: none;
  }
}
</style>
