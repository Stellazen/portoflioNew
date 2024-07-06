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
    <div class="container__description">
      <h2>{{ name }}</h2>
      <p class="container__description__p">{{ props.description }}</p>
      <div>
        <span class="container__description__technology" v-for="(tech, index) in props.technologies" :key="index">{{ tech }}</span>
      </div>
    </div>
    <div class="container__photo" :style="{ backgroundImage: `url(${props.img})` }">
      <a class="container__link" :href="props.url" target="_blank">clica</a>
    </div>
  </div>
</template>

<style scoped>
    .container{
      display: flex;
      margin: 15px;
      justify-content: center;
    }
    .container__description{
      max-width: 500px;
    }
    .container__photo{
        width: 500px;
        height: 300px;
        background: no-repeat center center cover;
    }
    .container__description__technology{
      background-color: var(--soft_green);
      margin: 5px;
      padding: 5px;
      border-radius: 5px;
    }
</style>