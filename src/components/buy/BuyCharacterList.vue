<template>
  <v-container class="mt-8">
    <v-row align="center" justify="center" class="mt-6 mb-less">
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="realmList"
          label="Reino"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
          @change="filterCharacter"
          v-model="realmSelected"
          background-color="white"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="3">
        <v-select
          :items="factionList"
          label="Facción"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
          @change="filterCharacter"
          v-model="factionSelected"
          background-color="white"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="2">
        <v-select
          :items="classList"
          label="Clase"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
          class="select-field"
          @change="filterCharacter"
          v-model="classSelected"
          background-color="white"
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
          @change="filterCharacter"
          v-model="levelSelected"
          background-color="white"
        ></v-select>
      </v-col>
    </v-row>

    <CharactersItemList
      v-for="(characterPost, $index) in showFiltered"
      :key="characterPost.id"
      :user="characterPost.usuario.nombre"
      :rank="characterPost.usuario.rango || 'Pollo'"
      :kingdom="characterPost.reino"
      :faction="characterPost.faccion"
      :characterClass="characterPost.clase"
      :price="characterPost.precio"
      :level="characterPost.nivel"
      @click="buyGold($index, goldPost.id)"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue";
import CharactersItemList from "@/components/buy/CharactersItemList.vue";

@Component({
  components: {
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
  ];
  private factions: Array<string> = [
    "Horde",
    "Alliance",
    "Horde Force",
    "Steamwheedle Cartel"
  ];
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
  ];

  get factionList(): Array<string> {
    return this.$store.getters.getFactionList;
  }

  get realmList(): Array<string> {
    return this.$store.getters.getRealmList;
  }

  get classList(): Array<string> {
    return this.$store.getters.getClassList;
  }


  private level: Array<number> = [15, 30, 45, 60];
  private realmSelected = "";
  private classSelected = "";
  private levelSelected = 0;
  private factionSelected = "";
  private characterList: Array<unknown> = [];

  get postCharacterList(): Array<unknown> {
    return this.$store.getters.getCharacterPostList.reverse();
  }

  get showFiltered(): any {
    return this.characterList.length <= 0
      ? this.postCharacterList
      : this.characterList;
  }

  private filterCharacter(): void {
    this.characterList = this.postCharacterList.filter((characterPost: any) => {
      return (
        characterPost.reino === this.realmSelected ||
        characterPost.faccion === this.factionSelected ||
        characterPost.clase === this.classSelected ||
        characterPost.nivel === this.levelSelected
      );
    });
  }
}
</script>

<style lang="sass" scoped>
.mb-less
  margin-bottom: -24px!important
</style>
