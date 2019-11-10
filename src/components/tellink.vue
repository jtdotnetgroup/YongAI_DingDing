<template>
    <a :href="'tel:'+tel" @click="(e)=>{e.stopPropagation()}">{{tel}}</a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'tellink',
  props: {
    tel: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="stylus" scoped>
    a{
        color #45c76d
        text-decoration-line underline
    }
</style>
