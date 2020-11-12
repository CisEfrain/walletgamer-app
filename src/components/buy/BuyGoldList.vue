<template>
  <v-container class="mt-8">
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
      v-for="(goldPost, $index) in postGoldList"
      :key="goldPost.id"
      user="Default Name"
      :rank="goldPost.rango"
      :kingdom="goldPost.reino"
      :faction="goldPost.faccion"
      :price="goldPost.precio"
      :product="goldPost.tipo"
      :available="goldPost.cantidad"
      @click="buyGold($index, goldPost.id)"
    />

    <!-- <GoldItemList
      user="Diosdado Garcia"
      rank="Elite"
      kingdom="Psuv"
      faction="Horda"
      price="20"
      product="10.000"
      available="1.000.000"
    />
    <GoldItemList
      user="Diosdado Garcia"
      rank="Elite"
      kingdom="Psuv"
      faction="Horda"
      price="20"
      product="10.000"
      available="1.000.000"
    />
    <GoldItemList
      user="Diosdado Garcia"
      rank="Elite"
      kingdom="Psuv"
      faction="Horda"
      price="20"
      product="10.000"
      available="1.000.000"
    /> -->
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue";
import GoldItemList from "@/components/buy/GoldItemList.vue";

@Component({
  components: {
    ProductCard,
    GoldItemList
  }
})
export default class BuyGoldList extends Vue {
  private realm: Array<string> = [
    "Aegwynn",
    "Aerie Peak",
    "Aggramar",
    "Akama",
    "Altar of Storms"
  ];
  private factions: Array<string> = [
    "Horde",
    "Alliance",
    "Horde Force",
    "Steamwheedle Cartel"
  ];

  get postGoldList(): any {
    return this.$store.getters.getGoldPostList;
  }
}
</script>

<style lang="sass" scoped>
.select-field
  height: 42px
  font-size: 14px
  width: 270px
</style>
