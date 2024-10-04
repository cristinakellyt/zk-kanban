<template>
  <main>
    <!-- Desktop navbar -->
    <DesktopNavBar
      class="nav-bar-desktop"
      @isNavBarVisible="adjustHeaderWidth"
      @addNewBoard="openModalBoard"
      :imgLogo="getResponsiveLogo"
    />
    <!-- Mobile navbar -->
    <AnimationTransition name="fade" group>
      <MobileNavBar
        class="nav-bar-mobile"
        v-if="isNavMobileOpen"
        @close="() => (isNavMobileOpen = false)"
        @addNewBoard="openModalBoard"
      />
    </AnimationTransition>

    <!-- Header -->
    <TheHeader
      class="header"
      :headerMarginLeft="currentMarginLeft"
      :imgLogo="getResponsiveLogo"
      @openMobileNav="showNavMobile"
      @addNewTask="isCreateEditTaskOpen = true"
    />

    <!-- Create/Edit new board -->
    <AnimationTransition>
      <CreateEditBoard
        v-if="isCreateEditBoardOpen"
        @close="isCreateEditBoardOpen = false"
        :isEdit="isBoardEdit"
      />
    </AnimationTransition>

    <!-- Create/Edit task -->
    <AnimationTransition>
      <CreateEditTask v-if="isCreateEditTaskOpen" @close="isCreateEditTaskOpen = false" />
    </AnimationTransition>

    <div class="boards" ref="boardsElement">
      <!-- Empty columns or boards -->
      <EmptyState v-if="checkEmptyState()" @addNewBoard="openModalBoard" :isEmpty="dataEmpty" />
    </div>
  </main>
</template>

<script setup lang="ts">
// Vue
import { computed, ref, watch } from 'vue'

// Components
import DesktopNavBar from '@/components/DesktopNavBar.vue'
import MobileNavBar from '@/components/MobileNavBar.vue'
import TheHeader from '@/components/TheHeader.vue'
import AnimationTransition from '@/components/animations/AnimationTransition.vue'
import CreateEditBoard from '@/components/CreateEditBoard.vue'
import CreateEditTask from '@/components/CreateEditTask.vue'
import EmptyState from '@/components/EmptyState.vue'

//Images
import imgLogoDark from '@/assets/icons/logo-dark.svg'
import imgLogoLight from '@/assets/icons/logo-light.svg'

// Store
import { useBoardsStore } from '@/stores/BoardsStore'

const MARGIN_LEFT = 300
const MARGIN_LEFT_ZERO = 0

const boardsStore = useBoardsStore()
const boards = computed(() => boardsStore.getBoardsData)
const currentBoard = computed(() => boardsStore.getCurrentBoard)

const currentMarginLeft = ref(MARGIN_LEFT)
const getResponsiveLogo = ref(imgLogoDark)
const appElement = document.getElementById('app')
const isNavMobileOpen = ref(false)
const isCreateEditBoardOpen = ref(false)
const isCreateEditTaskOpen = ref(false)
const dataEmpty = ref()
const isBoardEdit = ref(false)
const boardsElement = ref<HTMLElement | null>(null)

const adjustHeaderWidth = (navDesktopIsVisible: boolean) => {
  currentMarginLeft.value = navDesktopIsVisible ? MARGIN_LEFT : MARGIN_LEFT_ZERO
}

watch(
  () => currentMarginLeft.value,
  (newVal) => {
    if (boardsElement.value) {
      boardsElement.value.style.marginLeft = `${newVal}px`
    }
  },
  { immediate: true }
)

const showNavMobile = () => {
  isNavMobileOpen.value = true
}

const openModalBoard = (isEdit: boolean = false) => {
  isBoardEdit.value = isEdit
  isCreateEditBoardOpen.value = true
}

const checkEmptyState = () => {
  if (boards.value.length === 0) {
    dataEmpty.value = 'board'
    return true
  } else if ('columns' in currentBoard.value) {
    dataEmpty.value = 'column'
    return currentBoard.value.columns.length === 0
  } else {
    return true
  }
}

// Create a mutation observer to change the logo when the color theme changes
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      getResponsiveLogo.value = appElement?.classList.contains('dark-theme')
        ? imgLogoLight
        : imgLogoDark
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
$navbar-width: pxToRem(300);

.nav-bar-desktop {
  display: none;
}

.header {
  width: auto;
  transition: all 0.3s ease-in-out;
}

.boards {
  background-color: var(--secondary-color);
  padding: pxToRem(32);
  height: 100vh;
  transition: all 0.3s ease-in-out;
}

@include media-query($laptop-medium) {
  .nav-bar-desktop {
    display: block;
    width: $navbar-width;
    position: fixed;
  }

  .nav-bar-mobile {
    display: none;
  }

  .boards {
    margin-left: $navbar-width;
  }
}
</style>
