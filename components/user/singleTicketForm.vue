<script setup lang="ts">
const props = defineProps < {
  isShow: boolean
} > ()

const emit = defineEmits < {
  (e: 'onClose'): void
}> ()

const { isShow } = toRefs(props)
const isShowRef = ref < boolean > ()

function close() {
  emit('onClose')
}

watch(isShow, () => isShowRef.value = isShow.value)
</script>

<template>
  <v-dialog max-width="800px" :model-value="isShowRef" scrollable @update:model-value="close">
    <v-card>
      <v-card-title>
        Kup bilet jednorazowy
      </v-card-title>
      <v-card-text>
        <v-combobox label="Samochód" />
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          Zamknij
        </v-btn>

        <v-btn>
          Przejdź do płatności
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
