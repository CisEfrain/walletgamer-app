<template>
<v-container class="mt-8">
    <v-row align="center" justify="center" class="mt-6 mb-less">
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="realm"
          label="Reino"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="factions"
          label="Facción"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="2">
        <v-select
          :items="classes"
          label="Clase"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="2">
        <v-select
          :items="level"
          label="Nivel"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
        ></v-select>
      </v-col>
    </v-row>

  <CharactersItemList
    user="Manuel Perez"
    rank="Newbie"
    kingdom="AD"
    faction="Horda"
    characterClass="Magician"
    price="100"
    level="60"
  />
  <CharactersItemList
    user="Manuel Perez"
    rank="Newbie"
    kingdom="AD"
    faction="Horda"
    characterClass="Magician"
    price="100"
    level="60"
  />
  <CharactersItemList
    user="Manuel Perez"
    rank="Newbie"
    kingdom="AD"
    faction="Horda"
    characterClass="Magician"
    price="100"
    level="60"
  />
  <CharactersItemList
    user="Manuel Perez"
    rank="Newbie"
    kingdom="AD"
    faction="Horda"
    characterClass="Magician"
    price="100"
    level="60"
  />

</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue"
import CharactersItemList from "@/components/buy/CharactersItemList.vue"

@Component({
  components:{
    ProductCard,
    CharactersItemList
  }
})
export default class BuyCharacterList extends Vue {
  private realm: Array<string> = [
      "Aegwynn",
      "Aerie Peak",
      "Aggramar",
      "Akama",
      "Altar of Storms"
  ]
  private factions: Array<string> = [
      "Horde",
      "Alliance",
      "Horde Force",
      "Steamwheedle Cartel"
  ]
  private classes: Array<string> = [
      "Warrior",
      "Paladín",
      "Pícaro",
      "Hunter",
      "Priest",
      "Sorcerer",
      "Mage",
      "Monk",
      "Demon Hunter"
  ]
  private level: Array<number> = [
    15,30,45,60
  ]
}
</script>

<style lang="sass" scoped>
.mb-less
  margin-bottom: -24px!important
</style>
