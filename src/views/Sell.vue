<template>
  <v-container class="px-8">
    <h2 class="custom-class">
      <a href="/sellment">
        to sellment
      </a>
    </h2>
    <v-row align="center" justify="start">
      <h3 class="mt-12 mb-4 main-title text-center">
        ¿Qué te interesa vender?
      </h3>
    </v-row>

    <v-row align="center" justify="start" class="mb-1 ml-1">
      <ProductCard
        v-for="(product, $index) in productList"
        :key="$index"
        :productTitle="product"
        @selected="selectProduct(product)"
      />
    </v-row>

    <div class="mt-10" justify="center" v-if="currentProduct == 'Post'">
      <h3 class="title mb-6" v-show="postList.length > 0">Mis publicaciones</h3>
      <v-expansion-panels class="container" v-model="panel" multiple flat>
        <PostList
          v-for="(post, $index) in postList"
          :key="post.id"
          :product="post.tipo"
          :nivel="post.nivel"
          :item="post.item"
          :active="post.activo"
          :cost="post.precio"
          :quantity="post.cantidad"
          :realm="post.reino"
          :faction="post.faccion"
          @click="deletePost($index, post.id)"
          @change="disablePost(post)"
        />

        <div class="text-center">
          <v-pagination
            v-show="totalPages > 1"
            v-model="page"
            :length="totalPages"
            color="#E4445B"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            total-visible="10"
            @input="next"
          >
          </v-pagination>
        </div>
      </v-expansion-panels>
    </div>

    <div v-else class="mt-10">
      <h3 class="main-title">Ingresa las caracteristicas de tu publicación</h3>
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";

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
  private panel: Array<number> = [];
  public page = 1;

  public selectProduct(tab: any): void {
    this.currentProduct = tab;
  }
  private setPosts(): void {
    this.currentProduct = ["Post"];
    this.page = 1;
    this.$store.commit("resetProduct");
    this.$store.dispatch("getPosts", { size: 4, page: 0 });
  }
  private async deletePost(index: any, id: any): Promise<any> {
    const payload = { index, id };
    console.info("id", id, "index", index);
    this.$store.dispatch("deletePost", payload);
    setTimeout(() => {
      this.$store.dispatch("getPosts", { size: 4, page: 0 });
    }, 400);
  }
  private disablePost(post: any): void {
    console.info(post);
    const payload = {
      activo: post.activo === 1 ? --post.activo : ++post.activo,
      id: post.id
    };
    console.info(post, payload);
    this.$store.dispatch("updatePost", payload);
  }

  get totalPages(): any {
    return Math.ceil(this.$store.getters.getTotalItems / 4);
  }

  created() {
    this.$store.dispatch("getPosts", { size: 4, page: 0 });
  }

  private next(e): void {
    console.info(e);
    this.page = e;
    this.$store.dispatch("getPosts", { size: 4, page: e - 1 });
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
