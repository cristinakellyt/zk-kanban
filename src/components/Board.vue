<template>
  <div class="board-container">
    <!-- Column -->
    <div class="board-column" v-for="column in currentBoard.columns" :key="column.id">
      <div class="board-header">
        <h2 class="board-title">{{ column.name }} ({{ column.tasks.length }})</h2>
      </div>
      <div
        class="board-content"
        @dragover.prevent
        @drop="drop"
        :class="{ 'empty-column': column.tasks.length === 0 }"
        :id="column.id.toString()"
      >
        <!-- Task card -->
        <div v-if="column.tasks.length > 0">
          <div
            class="board-task"
            v-for="task in column.tasks"
            :key="task.id"
            :id="task.id.toString()"
            draggable="true"
            @dragstart="dragStart"
            @dragend="dragEnd"
            @click="() => emit('openTask', task, column.id)"
          >
            <h4 class="task-title">{{ task.title }}</h4>
            <p v-if="task.subTasks.length" class="subtask">
              {{ checkSubTasksDone(task.subTasks) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- New Column option -->
    <div class="board-content new-column" @click="emit('addColumn')">
      <p class="new-column-button">+ New column</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed, ref } from 'vue'

//Store
import { useBoardsStore } from '@/stores/BoardsStore'

//Types
import type { SubTask, Task, Column } from '@/types/appTypes'

const boardsStore = useBoardsStore()

const emit = defineEmits(['addColumn', 'openTask'])

const currentBoard = computed(() => JSON.parse(JSON.stringify(boardsStore.getCurrentBoard)))

const draggedItem = ref<HTMLElement | null>(null)

const dragStart = (event: DragEvent) => {
  draggedItem.value = event.target as HTMLElement
}

const dragEnd = () => {
  draggedItem.value = null
}

const drop = (event: DragEvent) => {
  const target = event.currentTarget as HTMLElement
  if (draggedItem.value && target.classList.contains('board-content')) {
    // check in current board the id of the column of dragged item
    const oldColumn = currentBoard.value.columns.find((column: Column) =>
      column.tasks.some((task: Task) => task.id === +draggedItem.value.id)
    )
    const newColumnId = +target.id

    boardsStore.updateTaskColumn(
      currentBoard.value.id,
      +draggedItem.value.id,
      newColumnId,
      oldColumn?.id
    )
  }
}

const checkSubTasksDone = (subTasks: SubTask[]) => {
  const subTasksDone = subTasks.filter((subTask) => subTask.isDone).length
  return `${subTasksDone} of ${subTasks.length} subtasks`
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

$board-column-width-mobile: pxToRem(250);
$board-column-width-desktop: pxToRem(300);

.board-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: pxToRem(16);

  .board-column {
    flex-shrink: 0;
    flex-basis: $board-column-width-mobile;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .board-header {
    padding: pxToRem(16);
    .board-title {
      color: var(--medium-grey);
      text-transform: uppercase;
      letter-spacing: pxToRem(1);
      font-size: pxToRem(10);
    }
  }

  .board-content {
    padding: pxToRem(16);
    flex: 1 0;
    display: flex;
    flex-direction: column;
    gap: pxToRem(16);
    border-radius: pxToRem(5);
    color: var(--text-color);

    &.empty-column {
      background-color: var(--secondary-color-2);
    }

    &.new-column {
      flex-shrink: 0;
      max-width: $board-column-width-mobile;
      flex-basis: $board-column-width-mobile;
      background-color: var(--secondary-color-2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-top: pxToRem(44);
    }
  }

  .board-task {
    background-color: var(--bg-color);
    box-shadow: 0 pxToRem(2) pxToRem(4) rgba(0, 0, 0, 0.1);
    padding: pxToRem(16);
    border-radius: pxToRem(5);
    margin-bottom: pxToRem(16);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 pxToRem(4) pxToRem(8) rgba(0, 0, 0, 0.1);

      .task-title {
        color: var(--primary-color);
      }
    }
  }

  .task-title {
    font-size: pxToRem(16);
    font-weight: 600;
    transition: all 0.3s;
  }

  .subtask {
    color: var(--medium-grey);
    font-size: pxToRem(12);
    font-weight: 600;
    margin-top: pxToRem(8);
  }

  .new-column-button {
    color: var(--medium-grey);
    font-weight: 600;
    font-size: pxToRem(16);
  }
}

@include media-query($tablet) {
  .board-container {
    .board-column {
      flex-basis: $board-column-width-desktop;
    }

    .board-content {
      &.new-column {
        flex-basis: $board-column-width-desktop;
        max-width: $board-column-width-desktop;
      }
    }

    .new-column-button {
      font-size: pxToRem(22);
    }
  }
}
</style>
