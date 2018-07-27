<template>
  <q-page padding>
    <q-uploader url="http://localhost:5000/valid" @add="add"/>
    <q-input @blur="validSingle()" v-model="email"/>
  </q-page>
</template>
<script>

import { mapGetters } from 'vuex'
import { Alert } from '../components/alert.js'
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
      const
        csv = require('csvtojson/v2'),
        reader = new FileReader()

      this.file.name = files[0].name
      reader.readAsText(files[0])

      reader.onload = e => {
        csv().fromString(e.target.result).then((jsonArray) => {
          this.file.data = jsonArray
          this.upload()
        })
      }
    },
    upload () {
      this.$axios.post('api/validation/list', {
        user: this.user,
        name: this.file.name,
        list: this.file.data
      }).then(response => {
        this.alertSuccess(response.data.msg)
      }).catch((error) => {
        this.alertError(error.response.data)
      })
    }
  }
}
</script>
