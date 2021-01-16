<template>
  <v-container>
    <v-row justify="center">
      <BaseCardContainer>
        <v-row class="px-2" justify="center" align="center">
          <v-col cols="12" md="2" >
            <p class="text-center">{{ formatDate }}</p>
          </v-col>
          <v-col cols="12" md="3" class="text-left">
            <p class="type">
              <b>{{ type }}</b>
            </p>
          </v-col>

          <v-col cols="12" md="7" class="d-flex justify-start align-center">
            <p>{{ description }}</p>
          </v-col>
        </v-row>
      </BaseCardContainer>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BaseCardContainer from "@/components/base/BaseCardContainer.vue";

@Component({
  components: {
    BaseCardContainer
  }
})
export default class OperationHistoryCard extends Vue {
  @Prop({ required: true, type: String }) readonly date!: string;
  @Prop({ required: true, type: String }) readonly type!: string;
  @Prop({ required: true, type: String }) readonly description!: string;

  get formatDate(): string {
    return new Date(this.date).toLocaleDateString();
  }
}
</script>

<style lang="sass" scoped>
@import '../../scss/variables.scss'
.type
    color: $danger
.card-container
    min-height: 0
</style>
