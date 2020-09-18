<template>
  <v-card
    active-class="active-card"
    class="mx-3 d-flex flex-column align-center pb-4 card-radius"
    width="240"
    :color="!active ? 'red lighten-2':'grey lighten-1'"
    elevation="4"
    @click="$emit('selected')"
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
import { Component, Prop, Vue, Emit} from "vue-property-decorator";

@Component
export default class ProductCard extends Vue {
  //Props
  @Prop({ required: true, type: String }) readonly productTitle!: string

  get active(): any {
    console.info(this.productTitle)
    return {
      [`active--${this.productTitle}`]: true
    };


}

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
  background: #d47777!important;
}

.card-radius:focus{
  background: #ca3b3b!important;
  border-radius:28px!important;
}
.v-list-item--active{
  background: #ca3b3b!important;
}
.active-card{
  background: #ca3b3b!important;
}

</style>
