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
          background-color="white"
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
          background-color="white"
        ></v-select>
      </v-col>
    </v-row>

    <ItemsItemList
      class="animated fadeIn fast"
      v-for="(itemPost, $index) in showFiltered"
      :key="itemPost.id"
      :user="itemPost.usuario.nombre"
      :rank="itemPost.usuario.rango || 'Pollo'"
      :faction="itemPost.faccion"
      :price="itemPost.precio"
      :item="itemPost.descripcion"
      :available="itemPost.cantidad"
      @click="buyItem($index, itemPost.id, itemPost)"
      actions
    />
    <div class="text-center">
      <v-pagination
        v-if="itemPages > 1"
        v-model="itemPage"
        :length="itemPages"
        color="#E4445B"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        total-visible="10"
        @input="handlePagination"
      >
      </v-pagination>
    </div>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  public itemPage = 1;

  get postItemList(): any {
    return this.$store.getters.getItemPostList;
  }

  created() {
    this.$store.dispatch("getItemPosts", { size: 10, page: 0 });
  }

  get itemPages(): number {
    return Math.ceil(this.$store.getters.getItemCount / 10);
  }

  private handlePagination(e): void {
    console.info(e);
    this.itemPage = e;
    this.$store.dispatch("getItemPosts", { size: 10, page: e - 1 });
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

  private buyItem(index: any, id: any, itemPost: any) {
    console.info(index, id);
    console.info(index, id, itemPost);
    this.$router.replace("/payment");
    this.$store.dispatch("setProductToBuy", itemPost);
  }
}
</script>

<style lang="sass" scoped>
.select-field
  height: 42px
  font-size: 14px
  width: 270px
</style>
