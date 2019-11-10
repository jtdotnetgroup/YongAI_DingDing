<template>
  <div>
    <van-tabs v-model="active" type="card" animated swipeable>
      <van-tab title="未完成项目">
        <van-list id="projectList">
          <ProjectItem v-for="(item,index) in projectList" :key="index" :Project="item" />
        </van-list>
      </van-tab>
      <van-tab title="已完成项目">
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
import { GetProjectList } from "@/api/Project";
import { GetAccessToken } from "@/api/ddjsapi";


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
    this._LoadData();
    // this.GetProjectTypes();
  },
  methods: {
    GetProjectTypes(orgId) {
      const pars = { orgId: orgId };
      this.$store.dispatch("GetProjectTypes", pars);
    },

    async _LoadData() {
      let pars = { type: "contracting_unit" };
      await this.$store.dispatch("GetCompaynList", pars);
      // if ((!this.$store.state.asscesstoken || !this.$store.state.userId)) {
      //   //alert('不存在token时')
      //   this.$store.dispatch("GetCode").then(() => {
      //     this.$store.dispatch("GetAccessTokenDate").then(() => {
      //       this.GetData();
      //     });
      //   });
      // } else {
       this.GetData()
      // }
    },

    //显示加载动画
    ShoWloading() {
      this.loading = true;
    },
    //隐藏加载动画
    Hideloading() {
      this.loading = false;
    },

    GetData() {
      var _this = this;
      var params = {
        status: 1
      };
      GetProjectList(params)
        .then(res => {
          switch (res.data.body.code) {
            case "1":
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
          alert("错误:"+err)
          //console.log(err);
        })
        .finally(() => {
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
      const list = this.projects;

      const types = this.$store.state.project.projectTypes;

      switch (this.active) {
        case 0:
        case 1: {
          return this.projects.filter(e => {
            return e.status === this.active;
          });
          break;
        }
        default: {
          return this.projects;
          break;
        }
      }

      // if (this.active === 0) {
      //   return this.projects.filter(e => {
      //     return e.status === 0;
      //   });
      // } else {
      //   return this.projects;
      // }
    }
  }
};
</script>

<style scoped>
</style>