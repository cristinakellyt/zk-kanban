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
            <legend class="label" v-if="subtasks.length > 0">Subtasks</legend>
            <div v-for="(subtask, index) in subtasks" :key="subtask.id" class="subtasks-input">
              <BaseInput
                type="text"
                placeholder="e.g. Make coffee"
                :fieldName="`column${subtask.id}`"
                :input="subtask.name"
                @inputChange="(value: string) => (subtasks[index].name = value)"
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
            <BaseButton
              text="Add New Subtask"
              buttonStyle="secondary"
              @click="addNewSubtask"
              icon="src/assets/icons/icon-add-purple.svg"
            />
          </fieldset>

          <BaseDropdown
            id="taskStatus"
            :dropdownOptions="taskStatusOptions"
            :selectedOption="selectedStatus"
            fieldTitle="Status"
            @selectedValue="(option: any) => (selectedStatus = option)"
            :isRequired="false"
          />
        </form>
      </div>

      <div class="buttons-options">
        <BaseButton text="Create Task" buttonType="submit" form="taskForm" />
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

//store
import { useBoardsStore } from '@/stores/BoardsStore.ts'

//Types
import type { SubTask, Task } from '@/types/appTypes'

//TODO: Refactor this function to a helper file
const generateNumericId = () => {
  return Math.floor(Math.random() * 1000000)
}

const props = defineProps<{
  taskName?: string
  subtasks?: SubTask[]
  description?: string
}>()

const boardsStore = useBoardsStore()

const emit = defineEmits(['close'])

const BOILERPLATE_SUBTASKS = [{ id: generateNumericId(), name: '', isDone: false }] as SubTask[]

const isEdit = ref(props.taskName ? true : false)
const subtasks = ref(props.subtasks ? props.subtasks : BOILERPLATE_SUBTASKS)
const inputTaskName = ref(props.taskName ? props.taskName : '')
const taskNameError = ref(false)
const taskDescription = ref(props.description ? props.description : '')
const taskStatusOptions = [
  { id: 1, name: 'Todo' },
  { id: 2, name: 'In progress' },
  { id: 3, name: 'Done' }
]
const selectedStatus = ref(taskStatusOptions.find((status) => status.name === 'Todo'))
const currentBoard = ref(boardsStore.getCurrentBoard)

const getTitle = computed(() => {
  return isEdit.value ? 'Edit task' : 'Add New Task'
})

const updateTaskName = (value: string) => {
  inputTaskName.value = value
  taskNameError.value = false
}

const addNewSubtask = () => {
  subtasks.value.push({ id: generateNumericId(), name: '', isDone: false })
}

const deleteSubtaskInput = (id: number) => {
  subtasks.value = subtasks.value.filter((subtask) => subtask.id !== id)
}

const submitTask = () => {
  taskNameError.value = inputTaskName.value === ''

  if (taskNameError.value) return

  // Remove empty columns
  subtasks.value = subtasks.value.filter((subtask) => subtask.name !== '')

  const taskData = JSON.parse(
    JSON.stringify({
      id: generateNumericId(),
      title: inputTaskName.value,
      description: taskDescription.value,
      status: selectedStatus.value,
      subtasks: subtasks.value
    })
  ) as Task

  if (isEdit.value) {
    //test when it is ready
    console.log('edit board')
  } else {
    boardsStore.addTask(currentBoard.value.id, taskData)
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
  max-height: pxToRem(650);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  background-color: var(--bg-color);
  border-radius: pxToRem(5);
  gap: pxToRem(16);
  padding: pxToRem(32) pxToRem(16);
  overflow-y: scroll;
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

@include media-query($tablet) {
  .task-wrapper {
    max-width: pxToRem(600);
    padding: pxToRem(32);
    max-height: pxToRem(600);
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
