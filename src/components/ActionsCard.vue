<template>
  <v-row class="d-flex justify-center">
    <BaseCardContainer class="balance-height-card action-card action">
      <v-row class="mb-less" align="center">
        <v-col class="d-flex justify-center mb-less" cols="12" md="12" sm="6">
          <img class="operation-icon" :src="getIcon" :alt="`${actions}`" />
        </v-col>
        <v-col class="text-center" cols="12" md="12" sm="6">
          <h3 class="main-title">{{ actions }}</h3>
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
export default class ActionsCard extends Vue {
  @Prop({ required: true, type: String }) readonly actions!: string;
  @Prop({ required: true, type: String }) readonly icon: string;

  get hasActions(): boolean {
    return this.actions ? true : false;
  }

  get getIcon(): string {
    const images = require.context("../assets/", false, /\.png$/);
    return images(`./${this.icon}.png`);
  }
}
</script>

<style lang="sass" scoped>

.card-container
  font-family:$body-font-family, sans-serif !important
  border-radius: 2em
  padding: 4px 16px
  min-width: 70%
  min-height: 80px
  color: #474545
  background: white
  background: linear-gradient(90deg, white 0%, #f5f5f2 80%)
  box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8)

.balance-currency
  font-size: 44px
  color: $card-link

.mb-less
  margin-bottom: -34px

.balance-height-card
  height: 180px

.operation-icon
 width: 128px

.action-card
  cursor: pointer
  width: 90%

.action:hover
  background: #d2d2d2!important
  color: $badge-faccion!important
</style>
