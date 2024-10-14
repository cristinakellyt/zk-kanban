<template>
  <div class="empty-state-wrapper">
    <h4 class="empty-state-title">{{ getTitle }}</h4>
    <div>
      <BaseButton
        :text="getButtonText"
        buttonStyle="primary"
        @click="selectEmitType"
        :icon="iconAddWhite"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue'

//Images
import iconAddWhite from '@/assets/icons/icon-add-white.svg'

// Components
import BaseButton from './BaseComponents/BaseButton.vue'

const emit = defineEmits(['addNewBoard', 'addNewColumn'])

const props = defineProps<{
  emptyStateType: 'column' | 'board' | undefined
}>()

const getTitle = computed(() => {
  return props.emptyStateType === 'column'
    ? 'This board is empty. Create a new column to get started!'
    : "You don't have any boards yet. Create one to get started!"
})

const getButtonText = computed(() => {
  return props.emptyStateType === 'column' ? 'Add New Column' : 'Add New Board'
})

const selectEmitType = () => {
  if (props.emptyStateType === 'column') {
    emit('addNewColumn')
  } else {
    emit('addNewBoard')
  }
}
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
