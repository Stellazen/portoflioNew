<script lang="ts">
import { defineComponent,onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default defineComponent({
  name: 'AboutMe',
  setup() {
    onMounted(() => {
      AOS.init({
        duration: 1000,
        once: true,
      });
    });
  },
});

</script>

<template>
    <div class="about">
        <img src="../assets/images/stella-editada.png" class="about__image" alt="" data-aos="fade-up">
        <div class="about__description" data-aos="fade-up">
            <h2 class="about__title" data-aos="fade-up">Unindo criativade e tecnologia</h2>
            <p class="about__description__p">Desenvolvedora FullStack</p>
            <p> JavaScript | Node Js | TypeScript | CSS | HTML | MySQL | React | Vue</p>
            <p class="about__description__p">Sou uma pessoa criativa e com sede de conhecimento. 
            </p>
            <p class="about__description__p">Crio soluções visuais, como landing pages e sites institucionais, realizo otimização de planilhas para o recebimento de leads e melhorias no SEO do seu site e outras soluções para web.</p>
            <div class="about__skills" >
            <p class="about__skills__p" data-aos="fade-left">pró-atividade</p>
            <p class="about__skills__p" data-aos="fade-left">pontualidade</p>
            <p class="about__skills__p" data-aos="fade-left">comunicação</p>
            <p class="about__skills__p" data-aos="fade-left">trabalho em equipe</p>
            <p class="about__skills__p" data-aos="fade-left">curiosidade</p>
            <p class="about__skills__p" data-aos="fade-left">constante aperfeiçoamento</p>
            <p class="about__skills__p" data-aos="fade-left">flexibilidade</p>
        </div>
        </div>
    </div>
</template>

<style setup>
    .about{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 50px;
    }
    .about__title{
        font-family: var(--font-title);
        font-size: 3em;
        line-height: 1em;
        /* text-decoration: underline var(--soft_orange) */
    }
    .about__description__p{
      margin-top: 20px;
      text-align: justify;
    }
    .about__image{
        width: 350px;
        border-radius: 50%;
    }
    .about__description{
        width: 600px;
        padding-left: 50px;
        color: var(--white);
    }
    .about__skills{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .about__skills__p{
      background-color: var(--black);
      padding: 5px;
      border-radius: 5px;
      color: lightgray;
    }

    @media (max-width:480px){
      .about{
        flex-direction: column;
        margin: 50px 10px 50px 10px;
      }
      .about__description{
        padding: 20px;
        width: 80%;
      }
      .about__image{
        width: 80%;
      }
      .about__title{
        font-size: 2.5em;
      }
    }
    @media (max-width:970px){
      .about{
        flex-direction: column;
      }
      .about__title{
        margin-top:50px;
      }
    }

</style>