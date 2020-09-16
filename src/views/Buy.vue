<template>
<v-container class="mt-16">
  
    <v-row class="mt-16" align="center" justify="center">
      <h3 class="mt-16 mb-4 title">¿Qué te interesa comprar?</h3>
    </v-row>
    <v-row class="d-flex justify-center">
      <ProductCard productTitle="Gold"/>
      <ProductCard productTitle="Personajes"/>
      <ProductCard productTitle="Items"/>
    </v-row>
    <v-row align="center" justify="center" class="mt-6">
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="items"
          label="Reino"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="items"
          label="Facción"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
    </v-row>

</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue"


@Component({
  components:{
    ProductCard
  }
})
export default class Buy extends Vue {}
</script>

<style lang="sass" scoped>
.select-field
  border: .8px solid #c7c5c5
  height: 42px
  font-size: 14px
  width: 270px

</style>
