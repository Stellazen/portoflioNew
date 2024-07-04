<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components:{
    HelloWorld
  }
});

</script>

<template>
  <HelloWorld msg="coisinha" /> 
</template>

<style scoped>

</style>
