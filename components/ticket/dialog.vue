<script setup lang="ts">
defineProps<{
  ticketId: string | null
}>()

const isShown = defineModel<boolean>({ default: false })
</script>

<template>
  <v-dialog v-model="isShown" max-width="500px" @update:model-value="isShown = false">
    <v-card>
      {{ ticketId }}

      <v-card-actions class="justify-end">
        <v-btn color="error" @click="isShown = false">
          Zamknij
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
