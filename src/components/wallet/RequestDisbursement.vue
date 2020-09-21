<template>
  <v-container>
    <v-row class="mt-2" align="center" justify="space-between">
      <v-col cols="12" sm="12" md="12">
        <h3 class="title">Solicitar Desembolso</h3>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="d-flex justify-start" cols="6" sm="6" md="5">
        <v-text-field
          placeholder="¿Cuánto quieres retirar?"
          rounded
          color="rgba(184,12,70,.6)"
          outlined
          class="text-field"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="5">
        <v-select
          :items="[]"
          placeholder="¿Donde lo quieres recibir?"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
      <v-col class="d-flex btn-request-mt-less" cols="12" sm="12" md="2">
        <v-btn
          rounded
          color="btn-gradient"
          class="button button--primary button--medium mt-4 px-6"
        ><b>
          Solicitar
          </b>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RequestDisbursement extends Vue {
  private panel: Array<number> = [0];
}
</script>

<style lang="sass" scoped>
.btn-request-mt-less
  margin-top: -44px

.select-field,
.text-field
  font-size: 13.5px

.btn-gradient
  background: $button-gradient
  color: $background!important

</style>
