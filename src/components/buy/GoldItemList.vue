<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer :class="ownerClass">
        <v-row class="px-4" align="center" justify="space-between">
          <v-col cols="3" md="2" sm="12" class="text-center">
            <h4 class="main-title">{{ user }}</h4>
            <small>Rango: {{ rank }}</small>
          </v-col>
          <v-col cols="3" md="3" sm="6" class="text-center">
            <div>Reino {{ kingdom }}</div>
            <v-chip>
              {{ faction }}
            </v-chip>
          </v-col>
          <v-col v-if="isBuyCard" class="mt-2" cols="3" md="4" sm="6">
            <h4 class="text-end">{{ available * 100 }} de oro</h4>
            <p class="text-end">${{ formatPrice }}</p>
          </v-col>
          <v-col v-if="isBuyCard === false" cols="3" md="4" sm="6">
            <h4>$ {{ formatPrice }} por cada 100 de oro</h4>
            <small>Disponible: {{ formatAvailable }}</small>
          </v-col>
          <v-col
            v-if="isOwner && hasActions"
            cols="3"
            md="2"
            sm="12"
            class="d-flex justify-center align-center"
          >
            <div>
              <v-btn @click="buyGold" text large color="error"
                ><b>Comprar</b></v-btn
              >
            </div>
          </v-col>
        </v-row>
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
export default class GoldItemList extends Vue {
  @Prop({ type: String }) readonly user!: string;
  @Prop({ type: String }) readonly rank!: string;
  @Prop({ type: String }) readonly kingdom!: string;
  @Prop({ type: String }) readonly product!: string;
  @Prop({ type: Number }) readonly price!: number;
  @Prop({ type: Number }) readonly available!: number;
  @Prop({ type: String }) readonly faction!: string;
  @Prop({ type: Boolean, default: false }) readonly actions!: boolean;
  @Prop({ type: Boolean, default: false }) readonly isBuy!: boolean;
  @Prop({ type: Number }) readonly quantity!: number;

  get hasActions(): boolean {
    return this.actions ? true : false;
  }

  get isBuyCard(): boolean {
    return this.isBuy ? true : false;
  }

  get formatPrice() {
    const price = this.price;
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      price
    );
  }
  get formatAvailable() {
    return new Intl.NumberFormat().format(this.available);
  }
  private buyGold() {
    this.$emit("click");
  }
  get isOwner(): boolean {
    return this.user !== this.$store.getters.getUserData.nombre ? true : false;
  }
  get ownerClass(): string[] {
    return !this.isOwner && ["ownerClass"];
  }
}
</script>

<style lang="sass" scoped></style>
