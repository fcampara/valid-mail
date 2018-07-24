<template>
  <q-page padding>
    <q-uploader url="http://localhost:5000/valid" @add="add"/>

  <!-- <FilePond
    ref="pond"
    class-name="my-pond"
    label-idle="Solte seu arquivo aqui ou clique para buscar"
    allow-multiple="false"
    acceptedFileTypes="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    labelFileTypeNotAllowed="Arquivo inválido"
    @addfile="add"
  /> -->

  </q-page>

</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
const FilePond = vueFilePond(FilePondPluginFileValidateType)

export default {
  name: 'PageIndex',

  data: () => ({
    url: '',
    file: {
      name: '',
      data: ''
    }
  }),
  components: {
    FilePond
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
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
      if (this.file.data) {
        this.$axios({
          method: 'POST',
          url: 'http://localhost:5000/valid',
          // url: 'http://valid-mail.herokuapp.com/valid',
          data: {
            user: this.user,
            name: this.file.name,
            list: this.file.data
          }
        }).then(response => {
          console.log(response)
        }).catch(err => {
          console.error(err)
        })
      } else {
        console.log('error')
      }
    }
  }
}
</script>
