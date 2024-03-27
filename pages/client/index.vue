<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'

definePageMeta({
  middleware: ['user-page-guard'],
})

const auth = useAuthStore()
</script>

<template>
  <NavBarUser />
  strona glowa usera
  <div>
    Witaj {{ auth.user?.name }}
  </div>
</template>

<style scoped>

</style>
