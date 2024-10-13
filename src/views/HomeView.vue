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
        v-if="isNavMobileOpen"
        class="nav-bar-mobile"
        @close="isNavMobileOpen = false"
        @addNewBoard="openModalBoard"
      />
    </AnimationTransition>

    <!-- Header -->
    <TheHeader
      class="header"
      :headerMarginLeft="currentMarginLeft"
      :imgLogo="getResponsiveLogo"
      @openMobileNav="showNavMobile"
      @addNewTask="onAddNewTask"
      @openEditBoard="onEditBoard"
      @deleteBoard="onDeleteBoard"
    />

    <!-- Board -->
    <div class="boards" ref="boardsElement">
      <!-- Empty columns or boards -->
      <EmptyState
        v-if="checkEmptyState()"
        :emptyStateType="typeDataEmpty"
        @addNewBoard="openModalBoard"
        @addNewColumn="onAddColumn"
      />
      <Board
        v-else
        @addColumn="onAddColumn"
        @openTask="(task, columnId) => openTaskDetailsModal(task, columnId)"
      />
    </div>

    <!-- MODALS -->

    <!-- Create/Edit new board -->
    <AnimationTransition>
      <CreateEditBoard
        v-if="isCreateEditBoardOpen"
        :isEdit="isBoardEdit"
        @close="isCreateEditBoardOpen = false"
      />
    </AnimationTransition>

    <!-- Create/Edit task -->
    <AnimationTransition>
      <CreateEditTask
        v-if="isCreateEditTaskOpen"
        :isEdit="isTaskEdit"
        :task="taskDetails"
        :columnId="currentColumnTaskId"
        @close="isCreateEditTaskOpen = false"
      />
    </AnimationTransition>

    <!-- Task Details -->
    <AnimationTransition>
      <TaskDetailsModal
        v-if="isTaskDetailModalOpen"
        :task="taskDetails"
        :columnId="currentColumnTaskId"
        @close="isTaskDetailModalOpen = false"
        @openEditTask="onEditTask"
        @deleteTask="onDeleteTask"
      />
    </AnimationTransition>

    <!-- Delete Modal -->
    <AnimationTransition>
      <DeleteModal
        v-if="isDeleteModalOpen"
        :isTask="deleteTask"
        ::task="taskDetails"
        :columnId="currentColumnTaskId"
        @close="isDeleteModalOpen = false"
      />
    </AnimationTransition>
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
import Board from '@/components/Board.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'

//Images
import imgLogoDark from '@/assets/icons/logo-dark.svg'
import imgLogoLight from '@/assets/icons/logo-light.svg'

// Store
import { useBoardsStore } from '@/stores/BoardsStore'

// Types
import type { Task } from '@/types/appTypes'

const boardsStore = useBoardsStore()
const boards = computed(() => JSON.parse(JSON.stringify(boardsStore.getBoardsData)))
const currentBoard = computed(() => JSON.parse(JSON.stringify(boardsStore.getCurrentBoard)))

//Style and design variables
const MARGIN_LEFT = 300
const MARGIN_LEFT_ZERO = 0
const currentMarginLeft = ref(MARGIN_LEFT)
const getResponsiveLogo = ref(imgLogoDark)
const appElement = document.getElementById('app')
const isNavMobileOpen = ref(false)

// Modals variables
const isCreateEditBoardOpen = ref(false)
const isCreateEditTaskOpen = ref(false)
const isTaskDetailModalOpen = ref(false)
const isDeleteModalOpen = ref(false)

const isBoardEdit = ref(false)
const isTaskEdit = ref(false)
const deleteTask = ref(false)

// Data variables
const taskDetails = ref()
const currentColumnTaskId = ref<number>()
const typeDataEmpty = ref<'column' | 'board'>()
const boardsElement = ref<HTMLElement | null>(null)

///// Style and design functions
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

const showNavMobile = () => {
  isNavMobileOpen.value = true
}

///// Modals functions
const openModalBoard = () => {
  isBoardEdit.value = false
  isCreateEditBoardOpen.value = true
}

const onEditBoard = () => {
  isBoardEdit.value = true
  isCreateEditBoardOpen.value = true
}

const onDeleteBoard = () => {
  isDeleteModalOpen.value = true
  deleteTask.value = false
}

const onEditTask = () => {
  isTaskEdit.value = true
  isCreateEditTaskOpen.value = true
}

const onDeleteTask = () => {
  isDeleteModalOpen.value = true
  deleteTask.value = true
}

const onAddNewTask = () => {
  isTaskEdit.value = false
  isCreateEditTaskOpen.value = true
}

const onAddColumn = () => {
  isBoardEdit.value = true
  isCreateEditBoardOpen.value = true
}

const openTaskDetailsModal = (task: Task, columnId: number) => {
  taskDetails.value = task
  currentColumnTaskId.value = columnId
  isTaskDetailModalOpen.value = true
}

///// Data functions
const checkEmptyState = () => {
  if (boards.value.length === 0) {
    typeDataEmpty.value = 'board'
    return true
  } else if ('columns' in currentBoard.value) {
    typeDataEmpty.value = 'column'
    return currentBoard.value.columns.length === 0
  } else {
    return true
  }
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
  height: calc(100vh - pxToRem(64));
  overflow: auto;
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
