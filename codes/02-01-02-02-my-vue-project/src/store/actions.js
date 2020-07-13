export default {
  increment: ({ commit }) => commit('INCREMENT'),

  incrementAsync: ({ commit }) => setTimeout(() => commit('INCREMENT'), 1000),

  decrement: ({ commit }) => commit('DECREMENT'),

  decrementAsync: ({ commit }) => setTimeout(() => commit('DECREMENT'), 1000)
}
