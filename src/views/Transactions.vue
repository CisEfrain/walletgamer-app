<template>
  <v-container class="px-8">
    <v-row class="px-8" justify="space-around" align="center">
      <v-col cols="12" sm="12" md="3">
        <!-- <BalanceCard balance="50" actions /> -->
        <BalanceCard balance="50" />
      </v-col>
      <v-col cols="12" sm="12" md="3" @click="isFormDisbursement">
        <!-- <BalanceCard balance="50" actions /> -->
        <ActionsCard actions="Nuevo desembolso" />
      </v-col>
      <v-col cols="12" sm="12" md="3" @click="isFormTransferToFriend">
        <!-- <BalanceCard balance="50" actions /> -->
        <ActionsCard actions="Transferir a amigo" />
      </v-col>
      <v-col cols="12" sm="12" md="3" @click="isFormFund">
        <!-- <BalanceCard balance="50" actions /> -->
        <ActionsCard actions="Fondear" />
      </v-col>
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
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- Side form for "Desembolso" -->
    <v-navigation-drawer
      v-model="drawerDisbursement"
      absolute
      right
      temporary
      width="420"
    >
      <v-container class="px-8">
        <h2 class="title text-center mt-12 mb-3">Solicitar desembolso</h2>
        <v-divider></v-divider>
        <v-row align="center" class="px-8 mt-8" justify="center">
          <v-col cols="12" md="12" align="center">
            <v-text-field
              label="¿Cuánto quieres retirar?"
              type="number"
              rounded
              v-model="$v.mountDisbursement.$model"
              :error-messages="mountDisbursementErrors"
              @input="$v.mountDisbursement.$touch()"
              @blur="$v.mountDisbursement.$touch()"
              required
              color="rgba(184,12,70,.6)"
              background-color="white"
              outlined
              class="text-field text-center"
              dense
            ></v-text-field>
            <v-select
              :items="payMethods"
              label="¿Donde lo quieres recibir?"
              outlined
              v-model="$v.disbursement.$model"
              :error-messages="disbursementErrors"
              @input="$v.disbursement.$touch()"
              @blur="$v.disbursement.$touch()"
              required
              rounded
              color="rgba(184,12,70,.6)"
              class="text-field text-center"
              dense
            ></v-select>
            <v-btn
              rounded
              @click="newDisbursement"
              :disabled="isDisbursementDisabled"
              color="btn-gradient"
              class="button button--primary button--medium px-8 mt-6"
            >
              <b>Solicitar</b>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <!-- Side form for "Transferir a amigo" -->
    <v-navigation-drawer
      v-model="drawerTransferToFriend"
      absolute
      right
      temporary
      width="420"
    >
      <v-container class="px-8">
        <h2 class="title text-center mt-12 mb-3">Transferir a amigo</h2>
        <v-divider></v-divider>
        <v-row align="center" class="px-8 mt-8" justify="center">
          <v-col cols="12" md="12" align="center">
            <v-text-field
              label="¿Cuanto deseas transferir?"
              rounded
              type="number"
              v-model="$v.mountSendToFriend.$model"
              :error-messages="mountSendToFriendErrors"
              @input="$v.mountSendToFriend.$touch()"
              @blur="$v.mountSendToFriend.$touch()"
              required
              color="rgba(184,12,70,.6)"
              background-color="white"
              outlined
              class="text-field text-center"
              dense
            ></v-text-field>

            <v-text-field
              rounded
              label="¿A quien lo quieres enviar?"
              outlined
              v-model="$v.sendToFriend.$model"
              :error-messages="sendToFriendErrors"
              @input="$v.sendToFriend.$touch()"
              @blur="$v.sendToFriend.$touch()"
              required
              type="email"
              color="rgba(184,12,70,.6)"
              background-color="white"
              class="text-field text-center"
              dense
            ></v-text-field>
            <v-btn
              rounded
              @click="newSendToFriend"
              :disabled="isSendToFriendDisabled"
              color="btn-gradient"
              class="button button--primary button--medium px-8 mt-6"
            >
              <b>Transferir</b>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <!-- Side form for "Fondear" -->
    <v-navigation-drawer
      v-model="drawerFund"
      absolute
      right
      temporary
      width="420"
    >
      <v-container class="px-8">
        <h2 class="title text-center mt-12 mb-3">Fondear</h2>
        <v-divider></v-divider>
        <v-row align="center" class="px-8 mt-8" justify="center">
          <v-col cols="12" md="12" align="center">
            <v-text-field
              label="¿Cuanto quieres fondear?"
              rounded
              type="number"
              v-model="$v.mountFund.$model"
              :error-messages="mountFundErrors"
              @input="$v.mountFund.$touch()"
              @blur="$v.mountFund.$touch()"
              required
              color="rgba(184,12,70,.6)"
              background-color="white"
              outlined
              class="text-field text-center"
              dense
            ></v-text-field>
            <v-select
              :items="payMethods"
              label="¿De donde quieres fondear?"
              outlined
              v-model="$v.fund.$model"
              :error-messages="fundErrors"
              @input="$v.fund.$touch()"
              @blur="$v.fund.$touch()"
              required
              rounded
              color="rgba(184,12,70,.6)"
              class="text-center"
              dense
            ></v-select>
            <v-btn
              rounded
              @click="newFund"
              :disabled="isFundDisabled"
              color="btn-gradient"
              class="button button--primary button--medium px-8 mt-6"
            >
              <b>Fondear</b>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BalanceCard from "@/components/BalanceCard.vue";
