<template>
  <AnimationTransition group name="slide">
    <div v-if="showNavBar" class="nav-wrapper">
      <img class="logo" alt="kanban-logo" :src="getLogo" />

      <div class="nav-inner">
        <p class="boards">All boards ({{ boards.length }})</p>
        <nav class="navigation">
          <ul class="navigation-list">
            <li class="navigation-item" v-for="board in boards" :key="board.id">
              <img class="board-icon" src="@/assets/icons/icon-board.svg" alt="board-icon" />
              <p>{{ board.name }}</p>
            </li>
          </ul>
          <BaseButton
            @click="addNewBoard"
            extra-class="create-board"
            text="Create New Board"
            icon="src/assets/icons/icon-add-purple.svg"
            inverted
          />
        </nav>
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
</template>

<script setup lang="ts">
//Vue
import { ref } from 'vue'

// Components
import BaseButton from './BaseComponents/BaseButton.vue'
import SwitcherColorTheme from '@/components/SwitcherColorTheme.vue'
import AnimationTransition from '@/components/animations/AnimationTransition.vue'

// Images
import imgLogoDark from '@/assets/icons/logo-dark.svg'
import imgLogoLight from '@/assets/icons/logo-light.svg'

// Replace for proper data when its ready
const boards = ref([
  {
    id: 1,
    name: 'Home'
  },
  {
    id: 2,
    name: 'About'
  }
])

const showNavBar = ref(true)

const addNewBoard = () => {
  boards.value.push({
    id: boards.value.length + 1,
    name: `Board ${boards.value.length + 1}`
  })
}

const toggleNavBarVisibility = () => {
  showNavBar.value = !showNavBar.value
  console.log('Toggle navbar visibility')
}

const getLogo = ref(imgLogoDark)
const appElement = document.getElementById('app')

// Create a mutation observer
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      getLogo.value = appElement?.classList.contains('dark-theme') ? imgLogoLight : imgLogoDark
    }
  }
})

// Start observing the 'app' element for class attribute changes
if (appElement) {
  observer.observe(appElement, { attributes: true })
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
  padding: pxToRem(32);
  height: 100vh;
  background-color: $white;
  color: $medium-grey;
  border-right: pxToRem(1) solid var(--secondary-color);
  background-color: var(--bg-color);
  // overflow: hidden;

  &.hide {
    display: none;
    // width: 0;
    // padding: 0;
  }

  .logo {
    margin-bottom: pxToRem(46);
  }

  .nav-inner {
    margin-bottom: auto;
    font-weight: 600;

    .boards {
      margin-bottom: pxToRem(16);
      text-transform: uppercase;
      letter-spacing: pxToRem(1);
      font-size: pxToRem(12);
    }

    .navigation-list {
      list-style: none;

      .navigation-item {
        font-size: pxToRem(15);
        display: flex;
        align-items: center;
        gap: pxToRem(16);
        margin: 0 0 pxToRem(16) pxToRem(-32);
        padding: pxToRem(12) pxToRem(32);
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
}

.toggle-navbar {
  display: flex;
  align-items: center;
  gap: pxToRem(8);
  // margin-top: pxToRem(32);
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
