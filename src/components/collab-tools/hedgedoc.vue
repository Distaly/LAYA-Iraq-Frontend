<!--
Filename: hedgedoc.vue
Use: Placeholder for hedgedoc opening link in collaborative tools
Creator: pj
Date: March 09, 2024
Dependencies:
  @/mixins/locale.vue
-->

<template>
  <main>
    <div class="container">
      {{ y18n('collaboration.hedgedoc.newTab') }} <a href="/">{{ y18n('homeRedirect') }}</a>
    </div>
  </main>
</template>

<script>
import { locale } from '@/mixins'

export default {
  name: 'Hedgedoc',

  mixins: [
    locale
  ],

  mounted: function () {
    this.$nextTick(function () {
      window.open('http://localhost:3000', '_blank').focus()
    })
  }

}
</script>

<style scoped>

</style>
