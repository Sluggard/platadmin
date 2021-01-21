import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
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
  actions: {
    loginUser(user, state) {
      state.user = user
    }
  },
  modules: {}
})
