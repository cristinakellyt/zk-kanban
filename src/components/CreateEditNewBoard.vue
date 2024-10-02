<template>
  <div>
    <div class="backdrop" @click="emit('close')"></div>

    <div class="board-wrapper">
      <div class="board-header">
        <h2 class="board-title">{{ getTitle }}</h2>
      </div>
      <div class="board-content">
        <form id="boardForm" class="board-form" @submit.prevent="submitBoard">
          <BaseInput
            type="text"
            placeholder="e.g. Web Design"
            fieldName="boardName"
            labelText="Board Name"
            :input="boardName"
            @inputChange="updateBoardName"
            :error="boardNameError"
            textError="Can't be empty"
            :isRequired="false"
          />
          <fieldset>
            <legend class="label" v-if="columns.length > 0">Columns</legend>
            <div v-for="(column, index) in columns" :key="index" class="columns-input">
              <BaseInput
                type="text"
                placeholder="e.g. Column Name"
                :fieldName="`column${index}`"
                :input="column"
                :isRequired="false"
              />
              <img
                src="@/assets/icons/icon-cross.svg"
                alt="delete-icon"
                class="delete-icon"
                @click="deleteColumnInput(index)"
                :isRequired="false"
              />
            </div>
          </fieldset>
        </form>
      </div>

      <div class="buttons-options">
        <BaseButton text="Add New Column" buttonStyle="secondary" @click="addNewColumn" />
        <BaseButton text="Create New Board" buttonType="submit" form="boardForm" />
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

//store
import { useBoardsStore } from '@/stores/BoardsStore.ts'

const props = defineProps<{
  boardName?: string
  boardColumns?: string[]
}>()

const boardsStore = useBoardsStore()

const emit = defineEmits(['close'])

const isEdit = ref(props.boardName ? true : false)
const columns = ref(props.boardColumns ? props.boardColumns : ['Todo', 'Doing', ''])
const boardName = ref(props.boardName ? props.boardName : '')
const boardNameError = ref(false)

const getTitle = computed(() => {
  return isEdit.value ? 'Edit board' : 'Add New Board'
})

const updateBoardName = (value: string) => {
  boardName.value = value
  boardNameError.value = false
}

const addNewColumn = () => {
  columns.value.push('')
}

const deleteColumnInput = (index: number) => {
  columns.value.splice(index, 1)
}

const submitBoard = () => {
  boardNameError.value = boardName.value === ''

  if (boardNameError.value) return

  // Remove empty columns
  columns.value = columns.value.filter((column) => column !== '')

  const boardData = {
    boardName: boardName.value,
    columnName: columns.value,
    tasks: []
  }

  if (isEdit.value) {
    //test when it is ready
    console.log('edit board')
    boardsStore.updateBoard(boardData)
  } else {
    boardsStore.addBoard(boardData)
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

.board-wrapper {
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
  overflow-y: scroll;
  z-index: 100;

  .label {
    font-weight: 600;
    font-size: pxToRem(12);
    margin-bottom: pxToRem(5);
    color: $medium-grey;
  }

  .columns-input {
    display: flex;
    gap: pxToRem(16);
    align-items: center;
  }

  .delete-icon {
    cursor: pointer;
  }

  .board-content {
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
  .board-wrapper {
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
  .board-wrapper {
    width: pxToRem(500);
  }
}
</style>
