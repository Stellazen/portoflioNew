<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import ImageHeader from './components/ImageHeader.vue'
import AboutMe from './components/AboutMe.vue'
import CardProject from './components/CardProject.vue'
import TechSelector from './components/TechSelector.vue'
import Data from './data/data.json'

export default defineComponent({
  name: 'App',
  components: {
    ImageHeader,
    AboutMe,
    CardProject,
    TechSelector,
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
  <div class="selector_icons">
    <button class="selector__button" @click="selectTechnology(null)" :class="{ active: !selectedTechnology }">All Projects</button>
    <TechSelector
      v-for="tech in technologies"
      :key="tech"
      :tech="tech"
      :selectedTechnology="selectedTechnology"
      @select="selectTechnology"
    />
  </div>
  <div>
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
</template>

<style scoped>
.selector_icons {
  display: flex;
  justify-content: center;
  margin: 20px;
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
  background-color: var(--soft_yellow);
  color:var(--black)
}
.selector__button:hover{
  background-color: var(--soft_orange);
  color: var(--brown)
}

</style>

