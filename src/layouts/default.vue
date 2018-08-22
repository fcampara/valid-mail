<template>
  <q-layout view="hHh Lpr fFf">
    <q-layout-header>
      <q-toolbar color="deep-purple-5" style="height: 55px">
        <q-btn flat dense round aria-label="Menu" @click="left = !left">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Kong Mailer
          <span slot="subtitle">Seu validador inteligente</span>
        </q-toolbar-title>
        <input-valid/>
          <q-btn flat round dense icon="notifications" @click="right = !right" >
          <q-chip v-if="messages.length > 0" floating color="red">{{messages.length}}</q-chip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="left" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter >
        <card-user/>

        <q-item :to="{ name: 'dashboard' }">
          <q-item-main>Dashboard</q-item-main>
        </q-item>

        <q-item :to="{ name: 'list' }">
          <q-item-main>List</q-item-main>
        </q-item>

      </q-list>
    </q-layout-drawer>

    <q-layout-drawer id="timeline" side="right" v-model="right" content-class="bg-grey-3">
      <q-list-header>
        Timeline
        <q-btn label="Limpar" color="amber" icon="fa fa-trash" class="float-right" @click="clearMessages()"/>
      </q-list-header>
      <div style="padding: 25px 16px 16px;">
        <p class="caption" v-for="(n, index) in messages" :key="`${n.email}-${index}`">
          <em class="ellipsis" v-if="n.info">
            <q-icon :color="n.info.sysValid ? 'positive' : 'negative'" :name="n.info.sysValid ? 'thumb_up' : 'thumb_down'" />
            {{n.email}}
          </em>
          <em v-if="n.save">
            {{n.save}}
          </em>
        </p>
      </div>
    </q-layout-drawer>

    <q-page-container>
      <!-- <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in"> -->
        <router-view />
      <!-- </transition> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

import ValidSingle from '../components/validSingle.vue'
import cardUser from '../components/cardUser.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'LayoutDefault',
  data () {
    return {
      messages: [],
      left: true,
      right: false
    }
  },
  components: {
    'input-valid': ValidSingle,
    'card-user': cardUser
  },
  computed: {
    ...mapGetters({
      user: 'auth/currentUser'
    }),
    ...mapState({
      load: state => state.validations.load,
      list: state => state.validations.list
    })
  },
  methods: {
    ...mapActions({
      getList: 'validations/list'
    }),
    scrollToElement (el) {
      const target = getScrollTarget(el), offset = el.scrollHeight
      setScrollPosition(target, offset, 1000)
    },
    async loadList () {
      if (this.load === false) {
        this.$q.loading.show({message: 'Carregando sua lista de email'})
        await this.getList().then(() => {
          this.$q.loading.hide()
        })
      }
    },
    clearMessages () {
      this.messages = []
    }
  },
  created () {
    this.loadList()
    const io = require('socket.io-client')
    // const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/validMail' : `http://valid-mail.herokuapp.com/validMail`
    const socket = io.connect('http://localhost:5000/validMail')
    console.log(socket) // eslint-disable-line
    socket.emit('setUser', this.user)

    socket.on('connect', () => console.log('Conectado')) // eslint-disable-line
    socket.on('connect_error', (error) => console.log('connect_error: ', JSON.stringify(error))) // eslint-disable-line
    socket.on('connect_timeout', (timeout) => console.log('connect_timeout: ', JSON.stringify(timeout))) // eslint-disable-line
    socket.on('ping', () => console.log('Ping')) // eslint-disable-line
    socket.on('pong', (latency) => console.log('Pong: ', latency)) // eslint-disable-line

    socket.on('message', (message) => {
      if (message.email) {
        this.messages.push(message)
        this.scrollToElement(document.getElementsByTagName('aside')[1])
        // const aside = document.getElementsByTagName('aside')[1]
        // aside.scrollTop = aside.scrollHeight + 100
      }
      console.log(this.messages) // eslint-disable-line
    })
    socket.on('save', (message) => {
      if (message.save) {
        this.messages.push(message)
        this.scrollToElement(document.getElementsByTagName('aside')[1])
      }
    })
  }
}
</script>

<style>
.input-single {
    width: 25%
  }
@media (max-width: 568px) {
  .input-single {
    width: 73%
  }
}
</style>
