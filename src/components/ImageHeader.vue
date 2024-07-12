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

</script>

<template> 
<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
          

  <header class="header">
    <!-- <img class="header__image__arte" src="../assets/notebook.png" alt=""> -->
    <div class="header__container">
      <h1 class="header__title" data-aos="fade-right">
        Stella Zen<br>Web Developer
      </h1>
      <div class="header__contact" 
      data-aos-anchor-placement="bottom-bottom">
        <a href="https://www.linkedin.com/in/stellazen-dev/" target="_blank">
           <i class="devicon-linkedin-plain header__contact__icon" ></i>
        </a>
        <a href="https://github.com/Stellazen" target="_blank">
          <i class="devicon-github-original header__contact__icon"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  /* background: url('../assets/images/laptop.jpg') no-repeat center center; */
  background-size: cover;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 100px;
}
.header__image__arte{
  width: 500px;
  
}
.header__container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
}
.header__title{
  font-size: 4em;
  font-weight: bold;
  font-family: var(--font-title);
  text-align: center;
  color: var(--white)
}
.header__contact{
  margin-top: 20px;
  display: flex;
  gap: 50px;
}
a{
  text-decoration: none;
}
.header__contact__icon{
  color: var(--white);
  font-size: 50px;
}
.header__contact__icon:hover{
  color: var(--soft_orange);
}
</style>
