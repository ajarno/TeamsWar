<template>
  <button
    class="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br hover:text-white dark:text-white focus:ring-4 focus:outline-none"
    type="button"
    @click="() => increaseScore(index)"
  >
    <span
      class="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white bg-opacity-90 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
    >
      {{ label }}
    </span>
    <span
      class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease text-lg"
    >
      🍺
    </span>
  </button>
</template>

<script>
export default {
  props: {
    index: { type: Number, required: true },
    label: { type: String, required: true },
  },
  methods: {
    increaseScore(index) {
      this.$emit('increaseScore', index)
    },
  },
}
</script>

<style></style>
