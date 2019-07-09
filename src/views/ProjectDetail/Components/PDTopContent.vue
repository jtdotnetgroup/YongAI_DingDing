<template>
  <van-panel class="ProjectItem" :title="projecDate.addr" :status="projecDate.stage">
    <template slot="header">
      <van-row class="projectHeader">
        <van-col span="20">{{projecDate.addr}}</van-col>
        <van-col class="projectStage" span="4">{{projecDate.stage}}</van-col>
      </van-row>
      <van-row>
        <van-col span="4">签约时间</van-col>
        <van-col span="20">{{projecDate.date}}</van-col>
      </van-row>
    </template>
    <hr />

    <van-row>
      <van-row class="projectbottom">
        <van-col span="4">
          <span class="spanPhoneAndadd">客户地址</span>
        </van-col>
        <van-col span="16">
          <span class="spanPhoneAndadd">{{projecDate.addr}}</span>
        </van-col>
        <van-col span="3" class="rowcol">
          <div @click="AddrClick">
            <van-icon class="iconAddr" name="location-o" />
          </div>
        </van-col>
      </van-row>

      <van-row class="projectbottom">
        <van-col span="4">主联系人</van-col>
        <van-col span="6">{{projecDate.emplName}}</van-col>
        <van-col span="10">{{projecDate.pose}}</van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          <span class="spanPhoneAndadd">联系方式</span>
        </van-col>
        <van-col span="16">
          <span class="spanPhoneAndadd">{{projecDate.mobile}}</span>
        </van-col>
        <van-col span="3" class="rowcol">
          <a class="tel" :href="'tel:'+projecDate.mobile">
            <van-icon class="iconClass" name="phone-circle-o" />
          </a>
        </van-col>
      </van-row>
    </van-row>
    <hr />
  </van-panel>
</template>

<script>
export default {
  name: "pdtop",
  data() {
    return {
     //projecDate:this.$store.state.project.activeProject
    };
  },
  //生命周期函数
  mounted() {
    // console.log(this.$route.params.projectItem);
  },
  methods: {
    AddrClick() {     
      dd.ready(function() {
        dd.device.geolocation.get({
          targetAccuracy: 200,
          coordinate: 1,
          withReGeocode: true,
          useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
          onSuccess: function(result) {
            alert("点击");
            alert(JSON.stringify(result));
          },
          onFail: function(err) {}
        });
      });
    }
  },

  computed: {
    projecDate() {
      //return this.$store.state.project.activeProject;
      return JSON.parse(sessionStorage.getItem("activeProject"));
    }
  }
};
</script>

<style  scoped>
.spanPhoneAndadd {
  line-height: 3;
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
.rowcol {
  text-align: center;
}

.iconAddr {
  font-size: 2rem;
  margin-left: 5px;
}
.iconClass {
  font-size: 2rem;
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

.projectStage {
  background: red;

  border-radius: 30px;
  text-align: center;
  color: white;
}
</style>