<script setup lang="ts">
import { ref, watch } from 'vue'
import { projectCategories } from '../data/projects'
import type { Project } from '../data/projects'
import VideoPreview from './VideoPreview.vue'

const props = defineProps<{ project: Project }>()
const mediaFailed = ref(false)
watch(
  () => props.project.media.src,
  () => {
    mediaFailed.value = false
  }
)
</script>

<template>
  <article class="project-card" :aria-labelledby="`project-${project.id}`">
    <div class="project-card__media">
      <p v-if="mediaFailed" class="project-card__media-error">Prévia indisponível no momento.</p>
      <VideoPreview
        v-else-if="project.media.type === 'video'"
        :media="project.media"
        :name="project.name"
      />
      <img
        v-else
        class="project-card__preview"
        :src="project.media.src"
        :alt="project.media.alt"
        loading="lazy"
        decoding="async"
        width="800"
        height="450"
        @error="mediaFailed = true"
      />
    </div>
    <div class="project-card__content">
      <span class="project-card__category" :class="`project-card__category--${project.category}`">
        {{ projectCategories[project.category].label }}
      </span>
      <h3 class="project-card__title" :id="`project-${project.id}`">{{ project.name }}</h3>
      <div class="project-card__technology-list">
        <p
          v-for="technology in project.technologies"
          :key="technology"
          class="project-card__technologies"
        >
          {{ technology }}
        </p>
      </div>
      <p class="project-card__description">{{ project.description }}</p>
      <div class="project-card__section">
        <h4>Objetivo</h4>
        <p>{{ project.objective }}</p>
      </div>
      <div class="project-card__section">
        <h4>Funcionalidades</h4>
        <ul>
          <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
        </ul>
      </div>
      <div class="project-card__section">
        <h4>Desenvolvimento técnico</h4>
        <p>{{ project.learnings }}</p>
      </div>
      <footer class="project-card__footer">
        <a
          v-if="project.url"
          class="project-card__link"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Ver projeto ${project.name} (abre em nova aba)`"
        >
          Ver projeto
          <img src="../assets/images/icon-link.png" alt="" width="18" height="18" />
        </a>
        <p v-else class="project-card__unavailable">
          <em>Projeto profissional. Código-fonte e link de acesso restritos por confidencialidade empresarial.</em>
        </p>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #484848;
  border-radius: 16px;
  background: var(--black);
  color: #dedede;
}
.project-card__media {
  aspect-ratio: 16 / 9;
  background: #111;
  border-bottom: 1px solid #484848;
  overflow: hidden;
}
.project-card__preview {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.project-card__media-error {
  display: grid;
  place-items: center;
  height: 100%;
  padding: 20px;
  text-align: center;
}
.project-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  padding: 28px;
  overflow-wrap: anywhere;
}
.project-card__category {
  padding: 4px 12px;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.project-card__category--profissional {
  color: var(--soft_green);
}
.project-card__category--academico {
  color: var(--soft_yellow);
}
.project-card__category--wordpress {
  color: var(--soft_orange);
}
.project-card__title {
  margin-top: 16px;
  font-family: var(--font-title);
  font-size: 1.25rem;
  line-height: 1.45;
  color: var(--white);
}
.project-card__technology-list {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.project-card__technologies {
  color: var(--soft_green);
  font-size: 0.875rem;
  background-color: black;
  padding: 5px;
  border-radius: 5px;
}
.project-card__description {
  margin-top: 18px;
}
.project-card__section {
  margin-top: 22px;
}
.project-card__section h4 {
  margin-bottom: 6px;
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
}
.project-card__section ul {
  padding-left: 20px;
}
.project-card__section li + li {
  margin-top: 5px;
}
.project-card__footer {
  margin-top: auto;
  padding-top: 28px;
}
.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 16px;
  border: 1px solid var(--soft_green);
  border-radius: 8px;
  color: var(--white);
  font-weight: 600;
  text-decoration: none;
}
.project-card__link:hover {
  background: #2d413b;
}
.project-card__link:focus-visible {
  outline: 3px solid var(--soft_yellow);
  outline-offset: 4px;
}
.project-card__unavailable {
  color: #b8b8b8;
  font-size: 0.875rem;
}
@media (max-width: 480px) {
  .project-card__content {
    padding: 22px;
  }
  .project-card__title {
    font-size: 1.125rem;
  }
}
</style>
