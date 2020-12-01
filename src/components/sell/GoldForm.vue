<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-select
          :items="realmList"
          label="Reino"
          outlined
          v-model="$v.realm.$model"
          :error-messages="realmErrors"
          @input="$v.realm.$touch()"
          @blur="$v.realm.$touch()"
          required
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-select
          :items="factionList"
          label="Faccion"
          outlined
          v-model="$v.faction.$model"
          :error-messages="factionErrors"
          @input="$v.faction.$touch()"
          @blur="$v.faction.$touch()"
          required
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          label="Cantidad disponible"
          rounded
          v-model="$v.quantity.$model"
          :error-messages="quantityErrors"
          type="number"
          @input="$v.quantity.$touch()"
          @blur="$v.quantity.$touch()"
          required
          min="100"
          step="100"
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          label="Precio por 100 unidades"
          rounded
          v-model="$v.price.$model"
          :error-messages="priceErrors"
          @input="$v.price.$touch()"
          @blur="$v.price.$touch()"
          required
          type="number"
          @keyup="calculateComision(price)"
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-2" justify="center">
      <v-col
        class="d-flex justify-center btn-request-mt-less"
        cols="12"
        sm="12"
        md="12"
      >
        <v-btn
          rounded
          color="btn-gradient"
          class="button button--primary button--medium px-8"
          @click="addGoldPost"
          :disabled="isDisabled"
          ><b>
            Publicar
          </b>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-4" justify="center">
      <v-col class="commission_info text-center px-4 py-4" cols="4">
        <p>Comision: {{ goldData.comision }}%</p>
        <h5>Por cada 100 unidades vendidas recibiras {{ netPrice }}$</h5>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Component, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required, minLength, minValue } from "vuelidate/lib/validators";

@Component
export default class GoldForm extends Vue {
  @Validate({ required }) realm = null;
  @Validate({ required }) faction = null;
  @Validate({ required, minLength: minLength(3), minValue: minValue(100) })
  quantity = null;
  @Validate({ required, minLength: minLength(1) }) price:
    | number
    | undefined
    | string = "";
  public comision: any;
  public getPrice = 0;

  get factionList(): Array<string> {
    return this.$store.getters.getFactionList;
  }

  get realmList(): Array<string> {
    return this.$store.getters.getRealmList;
  }

  get totalPrice(): any {
    return new Intl.NumberFormat().format(this.getPrice);
  }
  private calculateComision(e: any): void {
    const price = parseInt(e);
    this.getPrice =
      price - (price / 100) * this.$store.getters.getGoldPostData.comision;
  }
  get goldData(): void {
    this.comision = this.$store.getters.getGoldPostData;
    return this.$store.getters.getGoldPostData;
  }
  get netPrice(): number {
    return Object.is(NaN, this.getPrice) ? 0 : this.totalPrice;
  }
  private addGoldPost(): void {
    const newGoldPost = {
      tipo: this.$store.getters.getGoldPostData.id,
      reino: this.realm,
      faccion: this.faction,
      cantidad: this.quantity,
      precio: this.price
    };
    this.$store.dispatch("addPost", newGoldPost);
    this.$store.dispatch("getPosts", { size: 10, page: 0 });
    this.clearForm();
  }
  private clearForm(): void {
    this.$v.$reset();
    this.realm = null;
    this.faction = null;
    this.quantity = null;
    this.price = 0;
  }
  get isDisabled(): boolean {
    return !this.realm ||
      !this.faction ||
      !this.quantity ||
      !this.$v.quantity.minValue ||
      !this.price
      ? true
      : false;
  }

  // handle errors validations
  get typeExpenditureErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.typeExpenditure.$dirty) return errors;
    // !this.$v.typeExpenditure.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.typeExpenditure.required && errors.push("El campo es requerido");
    return errors;
  }
  get realmErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.realm.$dirty) return errors;
    !this.$v.realm.required && errors.push("El campo es requerido");
    return errors;
  }
  get factionErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.faction.$dirty) return errors;
    !this.$v.faction.required && errors.push("El campo es requerido");
    return errors;
  }
  get quantityErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.quantity.$dirty) return errors;
    !this.$v.quantity.minLength && errors.push("Minimo 100 unidades");
    !this.$v.quantity.minValue && errors.push("Minimo 100 unidades");
    !this.$v.quantity.required && errors.push("El campo es requerido");
    return errors;
  }
  get priceErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.price.$dirty) return errors;
    !this.$v.price.minLength && errors.push("Minimo de caracteres 3");
    !this.$v.price.required && errors.push("El campo es requerido");
    return errors;
  }
}
</script>

<style lang="sass" scoped>
.commission_info
  color: $card-link
  border: 1px solid $menu-items
  background-color: $card-bg
  border-radius: 15px

p
  margin: 4px

.mb-less
  margin-bottom: -24px!important

.btn-request-mt-less
  margin-top: -28px

.btn-gradient
  background: $button-gradient
  color: $background!important
</style>
