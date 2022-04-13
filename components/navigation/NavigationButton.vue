<template>
  <button
    type="button"
    class="opacity-70 text-gray-700 border border-gray-300 hover:bg-gray-200 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
    @click="navigate"
  >
    <slot class="opacity-40 w-5 h-5" fill="currentColor"></slot>
  </button>
</template>

<script>
export default {
  methods: {
    navigate() {
      this.$emit('navigate')
    },
  },
}
</script>

<style></style>
