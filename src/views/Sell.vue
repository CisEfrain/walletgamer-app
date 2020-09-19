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
              >Ingresa los detalles de tu compra de {{$store.state.activeProduct}} World Warcraft Classic</h3>
              <v-row class="d-flex justify-center">
                <GoldItemList
                  user="Diosdado Garcia"
                  rank="Elite"
                  kingdom="Psuv"
                  faction="Horda"
                  price="20"
                  product="10.000"
                  available="1.000.000"
                />
              </v-row>
              <v-row align="center" justify="center" class="mt-6">
                <v-col class="d-flex" cols="3" sm="3">
                  <v-text-field
                    label="Personaje receptor (PJ)"
                    outlined
                    rounded
                    color="rgba(184,12,70,.6)"
                    dense
                    class="select-field"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="3" sm="3">
                  <v-text-field
                    label="Personaje receptor (PJ)"
                    outlined
                    rounded
                    color="rgba(184,12,70,.6)"
                    dense
                    class="select-field"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="3" sm="3">
                  <v-select
                    :items="payment_methods"
                    label="Medio de pago"
                    outlined
                    rounded
                    color="rgba(184,12,70,.6)"
                    dense
                    class="select-field"
                  ></v-select>
                </v-col>
              </v-row>

              <button
                type="button"
                class="button button--primary button--medium"
                @click="e1 = 2"
              >Continuar</button>

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
import ProductCard from "@/components/ProductCard.vue";

import GoldItemList from "@/components/GoldItemList.vue";
@Component({
  components: {
    ProductCard,
    GoldItemList
  }
})
export default class Sell extends Vue {
  e1 = 1;
  payment_methods = ["paypal", "stripe"];
}
</script>

<style lang="sass">
</style>