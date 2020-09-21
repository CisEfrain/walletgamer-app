<template>
  <v-container class="px-8">
    <v-row align="center" justify="center">
      <h3 class="mt-12 mb-4 title">¿Qué te interesa comprar?</h3>
    </v-row>

    <v-row class="d-flex justify-center">
      <ProductCard
        v-for="(product,$index) in productList"
        :key="$index"
        :productTitle="product"
        @selected="selectProduct(product)"
      />
    </v-row>
    <transition name="slide-fade">
      <keep-alive>
      <component :key="productListSelected" :is="productListSelected"></component>
    </keep-alive>
    </transition>
    

  </v-container>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue";
import BuyGoldList from "@/components/buy/BuyGoldList.vue";
import BuyPersonajeList from "@/components/buy/BuyCharacterList.vue";
import BuyItemsList from "@/components/buy/BuyItemList.vue";

@Component({
  components: {
    ProductCard,
    BuyGoldList,
    BuyPersonajeList,
    BuyItemsList
  }
})
export default class Buy extends Vue {
  public productList: Array<string> = ["Gold", "Personaje", "Items"];
  public currentProduct: Array<string> = [""];

  public selectProduct(tab: any): void {
    this.currentProduct = tab;
  }

  get productListSelected(): any {
    return `Buy${this.currentProduct}List`;
  }
}
</script>

<style lang="sass" scoped>
.slide-fade-enter-active 
  transition: all .3s ease-in

.slide-fade-leave-active 
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-to
  transform: translateX(10px)
  transition: all .2s ease-out
  opacity: .4
</style>
