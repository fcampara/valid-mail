<template>
  <form class="sign-in-htm">
    <q-field :error="userError" :error-label="msgUserError">
      <q-input autofocus clearable @keyup.prevent.enter="submit" @input="$v.email.$touch()" v-model="email" type="email" float-label="Email"/>
    </q-field>

    <q-field :error="passError" :error-label="msgPassError">
      <q-input clearable @keyup.prevent.enter="submit" @input="$v.password.$touch()" v-model="password" type="password" float-label="Digite sua senha"/>
    </q-field>

    <q-btn :loading="loading.email" :disable="disable.email" @click="submit" class="full-width q-mt-md q-mb-xl" color="primary" label="Continuar"/>
    <q-btn :loading="loading.google" :disable="disable.google" icon="fab fa-google" class="full-width q-mt-xl google" label="Continuar com o Google" @click="loginSocial('google')"/>
    <q-btn :loading="loading.facebook" :disable="disable.facebook" icon="fab fa-facebook-f" class="full-width q-mt-sm facebook" label="Continuar com o Facebook" @click="loginSocial('facebook')"/>
    <div class="text-center p-t-12 q-mt-sm">
      <span class="txt1"> Esqueceu a </span>
      <a class="txt2" href="auth/recovery"> senha? </a>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'signIn',
  data: () => ({
    email: '',
    password: '',
    error: {
      type: 0,
      msg: ''
    },
    loading: {
      email: false,
      google: false,
      facebook: false
    },
    disable: {
      email: false,
      google: false,
      facebook: false
    }
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  mounted () {
    this.$root.$on('navigate', this.reset)
  },
  computed: {
    userError () {
      if (this.error.type === 1) return true
      return this.$v.email.$dirty && this.$v.email.$invalid
    },
    msgUserError () {
      if (this.error.type === 1) return this.error.msg
      return this.$v.email.required ? 'Email com formato incorreto' : 'Campo obrigatório'
    },
    passError () {
      if (this.error.type === 2) return true
      return this.$v.password.$dirty && this.$v.password.$invalid
    },
    msgPassError () {
      if (this.error.type === 2) return this.error.msg
      return !this.$v.password.required ? 'Campo obrigatório' : 'Mínimo 6 caracteres'
    }
  },
  watch: {
    email () {
      if (this.error.type === 1) {
        this.error.type = 0
      }
    },
    password () {
      if (this.error.type === 2) {
        this.error.type = 0
      }
    }
  },
  methods: {
    ...mapActions({
      signInWithEmail: 'auth/signInWithEmail',
      signInWithPopup: 'auth/signInWithPopup'
    }),
    submit () {
      !this.$v.$invalid ? this.signIn() : this.$v.$touch()
    },
    loginSocial (social) {
      this.loadingFunc(social)
      this.signInWithPopup(social).then().catch(() => {
        this.loadingFunc('clear')
      })
    },
    signIn () {
      this.loadingFunc('email')
      const { email, password } = { ...this.$data }
      this.signInWithEmail({ email, password }).then().catch(({error, type}) => {
        this.loadingFunc('clear')
        this.error.type = type
        this.error.msg = error
      })
    },
    loadingFunc (from) {
      switch (from) {
        case 'email':
          this.loading.email = true
          this.disable.google = true
          this.disable.facebook = true
          break

        case 'google':
          this.loading.google = true
          this.disable.facebook = true
          this.disable.email = true
          break

        case 'facebook':
          this.loading.facebook = true
          this.disable.google = true
          this.disable.email = true
          break

        case 'clear':
          this.loading = {
            email: false,
            google: false,
            facebook: false
          }

          this.disable = {
            email: false,
            google: false,
            facebook: false
          }
      }
    },
    reset () {
      this.email = ''
      this.password = ''
      this.error = {
        type: 0,
        msg: ''
      }
      this.$v.$reset()
    }
  }
}
</script>
