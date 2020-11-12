/* eslint-disable @typescript-eslint/camelcase */
import { GetMe, Delete, Update, Add } from "@/services/post.service";
import Vue from "vue";

const sellState = {
  state: () => ({
    postList: [],
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
    deletePost(state: any, payload: any): void {
      // state.userData
      const { index } = payload;
      state.postList.splice(index, 1);
    }
  },
  actions: {
    addPost({ commit }: any, payload: any): void {
      const { usuarios_id } = payload;
      Add(payload, usuarios_id )
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
    },
    // setCharacterPost({ commit }: any, payload: any): void {
    //   commit("setCharacterPost", payload);
    // },
    // setItemPost({ commit }: any, payload: any): void {
    //   commit("setItemPost", payload);
    // }
  },
  getters: { 
    getPostList: (state: { postList: any }) => {
      return state.postList;
    }
   }
};
export default sellState;
