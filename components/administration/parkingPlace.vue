<script setup lang="ts">
const props = defineProps<{
  numb: number
}>()

const { numb } = toRefs(props)
</script>

<template>
  <v-card class="text-center">
    <v-card-title>
      Miejsce {{ numb }}
    </v-card-title>
  </v-card>
</template>
