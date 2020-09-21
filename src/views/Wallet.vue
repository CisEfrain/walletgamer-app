<template>
<v-container class="px-8">
  <v-row class="px-8" justify="space-around" align="center">
    <v-col cols="12" sm="12" md="4">
      <BalanceCard balance="50" />
    </v-col>
    <v-col cols="12" sm="12" md="8" class="pr-16">
      <RequestDisbursement />
    </v-col>
  </v-row>

  <v-row class="px-12 mt-8" align="center">
      <h3 class="title">Mis Solicitudes de Desembolso</h3>
  </v-row>

  <v-row class="px-8" justify="center">
    <RequestDisbursementItemList 
      date="10/05/2020"
      cost="20"
      pay_method="PayPal"
      transaction_id="6549854"
      status="Completa"
    />
    <RequestDisbursementItemList 
      date="10/12/2020"
      cost="50"
      pay_method="Stripe"
      status="Pendiente"
    />
  </v-row>
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BalanceCard from "@/components/BalanceCard.vue"
import RequestDisbursement from "@/components/wallet/RequestDisbursement.vue"
import RequestDisbursementItemList from "@/components/wallet/RequestDisbursementItemList.vue"

@Component({
  components:{
    BalanceCard,
    RequestDisbursement,
    RequestDisbursementItemList
  }
})
export default class Wal extends Vue {
  private panel: Array<number> = [0]
}
</script>

<style>

</style>