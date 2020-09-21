<template>
  <v-dialog v-model="dialog" width="400" overlay-color="blue-grey lighten-5">
    <BaseCardContainer>
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-col class="my-4 text-center">
          <h3>content here</h3>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn
          type="button"
          rounded
          color="btn-gradient"
          class="button button--primary button--medium mt-4 px-6"
          @click="hasDialog"
        >Confirmar</v-btn>
      </v-row>
    </BaseCardContainer>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import BaseCardContainer from "@/components/base/BaseCardContainer.vue";

@Component({
  components: {
    BaseCardContainer
  }
})
export default class BaseModal extends Vue {
  @Prop({ type: Boolean, default: true }) dialog!: boolean;

  hasDialog() {
    this.dialog = !this.dialog;
  }
}
</script>

<style lang="sass">
#app > div.v-dialog__content.v-dialog__content--active > div.v-dialog.v-dialog--active
  border-radius: 34px!important
  -webkit-box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8)
  -moz-box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8)
  box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8)
</style>
