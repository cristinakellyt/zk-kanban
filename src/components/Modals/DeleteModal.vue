<template>
  <BaseModal @confirm="onDelete" @cancel="emit('close')">
    <template #title>
      <span class="title">Delete this {{ getTitle }}</span>
    </template>

    <template #text-warn>
      <p class="text-warn">{{ getTextWarn }}</p>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue'

// Components
import BaseModal from '@/components/BaseComponents/BaseModal.vue'

// Store
import { useBoardsStore } from '@/stores/BoardsStore'

// Types
import type { Task } from '@/types/appTypes'

const boardsStore = useBoardsStore()

const emit = defineEmits(['delete', 'close'])

const props = defineProps<{
  isTask: boolean
  task?: Task
  columnId?: number
}>()

const currentBoard = computed(() => JSON.parse(JSON.stringify(boardsStore.getCurrentBoard)))

const getTitle = computed(() => (props.isTask ? 'task' : 'board'))

const getTextWarn = computed(() => {
  return props.isTask
    ? `Are you sure you want to delete the ‘${props.task.title}’ task and its subtasks? This action cannot be reversed.`
    : `Are you sure you want to delete the ‘${currentBoard.value.boardName}’ board? This action will remove all columns and tasks and cannot be reversed.`
})

const onDelete = () => {
  if (props.isTask) {
    boardsStore.deleteTask(currentBoard.value.id, props.columnId, props.task.id)
  } else {
    boardsStore.deleteBoard(currentBoard.value.id)
  }
  emit('close')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.title {
  color: var(--red);
}

.text-warn {
  color: var(--medium-grey);
  font-size: pxToRem(16);
}
</style>
