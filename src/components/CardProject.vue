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
        <p>{{ description }}</p>
        <div>{{ technologies }}</div>
    </div>
    <a :href="props.url">
      <div class="project_photo" :style="{ backgroundImage: `url(${img})`}"></div>
    </a>
  </div>
</template>

<style scoped>
    .project_photo{
        width: 200px;
        height: 200px;
        
    }
</style>