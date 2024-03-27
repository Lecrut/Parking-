<script setup lang="ts">
import NavBarAdmin from '~/components/navBars/navBarAdmin.vue'

definePageMeta({
  middleware: ['admin-page-guard'],
})
</script>

<template>
  <NavBarAdmin />

  strona administracji
</template>

<style scoped>

</style>
