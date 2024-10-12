<template>
  <div class="options-wrapper">
    <div class="backdrop" @click.stop="onClose"></div>
    <div class="board-options">
      <p class="option edit" @click.stop="onEdit">Edit {{ getText }}</p>
      <p class="option delete" @click.stop="onDelete">Delete {{ getText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

//receive props from parent component if it is board or task
const props = defineProps<{
  isBoard: boolean
}>()

const emit = defineEmits(['close', 'editBoard', 'editTask', 'delete'])

const getText = computed(() => {
  return props.isBoard ? 'Board' : 'Task'
})

const onEdit = () => {
  if (props.isBoard) {
    emit('editBoard')
  } else {
    emit('editTask')
  }
  onClose()
}

const onDelete = () => {
  emit('delete')
  onClose()
}

const onClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(75, 43, 43, 0.5);
  // z-index: 10000;
}

.options-wrapper {
  position: absolute;
  top: 100%;
  right: 0;
  // width: 100%;
  // height: 100%;
  z-index: 10000000;
  // position: relative;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}

.board-options {
  position: sticky;
  // top: 120%;
  right: 0;
  background-color: var(--bg-color);
  border: pxToRem(1) solid var(--secondary-color);
  box-shadow: pxToRem(2) pxToRem(2) pxToRem(5) rgba(0, 0, 0, 0.1);
  border-radius: pxToRem(5);

  display: flex;
  flex-direction: column;
  // gap: pxToRem(8);
  justify-content: space-around;
  width: pxToRem(200);
  height: pxToRem(100);
  z-index: 100;
  color: var(--medium-grey);
  font-weight: 600;

  .option {
    padding: pxToRem(8) pxToRem(16);
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      background-color: var(--secondary-color);
    }

    &.delete {
      color: var(--red);
    }
  }
}
</style>
