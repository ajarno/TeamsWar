<template>
  <button
    type="button"
    class="opacity-70 text-gray-700 border border-gray-300 hover:bg-gray-200 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
    @click="backHome"
  >
    <close-icon class="opacity-40 w-5 h-5" fill="currentColor" />
  </button>
</template>

<script>
import CloseIcon from '../svg/CloseIcon.vue'

export default {
  components: { CloseIcon },
  methods: {
    backHome() {
      this.$router.push({
        path: '/',
      })
    },
  },
}
</script>

<style></style>
