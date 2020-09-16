<template>
  <v-container class="mt-16">
    <v-row class="mt-16" align="center" justify="center">
      <h3 class="mt-16 title">Ingreso a tu cuenta Gamer</h3>
    </v-row>

    <hr class="custom-divider mt-4 mb-4" />
    <v-row align="center" justify="center">
      <v-col cols="6" md="4" align="center">
        <v-text-field
          placeholder="Email"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          placeholder="Contraseña"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
        <base-button label="Entrar" @click="login()" />
        <v-row align="center" justify="center"  >
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
<style lang='sass' scoped>
.register-text
  font-weight: 600
  cursor: pointer

v-input
  height: 8px
</style>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

import BaseButton from "@/components/BaseButton.vue";
import { Login } from "@/services/auth.service";
@Component({
  components: {
    BaseButton
  }
})
export default class LoginPage extends Vue {
  login() {
    console.log("a")
    const response = Login("admin", "equis");
    alert(response);
  }
}
</script>