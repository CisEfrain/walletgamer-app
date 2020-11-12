<template>
  <v-col cols="4" md="4" sm="12" class="d-flex justify-center">
    <v-card
      :class="isActive"
      class="mx-3 d-flex flex-column align-center pb-4 card-radius"
      width="240"
      elevation="4"
      @click="isSelected()"
    >
      <v-card-title class="product-title">{{ productTitle }}</v-card-title>
      <v-img
        class="align-center"
        width="140px"
        height="60px"
        src="../assets/wow-logo.png"
      ></v-img>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class ProductCard extends Vue {
  //Props
  @Prop({ required: true, type: String }) readonly productTitle!: string;

  get isActive() {
    return this.$store.state.AppState.activeProduct === this.productTitle
      ? "active-card"
      : null;
  }

  @Emit("selected")
  isSelected() {
    this.$store.commit("setProduct", { name: this.productTitle });
  }
}
</script>

<style lang="sass" scoped>
.product-title
  font-size: 18px
  color: #fff
  margin-bottom: -14px
  font-weight: 800

.card-radius
  border-radius: 28px
  cursor: pointer
  background-color: $bg-product-card

.card-radius:hover
  background: #d47777!important

.active-card
  background: $card-link
</style>
