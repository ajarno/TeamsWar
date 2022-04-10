<template>
  <div class="container">
    <div class="nuxt-error">
      <component :is="errorPage" :error="error" />
    </div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script lang="js">
import NotFound from '~/components/error/NotFound.vue'
import OtherError from '~/components/error/OtherError.vue'

export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return NotFound
      }
      // catch everything else
      return OtherError
    },
  },
}
</script>
