<template>
  <div>
    <div class="login-pic">
      <p-img data-image="./../statics/kong.png">
        <h1 slot="header">Gorilla Mail</h1>
            <!-- <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> -->
      </p-img>
    </div>
    <div class="login-html">

      <input id="tab-1" type="radio" value="signin"
        v-model="navigation" @change="navigate"
        name="tab" class="sign-in" checked>
      <label for="tab-1" class="tab">Entrar</label>

      <input id="tab-2" type="radio"  value="signup"
        v-model="navigation" @change="navigate"
        name="tab" class="sign-up">
      <label for="tab-2" class="tab">Registrar</label>

      <div class="login-form">
        <sign-in/>
        <sign-up/>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from './sign-in'
import SignUp from './sign-up'
import Recovery from './recovery'
import Parallax from '../../components/parallax'

export default {
  components: {
    SignIn,
    SignUp,
    Recovery,
    'p-img': Parallax
  },
  data: () => ({
    navigation: 'signin'
  }),
  methods: {
    navigate () {
      this.$root.$emit('navigate', this.navigation)
    }
  }
  // name: 'PageName',
}
</script>

<style scoped src="../../css/auth.styl"/>
