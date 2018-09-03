<template>
  <div>
    <q-card class="no-shadow fixed-center">
      <q-item>
        <q-item-main>
          <q-input :loading="loading" float-label="Digite seu email" v-model="email" clearable
             @keyup.13="verifyEmail()"
            :after="[{icon: 'arrow_forward', content: !loading,  handler () {verifyEmail()}}]"
          />
        </q-item-main>
      </q-item>
      <q-card-actions>
        <q-btn :loading="loading" class="full-width" color="primary" icon="fas fa-sign-out-alt" label="Recuperar"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Alert } from './../../components/alert.js'
import { mapActions } from 'vuex'

export default {
  mixins: [Alert],
  name: 'recovery',
  data: () => ({
    email: '',
    loading: false
  }),
  methods: {
    ...mapActions({
      recovery: 'auth/recoveryPassword'
    }),
    verifyEmail () {
      this.loading = true
      this.recovery(this.email).then((resp) => {
        this.alertSuccess(`Link de recuperação foi enviado para ${this.email}`)
        setTimeout(() => {
          this.$router.go(-1)
        }, 1000)
      }).catch(({ error }) => {
        this.alertError(error)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    width: 50%;
    padding: 30vh;
  }

  @media (max-width: 992px) {
  .login-wrap {
    width: 40%;
    padding: 30vh;
  }
}

@media (max-width: 768px) {
  .login-wrap {
    width: 60%;
    padding: 20vh;
  }
}

@media (max-width: 576px) {
  .login-wrap {
    width: 90%;
    padding: 15vh;
  }
}
</style>
