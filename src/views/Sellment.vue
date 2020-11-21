<template>
  <v-container class="px-8">
    <h2 class="custom-class">Sellment page view</h2>
    <v-row>
      <v-col cols="12">
        <br />
        <v-stepper
          v-model="$store.state.sellmentState.currentStepSell"
          class="elevation-0 buy-stepper"
        >
          <v-stepper-header class="elevation-0">
            <v-stepper-step
              :complete="$store.state.sellmentState.currentStepSell > 1"
              step="1"
            ></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="$store.state.sellmentState.currentStepSell > 2"
              step="2"
            ></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="$store.state.sellmentState.currentStepSell > 3"
              step="3"
            ></v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step
              :complete="$store.state.sellmentState.currentStepSell > 4"
              step="4"
            ></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <h3 class="mb-4 main-title text-center">
                Ingresa los detalles de tu venta de
                {{ $store.state.activeProduct }} World Warcraft Classic
              </h3>
              <form novalidate>
                <v-row class="d-flex justify-center">
                  <v-col cols="10">
                    <GoldItemList
                      :user="item.user"
                      :rank="item.rank"
                      :kingdom="item.kingdom"
                      :faction="item.faction"
                      :price="item.price"
                      :product="item.product"
                      :available="item.available"
                    />
                  </v-col>
                </v-row>
              </form>
              <v-row align="center" justify="center" class="mt-6">
                <v-col class="d-flex" cols="12" md="3">
                  <v-text-field
                    label="Cantidad"
                    required
                    outlined
                    rounded
                    v-model="$v.quantity.$model"
                    :error-messages="quantityErrors"
                    @input="$v.quantity.$touch()"
                    @blur="$v.quantity.$touch()"
                    type="number"
                    color="rgba(184,12,70,.6)"
                    dense
                    class="select-field"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" md="3">
                  <v-text-field
                    label="Personaje receptor (PJ)"
                    outlined
                    required
                    rounded
                    v-model="$v.pj.$model"
                    :error-messages="pjErrors"
                    @input="$v.pj.$touch()"
                    @blur="$v.pj.$touch()"
                    color="rgba(184,12,70,.6)"
                    dense
                    class="select-field"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" md="3">
                  <v-select
                    :items="payment_methods"
                    label="Medio de pago"
                    outlined
                    v-model="$v.payMethod.$model"
                    :error-messages="payMethodErrors"
                    @input="$v.payMethod.$touch()"
                    @blur="$v.payMethod.$touch()"
                    rounded
                    required
                    color="rgba(184,12,70,.6)"
                    dense
                    class="select-field"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row justify="center">
                <h4>Total a pagar: 10$</h4>
              </v-row>
              <v-row justify="center">
                <v-btn
                  type="button"
                  rounded
                  color="btn-gradient"
                  :disabled="isStepOneDisabled"
                  class="button button--primary button--medium mt-4 px-6"
                  @click="checkout()"
                  >Confirmar</v-btn
                >
                <!-- <v-btn text>Cancel</v-btn> -->
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-row justify="center">
                <v-col md="12" class="d-flex justify-center">
                  <GoldItemList
                    class="mx-auto"
                    :user="item.user"
                    :rank="item.rank"
                    :kingdom="item.kingdom"
                    :faction="item.faction"
                    :price="item.price"
                    :product="item.product"
                    :available="item.available"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12">
                  <h3 class="main-title text-center">
                    Enhorabuena, haz vendido 500 de oro a
                    <b>Fulano de tal</b>
                  </h3>
                  <h3 class="text-center grey--text">
                    Realiza los siguientes pasos para completar la transferencia
                  </h3>
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
                <h3 class="text-center grey--text">
                  Por favor confirme en el siguiente boton cuando hayas
                  realizado la transferencia
                </h3>
              </v-row>
              <v-row justify="center">
                <v-btn
                  type="button"
                  rounded
                  color="btn-gradient"
                  class="button button--primary button--medium mt-4 px-6"
                  @click="$store.dispatch('nextStepSell'), confirmSell()"
                  >Confirmar</v-btn
                >

                <v-btn
                  rounded
                  color="blue-grey darken-4"
                  class="btn-dark ml-3 mt-4 px-6"
                  @click="$store.dispatch('nextStepSell', 'error')"
                  >Tengo un problema</v-btn
                >
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-row justify="center">
                <v-col md="12" class="d-flex justify-center">
                  <GoldItemList
                    class="mx-auto"
                    :user="item.user"
                    :rank="item.rank"
                    :kingdom="item.kingdom"
                    :faction="item.faction"
                    :price="item.price"
                    :product="item.product"
                    :available="item.available"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12">
                  <h3 class="main-title text-center">
                    Muy bien, espera que Fulano de tal confirme la transferencia
                    de 500 de oro
                  </h3>
                </v-col>
                <v-col cols="12">
                  <p class="text-center">
                    No te preocupes, ya le hemos notificado, si has realizado
                    todos los pasos no suele demorar
                  </p>
                </v-col>
              </v-row>
              <v-row justify="center" v-if="isConfirmed">
                <v-col cols="12">
                  <p class="text-center green--text">
                    Fulano de tal ha confirmado la transferencia
                  </p>
                </v-col>
                <v-col class="d-flex justify-center">
                  <v-btn
                    type="button"
                    rounded
                    color="btn-gradient"
                    class="button button--primary button--medium px-6"
                    @click="$store.dispatch('nextStepSell')"
                    >Confirmar</v-btn
                  >
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-row justify="center">
                <v-col md="12" class="d-flex justify-center">
                  <GoldItemList
                    class="mx-auto"
                    :user="item.user"
                    :rank="item.rank"
                    :kingdom="item.kingdom"
                    :faction="item.faction"
                    :price="item.price"
                    :product="item.product"
                    :available="item.available"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col
                  cols="12"
                  v-if="!$store.state.sellmentState.errorReportedSell"
                >
                  <h3 class="main-title text-center">
                    Perfecto..!!! hemos terminado la operación
                  </h3>
                  <p class="text-center">
                    Ya tienes disponible el dinero en tu Wallet
                  </p>
                </v-col>

                <v-col
                  cols="12"
                  v-if="$store.state.sellmentState.errorReportedSell"
                >
                  <h3 class="main-title text-center">
                    Tu operación está en mediación
                  </h3>
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
    <v-row>
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductCard from "@/components/ProductCard.vue";
import { ItemBuyI } from "@/interfaces/product.interface";
import GoldItemList from "@/components/buy/GoldItemList.vue";
import OperationHistoryCard from "@/components/payment/OperationHistoryCard.vue";
import { Validate } from "vuelidate-property-decorators";

