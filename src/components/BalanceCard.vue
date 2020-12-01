<template>
  <v-row class="d-flex justify-center">
    <BaseCardContainer class="balance-height-card">
      <v-row class="px-6 pt-4 mb-less" align="center">
        <h3 class="main-title">Saldo Disponible</h3>
      </v-row>
      <v-row class="px-3 mt-3 mb-less" align="center">
        <v-col>
          <h2 class="balance-currency">$ {{ balance }}</h2>
        </v-col>
      </v-row>
      <v-row v-show="hasActions">
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
      </v-row>
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
export default class BalanceCard extends Vue {
  @Prop({ required: true, type: String }) readonly balance!: string;
  @Prop({ type: Boolean, default: false }) readonly actions!: boolean;

  get hasActions(): boolean {
    return this.actions ? true : false;
  }
}
</script>

<style lang="sass" scoped>

.card-container
  font-family: $body-font-family, sans-serif !important
  border-radius: 2em
  padding: 4px 16px
  min-width: 90%
  min-height: 80px
  color: #474545
  background: white
  background: linear-gradient(90deg, white 0%, #f5f5f2 80%)
  box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8)

.balance-currency
  font-size: 32px
  color: $card-link
  width: 90%

.mb-less
  margin-bottom: -24px

.balance-height-card
  min-height: 140px
  width: 90%
</style>
