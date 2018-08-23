<template>
  <div>
    <q-card class="no-shadow" v-for="(n, index) in messages" :key="`${n.email}-${index}`">
      <q-item v-if="n.info">
        <q-item-side :color="color(n.info.sysValid)" :icon="icon(n.info.sysValid)"/>
        <q-item-main>
          <q-item-tile label class="ellipsis">{{n.email}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item v-if="n.save">
        <q-item-side :color="color(true)" :icon="icon(true)"/>
        <q-item-main>
          <q-item-tile label class="ellipsis">{{n.save}}</q-item-tile>
        </q-item-main>
      </q-item>
    </q-card>

    <div class="footer">
      <q-card class="no-shadow">
      <q-item>
        <q-item-side color="primary" icon="far fa-envelope"/>
        <q-item-main>
          <q-item-tile label class="ellipsis"> {{info.name}}</q-item-tile>
          <q-item-tile sublabel class="ellipsis">{{info.cont}} de {{info.length}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-card-actions align="around">
        <q-btn flat color="red" icon="fas fa-trash-alt" label="Limpar"/>
        <q-btn flat color="faded" icon="bookmark" label="Fixar Scroll"/>
      </q-card-actions>
      </q-card>
    </div>

  </div>
</template>

<script>
export default {
  name: 'timeline',
  props: ['messages', 'info'],
  data: () => ({
  }),
  computed: {
    color () { return sysValid => sysValid ? 'positive' : 'negative' },
    icon () { return sysValid => sysValid ? 'thumb_up' : 'thumb_down' }
  },
  methods: {
    teste () {

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
