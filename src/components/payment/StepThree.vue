<template>
  <div>
    <v-row justify="center">
      <v-col md="12" class="d-flex justify-center px-16">
        <!-- <ConditionalItemCard class="conditionalCard" /> -->
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="12" class="d-flex justify-center px-16">
        <ConditionalBuyCard class="conditionalCard" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <h3 class="main-title text-center">
          {{ state.principal }}
        </h3>
      </v-col>

      <v-col cols="12">
        <p class="text-center">
          {{ state.secundario }}
        </p>

        <div class="animated fadeIn fast" v-if="state.intrucciones">
          <v-row class="mt-4" justify="center">
            <v-col class="instructions text-center px-4 py-4" cols="10">
              <p>
                {{ state.intrucciones }}
              </p>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col cols="12">
        <p class="text-center">
          Haz clic en el siguiente botón para confirmar la recepción
        </p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn
        type="button"
        rounded
        color="btn-gradient"
        class="button button--primary button--medium mt-4 px-6"
        @click="$store.dispatch('confirmBuyProduct', currentProduct.id)"
        >Confirmar
      </v-btn>

      <v-btn
        rounded
        color="blue-grey darken-4"
        class="btn-dark ml-3 mt-4 px-6"
        @click="$store.dispatch('nextStep', 'error')"
        >Tengo un problema</v-btn
      >
    </v-row>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
import ProductCard from "@/components/ProductCard.vue";
import GoldItemList from "@/components/buy/GoldItemList.vue";
import OperationHistoryCard from "@/components/payment/OperationHistoryCard.vue";
import ConditionalItemCard from "@/components/payment/ConditionalItemCard.vue";
import ConditionalForm from "@/components/payment/ConditionalForm.vue";
import ConditionalBuyCard from "@/components/payment/ConditionalBuyCard.vue";

@Component({
  components: {
    ProductCard,
    GoldItemList,
    OperationHistoryCard,
    ConditionalItemCard,
    ConditionalForm,
    ConditionalBuyCard
  }
})
export default class StepThree extends Vue {
  get totalPrice(): any {
    const price = parseInt(this.$store.getters.getProductToBuy.precio);
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      price
    );
  }
  public productStatus = {};
  private state = {};
  private product = {};
  // GET TYPE OF PRODUCT TO SHOW IT IN 1 STEP TITLE
  get getProductType(): string {
    return this.$store.getters.getProductToBuy.tipo;
  }
  get currentProduct() {
    return this.$store.getters.getProductToBuy;
  }

  async beforeCreated() {
    await this.getBuyInfoStatus();
    console.log("currentProduct step 3 ", this.currentProduct);
  }
  async mounted() {
    this.state = await this.currentProduct.estado;
    this.product = await this.currentProduct.item;
  }

  // //GET INFO FROM VENTAS/:ID TO RENDER
  private async getBuyInfoStatus(): Promise<any> {
    this.productStatus = await this.$store.getters.getBuyStatusInfo;
  }
}
</script>

<style lang="sass" scoped>
.conditionalCard
  width:100%

.instructions
 color: $card-link
 border: 1px solid $menu-items
 background-color: $card-bg
 border-radius: 15px
 font-weight: 500
</style>
