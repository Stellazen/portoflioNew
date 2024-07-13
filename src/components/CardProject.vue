<script setup lang="ts">

import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
  AOS.init({
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
    <div class="container__items">
      <div class="container__description">
        <h2 class="container__title" data-aos="fade-right">{{ name }}</h2>
        <p class="container__description__p" data-aos="fade-right">{{ props.description }}</p>
        <div class="container__description__technologies" data-aos="fade-right">
          <span class="container__description__technology" v-for="(tech, index) in props.technologies" :key="index">{{ tech }}</span>
        </div>
          <a :href="props.url" target="_blank">
            <button class="container__link" data-aos="fade-right">
              Link do projeto <img class="container__link__icon" src="../assets/images/icon-link.png" alt="">
            </button>
          </a>
        </div>
      <div class="container__photo" data-aos="fade-left" :style="{ backgroundImage: `url(${props.img})` }">
      </div>
    </div>
    <div class="container__line" data-aos="fade-right"></div>
  </div>
</template>

<style scoped>
    .container{
      display: flex;
      flex-direction: column;
      gap: 20px;
      border-radius: 15px;
      justify-content: center;
      width: 90%;
    }
    .container__items{
      display: flex;
      justify-content: center;
      gap:20px;
    }
    .container__title{
      margin: 5px 0 5px 0;
      font-family: var(--font-title);
      text-decoration: underline var(--soft_green);
    }
    .container__description{
      width: 500px;
      color: var(--white);
    }
    .container__description__technologies{
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0 10px 0;
      gap:10px;
    }
    .container__description__technology{
      background-color: var(--black);
      padding: 5px;
      border-radius: 5px;
      color: lightgray;
    }
    .container__link{
      background-color: var(--black);
      padding: 10px;
      border-radius: 5px;
      border: none;
      margin-top: 20px;
      text-align: center;
      font-family: var(--fonte-texto);
      max-width: 200px;
      /* transition:0.8ms; */
      cursor:pointer;
      color:white;
      display: flex;
      align-items: center;
      gap:5px;
    }
    .container__link:hover{
      border: 2px solid var(--soft_green);
    }
    .container__link__icon{
      width: 20px;
    }
     .container__photo{
      width: 500px;
      height: 300px;
      background: no-repeat center center cover;
      align-self: center;
      border-radius: 10px;
    }
    .container__photo:hover{
      opacity: 0.3;
    }
    .container__line{
      background-color: var(--soft_green);
      height: 2px;
      width: 100%;
      margin-top:50px;
    }
    a{
      text-decoration: none;
    }

    @media (max-width:480px){
      .container{
        flex-direction: column;
        width: 80vw;
      }
      .container__items{
        flex-direction: column;
      }
      .container__description{
        width: 100%;
      }
      .container__photo{
        width: 80vw;
      
      }
    }
    @media (max-width:760px){
      .container__items{
        flex-direction: column;
      }
      .container__description{
        width: 100%;
      }
      .container__photo{
        width: 70vw;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
</style>