import AsideForm from "@/components/transactions/AsideForm.vue";
import ActionsCard from "@/components/ActionsCard.vue";
import NotificationsCard from "@/components/transactions/NotificationsCard.vue";
import TransactionItemList from "@/components/transactions/TransactionItemList.vue";
import PendingCard from "@/components/transactions/PendingCard.vue";

import { Validate } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";

@Component({
  components: {
    BalanceCard,
    NotificationsCard,
    TransactionItemList,
    ActionsCard,
    PendingCard,
    AsideForm
  }
})
export default class Transactions extends Vue {
  private panel: Array<number> = [0];

  private drawerDisbursement = false;
  private drawerTransferToFriend = false;
  private drawerFund = false;
  private payMethods: Array<string> = ["Paypal", "Stripe"];

  //New disbursement
  @Validate({ required }) disbursement = "";
  @Validate({ required })
  mountDisbursement!: number | bigint;

  //Send to friend
  @Validate({ required, email }) sendToFriend = "";
  @Validate({ required }) mountSendToFriend = "";

  //Fund
  @Validate({ required }) fund = "";
  @Validate({ required }) mountFund = "";

  private isFormDisbursement(): void {
    this.drawerDisbursement = true;
    console.info("clicked from trans", this.drawerDisbursement);
  }
  private isFormTransferToFriend(): void {
    this.drawerTransferToFriend = true;
    console.info("clicked from trans", this.drawerTransferToFriend);
  }
  private isFormFund(): void {
    this.drawerFund = true;
    console.info("clicked from trans", this.drawerFund);
  }

  created() {
    this.$store.dispatch("MyOperations");
    // this.$store.state.operationState.getOperations
  }
  private newDisbursement() {
    console.info("ADD disbursement");
  }
  get isDisbursementDisabled(): boolean {
    return !this.disbursement || !this.mountDisbursement ? true : false;
  }

  private newSendToFriend() {
    console.info("ADD send to friend");
  }
  get isSendToFriendDisabled(): boolean {
    return this.sendToFriend.length < 7 ||
      !this.$v.sendToFriend.email ||
      !this.mountSendToFriend
      ? true
      : false;
  }

  private newFund() {
    console.info("ADD fund");
  }
  get isFundDisabled(): boolean {
    return !this.fund || !this.mountFund ? true : false;
  }

  // Disbursement handle input errors
  get disbursementErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.disbursement.$dirty) return errors;
    !this.$v.disbursement.required && errors.push("El campo es requerido");
    return errors;
  }

  get mountDisbursementErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.mountDisbursement.$dirty) return errors;
    !this.$v.mountDisbursement.required && errors.push("El campo es requerido");
    return errors;
  }

  // Send to friend handle input errors
  get sendToFriendErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.sendToFriend.$dirty) return errors;
    !this.$v.sendToFriend.required && errors.push("El campo es requerido");
    !this.$v.sendToFriend.email && errors.push("Debe ser un email valido");
    return errors;
  }

  get mountSendToFriendErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.mountSendToFriend.$dirty) return errors;
    !this.$v.mountSendToFriend.required && errors.push("El campo es requerido");
    return errors;
  }

  // Fund handle input errors
  get fundErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.fund.$dirty) return errors;
    !this.$v.fund.required && errors.push("El campo es requerido");
    return errors;
  }

  get mountFundErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.mountFund.$dirty) return errors;
    !this.$v.mountFund.required && errors.push("El campo es requerido");
    return errors;
  }
}
</script>

<style scoped lang="sass"></style>
