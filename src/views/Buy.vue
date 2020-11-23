<template>
  <v-container class="px-8">
    <h2 class="custom-class">
      <a href="/payment">
        to payment
      </a>
    </h2>
    <v-row align="center" justify="start">
      <h3 class="mt-12 mb-4 main-title">¿Qué te interesa comprar?</h3>
    </v-row>

    <v-row align="center" class="responsive-card ml-1">
      <ProductCard
        v-for="(product, $index) in productList"
        :key="$index"
        :productTitle="product"
        @selected="selectProduct(product)"
      />
    </v-row>
    <transition name="slide-fade">
      <keep-alive>
        <component
          :key="productListSelected"
          :is="productListSelected"
        ></component>
      </keep-alive>
    </transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
  public currentProduct = "";

  public selectProduct(tab: any): void {
    this.currentProduct = tab;
  }

  created() {
    //this.$store.dispatch("getAllPosts");
  }

  get productListSelected(): any {
    return this.currentProduct && `Buy${this.currentProduct}List`;
  }
}
</script>

<style lang="sass" scoped>
.slide-fade-enter-active
  transition: all .3s ease-in

.slide-fade-leave-active
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-to
  transform: translateY(20px)
  transition: all .2s ease-out
  opacity: .1
</style>
