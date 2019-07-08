<template>
  <div id="app">
    <layout />
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
  },

  methods: {
    //   //获取code 的方法
    // GetCode() {
    //   var _this = this;
    //   dd.ready(() => {
    //     dd.runtime.permission.requestAuthCode({
    //       corpId: this.$store.state.CorpId,
    //       onSuccess: function(result) {
            
    //         _this.$store.commit("SET_CODE", result.code); //赋值 把值存在 state
    //         _this.GetAccessTokenUserid();
    //       },
    //       onFail: function(err) {
    //         alert("失败");
    //       }
    //     });
    //   });
    // },

    //通过code的信息获取AccessTokenUser的信息
    // GetAccessTokenUserid() {
    //   var _this = this;
    //   GetAccessToken()
    //     .then(res => {
    //        alert("Token:"+res.data.body.accessToken+","+"userId:"+ res.data.body.userId);
    //       _this.$store.commit("SET_ASSCESSTOKEN".res.data.body.accessToken);
    //       _this.$store.commit("SET_USERID".res.data.body.userId);
    //     })
    //     .catch(err => {
    //       alert(err);
    //     });
    // }
  }
};
</script>

<style lang="stylus"></style>
