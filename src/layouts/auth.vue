<template>
  <div class="limiter">
    <div class="container">
      <div class="login-wrap shadow-24">
        <div class="login-pic">
          <p-img data-image="../assets/logo/kong.png">
            <h1 slot="header">Gorilla Mail</h1>
            <!-- <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> -->
          </p-img>
        </div>
        <div class="login-html">

        <input id="tab-1" type="radio" value="signin"
          v-model="navigation" @change="navigate"
          name="tab" class="sign-in" checked>
        <label for="tab-1" class="tab">Sign In</label>

        <input id="tab-2" type="radio"  value="signup"
          v-model="navigation" @change="navigate"
          name="tab" class="sign-up">
        <label for="tab-2" class="tab">Sign Up</label>

        <div class="login-form">
          <sign-in/>
          <sign-up/>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from '../pages/auth/sign-in'
import SignUp from '../pages/auth/sign-up'
import Parallax from '../components/parallax'
import { mapActions } from 'vuex'
export default {
  components: {
    SignIn,
    SignUp,
    'p-img': Parallax
  },
  data () {
    return {
      navigation: 'signin',
      loading: {
        email: false,
        google: false,
        facebook: false
      }
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    navigate () {
      // this.$bus.$emit("navigate", this.navigation)
    },
    doSignUp (obj) {
      // fingir que há uma chamada AJAX
      window.console.log(obj)
    }
  },
  watch: {
    navigation (newValue) {
      console.log(newValue)
    }
  }
}
</script>

<style src="../css/auth.styl">

</style>
