<template>
  <v-container>
    <v-row class="mt-4">
      <img class="logo-gamer" src="../../assets/logo.png" alt="Logo Admin" />
    </v-row>
    <v-row class="mt-12" align="center" justify="center">
      <h3 class="mt-12 main-title">Registro de Gamers</h3>
    </v-row>

    <div class="custom-divider mt-1 mb-4"></div>
    <v-row class="d-flex justify-center">
      <v-col cols="6" md="4" class="d-flex align-end flex-column">
        <v-text-field
          class="text-field"
          label="Nombre y apellido"
          v-model="$v.fullName.$model"
          :error-messages="fullNameErrors"
          @input="$v.fullName.$touch()"
          @blur="$v.fullName.$touch()"
          required
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="$v.password.$model"
          :error-messages="passwordErrors"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          required
          class="text-field mt-6"
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

      <v-col cols="6" md="4" class="d-flex align-start flex-column">
        <v-text-field
          class="text-field"
          label="Teléfono movil"
          rounded
          v-model="$v.phoneNumber.$model"
          :error-messages="phoneNumberErrors"
          @input="$v.phoneNumber.$touch()"
          @blur="$v.phoneNumber.$touch()"
          required
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          class="text-field mt-6"
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
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col align="center">
        <v-btn
          rounded
          @click="register"
          :disabled="isDisabled"
          color="btn-gradient"
          class="button button--primary button--medium px-8 mt-6"
          ><b>
            Registrarme
          </b>
        </v-btn>
        <div class="mt-4">
          <router-link class="register-text links" to="Login">
            <p class="register-text links">Ya tengo cuenta</p>
          </router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="sass" scoped>
.register-text
  font-weight: 600
  cursor: pointer

.text-field
  height: 42px
  font-size: 14px
  width: 300px

.custom-divider
  height: 2.4px
  max-width: 60%
  background-color: #c7c5c59a

.btn-gradient
  background: $button-gradient
  color: $background!important
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required, email, minLength } from "vuelidate/lib/validators";

@Component
export default class Register extends Vue {
  @Validate({ required, minLength: minLength(5) }) fullName = null;
  @Validate({ required, minLength: minLength(5) }) phoneNumber = null;
  @Validate({ required, email }) email = null;
  @Validate({ required, minLength: minLength(8) }) password = null;
  public showPass = false;

  private register(): void {
    const registerData = {
      nombre: this.fullName,
      email: this.email,
      telefono: this.phoneNumber,
      pass: this.password,
      activo: true,
      rango: "Pollo"
    };
    this.$store.dispatch("setRegister", registerData);
    console.log(registerData);
    this.clearForm();
  }

  private clearForm(): void {
    this.$v.$reset();
    this.email = null;
    this.password = null;
    //this.phoneNumber = null;
    this.fullName = null;
  }

  get showPassword(): boolean {
    return this.showPass ? true : false;
  }

  // || !this.phoneNumber
  get isDisabled(): boolean {
    return !this.fullName || !this.password || !this.$v.email.email
      ? true
      : false;
  }

  get fullNameErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.fullName.$dirty) return errors;
    !this.$v.fullName.required && errors.push("El campo es requerido");
    !this.$v.fullName.minLength &&
      errors.push("Debe contener minimo 5 digitos");
    return errors;
  }
  get phoneNumberErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.phoneNumber.$dirty) return errors;
    !this.$v.phoneNumber.required && errors.push("El campo es requerido");
    !this.$v.phoneNumber.minLength &&
      errors.push("Debe contener minimo 5 digitos");
    return errors;
  }
  get emailErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.email.$dirty) return errors;
    !this.$v.email.required && errors.push("El campo es requerido");
    !this.$v.email.email && errors.push("El email debe ser valido");
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
