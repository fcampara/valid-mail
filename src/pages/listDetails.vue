<template>
    <q-table :data="tableData" :columns="columns" :loading="loading"
      row-key="name" color="secondary"
    >
      <template slot="top-selection" slot-scope="props">
        <q-btn color="secondary" flat label="Action 1" class="q-mr-sm" />
        <q-btn color="secondary" flat label="Action 2" />
        <div class="col"/>
        <q-btn color="negative" flat round delete icon="delete" @click="deleteRow" />
      </template>
    </q-table>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'ListDetails',
  data: () => ({
    tableData: [],
    columns: [],
    loading: true
  }),
  created () {
    if (this.load) {
      this.buildTable()
    } else {
      this.getList()
    }
  },
  computed: {
    ...mapState({
      load: state => state.list.load
    })
  },
  methods: {
    ...mapActions({
      getList: 'list/list'
    }),
    ...mapGetters({
      listById: 'list/selectById'
    }),
    buildTable () {
      const funct = this.listById()
      const list = funct(this.$route.params.id)
      this.buildColumns(list.details.keys)
      this.buildDataValid(list.valid)
      this.loading = false
    },
    buildColumns (keys) {
      let col = []
      for (let o of keys) col.push({ name: o, label: o, field: o, align: 'left', sortable: true })
      this.columns = col
    },
    buildDataValid (data) {
      this.tableData = data
    }
  },
  watch: {
    load (newValue) {
      if (newValue === true) {
        this.buildTable()
      }
    }
  }
}
</script>
