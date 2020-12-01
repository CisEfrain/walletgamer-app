<template>
  <v-container>
    <v-row class="mt-4">
      <img class="logo-gamer" src="../../assets/logo.png" alt="Logo Admin" />
    </v-row>
    <v-row class="mt-12" align="center" justify="center">
      <h3 class="mt-12 main-title">Reestablecer contraseña</h3>
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
        <v-btn
          rounded
          @click="sendRecoveryEmail"
          :disabled="isDisabled"
          color="btn-gradient"
          class="button button--primary button--medium px-8 mt-6"
        >
          <b>Reestablecer</b>
        </v-btn>
        <v-row align="center" justify="center">
          <v-col class="mt-4">
            <router-link class="register-text links" to="Register">
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
  font-size: .88em!important


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
import { required, email } from "vuelidate/lib/validators";

@Component
export default class RecoveryPass extends Vue {
  @Validate({ required, email }) email = "";
  public showPass = false;

  private sendRecoveryEmail() {
    const recoveryEmail = {
      email: this.email
    };
    this.$store.dispatch("recoveryPass", recoveryEmail);
    this.clearForm();
  }

  get showPassword(): boolean {
    return this.showPass ? true : false;
  }

  private clearForm(): void {
    this.$v.$reset();
    this.email = "";
  }

  get isDisabled(): boolean {
    return !this.$v.email.email || this.email === "" ? true : false;
  }
  get emailErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.email.$dirty) return errors;
    !this.$v.email.required && errors.push("El campo es requerido");
    !this.$v.email.email && errors.push("El email debe ser valido");
    return errors;
  }
}
</script>
