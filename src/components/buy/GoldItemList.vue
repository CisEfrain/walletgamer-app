<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer>
        <v-row class="px-4" align="center" justify="center">
          <v-col>
            <h4 class="title">{{user}}</h4>
            <small>Rango {{rank}}</small>
          </v-col>
          <v-col>
            <div>Reino {{kingdom}}</div>
            <v-chip>
              {{faction}}
            </v-chip>
          </v-col>
          <v-col>
            <h5>{{price}}$ por cada {{product}} de gold</h5>
            <small>Disponible: {{available}}</small>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <div>
              <v-btn text large color="error"><b>Comprar</b></v-btn>
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
export default class GoldItemList extends Vue {
  @Prop({ required: true, type: String }) readonly user!: string
  @Prop({ required: true, type: String }) readonly rank!: string
  @Prop({ required: true, type: String }) readonly kingdom!: string
  @Prop({ required: true, type: String }) readonly product!: string
  @Prop({ required: true, type: String }) readonly price!: string
  @Prop({ required: true, type: String }) readonly available!: string
  @Prop({ required: true, type: String }) readonly faction!: string

}
</script>

<style lang="sass" scoped></style>
