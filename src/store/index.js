import { createStore } from 'vuex'

export default createStore({
  state: {
    collapsed: false,
    submitLoading: false
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed
    },
    openLoading(state) {
      state.submitLoading = true
    },
    closeLoading(state) {
      state.submitLoading = false
    }
  },
  actions: {},
  modules: {}
})
