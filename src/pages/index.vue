<template>
  <q-page padding>
    <q-uploader url="http://localhost:5000/valid" @add="add"/>
    <q-input @blur="validSingle()" v-model="email"/>

    <q-dialog v-model="dialog" prevent-close
        @cancel="onCancel" @ok="onOk"
      >
        <span slot="title" class="q-title">Esse cabeçalho é válido?</span>

        <div slot="body" class="q-body-2">
          <div v-for="(header, index) in file.data[0]" :key="index">
            <span>{{header}}</span>
          </div>

        </div>

        <template slot="buttons" slot-scope="props">
          <q-btn flat label="Gerar automáticamente" @click="props.cancel"/>
          <q-btn flat label="Sim" @click="props.ok"/>
        </template>
      </q-dialog>
  </q-page>
</template>
<script>

import { mapGetters } from 'vuex'
import { Alert } from '../components/alert.js'
import XLSX from 'xlsx'
/*
Function on components alerts.js:
alertError, alertSucess

Function on components globalFunctions.js:
*/
export default {
  mixins: [Alert],
  name: 'PageIndex',
  data: () => ({
    email: '',
    dialog: false,
    file: {
      name: '',
      data: '',
      header: []
    }
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    validSingle () {
      this.$axios.post('api/validation/single', {
        email: this.email
      }).then(response => {
        const {msg, valid} = response.data
        valid ? this.alertSuccess(msg) : this.alertError(msg)
      }).catch((error) => {
        this.alertError(error.response.data.msg)
      })
    },
    add (files) {
      const reader = new FileReader()
      this.file.name = files[0].name
      reader.readAsArrayBuffer(files[0])

      reader.onload = e => {
        const data = new Uint8Array(reader.result)
        const wb = XLSX.read(data, {type: 'array'})
        const firstWorksheet = wb.Sheets[wb.SheetNames[0]]
        this.file.data = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 })
        this.dialog = true
      }
    },
    upload () {
      console.log(this.file)
      this.$axios.post('api/validation/list', {
        user: this.user,
        file: this.file
      }).then(response => {
        this.alertSuccess(response.data.msg)
      }).catch((error) => {
        console.log(error.response)
        this.alertError(error.response.data.msg)
      })
      this.clear()
    },
    onOk () {
      this.file.header = this.file.data[0]
      this.file.data.shift()
      this.upload()
    },
    onCancel () {
      const length = this.file.data[0].length
      for (let i = 0; i < length; i++) this.file.header.push(`cabeçalho${i + 1}`)
      this.upload()
    },
    clear () {
      this.file = {
        name: '',
        data: '',
        header: []
      }
    }
  }
}
</script>
