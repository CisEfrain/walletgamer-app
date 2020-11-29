<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <BaseCardContainer>
        <v-row class="px-4" justify="center">
          <v-col cols="12" md="2">
            <small class="text-center">{{ formatDate }}</small>
          </v-col>
          <v-col cols="12" md="3" class="text-left">
            <small class="type">
              <b>{{ type }}</b>
            </small>
          </v-col>

          <v-col cols="12" md="7" class="d-flex justify-start align-center">
            <small>{{ description }}</small>
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
