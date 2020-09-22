
const paymentState = {
    state: () => ({
        PayModal: false,
        currentStep: 1,
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
        },
        nextStep(state: any): void {
            state.currentStep++
        },
        openPayModal(state: any): void {
            state.PayModal = !state.PayModal;
        }
    },
    actions: {
        setStripeData({ commit }: any, payload: any): void {
            commit('setStripeData', payload)
        },
        setActiveBuy({ commit }: any, payload: any): void {

            commit('setActiveBuy', payload)
        },
        nextStep({ commit }: any): void {
            commit('nextStep')
        },
        openPayModal({ commit }: any): void {
            commit('openPayModal')

        }
    }
    // getters: { ... }
}
export default paymentState