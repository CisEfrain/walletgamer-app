const sellState = {
  state: () => ({
    postList: {},
    goldPost: {},
    characterPost: {},
    itemPost: {},
  }),
  mutations: {
    /**
     * @params name - product name to set selected product card.
     * @remarks this refers to product cards in buy and sell components
     *   */
    setGoldPost(state: any, payload: any): void {
      console.log("Gold Post:", payload);
      state.goldPost = payload;
    },
    setCharacterPost(state: any, payload: any): void {
      console.log("Character Post:",payload);
      state.characterPost = payload;
    },
    setItemPost(state: any, payload: any): void {
      console.log("Item Post:",payload);
      state.itemPost = payload;
    },
  },
  actions: {
    setGoldPost({ commit }: any, payload: any): void {
      commit("setGoldPost", payload);
    },
    setCharacterPost({ commit }: any, payload: any): void {
      commit("setCharacterPost", payload);
    },
    setItemPost({ commit }: any, payload: any): void {
      commit("setItemPost", payload);
    },

  },
  // getters: { ... }
};
export default sellState;
