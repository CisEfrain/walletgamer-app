<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col class="d-flex">
        <v-select
          :items="realmList"
          label="Reino"
          outlined
          v-model="$v.realm.$model"
          :error-messages="realmErrors"
          @input="$v.realm.$touch()"
          @blur="$v.realm.$touch()"
          class="sell-input"
          required
          rounded
          color="rgba(184,12,70,.6)"
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex">
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
      <v-col>
        <v-select
          :items="classList"
          label="Clases"
          outlined
          v-model="$v.pjClass.$model"
          :error-messages="pjClassErrors"
          @input="$v.pjClass.$touch()"
          @blur="$v.pjClass.$touch()"
          required
          rounded
          color="rgba(184,12,70,.6)"
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex">
        <v-select
          :items="levelList"
          label="Nivel"
          outlined
          v-model="$v.level.$model"
          :error-messages="levelErrors"
          @input="$v.level.$touch()"
          @blur="$v.level.$touch()"
          required
          rounded
          color="rgba(184,12,70,.6)"
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="2">
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
          @click="addCharacterPost"
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
        <h5>Recibiras: 0</h5>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Component, Vue, Prop } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required, minLength } from "vuelidate/lib/validators";

@Component
export default class CharactersForm extends Vue {
  @Validate({ required }) realm = null;
  @Validate({ required }) faction = null;
  @Validate({ required }) pjClass = null;
  @Validate({ required }) level = null;
  @Validate({ required, minLength: minLength(1) }) price = null;
  private realmList: Array<string> = [
    "Aegwynn",
    "Aerie Peak",
    "Aggramar",
    "Akama",
    "Altar of Storms"
  ];
  private factionList: Array<string> = [
    "Horde",
    "Alliance",
    "Horde Force",
    "Steamwheedle Cartel"
  ];
  private classList: Array<string> = [
    "Warrior",
    "Paladín",
    "Pícaro",
    "Hunter",
    "Priest",
    "Sorcerer",
    "Mage",
    "Monk",
    "Demon Hunter"
  ];
  private levelList: Array<number> = [15, 30, 45, 60];

  private addCharacterPost(): void {
    const newCharacterPost = {
      tipo: "Personaje",
      reino: this.realm,
      faccion: this.faction,
      clase: this.pjClass,
      nivel: this.level,
      precio: this.price,
      usuarios_id: this.$store.state.accountState.userData.id
    };
    this.$store.dispatch("addPost", newCharacterPost);
    this.$store.dispatch("getPosts");
    console.log(newCharacterPost);
    this.clearForm();
  }

  private clearForm(): void {
    this.$v.$reset();
    this.realm = null;
    this.faction = null;
    this.pjClass = null;
    this.level = null;
    this.price = null;
  }

  get isDisabled(): boolean {
    return !this.realm ||
      !this.faction ||
      !this.pjClass ||
      !this.level ||
      !this.price
      ? true
      : false;
  }

  get realmErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.realm.$dirty) return errors;
    !this.$v.realm.required && errors.push("El campo es requerido");
    return errors;
  }
  get pjClassErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.pjClass.$dirty) return errors;
    !this.$v.pjClass.required && errors.push("El campo es requerido");
    return errors;
  }
  get factionErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.faction.$dirty) return errors;
    !this.$v.faction.required && errors.push("El campo es requerido");
    return errors;
  }
  get classesErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.classes.$dirty) return errors;
    !this.$v.classes.required && errors.push("El campo es requerido");
    return errors;
  }
  get levelErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.level.$dirty) return errors;
    !this.$v.level.required && errors.push("El campo es requerido");
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

.sell-input
  width:200px!important

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
