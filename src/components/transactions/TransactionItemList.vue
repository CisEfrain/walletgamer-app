<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer>
        <v-expansion-panel class="bg-transparent">
          <v-expansion-panel-header>
            <v-row align="center" justify="start">
              <v-col cols="4" md="2" sm="4" class="text-center">
                <p>ID: {{ transaction_id }}</p>
                <h4>{{ transaction_date }}</h4>
              </v-col>
              <v-col cols="6" md="2" sm="3" class="">
                <v-chip class="info">
                  {{ type }}
                </v-chip>
              </v-col>
              <v-col cols="6" md="4" sm="5">
                <h3 class="transaction-title mt-1">{{ product }}</h3>
              </v-col>
              <v-col cols="6" md="2" sm="6">
                <h3>{{ cost }} $</h3>
              </v-col>
              <v-col
                cols="12"
                md="2"
                sm="6"
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
                <p>Descripción...</p>
                <!-- <p>Reino: {{ realm }}</p>
                <p>Facción: {{ faction }}</p> -->
              </v-col>
              <!-- <v-col cols="12" md="6" sm="6" class="d-flex justify-end">
                <v-btn text small color="error"
                  ><b>Ver detalles de la operación</b></v-btn
                >
              </v-col> -->
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
  @Prop({ required: true, type: String }) readonly transaction_date!: string;
  @Prop({ required: true, type: String }) readonly cost!: string;
  @Prop({ required: true, type: String }) readonly type!: string;
  @Prop({ required: true, type: String }) readonly status!: string;
  @Prop({ required: true, type: String }) readonly transaction_id!: string;
  // @Prop({ required: true, type: String }) readonly faction!: string;

  //Computed
  get hasStatus(): any {
    if (this.status === "Completa") return `success`;

    if (this.status === "Anulada") return "error";
    else return "warning";
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
