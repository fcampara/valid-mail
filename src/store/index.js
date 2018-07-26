import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import validations from './validations'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    validations
  }
})

export default store
