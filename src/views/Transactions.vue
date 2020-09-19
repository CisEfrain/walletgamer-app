<template>
<v-container>
  <v-row justify="space-between">
    <v-col cols="4">
      <BalanceCard balance="50"/>
    </v-col>
    <v-col cols="8">
      <NotificationsCard />
    </v-col>
  </v-row>

  <v-row align="center" justify="space-between">
    <v-col cols="3">
      <h3 class="title">Mis Transacciones</h3>
    </v-col>
    <v-col cols="5">
      <v-row align="center" justify="center" class="mt-6">
      <v-col class="d-flex" cols="6" sm="6">
        <v-select
          :items="realm"
          label="Tipo"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6">
        <v-select
          :items="factions"
          label="Estado"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
    </v-row>
    </v-col>

  </v-row>
</v-container>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BalanceCard from "@/components/BalanceCard.vue"
import NotificationsCard from "@/components/NotificationsCard.vue"

@Component({
  components:{
    BalanceCard,
    NotificationsCard
  }
})
export default class Transactions extends Vue {}
</script>

<style>

</style>