<template>
  <div class="dropdown-wrapper">
    <!-- The field title -->
    <div v-if="fieldTitle" class="dropdown-title-box">
      <h3 class="basic-input-title">{{ fieldTitle }}</h3>
    </div>

    <!-- Mask - Used to automatically close the dropdown-->
    <div v-if="isDropdownShown" class="status-mask" @click="toggleDropdown" />

    <div :id="`dropdown-toggle-${id}`" class="basic-dropdown" @click="toggleDropdown()">
      <!-- The placeholder/selected choice indicator -->
      <div class="dropdown-text-container">
        <span v-if="!selected" class="dropdown-text">{{ placeholder }}</span>
        <span v-else class="dropdown-selected-text">{{ selected.name }}</span>
        <span v-if="!isDropdownShown" class="dropdown-icon">
          <img src="@/assets/icons/icon-chevron-down.svg" alt="arrow-down" />
        </span>
        <span v-else class="dropdown-icon">
          <img src="@/assets/icons/icon-chevron-up.svg" alt="arrow-up" />
        </span>
      </div>

      <!-- The dropdown option list -->
      <AnimationTransition>
        <div v-if="isDropdownShown" :id="`option-list-${id}`" class="option-list">
          <div class="option-list-inner">
            <div
              v-for="option in dropdownOptions"
              :id="`option-${option.id}`"
              :key="option.id"
              :class="{ 'selected-option': selected ? option.id === selected.id : false }"
              class="option"
              @click="selectOption(option)"
            >
              {{ option.name }}
            </div>
            <slot name="customDropdownOption" />
          </div>
        </div>
      </AnimationTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import AnimationTransition from '@/components/animations/AnimationTransition.vue'

const props = withDefaults(
  defineProps<{
    /**
     * The id of the dropdown
     */
    id: string
    /**
     * The placeholder of the dropdown
     */
    placeholder: string
    /**
     * The title of the dropdown
     */
    fieldTitle?: string
    /**
     * The options of the dropdown
     */
    dropdownOptions: { id: number; name: string }[]
    /**
     * The selected option
     */
    selectedOption?: { id: number; name: string } | null
  }>(),
  {
    fieldTitle: '',
    selectedOption: null
  }
)

const isDropdownShown = ref(false)
const selected = ref()

// If there is a new value passed from the parent, the dropdown should display that new value.
watch(
  () => props.selectedOption,
  (newValue) => {
    if (newValue) {
      selected.value = newValue
    }
  },
  { immediate: true }
)

const toggleDropdown = () => {
  isDropdownShown.value = !isDropdownShown.value
}

const selectOption = (option: { id: number; name: string }) => {
  selected.value = option
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.dropdown-wrapper {
  position: relative;
  width: 100%;
}

.dropdown-title-box {
  font-weight: 600;
  font-size: pxToRem(16);
  font-family: $main-font;
  margin-bottom: pxToRem(5);
  color: $medium-grey;
}

.basic-dropdown {
  width: 100%;
  padding: pxToRem(10) pxToRem(20);
  border: pxToRem(1) solid $medium-grey;
  border-radius: pxToRem(5);
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: $primary-color;
  }

  .dropdown-text-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: pxToRem(20);
    font-family: $main-font;
    font-size: pxToRem(14);
    font-weight: 500;
  }

  .dropdown-icon {
    width: pxToRem(20);
    height: pxToRem(20);
  }

  .dropdown-text {
    color: $medium-grey;
  }

  .dropdown-selected-text {
    color: $black;
  }
}

.option-list {
  position: absolute;
  top: pxToRem(75);
  left: 0;
  width: 100%;
  background-color: $white;
  border-radius: pxToRem(4);
  z-index: 100;
  box-shadow: 0 pxToRem(5) pxToRem(10) rgba($black, 0.1);
  overflow: hidden;
}

.option-list-inner {
  max-height: pxToRem(200);
  overflow-y: auto;
  color: $medium-grey;
  font-weight: 600;
}

.option {
  padding: pxToRem(10) pxToRem(20);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba($primary-color, 0.1);
  }

  &.selected-option {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
  }
}

.status-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
</style>
