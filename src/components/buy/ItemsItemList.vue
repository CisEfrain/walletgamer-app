<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer :class="ownerClass">
        <v-row class="px-4" align="center" justify="space-between">
          <v-col cols="3" md="2" sm="12" class="text-center">
            <h4 class="main-title">{{ user }}</h4>
            <small>Rango: {{ rank }}</small>
          </v-col>
          <v-col class="text-center" cols="3" md="3" sm="6">
            <div v-show="item">
              Item: <b>{{ item }}</b>
            </div>
            <v-chip>
              {{ faction }}
            </v-chip>
          </v-col>
          <v-col cols="3" md="3" sm="6" class="d-flex flex-column align-center">
            <h2>$ {{ formatPrice }}</h2>
            <small>Disponible: {{ formatAvailable }}</small>
          </v-col>
          <v-col
            v-if="isOwner && hasActions"
            cols="3"
            md="3"
            sm="12"
            class="d-flex justify-center align-center"
          >
            <div class="">
              <v-btn @click="buyItem" text large color="error"
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
import { Component, Prop, Vue } from "vue-property-decorator";

import BaseCardContainer from "@/components/base/BaseCardContainer.vue";

@Component({
  components: {
    BaseCardContainer
  }
})
export default class ItemsItemList extends Vue {
  @Prop({ type: String }) readonly user!: string;
  @Prop({ type: String }) readonly rank!: string;
  @Prop({ type: String }) readonly item!: string;
  @Prop({ type: Number }) readonly price!: number;
  @Prop({ type: Number }) readonly available!: number;
  @Prop({ type: String }) readonly faction!: string;
  @Prop({ type: Boolean, default: false }) readonly actions!: boolean;

  get hasActions(): boolean {
    return this.actions ? true : false;
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
  private buyItem() {
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
