<template>
  <q-page padding>
    <q-uploader
      url="localhost:8000/list"
      @add="add"
      @remove:abort="removeAbort"
      @remove:cancel="removeCancel"
      @remove:done="removeDone"
      @uploaded="uploaded"
      @fail="fail"
      @start="start"
      @finish="finish"
    />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  data: () => ({
    url: '',
    result: {}
  }),
  methods: {
    add (files) {
      const csv = require('csvtojson/v2')
      const reader = new FileReader()
      reader.onload = e => {
        csv().fromString(e.target.result).then((jsonArray) => {
          this.result = jsonArray
        })
      }
      reader.readAsText(files[0])
    },
    removeAbort (file) {
      console.log('removeAbort: ', file)
    },
    removeCancel (file) {
      console.log('removeCancel: ', file)
    },
    removeDone (file) {
      console.log('removeDone: ', file)
    },
    uploaded (file, xhr) {
      console.log('uploaded file: ', file)
      console.log('uploaded xhr: ', xhr)
    },
    fail (file, xhr) {
      console.log('fail file: ', file)
      console.log('fail xhr: ', xhr)
    },
    start () {
      console.log('Start')
    },
    finish () {
      console.log('Finish')
    }
  },
  watch: {
    result (val) {
      console.log(val)
      this.$axios({
        method: 'POST',
        url: '/valid',
        data: {
          list: val
        } 
      }).then(response => {
        console.log(response)
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
