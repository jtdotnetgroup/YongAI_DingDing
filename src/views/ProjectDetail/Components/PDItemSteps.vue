<template>
  <van-steps direction="vertical" :active="0" active-color="black">
    <template v-for="(item,index) in FlowDatas">
      <van-step :key="index" >
        <van-row class="vanrow">
          <van-col span="24">

            <template v-if="!!item.tasksList">
             <span  style="color:red">{{item.conStage.name}}</span>
            </template>
             <template v-else>
             <span  >{{item.conStage.name}}</span>
            </template>
            
          </van-col>
        </van-row>
        <van-row class="vanrow">

           <template v-if="!!item.tasksList">
          <van-col span="5">时间计划</van-col>
          <van-col span="6" class="vanstepcontent">{{item.endTime}}</van-col>
          
        
            <van-col span="2">
            <van-icon class="iconcolor" color="red" name="underway"/>
          </van-col>
          <van-col span="8">
            <span style="color:red">还有{{datedifference(item.endTime,new Date())}}天到期</span>
          </van-col>
          <van-col span="1">
            <van-icon class="iconcolor" color="red" name="warning-o"/>
          </van-col>

          </template>

           <template v-else>

         <van-row class="vanrow">
          <van-col span="6">时间计划</van-col>
          <van-col span="10" class="vanstepcontent">{{item.endTime}}</van-col>
          <van-col span="6">
            <van-icon class="iconcolor" color="green" name="passed"/>
          </van-col>
        </van-row>
     

            
           </template>
          
          
        </van-row>
        <van-row>

          <div v-if="!!item.tasksList"> 
            <van-col span="6">项目任务:</van-col>
             <van-col span="18">
          
              <div class="container"  >
                <div :key="index" v-for="(items,index) in item.tasksList" >           
                    <div class="divtext"  @click="OnClick(items)">
                      {{items.name}}            
                    </div>              
                </div>
              </div>

          </van-col>
            
          </div> 
          
        </van-row>
      </van-step>



      <!-- <van-step v-else :key="index">
        <van-row class="vanrow">
          <van-col span="24">{{item.conStage.name}}</van-col>
        </van-row>
        <van-row class="vanrow">
          <van-col span="6">时间计划</van-col>
          <van-col span="10" class="vanstepcontent">{{item.endTime}}</van-col>
          <van-col span="6">
            <van-icon class="iconcolor" color="green" name="passed"/>
          </van-col>
        </van-row>
      </van-step> -->

    </template>
  </van-steps>
</template>

<script>


import { GetStageList} from "@/api/Project";

export default {
  data() {
    return {
      FlowDatas:[]
    };
  },

  created(){

    this._LoadData();
  },

  methods: {
    //计算天数
    datedifference(sDate1, sDate2) {
      //sDate1和sDate2是2006-12-18格式
       
       if(!!sDate1){
          var dateSpan, tempDate, iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays;

       }
     return 0;
    },
    OnClick(item) {
      this.$router.push({
        name: "MissionEdit",
        params: {
          Mission: item
        }
      });
    },

    //加载的方法
    _LoadData(){

      var _this=this  
      var params={
        contractId:_this.$store.state.project.activeProject.id
      }
      
      GetStageList(params)
            .then(res => {

               switch (res.data.body.code) {
                case "1":
                 
                  //_this.DDApiAert(res);
                  console.log(res.data.body.stageTaskList)
                  _this.FlowDatas = res.data.body.stageTaskList;
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
              alert(err)
              //console.log(err);
            });

    }


  },
  computed: {
    // FlowDatas: {
    //   get() {
    //     if (!!this.$store.state.project.activeProject.stageDetails) {
    //       return this.$store.state.project.activeProject.stageDetails;
    //     }
    //     let project = JSON.parse(sessionStorage.getItem("activeProject"));
    //     this.$store.commit("SET_ACTIVEPROJECT", project);//赋值 把值存在 state
    //     return project.stageDetails;
    //   }
    // }
  }
};
</script>

<style  scoped>

.container{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 3fr));
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 10px;
  grid-column-gap: 10px

}

.divtext{
  border-radius: 10px;
  text-align: center;
  word-wrap:break-word ;
  cursor: pointer;background-color: #4CAF50;
  color: black
}


.iconcolor {
  float: right;
  font-size: 1.3rem;
}

.vanstepcontent {
  text-align: center;
  padding: 0px 0px 10px 0px;
}
.vanrow {
  padding-bottom: 10px;
}
</style>