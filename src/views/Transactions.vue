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
              rounded
              v-model="$v.email.$model"
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              required
              color="rgba(184,12,70,.6)"
              background-color="white"
              outlined
              class="text-field"
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
              dense
            ></v-select>
            <v-btn
              rounded
              @click="login"
              :disabled="isDisabled"
              color="btn-gradient"
              class="button button--primary button--medium px-8 mt-6"
            >
              <b>Fondear</b>
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
              label="Email"
              rounded
              v-model="$v.email.$model"
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              required
              color="rgba(184,12,70,.6)"
              background-color="white"
              outlined
              class="text-field"
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
              dense
            ></v-select>
            <v-btn
              rounded
              @click="login"
              :disabled="isDisabled"
              color="btn-gradient"
              class="button button--primary button--medium px-8 mt-6"
            >
              <b>Fondear</b>
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
              label="Email"
              rounded
              v-model="$v.email.$model"
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              required
              color="rgba(184,12,70,.6)"
              background-color="white"
              outlined
              class="text-field"
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
              dense
            ></v-select>
            <v-btn
              rounded
              @click="login"
              :disabled="isDisabled"
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
import { required, email, minLength } from "vuelidate/lib/validators";

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

  @Validate({ required, email }) email = "";
  @Validate({ required, minLength: minLength(8) }) disbursement = "";

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

  private async login() {
    const loginData = {
      email: this.email,
      pass: this.disbursement
    };
    this.$store.dispatch("setLogin", loginData);
  }
  private clearForm(): void {
    this.$v.$reset();
    this.email = "";
    this.disbursement = "";
  }
  get isDisabled(): boolean {
    return !this.email || !this.disbursement ? true : false;
  }
  get emailErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.email.$dirty) return errors;
    !this.$v.email.required && errors.push("El campo es requerido");
    !this.$v.email.email && errors.push("El email debe ser valido");
    return errors;
  }
  get disbursementErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.disbursement.$dirty) return errors;
    !this.$v.disbursement.required && errors.push("El campo es requerido");
    !this.$v.disbursement.minLength &&
      errors.push("Debe contener minimo 8 digitos");
    return errors;
  }
}
</script>

<style scoped lang="sass"></style>
