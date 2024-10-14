<template>
  <div>
    <div class="backdrop" @click="emit('close')"></div>

    <div class="task-wrapper">
      <div class="task-header">
        <h3 class="task-title">{{ getTitle }}</h3>
      </div>
      <div class="task-content">
        <form id="taskForm" class="task-form" @submit.prevent="submitTask">
          <BaseInput
            type="text"
            placeholder="e.g. Take coffee break"
            fieldName="taskName"
            labelText="Title"
            :input="inputTaskName"
            @inputChange="updateTaskName"
            :error="taskNameError"
            textError="Can't be empty"
            :isRequired="false"
          />

          <BaseInput
            type="textarea"
            placeholder="e.g. It’s always good to take a break. This  15 minute break will  recharge the batteries  a little."
            fieldName="description"
            labelText="Description"
            :input="taskDescription"
            @inputChange="(value: string) => (taskDescription = value)"
            :isRequired="false"
          />

          <fieldset>
            <legend class="label" v-if="subTasks.length > 0">Subtasks</legend>
            <div class="subtasks-input-wrapper">
              <div v-for="(subtask, index) in subTasks" :key="subtask.id" class="subtasks-input">
                <BaseInput
                  type="text"
                  placeholder="e.g. Make coffee"
                  :fieldName="`column${subtask.id}`"
                  :input="subtask.name"
                  @inputChange="(value: string) => (subTasks[index].name = value)"
                  :isRequired="false"
                />
                <img
                  src="@/assets/icons/icon-cross.svg"
                  alt="delete-icon"
                  class="delete-icon"
                  @click="deleteSubtaskInput(subtask.id)"
                  :isRequired="false"
                />
              </div>
            </div>
            <BaseButton
              text="Add New Subtask"
              buttonStyle="secondary"
              @click="addNewSubtask"
              :icon="iconAddPurple"
            />
          </fieldset>

          <BaseDropdown
            id="taskStatus"
            :dropdownOptions="taskColumnsOptions"
            :selectedOption="selectedColumn"
            fieldTitle="Status"
            @selectedValue="(option: any) => (selectedColumn = option)"
            :isRequired="false"
          />
        </form>
      </div>

      <div class="buttons-options">
        <BaseButton :text="isEdit ? 'Save' : 'Create Task'" buttonType="submit" form="taskForm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed, ref } from 'vue'

// Components
import BaseInput from './BaseComponents/BaseInput.vue'
import BaseButton from './BaseComponents/BaseButton.vue'
import BaseDropdown from './BaseComponents/BaseDropdown.vue'

//Images
import iconAddPurple from '@/assets/icons/icon-add-purple.svg'

//store
import { useBoardsStore } from '@/stores/BoardsStore'

//Types
import type { SubTask, Task, Column } from '@/types/appTypes'

//Helpers
import generateNumericId from '@/utils/generateNumericId'

// Constants
import { BOILERPLATE_SUBTASKS } from '@/constants/boilerplateContent'

const emit = defineEmits(['close'])
const boardsStore = useBoardsStore()

const props = defineProps<{
  isEdit: boolean
  task?: Task
  columnId?: number
}>()

// use copied board to avoid reactivity issues
const currentBoard = computed(() => JSON.parse(JSON.stringify(boardsStore.getCurrentBoard)))
const taskColumnsOptions = computed(() =>
  JSON.parse(JSON.stringify(boardsStore.getCurrentBoardColumns))
)

const currentColumn = ref(
  currentBoard.value.columns.find((column: Column) => column.id === props.columnId)
)

const subTasks = ref(props.isEdit ? props.task?.subTasks : structuredClone(BOILERPLATE_SUBTASKS))
const inputTaskName = ref(props.isEdit ? props.task?.title : '')
const taskNameError = ref(false)
const taskDescription = ref(props.isEdit ? props.task?.description : '')
const selectedColumn = ref(props.isEdit ? currentColumn.value : taskColumnsOptions.value[0])

const getTitle = computed(() => {
  return props.isEdit ? 'Edit task' : 'Add New Task'
})

const updateTaskName = (value: string) => {
  inputTaskName.value = value
  taskNameError.value = false
}

const addNewSubtask = () => {
  subTasks.value?.push({ id: generateNumericId(), name: '', isDone: false })
}

const deleteSubtaskInput = (id: number) => {
  subTasks.value = subTasks.value?.filter((subtask) => subtask.id !== id)
}

const submitTask = () => {
  taskNameError.value = inputTaskName.value === ''

  if (taskNameError.value) return

  // Remove empty columns
  subTasks.value = subTasks.value?.filter((subtask) => subtask.name !== '')

  const taskData = {
    id: props.isEdit ? props.task?.id : generateNumericId(),
    title: inputTaskName.value,
    description: taskDescription.value,
    subTasks: subTasks.value
  } as Task

  if (props.isEdit) {
    boardsStore.editTask(
      currentBoard.value.id,
      selectedColumn.value.id,
      currentColumn.value.id,
      taskData
    )
  } else {
    boardsStore.addTask(currentBoard.value.id, selectedColumn.value.id, taskData)
  }

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
  z-index: 99;
}

.task-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  height: auto;
  max-height: pxToRem(750);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  background-color: var(--bg-color);
  border-radius: pxToRem(5);
  gap: pxToRem(16);
  padding: pxToRem(32) pxToRem(16);
  z-index: 100;

  .task-title {
    font-weight: 600;
    color: var(--text-color);
  }

  .task-form {
    display: flex;
    flex-direction: column;
    gap: pxToRem(24);
    width: 100%;
  }

  .label {
    font-weight: 600;
    font-size: pxToRem(12);
    margin-bottom: pxToRem(5);
    color: $medium-grey;
  }

  .subtasks-input {
    display: flex;
    gap: pxToRem(16);
    align-items: center;
    margin-bottom: pxToRem(10);
    padding-right: pxToRem(16);
  }

  .delete-icon {
    cursor: pointer;
  }

  .task-content {
    width: 100%;
  }

  .buttons-options {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: pxToRem(24);
    width: 100%;
  }
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.subtasks-input-wrapper {
  width: 100%;
  max-height: pxToRem(200);
  overflow: auto;
}

@include media-query($tablet) {
  .task-wrapper {
    max-width: pxToRem(600);
    padding: pxToRem(32);
    gap: pxToRem(32);

    .buttons-options {
      gap: pxToRem(32);
    }
  }
}

@include media-query($laptop-medium) {
  .task-wrapper {
    width: pxToRem(500);
  }
}
</style>
