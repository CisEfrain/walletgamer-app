<template>
  <v-dialog
    v-model="$store.state.paymentState.PayModal"
    width="400"
    overlay-color="blue-grey lighten-5"
  >
    <BaseCardContainer>
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-col cols="10" md="7" class="my-4 text-center main-title">
          <h6 style="line-height:1.2rem; ">
            Paga seguro con tu tarjeta
            de crédito mediante Stripe
          </h6>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <v-text-field
            label="Número de tarjeta"
            outlined
            rounded
            color="rgba(184,12,70,.6)"
            dense
            v-model="$v.cardNumber.$model"
            :error-messages="cardNumberErrors"
            @input="$v.cardNumber.$touch()"
            @blur="$v.cardNumber.$touch()"
            class="select-field"
          ></v-text-field>
        </v-col>
        <v-col cols="5" class>
          <v-text-field
            label="CVC"
            outlined
            rounded
            color="rgba(184,12,70,.6)"
            dense
            v-model="$v.cvc.$model"
            :error-messages="cvcErrors"
            @input="$v.cvc.$touch()"
            @blur="$v.cvc.$touch()"
            class="select-field"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="fecha"
                outlined
                rounded
                dense
                v-bind="attrs"
                v-on="on"
                v-model="$v.date.$model"
                :error-messages="dateErrors"
                @input="$v.date.$touch()"
                @blur="$v.date.$touch()"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn
          type="button"
          rounded
          color="btn-gradient"
          class="button button--primary button--medium mt-4 px-6"
          @click="Pay()"
        >Confirmar</v-btn>
      </v-row>
    </BaseCardContainer>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import BaseCardContainer from "@/components/base/BaseCardContainer.vue";
import { Validate } from "vuelidate-property-decorators";

import {
  required,
  minLength,
  between,
  maxLength
} from "vuelidate/lib/validators";
@Component({
  components: {
    BaseCardContainer
  }
})
export default class PaymentModal extends Vue {
  menu = false;
  modal = false;

  @Validate({ required }) cardNumber = "";
  @Validate({ required, minLength: minLength(3), maxLength: maxLength(3) })
  cvc = "";
  @Validate({ required }) date = "";

  /*   @Watch("current_step")
  onStepChange(val: string, oldVal: string) {

  } */
  Pay() {

    if (this.$v.$invalid) {
      this.$v.$touch;
      return;
    }
    this.$store.dispatch("setStripeData", this.form);
    this.$store.dispatch("nextStep");
    this.$store.dispatch("openPayModal");
  }
  get form() {
    const cardNumber = this.$v.cardNumber.$model;
    const cvc = this.$v.cvc.$model;
    const date = this.$v.date.$model;
    return {
      cardNumber,
      cvc,
      date
    };
  }
  get cardNumberErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.cardNumber.$dirty) return errors;
    // !this.$v.cardNumber.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.cardNumber.required && errors.push("El campo es requerido");
    return errors;
  }
  get cvcErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.cvc.$dirty) return errors;
    !this.$v.cvc.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.cvc.maxLength && errors.push("Maximo de caracteres 4");
    !this.$v.cvc.required && errors.push("El campo es requerido");
    return errors;
  }
  get dateErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.date.$dirty) return errors;
    // !this.$v.date.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.date.required && errors.push("El campo es requerido");
    return errors;
  }
}
</script>

<style lang="sass">
#app > div.v-dialog__content.v-dialog__content--active > div.v-dialog.v-dialog--active
  border-radius: 34px!important
  -webkit-box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8)
  -moz-box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8)
  box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8)
</style>
<style lang="sass" scoped>
.card-container
  padding-bottom: 3rem
</style>
