<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer>
        <v-row class="px-4 pt-2" align="center" justify="space-around">
          <v-col class="text-center" cols="12" sm="2" md="2">
            <h4>{{ date }}</h4>
          </v-col>
          <v-col class="d-flex justify-start" cols="12" sm="4" md="3">
            <h4>Monto solicitado: {{ cost }}$</h4>
          </v-col>
          <v-col cols="2" sm="2" md="2">
            <v-chip color="error">
              <b>
                {{ pay_method }}
              </b>
            </v-chip>
          </v-col>
          <v-col class="d-flex justify-center" cols="12" sm="4" md="3">
            <p v-if="hasTransactionId">Nº Transaccion: {{ transaction_id }}</p>
          </v-col>
          <v-col class="d-flex justify-center align-center">
                <v-chip :class="hasStatus">
                  {{ status }}
                </v-chip>
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
    BaseCardContainer,
  },
})
export default class RequestDisbursementItemList extends Vue {
  @Prop({ required: true, type: String }) readonly date!: string
  @Prop({ required: true, type: String }) readonly cost!: string
  @Prop({ required: true, type: String }) readonly pay_method!: string
  @Prop({ type: String }) readonly transaction_id!: string
  @Prop({ required: true, type: String }) readonly status!: string


get hasStatus(): any {
    if (this.status === "Completa") return `success`;

    if (this.status === "Error") return "error";
    else return "warning";
  }

get hasTransactionId(): boolean {
  return this.transaction_id ? true : false
}

}
</script>

<style lang="sass" scoped>
p,small
  color: $font-main-color
  margin-bottom: 0

</style>
