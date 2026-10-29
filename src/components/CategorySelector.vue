<script setup lang="ts">
import { projectCategories } from '../data/projects'
import type { ProjectCategory } from '../data/projects'

defineProps<{ modelValue: ProjectCategory | null }>()
const emit = defineEmits<{ 'update:modelValue': [category: ProjectCategory | null] }>()
</script>

<template>
  <div class="category-selector" role="group" aria-label="Filtrar projetos por categoria">
    <button
      type="button"
      class="category-selector__button"
      :aria-pressed="modelValue === null"
      @click="emit('update:modelValue', null)"
    >
      Todos
    </button>
    <button
      v-for="(category, value) in projectCategories"
      :key="value"
      type="button"
      class="category-selector__button"
      :aria-pressed="modelValue === value"
      @click="emit('update:modelValue', value)"
    >
      {{ category.filter }}
    </button>
  </div>
</template>

<style scoped>
.category-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.category-selector__button {
  padding: 10px 20px;
  min-height: 44px;
  border: 1px solid #666;
  border-radius: 999px;
  background: var(--black);
  color: var(--white);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s,
    color 0.2s;
}
.category-selector__button:hover {
  border-color: var(--soft_orange);
}
.category-selector__button[aria-pressed='true'] {
  border-color: var(--soft_green);
  background: var(--indigo);
  color: var(--white);
}
.category-selector__button:focus-visible {
  outline: 3px solid var(--soft_green);
  outline-offset: 4px;
}
@media (max-width: 480px) {
  .category-selector__button {
    padding: 10px 14px;
    font-size: 0.875rem;
  }
}
</style>
