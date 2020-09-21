<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer class="py-2">
        <v-row class="px-4" align="center" justify="center">
          <v-col cols="3" sm="6" md="2">
            <h4 class="title">{{ alias }}</h4>
          </v-col>
          <v-col class="d-flex" cols="3" sm="6" md="2">
            <v-chip color="blue-grey darken-3" dark>
              <b>{{ pay_method }}</b>
            </v-chip>
          </v-col>
          <v-col>
            <p>Descripción / correo / cuenta</p>
          </v-col>
          <v-col class="d-flex justify-end align-center">
            <div>
              <v-btn text large color="error"><b>Modificar</b></v-btn>
            </div>
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
export default class UserExpenditureItemList extends Vue {
  @Prop({ required: true, type: String }) readonly alias!: string;
  @Prop({ required: true, type: String }) readonly pay_method!: string;
  // @Prop({ required: true, type: String }) readonly kingdom!: string
  // @Prop({ required: true, type: String }) readonly product!: string
  // @Prop({ required: true, type: String }) readonly price!: string
  // @Prop({ required: true, type: String }) readonly available!: string
  // @Prop({ required: true, type: String }) readonly faction!: string
}
</script>

<style lang="sass" scoped>
.btn-gradient
  background: $button-gradient
  color: $background!important

p,small
  color: $font-main-color
  margin-bottom: 0
</style>
