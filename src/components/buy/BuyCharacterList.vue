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
      class="animated fadeIn fast"
      v-for="(characterPost, $index) in showFiltered"
      :key="characterPost.id"
      :user="characterPost.usuario.nombre"
      :rank="characterPost.usuario.rango || 'Pollo'"
      :kingdom="characterPost.reino"
      :faction="characterPost.faccion"
      :characterClass="characterPost.clase"
      :price="characterPost.precio"
      :level="characterPost.nivel"
      @click="buyCharacter($index, characterPost.id, characterPost)"
      actions
    />
    <div class="text-center">
      <v-pagination
        v-show="characterPages > 1"
        v-model="characterPage"
        :length="characterPages"
        color="#E4445B"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        total-visible="10"
        @input="handlePagination"
      >
      </v-pagination>
    </div>
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
  get factionList(): Array<string> {
    return this.$store.getters.getFactionList;
  }

  get realmList(): Array<string> {
    return this.$store.getters.getRealmList;
  }

  get classList(): Array<string> {
    return this.$store.getters.getClassList;
  }

  private buyCharacter(index: any, id: any, characterPost: any) {
    console.info(index, id);
    console.info(index, id, characterPost);
    this.$router.replace("/payment");
    this.$store.dispatch("setProductToBuy", characterPost);
  }

  private level: Array<number> = [15, 30, 45, 60];
  private realmSelected = "";
  private classSelected = "";
  private levelSelected = 0;
  private factionSelected = "";
  private characterList: Array<unknown> = [];
  public characterPage = 1;

  created() {
    this.$store.dispatch("getCharacterPosts", { size: 4, page: 0 });
  }

  get postCharacterList(): Array<unknown> {
    return this.$store.getters.getCharacterPostList;
  }

  get characterPages(): number {
    return Math.ceil(this.$store.getters.getCharacterCount / 4);
  }

  private handlePagination(e): void {
    console.info(e);
    this.characterPage = e;
    this.$store.dispatch("getCharacterPosts", { size: 4, page: e - 1 });
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
