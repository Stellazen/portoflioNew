# Portfólio

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original-wordmark.svg"  width='60px' /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width='40px' /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width='40px' /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width='40px' /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width='40px' /><br>
 Porfólio criado para exibir meus principais trabalhos e projetos. Feito em Vue js + Typescript, utilizando o padrão BEM de CSS.<br> 
 Ele possui filtragem de projetos por categoria (Profissionais, Acadêmicos e WordPress), cards em um grid responsivo, envio de formulário via FormSubmit sem sair da página e animações com a biblioteca AOS nas seções de apresentação.<br>
 
<a href="https://stella-portoflio.vercel.app/">✨ Link do deploy </a><br>

![image](https://github.com/user-attachments/assets/06f5971f-2da7-4577-be69-78eef86e59c8)

## Cadastro de projetos

Os projetos ficam em `src/data/data.json`. Cada item possui `id` único, `name`, `description` (resumo), `technologies`, `objective`, `features` (lista), `learnings`, `url`, `creation_date`, `category` e `media`. Use `url: ""` quando o projeto não tiver um link público.

As categorias aceitas são `profissional`, `academico` e `wordpress`. Cada projeto pertence a uma categoria; trabalhos feitos em WordPress ficam no filtro WordPress. O filtro Todos reúne os projetos das três categorias. A categoria também aparece como tag no card.

Os textos foram adaptados das descrições já cadastradas. Ao atualizar um projeto, descreva apenas as funcionalidades implementadas.

Para uma imagem, use:

```json
"media": {
  "type": "image",
  "src": "/images/ghibli.png",
  "alt": "Interface do catálogo de filmes do Studio Ghibli"
}
```

Para um vídeo no lugar da imagem, substitua o objeto `media`:

```json
"media": {
  "type": "video",
  "src": "/videos/ghibli-demo.mp4",
  "poster": "/images/ghibli.png",
  "alt": "Demonstração dos filtros do catálogo Studio Ghibli",
  "captions": "/videos/ghibli-demo.pt-BR.vtt"
}
```

Coloque os arquivos em `public/images` ou `public/videos`, usando o caminho a partir da raiz no JSON. Também é possível usar uma URL direta de arquivo de mídia. Links de páginas do YouTube ou Vimeo não são aceitos pelo player nativo.

`poster` (capa) e `captions` (legendas WebVTT) são opcionais. Os nomes de vídeo e legenda acima são exemplos: adicione os arquivos reais antes de usá-los. O card mostra a capa com um botão de play central; sem capa, tenta mostrar a prévia do próprio vídeo. Ao clicar, o vídeo abre em uma janela maior no centro da tela e inicia a reprodução, com controles disponíveis. Feche pelo botão, pela tecla Esc ou clicando fora da janela. Até receber os vídeos, os projetos mantêm suas imagens atuais.

## Verificação

```sh
npm install
npm run dev
npm run build
```

O teste de interface `node tests/browser-check.cjs` verifica filtros, conteúdo, grid em cinco larguras, prévias de vídeo, reprodução de um clipe gerado no navegador, abertura e fechamento do modal, retorno do foco e erro de mídia. Requer Node.js 22 ou superior e Microsoft Edge instalado (ou `EDGE_PATH` apontando para um navegador Chromium). Capturas do grid e do modal são salvas em `node_modules/.tmp`.
