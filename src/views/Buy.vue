<template>
<v-container >
  
    <v-row align="center" justify="center">
      <h3 class="mt-12 mb-4 title">¿Qué te interesa comprar?</h3>
    </v-row>

    <v-row class="d-flex justify-center">
        <ProductCard 
          v-for="(product,$index) in productListNotEmpty" 
          :key="$index"
          :productTitle="product" 
          @selected="selectProduct(product)"
        />
    </v-row>
    <keep-alive>
      <component :is="productListSelected"></component>
    </keep-alive>

  <!-- <BaseModal /> -->


</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue"
// import GoldItemList from "@/components/ItemsItemList.vue"
// import CharactersItemList from "@/components/CharactersItemList.vue"
// import ItemsItemList from "@/components/ItemsItemList.vue"
//import BaseModal from "@/components/BaseModal.vue"
import BuyGoldList from "@/components/BuyGoldList.vue"
import BuyPersonajeList from "@/components/BuyCharacterList.vue"
import BuyItemsList from "@/components/BuyItemList.vue"


@Component({
  components:{
    ProductCard,
    BuyGoldList,
    BuyPersonajeList,
    BuyItemsList,
    // GoldItemList,
    // CharactersItemList,
    // ItemsItemList,
    //BaseModal
  }
})
export default class Buy extends Vue {
  public productList: Array<string> = [
    "Gold", "Personaje", "Items", ""
  ]
  public currentProduct: Array<string> = [""]

  public selectProduct(tab:any):void {
    console.info(tab)
    this.currentProduct = tab

  }

  get productListNotEmpty(): any{
    return this.productList.filter(product => product.length > 0)
  }

  get productListSelected(): any{
    console.info(`Buy${this.currentProduct}List`)
    return `Buy${this.currentProduct}List`
  }
}
</script>

<style lang="scss" scoped>
.v-list-item--active{
  background: #ca3b3b!important;
}
  
</style>
