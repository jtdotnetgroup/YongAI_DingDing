<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>
<script>
import { GetAccessToken } from "@/api/Project";
import * as dd from "dingtalk-jsapi";
export default {
  name: "App",
  components: {
    Layout: () => import("./layout/layout")
  },
  computed: {},

  mounted() {
    // this.GetCode();
    let pars = { type: "contracting_unit" };
    const token = this.$store.state.asscesstoken;
    const userId = this.$store.state.userId;

    // if (!!token && !!userId) {
    //   this.$store.dispatch("GetCompaynList", pars);
    // } else {
    //   //alert('不存在token时')
    //   this.$store.dispatch("GetCode").then(() => {
    //     this.$store.dispatch("GetAccessTokenData").then(() => {
    // this.$store.dispatch("GetCompaynList", pars);

    //     });
    //   });
    // }
  },

  methods: {}
};
</script>

<style lang="stylus">
[class*=van-hairline]::after{
  border:none !important
}
</style>
