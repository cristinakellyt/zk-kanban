<template>
  <div>
    <AnimationTransition group name="slide">
      <!-- Navbar -->
      <div v-if="showNavBar" class="nav-wrapper">
        <img class="logo" alt="kanban-logo" :src="imgLogo" />

        <div class="nav-inner">
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

          <!-- Create new Board -->
          <div class="create-board" v-if="boards.length > 0">
            <BaseButton
              @click="emit('addNewBoard')"
              text="Create New Board"
              icon="src/assets/icons/icon-add-purple.svg"
              inverted
            />
          </div>
        </div>

        <div class="nav-options">
          <!-- Switch color -->
          <SwitcherColorTheme />

          <!-- Toggle navbar visibility -->
          <div class="toggle-navbar" @click="toggleNavBarVisibility">
            <img class="toggle-icon" src="@/assets/icons/icon-hide-sidebar.svg" alt="hide-icon" />
            <p class="toggle-navbar-text">Hide Sidebar</p>
          </div>
        </div>
      </div>
    </AnimationTransition>
    <!-- If the navbar is hidden -->
    <AnimationTransition name="slide">
      <div v-if="!showNavBar" class="show-navbar" @click="toggleNavBarVisibility">
        <img class="toggle-icon" src="@/assets/icons/icon-show-sidebar.svg" alt="show-icon" />
      </div>
    </AnimationTransition>
  </div>
</template>

<script setup lang="ts">
//Vue
import { computed, ref } from 'vue'

// Components
import BaseButton from './BaseComponents/BaseButton.vue'
import SwitcherColorTheme from '@/components/SwitcherColorTheme.vue'
import AnimationTransition from '@/components/animations/AnimationTransition.vue'

// Images
import imgLogoDark from '@/assets/icons/logo-dark.svg'

//store
import { useBoardsStore } from '@/stores/BoardsStore'

const emit = defineEmits(['addNewBoard', 'isNavBarVisible'])
const boardsStore = useBoardsStore()

const props = withDefaults(
  defineProps<{
    imgLogo?: string
  }>(),
  {
    imgLogo: imgLogoDark
  }
)

const boards = computed(() => JSON.parse(JSON.stringify(boardsStore.getBoardsData)))
const currentBoard = computed(() => JSON.parse(JSON.stringify(boardsStore.getCurrentBoard)))

const showNavBar = ref(true)

const toggleNavBarVisibility = () => {
  showNavBar.value = !showNavBar.value
  emit('isNavBarVisible', showNavBar.value)
}

const updateCurrentBoard = (boardId: number) => {
  boardsStore.setCurrentBoard(boardId)
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

$sidebar-width: pxToRem(300);

.nav-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: $sidebar-width;
  height: 100vh;
  background-color: $white;
  color: $medium-grey;
  border-right: pxToRem(1) solid var(--secondary-color);
  background-color: var(--bg-color);

  &.hide {
    display: none;
  }

  .logo {
    padding: pxToRem(32);
  }

  .nav-inner {
    margin-bottom: auto;
    font-weight: 600;
    width: 100%;

    .all-boards-count {
      padding: pxToRem(16) pxToRem(32) pxToRem(24) pxToRem(32);
      text-transform: uppercase;
      letter-spacing: pxToRem(1);
      font-size: pxToRem(12);
      color: var(--medium-gray);
    }

    .navigation-list {
      max-height: 30vh;
      overflow-y: auto;

      .navigation-item {
        font-size: pxToRem(15);
        display: flex;
        align-items: center;
        gap: pxToRem(16);
        margin: 0 pxToRem(32) pxToRem(16) 0;
        padding: pxToRem(12) pxToRem(32);
        border-top-right-radius: pxToRem(50);
        border-bottom-right-radius: pxToRem(50);
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:last-child {
          margin-bottom: 0;
        }

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
          color: var(--medium-gray);
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
        }
      }
    }

    .create-board {
      margin-top: pxToRem(32);
      padding: 0 pxToRem(32);
    }
  }
}

.nav-options {
  width: 100%;
  padding: pxToRem(32);
}

.toggle-navbar {
  display: flex;
  align-items: center;
  gap: pxToRem(8);
  cursor: pointer;
  margin: pxToRem(32) 0 0 pxToRem(-32);
  padding: pxToRem(12) pxToRem(32);
  transition: all 0.3s ease-in-out;
  border-top-right-radius: pxToRem(50);
  border-bottom-right-radius: pxToRem(50);

  .toggle-navbar-text {
    font-weight: 600;
  }

  .toggle-icon {
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    background-color: var(--primary-color);
    color: $white;

    .toggle-icon {
      filter: brightness(10);
    }
  }
}

.show-navbar {
  position: fixed;
  bottom: 10vh;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  padding: pxToRem(10);
  height: pxToRem(40);
  width: pxToRem(70);
  border-top-right-radius: pxToRem(50);
  border-bottom-right-radius: pxToRem(50);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  .toggle-icon {
    width: pxToRem(20);
  }

  &:hover {
    background-color: var(--primary-color-light);
  }
}
</style>
