<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <BaseCardContainer class="py-2">
        <v-row class="px-4" align="center" justify="center">
          <v-col cols="3" sm="6" md="2">
            <h4 class="main-title">{{ alias }}</h4>
          </v-col>
          <v-col class="d-flex" cols="3" sm="6" md="2">
            <v-chip color="blue-grey darken-3" dark>
              <b>{{ pay_method }}</b>
            </v-chip>
          </v-col>
          <v-col class="text-justify">
            <p>Email: {{ email }}</p>
            <p>Descripcion: {{ descripcion }}</p>
          </v-col>
          <v-col class="d-flex justify-end align-center">
            <div>
              <v-btn @click="deleteMethod(id)" text large color="error"
                ><b>Eliminar</b></v-btn
              >
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
    BaseCardContainer
  }
})
export default class UserExpenditureItemList extends Vue {
  @Prop({ type: String }) readonly alias: string | undefined;
  @Prop({ type: String }) readonly pay_method: string | undefined;
  @Prop({ type: String }) readonly descripcion: string | undefined;
  @Prop({ type: String }) readonly email: string | undefined;
  @Prop({ type: Number }) readonly id: number | undefined;
  // @Prop({ required: true, type: String }) readonly available!: string
  // @Prop({ required: true, type: String }) readonly faction!: string

  private deleteMethod(id: any) {
    this.$emit("click", this.id);
  }
}
</script>

<style lang="sass" scoped>
.btn-gradient
  background: $button-gradient
  color: $background!important

p,small
  color: $font-main-color
  margin-bottom: 0

.slide-fade-enter-active
  transition: all .3s ease-in

.slide-fade-leave-active
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-to
  transform: translateY(20px)
  transition: all .2s ease-out
  opacity: .1
</style>
