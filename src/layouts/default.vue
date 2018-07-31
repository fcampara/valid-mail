<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn flat dense round aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{$route.name}}
        </q-toolbar-title>
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
      <router-view />
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
