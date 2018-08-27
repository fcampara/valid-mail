<template>
    <div>
      <q-dialog v-model="optDownload.show"  @ok="download">
        <span slot="title">Download</span>
        <span slot="message">Escolhe o nome e a extensão</span>
        <div slot="body">
          <q-input v-model="optDownload.name" float-label="Nome do arquivo"/>

          <p class="caption q-mt-lg">Tipo do arquivo</p>
          <q-radio v-model="optDownload.type" val="csv" color="primary" label="CSV" />
          <q-radio v-model="optDownload.type" val="xlsx" color="primary" label="XLSX" class="q-ml-xl q-mb-sm"/>
        </div>

         <template slot="buttons" slot-scope="props">
          <q-btn color="primary" label="Download" @click="props.ok" />
          <q-btn flat label="Cancelar" @click="props.cancel" />
        </template>
      </q-dialog>

      <q-table class="no-shadow" :data="this.details()" :columns="columns" row-key="name" :filter="filter"
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
              <q-btn flat color="primary" v-close-overlay @click="optDownload.show = true">
                <q-icon name="fa fa-download"/>
              </q-btn>
              <q-btn flat color="info" v-close-overlay @click="open()">
                <q-icon name="fa fa-search"/>
              </q-btn>
            </div>
          </q-popover>
        </q-tr>
      </q-table>
    </div>
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
    optDownload: {
      show: false,
      name: '',
      type: 'csv'
    },
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
  computed: {
    fileNameExt () {
      const name = this.optDownload.name ? this.optDownload.name : `lista_validada_${Date.now()}`
      return `${name}.${this.optDownload.type}`
    }
  },
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
      console.log(row)
      let wb = XLSX.utils.book_new()
      wb.Props = {
        Title: this.optDownload.name,
        Subject: '',
        Author: 'Kong Mailler',
        CreatedDate: row.details.CreatedAt
      }
      wb.SheetNames.push(this.optDownload.name)
      const ws = XLSX.utils.json_to_sheet(row.valid.data)
      wb.Sheets[this.optDownload.name] = ws

      const wbout = XLSX.write(wb, {bookType: this.optDownload.type, type: 'binary'})

      const FileSaver = require('file-saver')
      FileSaver.saveAs(new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'}), this.fileNameExt)
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
