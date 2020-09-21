<template>
  <v-row class="d-flex justify-center">
      <BaseCardContainer class="balance-height-card">
        <v-row class="px-6 pt-4 mb-less" align="center">
          <h3 class="title">Saldo Disponible</h3>
        </v-row>
        <v-row class="px-3 mt-3 mb-less" align="center">
          <v-col>
            <h2 class="balance-currency">${{balance}}</h2>
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
    BaseCardContainer,
  },
})
export default class BalanceCard extends Vue {
  @Prop({ required: true, type: String }) readonly balance!: string
  @Prop({ type: Boolean, default: false }) readonly actions!: boolean

  get hasActions(): boolean {
    return this.actions ? true : false
  }
}
</script>

<style lang="sass" scoped>

.balance-currency
  font-size: 44px
  color: $card-link

.mb-less
  margin-bottom: -24px

.balance-height-card
  min-height: 160px

</style>