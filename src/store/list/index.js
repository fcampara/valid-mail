import Firebase from 'firebase/app'
// import _ from 'lodash'
export default {
  namespaced: true,

  state: {
    list: {},
    load: false
  },

  getters: {
    details (state) {
      const list = state.list
      let details = []
      for (let item of list) {
        details.push({
          id: item.id,
          created_at: item.details.created_at,
          invalid: item.details.invalid,
          valid: item.details.valid,
          nameFile: item.details.nameFile,
          length: item.details.length
        })
      }

      return details
    },

    selectById (state) {
      return id => {
        return state.list.find(list => list.id === id)
      }
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