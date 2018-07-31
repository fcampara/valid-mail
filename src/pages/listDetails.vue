<template>
    <q-table :data="tableData" :columns="columns" :loading="loading" :title="tableName" :filter="filter"
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
import { mapGetters, mapState, mapActions } from 'vuex'
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
  created () {
    console.log(this.$router)
    console.log(this.$route)
    if (this.load) {
      this.buildTable()
    } else {
      this.getList()
    }
  },
  computed: {
    ...mapState({
      load: state => state.validations.load
    })
  },
  methods: {
    ...mapActions({
      getList: 'validations/list'
    }),
    ...mapGetters({
      listById: 'validations/selectById'
    }),
    buildTable () {
      const funct = this.listById()
      const list = funct(this.$route.params.id)
      this.$options.name = list.details.nameFile
      this.time = list.details.seconds
      this.buildColumns(list.valid.header)
      this.buildDataValid(list.valid.data)
      this.loading = false
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
