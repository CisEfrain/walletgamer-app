<template>
  <v-container class="mt-8">
    <v-row align="center" justify="center" class="mt-6">
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="realmList"
          v-model="realmSelected"
          label="Reino"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
          @change="filterGold"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="factionList"
          v-model="factionSelected"
          label="Facción"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
          @change="filterGold"
        ></v-select>
      </v-col>
    </v-row>

    <GoldItemList
      v-for="(goldPost, $index) in showFiltered"
      :key="goldPost.id"
      :user="goldPost.usuario.nombre"
      :rank="goldPost.usuario.rango || 'Pollo'"
      :kingdom="goldPost.reino"
      :faction="goldPost.faccion"
      :price="goldPost.precio"
      :product="goldPost.tipo"
      :available="goldPost.cantidad"
      @click="buyGold($index, goldPost.id)"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue";
import GoldItemList from "@/components/buy/GoldItemList.vue";

@Component({
  components: {
    ProductCard,
    GoldItemList
  }
})
export default class BuyGoldList extends Vue {
  private realmSelected = "";
  private factionSelected = "";
  private goldList: Array<unknown> = [];

  get factionList(): Array<string> {
    return this.$store.getters.getFactionList;
  }

  get realmList(): Array<string> {
    return this.$store.getters.getRealmList;
  }

  get postGoldList(): Array<unknown> {
    return this.$store.getters.getGoldPostList.reverse();
  }

  get showFiltered(): any {
    return this.goldList.length <= 0 ? this.postGoldList : this.goldList;
  }

  private filterGold(): void {
    this.goldList = this.postGoldList.filter((goldPost: any) => {
      return (
        goldPost.reino === this.realmSelected ||
        goldPost.faccion === this.factionSelected
      );
    });
  }
}
</script>

<style lang="sass" scoped>
.select-field
  height: 42px
  font-size: 14px
  width: 270px
</style>
