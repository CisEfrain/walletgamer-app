<template>
  <v-container>
    <v-row class="mt-2" align="center" justify="space-between">
      <v-col cols="12" sm="12" md="12">
        <h3 class="title">Solicitar Desembolso</h3>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="d-flex justify-start" cols="6" sm="6" md="5">
        <v-text-field
          placeholder="¿Cuánto quieres retirar?"
          rounded
          color="rgba(184,12,70,.6)"
          outlined
          v-model="$v.withdraw.$model"
          :error-messages="withdrawErrors"
          @input="$v.withdraw.$touch()"
          @blur="$v.withdraw.$touch()"
          required
          class="text-field"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="5">
        <v-select
          :items="walletFund"
          placeholder="¿Donde lo quieres recibir?"
          outlined
          rounded
          v-model="$v.receive.$model"
          :error-messages="receiveErrors"
          @input="$v.receive.$touch()"
          @blur="$v.receive.$touch()"
          required
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
      <v-col class="d-flex btn-request-mt-less" cols="12" sm="12" md="2">
        <v-btn
          rounded
          color="btn-gradient"
          class="button button--primary button--medium mt-4 px-6"
          @click="RequestDisbursement"
          :disabled="isDisabled"
        ><b>
          Solicitar
          </b>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required } from "vuelidate/lib/validators";

@Component
export default class RequestDisbursement extends Vue {
  @Validate({ required }) withdraw = null
  @Validate({ required }) receive = null
  private walletFund: Array<string> = ["Paypal", "Stripe", "BTC"];

private RequestDisbursement(): void {
  const RequestDisbursement = {
    typeExpenditure : this.withdraw,
    emailReceptor : this.receive,
  }
  this.$store.dispatch("setNewRequestDisbursementData", RequestDisbursement)
  console.log(RequestDisbursement)
  this.clearForm()
}

private clearForm(): void {
  this.$v.$reset()
  this.withdraw = null
  this.receive = null
  }

  get isDisabled(): boolean {
    return !this.withdraw || !this.receive
      ? true
      : false;
  }

  get withdrawErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.withdraw.$dirty) return errors;
    !this.$v.withdraw.required && errors.push("El campo es requerido");
    return errors;
  }
  get emailReceptorErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.receive.$dirty) return errors;
    !this.$v.receive.required && errors.push("El campo es requerido");
    return errors;
  }


}
</script>

<style lang="sass" scoped>
.btn-request-mt-less
  margin-top: -44px

.select-field,
.text-field
  font-size: 13.5px

.btn-gradient
  background: $button-gradient
  color: $background!important

</style>
