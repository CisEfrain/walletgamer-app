<template>
  <v-container>
    <h2 class="custom-class">Sell page view</h2>
    <v-row>
      <v-col cols="12">
        <br />
        <v-stepper v-model="e1" class="elevation-0 buy-stepper">
          <v-stepper-header class="elevation-0">
            <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"></v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="4"></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
                      <h3
          class="mt-12 mb-4 title text-center"
        >Ingresa los detalles de tu compra de Gold World Warcraft Classic</h3>
              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="e1 = 4">Continue</v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";

@Component
export default class Sell extends Vue {
  e1 = 1;
}
</script>

<style lang="sass">
</style>