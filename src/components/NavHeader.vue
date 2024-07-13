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

    const moveTo = (x :number , y :number) => {
        window.scrollTo(x,y)
    }
</script>

<template>
    <div class="header">
        <nav class="header__nav">
            <ul class="header__nav__ul">
                <li class="header__nav__li" data-aos="fade-right" @click="moveTo(0, 900)">
                    <p>Quem sou eu</p>
                </li>
                <li class="header__nav__li" data-aos="fade-right"  @click="moveTo(0, 1500)">
                    <p>Projetos</p>
                </li>
                <li class="header__nav__li" data-aos="fade-right" @click="moveTo(0, 8000)">
                    <p>Fale Comigo</p>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.header__nav{
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
</style>