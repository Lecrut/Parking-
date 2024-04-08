<script setup lang="ts">
import type { IEvent } from '~/models/Event'
import type { ICar } from '~/models/Car'
import {lengthRuleShort, requiredRule} from "~/composable/rules";

const props = defineProps<{
  isShow: boolean
  placeNumber: number
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
  <v-dialog max-width="800px" :model-value="isShowRef" scrollable @update:model-value="close">
    <v-card v-if="ticket !== undefined" class="pa-3">
      <v-card-title>
        Miejsce numer {{ placeNumber }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="12" md="6">
              <div class="d-flex flex-column align-center justify-center h-100">
                <v-img
                    class="mx-auto elevation-5"
                    rounded="xl"
                    :width="300"
                    aspect-ratio="4/3"
                    cover
                    src="/adminTaken.jpeg"
                />
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <div class="text-center grey d-flex flex-column align-center justify-center h-100 w-100">
                <v-form class="w-100">
                  <v-text-field v-model="ticket.type" label="Typ biletu" readonly />
                  <v-text-field v-model="ticket.enterHour" label="Ważny od" readonly />
                  <v-text-field v-model="ticket.exitHour" label="Ważny do" readonly />
                  <!-- TODO: tu bedzie jeszcze obrazek auta -->
                </v-form>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          Zamknij
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else>
      <v-card-title>
        Miejsce numer {{ placeNumber }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="12" md="6">
              <div class="d-flex flex-column align-center justify-center h-100">
                <v-img
                    class="mx-auto elevation-5"
                    rounded="xl"
                    :width="300"
                    aspect-ratio="4/3"
                    cover
                    src="/adminFree.jpeg"
                />
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <div class="text-center grey d-flex flex-column align-center justify-center h-100 w-100">
                To miejsce jest aktualnie wolne
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          Zamknij
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
