<template>
    <v-card
    class="mx-3 d-flex flex-column align-center pb-4 card-radius"
    width="240"
    color="grey lighten-1"
    hover
    active
    elevation="4"
  >
  <v-card-title class="product-title">{{ productTitle }}</v-card-title>
    <v-img
      class="align-center"
      width="140px"
      height="60px"
      src="../assets/wow-logo.png"
    >
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ProductCard extends Vue {
  //Props
  @Prop({ required: false, type: String }) readonly productTitle!: string
}
</script>

<style lang="scss" scoped>
.product-title{
  font-size: 18px;
  color: #fff;
  margin-bottom: -14px;
  font-weight: 800;
}
.card-radius{
  border-radius: 28px;
  cursor: pointer;
}

.card-radius:hover{
  background: #ca3b3b!important;
}

</style>
