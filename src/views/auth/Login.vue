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
          placeholder="Email"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          class="text-field"
          dense
        ></v-text-field>
        <v-text-field
          placeholder="Contraseña"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          class="text-field mt-6"
          dense
        ></v-text-field>
        <v-btn
          rounded
          @click="login()"
          color="btn-gradient"
          class="button button--primary button--medium px-8 mt-6"
          ><b>
            Entrar
          </b>
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

import BaseButton from "@/components/base/BaseButton.vue";
import { Login } from "@/services/auth.service";
@Component({
  components: {
    BaseButton,
  },
})
export default class LoginPage extends Vue {
  login() {
    console.log("a");
    const response = Login("admin", "equis");
    alert(response);
  }
}
</script>
