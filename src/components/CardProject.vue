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
      <h2 class="container__title">{{ name }}</h2>
      <p class="container__description__p">{{ props.description }}</p>
      <div class="container__description__technologies">
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
      margin: 20px;
      gap: 20px;
      border-radius: 15px;
      justify-content: center;
    }
    .container__title{
      margin: 5px 0 5px 0;
      background-color: var(--red);
    }
    .container__description{
      max-width: 500px;
      color: var(--white);
    }
    .container__description__technologies{
      display: flex;
      margin: 10px 0 10px 0;
      gap:10px;
    }
    .container__description__technology{
      background-color: var(--black);
      padding: 5px;
      border-radius: 5px;
      color: lightgray;
    }
    .container__photo{
        width: 500px;
        height: 300px;
        background: no-repeat center center cover;
        align-self: center;
    }
</style>