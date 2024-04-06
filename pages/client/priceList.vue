<script setup lang="ts">
import NavBarUser from "~/components/navBars/navBarUser.vue";
import PriceContent from "~/components/priceContent.vue";

definePageMeta({
  middleware: ['user-page-guard'],
})

</script>

<template>
  <NavBarUser />
  <PriceContent />
</template>
