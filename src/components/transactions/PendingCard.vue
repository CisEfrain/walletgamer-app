<template>
  <v-row justify="center" class="mt-less">
    <v-col cols="12">
      <BaseCardContainer>
        <v-expansion-panel class="bg-transparent">
          <v-expansion-panel-header>
            <v-row align="center" justify="start">
              <v-col cols="4" md="1" sm="6" class="text-center">
                <h4>{{ formatDate }}</h4>
              </v-col>
              <v-col cols="6" md="2" sm="6" class="text-center">
                <v-chip color="blue lighten-5">
                  {{ type }}
                </v-chip>
              </v-col>
              <v-col class="text-center" cols="6" md="5" sm="7">
                <h3 class="transaction-title pt-6">{{ product }}</h3>
                <p>
                  ID:
                  <small>{{ transaction_id }}</small>
                </p>
              </v-col>
              <v-col class="text-center" cols="6" md="2" sm="4">
                <h2>$ {{ formatedCost }}</h2>
              </v-col>
              <v-col
                cols="12"
                md="2"
                sm="12"
                class="d-flex justify-center align-center"
              >
                <v-chip :color="hasStatus">
                  {{ status }}
                </v-chip>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row align="center" justify="space-between">
              <!-- COMPRA VENTA -->
              <!-- <v-col cols="4" md="2" sm="6" v-if="ventas.length > 0">
                <p><b>Estado:</b> {{ status }}</p>
              </v-col> -->
              <v-col cols="4" md="4" sm="6" v-if="ventas.length > 0">
                <p>
                  <b>Personaje/Email Receptor: </b>{{ ventas[0].personaje }}
                </p>
              </v-col>
              <v-col cols="4" md="3" sm="5" v-if="ventas.length > 0">
                <p>
                  <b>Cantidad:</b>
                  {{
                    ventas[0].publicacione.tipo === "oro"
                      ? `${ventas[0].cantidad * 100} de oro`
                      : ventas[0].cantidad
                  }}
                </p>
              </v-col>
              <v-col
                cols="4"
                md="3"
                sm="5"
                v-if="type === 'Venta' && comission != null"
              >
                <p>
                  <b>Comision:</b>
                  {{ comission.monto }}
                </p>
              </v-col>

              <!-- FONDEO -->
              <v-col cols="4" md="4" sm="4" v-if="fund">
                <p>
                  <b>Medio de pago:</b>
                  {{ fund.pasarela }}
                </p>
              </v-col>

              <!-- DESEMBOLSO -->
              <v-col cols="4" md="5" sm="4" v-if="disbursement">
                <p>
                  <b>Alias de medio de desembolso:</b>
                  {{ disbursement.pasarela.alias }}
                </p>
              </v-col>
              <v-col
                cols="4"
                md="4"
                sm="4"
                class="text-rigth"
                v-if="disbursement"
              >
                <p>
                  <b>Referencia de la transferencia:</b
                  >{{ disbursement.codigo_transferencia }}
                </p>
              </v-col>

              <v-col
                cols="12"
                md="2"
                sm="7"
                class="text-right"
                v-if="isSellOrBuy"
              >
                <v-btn
                  @click="goToDetail(ventas[0].id)"
                  text
                  color="error"
                  class="mb-3"
                >
                  Detalles
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </BaseCardContainer>
    </v-col>
  </v-row>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, Vue } from "vue-property-decorator";

import BaseCardContainer from "@/components/base/BaseCardContainer.vue";

@Component({
  components: {
    BaseCardContainer
  }
})
export default class PendingCard extends Vue {
  @Prop({ required: true, type: String }) readonly product!: string;
  @Prop({ required: true, type: String }) readonly transaction_date!: string;
  @Prop({ required: true, type: Number }) readonly cost!: number;
  @Prop({ required: true, type: String }) readonly type!: string;
  @Prop({ required: true, type: String }) readonly status!: string;
  @Prop({ required: true, type: String }) readonly transaction_id!: string;
  @Prop({ required: false, type: Array }) readonly ventas?: string;
  @Prop({ required: false }) readonly disbursement?: string;
  @Prop({ required: false }) readonly fund?: string;
  @Prop({ type: Number }) readonly sellId?: number;
  @Prop({}) readonly comission?: any;

  showDescription = false;
  get hasStatus(): any {
    if (this.status === "Completada") return `green accent-4`;
    if (this.status === "Error") return "deep-orange darken-1";
    if (this.status === "Pendiente") return "amber";
    else return "error";
  }

  get formatedCost(): string {
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      this.cost
    );
  }
  goToDetail(id: number) {
    if (!id) return false;
    this.$router.push({ path: "payment", query: { id: id.toString() } });
  }
  created() {
    if (this.type === "Venta") {
      console.log("this.showDescription ", this.type);
      console.log(this.$props);
      this.showDescription = true;
    }
  }
  get hasTransactionId(): boolean {
    return this.transaction_id ? true : false;
  }
  get formatDate(): string {
    return new Date(this.transaction_date).toLocaleDateString();
  }
  get isSellOrBuy(): boolean {
    return this.type === "Venta" || this.type === "Compra";
  }
}
</script>

<style lang="sass" scoped>
p,small,h3,h4
  color: $font-main-color

p,small
  color: $font-main-color
  margin: 0

.transaction-title
  color: $danger
  margin-bottom: 8px

.bg-transparent
  background-color: transparent!important
  border-radius: 40px

.transaction-title
  font-size: 15px
  color: $danger
  margin-bottom: 8px

p
  margin-bottom: 0

.mt-less
 margin-top: -1.8em
</style>
