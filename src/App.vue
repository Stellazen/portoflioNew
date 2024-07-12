<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import ImageHeader from './components/ImageHeader.vue'
import AboutMe from './components/AboutMe.vue'
import TechSelector from './components/TechSelector.vue'
import CardProject from './components/CardProject.vue'
import GetInTouch from './components/GetInTouch.vue'

import Data from './data/data.json'

export default defineComponent({
  name: 'App',
  components: {
    ImageHeader,
    CardProject,
    TechSelector,
    AboutMe,
    GetInTouch,

  },
  setup() {
    const projects = ref(Data)
    const selectedTechnology = ref<string | null>(null)

    const technologies = computed(() => {
      const techSet = new Set<string>()
      projects.value.forEach(project => {
        project.technologies.forEach((tech: string) => techSet.add(tech))
      })
      return Array.from(techSet)
    })

    const filteredProjects = computed(() => {
      if (!selectedTechnology.value) {
        return projects.value
      }
      return projects.value.filter(project =>
        project.technologies.includes(selectedTechnology.value!)
      )
    })

    const selectTechnology = (tech: string | null) => {
      selectedTechnology.value = tech
    }

    return {
      projects,
      technologies,
      selectedTechnology,
      filteredProjects,
      selectTechnology,
    }
  }
})
</script>

<template>
  <ImageHeader /> 
  <AboutMe />
  <div class="projects">
    <h2 class="projects__title">Alguns dos meus projetos</h2>
    <div class="projects__icons">
      <button class="selector__button" @click="selectTechnology(null)" :class="{ active: !selectedTechnology }">All Projects</button>
      <TechSelector
        v-for="tech in technologies"
        :key="tech"
        :tech="tech"
        :selectedTechnology="selectedTechnology"
        @select="selectTechnology"
      />
    </div>
    <p class="projects__p">filtre por tecnologia</p>
  </div>
  <div class="projects__card">
    <CardProject
      v-for="(project, index) in filteredProjects"
      :key="index"
      :name="project.name"
      :description="project.description"
      :technologies="project.technologies"
      :url="project.url"
      :img="project.img"
    />
  </div>
  <GetInTouch />
</template>

<style scoped>
.projects{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.projects__title{
  font-family: var(--font-title);
  font-size: 2em;
  text-align: center;
  color: var(--white);
}
.projects__p{
  color: gray;
}
.projects__icons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.selector__button{
  margin: 5px;
  padding: 10px 20px;
  border: none;
  background-color: var(--black);
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-family: var(--fonte_texto);
  font-weight: 600;
}
.selector__button.active{
  border:2px solid var(--soft_yellow);
}
.selector__button:hover{
  border:2px solid var(--soft_orange);
}
.projects__card{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:100px;
  margin-top: 100px;
}

</style>

