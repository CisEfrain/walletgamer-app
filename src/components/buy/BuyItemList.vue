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
          @change="filterItem"
          v-model="itemSelected"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="factionList"
          label="Facción"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
          @change="filterItem"
          v-model="factionSelected"
        ></v-select>
      </v-col>
    </v-row>

    <ItemsItemList
      v-for="(itemPost, $index) in showFiltered"
      :key="itemPost.id"
      :user="itemPost.usuario.nombre"
      :rank="itemPost.rango || 'Pollo'"
      :faction="itemPost.faccion"
      :price="itemPost.precio"
      :item="itemPost.descripcion"
      :available="itemPost.cantidad"
      @click="buyItem($index, itemPost.id)"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue";
import ItemsItemList from "@/components/buy/ItemsItemList.vue";

@Component({
  components: {
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
  ];


  get factionList(): Array<string> {
    return this.$store.getters.getFactionList;
  }

  private itemSelected = "";
  private factionSelected = "";
  private itemList: Array<unknown> = [];

  get postItemList(): any {
    return this.$store.getters.getItemPostList.reverse();
  }

  get showFiltered(): any {
    return this.itemList.length <= 0 ? this.postItemList : this.itemList;
  }

  private filterItem(): void {
    this.itemList = this.postItemList.filter((itemPost: any) => {
      return (
        itemPost.descripcion === this.itemSelected ||
        itemPost.faccion === this.factionSelected
      );
    });
  }

  private buyItem(index: any, id: any) {
    console.info(index, id);
  }
}
</script>

<style lang="sass" scoped>
.select-field
  height: 42px
  font-size: 14px
  width: 270px
</style>
