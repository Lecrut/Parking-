<script setup lang="ts">
defineProps<{
  text: string | undefined
}>()

const isShow = defineModel<boolean>('isShow', { default: false })
</script>

<template>
  <v-snackbar
    v-model="isShow"
    vertical
    elevation="24"
    :timeout="2000"
    color="primary"
    justify="center"
  >
    <div class="text-subtitle-1 pb-2 mt-2 w-100 justify-center" align="center">
      {{ text }}
    </div>
  </v-snackbar>
</template>

<style>
.v-snackbar__content {
  margin-left: auto !important;
}
</style>
