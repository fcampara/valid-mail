<template>
  <q-card class="no-shadow">
      <q-item>
        <q-item-side :avatar="user.photoURL" />
        <q-item-main>
          <q-item-tile label>{{user.displayName}}</q-item-tile>
          <q-item-tile sublabel>{{user.email}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-card-actions>
        <!-- <q-btn icon="fas fa-cogs" label="Configuração" flat/> -->
        <q-btn @click="signOut" class="full-width" icon="fas fa-sign-out-alt" label="Sair" flat/>
      </q-card-actions>
    </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'cardUser',
  data: () => ({
    teste: ''
  }),
  computed: {
    ...mapGetters({
      user: 'auth/currentUser'
    })
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut'
    })
  }
}
</script>

<style>
</style>
