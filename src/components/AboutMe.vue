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
        <img src="../assets/images/stella.png" class="about__image" alt="" data-aos="fade-up">
        <div class="about__description" data-aos="fade-up">
            <h2 class="about__title" data-aos="fade-up">Unindo criativade e tecnologia</h2>
            <p class="about__description__p">Desenvolvedora Web e entusiasta de UX, desde sempre me considero uma pessoa criativa e com sede de aprender. 
            </p>
            <p class="about__description__p">Atualmente cursando Ciência de Dados e com o objetivo de me aprofundar cada vez mais no mundo da tecnologia.</p>
            <p class="about__description__p">Crio soluções visuais, como landing pages e sites institucionais, e também realizo otimização de planilhas para o recebimento de leads e melhorias no SEO do seu site.</p>
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
        height: 50vh;
    }
    .about__title{
        font-family: var(--font-title);
        font-size: 3em;
        line-height: 1em;
        /* text-decoration: underline var(--soft_orange) */
    }
    .about__description__p{
      margin-top: 20px;
    }
    .about__image{
        width: 350px;
        border-radius: 50%;
    }
    .about__description{
        max-width: 600px;
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
</style>