<template>
    <q-table row-key="name" color="secondary"
      :data="tableData" :columns="columns" :filter="filter" :loading="loading"
    >
      <template slot="top-left" slot-scope="props">
        <q-search hide-underline color="secondary" v-model="filter" class="col-6"/>
      </template>
      <template slot="top-right" slot-scope="props">
        <q-btn flat round dense
          @click="props.toggleFullscreen"
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        />
      </template>
    </q-table>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'ListPage',
  data: () => ({
    options: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
      { label: 'Cell', value: 'cell' },
      { label: 'None', value: 'none' }
    ],
    tableData: [],
    columns: [
      { name: 'nameFile', label: 'Nome do arquivo', field: 'nameFile', align: 'left', sortable: true },
      { name: 'length', label: 'Quantidade', field: 'length', sortable: true },
      { name: 'valid', label: 'Válidos', field: 'valid', sortable: true },
      { name: 'invalid', label: 'Inválidos', field: 'invalid', sortable: true }
    ],
    filter: '',
    loading: true,
    separator: 'horizontal',
    visibleColumns: ['invalid', 'valid', 'length', 'nameFile']
  }),
  created () {
    if (this.load) {
      this.tableData = this.details()
      this.loading = false
    } else {
      this.getList()
    }
  },
  methods: {
    ...mapGetters({
      details: 'list/details'
    }),
    ...mapActions({
      getList: 'list/list'
    })
  },
  computed: {
    ...mapState({
      load: state => state.list.load
    })
  },
  watch: {
    load (newValue) {
      if (newValue === true) {
        this.tableData = this.details()
        this.loading = false
      }
    }
  }
}
</script>
