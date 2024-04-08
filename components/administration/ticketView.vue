<script setup lang="ts">
import type { IEvent } from '~/models/Event'
import type { ICar } from '~/models/Car'

const props = defineProps<{
  isShow: boolean
  ticket: IEvent | undefined
}>()

const emit = defineEmits<{
  (e: 'onClose'): void
}>()

function close() {
  emit('onClose')
}

const isShowRef = ref<boolean>()

const { isShow, ticket } = toRefs(props)

watch(isShow, () => isShowRef.value = isShow.value)
</script>

<template>
  <v-dialog max-width="400px" :model-value="isShowRef" scrollable @update:model-value="close">
    <v-card v-if="ticket !== undefined" :elevation="10" class="pa-3">
      <v-card-title>
        Miejsce {{ ticket.fieldNum }}.
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="ticket.type" label="Typ biletu" readonly />
        <v-text-field v-model="ticket.enterHour" label="Ważny od" readonly />
        <v-text-field v-model="ticket.exitHour" label="Ważny do" readonly />
        <!-- TODO: tu bedzie jeszcze obrazek auta -->
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          ZAMKNIJ
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else>
      <v-card-title>
        Miejsce wolne
      </v-card-title>
      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          ZAMKNIJ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
