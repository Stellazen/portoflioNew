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
    <div class="header__container">
      <h1 class="header__title">
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
  background: url('../assets/images/fundo-astro.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 100px;
  border-bottom: 1px solid var(--soft_green);
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

@media (max-width: 480px){
  .header{
    background-position: right center;
    padding: 0;
  }
  .header__title{
    line-height: 1.2em;
    font-size: 3em;
  }
}
@media (max-width:760px){
  .header{
    background-position: right center;
  }
  .header__title{
    line-height: 1.2em;
    font-size: 3em;
  }
}
</style>
