<template>
  <v-row justify="center">
    <v-col cols="12">
      <BaseCardContainer>
        <v-expansion-panel class="bg-transparent">
          <v-expansion-panel-header>
            <v-row align="center" justify="start">
              <v-col cols="4" md="2" sm="6" class="text-center">
                <h4>{{ formatDate }}</h4>
              </v-col>
              <v-col class="text-center" cols="6" md="2" sm="6">
                <v-chip class="info">
                  {{ type }}
                </v-chip>
              </v-col>
              <v-col class="text-center" cols="6" md="6" sm="7">
                <h3 class="transaction-title mt-1">{{ product }}</h3>
                <p>
                  ID:
                  <small>{{ transaction_id }}</small>
                </p>
              </v-col>
              <v-col class="text-center" cols="6" md="2" sm="4">
                <h2>$ {{ formatedCost }}</h2>
                <!--             <div class="">
              <v-btn text large color="error"><b>Ver detalles</b></v-btn>
            </div> -->
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row v-for="venta in ventas" :key="venta.id">
              <v-col
                cols="12"
                md="4"
                sm="6"
                class="d-flex align-center justify-center"
              >
                <p class="mb-0"><b>Estado:</b> {{ venta.estado }}</p>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="6"
                class="d-flex justify-center align-center"
              >
                <p class="mb-0"><b>Personaje:</b> {{ venta.personaje }}</p>
              </v-col>
              <v-col cols="12" md="4" sm="6" class="d-flex justify-end">
                <v-btn @click="goToDetail(venta.id)" text large color="error">
                  <b>Detalles de la transacción</b>
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
  showDescription = false;
  get hasStatus(): any {
    if (this.status === "Completa") return `success`;

    if (this.status === "Error") return "error";
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
}
</script>

<style lang="sass" scoped>
p,small,h3,h4
  color: $font-main-color

p,small
  color: $font-main-color
  margin: 0

.transaction-title
  font-size: 1.3em
  color: $danger
  margin-bottom: 8px

.bg-transparent
  background-color: transparent!important
  border-radius: 40px

.transaction-title
  font-size: 1.3em
  color: $danger
  margin-bottom: 8px

p
  margin-bottom: 0
</style>
