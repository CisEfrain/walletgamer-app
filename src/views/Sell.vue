<template>
  <v-container class="px-8">
    <h2 class="custom-class">
      <a href="/sellment">
        to sellment
      </a>
    </h2>
    <v-row align="center" justify="center">
      <h3 class="mt-12 mb-4 title text-center">¿Qué te interesa vender?</h3>
    </v-row>

    <v-row class="d-flex align-content-center justify-center mb-1">
      <ProductCard
        v-for="(product, $index) in productList"
        :key="$index"
        :productTitle="product"
        @selected="selectProduct(product)"
      />
    </v-row>

    <div class="mt-10" justify="center" v-if="currentProduct == 'Post'">
      <h3 class="title mb-6" v-show="postList.lenght > 0">Mis publicaciones</h3>
      <v-expansion-panels class="container" v-model="panel" multiple flat>
        <PostList
          v-for="(post, $index) in postList"
          :key="post.id"
          :product="post.tipo"
          :nivel="post.nivel"
          :item="post.item"
          :cost="post.precio"
          :quantity="post.cantidad"
          :realm="post.reino"
          :faction="post.faccion"
          @click="deletePost($index, post.id)"
        />
      </v-expansion-panels>
    </div>

    <div v-else class="mt-10">
      <h3 class="title">Ingresa las caracteristicas de tu publicación</h3>
      <transition name="slide-fade">
        <keep-alive>
          <component
            :key="productListSelected"
            :is="productListSelected"
          ></component>
        </keep-alive>
      </transition>
      <v-row class="px-4" align="center" justify="center">
        <v-btn text small color="error" @click="setPosts">
          <b>Ver mis publicaciones</b>
        </v-btn>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ProductCard from "@/components/ProductCard.vue";
import PersonajeForm from "@/components/sell/CharactersForm.vue";
import GoldForm from "@/components/sell/GoldForm.vue";
import ItemsForm from "@/components/sell/ItemsForm.vue";
import PostList from "@/components/sell/PostList.vue";

@Component({
  components: {
    ProductCard,
    PersonajeForm,
    GoldForm,
    ItemsForm,
    PostList
  }
})
export default class Sell extends Vue {
  public productList: Array<string> = ["Gold", "Personaje", "Items"];
  public currentProduct: Array<string> = ["Post"];
  private panel: Array<number> = [0];

  public selectProduct(tab: any): void {
    this.currentProduct = tab;
  }
  private setPosts(): void {
    this.currentProduct = ["Post"];
    this.$store.commit("resetProduct");
  }

  private deletePost(index: any, id: any): void {
    const payload = { index, id };
    console.info("id", id, "index", index);
    this.$store.dispatch("deletePost", payload);
    this.$store.dispatch("getPosts");
  }

  mounted() {
    this.$store.dispatch("getPosts");
  }

  get postList(): any {
    return this.$store.getters.getPostList;
  }

  get productListSelected(): any {
    return `${this.currentProduct}Form`;
  }
}
</script>

<style lang="sass" scoped>
.slide-fade-enter-active
  transition: all .3s ease-in

.slide-fade-leave-active
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-to
  transform: translateY(20px)
  transition: all .2s ease-out
  opacity: .1
</style>
