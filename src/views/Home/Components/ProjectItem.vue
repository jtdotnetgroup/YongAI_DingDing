<template>
  <van-panel class="ProjectItem">
    <van-row class="projectItemHeader" slot="header" :title="Project.contractName">
      <van-col span="19">{{Project.projuctName}}</van-col>
    </van-row>
    <van-row class="projectItemContent">
      <van-col span="20">
        <div @click="ItemClick">
          <van-row>
            <van-col span="24" class="emplNameStyle">
              项目类型：<div style="display:inline-block" v-if="!!Project.stageClass">{{Project.stageClass.name}}</div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24" class="emplNameStyle">
              <van-icon name="user-o" />
              {{'申报人：'+Project.emplName+' '+Project.mobile}}
            </van-col>
          </van-row>
        </div>
      </van-col>
      <van-col span="4">
        <a class="tel" :href="'tel:'+Project.mobile">
          <span>
            <van-icon size="35px" name="phone-circle-o" />
          </span>
        </a>
      </van-col>
    </van-row>

    <van-row class="projectItemFooter" slot="footer">
      <van-col span="19">{{Project.updateDate}}</van-col>
      <van-col class="updateDate" span="5">{{updateDate}}</van-col>
    </van-row>
  </van-panel>
</template>

<script>
import { Panel } from "vant";
export default {
  name: "ProjectItem",
  components: {
    [Panel.name]: Panel
  },
  props: {
    Project: {
      type: Object,
      required: true
    }
  },
  computed: {
    updateDate() {
      const dic = {
        years: "年",
        "a year": "年",
        "a day": "1天",
        months: " 个月",
        days: "天",
        hours: "小时",
        "an hour": "1小时",
        "a minute": "1分钟",
        "a few seconds": "刚刚",
        minutes: "分钟"
      };

      const datatime = this.$moment(this.Project.updateDate).fromNow(true);
      let result = "";

      if (datatime.indexOf("a few seconds") >= 0) {
        result = this.$moment(this.Project.updateDate).fromNow(true);
      } else {
        result = this.$moment(this.Project.updateDate).fromNow(true) + " 前";
      }

      for (var key in dic) {
        result = result.replace(key, dic[key]);
      }
      return result;
    }
  },
  methods: {
    ItemClick() {
      this.$store.commit("SET_ACTIVEPROJECT", this.Project);
      this.$router.push({
        name: "projectdetailsIndex"
      });
    }
  }
};
</script>

<style  scoped>
.ProjectItem {
  font-size: 0.8rem;
  border: none !important
}
.projectItemHeader,
.projectItemContent {
  text-align: left;
  padding: 5px 15px 5px 15px;
}
.projectStage,
.updateDate {
  border: 1px solid rgb(214, 133, 101);
  text-align: center;
  color: #fff;
  border-radius: 30px;
  background-color: rgb(214, 133, 101);
}
.projectItemFooter {
  text-align: left;
}
.tel {
  color: #fff;
  padding: 8px;
  border-radius: 100%;
  vertical-align: middle;
  width: 40px;
  height: 40px;
}
.tel i {
  vertical-align: middle;
  top: -2px;
  background-color: #3487e6;
  border-radius: 100%;
}
.emplNameStyle {
  line-height: 2.3;
}
</style>