<script setup lang="ts">
import NavBar from '~/components/navBars/navBar.vue'
import PriceContent from "~/components/priceContent.vue";

definePageMeta({
  middleware: ['guest-page-guard'],
})

useHead({
  title: "Cennik - Parking+"
})
</script>

<template>
  <NavBar />
  <PriceContent />

  <!--  todo: naprawic stopke -->
  <!--  <MyFooter /> -->
</template>

<style scoped>

</style>
