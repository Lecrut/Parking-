<script setup lang="ts">
import NavBarUser from "~/components/navBars/navBarUser.vue";
import PriceContent from "~/components/priceContent.vue";

definePageMeta({
  middleware: ['user-page-guard'],
})

useHead({
  title: "Cennik - Parking+"
})

</script>

<template>
  <NavBarUser />
  <PriceContent />
</template>
