<template>
  <v-container>
    <v-navigation-drawer
      v-model="showForm"
      absolute
      right
      temporary
      width="420"
    >
      <v-container>
        <v-row align="center" class="px-8" justify="center">
          <v-col cols="12" md="12" align="center">
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
            <v-row align="center" justify="center" class="mt-4">
              <v-col class="d-flex justify-space-around">
                <router-link
                  class="register-text links ml-6 pl-6"
                  to="register"
                >
                  <p>Registrate aquí</p>
                </router-link>
                <router-link
                  class="register-text links mr-6 pr-6"
                  to="recovery-password"
                >
                  <p>Olvide mi contraseña</p>
                </router-link>
              </v-col>
              <!-- <v-col class="d-flex justify-start">
            
              
          </v-col> -->
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required, email, minLength } from "vuelidate/lib/validators";

@Component
export default class AsideForm extends Vue {
  @Prop({ required: true, type: Boolean })
  drawer!: boolean;
  @Validate({ required, email }) email = "";
  @Validate({ required, minLength: minLength(8) }) password = "";
  public showPass = false;

  private async login() {
    const loginData = {
      email: this.email,
      pass: this.password
    };
    this.$store.dispatch("setLogin", loginData);
  }

  get showForm(): boolean {
    return this.drawer;
  }
  set showForm(show) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isForm = show;
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
