<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import ImageHeader from './components/ImageHeader.vue'
import CardProject from './components/CardProject.vue'
import TechSelector from './components/TechSelector.vue'
import Data from './data/data.json'

export default defineComponent({
  name: 'App',
  components: {
    ImageHeader,
    CardProject,
    TechSelector,
  },
  setup() {
    const selectedTechnology = ref<string | null>(null);
    const projects = ref(Data);

    const availableTechnologies = computed(() => {
      const technologiesSet = new Set<string>();
      projects.value.forEach(project => {
        project.technologies.forEach((tech: string) => {
          technologiesSet.add(tech);
        });
      });
      return Array.from(technologiesSet);
    });

    const filteredProjects = computed(() => {
      if (!selectedTechnology.value) {
        return projects.value;
      }
      return projects.value.filter(project =>
        project.technologies.includes(selectedTechnology.value)
      );
    });

    const selectTechnology = (tech: string | null) => {
      selectedTechnology.value = tech;
    };

    return {
      selectedTechnology,
      filteredProjects,
      availableTechnologies,
      selectTechnology,
    };
  }
});
</script>

<template>
  <ImageHeader />
  <div>
    <TechSelector
      tech="All"
      :selectedTechnology="selectedTechnology"
      @select="selectTechnology(null)"
    />
    <TechSelector
      v-for="tech in availableTechnologies"
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
/* Adicione estilos conforme necessário */
</style>

