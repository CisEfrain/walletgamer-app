<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer>
        <v-expansion-panel class="bg-transparent">
          <v-expansion-panel-header>
            <v-row align="center" justify="start">
              <v-col cols="4" md="2" sm="8" class="text-center">
                <h4>{{ formatDate }}</h4>
              </v-col>
              <v-col cols="6" md="2" sm="4" class="">
                <v-chip class="info">
                  {{ type }}
                </v-chip>
              </v-col>
              <v-col class="text-center" cols="6" md="4" sm="8">
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
                <v-chip :class="hasStatus">
                  {{ status }}
                </v-chip>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="px-4" align="center" justify="space-between">
              <v-col cols="12" md="6" sm="6">
                <p>
                  {{ description ? description : "Sin descripción" }}
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

  //Computed
  get hasStatus(): any {
    if (this.status === "Completada") return `success`;

    if (this.status === "Anulada") return "error";
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
  font-size: 1.3em
  color: $danger
  margin-bottom: 8px

p
  margin-bottom: 0
</style>
