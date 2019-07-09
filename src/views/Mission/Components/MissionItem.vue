<template>
  <van-panel class="ProjectItem" :title="Mission.addr">


  
    <van-row class="projectHeader" slot="header">
      <van-col span="20">{{Mission.addr}}</van-col>
      <van-col class="projectStage" span="4">
        <van-icon class="Iconstar" name="star"/>
      </van-col>
    </van-row>

    <van-row>
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

      <van-row class="projectbottom">
        <van-col span="5">
          <span style="color:blue">任务时间</span>
        </van-col>
        <van-col span="19">{{Mission.finishTime}}</van-col>
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
    }
  },
  methods: {
    ItmeClick() {
      this.$router.push({
        name: "MissionEdit",
        params: {
          Mission: this.Mission
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