<template>
  <v-row class="d-flex justify-center">
    <v-col cols="11">
      <BaseCardContainer>
        <v-row class="px-4" align="center" justify="center">
          <v-col>
            <h4 class="title">{{user}}</h4>
            <small>Rango {{rank}}</small>
          </v-col>
          <v-col class="mt-2 text-center">
            <div>Reino {{kingdom}}</div>
            <v-chip>
              {{faction}}
            </v-chip>
          </v-col>
          <v-col class="mt-2 text-center">
            <div>Clase {{characterClass}}</div>
            <v-chip width="" >
              Nivel: {{level}}
            </v-chip>
          </v-col>
          <v-col class="d-flex justify-end">
            <h3>{{price}}$</h3>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <div class="my-2">
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
export default class CharactersItemList extends Vue {
  @Prop({ required: true, type: String }) readonly user!: string
  @Prop({ required: true, type: String }) readonly rank!: string
  @Prop({ required: true, type: String }) readonly kingdom!: string
  @Prop({ required: true, type: String }) readonly characterClass!: string
  @Prop({ required: true, type: String }) readonly level!: string
  @Prop({ required: true, type: String }) readonly price!: string
  @Prop({ required: true, type: String }) readonly faction!: string

}
</script>

<style lang="sass" scoped></style>
