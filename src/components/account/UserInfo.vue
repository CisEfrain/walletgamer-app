<template>
  <v-container class="mt-8 px-12">
    <v-row class="px-4">
      <h2 class="title">Mis datos</h2>
    </v-row>
    <v-row align="center" justify="space-between" class="mt-6 mb-less">
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          placeholder="Nombre y apellido"
          v-model="$v.name.$model"
          :error-messages="nameErrors"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          placeholder="Telefono movil"
          v-model="$v.phone.$model"
          :error-messages="phoneErrors"
          @input="$v.phone.$touch()"
          @blur="$v.phone.$touch()"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          v-model="$v.password.$model"
          :error-messages="passwordErrors"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          required
          class="text-field"
          label="Contraseña"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPass = !showPass"
          counter
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          rounded
          disabled
          v-model="$v.email.$model"
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="px-4">
      <v-btn
        rounded
        @click="updateUserData"
        :disabled="isDisabled"
        color="btn-gradient"
        class="button button--primary button--medium px-6 mt-6"
      >
        <b>Modificar</b>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required, minLength } from "vuelidate/lib/validators";

interface UpdateData {
  pass?: string;
  nombre?: string;
  telefono?: string;
}

@Component
export default class UserInfo extends Vue {
  @Validate({ required }) name = "";
  @Validate({ required, minLength: minLength(8) }) password = "";
  @Validate({ required }) phone = "";
  @Validate({ required }) email = "";
  public showPass = false;
  public isDisable = true;

  mounted() {
    this.getUser();
  }

  private async updateUserData() {
    const updateData: UpdateData = {};
    this.name ? (updateData.nombre = this.name) : null;
    this.password ? (updateData.pass = this.password) : null;
    this.phone ? (updateData.telefono = this.phone) : null;

    console.info(updateData);
    this.$store.dispatch("updateUserData", updateData);
    this.$store.dispatch("setUserData");
    this.isDisable = true;
    this.clearForm();
  }

  private async getUser() {
    const { nombre, email, telefono } = await this.$store.state.accountState.userData;
    console.info("from UserInfo Component:", nombre, email);
    this.email = email;
    this.name = nombre;
    this.phone = telefono;
  }

  get showPassword(): boolean {
    return this.showPass ? true : false;
  }

  private clearForm(): void {
    this.$v.$reset();
    this.password = "";
  }

  get isDisabled(): boolean {
    return !this.name && this.password.length <= 7
      ? (this.isDisable = true)
      : (this.isDisable = false);
  }
  get nameErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.name.$dirty) return errors;
    !this.$v.name.required && errors.push("El campo es requerido");
    return errors;
  }
  get phoneErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.phone.$dirty) return errors;
    !this.$v.phone.required && errors.push("El campo es requerido");
    return errors;
  }
  get passwordErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.password.$dirty) return errors;
    !this.$v.password.required && errors.push("El campo es requerido");
    !this.$v.password.minLength &&
      errors.push("Debe contener minimo 8 digitos");
    return errors;
  }
}
</script>

<style lang="sass" scoped>
.mb-less
  margin-bottom: -40px!important

.btn-gradient
  background: $button-gradient
  color: $background!important
</style>
