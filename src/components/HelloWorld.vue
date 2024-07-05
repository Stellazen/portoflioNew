<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="exemplo">
    {{msg}}
  </div>
</template>

<style scoped>
  .exemplo{
    color: white;
  }
</style>

