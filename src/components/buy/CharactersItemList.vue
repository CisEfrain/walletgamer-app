<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer>
        <v-row class="px-4" align="center" justify="space-between">
          <v-col cols="3" md="2" sm="12" class="text-center">
            <h4 class="main-title">{{ user }}</h4>
            <small>Rango: {{ rank }}</small>
          </v-col>
          <v-col cols="3" md="3" sm="5" class="text-center">
            <div>Reino: {{ kingdom }}</div>
            <v-chip>
              {{ faction }}
            </v-chip>
          </v-col>
          <v-col cols="3" md="3" sm="4" class="text-center">
            <div>Clase: {{ characterClass }}</div>
            <v-chip width=""> Nivel: {{ level }} </v-chip>
          </v-col>
          <v-col cols="3" md="2" sm="3" class="d-flex justify-center">
            <h2>$ {{ formatPrice }}</h2>
          </v-col>
          <v-col v-if="hasActions" class="d-flex justify-center align-center">
            <div class="">
              <v-btn @click="buyCharacter" text large color="error"
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
export default class CharactersItemList extends Vue {
  @Prop({ type: String }) readonly user!: string;
  @Prop({ type: String }) readonly rank!: string;
  @Prop({ type: String }) readonly kingdom!: string;
  @Prop({ type: String }) readonly characterClass!: string;
  @Prop({ type: Number }) readonly level!: number;
  @Prop({ type: String }) readonly price!: string;
  @Prop({ type: String }) readonly faction!: string;
  @Prop({ type: Boolean, default: false }) readonly actions!: boolean;

  get hasActions(): boolean {
    return this.actions ? true : false;
  }

  get formatPrice() {
    const price = parseInt(this.price);
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      price
    );
  }
  private buyCharacter() {
    this.$emit("click");
  }
}
</script>

<style lang="sass" scoped></style>
