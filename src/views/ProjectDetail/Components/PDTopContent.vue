<template>
  <van-panel class="ProjectItem" :title="projecDate.addr" :status="projecDate.stage">
    <template slot="header">
      <van-row class="projectHeader">
        <van-col span="20">{{projecDate.addr}}</van-col>
        <van-col class="projectStage" span="4">{{projecDate.stage}}</van-col>
      </van-row>
      <van-row>
        <van-col span="4">签约时间</van-col>
        <van-col span="20">{{projecDate.updateTime}}</van-col>
      </van-row>
    </template>
    <hr/>
    
    <van-row>
      <van-row class="projectbottom">
        <van-col span="4"><span class="spanPhoneAndadd">客户地址</span></van-col>
        <van-col span="16">
          <span class="spanPhoneAndadd">
          {{projecDate.addr}}     
          </span>
        </van-col>
         <van-col span="3" class="rowcol"  >
          <van-icon class="iconAddr" name="location-o"/>

        </van-col>
      </van-row >

      <van-row class="projectbottom">
        <van-col span="4">主联系人</van-col>
        <van-col span="6">{{projecDate.contacts.name}}</van-col>
         <van-col span="10">{{projecDate.contacts.pose}}</van-col>
      </van-row>

      <van-row>
        <van-col span="4"><span class="spanPhoneAndadd">联系方式</span></van-col>
        <van-col span="16">
          <span class="spanPhoneAndadd">{{projecDate.contacts.phone}}</span>  
        </van-col >
        <van-col span="3" class="rowcol"> 
           <a class="tel" :href="'tel:'+projecDate.contacts.phone">
          <van-icon class="iconClass" name="phone-circle-o"/>
           </a>
          </van-col>
      </van-row>

    </van-row>
     <hr/>
  </van-panel>
</template>

<script>
export default {
  name: "pdtop",
  data() {
    return {
      //projecDate:this.$route.params.projectItem
    };
  },
  mounted() {
   // console.log(this.$route.params.projectItem);

  },

  computed: {
    projecDate() {
      return this.$store.state.project.activeProject;
    }
  }
};
</script>

<style  scoped>
.spanPhoneAndadd {
line-height: 3
}
.tel{
  color: #fff;

  padding: 8px;
  border-radius: 100%;
  vertical-align: middle;
  width:40px;
  height: 40px;
}
.tel i{
  vertical-align: middle;
  top: -2px;
  background-color: #3487e6; 
  border-radius: 100%
}
.rowcol{
text-align: center;
}

.iconAddr{
 font-size: 2.0rem;
 margin-left: 5px;
}
.iconClass{
  font-size: 2.0rem;
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