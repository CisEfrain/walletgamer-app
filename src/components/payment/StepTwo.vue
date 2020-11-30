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
      </v-col>
    </v-row>

    <div class="animated fadeIn fast" v-if="state.intrucciones">
      <v-row class="mt-4" justify="center">
        <v-col class="instructions text-center px-4 py-4" cols="10">
          <p>
            {{ state.intrucciones }}
          </p>
        </v-col>
      </v-row>
    </div>

    <v-row justify="center" v-if="state.botonContinuar">
      <v-col class="text-center">
        <v-btn
          type="button"
          color="btn-gradient"
          rounded
          class="button button--primary button--medium mt-4 px-6"
          @click="confirmBuy"
        >
          {{ state.botonContinuar ? state.botonContinuar : "Confirmar" }}</v-btn
        >
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="12 mb-0 pb-0">
        <h3 class="main-title">Historial de la operación</h3>
      </v-col>
    </v-row>
    <v-row justify="start" class="mt-0 pt-0">
      <v-col
        v-for="item in productStatus.historials"
        :key="item.id"
        md="8"
        class="mt-0 pt-0"
      >
        <OperationHistoryCard
          class="mx-auto"
          :date="item.createdAt"
          :type="item.estado"
          :description="item.mensaje"
        />
      </v-col>
    </v-row> -->
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
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
export default class StepTwo extends Vue {
  get totalPrice(): any {
    const price = parseInt(this.$store.getters.getProductToBuy.precio);
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      price
    );
  }
  public productStatus = { id: 0 };

  // GET TYPE OF PRODUCT TO SHOW IT IN 1 STEP TITLE
  get getProductType(): string {
    return this.$store.getters.getProductToBuy.tipo;
  }

  private state = {};
  private product = {};
  // GET TYPE OF PRODUCT TO SHOW IT IN 1 STEP TITLE
  get currentProduct() {
    return this.$store.getters.getProductToBuy;
  }

  async beforeCreated() {
    await this.getBuyInfoStatus();
    console.log("currentProduct step 2 ", this.currentProduct);
  }
  async mounted() {
    this.state = await this.currentProduct.estado;
    this.product = await this.currentProduct.item;
    this.$emit("emitBuyId", this.currentProduct.id);
  }

  // //GET INFO FROM VENTAS/:ID TO RENDER
  private async getBuyInfoStatus(): Promise<any> {
    this.productStatus = await this.$store.getters.getBuyStatusInfo;
  }

  private confirmBuy(): void {
    this.$store.dispatch("confirmBuyProduct", this.currentProduct.id);
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
