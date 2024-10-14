<template>
  <RouterView />
</template>

<script setup lang="ts">
// Vue
import { computed, watch } from 'vue'

//Store
import { useDesignSettingsStore } from '@/stores/DesignSettingsStore'
import { useBoardsStore } from '@/stores/BoardsStore'

// Types
import { ColorTheme } from '@/types/appTypes'

//Constants
import DATA from '@/constants/initialData.ts'

const designSettingsStore = useDesignSettingsStore()
const boardsStore = useBoardsStore()

const boards = computed(() => JSON.parse(JSON.stringify(boardsStore.getBoardsData)))

// Set initial data
if (!boards.value.length) {
  boardsStore.setInitialBoardsData(DATA)
}

const isDarkThemeColor = computed(() => designSettingsStore.getThemeColor === ColorTheme.Dark)

watch(
  () => isDarkThemeColor.value,
  (value) => {
    if (value) {
      document.getElementById('app')?.classList.add('dark-theme')
    } else {
      document.getElementById('app')?.classList.remove('dark-theme')
    }
  },
  { immediate: true }
)
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
