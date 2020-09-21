import { Payload } from 'vuex';

const paymentState = {
    state: () => ({
        activeBuy: {},
        stripeData: {}
    }),
    mutations: {
        /**
         * @params name - product name to set selected product card.
         * @remarks this refers to product cards in buy and sell components
         *   */
        setStripeData(state: any, payload: any): void {
            console.log(payload)
            state.stripeData = payload;
        },
        setActiveBuy(state: any, payload: any): void {
            state.activeBuy = payload;
        }
    },
    actions: {
        setStripeData({ commit }: any, payload: any): void {
            commit('setStripeData', payload)
        },
        setActiveBuy({ commit }: any, payload: any): void {

            commit('setActiveBuy', payload)
        }
    }
    // getters: { ... }
}
export default paymentState