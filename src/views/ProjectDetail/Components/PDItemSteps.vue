<template>
  <van-steps direction="vertical" :active="0" active-color="black">
    <template v-for="(item,index) in FlowDatas">
      <van-step :key="index" v-if="index===0">
        <van-row class="vanrow">
          <van-col span="24">
            <span style="color:red">{{item.stage}}</span>
          </van-col>
        </van-row>
        <van-row class="vanrow">
          <van-col span="5">时间计划</van-col>
          <van-col span="6" class="vanstepcontent">{{item.planTime}}</van-col>

          <van-col span="2">
            <van-icon class="iconcolor" color="red" name="underway"/>
          </van-col>
          <van-col span="8">
            <span style="color:red">还有{{datedifference(item.planTime,new Date())}}天到期</span>
          </van-col>

          <van-col span="1">
            <van-icon class="iconcolor" color="red" name="warning-o"/>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="6">项目任务:</van-col>
          <van-col span="18">
          
              <div class="container"  >
                <div :key="index" v-for="(item,index) in item.missions" >
                   
                  
                    <div class="divtext"  @click="OnClick(item)">
                      {{item.projectNamestwo}} 
                 
                    </div>              
                </div>
              </div>

     <!-- <template v-for="(item,index) in item.missions"> -->
              <!-- <van-col span="7" class="vanstepcontent" :key="index"> -->
                <!-- <div @click="OnClick">{{item}}</div> -->
                <!-- <van-button type="primary"  @click="OnClick(item)" size="mini">{{item.projectNamestwo}}</van-button>
                </van-col> -->
            <!-- </template> -->
          </van-col>
        </van-row>
      </van-step>

      <van-step v-else :key="index">
        <van-row class="vanrow">
          <van-col span="24">{{item.stage}}</van-col>
        </van-row>
        <van-row class="vanrow">
          <van-col span="6">时间计划</van-col>
          <van-col span="10" class="vanstepcontent">{{item.planTime}}</van-col>
          <van-col span="6">
            <van-icon class="iconcolor" color="green" name="passed"/>
          </van-col>
        </van-row>
      </van-step>
    </template>
  </van-steps>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //计算天数
    datedifference(sDate1, sDate2) {
      //sDate1和sDate2是2006-12-18格式
      var dateSpan, tempDate, iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays;
    },
    OnClick(item) {
      this.$router.push({
        name: "MissionEdit",
        params: {
          Mission: item
        }
      });
    }
  },
  computed: {
    FlowDatas: {
      get() {
        if (!!this.$store.state.project.activeProject.stageDetails) {
          return this.$store.state.project.activeProject.stageDetails;
        }
        let project = JSON.parse(sessionStorage.getItem("activeProject"));
        this.$store.commit("SET_ACTIVEPROJECT", project);//赋值 把值存在 state
        return project.stageDetails;
      }
    }
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