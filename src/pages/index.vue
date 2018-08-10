<template>
  <q-page padding>
    <upload-list></upload-list>
  </q-page>
</template>
<script>

import uploadList from '../components/uploadList.vue'

export default {
  name: 'PageIndex',
  data: () => ({
  }),
  components: {
    'upload-list': uploadList
  },
  methods: {
  }
}
</script>
