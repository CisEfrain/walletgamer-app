<template>
  <div>
    <v-row align="center" justify="center" class="mt-6">
      <v-col class="d-flex" cols="12" md="4">
        <v-text-field
          label="Nombre de la cuenta receptora"
          outlined
          required
          rounded
          v-model="$v.pj.$model"
          :error-messages="pjErrors"
          @input="$v.pj.$touch()"
          @blur="$v.pj.$touch()"
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" md="4">
        <v-text-field
          label="Confirmar nombre de la cuenta receptora"
          outlined
          required
          rounded
          v-model="$v.pjConfirm.$model"
          :error-messages="pjConfirmErrors"
          @input="$v.pjConfirm.$touch()"
          @blur="$v.pjConfirm.$touch()"
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <h4>Total a pagar: $ {{ totalPrice }}</h4>
    </v-row>
    <v-row justify="center">
      <v-btn
        type="button"
        rounded
        color="btn-gradient"
        :disabled="isStepOneDisabled"
        class="button button--primary button--medium mt-4 px-6"
        @click="buy()"
        >Confirmar</v-btn
      >
    </v-row>

    <div v-show="balance < parseInt(totalPrice)">
      <v-row class="mt-4" justify="center">
        <v-col class="commission_info text-center px-4 py-4" cols="4">
          <p>
            No tienes fondos disponibles para realizar esta compra. No te
            preocupes puedes cargar tu cuenta en segundos sin comisión.!!!
          </p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn
          type="button"
          rounded
          color="btn-gradient"
          class="button button--primary button--medium mt-4 px-6"
          @click="isFormFund"
          >Fondear en segundos</v-btn
        >
      </v-row>
    </div>
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
              :items="myPayMethods"
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
              :hint="`${fund.alias} - [${fund.nombre}]`"
              item-text="alias"
              item-value="id"
              return-object
              single-line
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
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
import BaseCardContainer from "@/components/base/BaseCardContainer.vue";
import { Validate } from "vuelidate-property-decorators";
import SocketIo from "socket.io-client";

import { required, minLength, sameAs } from "vuelidate/lib/validators";
@Component({
  components: {
    BaseCardContainer
  }
})
export default class CharacterPayForm extends Vue {
  @Validate({ required, minLength: minLength(4) }) pj = "";
  @Validate({ required, sameAs: sameAs("pj") }) pjConfirm = "";
  private stripe = (window as any).Stripe(process.env.VUE_APP_STRIPE_PK);
  io: any = SocketIo;
  //Fund
  @Validate({ required }) fund = "";
  @Validate({ required }) mountFund = "";
  private drawerFund = false;
  private isFormFund(): void {
    this.drawerFund = true;
    console.info("clicked from trans", this.drawerFund);
    this.$store.dispatch("setFundForm", this.drawerFund);
  }
  // Dispatch actions to make a fund
  private newFund() {
    console.info("ADD fund");
    this.$store.dispatch("createFound", {
      pasarela: this.fund,
      monto: this.mountFund,
      method: this.stripe
    });
    this.$store.dispatch("MyDoneOperations", { size: 4, page: 0 });
    this.$store.dispatch("MyPendingOperations", { size: 4, page: 0 });
  }
  get isFundDisabled(): boolean {
    return !this.fund || !this.mountFund ? true : false;
  }

  public getQuantity = 0;

  private buy(): void {
    const buyProduct = {
      pj: this.pj
    };
    console.info(buyProduct);
    this.$store.dispatch("nextStep");
  }

  get myPayMethods(): Array<any> {
    console.info(this.$store.getters.getExpenditure, "GetPayMethods");
    const payAliases = this.$store.getters.getExpenditure.map((item: any) => ({
      nombre: item.nombre,
      alias: item.alias,
      // eslint-disable-next-line @typescript-eslint/camelcase
      id: item.id
    }));
    return payAliases;
  }

  get form(): any {
    return {
      pj: this.$v.pj.$model,
      pjConfirm: this.$v.pjConfirm.$model
    };
  }

  get isStepOneDisabled(): boolean {
    return !this.$v.pj.minLength ||
      !this.$v.pjConfirm.$model ||
      !this.$v.pjConfirm.sameAs
      ? true
      : false;
  }

  get itemList(): any {
    return this.$store.getters.getProductToBuy;
  }

  get balance(): any {
    return this.$store.getters.getBalance;
  }

  get totalPrice(): any {
    const price = parseInt(this.$store.getters.getProductToBuy.precio);
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      price
    );
  }

  Pay() {
    console.log(this.form);
    if (this.$v.$invalid) {
      this.$v.$touch;
      return;
    }
    //this.$store.dispatch("setStripeData", this.form);
    //this.$store.dispatch("nextStep");
  }

  get pjErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.pj.$dirty) return errors;
    !this.$v.pj.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.pj.required && errors.push("El campo es requerido");
    return errors;
  }
  get pjConfirmErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.pjConfirm.$dirty) return errors;
    !this.$v.pjConfirm.required && errors.push("El campo es requerido");
    !this.$v.pjConfirm.sameAs && errors.push("El nombre no coincide");
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

<style lang="sass">
.commission_info
  color: $card-link
  border: 1px solid $menu-items
  background-color: $card-bg
  border-radius: 15px
  font-weight: 500
</style>
