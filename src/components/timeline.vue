<template>
  <div>
    <q-card class="no-shadow" v-for="(n, index) in messages" :key="`${n.email}-${index}`">
      <q-item v-if="n.info">
        <q-item-side :color="color(n.info.sysValid)" :icon="icon(n.info.sysValid)"/>
        <q-item-main>
          <q-item-tile class="ellipsis" label>{{n.email}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item v-if="n.save">
        <q-item-side :color="color(true)" :icon="icon(true)"/>
        <q-item-main>
          <q-item-tile label class="ellipsis">{{n.save}}</q-item-tile>
          <q-item-tile sublabel class="ellipsis">{{n.name}}</q-item-tile>
        </q-item-main>
      </q-item>
    </q-card>

    <div class="footer">
      <q-card class="no-shadow">
      <q-item v-if="info.name">
        <q-item-side color="primary" icon="far fa-envelope"/>
        <q-item-main>
          <q-item-tile label class="ellipsis"> {{info.name}}</q-item-tile>
          <q-item-tile sublabel class="ellipsis">{{info.cont}} de {{info.length}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-card-actions align="around">
        <q-btn @click="reset()" flat color="red" icon="fas fa-trash-alt" label="Limpar"/>
        <q-btn @click="pin()" flat color="faded" :icon="fixed ? 'fas fa-bookmark': 'far fa-bookmark' " label="Fixar Scroll"/>
      </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { scroll } from 'quasar'
import { mapState, mapActions } from 'vuex'

const { getScrollTarget, setScrollPosition } = scroll
export default {
  name: 'timeline',
  data: () => ({
    fixed: true
  }),
  computed: {
    ...mapState({
      messages: state => state.socket.messages,
      info: state => state.socket.info
    }),
    color () { return sysValid => sysValid ? 'positive' : 'negative' },
    icon () { return sysValid => sysValid ? 'thumb_up' : 'thumb_down' }
  },
  methods: {
    ...mapActions({
      reset: 'socket/resetMessages'
    }),
    scrollToElement (el) {
      if (this.fixed) {
        const target = getScrollTarget(el), offset = el.scrollHeight
        setScrollPosition(target, offset, 1000)
      }
    },
    pin () {
      if (this.fixed) {
        this.fixed = false
      } else {
        this.fixed = true
      }
    }
  },
  watch: {
    messages (newValue) {
      this.scrollToElement(document.getElementsByTagName('aside')[1])
    }
  }
}
</script>

<style>
.footer {
    position:static;
    bottom: 0;
}
</style>
