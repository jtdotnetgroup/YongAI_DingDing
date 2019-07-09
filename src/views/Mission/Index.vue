<template>
  <div>
    <van-tabs v-model="active" type="card" @click="onClickTab">
    
      <van-tab title="未完成任务">
         
        <van-list id="MissionList">
        
           <!-- <van-loading v-if="loading" class="loading" type="spinner" color="#1989fa" /> -->
          <MissionItem v-for="(item,index) in MissionData" :key="index" :Mission="item" />
        </van-list>
      </van-tab>

      <van-tab title="我发起的任务">
        <van-list id="MissionList">
          
          <MissionItem v-for="(item,index) in MissionData" :key="index" :Mission="item" />
        </van-list>
      </van-tab>

      <van-tab title="全部任务">
        <van-list id="MissionList">
          
          <MissionItem v-for="(item,index) in MissionData" :key="index" :Mission="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { GetMissionList } from "@/api/Mission";
import MissionEditVue from "./Components/MissionEdit.vue";

export default {
  name: "MissionList",
  components: {
    MissionItem: () => import("./Components/MissionItem")
  },
  data() {
    return {
      active: 0,
      MissionData: [],
      loading:true
    };
  },

  mounted() {
    this._LoadData();
  },

  methods: {
    //任务管理列表
    _LoadData() {
      var _this = this;

      // _this.$store.commit(
      //   "SET_ASSCESSTOKEN",
      //   "96fdf7e0d88f379e8989d8d1f0666af8"
      // );
      // _this.$store.commit("SET_USERID", "180623424221394323");
      // _this.$store.commit("SET_PAGENO", 1); //页码

      console.log(_this.active);
      var params = {
        status: _this.active
      };
      GetMissionList(params)
        .then(res => {
          switch (res.data.body.code) {
            case "1":
              console.log(res.data.body.tasksList);
              _this.MissionData = res.data.body.tasksList;
              _this.Hideloading()
              break;
            case "2":
             // _this.DDApiAert("请求的用户不存在");
              break;
            case "3":
            //  _this.DDApiAert("请求的用户禁用状态");
              break;
            case "4":
             // _this.DDApiAert("为请求的钉钉的Token失效，重新登录");
              break;

            default:
              break;
          }

          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    //显示加载动画
    ShoWloading(){
       this.loading=true
    },
    //隐藏加载动画
    Hideloading(){
       this.loading=false
    },

    //点击标签触发的方法
    onClickTab(name, title) {
      switch (title) {
        case "未完成任务":
         this.ShoWloading()
         this._LoadData()
          break;
        case "我发起的任务":
          this.ShoWloading()
          this._LoadData()

          break;
        case "全部任务":
          this.ShoWloading()
          this._LoadData()

          break;

        default:
          break;
      }
    }
  }

  // computed: {
  //   MissionList() {
  //     if (this.active === 0) {
  //       return this.MissionData.filter(e => {
  //         return !e.finish;
  //       });
  //     } else if(this.active===1) {
  //       return this.MissionData.filter(e=>{
  //         return e.delegating
  //       })
  //     }else{
  //       return  this.MissionData;
  //     }
  //   }
  // }
};
</script>

<style  scoped>
.loading{

  text-align: center;
  position: relative;
    top: 170px;
   
    z-index: 999;

}


</style>