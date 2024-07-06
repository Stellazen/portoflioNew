<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  tech: string
  selectedTechnology: string | null
}>()

const emits = defineEmits<{
  (e: 'select', tech: string | null): void
}>()

const isActive = computed(() => props.tech === props.selectedTechnology)

const selectTechnology = () => {
  emits('select', props.tech)
}
</script>

<template>
  <button class="button" @click="selectTechnology" :class="{ active: isActive }">
    {{ tech }}
  </button>
</template>

<style scoped>
.button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  background-color: var(--soft_green);
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button.active {
  background-color: var(--soft_orange);
}

button:hover {
  background-color: var(--soft_yellow);
  color: var(--brown)
}
</style>
