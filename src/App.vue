<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ImageHeader from './components/ImageHeader.vue'
import CardProject from './components/CardProject.vue'
import Data from './data/data.json'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components:{
  
    ImageHeader,
    CardProject
  },
  data(){
    return{
      protjects: Data
    };
  }
});

</script>

<template>
  <ImageHeader /> 
  <div>
    <CardProject
      v-for="(project, index) in protjects"
      :key= "index"
      :name="project.name"
      :description="project.description"
      :technologies="project.technologies"
      :url="project.url"
      :img="project.img"
    />
  </div>

</template>

<style scoped>

</style>
