<template>
  <v-row class="container mt-less-2">
    <v-col cols="12" md="12" sm="12">
      <BaseCardContainer>
        <v-expansion-panel class="bg-transparent">
          <v-expansion-panel-header>
            <v-row class="" align="center" justify="space-between">
              <v-col cols="4" md="4" sm="12">
                <h3 v-if="product === 'oro'" class="transaction-title mt-2">
                  {{ goldMessage }}
                </h3>
                <h3
                  v-if="product === 'personaje'"
                  class="transaction-title mt-2"
                >
                  {{ characterMessage }}
                </h3>
                <h3 v-if="product === 'item'" class="transaction-title mt-2">
                  {{ itemMessage }}
                </h3>
              </v-col>
              <v-col cols="4" md="5" sm="6">
                <h4>$ {{ formatCurrency }} {{ isGold }}</h4>
              </v-col>
              <v-col cols="4" md="3" sm="6">
                <h4>Disponible: {{ formatAvailable }}</h4>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="" align="center" justify="space-between">
              <v-col cols="12" md="7" sm="12">
                <p v-show="realm">Reino: {{ realm }}</p>
                <p>Facción: {{ faction }}</p>
              </v-col>
              <v-col cols="12" md="5" sm="12" class="d-flex">
                <v-row class="d-flex justify-center">
                  <v-col>
                    <v-switch
                      v-model="status"
                      @change="disablePost"
                      color="success"
                      inset
                      :label="isActive ? `Activo` : `Inactivo`"
                    ></v-switch>
                  </v-col>
                  <v-col class="d-flex justify-end">
                    <v-btn @click="deletePost" text small color="error">
                      <b>Eliminar publicación</b>
                    </v-btn>
                  </v-col>
                </v-row>
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
export default class PostList extends Vue {
  @Prop({ type: String }) product!: string | undefined;
  @Prop({ type: String }) readonly level!: string | undefined;
  @Prop({ type: String }) readonly item!: string | undefined;
  @Prop({ type: Number }) readonly cost!:  number;
  @Prop({ type: Number }) readonly quantity!: number;
  @Prop({ type: String }) readonly realm!: string | undefined;
  @Prop({ type: String }) readonly faction!: string | undefined;
  @Prop({ type: Number }) readonly active:number;
    public status
  created(){
    this.status = this.active;
  }
  private deletePost() {
    this.$emit("click");
  }

  private disablePost() {
    this.$emit("change");
  }

  get formatCurrency() {
    const cost = this.cost;
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      cost
    );
  }
  get formatAvailable() {
    return new Intl.NumberFormat().format(this.quantity);
  }
  get goldMessage() {
    return this.product === "oro" && this.$store.getters.getGoldPostData.nombre;
  }
  get characterMessage() {
    return (
      this.product === "personaje" &&
      this.$store.getters.getCharactersPostData.nombre
    );
  }
  get itemMessage() {
    return (
      this.product === "item" && this.$store.getters.getItemsPostData.nombre
    );
  }

  get productName() {
    return this.characterMessage || this.goldMessage || this.itemMessage;
  }

  get isActive() {
    return this.status == 1 ? true : false;
  }

  get isGold(): any {
    return this.product === "oro" ? "Por cada 100 de oro" : null;
  }

  // get isGoldQuantity(): string {
  //   return this.product === "Gold" ? this.formatGoldQuantity : this.quantity;
  // }
}
</script>

<style lang="sass" scoped>
p,small,h4,h3
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
  font-size: 1.1em
  color: $danger
  margin-bottom: 8px

p
  margin-bottom: 0

.mt-less-1
  margin-top: -1em
.mt-less-2
  margin-top: -2em
.mt-less-3
  margin-top: -3em

.v-input--selection-controls
  margin-top: 0px
  padding-top: 2px
</style>
