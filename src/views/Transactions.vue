<template>
<v-container class="px-8">
  <v-row class="px-8" justify="space-around" align="center">
    <v-col cols="12" sm="12" md="4">
      <BalanceCard balance="50" actions/>
    </v-col>
    <v-col cols="12" sm="12" md="8">
      <NotificationsCard />
    </v-col>
  </v-row>

  <v-row class="px-8" align="center" justify="space-between">
    <v-col cols="12" sm="12" md="6">
      <h3 class="title">Mis Transacciones</h3>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-row align="center" justify="center" class="mt-6">
      <v-col class="d-flex" cols="6" sm="6">
        <v-select
          :items="[]"
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
          :items="[]"
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

  <v-row class="px-8" justify="center">
    <v-col cols="12">
      <v-expansion-panels
      v-model="panel"
      multiple
      flat
    >
      <TransactionItemList
        product="Gold World of Warcraft"
        date_transaction="10/12/2020"
        cost="20"
        quantity="500"
        status="Completa"
        realm="Faerlina"
        faction="Horda"
      />
      <TransactionItemList
        product="Gold World of Warcraft"
        date_transaction="10/12/2020"
        cost="20"
        quantity="500"
        status="Esperando mi confirmación"
        realm="Faerlina"
        faction="Horda"
      />

    </v-expansion-panels>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BalanceCard from "@/components/BalanceCard.vue"
import NotificationsCard from "@/components/transactions/NotificationsCard.vue"
import TransactionItemList from "@/components/transactions/TransactionItemList.vue"

@Component({
  components:{
    BalanceCard,
    NotificationsCard,
    TransactionItemList
  }
})
export default class Transactions extends Vue {
  private panel: Array<number> = [0]
}
</script>

<style>

</style>