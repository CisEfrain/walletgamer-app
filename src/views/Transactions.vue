<template>
  <v-container class="px-8">
    <v-row class="px-8" justify="space-around" align="center">
      <v-col cols="12" sm="12" md="3">
        <!-- <BalanceCard balance="50" actions /> -->
        <BalanceCard balance="50" />
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <!-- <BalanceCard balance="50" actions /> -->
        <ActionsCard actions="Nuevo desembolso" />
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <!-- <BalanceCard balance="50" actions /> -->
        <ActionsCard actions="Transferir a amigo" />
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <!-- <BalanceCard balance="50" actions /> -->
        <ActionsCard actions="Fondear" />
      </v-col>
      <!-- <v-col cols="12" sm="12" md="7">
        <NotificationsCard />
      </v-col> -->
    </v-row>

    <v-row class="px-8 mt-6" align="center" justify="space-between">
      <v-col cols="12" sm="12" md="6">
        <h3 class="title">Mis Operaciones en curso</h3>
      </v-col>
    </v-row>

    <v-row class="px-5" justify="center">
      <v-col cols="12">
        <v-expansion-panels v-model="panel" multiple flat>
          <PendingCard
            product="Gold World of Warcraft"
            transaction_date="10/12/2020"
            transaction_id="00225588"
            cost="20"
            status="Completa"
            type="Venta"
          />
          <PendingCard
            product="Gold World of Warcraft"
            transaction_date="10/12/2020"
            transaction_id="00225599"
            cost="20"
            type="Venta"
            status="Anulada"
          />
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row class="px-8 mt-6" align="center" justify="space-between">
      <v-col cols="12" sm="12" md="6">
        <h3 class="title">Historial de operaciones</h3>
      </v-col>
    </v-row>

    <v-row class="px-5" justify="center">
      <v-col cols="12">
        <v-expansion-panels v-model="panel" multiple flat>
          <TransactionItemList
            product="Gold World of Warcraft"
            transaction_date="10/12/2020"
            transaction_id="00225588"
            cost="20"
            status="Completa"
            type="Venta"
          />
          <TransactionItemList
            product="Gold World of Warcraft"
            transaction_date="10/12/2020"
            transaction_id="00225599"
            cost="20"
            type="Venta"
            status="Anulada"
          />
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BalanceCard from "@/components/BalanceCard.vue";
import ActionsCard from "@/components/ActionsCard.vue";
import NotificationsCard from "@/components/transactions/NotificationsCard.vue";
import TransactionItemList from "@/components/transactions/TransactionItemList.vue";
import PendingCard from "@/components/transactions/PendingCard.vue";

@Component({
  components: {
    BalanceCard,
    NotificationsCard,
    TransactionItemList,
    ActionsCard,
    PendingCard
  }
})
export default class Transactions extends Vue {
  private panel: Array<number> = [0];
}
</script>

<style></style>
