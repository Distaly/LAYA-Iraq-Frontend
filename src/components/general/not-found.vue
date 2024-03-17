<!--
  Filename: not-found.vue
  Use: Organize 404 Page
  Creator: cmc
  Since: v1.2.0
-->
<template>
  <main>
    <div class="container">
      The URL you entered doesn't exist on this server. <a href="/">{{ y18n('homeRedirect') }}</a>
    </div>
  </main>
</template>

<script>
import { locale } from '@/mixins'
export default {
  name: 'NotFound',

  mixins: [
    locale
  ]
}
</script>

<style scoped>

</style>
