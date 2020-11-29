<template>
  <div>
    <v-row justify="center">
      <v-col md="12" class="d-flex justify-center px-16">
        <ConditionalItemCard class="conditionalCard" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <h3 class="main-title text-center">
          {{ productStatus.estado.principal }}
        </h3>
      </v-col>

      <v-col cols="12">
        <p class="text-center">
          {{ productStatus.estado.secundario }}
        </p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col class="text-center">
        <v-btn
          type="button"
          color="btn-gradient"
          rounded
          class="button button--primary button--medium mt-4 px-6"
          @click="$store.dispatch('nextStep')"
          >Confirmar</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
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
    </v-row>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
import ProductCard from "@/components/ProductCard.vue";
import { ItemBuyI } from "@/interfaces/product.interface";
import GoldItemList from "@/components/buy/GoldItemList.vue";
import OperationHistoryCard from "@/components/payment/OperationHistoryCard.vue";
import ConditionalItemCard from "@/components/payment/ConditionalItemCard.vue";
import ConditionalForm from "@/components/payment/ConditionalForm.vue";
// import StepTwo from "@/components/payment/StepTwo.vue";

@Component({
  components: {
    ProductCard,
    GoldItemList,
    OperationHistoryCard,
    ConditionalItemCard,
    ConditionalForm
    // StepTwo
  }
})
export default class StepTwo extends Vue {
  get totalPrice(): any {
    const price = parseInt(this.$store.getters.getProductToBuy.precio);
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      price
    );
  }
  public productStatus = {};

  // GET TYPE OF PRODUCT TO SHOW IT IN 1 STEP TITLE
  get getProductType(): string {
    return this.$store.getters.getProductToBuy.tipo;
  }

  async mounted() {
    await this.getBuyInfoStatus();
  }

  // //GET INFO FROM VENTAS/:ID TO RENDER
  private async getBuyInfoStatus(): Promise<any> {
    this.productStatus = await this.$store.getters.getBuyStatusInfo;
  }

  item: ItemBuyI = {
    user: "Diosdado Garcia",
    rank: "Elite",
    kingdom: "Psuv",
    faction: "Horda",
    price: "20",
    product: "10.000",
    available: 100
  };
  history = [
    {
      id: 1,
      date: "10/12/2020",
      type: "Pago completo",
      description: "Haz pagado 20$ por tarjeta de crédito mediante stripe"
    }
  ];
}
</script>

<style lang="sass" scoped>
.conditionalCard
  width:100%
</style>
