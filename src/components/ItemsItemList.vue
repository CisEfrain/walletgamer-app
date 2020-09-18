<template>
  <v-row class="d-flex justify-center">
    <v-col cols="10">
      <BaseCardContainer>
        <v-row class="px-4" align="center" justify="center">
          <v-col>
            <h4 class="title">{{user}}</h4>
            <small>Rango {{rank}}</small>
          </v-col>
          <v-col class="">
            <div>Ítems {{item}}</div>
            <v-chip>
              {{faction}}
            </v-chip>
          </v-col>
          <v-col class="d-flex flex-column align-end">
            <h4>{{price}}$</h4>
            <small>Disponible: {{available}}</small>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <div class="">
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

import BaseCardContainer from "@/components/BaseCardContainer.vue";

@Component({
  components: {
    BaseCardContainer,
  },
})
export default class ItemsItemList extends Vue {
  @Prop({ required: true, type: String }) readonly user!: string
  @Prop({ required: true, type: String }) readonly rank!: string
  @Prop({ type: String }) readonly item!: string
  @Prop({ required: true, type: String }) readonly price!: string
  @Prop({ required: true, type: String }) readonly available!: string
  @Prop({ required: true, type: String }) readonly faction!: string

}
</script>

<style lang="sass" scoped></style>
