<template>
  <div id="app">
    <layout/>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    Layout:()=>import('./layout/layout')
  },
  computed: {}
};
</script>

<style lang="stylus">

</style>
