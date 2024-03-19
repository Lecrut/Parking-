<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'

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
