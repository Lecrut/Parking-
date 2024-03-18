<script setup lang="ts">
const props = defineProps < {
  isShow: boolean
}>()

const emit = defineEmits<{
  (e: 'onClose'): void
}>()

const { isShow } = toRefs(props)
const isShowRef = ref<boolean>()


function close() {
  emit('onClose')
}

watch(isShow, () => isShowRef.value = isShow.value)
</script>

<template>
  <v-dialog
      max-width="800px"
      :model-value="isShowRef"
      scrollable
      @update:model-value="close"
  >
    <v-card>
      <v-card-title>
        Samochód
      </v-card-title>

      <v-card-text>
        Info o twoim bolidzie
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn @click="close">
          Zamknij
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>