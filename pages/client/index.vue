<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'
import periodicTicketForm from '~/components/user/periodicTicketForm.vue'
import ticket from '~/components/user/ticket.vue'

const periodicTicketFlag = ref(false)
const ticketsToShow = ref(false)

function changeTicketFlag() {
  periodicTicketFlag.value = !periodicTicketFlag.value
}

const auth = useAuthStore()
</script>

<template>
  <NavBarUser />
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1400" rounded
  >
    <v-row justify="center" class="text-h6 mt-5 mb-5">
      <v-col>
        <div class="text-h2 mt-5 mb-5">
          Witaj, {{ auth.user?.name }}!
        </div>

        <v-div v-if="!ticketsToShow" class="text-h6 mt-5 mb-5">
          Aktualnie nie posiadasz żadnych biletów.
        </v-div>

        <v-div v-else>
          <ticket />
        </v-div>
      </v-col>
    </v-row>
  </v-sheet>

  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1400" rounded
  >
    <v-row class="mt-8">
      <v-col>
        <p class="text-h5">
          Zakup bilet jednorazowy
        </p>
        <v-btn class="my-4">
          Kup bilet
        </v-btn>
      </v-col>

      <v-col>
        <p class="text-h5">
          Zakup bilet okresowy
        </p>

        <v-btn class="my-4" @click="periodicTicketFlag = true">
          Kup bilet
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
  <periodicTicketForm :is-show="periodicTicketFlag" @on-close="changeTicketFlag" />
</template>

<style scoped>

</style>
