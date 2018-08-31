<template>
  <q-input :loading="loading" clearable @keyup.13="validSingle()" inverted-light color="purple-1" class="absolute-center input-single" align="center"
          v-model="email" :disable="!isVerify"
          :before="beforeIcon"
          :after="[{icon: 'arrow_forward', content: !loading,  handler () {validSingle()}}]"
          placeholder="Válidar email" type="email"/>
</template>

<script>
import { mapGetters } from 'vuex'
import { Alert } from '../components/alert.js'

export default {
  mixins: [Alert],
  name: 'valid-mail',
  data () {
    return {
      email: '',
      loading: false,
      beforeIcon: [{icon: 'mail', handler () {}}]
    }
  },
  computed: {
    ...mapGetters({
      isVerify: 'auth/verifyEmail'
    })
  },
  methods: {
    validSingle () {
      if (this.loading === false) {
        this.loading = true
        this.$axios.post('api/validation/single', {
          email: this.email
        }).then(response => {
          const {msg, valid} = response.data
          this.beforeIcon = valid ? [{icon: 'thumb_up', handler () {}}] : [{icon: 'thumb_down', handler () {}}]
          this.loading = false
          valid ? this.alertSuccess(msg) : this.alertError(msg)
        }).catch((error) => {
          this.beforeIcon = [{icon: 'thumb_down', handler () {}}]
          this.loading = false
          this.alertError(error.response.data.msg)
        })
      } else {
        this.alertError('Email incorreto')
      }
    }
  },
  watch: {
    email (newValue) {
      if (newValue.length === 0) this.beforeIcon = [{icon: 'mail', handler () {}}]
    }
  }
}
</script>

<style>
.input-single {
    width: 25%
  }
@media (max-width: 568px) {
  .input-single {
    width: 73%
  }
}
</style>
