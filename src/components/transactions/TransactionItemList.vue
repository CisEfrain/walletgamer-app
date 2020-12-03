<template>
  <v-row justify="center" class="mt-less">
    <v-col cols="12">
      <BaseCardContainer>
        <v-expansion-panel class="bg-transparent">
          <v-expansion-panel-header>
            <v-row align="center" justify="start">
              <v-col cols="4" md="1" sm="8" class="text-center">
                <h4>{{ formatDate }}</h4>
              </v-col>
              <v-col cols="6" md="2" sm="4" class="text-center">
                <v-chip color="blue lighten-5">
                  {{ type }}
                </v-chip>
              </v-col>
              <v-col class="text-center" cols="6" md="5" sm="8">
                <h3 class="transaction-title mt-1">{{ product }}</h3>
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
              <v-col cols="4" md="3" sm="6" v-if="ventas.length > 0">
                <p><b>Estado:</b> {{ status }}</p>
              </v-col>
              <v-col
                cols="4"
                md="5"
                sm="6"
                class="text-center"
                v-if="ventas.length > 0"
              >
                <p>
                  <b>Personje / Email Receptor: </b>{{ ventas[0].personaje }}
                </p>
              </v-col>
              <v-col
                cols="4"
                md="4"
                sm="5"
                class="text-right"
                v-if="ventas.length > 0"
              >
                <p>
                  <b>Cantidad:</b>
                  {{
                    ventas[0].publicacione.tipo === "oro"
                      ? `${ventas[0].cantidad * 100} de oro`
                      : ventas[0].cantidad
                  }}
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
              <v-col cols="4" md="3" sm="6" v-if="disbursement">
                <p>
                  <b>Alias de medio de desembolso:</b>
                  {{ disbursement.pasarela.alias }}
                </p>
              </v-col>
              <v-col cols="4" md="4" sm="4" v-if="disbursement">
                <p>
                  <b>Referencia de la transferencia:</b
                  >{{ disbursement.codigo_transferencia }}
                </p>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </BaseCardContainer>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BaseCardContainer from "@/components/base/BaseCardContainer.vue";

@Component({
  components: {
    BaseCardContainer
  }
})
export default class TransactionItemList extends Vue {
  @Prop({ required: true, type: String }) readonly product!: string;
  @Prop({ required: true }) readonly transaction_date!: any;
  @Prop({ required: true, type: Number }) readonly cost!: number;
  @Prop({ required: true, type: String }) readonly type!: string;
  @Prop({ required: true, type: String }) readonly status!: string;
  @Prop({ required: true, type: String }) readonly transaction_id!: string;
  @Prop({ type: String }) readonly description!: string;
  @Prop({ required: false, type: Array }) readonly ventas?: string;
  @Prop({ required: false }) readonly disbursement?: string;
  @Prop({ required: false }) readonly fund?: string;

  //Computed
  get hasStatus(): any {
    if (this.status === "Completada") return `green accent-4`;
    if (this.status === "Error") return "deep-orange darken-1";
    if (this.status === "Pendiente") return "amber";
    else return "warning";
  }

  get formatedCost(): string {
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      this.cost
    );
  }

  get formatDate(): string {
    return new Date(this.transaction_date).toLocaleDateString();
  }
}
</script>

<style lang="sass" scoped>
p,small,h3,h4
  color: $font-main-color

.success
  background-color: $success

.warning
  background-color: $warning

.error
  background-color: $danger

.bg-transparent
  background-color: transparent!important
  border-radius: 40px

.transaction-title
  font-size: 1.2em
  color: $danger
  margin-bottom: 8px

p
  margin-bottom: 0

.mt-less
 margin-top: -1.8em
</style>
