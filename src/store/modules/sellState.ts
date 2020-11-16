/* eslint-disable @typescript-eslint/camelcase */
import { GetMe, Delete, Update, GetAll, Add } from "@/services/post.service";
import Vue from "vue";

const sellState = {
  state: () => ({
    postList: [],
    allPostList: [],
    goldPost: {},
    characterPost: {},
    itemPost: {}
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    addPost(state: any, payload: any): void {
      console.log("Post:", payload);
      state.goldPost = payload;
    },
    setCharacterPost(state: any, payload: any): void {
      console.log("Character Post:", payload);
      state.characterPost = payload;
    },
    setItemPost(state: any, payload: any): void {
      console.log("Item Post:", payload);
      state.itemPost = payload;
    },
    getPost(state: any, payload: any): void {
      console.log("getPost:", payload);
      state.postList = payload;
    },
    getAllPosts(state: any, payload: any): void {
      console.log("getPost:", payload);
      state.allPostList = payload;
    },
    deletePost(state: any, payload: any): void {
      // state.userData
      const { index } = payload;
      state.postList.splice(index, 1);
    }
  },
  actions: {
    addPost({ commit }: any, payload: any): void {
      Add(payload)
        .then((response: any) => {
          console.info("from pos", response);
          response.data.status === 200 &&
            Vue.$toast.success(`Publicación realizada`);
          commit("addPost", payload);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se ha podido realizar tu publicación`);
        });
    },
    getPosts({ commit }: any): void {
      GetMe()
        .then((response: any) => {
          console.info("from get post", response);
          commit("getPost", response.data.data);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se ha podido realizar tu publicación`);
        });
    },
    getAllPosts({ commit }: any): void {
      GetAll()
        .then((response: any) => {
          console.info("from get all post", response);
          commit("getAllPosts", response.data.data);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(
            `Ha ocurrido un error al intentar obtener las publicaciones`
          );
        });
    },
    updatePost({ commit }: any, payload: any): void {
      const { id, activo } = payload;
      console.info("from update actions", payload);
      Update(payload, id)
        .then((response: any) => {
          console.info("from update action", response);
          const { activo } = response.data.data;
          response.data.status === 200 &&
            Vue.$toast.success(`Publicación ${activo ? "activa" : "inactiva"}`);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se ha podido desactivar tu publicación`);
        });
    },
    deletePost({ commit }: any, payload: any): void {
      const { id } = payload;
      Delete(id)
        .then((response: any) => {
          console.info(response);
          response.data.status === 200 &&
            Vue.$toast.success(`Publicacion de venta eliminada`);
          console.info(id);
          commit("deletePost", payload);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se ha podido eliminar tu publicación`);
        });
    }
  },
  getters: {
    getPostList: (state: { postList: any }) => {
      return state.postList.reverse();
    },
    getAllPostList: (state: { allPostList: any }) => {
      return state.allPostList;
    },
    getGoldPostList: (state: { allPostList: any }) => {
      return state.allPostList.filter(
        (goldPost: any) => goldPost.tipo === "Gold" && goldPost.activo === 1
      );
    },
    getCharacterPostList: (state: { allPostList: any }) => {
      return state.allPostList.filter(
        (characterPost: any) =>
          characterPost.tipo === "Personaje" && characterPost.activo === 1
      );
    },
    getItemPostList: (state: { allPostList: any }) => {
      return state.allPostList.filter(
        (itemPost: any) => itemPost.tipo === "Item" && itemPost.activo === 1
      );
    }
  }
};
export default sellState;
