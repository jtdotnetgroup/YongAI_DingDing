<template>
  <van-panel class="ProjectItem"  :title="Project.addr" :status="Project.stage">
    <van-row class="projectItemHeader" slot="header">
      <van-col span="20">{{Project.addr}}</van-col>
      <van-col class="projectStage" span="4">{{Project.stage}}</van-col>
    </van-row>


    <van-row class="projectItemContent" >
    <van-col span="20"  >
      <div @click="ItemClick">
      <van-row>
         
        <van-col span="24">
          <van-icon name="user-o"/>
          {{'业务员：'+Project.contacts.name+' '+Project.contacts.phone}}
        </van-col>
        <van-col span="24">
          <van-icon name="location-o"/>
          {{Project.addr}}
        </van-col>
      </van-row>
     </div> 
      </van-col>  
      <van-col span="4">
        <van-button  round type="info" size="normal">
          <van-icon size="15px" name="phone-o"/>
        </van-button>
      </van-col>
    </van-row>

    <van-row class="projectItemFooter" slot="footer">
        <van-col span="20">{{Project.updateTime}}</van-col>
        <van-col class="updateDate" span="4">{{updateDate}}</van-col>
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
          const dic={years:'年',months:' 个月',days:'天',hours:'小时',minutes:'分钟'}
          let result= this.$moment(this.Project.updateTime).fromNow(true)+' 前'
          for(var key in dic){
            result=result.replace(key,dic[key])
          }
          return result;
      }
  },
  methods: {
    ItemClick() {

      this.$store.commit('SET_ACTIVEPROJECT',this.Project)

       this.$router.push({
        name:'projectdetailsIndex'
      })

      // this.$router.push({
      //   path:'/projectdetails/index',
      //   query:{
      //     projectItem:this.Project
      //   }
      // })

      
    }
  },
};
</script>

<style  scoped>
.ProjectItem {
  font-size: 0.8rem;
}
.projectItemHeader,
.projectItemContent
 {
  text-align: left;
  padding: 5px 15px 5px 15px;
}
.projectStage,.updateDate{
    border:1px solid rgb(214, 133, 101);
    text-align: center;
    color: rgb(214, 133, 101);
}
.projectItemFooter{
  text-align: left;
}

</style>