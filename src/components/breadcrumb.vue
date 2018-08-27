<template>
    <q-breadcrumbs class="q-ma-sm">
    <q-breadcrumbs-el v-for="({ name, icon, link }, index) in breadcrumbList" :key="index"
    :label="name" :icon="icon" :to="link"
    />
  </q-breadcrumbs>
    <!-- <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" /> -->
</template>

<script>
export default {
  name: 'Breadcrumb',
  data: () => ({
    breadcrumbList: []
  }),
  mounted () { this.breadcrumbList = this.$route.meta.breadcrumb },
  watch: {
    '$route' () { this.breadcrumbList = this.$route.meta.breadcrumb }
  }
}
</script>

<style>
</style>
