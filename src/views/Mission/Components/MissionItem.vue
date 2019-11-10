<template>
  <van-panel class="ProjectItem" :title="Mission.contractName">

    <van-row class="projectHeader" slot="header">

      <van-col span="5">
          <span style="color:blue">项目名称</span>
      </van-col>

      <van-col span="15">{{Mission.contractName}}</van-col>
      
      <div v-if="Mission.isMain===0">   
        <!-- <van-col class="projectStage" span="4">
        <van-icon class="Iconstarminor" name="star"/>
       </van-col> -->

       <van-col class="projectStage" span="4">
        <van-icon class="Iconstar" name="star"/>
       </van-col>
      </div>

      <!-- <div v-else>
      <van-col class="projectStage" span="4">
        <van-icon class="Iconstar" name="star"/>
       </van-col>
      </div> -->
     
    </van-row>

    <van-row>


       <van-row class="projectbottom">
        <van-col span="5">
          <span style="color:blue">阶段名称</span>
        </van-col>
        <van-col span="15">{{Mission.stageName}}</van-col>
      </van-row>


     <van-row class="projectbottom">
        <van-col span="5">
          <span style="color:blue">任务名称</span>
        </van-col>
        <van-col span="15">{{Mission.name}}</van-col>
        <div @click="ItmeClick">
          <van-col span="4">
            <van-icon class="editicon" name="edit"/>
          </van-col>
        </div>
      </van-row>

       <template v-if="this.MissionState===1">
        <van-row class="projectbottom">
        <van-col span="8">
          <span style="color:blue">任务负责人名称</span>
        </van-col>
        <van-col span="16">{{Mission.principal}}</van-col>
       </van-row>   
      </template>

      <template  v-else-if="this.MissionState===0" >
         <van-row class="projectbottom">
        <van-col span="5">
          <span style="color:blue">指派人名称</span>
        </van-col>
        <van-col span="16">{{Mission.initiator}}</van-col>
       </van-row>   
      </template>

      <van-row class="projectbottom">
        <van-col span="7">
          <span style="color:blue">任务开始时间</span>
        </van-col>
        <van-col span="15">{{formatDateTime(Mission.appointTime)}}</van-col>
      </van-row>

        <van-row class="projectbottom">
        <van-col span="7">
          <span style="color:blue">任务结束时间</span>
        </van-col>
        <van-col span="15">{{formatDateTime(Mission.requireTime)}}</van-col>
      </van-row>



    </van-row>

 

  </van-panel>
</template>

<script>
export default {
  props: {
    Mission: {
      type: Object,
      required: true
    },
    MissionState:{
      type:Number,
      required:true
    }
  },
  mounted(){
  },
  methods: {
    formatDateTime(datetime){
      return this.$moment(datetime).format('YYYY-MM-DD')
    },
    ItmeClick() {
      this.$router.push({
        name: "MissionEdit",
        params: {
          Mission: this.Mission,
          
        }
      });
    }
  }
};
</script>

<style  scoped>
.Iconstar {
  float: right;
  color: #f0d852;
  font-size: 1.3rem;
}

.Iconstarminor{
  float: right;
  color: gray ;
  font-size: 1.3rem;
}
.editicon {
  float: right;
  font-size: 1.3rem;
  color: #a5a5a5;
}
.ProjectItem {
  font-size: 0.8rem;
  padding: 0px 15px 0px 15px;
}
.projectHeader {
  padding: 10px 0px 10px 0px;
}

.projectbottom {
  padding: 0px 0px 10px 0px;
}
</style>