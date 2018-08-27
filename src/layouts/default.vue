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
          <q-chip v-if="messages.length > 0" floating color="red"> * </q-chip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="left" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter >
        <card-user/>

        <q-item :to="{ name: 'home' }">
          <q-item-main>Home</q-item-main>
        </q-item>

        <q-item :to="{ name: 'list' }">
          <q-item-main>Lista</q-item-main>
        </q-item>

      </q-list>
    </q-layout-drawer>

    <q-layout-drawer id="timeline" side="right" v-model="right" content-class="bg-grey-3">
      <t-line :messages="messages" :info="info"/>
    </q-layout-drawer>

    <q-page-container>
      <!-- <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in"> -->
      <b-crumb/>
      <router-view />
      <!-- </transition> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

import Breadcrumb from '../components/breadcrumb.vue'
import validSingle from '../components/validSingle.vue'
import timeline from '../components/timeline.vue'
import cardUser from '../components/cardUser.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'LayoutDefault',
  data: () => ({
    messages: [],
    info: {
      cont: 0,
      length: 0,
      name: ''
    },
    left: true,
    right: false
  }),
  components: {
    'input-valid': validSingle,
    'card-user': cardUser,
    't-line': timeline,
    'b-crumb': Breadcrumb
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
    }
  },
  watch: {
    messages (newValue) {
      if (newValue.length === 100) this.messages.shift()
    }
  },
  created () {
    this.loadList()
    const io = require('socket.io-client')
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/validMail' : 'http://valid-mail.herokuapp.com/validMail'
    const socket = io.connect(url)

    socket.emit('setUser', this.user)

    socket.on('message', (message) => {
      this.info.cont = message.cont
      this.info.length = message.length
      this.info.name = message.name

      if (message.email) {
        this.messages.push(message)
        this.scrollToElement(document.getElementsByTagName('aside')[1])
        // const aside = document.getElementsByTagName('aside')[1]
        // aside.scrollTop = aside.scrollHeight + 100
      }
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
  .teste {
    background: black
  }
</style>
