<template>
  <v-container>
    <v-row class="mt-4">
      <img class="logo" src="../../assets/logo.png" alt="Logo Admin" />
    </v-row>
    <v-row class="mt-12" align="center" justify="center">
      <h3 class="mt-12 title">Ingreso a tu cuenta Gamer</h3>
    </v-row>

    <hr class="custom-divider mt-4 mb-4" />
    <v-row align="center" justify="center">
      <v-col cols="6" md="6" align="center">
        <v-text-field
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
          class="text-field"
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
        <v-btn
          rounded
          @click="login"
          :disabled="isDisabled"
          color="btn-gradient"
          class="button button--primary button--medium px-8 mt-6"
        >
          <b>Entrar</b>
        </v-btn>
        <v-row align="center" justify="center">
          <v-col>
            <small>
              <router-link class="register-text links" to="Register">
                ¿No tienes una cuenta?
                <p>Registrate aquí</p>
              </router-link>
            </small>
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
import { Component, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required, email, minLength } from "vuelidate/lib/validators";

@Component
export default class LoginPage extends Vue {
  @Validate({ required, email }) email = "";
  @Validate({ required, minLength: minLength(8) }) password = "";
  public showPass = false;

  private async login() {
    const loginData = {
      email: this.email,
      pass: this.password
    };
    console.log(loginData);
    this.$store.dispatch("setLogin", loginData);
  }

  get showPassword(): boolean {
    return this.showPass ? true : false;
  }

  private clearForm(): void {
    this.$v.$reset();
    this.email = "";
    this.password = "";
  }

  get isDisabled(): boolean {
    return !this.email || !this.password ? true : false;
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
