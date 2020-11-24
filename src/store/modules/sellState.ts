/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GetMe,
  Delete,
  Update,
  // GetAll,
  Add,
  GetCharacters,
  GetGold,
  GetItems
} from "@/services/post.service";
import Vue from "vue";

const sellState = {
  state: () => ({
    postList: [],
    // allPostList: [],
    goldPosts: [],
    characterPosts: [],
    itemPosts: []
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
    setCharacterPosts(state: any, payload: any): void {
      console.log("Character Post:", payload);
      state.characterPosts = payload;
    },
    setItemPosts(state: any, payload: any): void {
      console.log("Item Post:", payload);
      state.itemPosts = payload;
    },
    setGoldPosts(state: any, payload: any): void {
      console.log("Item Post:", payload);
      state.goldPosts = payload;
    },
    getPost(state: any, payload: any): void {
      console.log("getMePost:", payload);
      state.postList = payload;
    },
    // getAllPosts(state: any, payload: any): void {
    //   console.log("getAllPost:", payload);
    //   state.allPostList = payload;
    // },
    deletePost(state: any, payload: any): void {
      // state.userData
      const { index } = payload;
      state.postList.rows.splice(index, 1);
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
    getPosts({ commit }: any, { size, page }: any): void {
      console.info(size, page);
      GetMe(size, page)
        .then((response: any) => {
          console.info("from get post", response);
          commit("getPost", response.data.data);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se han cargado tus publicaciónes`);
        });
    },
    getGoldPosts({ commit }: any, { size, page }: any): void {
      console.info(size, page);
      GetGold(size, page)
        .then((response: any) => {
          console.info("from gold post", response);
          commit("setGoldPosts", response.data.data);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se han cargado tus publicaciónes`);
        });
    },
    getCharacterPosts({ commit }: any, { size, page }: any): void {
      console.info(size, page);
      GetCharacters(size, page)
        .then((response: any) => {
          console.info("from character post", response);
          commit("setCharacterPosts", response.data.data);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se han cargado tus publicaciónes`);
        });
    },
    getItemPosts({ commit }: any, { size, page }: any): void {
      console.info(size, page);
      GetItems(size, page)
        .then((response: any) => {
          console.info("from item post", response);
          commit("setItemPosts", response.data.data);
        })
        .catch(error => {
          console.info(error);
          Vue.$toast.error(`No se han cargado tus publicaciónes`);
        });
    },
    // getAllPosts({ commit }: any): void {
    //   GetAll()
    //     .then((response: any) => {
    //       console.info("from get all post", response);
    //       commit("getAllPosts", response.data.data);
    //     })
    //     .catch(error => {
    //       console.info(error);
    //       Vue.$toast.error(
    //         `Ha ocurrido un error al intentar obtener las publicaciones`
    //       );
    //     });
    // },
    updatePost(payload: any): void {
      const { id } = payload;
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
      return state.postList.rows;
    },
    getTotalItems: (state: { postList: any }) => {
      return state.postList.count;
    },
    getAllPostList: (state: { allPostList: any }) => {
      return state.allPostList;
    },
    getGoldPostList: (state: { goldPosts: any }) => {
      return state.goldPosts.rows;
    },
    getGoldCount: (state: { goldPosts: any }) => {
      return state.goldPosts.count;
    },
    getCharacterPostList: (state: { characterPosts: any }) => {
      return state.characterPosts.rows;
    },
    getCharacterCount: (state: { characterPosts: any }) => {
      return state.characterPosts.count;
    },
    getItemPostList: (state: { itemPosts: any }) => {
      return state.itemPosts.rows;
    },
    getItemCount: (state: { itemPosts: any }) => {
      return state.itemPosts.count;
    }
  }
};
export default sellState;
