<template>
  <v-container class="mt-8 px-12">
    <v-row class="px-4">
      <h2 class="title">Mis datos</h2>
    </v-row>
    <v-row align="center" justify="space-between" class="mt-6">
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          placeholder="Nombre y apellido"
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
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          placeholder="Contraseña"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          placeholder="Tu mejor email"
          rounded
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
        color="btn-gradient"
        class="button button--primary button--medium px-6"
        ><b>
          Modificar
        </b>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class UserInfo extends Vue {}
</script>

<style lang="sass" scoped>
.mb-less
  margin-bottom: -24px!important

.btn-gradient
  background: $button-gradient
  color: $background!important
</style>
