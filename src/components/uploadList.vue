<template>
  <div>
    <file-pond
      ref="pond"
      class-name="my-pond"
      label-idle="Solte seu arquivo aqui ou clique para buscar"
      labelFileTypeNotAllowed="Arquivo inválido"
      fileValidateTypeLabelExpectedTypes="Apenas é permitidos arquivos com extensão .xlsx .csv"
      labelMaxFileSizeExceeded="Arquivo muito grande"
      labelMaxFileSize="Tamanho máximo é de {filesize}"
      allow-multiple="false"
      max-files="1"
      @addfile="CSVImport"
      maxFileSize="950KB"
      :accepted-file-types="typesFile"
    />

    <q-dialog v-model="dialog" @cancel="onCancel" @ok="onOk">
      <span slot="title" class="q-title">Esse cabeçalho é válido?</span>
      <span slot="message"></span>
      <div slot="body" class="q-body-2">
        <div v-for="(header, index) in file.data[0]" :key="index">
          <span>{{header}}</span>
        </div>
      </div>
      <template slot="buttons" slot-scope="props">
        <q-btn flat label="Gerar automáticamente" @click="choose(props.ok, 0)"/>
        <q-btn flat label="Sim" @click="choose(props.ok, 1)"/>
        <q-btn flat label="Cancelar" @click="props.cancel"/>
      </template>
    </q-dialog>
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import { Alert } from '../components/alert.js'
import { mapGetters } from 'vuex'
import XLSX from 'xlsx'

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginFileValidateSize)

export default {
  mixins: [Alert],
  name: 'upload-list',
  data () {
    return {
      typesFile: 'application/excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      message: '',
      dialog: false,
      file: {
        name: '',
        data: '',
        header: []
      }
    }
  },
  components: {
    FilePond
  },
  computed: {
    ...mapGetters({
      user: 'auth/currentUser'
    })
  },
  methods: {
    CSVImport (error, {file}) {
      if (error) {
        this.alertError('Ocorreu um erro, porfavor tente novamente')
        return
      }
      if (file) {
        const reader = new FileReader()
        this.file.name = file.name
        reader.readAsArrayBuffer(file)

        reader.onload = e => {
          const data = new Uint8Array(reader.result)
          const wb = XLSX.read(data, {type: 'array'})
          const firstWorksheet = wb.Sheets[wb.SheetNames[0]]
          this.file.data = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 })
          this.dialog = true
        }
      }
    },
    async choose (okFn, opt) {
      switch (opt) {
        case 0:
          this.file.header = this.file.data[0]
          this.file.data.shift()
          await okFn()
          break

        case 1:
          const length = this.file.data[0].length
          for (let i = 0; i < length; i++) this.file.header.push(`cabeçalho${i + 1}`)
          await okFn()
          break
      }
    },
    onOk () {
      this.upload()
    },
    onCancel () {},
    upload () {
      const { photoURL, ...args } = {...this.user}
      this.$axios.post('api/validation/list', {
        user: args,
        file: this.file
      }).then(response => {
        this.alertSuccess(response.data.msg)
      }).catch((error) => {
        this.alertError(error.response.data.msg)
      })
    }
  }
}
</script>

<style>
</style>
