<template>
  <div>
    <ImageSwipe />

    <van-button type="primary" @click="OnClick" size="mini">点击</van-button>

    <ProjectList />
  </div>
</template>

<script>


import { GetTest } from "@/api/Project";
import * as dd from 'dingtalk-jsapi'

export default {
  name: "Home",
  components: {
    ImageSwipe: () => import("./Components/ImageSwipe"),
    ProjectList: () => import("./Components/ProjectList")
  },
  data() {
    return {
      active: "",
      code:'',

    };
  },
  //一开始加载的函数
  created(){


  },
  methods: {
    OnClick() {
        // dd.ready(function() {
      
        dd.runtime.permission.requestAuthCode({
          corpId: this.$store.state.CorpId,
          onSuccess: function(result) {
            alert(JSON.stringify(result));
            // _this.OnSelect(result.code)
          },
          onFail: function(err) {
            alert("失败");
          }
        });

        // });
    }
    // OnSelect(code){

    //   var params={
    //      'code':code,
    //      'Content-Type':"text/plain;charset=UTF-8"
    //   }

    //   axios(params).then(res=>{
    //     alert(JSON.stringify(res))
    //   }).catch(err=>{
    //     alert(err)

    //   });
    // }
  }
};
</script>

<style  scoped>
</style>