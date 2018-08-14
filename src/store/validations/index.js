import Firebase from 'firebase/app'
// import _ from 'lodash'

export default {
  namespaced: true,

  state: {
    list: [],
    load: false
  },

  getters: {
    details (state) {
      const { list } = state
      return list && list.map(item => {
        return {
          id: item.id,
          createdAt: item.details.createdAt,
          invalid: item.details.invalid,
          valid: item.details.valid,
          nameFile: item.details.nameFile,
          length: item.details.length
        }
      }).sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1
        if (a.createdAt < b.createdAt) return 1
        return 0
      })
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
    async list ({ commit, rootState }) {
      const dbList = Firebase.firestore().collection('validations')
      await dbList.where('uid', '==', rootState.auth.user.uid).onSnapshot(querySnapshot => {
        let list = []
        querySnapshot.forEach(doc => {
          const data = doc.data()
          data.id = doc.id
          list.push(data)
        })
        commit('SET_LIST', list)
      }, err => {
        console.log(err)// eslint-disable-line no-console
      })
    },
    async put ({commit}, payload) {
      const dbList = Firebase.firestore().collection('validations')
      const resp = new Promise((resolve, reject) => {
        dbList.doc(payload).delete().then((resp) => {
          resolve('Deleteado com sucesso')
        }).catch(err => {
          reject(err)
        })
      })
      return resp
    }
  }
}
