<script setup lang="ts">
import NavBarAdmin from "~/components/navBars/navBarAdmin.vue";

definePageMeta({
  middleware: ['admin-page-guard'],
})

useHead({
  title: "Historia - Parking+"
})

const ticketStore = useTicketStore()
const { allTickets } = storeToRefs(ticketStore)

const page = ref(1)

onMounted(async () => {
  await ticketStore.fetchTicketsForPlace(page.value -1 )
})

watch(page, async () => {
  await ticketStore.fetchTicketsForPlace(page.value -1 )
})

</script>

<template>
  <nav-bar-admin />

  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="1100"
      rounded
  >
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" sm="12">
        <div class="text-h5 mt-5">
          Historia biletów
        </div>
      </v-col>

      <v-row justify="center" class="w-100">
        <v-col cols="12" md="8" sm="12">
          <div class="text-h6 my-5">
            Miejsce numer {{ page }}
          </div>
        </v-col>
      </v-row>

      <v-row justify="center" class="w-100">
        <v-col cols="12" md="8" sm="12">
          <v-slide-group
              v-if="allTickets.length"
              show-arrows
          >
            <v-slide-group-item
                v-for="(ticket, index) in allTickets"
                :key="index"
                :item="ticket"
            >
<!--              todo: wywal przycisk i wrzuc ticket-->
              <v-btn
                  color="primary"
                  class="ma-2"
                  rounded
              >
                Options {{ ticket.type }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
          <div v-else class="text-h6 my-2">
            Brak historycznych biletów
          </div>
        </v-col>
      </v-row>

    </v-row>

    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" sm="12">
        <v-pagination
            v-model="page"
            :length="50"
            class="my-3"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-sheet>
</template>
