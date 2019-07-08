<template>
  <div>
    <ImageSwipe />

    <van-button type="primary" @click="OnClick" size="mini">点击</van-button>

    <ProjectList />
  </div>
</template>

<script>


import { GetAccessToken } from "@/api/Project";
import * as dd from 'dingtalk-jsapi'
import alert$ from 'dingtalk-jsapi/api/device/notification/alert';

export default {
  name: "Home",
  components: {
    ImageSwipe: () => import("./Components/ImageSwipe"),
    ProjectList: () => import("./Components/ProjectList")
  },
  data() {
    return {
      active: "",
   
    };
  },
  //一开始加载的函数
  created(){

  // this.$store.commit('pageNo',1)
 
  // this.GetCode()

  },


  methods: {

  //   //获取code 的方法
  //  GetCode(){
  //    var _this=this
  //       dd.runtime.permission.requestAuthCode({
  //         corpId: this.$store.state.CorpId,
  //         onSuccess: function(result) {      
  //          _this.$store.commit('SET_CODE',result.code) //赋值 把值存在 state         
  //          _this.GetAccessTokenUserid();
  //         },          
  //         onFail: function(err) {
  //           alert("失败");
  //         }
  //       });
     
  //  },



  //  //通过code的信息获取AccessTokenUser的信息
  //  GetAccessTokenUserid(){
  //    var _this=this
  //     GetAccessToken().then(res => {  
  //       alert$(res)
  //      _this.$store.commit('SET_ASSCESSTOKEN'.res.data.body.accessToken)
  //      _this.$store.commit('SET_USERID'.res.data.body.userId)
  //       })
  //       .catch(err => {
  //         alert(err)
  //       })
  //  },




    OnClick() {
        dd.runtime.permission.requestAuthCode({
          corpId: this.$store.state.CorpId,
          onSuccess: function(result) {
            alert(JSON.stringify(result));
            // _this.OnSelect(result.code)
            this.GetCode()
          },
          onFail: function(err) {
            alert("失败");
          }
        });
    }
  }
};
</script>

<style  scoped>
</style>