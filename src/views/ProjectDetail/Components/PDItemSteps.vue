<template>
  <van-steps direction="vertical" :active="0" active-color="black"  >
    <template v-for="(item,index) in FlowDatas"  >
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
        <van-row class="vanrow"  >
            
           <template v-if="!!item.tasksList">
             <div @click="OnClickItme(item)">
          <van-col span="5">计划完成</van-col>
          <van-col span="6" class="vanstepcontent">{{item.endTime}}</van-col>
          
            <van-col span="2">
            <van-icon class="iconcolor" color="red" name="underway"/>
          </van-col>
          <van-col span="8">
            <div v-if="datedifference(item.endTime,new Date())===0">
            <span style="color:red">{{'已过期'}}</span>
            </div>
            <div v-else>
            <span style="color:red">{{'还有'+datedifference(item.endTime,new Date())+'天到期'}}</span>
            </div>
          </van-col>
          <van-col span="1">
            <van-icon class="iconcolor" color="red" name="warning-o"/>
          </van-col>
            </div>

          </template>
             
           <template v-else>
          <div @click="OnClickItme(item)">
         <van-row class="vanrow"    >
          <van-col span="6">计划完成</van-col>
          <van-col span="10" class="vanstepcontent">{{item.endTime}}</van-col>
          <van-col span="6">
            <van-icon class="iconcolor" color="green" name="passed"/>
          </van-col>
          </van-row>
     
            </div>
            
           </template>
          
          
        </van-row>
        <van-row>

          <div v-if="!!item.tasksList"> 
            <van-col span="6">项目任务:</van-col>
             <van-col span="18">
          
              <div class="container"  >
                <div :key="index" v-for="(items,index) in item.tasksList" >   

                   <div v-if="items.status==='1'">    
                    <div class="divtext"  @click="OnClick(item,items)">
                      {{items.name}}            
                    </div>   
                    </div>       
                    <div v-else> <!-- 未完成 -->
                      <div class="divtextunfinished " @click="OnClick(item,items)">
                      {{items.name}}            
                    </div>    
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

    //汇报记录页面
    OnClick(item,items) {

      // contractId:_this.MissionDate.contract,		// 合同id
      //     stageId:_this.MissionDate.stage,	 // 阶段id
      //     taskId:_this.MissionDate.id ,	     // 任务id
      //     context:_this.MissionContent,		// 汇报内容
      //     totalRate:_this.Reportprogress,		// 任务完成进度
      //     wordTime:_this.Reportworkinghours,		// 任务汇报工时
      //     isPushed:1,		// 是否已经推送给发起人(默认为1)
      //     orgId:_this.MissionDate.orgId   //公司的组织ID 后期定下来再改

     
    item.name=items.name
    item.number=item.contract.number
    item.contractName=item.conStage.name
    item.contract=items.contract
    item.stage=items.stage
    item.id=items.id
    item.orgId=items.orgId
   
     // console.log("点击"+JSON.stringify(item) )

    
      this.$router.push({
        name: "MissionEdit",
        params: {
          Mission: item
        }
      });
    },


    //项目阶段的页面
    OnClickItme(item){
      
      //console.log(item)
      
       this.$router.push({name:"PDMaintain",params:{
         Maintain:item
       }})
    },

     

    //加载的方法
    _LoadData(){

    
       var data= JSON.parse(sessionStorage.getItem("activeProject"))

    
      var _this=this  
      var params={

        contractId:data.id

        //contractId:_this.$store.state.project.activeProject.id
      }
      
      GetStageList(params)
            .then(res => {

               switch (res.data.body.code) {
                case "1":
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
              //alert(err)
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
  
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
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


.divtextunfinished{
    border-radius: 10px;
  text-align: center;
  word-wrap:break-word ;
  cursor: pointer;background-color:red;
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