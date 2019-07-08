<template>
  <div>
    <van-tabs v-model="active" type="card" animated swipeable>
      <van-tab title="未完成项目">
        <van-list id="projectList">
          <!-- <div @click="ItemClick(item)" v-for="(item,index) in projectList" :key="index"> -->
          <ProjectItem v-for="(item,index) in projectList" :key="index" :Project="item" />
          <!-- </div> -->
        </van-list>
      </van-tab>
      <van-tab title="全部项目">
        <van-list id="projectList">
          <!-- <div @click="ItemClick(item)" 
          v-for="(item,index) in projectList" :key="index">-->
          <ProjectItem v-for="(item,index) in projectList" :key="index" :Project="item" />
          <!-- </div> -->
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { GetProjectList } from "@/api/Project";
import ProjectItem from "./ProjectItem";
import * as dd from "dingtalk-jsapi";
export default {
  name: "ProjectList",
  components: {
    ProjectItem
  },
  data() {
    return {
      active: 0,
      projects: []
    };
  },
  created() {
    this.$store.commit("pageNo", 1);

    this._LoadData();
  },
  methods: {
    _LoadData() {

        var _this = this;

        // alert("Token:"+_this.$store.state.asscesstoken+","+"userId:"+ _this.$store.state.userId);
    
      if (!(!!_this.$store.state.asscesstoken && !!_this.$store.state.userId)) {
        alert('不存在token时')
         _this.$store.dispatch("GetCode").then(() => {

         _this.GetData()

        });

      }else{
        alert('存在token时')
        _this.GetData()
      }
      
    },


    GetData(){
        var _this = this;
       var params = {
            status: 1
          };
          GetProjectList(params)
            .then(res => {
              switch (res.data.body.code) {
                case 1:
                  alert(res);
                  _this.DDApiAert(res);
                  _this.projects = res.data.body.contractList;
                  break;
                case 2:
                  _this.DDApiAert("请求的用户不存在");
                  break;
                case 3:
                  _this.DDApiAert("请求的用户禁用状态");
                  break;
                case 4:
                  _this.DDApiAert("为请求的钉钉的Token失效，重新登录");
                  break;

                default:
                  break;
              }
            })
            .catch(err => {
              alert(err)
              //console.log(err);
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
          return e.status === 2;
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