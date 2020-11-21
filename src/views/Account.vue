<template>
  <v-container class="px-8">
    <v-row>
      <UserInfo />
    </v-row>

    <v-row>
      <UserExpenditure />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import UserInfo from "@/components/account/UserInfo.vue";
import UserExpenditure from "@/components/account/UserExpenditure.vue";

@Component({
  components: {
    UserInfo,
    UserExpenditure
  }
})
export default class Account extends Vue {
  created(){
    this.$store.dispatch("setUserData");
    this.$store.dispatch("getExpenditureData");
  }
}
</script>

<style></style>
