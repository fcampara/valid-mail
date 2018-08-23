<template>
    <q-table :data="this.details()" :columns="columns" row-key="name" :filter="filter"
      :pagination.sync="paginationControl"
      :rows-per-page-options="[15,50,0]"
    >
      <template slot="top-left" slot-scope="props">
        <q-search v-model="filter"/>
      </template>

      <q-tr class="cursor-pointer" slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)">
        <q-td key="nameFile" :props="props">{{ props.row.nameFile }}</q-td>
        <q-td key="createdAt" :props="props">{{ convertTimeStamp(props.row.createdAt) }}</q-td>
        <q-td key="length" :props="props">{{ props.row.length }}</q-td>
        <q-td key="valid" :props="props">{{ props.row.valid }}</q-td>
        <q-td key="invalid" :props="props">{{ props.row.invalid }}</q-td>
        <q-popover touch-position>
          <div class="group" style="text-align: center;">
            <q-btn flat color="negative" v-close-overlay @click="remove()">
              <q-icon name="fas fa-trash-alt"/>
            </q-btn>
            <q-btn flat color="primary" v-close-overlay @click="download()">
              <q-icon name="fa fa-download"/>
            </q-btn>
            <q-btn flat color="info" v-close-overlay @click="open()">
              <q-icon name="fa fa-search"/>
            </q-btn>
          </div>
        </q-popover>
      </q-tr>
    </q-table>
</template>
<script>

import XLSX from 'xlsx'
import { date } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import { Alert } from '../components/alert'

export default {
  mixins: [Alert],
  name: 'ListPage',
  data: () => ({
    paginationControl: { rowsPerPage: 15, page: 1 },
    columns: [
      { name: 'nameFile', label: '', field: 'nameFile', align: 'left', sortable: true },
      { name: 'createdAt', label: 'Válidado em', field: 'length', sortable: true },
      { name: 'length', label: 'Quantidade', field: 'length', sortable: true },
      { name: 'valid', label: 'Válidos', field: 'valid', sortable: true },
      { name: 'invalid', label: 'Inválidos', field: 'invalid', sortable: true }
    ],
    filter: '',
    rowClicked: ''
  }),
  methods: {
    ...mapGetters({
      details: 'validations/details',
      listById: 'validations/selectById'
    }),
    ...mapActions({
      putList: 'validations/put'
    }),
    convertTimeStamp (timeStamp) {
      return date.formatDate(timeStamp, 'DD/MM/YY [ás] HH:mm')
    },
    rowClick (row) {
      this.rowClicked = row.id
    },
    async remove () {
      await this.putList(this.rowClicked).then(resp => {
        this.alertSuccess(resp)
      }).catch(() => {
        this.alertError('Ocorreu um erro, já já iremos corrigir')
      })
    },
    download () {
      const funct = this.listById()
      const row = funct(this.rowClicked)
      let wb = XLSX.utils.book_new()
      wb.Props = {
        Title: 'Teste',
        Subject: 'Teste 2',
        Author: 'Kong Mailler',
        CreatedDate: new Date(2017, 12, 19)
      }
      wb.SheetNames.push('Teste Sheets')
      const ws = XLSX.utils.json_to_sheet(row.valid.data)
      wb.Sheets['Teste Sheets'] = ws

      const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'})

      const FileSaver = require('file-saver')
      FileSaver.saveAs(new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'}), 'test.xlsx')
    },
    s2ab (s) {
      let buf = new ArrayBuffer(s.length)
      let view = new Uint8Array(buf)
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
      return buf
    },
    open () {
      const funct = this.listById()
      const row = funct(this.rowClicked)
      this.$router.push({ path: `/list/${row.id}` })
    }
  }
}
</script>
