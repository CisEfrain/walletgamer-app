<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-select
          :items="itemList"
          label="Item"
          outlined
          v-model="$v.item.$model"
          :error-messages="itemErrors"
          @input="$v.item.$touch()"
          @blur="$v.item.$touch()"
          required
          rounded
          color="rgba(184,12,70,.6)"
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
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          Label="Cantidad disponible"
          rounded
          placeholder="Cantidad disponible"
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
          Label="Precio"
          placeholder="Precio"
          rounded
          v-model="$v.price.$model"
          :error-messages="priceErrors"
          @input="$v.price.$touch()"
          @blur="$v.price.$touch()"
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
            <p>Comision: 5%</p>
            <h5>Por cada item vendido recibiras: 0</h5>
          </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required, minLength } from "vuelidate/lib/validators";

@Component
export default class ItemsForm extends Vue {
  @Validate({ required }) item = null;
  @Validate({ required }) faction = null;
  @Validate({ required, minLength: minLength(1) }) quantity = null;
  @Validate({ required, minLength: minLength(2) }) price = null;

  private factionList: Array<string> = [
    "Horde",
    "Alliance",
    "Horde Force",
    "Steamwheedle Cartel",
  ];
  private itemList: Array<string> = [
      "Alavacio Incorrupto",
      "Vermis de ascuas",
      "Riendas de invencibles",
      "Marca de honor",
      "Talisman de mascota pulido",
      "Tueno furioso"
  ]

  private addItemPost(): void {
    const newItemPost = {
      item:     this.item,
      faction:  this.faction,
      quantity: this.quantity,
      price:    this.price
    };
    //this.$store.dispatch("setNewExpenditureData", newExpenditure)
    console.log(newItemPost);
    this.clearForm();
  }

  private clearForm(): void {
    this.$v.$reset();
    this.item     = null;
    this.faction  = null;
    this.quantity = null;
    this.price    = null;
  }

  get isDisabled(): boolean {
    return !this.item || !this.faction || !this.quantity || !this.price
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
    return errors;
  }
  get priceErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.price.$dirty) return errors;
    !this.$v.price.minLength && errors.push("Minimo de caracteres 2");
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
