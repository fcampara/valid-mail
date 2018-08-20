<template>
  <form class="sign-in-htm">
    <q-field :error="userError" :error-label="msgUserError">
      <q-input @keyup.enter="submit" @input="$v.email.$touch()" v-model="email" type="email" float-label="Email"/>
    </q-field>

    <q-field :error="passError" :error-label="msgPassError">
      <q-input @keyup.enter="submit" @input="$v.password.$touch()" v-model="password" type="password" float-label="Digite sua senha"/>
    </q-field>

    <q-btn :loading="loading.email" class="full-width q-mt-md q-mb-xl" color="primary" label="Continuar" @click="submit"/>
    <q-btn :loading="loading.google" icon="fab fa-google" class="full-width q-mt-xl google" label="Continuar com o Google" @click="loginSocial('google')"/>
    <q-btn :loading="loading.facebook" icon="fab fa-facebook-f" class="full-width q-mt-sm facebook" label="Continuar com o Facebook" @click="loginSocial('facebook')"/>
</form>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  mounted () {
    // this.$bus.$on('navigate', this.reset)
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  data () {
    return {
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
      }
    }
  },
  computed: {
    userError () {
      if (this.error.type === 1) return true
      return this.$v.email.$dirty && this.$v.email.$invalid
    },
    msgUserError () {
      if (this.error.type === 1) return this.error.msg
      return this.$v.email.required ? 'Campo obrigatório' : 'Email com formato incorreto'
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
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.signIn()
      } else {
        this.$v.$touch()
      }
    },
    loginSocial (social) {
      this.loading[social] = true
      this.signInWithPopup(social).then(() => {
        console.log(social)
        this.loading[social] = false
      }).catch((error) => {
        console.log(error)
        this.loading[social] = false
      })
    },
    reset (selected) {
      if (selected === 'signup') {
        this.email = ''
        this.password = ''
        this.keepSignedIn = true
        this.$v.$reset()
      }
    },
    signIn () {
      this.loading.email = true
      this.signInWithEmail({
        email: this.email,
        password: this.password
      }).then(() => {
        this.loading.email = false
      }).catch(({error, type}) => {
        this.loading.email = false
        this.error.type = type
        this.error.msg = error
      })
    }
  }
}
</script>
