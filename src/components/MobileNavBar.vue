<template>
  <div>
    <div class="backdrop" @click="close"></div>
    <div class="mobile-nav">
      <div class="nav-inner">
        <p class="boards">All boards ({{ boards.length }})</p>
        <nav class="navigation">
          <ul class="navigation-list">
            <li class="navigation-item" v-for="board in boards" :key="board.id">
              <img class="board-icon" src="@/assets/icons/icon-board.svg" alt="board-icon" />
              <p>{{ board.name }}</p>
            </li>
          </ul>
        </nav>
      </div>

      <div class="nav-options">
        <BaseButton
          @click="addNewBoard"
          extra-class="create-board"
          text="Create New Board"
          icon="src/assets/icons/icon-add-purple.svg"
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
import { ref } from 'vue'

// Components
import BaseButton from './BaseComponents/BaseButton.vue'
import SwitcherColorTheme from '@/components/SwitcherColorTheme.vue'

// Replace for proper data when its ready
const boards = ref([
  {
    id: 1,
    name: 'Home'
  },
  {
    id: 2,
    name: 'About'
  },
  {
    id: 3,
    name: 'Contact'
  },
  {
    id: 4,
    name: 'Services'
  },
  {
    id: 5,
    name: 'Portfolio'
  }
])

const emit = defineEmits(['close'])

const addNewBoard = () => {
  boards.value.push({
    id: boards.value.length + 1,
    name: `Board ${boards.value.length + 1}`
  })
}

const close = () => {
  emit('close')
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
  width: $sidebar-width;
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

    .boards {
      text-transform: uppercase;
      letter-spacing: pxToRem(1);
      font-size: pxToRem(12);
      padding: pxToRem(16);
    }

    .navigation-list {
      list-style: none;
      overflow-y: scroll;
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

@include media-query($laptop-medium) {
  .mobile-nav {
    display: none;
  }
}
</style>
