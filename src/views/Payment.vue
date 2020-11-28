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
                {{ getProductType }} World Warcraft Classic
              </h3>
              <v-row>
                <v-col class="d-flex justify-center px-16">
                  <ConditionalItemCard class="conditionalCard" />
                </v-col>
              </v-row>
              <ConditionalForm />
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-row justify="center">
                <v-col md="12" class="d-flex justify-center px-16">
                  <ConditionalItemCard class="conditionalCard" />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12">
                  <h3 class="main-title text-center">
                    Muy bien, ahora espera que
                    <b>Carlos Gomez</b> te haya transferido los 500 de Oro
                  </h3>
                </v-col>

                <v-col cols="12">
                  <p class="text-center">
                    No te preocupes, ya fue notificado de la operación
                  </p>
                </v-col>
              </v-row>

              <v-btn
                type="button"
                color="btn-gradient"
                rounded
                class="button button--primary button--medium mt-4 px-6"
                @click="$store.dispatch('nextStep')"
                >Confirmar</v-btn
              >
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-row justify="center">
                <v-col md="12" class="d-flex justify-center px-16">
                  <ConditionalItemCard class="conditionalCard" />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12">
                  <h3 class="main-title text-center">
                    <b>Carlos Gomez</b> ha notificado la transferencia de 500 de
                    Oro a tu cuenta
                  </h3>
                </v-col>

                <v-col cols="12">
                  <p class="text-center">
                    Realiza los siguientes pasos para confirmar la
                    transferencia:
                  </p>
                </v-col>
                <v-col cols="12" md="8">
                  <v-textarea
                    outlined
                    rounded
                    dense
                    clearable
                    clear-icon="cancel"
                  ></v-textarea>
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
                  @click="$store.dispatch('nextStep')"
                  >Confirmar</v-btn
                >

                <v-btn
                  rounded
                  color="blue-grey darken-4"
                  class="btn-dark ml-3 mt-4 px-6"
                  @click="$store.dispatch('nextStep', 'error')"
                  >Tengo un problema</v-btn
                >
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-row justify="center">
                <v-col md="12" class="d-flex justify-center px-16">
                  <ConditionalItemCard class="conditionalCard" />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12">
                  <h3
                    v-if="!$store.state.paymentState.errorReported"
                    class="main-title text-center"
                  >
                    Perfecto..!!! hemos terminado la operación
                  </h3>
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
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12 mb-0 pb-0">
        <h3 class="main-title">Historial de la operación</h3>
      </v-col>
    </v-row>
    <v-row justify="start" class="mt-0 pt-0">
      <v-col v-for="item in history" :key="item.id" md="8" class="mt-0 pt-0">
        <OperationHistoryCard
          class="mx-auto"
          :date="item.date"
          :type="item.type"
          :description="item.description"
        />
      </v-col>
    </v-row> -->
  </v-container>
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

@Component({
  components: {
    ProductCard,
    GoldItemList,
    OperationHistoryCard,
    ConditionalItemCard,
    ConditionalForm
  }
})
export default class Payment extends Vue {
  // private current_step = this.$store.state.paymentState.currentStep;

  // checkout(): void {
  //   console.log(this.form);
  //   if (this.isStepOneDisabled) return;
  //   this.$store.dispatch("setActiveBuy", this.form);
  //   this.$store.dispatch("openPayModal");
  // }

  get totalPrice(): any {
    const price = parseInt(this.$store.getters.getProductToBuy.precio);
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      price
    );
  }

  get getProductType(): string {
    return this.$store.getters.getProductToBuy.tipo;
  }

  get getBuyInfoStatus(): any {
    return this.$store.getters.getBuyStatusInfo;
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
