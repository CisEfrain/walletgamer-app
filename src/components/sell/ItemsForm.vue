<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          label="Nombre de item"
          rounded
          v-model="$v.item.$model"
          :error-messages="itemErrors"
          @input="$v.item.$touch()"
          @blur="$v.item.$touch()"
          required
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
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
          background-color="white"
          rounded
          color="rgba(184,12,70,.6)"
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          label="Cantidad disponible"
          rounded
          type="number"
          min="1"
          v-model="$v.quantity.$model"
          :error-messages="quantityErrors"
          @input="$v.quantity.$touch()"
          @blur="$v.quantity.$touch()"
          required
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          label="Precio"
          rounded
          v-model="$v.price.$model"
          :error-messages="priceErrors"
          @input="$v.price.$touch()"
          @blur="$v.price.$touch()"
          @keyup="calculateComision(price)"
          required
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
          @click="addItemPost"
          :disabled="isDisabled"
          ><b>
            Publicar
          </b>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-4" justify="center">
      <v-col class="commission_info text-center px-4 py-4" cols="4">
        <p>Comision: {{ itemData.comision }}%</p>
        <h5>
          Por cada item vendido recibiras:
          {{ netPrice }}$
        </h5>
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
export default class ItemsForm extends Vue {
  @Validate({ required }) item = null;
  @Validate({ required }) faction = null;
  @Validate({ required, minLength: minLength(1), minValue: minValue(1) })
  quantity!: number | string;
  @Validate({ required, minLength: minLength(1) }) price = null;

  public comision: any;
  public getPrice = 0;

  get totalPrice(): unknown {
    return new Intl.NumberFormat().format(this.getPrice);
  }
  private calculateComision(e: any): void {
    console.info(e);
    const price = parseInt(e);
    this.getPrice =
      price - (price / 100) * this.$store.getters.getItemsPostData.comision;
    console.info(this.getPrice);
  }
  get itemData(): void {
    this.comision = this.$store.getters.getItemsPostData;
    return this.$store.getters.getItemsPostData;
  }
  get netPrice(): any {
    return Object.is(NaN, this.getPrice) ? 0 : this.totalPrice;
  }

  get factionList(): Array<string> {
    return this.$store.getters.getFactionList;
  }

  private itemList: Array<string> = [
    "Alavacio Incorrupto",
    "Vermis de ascuas",
    "Riendas de invencibles",
    "Marca de honor",
    "Talisman de mascota pulido",
    "Trueno furioso"
  ];

  private addItemPost(): void {
    const newItemPost = {
      tipo: this.$store.getters.getItemsPostData.id,
      faccion: this.faction,
      descripcion: this.item,
      cantidad: this.quantity,
      precio: this.price
    };
    this.$store.dispatch("addPost", newItemPost);
    this.$store.dispatch("getPosts",{ size: 10, page: 0 });
    console.log(newItemPost);
    this.clearForm();
  }

  private clearForm(): void {
    this.$v.$reset();
    this.item = null;
    this.faction = null;
    this.quantity = "";
    this.price = null;
  }

  get isDisabled(): boolean {
    return !this.item || !this.faction || this.quantity < 1 || !this.price
      ? true
      : false;
  }

  get itemErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.item.$dirty) return errors;
    !this.$v.item.required && errors.push("El campo es requerido");
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
    !this.$v.quantity.minLength && errors.push("Minimo de caracteres 1");
    !this.$v.quantity.required && errors.push("El campo es requerido");
    !this.$v.quantity.minValue && errors.push("Minimo 1 item");
    return errors;
  }
  get priceErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.price.$dirty) return errors;
    !this.$v.price.minLength && errors.push("Minimo de caracteres 1");
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
