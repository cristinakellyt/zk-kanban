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
import { ref, computed } from 'vue'

// Components
import BaseModal from '@/components/BaseComponents/BaseModal.vue'

// Store
import { useBoardsStore } from '@/stores/BoardsStore'

const boardsStore = useBoardsStore()

const emit = defineEmits(['delete', 'close'])

const props = defineProps<{
  isTask: boolean
  taskDetails?: { taskId: number; columnId: number }
}>()

const currentBoard = computed(() => JSON.parse(JSON.stringify(boardsStore.getCurrentBoard)))

const task = ref(
  currentBoard.value.columns
    .map((column) => column.tasks)
    .flat()
    .find((task) => task.id === props.taskDetails?.taskId)
)

const getTitle = computed(() => (props.isTask ? 'task' : 'board'))

console.log(currentBoard.value)
const getTextWarn = computed(() => {
  return props.isTask
    ? `Are you sure you want to delete the ‘${task.value.title}’ task and its subtasks? This action cannot be reversed.`
    : `Are you sure you want to delete the ‘${currentBoard.value.boardName}’ board? This action will remove all columns and tasks and cannot be reversed.`
})

const onDelete = () => {
  emit('close')
  if (props.isTask) {
    console.log('delete task')
  } else {
    boardsStore.deleteBoard(currentBoard.value.id)
  }
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
