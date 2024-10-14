<template>
  <div>
    <div class="backdrop" @click="close"></div>
    <div class="mobile-nav">
      <div class="nav-inner">
        <!-- Boards -->
        <p class="all-boards-count">All boards ({{ boards.length }})</p>
        <nav class="navigation">
          <ul class="navigation-list">
            <li
              class="navigation-item"
              v-for="board in boards"
              :key="board.id"
              :class="{ 'board-active': currentBoard.id === board.id }"
              @click="updateCurrentBoard(board.id)"
            >
              <img class="board-icon" src="@/assets/icons/icon-board.svg" alt="board-icon" />
              <p class="board-name">{{ board.boardName }}</p>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Create new Board -->
      <div class="nav-options">
        <BaseButton
          v-if="boards.length > 0"
          @click="onAddNewBoard"
          extra-class="create-board"
          text="Create New Board"
          :icon="iconAddPurple"
          inverted
        />
        <!-- Switch app color -->
        <SwitcherColorTheme />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//Vue
import { computed } from 'vue'

// Components
import BaseButton from './BaseComponents/BaseButton.vue'
import SwitcherColorTheme from '@/components/SwitcherColorTheme.vue'

//Images
import iconAddPurple from '@/assets/icons/icon-add-purple.svg'

//Store
import { useBoardsStore } from '@/stores/BoardsStore'

const boardsStore = useBoardsStore()
const emit = defineEmits(['close', 'addNewBoard'])

const boards = computed(() => boardsStore.getBoardsData)
const currentBoard = computed(() => boardsStore.getCurrentBoard)

const close = () => {
  emit('close')
}

const onAddNewBoard = () => {
  emit('addNewBoard')
  emit('close')
}

const updateCurrentBoard = (boardId: number) => {
  boardsStore.setCurrentBoard(boardId)
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

$sidebar-width: pxToRem(300);

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.mobile-nav {
  position: fixed;
  top: 20%;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 80%;
  height: max-content;
  background-color: $white;
  color: $medium-grey;
  border-radius: pxToRem(5);
  border: pxToRem(1) solid var(--secondary-color);
  background-color: var(--bg-color);

  &.hide {
    display: none;
  }

  .nav-inner {
    margin-bottom: auto;
    font-weight: 600;
    width: 100%;

    .all-boards-count {
      text-transform: uppercase;
      letter-spacing: pxToRem(1);
      font-size: pxToRem(12);
      padding: pxToRem(16);
      color: var(--medium-grey);
    }

    .navigation-list {
      list-style: none;
      overflow-y: auto;
      max-height: 30vh;

      .navigation-item {
        font-size: pxToRem(15);
        display: flex;
        align-items: center;
        gap: pxToRem(16);
        margin: 0 pxToRem(16) pxToRem(16) 0;
        padding: pxToRem(12) pxToRem(16);
        transition: all 0.3s ease-in-out;
        border-top-right-radius: pxToRem(50);
        border-bottom-right-radius: pxToRem(50);
        cursor: pointer;

        &.board-active {
          background-color: var(--primary-color);
          .board-icon,
          .board-name {
            filter: brightness(10);
          }
        }

        .board-name {
          font-size: pxToRem(14);
          font-weight: 600;
          color: var(--medium-grey);
          transition: all 0.3s ease-in-out;
        }

        .board-icon {
          transition: all 0.3s ease-in-out;
        }

        &:hover {
          background-color: var(--primary-color);
          color: $white;

          .board-icon {
            filter: brightness(10);
          }

          .board-name {
            color: $white;
          }
        }
      }
    }

    .create-board {
      margin-top: pxToRem(32);
    }
  }
}

.nav-options {
  width: 100%;
  padding: pxToRem(16);
  display: flex;
  flex-direction: column;
  gap: pxToRem(24);
}

@include media-query($tablet) {
  .mobile-nav {
    .nav-inner {
      .all-boards-count {
        padding: pxToRem(16) pxToRem(32);
      }

      .navigation-list {
        .navigation-item {
          margin: 0 pxToRem(32) pxToRem(16) 0;
          padding: pxToRem(12) pxToRem(32);
        }
      }
    }
  }
  .nav-options {
    padding: pxToRem(32);
  }
}

@include media-query($laptop-medium) {
  .mobile-nav {
    display: none;
  }
}
</style>
