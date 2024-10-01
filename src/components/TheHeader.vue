<template>
  <header ref="header" class="header-wrapper">
    <!-- Logo -->
    <div class="logo-wrapper">
      <img class="logo-desktop" alt="kanban-logo" :src="imgLogo" v-if="headerMarginLeft === 0" />
      <img class="logo-mobile" alt="kanban-logo" src="@/assets/icons/logo-mobile.svg" />
    </div>
    <!-- Board title -->
    <div class="content-wrapper">
      <h1 class="board-title" @click="openMobileNav">
        My App
        <img
          src="@/assets/icons/icon-chevron-down.svg"
          class="arrow"
          :class="{ down: isNavMobileOpen }"
        />
      </h1>
      <!-- Header options -->
      <div class="header-options">
        <BaseButton text="Add new task" icon="src/assets/icons/icon-add-white.svg" is-disabled />
        <div class="icon-options-wrapper">
          <img
            src="@/assets/icons/icon-vertical-ellipsis.svg"
            alt="options-icon"
            class="icon-options"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Vue
import { watch, ref } from 'vue'

// Components
import BaseButton from './BaseComponents/BaseButton.vue'

// Images
import imgLogoDark from '@/assets/icons/logo-dark.svg'

const props = withDefaults(
  defineProps<{
    headerMarginLeft: number
    imgLogo?: string
  }>(),
  {
    headerMarginLeft: 300,
    imgLogo: imgLogoDark
  }
)

const emit = defineEmits(['openMobileNav'])

const pxToRem = (px: number) => `${px / 16}rem`

const header = ref<HTMLElement | null>(null)

//watch props and adjust margin left in the header
watch(
  () => props.headerMarginLeft,
  (newVal) => {
    if (header.value) {
      header.value.style.marginLeft = pxToRem(newVal)
    }
  },
  { immediate: true }
)

const isNavMobileOpen = ref(false)

const openMobileNav = () => {
  isNavMobileOpen.value = true
  emit('openMobileNav')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.header-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  color: var(--text-color);
  border-bottom: pxToRem(1) solid var(--secondary-color);

  .header-title-wrapper {
    display: flex;
    align-items: center;
    gap: pxToRem(46);
  }

  .logo-wrapper {
    border-right: pxToRem(1) solid var(--secondary-color);
    padding: 0 pxToRem(16);
    align-self: stretch;
    justify-self: center;
    display: flex;
    align-items: center;
  }

  .logo-desktop {
    display: none;
  }

  .content-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: pxToRem(16);
    padding: pxToRem(16);
    width: 100%;
  }

  .board-title {
    display: flex;
    align-items: center;
    gap: pxToRem(8);

    .arrow {
      transition: transform 0.3s;
      &.down {
        transform: rotate(180deg);
      }
    }
  }

  .header-options {
    display: flex;
    align-items: center;
    gap: pxToRem(16);
    width: max-content;

    &:deep(.button-text) {
      display: none;
    }

    .icon-options-wrapper {
      cursor: pointer;
      height: 100%;
      padding: 0 pxToRem(8);

      .icon-options {
        width: pxToRem(14);
      }
    }
  }
}

@include media-query($tablet) {
  .header-wrapper {
    .header-options {
      gap: pxToRem(24);

      &:deep(.button-text) {
        display: block;
      }

      .icon-options-wrapper {
        .icon-options {
          width: pxToRem(12);
        }
      }
    }
  }
}

@include media-query($laptop-medium) {
  .header-wrapper {
    margin-left: pxToRem(300);

    .board-title {
      .arrow {
        display: none;
      }
    }

    .logo-wrapper {
      padding: 0;
    }

    .logo-desktop {
      display: block;
      padding: pxToRem(16);
    }

    .logo-mobile {
      display: none;
    }

    .header-options {
      gap: pxToRem(32);
    }
  }
}
</style>
