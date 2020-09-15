<template>
  <v-container class="mt-16">
    <v-row class="mt-16" align="center" justify="center">
      <h3 class="mt-16 title">Registro de Gamers</h3>
    </v-row>

    <hr class="custom-divider mt-1 mb-4" />
    <v-row class="d-flex justify-center">
      <v-col cols="6" md="4" class="d-flex align-end flex-column">
        <v-text-field
          class="text-field"
          placeholder="Nombre y apellido"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
        <v-text-field
        class="text-field mt-6"
          placeholder="Contraseña"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
        <v-text-field
        class="text-field mt-6"
          placeholder="Email"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="6" md="4" class="d-flex align-start flex-column">
        <v-text-field
          class="text-field"
          placeholder="Teléfono movil"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          class="text-field mt-6"
          placeholder="Confirmar la contraseña"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          class="text-field mt-6"
          placeholder="Confirma el email"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
          <v-col align="center">
            <base-button label="Registrarme" />
            <div class="mt-2">
              <small class="register-text links">
              <p>Ya tengo cuenta</p>
            </small>
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
  border: .8px solid #c7c5c5
  height: 42px 
  font-size: 14px
  width: 270px
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseButton from "@/components/BaseButton.vue";

@Component({
  components: {
    BaseButton
  }
})
export default class Register extends Vue {}
</script>
