<template>
  <button
    type="button"
    class="opacity-60 text-gray-700 border border-gray-200 hover:bg-gray-200 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
    @click="navigate"
  >
    <cog-icon class="opacity-40 w-5 h-5" fill="currentColor" />
  </button>
</template>

<script>
import CogIcon from '../svg/CogIcon.vue'

export default {
  components: { CogIcon },
  methods: {
    navigate() {
      this.$router.push({
        path: '/settings',
      })
    },
  },
}
</script>

<style></style>
