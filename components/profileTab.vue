<script setup lang="ts">
const auth = useAuthStore()

const { user } = storeToRefs(auth)
</script>

<template>
  <div class="text-h5 my-2">
    {{ user?.role === 'admin' ? 'Konto administracji' : 'Twoje konto' }}
  </div>

  <form class="w-75 my-2">
    <div v-if="user">
      <v-text-field
        v-model="user.name"
        label="Nazwa użytkownika"
        readonly
      />

      <v-text-field
        v-model="user.email"
        label="Adres Email"
        placeholder="example@mail.com"
        type="email"
        readonly
      />
    </div>
  </form>
</template>

<style scoped>

</style>
