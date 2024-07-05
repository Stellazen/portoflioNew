<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ImageHeader from './components/ImageHeader.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components:{
    HelloWorld,
    ImageHeader,
  }
});

</script>

<template>
  <ImageHeader> </ImageHeader>
  <HelloWorld msg="coisinha" /> 
</template>

<style scoped>

</style>
