<template>
<v-container class="mt-12">
  
    <v-row class="mt-12" align="center" justify="center">
      <h3 class="mt-12 mb-4 title">¿Qué te interesa comprar?</h3>
    </v-row>
    <v-row class="d-flex justify-center">
      <ProductCard productTitle="Gold"/>
      <ProductCard productTitle="Personajes"/>
      <ProductCard productTitle="Items"/>
    </v-row>
    <v-row align="center" justify="center" class="mt-6">
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="realm"
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
          :items="factions"
          label="Facción"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
    </v-row>

  <GoldItemList
    user="Diosdado Garcia"
    rank="Elite"
    kingdom="Psuv"
    faction="Horda"
    price="20"
    product="10.000"
    available="1.000.000"
  />
  <CharactersItemList
    user="Manuel Perez"
    rank="Newbie"
    kingdom="AD"
    faction="Horda"
    characterClass="Magician"
    price="100"
    level="60"
  />
  <ItemsItemList
    user="Mariana Lyn"
    rank="Asesinos"
    faction="Horda"
    price="10"
    item="Toddy"
    available="200"
  />

  <BaseModal />


</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue"
import GoldItemList from "@/components/ItemsItemList.vue"
import CharactersItemList from "@/components/CharactersItemList.vue"
import ItemsItemList from "@/components/ItemsItemList.vue"
import BaseModal from "@/components/BaseModal.vue"


@Component({
  components:{
    ProductCard,
    GoldItemList,
    CharactersItemList,
    ItemsItemList,
    BaseModal
  }
})
export default class Buy extends Vue {
    private realm: Array<string> = [
      "Aegwynn",
      "Aerie Peak",
      "Aggramar",
      "Akama",
      "Altar of Storms"
  ]
  private factions: Array<string> = [
      "Horde",
      "Alliance",
      "Horde Force",
      "Steamwheedle Cartel"
  ]
}
</script>

<style lang="sass" scoped>
.select-field
  height: 42px
  font-size: 14px
  width: 270px

</style>
