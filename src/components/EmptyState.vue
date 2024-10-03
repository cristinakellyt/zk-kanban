<template>
  <div class="empty-state-wrapper">
    <h4 class="empty-state-title">{{ getTitle }}</h4>
    <div>
      <BaseButton
        :text="getButtonText"
        buttonStyle="primary"
        @click="emit('addNewBoard')"
        icon="src/assets/icons/icon-add-white.svg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue'

// Components
import BaseButton from './BaseComponents/BaseButton.vue'

const emit = defineEmits(['addNewBoard'])

const props = defineProps<{
  isEmpty: 'column' | 'board'
}>()

const getTitle = computed(() => {
  return props.isEmpty === 'column'
    ? 'This board is empty. Create a new column to get started!'
    : "You don't have any boards yet. Create one to get started!"
})

const getButtonText = computed(() => {
  return props.isEmpty === 'column' ? 'Add New Column' : 'Add New Board'
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.empty-state-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: pxToRem(40);
  height: 100%;
  color: var(--medium-grey);

  .empty-state-title {
    font-weight: 600;
  }
}
</style>
