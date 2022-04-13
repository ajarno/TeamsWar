<template>
  <div
    class="fixed inset-0 h-full w-full justify-center items-center bg-gray-100 shadow-2xl z-50"
  >
    <div
      class="relative mx-auto w-full h-full flex justify-center items-center"
    >
      <div class="flex flex-col p-8 w-full h-full">
        <div class="flex justify-end -m-6">
          <navigation-button @navigate="closeModal">
            <close-icon class="opacity-40 w-5 h-5" fill="currentColor" />
          </navigation-button>
        </div>
        <div class="px-10 md:max-w-80%">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '../svg/CloseIcon.vue'
import NavigationButton from './NavigationButton.vue'

export default {
  components: { NavigationButton, CloseIcon },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style></style>
