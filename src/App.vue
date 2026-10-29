<script setup lang="ts">
import { computed, ref } from 'vue'
import NavHeader from './components/NavHeader.vue'
import ImageHeader from './components/ImageHeader.vue'
import AboutMe from './components/AboutMe.vue'
import CategorySelector from './components/CategorySelector.vue'
import CardProject from './components/CardProject.vue'
import GetInTouch from './components/GetInTouch.vue'
import Data from './data/data.json'
import type { Project, ProjectCategory } from './data/projects'

const projects = Data as Project[]
const categoryPriority: Record<ProjectCategory, number> = {
  profissional: 0,
  academico: 1,
  wordpress: 2
}
const selectedCategory = ref<ProjectCategory | null>(null)
const filteredProjects = computed(() =>
  selectedCategory.value
    ? projects.filter((project) => project.category === selectedCategory.value)
    : [...projects].sort((a, b) => categoryPriority[a.category] - categoryPriority[b.category])
)
</script>

<template>
  <div class="body">
    <NavHeader />
    <ImageHeader />
    <div id="about-me">
      <AboutMe />
    </div>
    <section class="projects" id="projects" aria-labelledby="projects-title">
      <h2 class="projects__title" id="projects-title">Alguns dos meus projetos</h2>
      <p class="projects__intro">
       Conheça meus projetos, as tecnologias utilizadas e as soluções desenvolvidas em cada aplicação.
      </p>
      <CategorySelector v-model="selectedCategory" />
      <div class="projects__grid">
        <CardProject v-for="project in filteredProjects" :key="project.id" :project="project" />
      </div>
      <p v-if="!filteredProjects.length" class="projects__empty">
        Nenhum projeto nesta categoria por enquanto.
      </p>
    </section>
    <div id="contact">
      <GetInTouch />
    </div>
  </div>
</template>

<style scoped>
.projects {
  width: min(1200px, calc(100% - 48px));
  margin: 80px auto;
  color: var(--white);
  scroll-margin-top: 32px;
}
.projects__title {
  font-family: var(--font-title);
  font-size: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
}
.projects__intro,
.projects__empty {
  color: #c3c3c3;
  text-align: center;
}
.projects__intro {
  margin: 12px auto 28px;
  max-width: 560px;
}
.projects__grid {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  align-items: stretch;
}
@media (max-width: 1100px) {
  .projects__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 760px) {
  .projects {
    width: calc(100% - 32px);
    margin: 56px auto;
  }
  .projects__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
}
</style>
