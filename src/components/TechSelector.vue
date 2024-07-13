<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { iconMapping } from '@/assets/iconMapping';

const props = defineProps<{
  tech: string;
  selectedTechnology: string | null
}>()

const emits = defineEmits<{
  (e: 'select', tech: string): void
}>()

const isActive = computed(() => props.tech === props.selectedTechnology)

const getIconForTechnology = (tech: string): string => {
  return iconMapping[tech] || '/icons/default.png'
}

const selectTechnology = () => {
  emits('select', props.tech)
}
</script>

<template>
        <button class="button" @click="selectTechnology" :class="{ active: isActive }">
        <img
          :src="getIconForTechnology(tech)"
          :alt="tech"
          class="button__icons"
        />
      </button>
  
</template>

<style scoped>
.button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  background-color: var(--black);
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.button.active {
  border:2px solid var(--soft_yellow);
}

.button:hover {
  border: 2px solid var(--soft_orange);
  color: var(--brown);
}

.button__icons {
  width: 32px;
  height: 32px;
}

@media (max-width:480px){
  
}
</style>

