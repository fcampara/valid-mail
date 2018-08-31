<template>
  <div>
    <q-card class="no-shadow fixed-center">
      <q-item>
        <q-item-main>
          <q-input float-label="Digite seu email" value="asdfdsad"
            :after="[{icon: 'arrow_forward', handler () {console.log('oi')}}]"
          />
        </q-item-main>
      </q-item>
      <q-card-actions>
        <q-btn class="full-width" color="primary" icon="fas fa-sign-out-alt" label="Recuperar"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'recovery',
  data: () => ({}),
  mounted () {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>
  .login-wrap {
    width: 50%
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
    width: 80%;
    padding: 15vh;
  }
}
</style>
