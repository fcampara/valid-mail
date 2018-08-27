<template>
    <q-table class="no-shadow" :data="tableData" :columns="columns" :loading="loading" :title="tableName" :filter="filter"
      :rows-per-page-options="[15,50,0]"
      row-key="name" color="secondary"
    >
      <template slot="top-left" slot-scope="props">
          <q-search v-model="filter"/>
      </template>
      <template slot="top-right" slot-scope="props">
          <q-chip detail icon="fa fa-clock">{{time}} segundos</q-chip>
      </template>
    </q-table>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'abcs',
  data: () => ({
    time: 0,
    filter: '',
    tableName: '',
    tableData: [],
    columns: [],
    loading: true
  }),
  mounted () {
    this.buildTable()
  },
  computed: {
    ...mapState({
      load: state => state.validations.load
    })
  },
  methods: {
    ...mapGetters({
      listById: 'validations/selectById'
    }),
    buildTable () {
      const funct = this.listById()
      const list = funct(this.$route.params.id)
      if (list) {
        this.$options.name = list.details.nameFile
        this.time = list.details.seconds
        this.buildColumns(list.valid.header)
        this.buildDataValid(list.valid.data)
        this.loading = false
      }
    },
    buildColumns (keys) {
      let col = []
      for (let o of keys) {
        col.push({ name: o, label: o, field: o, align: 'left', sortable: true })
      }
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
