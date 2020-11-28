<template>
  <v-row class="d-flex justify-center px-16">
    <v-col>
      <div v-if="itemList.tipo === 'oro'">
        <GoldPayForm />
      </div>
      <div v-if="itemList.tipo === 'oro'">
        <CharacterPayForm />
      </div>
      <div v-if="itemList.tipo === 'item'">
        <ItemPayForm />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GoldPayForm from "@/components/payment/GoldPayForm.vue";
import CharacterPayForm from "@/components/payment/CharacterPayForm.vue";
import ItemPayForm from "@/components/payment/ItemPayForm.vue";

@Component({
  components: {
    GoldPayForm,
    CharacterPayForm,
    ItemPayForm
  }
})
export default class ConditionalForm extends Vue {
  get itemList(): any {
    return this.$store.getters.getProductToBuy;
  }
}
</script>

<style lang="sass" scoped></style>
