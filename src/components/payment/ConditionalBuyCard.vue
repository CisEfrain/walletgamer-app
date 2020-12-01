<template>
  <v-row v-if="itemList" class="d-flex justify-center px-16">
    <v-col>
      <div v-if="itemList.item.tipo === 'oro'">
        <GoldItemList
          :key="itemList.item.id"
          :user="itemList.operaciones[1].usuario.nombre"
          :rank="itemList.operaciones[1].usuario.rango || 'Pollo'"
          :kingdom="itemList.item.reino"
          :faction="itemList.item.faccion"
          :price="itemList.item.precio"
          :product="itemList.item.tipo"
          :available="itemList.item.cantidad"
          isBuy
        />
      </div>
      <div v-if="itemList.item.tipo === 'personaje'">
        <CharactersItemList
          :key="itemList.id"
          :user="itemList.operaciones[1].usuario.nombre"
          :rank="itemList.operaciones[1].usuario.rango || 'Pollo'"
          :kingdom="itemList.reino"
          :faction="itemList.faccion"
          :characterClass="itemList.clase"
          :price="itemList.precio"
          :level="itemList.nivel"
          isBuy
        />
      </div>
      <div v-if="itemList.item.tipo === 'item'">
        <ItemsItemList
          :key="itemList.id"
          :user="itemList.operaciones[1].usuario.nombre"
          :rank="itemList.operaciones[1].usuario.rango || 'Pollo'"
          :faction="itemList.faccion"
          :price="itemList.precio"
          :item="itemList.descripcion"
          :available="itemList.cantidad"
          isBuy
        />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GoldItemList from "@/components/buy/GoldItemList.vue";
import CharactersItemList from "@/components/buy/CharactersItemList.vue";
import ItemsItemList from "@/components/buy/ItemsItemList.vue";

@Component({
  components: {
    GoldItemList,
    CharactersItemList,
    ItemsItemList
  }
})
export default class ConditionalBuyCard extends Vue {
  @Prop({ type: String }) readonly user!: string;
  @Prop({ type: String }) readonly rank!: string;
  @Prop({ type: String }) readonly item!: string;
  @Prop({ type: String }) readonly price!: string;
  @Prop({ type: Number }) readonly available!: number;
  @Prop({ type: String }) readonly faction!: string;

  @Prop({ type: String }) readonly kingdom!: string;
  @Prop({ type: String }) readonly product!: string;

  @Prop({ type: String }) readonly characterClass!: string;
  @Prop({ type: Number }) readonly level!: number;

  get itemList(): any[] {
    return this.$store.getters.getProductToBuy;
  }
}
</script>

<style lang="sass" scoped></style>
