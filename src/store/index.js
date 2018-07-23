import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import list from './list'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    list
  }
})

export default store
