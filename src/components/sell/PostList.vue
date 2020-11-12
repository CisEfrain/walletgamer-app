<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer>
        <v-expansion-panel class="bg-transparent">
          <v-expansion-panel-header>
            <v-row class="" align="center">
              <v-col cols="12" md="3" sm="12">
                <h3 class="transaction-title mt-2">{{ product }}</h3>
              </v-col>
              <v-col cols="6" md="3" sm="4">
                <p>{{ cost }}$ por cada 100 de oro</p>
              </v-col>
              <v-col cols="6" md="2" sm="4">
                <p>Disponible: {{ quantity }}</p>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="px-4" align="center" justify="space-between">
              <v-col cols="12" md="6" sm="6">
                <p>Reino: {{ realm }}</p>
                <p>Facción: {{ faction }}</p>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="d-flex justify-end">
                <v-btn  @click="deletePost" text small color="error">
                  <b>Eliminar publicación</b>
                </v-btn>
                <v-btn text small color="error">
                  <b>Modificar</b>
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
export default class PostList extends Vue {
  @Prop({ type: String }) readonly product: string | undefined;
  @Prop({ type: String }) readonly level: string | undefined;
  @Prop({ type: String }) readonly item: string | undefined;
  @Prop({ type: String }) readonly cost: string | undefined;
  @Prop({ type: Number }) readonly quantity: number | undefined;
  @Prop({ type: String }) readonly realm: string | undefined;
  @Prop({ type: String }) readonly faction: string | undefined;

  private deletePost() {
    this.$emit("click");
  }
}
</script>

<style lang="sass" scoped>
p,small
  color: $font-main-color

.success
  background-color: $success

.warning
  background-color: $warning

.error
  background-color: $danger

.bg-transparent
  background-color: transparent!important
  border-radius: 40px

.transaction-title
  font-size: 1.1em
  color: $danger
  margin-bottom: 8px

p
  margin-bottom: 0
</style>
