<template>
  <q-layout view="hHh Lpr fFf">
    <q-layout-header>
      <q-toolbar color="deep-purple-5" style="height: 55px">
        <q-btn flat dense round aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>
        <img src="~assets/logo/kong.png" width="66px">

        <q-toolbar-title>
          Kong Mailer
          <span slot="subtitle">Header Subtitle</span>
        </q-toolbar-title>
        <q-input inverted-light color="purple-1" style="width: 300px" class="absolute-center" align="center" v-model="email" :before="[{icon: 'mail', handler () {}}]" placeholder="Válidar email" type="email"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list no-border link inset-delimiter >
        <q-list-header>Essential Links</q-list-header>

        <q-item :to="{ name: 'dashboard' }">
          <q-item-main>Dashboard</q-item-main>
        </q-item>

        <q-item :to="{ name: 'list' }">
          <q-item-main>List</q-item-main>
        </q-item>

        <q-item @click.native="signOut()">
          <q-item-main>Sign Out</q-item-main>
        </q-item>

      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Alert } from '../components/alert.js'
export default {
  mixins: [Alert],
  name: 'LayoutDefault',
  data () {
    return {
      email: '',
      heighHeader: 700,
      leftDrawerOpen: true
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('auth/signOut')
    }
  }
}
</script>

<style>
</style>
