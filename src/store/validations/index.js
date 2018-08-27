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
      return list && list.map(item => ({
        id: item.id,
        createdAt: item.details.createdAt,
        invalid: item.details.invalid,
        valid: item.details.valid,
        nameFile: item.details.nameFile,
        length: item.details.length
      })).sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1
        if (a.createdAt < b.createdAt) return 1
        return 0
      })
    },

    selectById: ({list}) => idFind => list.find(({ id: idList }) => idList === idFind)
  },

  mutations: {
    SET_LIST (state, payload) {
      state.list = payload
      state.load = true
    },

    RESET_LIST (state) {
      state.list = null
      state.load = false
    }
  },

  actions: {
    list ({ commit, rootState }) {
      const dbList = Firebase.firestore().collection('validations')
      return new Promise(resolve => {
        dbList.where('uid', '==', rootState.auth.user.uid).onSnapshot(querySnapshot => {
          let list = []
          querySnapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            list.push(data)
          })

          commit('SET_LIST', list)
          resolve('Sucesso')
        }, () => {
          commit('RESET_LIST')
        })
      })
    },
    put ({ commit }, payload) {
      const dbList = Firebase.firestore().collection('validations')
      return new Promise((resolve, reject) => {
        dbList.doc(payload).delete().then(() => resolve('Deleteado com sucesso')).catch(err => reject(err))
      })
    }
  }
}
