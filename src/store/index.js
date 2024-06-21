import { createStore } from 'vuex'

export default createStore({
  state: {
    complete: false,
    question: {
      id: 1,
      query: null,
      primaryOrder: null,
      answers: [],
      order: null
    },
    products: [],
    questions: [],
    allProducts: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
