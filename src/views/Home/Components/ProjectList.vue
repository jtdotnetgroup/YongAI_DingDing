<template>
  <div>
    <van-tabs v-model="active" type="card" animated swipeable>
      <van-tab title="未完成项目">
   
        <van-list id="projectList">
        

          <ProjectItem v-for="(item,index) in projectList" :key="index" :Project="item" />
        </van-list>
      </van-tab>
      <van-tab title="全部项目">
        <van-list id="projectList">
          <ProjectItem v-for="(item,index) in projectList" :key="index" :Project="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { GetProjectList} from "@/api/Project";
import {GetAccessToken} from "@/api/ddjsapi";

import ProjectItem from "./ProjectItem";
import * as dd from "dingtalk-jsapi";
export default {
  name: "ProjectList",
  components: {
    ProjectItem, 
  },
  data() {
    return {
      active: 0,
      projects: [],
      
    };
  },
  created() {
  

    this._LoadData();
  },
  methods: {
    _LoadData() {

        var _this = this;
      // 电脑端设置的不需要走手机端 
      // _this.$store.commit("SET_ASSCESSTOKEN", "af3e136e242e3f9db80df2661af577e1");
      // _this.$store.commit("SET_USERID", "180623424221394323");
      // _this.$store.commit("SET_PAGENO", 1);//页码
      // _this.$store.commit("SET_CODE", "");
      // _this.GetData()

      //     dd.ready(() => {
      //     dd.runtime.permission.requestAuthCode({
      //     corpId: _this.$store.state.CorpId,
      //     onSuccess: function (result) {
      //       //alert(result.code)
      //        _this.$store.commit("SET_CODE", result.code); //赋值 把值存在 state
      //       //获取token 的api
      //       // alert(result.code);
      //       GetAccessToken()
      //         .then(res => {
      //          // let { accessToken, userId } = res;
      //          _this.$store.commit("SET_ASSCESSTOKEN", res.data.body.accessToken);
      //          _this.$store.commit("SET_USERID", res.data.body.userId);
      //          _this.$store.commit("SET_PAGENO", "1");//页码
      //          _this.GetData()
      //         })
      //         .catch(err => {
      //          // alert(err);
      //          // reject()
      //       });
      //     },
      //     onFail: function (err) {
      //       alert(err);
      //     }
      //   });
      // });
    
      if (!(!!_this.$store.state.asscesstoken && !!_this.$store.state.userId)) {
           //alert('不存在token时')
           _this.$store.dispatch("GetCode").then(()=>{
             _this.$store.dispatch("GetAccessTokenDate").then(()=>{
                _this.GetData()
             })           
           })
      }else{
         //alert('存在token时')
         _this.GetData()
      }
      
    },

    //显示加载动画
    ShoWloading(){
       this.loading=true
    },
    //隐藏加载动画
    Hideloading(){
       this.loading=false
    },



    GetData(){

     // alert("先执行列表办法")
        var _this = this;

        var params = {
            status: 1
          };
          GetProjectList(params)
            .then(res => {

              switch (res.data.body.code) {
                case "1":
                  console.log(res)
                  //_this.DDApiAert(res);
                  //alert(JSON.stringify(res.data.body.contractList))
                  _this.projects = res.data.body.contractList;
                  break;
                case "2":
                  _this.DDApiAert("请求的用户不存在");
                  break;
                case "3":
                  _this.DDApiAert("请求的用户禁用状态");
                  break;
                case "4":
                  _this.DDApiAert("为请求的钉钉的Token失效，重新登录");
                  break;

                default:
                  break;
              }
             })
            .catch(err => {
              //alert("错误:"+err)
              //console.log(err);
            }).finally(()=>{
           //_this.Hideloading()
        });
    },



    //钉钉的提示接口
    DDApiAert(message) {
      dd.device.notification.alert({
        message: message,
        title: "提示", //可传空
        buttonName: "确定",
        onSuccess: function() {
          //onSuccess将在点击button之后回调
          /*回调*/
        },
        onFail: function(err) {}
      });
    }
  },

  
  computed: {
    projectList() {
      if (this.active === 0) {
        return this.projects.filter(e => {
          return e.status === 0;
        });
      } else {
        return this.projects;
      }
    }
  }
};
</script>

<style scoped>


</style>