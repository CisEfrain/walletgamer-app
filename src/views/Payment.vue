<template>
  <v-container>
    <h2 class="custom-class">Payment page view</h2>
    <v-row>
      <v-col cols="12">
        <br />
        <v-stepper v-model="e1" class="elevation-0 buy-stepper">
          <v-stepper-header class="elevation-0">
            <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"></v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="4"></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <h3
                class="mb-4 title text-center"
              >Ingresa los detalles de tu compra de {{$store.state.activeProduct}} World Warcraft Classic</h3>
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
                    outlined
                    rounded
                    v-model.lazy="$v.quantity.$model"
                    :error-messages="quantityErrors"
                    @input="$v.quantity.$touch()"
                    @blur="$v.quantity.$touch()"
                    type="number"
                    color="rgba(184,12,70,.6)"
                    dense
                    class="select-field"
                  ></v-text-field>
                  {{this.$v.quantity.required}}
                </v-col>
                <v-col class="d-flex" cols="12" md="3">
                  <v-text-field
                    label="Personaje receptor (PJ)"
                    outlined
                    rounded
                    v-model="pj"
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
                    v-model="method"
                    rounded
                    color="rgba(184,12,70,.6)"
                    dense
                    class="select-field"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row justify="center">
                <h3>Total a pagar: 10$</h3>
              </v-row>
              <v-row justify="center">
                <button
                  type="button"
                  class="button button--primary button--medium"
                  @click="checkout()"
                >Continuar</button>

                <v-btn text>Cancel</v-btn>
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
                  <h3 class="title text-center">
                    Muy bien, ahora espera que
                    <b>Carlos Gomez</b> te haya transferido los 500 de Oro
                  </h3>
                </v-col>

                <v-col cols="12">
                  <p class="text-center">No te preocupes, ya fue notificado de la operación</p>
                </v-col>
              </v-row>

              <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="e1 = 4">Continue</v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12 mb-0 pb-0">
        <h3 class="title">Historial de la operación</h3>
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
import { Component, Provide, Vue } from "vue-property-decorator";
import ProductCard from "@/components/ProductCard.vue";
import { ItemBuyI } from "@/interfaces/product.interface";
import GoldItemList from "@/components/GoldItemList.vue";
import OperationHistoryCard from "@/components/payment/OperationHistoryCard.vue";
import { Validate } from "vuelidate-property-decorators";

import { required, minLength, between } from "vuelidate/lib/validators";

@Component({
  components: {
    ProductCard,
    GoldItemList,
    OperationHistoryCard
  }
})
export default class Payment extends Vue {
  e1 = 1;
  @Validate({ required })
  quantity!: number;
  @Validate({ minLength: minLength(4) })
  pj = "";
  @Validate({ required })
  method = "";
  payment_methods = ["paypal", "stripe"];
  /*  validations = {
    quantity: {
      required,
      minLength: minLength(4)
      //between: between(20, 30)
    },
    pj: {
      required,
      minLength: minLength(4)
    },
    method: {
      required,
      minLength: minLength(4)
    }
  }; */
  get quantityErrors(): any {
    const errors: any = [];
    if (!this.$v.quantity.$dirty) return errors;
    // !this.$v.quantity.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.quantity.required && errors.push("El campo es requerido");
    return errors;
  }

  get form() {
    return {
      quantity: this.$v.quantity,
      pj: this.$v.pj,
      method: this.$v.method
    };
  }
  checkout() {
    console.log(this.form);
    console.log(this.$v);
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

<style lang="sass">
</style>