import { required, minLength } from "vuelidate/lib/validators";

@Component({
  components: {
    ProductCard,
    GoldItemList,
    OperationHistoryCard
  }
})
export default class Sellment extends Vue {
  // private current_step = this.$store.state.paymentState.currentStep;

  @Validate({ required }) quantity = null;
  @Validate({ required, minLength: minLength(4) }) pj = null;
  @Validate({ required }) payMethod = null;
  private payment_methods: Array<string> = ["paypal", "stripe"];
  get quantityErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.quantity.$dirty) return errors;
    // !this.$v.quantity.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.quantity.required && errors.push("El campo es requerido");
    return errors;
  }
  get pjErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.pj.$dirty) return errors;
    !this.$v.pj.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.pj.required && errors.push("El campo es requerido");
    return errors;
  }
  get payMethodErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.payMethod.$dirty) return errors;
    // !this.$v.payMethod.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.payMethod.required && errors.push("El campo es requerido");
    return errors;
  }

  get isStepOneDisabled(): boolean {
    console.log("this.$v.$invalid; ", this.$v.$invalid);
    return this.$v.$invalid;
  }

  get form(): any {
    return {
      quantity: this.$v.quantity.$model,
      pj: this.$v.pj.$model,
      payMethod: this.$v.payMethod.$model
    };
  }
  private checkout(): void {
    console.log(this.form);
    if (this.isStepOneDisabled) return;
    this.$store.dispatch("setActiveSell", this.form);
    // this.$store.dispatch("openPayModal");
    this.$store.dispatch("nextStepSell");
  }
  private confirmSell(): void {
    this.$store.dispatch("setConfirmed");
  }

  get isConfirmed(): unknown {
    return this.$store.state.sellmentState.isConfirmed;
  }
  item: ItemBuyI = {
    user: "Diosdado Garcia",
    rank: "Elite",
    kingdom: "Psuv",
    faction: "Horda",
    price: "20",
    product: "10.000",
    available: "1.000.000"
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

<style lang="scss" scoped></style>
