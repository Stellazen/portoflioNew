<script setup lang="ts">

const props = defineProps<{
  name: string,
  description: string,
  technologies: string[],
  url: string,
  img: string,
}>()

</script>

<template>
  <div class="container">
    <div class="description">
      <h2>{{ name }}</h2>
      <p class="descritpion">{{ props.description }}</p>
      <div>
        <span v-for="(tech, index) in props.technologies" :key="index">{{ tech }}</span>
      </div>
    </div>
    <div class="project_photo" :style="{ backgroundImage: `url(${props.img})` }">
      <a :href="props.url" target="_blank">clica</a>
    </div>
  </div>
</template>

<style scoped>
    .container{
      display: flex;
      margin: 15px;
      justify-content: center;
    }
    .descritpion{
      max-width: 500px
    }
    .project_photo{
        width: 500px;
        height: 300px;
        background: no-repeat center center cover;
    }
</style>