<script setup lang="ts">
    import { onMounted } from 'vue';
    import AOS from 'aos';
    import 'aos/dist/aos.css';

    onMounted(() => {
    AOS.init({
        duration: 3000,
        once: true,
    });
    });

    const moveTo = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
    <div class="header">
        <nav class="header__nav">
            <ul class="header__nav__ul">
                <li class="header__nav__li" data-aos="fade-right" @click="moveTo('about-me')">
                    <p>Quem sou eu</p>
                </li>
                <li class="header__nav__li" data-aos="fade-right"  @click="moveTo('projects')">
                    <p>Projetos</p>
                </li>
                <li class="header__nav__li" data-aos="fade-right" @click="moveTo('contact')">
                    <p>Entre em Contato</p>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.header__nav{
    width: 100%;
  padding: 20px;
  background-color: var(--black);
}
.header__nav__ul{
  display: flex;
  gap: 50px;
  list-style-type: none;
  align-items: center;
  justify-content: center;
}
.header__nav__li{
    color: white;
    cursor:pointer;
    padding: 10px;
    border-radius: 10px;
    text-transform: uppercase;
}
.header__nav__li:hover{
    border: 2px solid var(--soft_orange);
    
}

@media (max-width:480px){
    .header__nav{
        padding: 10px;
    }
    .header__nav__ul{
        gap:20px;
    }
    .header__nav__li{
        font-size: 12px;
    }
}
</style>