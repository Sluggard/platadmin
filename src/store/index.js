import { createStore } from 'vuex'

export default createStore({
  state: {
    collapsed: false
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed
    }
  },
  actions: {},
  modules: {}
})
