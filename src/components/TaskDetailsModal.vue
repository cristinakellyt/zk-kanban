<template>
  <div>
    <div class="backdrop" @click="emit('close')"></div>

    <div class="task-wrapper">
      <div class="task-header">
        <h3 class="task-title">{{ task.title }}</h3>
        <img
          src="@/assets/icons/icon-vertical-ellipsis.svg"
          alt="option-icon"
          class="option-icon"
          @click="isBoardOptionsOpen = true"
        />

        <!-- Options Pop up -->
        <AnimationTransition>
          <EditDeleteOptionsPopup
            v-if="isBoardOptionsOpen"
            :isBoard="false"
            @close="isBoardOptionsOpen = false"
            @editTask="
              () => {
                console.log('edit board 1')
                emit('close')
                emit('openEditTask')
              }
            "
            @delete="
              () => {
                emit('deleteTask')
                emit('close')
              }
            "
          />
        </AnimationTransition>
      </div>
      <p class="description">{{ task.description }}</p>

      <div class="subtasks">
        <p class="subtask-title">{{ getSubtaskTitle }}</p>
        <div v-for="subtask in task.subTasks" :key="subtask.id">
          <BaseCheckBox :id="subtask.id" :labelText="subtask.name" v-model="subtask.isDone" />
        </div>
      </div>

      <div class="current-column">
        <p class="column-title">Current Column</p>
        <BaseDropdown
          id="taskColumn"
          :dropdownOptions="taskColumnsOptions"
          :selectedOption="selectedColumn"
          @selectedValue="(option: any) => (selectedColumn = option)"
        />
      </div>

      <BaseButton text="Save" @click="saveTaskDetail" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed, ref } from 'vue'

// Components
import BaseButton from './BaseComponents/BaseButton.vue'
import BaseCheckBox from './BaseComponents/BaseCheckBox.vue'
import BaseDropdown from './BaseComponents/BaseDropdown.vue'
import EditDeleteOptionsPopup from '@/components/EditDeleteOptionsPopup.vue'
import AnimationTransition from '@/components/animations/AnimationTransition.vue'

// Store
import { useBoardsStore } from '@/stores/BoardsStore'

// Types
import type { SubTask, Task, Board } from '@/types/appTypes'

const boardsStore = useBoardsStore()

const emit = defineEmits(['close', 'openEditTask', 'deleteTask'])

const props = defineProps<{
  taskDetails: { taskId: number; columnId: number }
}>()

//destructuring props
const { taskId, columnId } = props.taskDetails

const currentBoard = computed(() => JSON.parse(JSON.stringify(boardsStore.getCurrentBoard)))

const task = ref<Task>(
  currentBoard.value.columns
    .map((column) => column.tasks)
    .flat()
    .find((task) => task.id === taskId)
)

const currentColumn = ref(
  currentBoard.value.columns.find((column) => column.id === columnId)
  // columnId
)

const taskColumnsOptions = computed(() =>
  JSON.parse(JSON.stringify(boardsStore.getCurrentBoardColumns))
)

const selectedColumn = ref(
  taskColumnsOptions.value.find((column) => column.id === currentColumn.value.id)
)

const getSubtaskTitle = computed(() => {
  const subtasksDone = task.value.subTasks.filter((subtask) => subtask.isDone).length
  return `Subtasks (${subtasksDone} of ${task.value.subTasks.length})`
})

const isBoardOptionsOpen = ref(false)

const saveTaskDetail = () => {
  boardsStore.updateTaskDetail(
    currentBoard.value.id,
    task.value.id,
    selectedColumn.value.id,
    columnId,
    task.value.subTasks
  )
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.task-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  height: auto;
  max-height: pxToRem(450);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  background-color: var(--bg-color);
  border-radius: pxToRem(5);
  gap: pxToRem(16);
  padding: pxToRem(16);
  // overflow-y: auto;
  z-index: 100;

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
  }

  .task-title {
    font-weight: 600;
    color: var(--text-color);
  }

  .option-icon {
    cursor: pointer;
    padding: 0 pxToRem(8);
  }

  .description {
    color: var(--medium-grey);
    font-size: pxToRem(14);
    font-weight: 500;
  }

  .subtasks {
    display: flex;
    flex-direction: column;
    gap: pxToRem(12);
    width: 100%;
    max-height: pxToRem(200);
    overflow: auto;

    .subtask-title {
      font-weight: 600;
      color: var(--medium-grey);
      font-size: pxToRem(14);
    }
  }

  .current-column {
    display: flex;
    flex-direction: column;
    gap: pxToRem(12);
    width: 100%;

    .column-title {
      font-weight: 600;
      color: var(--medium-grey);
      font-size: pxToRem(14);
    }
  }
}

@include media-query($tablet) {
  .task-wrapper {
    max-width: pxToRem(600);
    padding: pxToRem(32);
    max-height: pxToRem(600);
    gap: pxToRem(32);

    .subtasks {
      max-height: pxToRem(350);
    }
  }
}

@include media-query($laptop-medium) {
  .task-wrapper {
    width: pxToRem(500);
  }
}
</style>
