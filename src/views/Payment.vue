<template>
  <v-container class="px-8">
    <v-row>
      <v-col cols="12">
        <br />
        <v-stepper
          v-model="$store.state.paymentState.currentStep"
          class="elevation-0 buy-stepper"
        >
          <v-stepper-header class="elevation-0">
            <v-stepper-step
              :complete="$store.state.paymentState.currentStep > 1"
              step="1"
            ></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="$store.state.paymentState.currentStep > 2"
              step="2"
            ></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="$store.state.paymentState.currentStep > 3"
              step="3"
            ></v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step
              :complete="$store.state.paymentState.currentStep > 4"
              step="4"
            ></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <h3 class="mb-4 main-title text-center">
                Ingresa los detalles de tu compra de
                {{ productType ? productType : "" }} World Warcraft Classic
              </h3>
              <v-row>
                <v-col class="d-flex justify-center px-16">
                  <ConditionalItemCard class="conditionalCard" />
                </v-col>
              </v-row>
              <ConditionalForm />
            </v-stepper-content>

            <v-stepper-content step="2">
              <div v-if="getCurrentStep === 2">
                <StepTwo @emitBuyId="receiveBuyId" />
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div v-if="getCurrentStep === 3">
                <StepThree />
              </div>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-row justify="center">
                <v-col md="12" class="d-flex justify-center px-16">
                  <!-- <ConditionalItemCard class="conditionalCard" /> -->
                </v-col>
              </v-row>
              <v-row v-if="getCurrentStep === 4" justify="center">
                <v-col md="12" class="d-flex justify-center px-16">
                  <ConditionalBuyCard class="conditionalCard" />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" v-if="getCurrentStep === 4">
                  <h3
                    v-if="!$store.state.paymentState.errorReported"
                    class="main-title text-center"
                  >
                    {{ $store.getters.getProductToBuy.estado.principal }}
                  </h3>
                  <p class="text-center">
                    {{ $store.getters.getProductToBuy.estado.secundario }}
                  </p>
                  <h3
                    v-if="$store.state.paymentState.errorReported"
                    class="main-title text-center"
                  >
                    Tu operación está en mediación
                  </h3>
                </v-col>

                <v-col cols="12" v-if="$store.state.paymentState.errorReported">
                  <p class="text-center">
                    Estamos revisando tu caso, en breve te contactaremos
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12 mb-0 pb-0">
                  <h3 class="main-title">Historial de la operación</h3>
                </v-col>
              </v-row>
              <v-row justify="start" class="mt-0 pt-0">
                <v-col
                  cols="12"
                  v-for="item in $store.getters.getProductToBuy.historial"
                  :key="item.id"
                >
                  <OperationHistoryCard
                    :date="item.createdAt"
                    :type="item.estado"
                    :description="item.mensaje"
                  />
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
import ProductCard from "@/components/ProductCard.vue";
// import { ItemBuyI } from "@/interfaces/product.interface";
import GoldItemList from "@/components/buy/GoldItemList.vue";
import OperationHistoryCard from "@/components/payment/OperationHistoryCard.vue";
import ConditionalItemCard from "@/components/payment/ConditionalItemCard.vue";
import ConditionalForm from "@/components/payment/ConditionalForm.vue";
import ConditionalBuyCard from "@/components/payment/ConditionalBuyCard.vue";

import StepTwo from "@/components/payment/StepTwo.vue";
import StepThree from "@/components/payment/StepThree.vue";

@Component({
  components: {
    ProductCard,
    GoldItemList,
    OperationHistoryCard,
    ConditionalItemCard,
    ConditionalForm,
    StepTwo,
    StepThree,
    ConditionalBuyCard
  }
})
export default class Payment extends Vue {
  currentId: number;
  get totalPrice(): any {
    const price = parseInt(this.$store.getters.getProductToBuy.precio);
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      price
    );
  }
  productType: any = "";
  interval;
  get currentProduct() {
    return this.$store.getters.getProductToBuy;
  }
  get getCurrentStep(): number {
    return this.$store.getters.getCurrentStep;
  }

  async beforeCreate() {
    const { id } = this.$route.query;
    if (id) this.currentId = parseInt(id.toString());

    console.log("this.cur", this.currentProduct);
    console.log("tenemos id ", this.currentId);
    const loader = this.$loading.show();
    await this.$store.dispatch("getSellDataByID", id);
    loader.hide();
  }
  mounted() {
    // solo tiene propiedad tipo la primera en el paso 1.
    this.productType = this.$store.getters.getProductToBuy.tipo;
    if (this.getCurrentStep < 4) {
      this.interval = window.setInterval(this.reloadData, 5000);
    }
  }
  receiveBuyId(id) {
    this.currentId = id;
  }
  async reloadData() {
    console.log("here reload init", this.currentId);

    if (this.currentId) {
      if (this.getCurrentStep < 4 && this.getCurrentStep > 1) {
        await this.$store.dispatch("getSellDataByID", this.currentId);
      }
    }
  }
  beforeDestroy() {
    this.$store.dispatch("resetPaymentState", true);
    this.currentId = undefined;
    clearInterval(this.interval);
  }
}
</script>

<style lang="sass" scoped>
.conditionalCard
  width: 100%
</style>
