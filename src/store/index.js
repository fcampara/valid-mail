import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import socket from './socket'
import validations from './validations'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    socket,
    validations
  }
})

export default store
