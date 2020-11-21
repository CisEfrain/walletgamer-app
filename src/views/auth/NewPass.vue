<template>
  <v-container>
    <v-row class="mt-4">
      <img class="logo" src="../../assets/logo.png" alt="Logo Admin" />
    </v-row>
    <v-row class="mt-12" align="center" justify="center">
      <h3 class="mt-12 main-title">Nueva contraseña</h3>
    </v-row>

    <hr class="custom-divider mt-4 mb-4" />
    <v-row align="center" justify="center">
      <v-col cols="6" md="6" align="center">
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
        <v-text-field
          v-model="$v.repeatPassword.$model"
          :error-messages="repeatPasswordErrors"
          @input="$v.repeatPassword.$touch()"
          @blur="$v.repeatPassword.$touch()"
          required
          class="text-field mt-6"
          label="Ingresa nuevamente tu contraseña"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
          :append-icon="repeatShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="repeatShowPassword ? 'text' : 'password'"
          @click:append="repeatShowPass = !repeatShowPass"
          counter
        ></v-text-field>
        <v-btn
          rounded
          @click="sendNewPassword"
          :disabled="isDisabled"
          color="btn-gradient"
          class="button button--primary button--medium px-8 mt-6"
        >
          <b>Confirmar</b>
        </v-btn>
        <v-row align="center" justify="center">
          <v-col class="mt-4">
            <router-link class="register-text links" to="login">
              <p>Volver al login</p>
            </router-link>
          </v-col>
        </v-row>
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
  width: 400px

.btn-gradient
  background: $button-gradient
  color: $background!important
</style>
<script lang="ts">
/* eslint-disable no-undef */
import { Component, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

@Component
export default class RecoveryPass extends Vue {
  @Validate({ required, minLength: minLength(8) }) password = "";
  @Validate({
    required,
    minLength: minLength(8),
    sameAs: sameAs("password"),
  })
  repeatPassword = "";
  token: string | any = "";
  public showPass = false;
  public repeatShowPass = false;

  created() {
    const { token } = this.$route.query;
    if (!token) return this.$router.replace("/login");
    this.token = token;
    console.log(this.token);
  }

  private sendNewPassword() {
    const newPassword = {
      pass: this.password,
      token: this.token
    };
    this.$store.dispatch("newPass", newPassword);
    this.clearForm();
  }

  get showPassword(): boolean {
    return this.showPass ? true : false;
  }

  get repeatShowPassword(): boolean {
    return this.repeatShowPass ? true : false;
  }

  private clearForm(): void {
    this.$v.$reset();
    this.password = "";
  }

  get isDisabled(): boolean {
    return this.password !== this.repeatPassword || this.password === ""
      ? true
      : false;
  }
  get passwordErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.password.$dirty) return errors;
    !this.$v.password.required && errors.push("El campo es requerido");
    !this.$v.password.minLength &&
      errors.push("Debe contener minimo 8 digitos");
    return errors;
  }
  get repeatPasswordErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.repeatPassword.$dirty) return errors;
    !this.$v.repeatPassword.required && errors.push("El campo es requerido");
    !this.$v.repeatPassword.minLength &&
      errors.push("Debe contener minimo 8 digitos");
    !this.$v.repeatPassword.sameAs &&
      errors.push("Tus contraseñas no son exactamente iguales");
    return errors;
  }
}
</script>
