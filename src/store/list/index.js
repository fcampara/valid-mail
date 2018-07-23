import Firebase from 'firebase/app'
import _ from 'lodash'
export default {
  namespaced: true,

  state: {
    list: {},
    load: false
  },

  getters: {
    details (state) {
      return _.map(state.list, 'details')
    }
  },

  mutations: {
    SET_LIST (state, payload) {
      let list = payload
      state.load = true
      state.list = list
    },

    RESET_LIST (state) {
      state.load = false
      state.list = null
    }
  },

  actions: {
    async list ({ commit }) {
      const dbList = Firebase.firestore().collection('list')
      await dbList.onSnapshot(querySnapshot => {
        let list = []
        querySnapshot.forEach(doc => {
          const data = doc.data()
          data.id = doc.id
          list.push(data)
        })
        commit('SET_LIST', list)
      }, err => {
        console.log(err)
      })
    }
  }
}
