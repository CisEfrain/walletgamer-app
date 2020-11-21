<template>
  <v-row class="d-flex justify-center">
    <BaseCardContainer class="balance-height-card action-card action">
      <v-row class="mt-3 mb-less" align="center">
        <v-col class="d-flex justify-center">
          <!-- <h2 class="balance-currency">${{ balance }}</h2> -->
          <v-icon color="orange" x-large>mdi-currency-usd-circle</v-icon>
        </v-col>
      </v-row>
      <v-row class="pt-4" align="center">
        <v-col class="text-center">
          <h3 class="main-title">{{ actions }}</h3>
        </v-col>
      </v-row>
      <!-- <v-row v-show="hasActions">
        <v-col class="d-flex" cols="3">
          <div>
            <v-btn text small color="error"><b>Retirar</b></v-btn>
          </div>
        </v-col>
        <v-col class="">
          <div>
            <v-btn text small color="error"><b>Historial de retiros</b></v-btn>
          </div>
        </v-col>
      </v-row> -->
    </BaseCardContainer>
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
export default class ActionsCard extends Vue {
  @Prop({ required: true, type: String }) readonly actions!: string;
  //@Prop({ type: Boolean, default: false }) readonly actions!: boolean;

  get hasActions(): boolean {
    return this.actions ? true : false;
  }
}
</script>

<style lang="sass" scoped>

.card-container
  font-family:$body-font-family, sans-serif !important
  border-radius: 2em
  padding: 4px 16px
  min-width: 90%
  min-height: 80px
  color: #474545
  background: white
  background: linear-gradient(90deg, white 0%, #f5f5f2 80%)
  box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8)

.balance-currency
  font-size: 44px
  color: $card-link

.mb-less
  margin-bottom: -24px

.balance-height-card
  min-height: 140px

.action-card
  cursor: pointer

.action:hover
  background: $bg-product-card
</style>
