<template>
  <form class="sign-up-htm"  @keyup.prevent.enter="submit">
    <q-field :error="$v.username.$dirty && $v.username.$invalid" :error-label="msgErrorUsername">
      <q-input @input="$v.username.$touch()" clearable v-model="username" float-label="Nome completo"/>
    </q-field>

    <q-field :error="errorEmail" :error-label="msgErrorEmail">
      <q-input @input="$v.email.$touch()" clearable v-model="email" type="email" float-label="Email"/>
    </q-field>

    <q-field :error="$v.password.$dirty && $v.password.$invalid" :error-label="msgErrorPassword">
      <q-input @input="checkPassword" @clear="repeatPassword = ''" @blur="$v.repeatPassword.$touch()" clearable v-model="password" type="password" float-label="Senha"/>
    </q-field>

    <q-field :error="$v.repeatPassword.$dirty && $v.repeatPassword.$invalid" :error-label="msgErrorRepeatPassword">
      <q-input @input="$v.repeatPassword.$touch()" clearable v-model="repeatPassword" type="password" float-label="Confirmar senha"/>
    </q-field>

    <q-btn :loading="loading" @click="submit" class="full-width q-mt-xl" color="primary" label="Cadastrar"/>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { required, sameAs, email, minLength, requiredIf, helpers } from 'vuelidate/lib/validators'

const alpha = helpers.regex('alpha', /^[a-zA-Z\s\u00C0-\u00FF]*$/)
export default {
  name: 'singUp',
  data: () => ({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    loading: false,
    error: {
      type: 0,
      msg: ''
    }
  }),
  validations: {
    email: { required, email },
    username: { required, minLength: minLength(3), alpha },
    password: { required, minLength: minLength(6) },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
      required: requiredIf(function () {
        return this.password.length !== 0
      })}
  },
  mounted () {
    this.$root.$on('navigate', this.reset)
  },
  computed: {
    disabledRepeat () {
      return this.password.length === 0
    },
    msgErrorUsername () {
      if (!this.$v.username.required) return 'Campo obrigatório'
      if (!this.$v.username.minLength) return 'Mínimo 3 caracteres'
      if (!this.$v.username.alpha) return 'Permitido apenas letras'
    },
    errorEmail () {
      if (this.error.type === 1) return true
      return this.$v.email.$dirty && this.$v.email.$invalid
    },
    msgErrorEmail () {
      if (this.error.type === 1) return this.error.msg
      return !this.$v.email.required ? 'Campo obrigatório' : 'Email com formato incorreto'
    },
    msgErrorPassword () {
      return !this.$v.password.required ? 'Campo obrigatório' : 'Mínimo 6 caracteres'
    },
    msgErrorRepeatPassword () {
      return !this.$v.repeatPassword.required ? 'Campo obrigatório' : 'As senhas devem ser iguais'
    }
  },
  watch: {
    email () {
      if (this.error.type === 1) this.error.type = 0
    }
  },
  methods: {
    ...mapActions({
      'singUp': 'auth/signUpWithEmail'
    }),
    checkPassword () {
      this.$v.password.$touch()
      if (this.password.length === 0) this.repeatPassword = ''
    },
    submit () {
      if (!this.$v.$invalid) {
        this.loading = true
        const { email, password, username } = { ...this.$data }
        this.singUp({email, password, username}).then().catch(({error, type}) => {
          this.loading = false
          this.error.msg = error
          this.error.type = type
        })
      } else this.$v.$touch()
    },
    reset () {
      this.username = ''
      this.password = ''
      this.repeatPassword = ''
      this.email = ''
      this.$v.$reset()
    }
  }
}
</script>
