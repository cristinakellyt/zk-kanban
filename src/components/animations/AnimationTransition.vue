<template>
  <TransitionGroup v-if="group" :tag="tag" :name="name">
    <slot />
  </TransitionGroup>
  <Transition v-else :name="name" :tag="tag" :mode="mode">
    <slot />
  </Transition>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: false,
    default: 'fade'
  },
  mode: {
    type: String,
    required: false,
    default: 'out-in'
  },
  group: {
    type: Boolean,
    required: false,
    default: false
  },
  tag: {
    type: String,
    required: false,
    default: 'div'
  }
})
</script>

<!--<style lang="scss" scoped>-->
<style lang="scss">
/** Variables **/
:root {
  --duration: 0.2s;
}

/** Fade animation **/
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration) ease-out;
}

/** List item animations: useful for adding and removing items in a list **/
.list-enter-active,
.list-leave-active {
  transition: all var(--duration) ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/** Toast animations **/
.toast-enter-active,
.toast-leave-active {
  transition: all var(--duration);
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

/** Slide animation **/
.slide-enter-active,
.slide-leave-active {
  transition: all var(--duration) ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
