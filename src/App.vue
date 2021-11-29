<template>
  <div id="app">
    <div id="nav">
      <router-link :to="`/company/${$route.params.company_id}`">Home</router-link> |
      <router-link :to="`/company/${$route.params.company_id}/about`">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){

  }
}
</script>

<style lang="less">
@import './../node_modules/@gofynd/nitrozen-vue/dist/nitrozen.css';

</style>
