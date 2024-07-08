<script setup lang="ts">

import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
  AOS.init({
    // Aqui você pode adicionar configurações globais, se necessário
    duration: 1000,
    once: true,
  });
});

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
      <h2 class="container__title" data-aos="fade-right">{{ name }}</h2>
      <p class="container__description__p" data-aos="fade-right">{{ props.description }}</p>
      <div class="container__description__technologies" data-aos="fade-right">
        <span class="container__description__technology" v-for="(tech, index) in props.technologies" :key="index">{{ tech }}</span>
      </div>
    </div>
    <a class="container__link" data-aos="fade-left" :href="props.url" target="_blank">
    <div class="container__photo" data-aos="fade-left" :style="{ backgroundImage: `url(${props.img})` }">
    </div></a>
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
      font-family: var(--font-title);
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
    .container__photo:hover{
      opacity: 0.3;
    }
</style>