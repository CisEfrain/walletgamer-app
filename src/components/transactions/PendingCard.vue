<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer>
        <v-row align="center" justify="start">
          <v-col cols="4" md="2" sm="4" class="text-center">
            <p>ID: {{ transaction_id }}</p>
            <h4>{{ transaction_date }}</h4>
          </v-col>
          <v-col cols="6" md="2" sm="3" class="">
            <v-chip class="info">
              {{ type }}
            </v-chip>
          </v-col>
          <v-col cols="6" md="6" sm="5">
            <h3 class="transaction-title mt-1">{{ product }}</h3>
          </v-col>
          <v-col cols="6" md="2" sm="6">
            <h2>{{ cost }} $</h2>
          </v-col>
        </v-row>
      </BaseCardContainer>
    </v-col>
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
export default class PendingCard extends Vue {
  @Prop({ required: true, type: String }) readonly product!: string;
  @Prop({ required: true, type: String }) readonly transaction_date!: string;
  @Prop({ required: true, type: String }) readonly cost!: string;
  @Prop({ required: true, type: String }) readonly type!: string;
  @Prop({ required: true, type: String }) readonly status!: string;
  @Prop({ required: true, type: String }) readonly transaction_id!: string;

  get hasStatus(): any {
    if (this.status === "Completa") return `success`;

    if (this.status === "Error") return "error";
    else return "error";
  }

  get hasTransactionId(): boolean {
    return this.transaction_id ? true : false;
  }
}
</script>

<style lang="sass" scoped>
p,small,h3,h4
  color: $font-main-color


p,small
  color: $font-main-color
  margin-bottom: 0

.transaction-title
  font-size: 1.3em
  color: $danger
  margin-bottom: 8px
</style>
