<template>
  <v-row class="d-flex">
    <v-col>
      <BaseCardContainer>
        <v-row class="px-6 pt-4 mb-less" align="center">
          <h3 class="title">Saldo Disponible</h3>
        </v-row>
        <v-row class="px-3 mt-3 mb-less" align="center">
          <v-col>
            <h2 class="balance-currency">${{balance}}</h2>
          </v-col>
        </v-row>
        <v-row>
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
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BaseCardContainer from "@/components/BaseCardContainer.vue";

@Component({
  components: {
    BaseCardContainer,
  },
})
export default class BalanceCard extends Vue {
  @Prop({ required: true, type: String }) readonly balance!: string
}
</script>

<style lang="sass" scoped>
.balance-currency
  font-size: 44px
  color: $card-link

.mb-less
  margin-bottom: -24px

</style>