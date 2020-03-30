export default {
  store: () => ({
    data: []
  }),
  actions: {
    async nuxtServerInit ({ dispatch, commit }) {
      if (!process.mcache.get('data')) {
        await dispatch('fetchData')
      } else commit('SET_DATA', process.mcache.get('data'))
    },
    async fetchData ({ commit }) {
      try {
        let data = null
        await fetch('https://meowfacts.herokuapp.com/').then(res => res.json()).then(res => {
          data = res.data[0]
        })
        commit('SET_DATA', data)
        process.mcache.put('data', data, 10 * 1000)
      } catch (err) {
        console.log('Error err', err)
      }
    }
  },
  mutations: {
    SET_DATA (state, payload) {
      state.data = payload
    }
  }
}
