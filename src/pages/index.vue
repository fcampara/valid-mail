<template>
  <q-page padding style="min-height: calc(0vh - 55px)">
    <div v-if="isVerify">
      <upload-list/>
    </div>
    <div v-else>
      E-mail não verificado
    <!-- <q-btn @click="verifyEmail()" label="Enviar e-mail"/> -->
    </div>
  </q-page>
</template>
<script>

import uploadList from '../components/uploadList.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  data: () => ({
  }),
  components: {
    'upload-list': uploadList
  },
  computed: {
    ...mapGetters({
      user: 'auth/currentUser',
      isVerify: 'auth/verifyEmail'
    })
  },
  methods: {
  }
}
</script>
