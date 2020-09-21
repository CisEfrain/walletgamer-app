<template>
<v-container class="mt-8">
    <v-row align="center" justify="center" class="mt-6">
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="items"
          label="Items"
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

  <ItemsItemList
    user="Mariana Lyn"
    rank="Asesinos"
    faction="Horda"
    price="10"
    item="Toddy"
    available="200"
  />
  <ItemsItemList
    user="Mariana Lyn"
    rank="Asesinos"
    faction="Horda"
    price="10"
    item="Toddy"
    available="200"
  />
  <ItemsItemList
    user="Mariana Lyn"
    rank="Asesinos"
    faction="Horda"
    price="10"
    item="Toddy"
    available="200"
  />
  <ItemsItemList
    user="Mariana Lyn"
    rank="Asesinos"
    faction="Horda"
    price="10"
    item="Toddy"
    available="200"
  />

</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue"
import ItemsItemList from "@/components/buy/ItemsItemList.vue"

@Component({
  components:{
    ProductCard,
    ItemsItemList
  }
})
export default class BuyItemList extends Vue {
    private items: Array<string> = [
      "Alavacio Incorrupto",
      "Vermis de ascuas",
      "Riendas de invencibles",
      "Marca de honor",
      "Talisman de mascota pulido",
      "Tueno furioso"
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
