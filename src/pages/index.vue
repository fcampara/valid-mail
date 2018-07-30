<template>
  <q-page padding>
    <q-uploader url="http://localhost:5000/valid" @add="add"/>
    <q-input @blur="validSingle()" v-model="email"/>
  </q-page>
</template>
<script>

import { mapGetters } from 'vuex'
import { Alert } from '../components/alert.js'
import XLSX from 'xlsx'
export default {
  mixins: [Alert],
  name: 'PageIndex',
  data: () => ({
    email: '',
    url: '',
    error: {},
    file: {
      name: '',
      data: ''
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
      console.log(XLSX)
      const reader = new FileReader()
      this.file.name = files[0].name
      reader.readAsText(files[0])

      reader.onload = e => {
        const data = e.target.result
        const workbook = XLSX.read(data, {type: 'binary'})
        const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]]
        const data2 = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 })
        console.log(data2)
      }
    },
    upload () {
      console.log(this.file.data)
      // this.$axios.post('api/validation/list', {
      //   user: this.user,
      //   name: this.file.name,
      //   list: this.file.data
      // }).then(response => {
      //   this.alertSuccess(response.data.msg)
      // }).catch((error) => {
      //   this.alertError(error.response.data)
      // })
    }
  }
}
</script>
