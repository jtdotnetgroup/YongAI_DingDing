<template>
  <div>


  <van-search  v-model="TaskManagement" placeholder="请输入搜索关键词"  shape="round"  show-action   @search="onSearch"  @clear="OnClear">
   <div slot="action" @click="onSearch" >搜索</div>
</van-search>

    <van-tabs v-model="active" type="card" @click="onClickTab">
      <van-tab title="未完成任务">
         
        <van-list id="MissionList"  >
      

          <MissionItem v-for="(item,index) in MissionData" :key="index" :Mission="item" :MissionState="active" />
        </van-list>
      </van-tab>

      <van-tab title="我发起的任务">
        <van-list id="MissionList">
         
          <MissionItem v-for="(item,index) in MissionData" :key="index" :Mission="item" :MissionState="active"/>
        </van-list>
      </van-tab>

      <!-- <van-tab title="全部任务">
        <van-list id="MissionList">  
          <MissionItem v-for="(item,index) in MissionData" :key="index" :Mission="item" :MissionState="active"/>
        </van-list>
      </van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
import { GetMissionList } from "@/api/Mission";

export default {
  name: "MissionList",
  components: {
    MissionItem: () => import("./Components/MissionItem"),
   
  },
  data() {
    return {
      active: 0,
      MissionData: [],
      loading:true,
      TaskManagement:''

    };
  },

  mounted() {
    this._LoadData();
  },

  methods: {
    //任务管理列表
    _LoadData() {
      var _this = this;

        _this.MissionData=[]  
      var params = {
        status: _this.active
      };
      GetMissionList(params)
        .then(res => {
  
          switch (res.data.body.code) {
            case "1":     
           
              _this.MissionData = res.data.body.tasksList;
              console.log(res.data.body.tasksList)
           
              break;
            case "2":
             alert("请求的用户不存在");
              break;
            case "3":
            alert("请求的用户禁用状态");
              break;
            case "4":
             alert("为请求的钉钉的Token失效，重新登录");
              break;

            default:
              break;
          }

         
        })
        .catch(err => {
          console.log(err);
           _this.Hideloading()
        }).finally(()=>{
           _this.Hideloading()
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

    onSearch(){

      var _this=this

    

      if(!!_this.TaskManagement){
     const data= this.MissionData.filter(e=>{     

       if(!!e.contractName&&!!e.name&&!!e.stageName){
           if(e.contractName.indexOf(_this.TaskManagement)>=0||e.name.indexOf(_this.TaskManagement)>=0
        ||e.stageName.indexOf(_this.TaskManagement)>=0){
          return e;
         }
       } 
      }) 

      _this.MissionData=data
      }else{
        _this._LoadData()
      }
     
    },
    OnClear(){

       this._LoadData()

    },

    //点击标签触发的方法
    onClickTab(name, title) {

      this.MissionData=[]  
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

};
</script>

<style  scoped>

</style>