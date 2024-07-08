<script lang="ts">
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

</script>

<template>
    <div class="about">
        <img src="../assets/stella.png" class="about__image" alt="" data-aos="fade-up">
        <div class="about__description" data-aos="fade-up">
            <p>texto sobre mim texto sobre mim texto sobre mim texto sobre mim texto sobre mim texto sobre mim texto sobre mim texto sobre mim Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam doloribus, assumenda consequuntur laudantium deleniti debitis sed aliquam odio, temporibus fugiat aliquid illum magnam iste corrupti incidunt minima similique praesentium? Molestiae.</p>
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
    .about__image{
        width: 350px;
        border-radius: 50%;
    }
    .about__description{
        max-width: 600px;
        padding-left: 50px;
        color: var(--white)
    }
</style>