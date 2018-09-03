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
          <q-chip v-if="info.name" floating color="red"> * </q-chip>
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
      <t-line/>
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
import Breadcrumb from '../components/breadcrumb.vue'
import validSingle from '../components/validSingle.vue'
import timeline from '../components/timeline.vue'
import cardUser from '../components/cardUser.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'LayoutDefault',
  data: () => ({
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
      socket: state => state.socket.socket,
      load: state => state.validations.load,
      list: state => state.validations.list,
      info: state => state.socket.info
    })
  },
  methods: {
    ...mapActions({
      setMessage: 'socket/setMessage',
      connectSocket: 'socket/connect',
      getList: 'validations/list'
    }),
    async loadList () {
      if (this.load === false) {
        this.$q.loading.show({message: 'Carregando sua lista de email'})
        await this.getList().then(() => this.$q.loading.hide())
      }
    }
  },
  created () {
    this.loadList()
    this.connectSocket()

    this.socket.emit('setUser', this.user)
    this.socket.on('message', message => this.setMessage(message))
    this.socket.on('save', message => this.setMessage(message))
  }
}
</script>
