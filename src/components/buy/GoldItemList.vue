<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer>
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
          <v-col cols="3" md="4" sm="6">
            <h5>$ {{ formatPrice }} por cada 100 de gold</h5>
            <small>Disponible: {{ formatAvailable }}</small>
          </v-col>
          <v-col
            cols="3"
            md="2"
            sm="12"
            class="d-flex justify-center align-center"
          >
            <div>
              <v-btn text large color="error"><b>Comprar</b></v-btn>
            </div>
          </v-col>
        </v-row>
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
export default class GoldItemList extends Vue {
  @Prop({ type: String }) readonly user!: string;
  @Prop({ type: String }) readonly rank!: string;
  @Prop({ type: String }) readonly kingdom!: string;
  @Prop({ type: String }) readonly product!: string;
  @Prop({ type: String }) readonly price!: string;
  @Prop({ type: Number }) readonly available!: number;
  @Prop({ type: String }) readonly faction!: string;

  get formatPrice() {
    const price = parseInt(this.price);
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(price);
  }
  get formatAvailable() {
    return new Intl.NumberFormat().format(this.available);
  }
  private deletePost() {
    this.$emit("click");
  }
}
</script>

<style lang="sass" scoped></style>
