<template>
  <v-row class="mb-3">
    <v-row class="px-4" align="center">
      <v-col>
        <img
          class="align-center rounded-circle ml-5"
          width="70px"
          height="70px"
          :src="getImgUrl(user.rango)"
        />
      </v-col>
      <v-col class="d-flex flex-column mr-less">
        <h2 class="name text-uppercase mt-2">{{ user.nombre }}</h2>
        <p class="rank">{{ user.rango ? user.rango : "Pollo" }}</p>
      </v-col>
    </v-row>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseCardContainer from "@/components/base/BaseCardContainer.vue";

@Component({
  components: {
    BaseCardContainer
  }
})
export default class Avatar extends Vue {
  getImgUrl(rank: string) {
    const images = require.context("../assets/", false, /\.jpg$/);
    return rank ? images(`./${rank}.jpg`) : images(`./Pollo.jpg`);
  }

  get user(): string {
    return this.$store.getters.getUserData;
  }

}
</script>

<style lang="sass" scoped>
.mr-less
 margin-left: -2.1em

.card-container
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial
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

p,small,h4,h3
  color: $font-main-color

.rank
 color: $danger
 font-size: .9em
 font-weight: 600

.name
 color: $font-main-color
 font-weight: 400
 font-size: 1.1em

.success
  background-color: $success

.warning
  background-color: $warning

.error
  background-color: $danger

.bg-transparent
  background-color: transparent!important
  border-radius: 40px

.avatar-name
  font-size: 1.2em
  color: $danger
</style>
