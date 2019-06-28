<template>
  <van-panel class="ProjectItem" :title="MissionDate.missionName">
    <div slot="header">
      <van-row>
        <van-cell-group>
          <van-field :value="MissionDate.missionName" label="任务名" disabled/>
        </van-cell-group>
      </van-row>

      <van-row>

        <van-cell-group>
          <van-field :value="MissionDate.ProjectNo" label="合同编码" disabled/>
        </van-cell-group>

      </van-row>

      <van-row>
        <van-cell-group>
          <van-field :value="MissionDate.ProjectName" label="项目名称" disabled/>
        </van-cell-group>
      </van-row>
    </div>

    <van-row>
      <van-cell-group>
        <van-field
          required
          label="任务内容"
          border
          v-model="MissionContent"
          type="textarea"
          placeholder="请输入任务内容"
          :autosize="{maxHeight: 200, minHeight: 200}"
        />
      </van-cell-group>
    </van-row>

    <van-row>
      <van-cell-group>
        <van-field required v-model="Reportprogress" label="汇报进度" placeholder="请输入汇报进度">
          <b slot="button" class="colorlable">%</b>
        </van-field>
        <van-field required v-model="Reportworkinghours" label="汇报工时" placeholder="请输入汇报工时">
          <b slot="button" class="colorlable">小时</b>
        </van-field>
      </van-cell-group>
    </van-row>

    <div class="container">
      <div>
        <van-uploader>
          <van-button size="small" type="primary">上传附件</van-button>
        </van-uploader>
        <!-- <van-uploader :after-read="afterRead" /> -->
      </div>
      <div>
        <van-button type="default" size="small" @click="onClickRecord">汇报记录</van-button>

        <van-popup v-model="showRecord" position="bottom" :style="{ height: '90%' }">
          <div class="containerclose" @click="showRecord=false">
            <div>
              <van-icon name="close"/>
            </div>
          </div>

          <van-steps direction="vertical" :active="0">

            <template v-for="(item,index) in MissionContentList">

            <van-step :key="index">
              <div class="containerclosestep">
                <div><label>汇报时间:</label> </div>
                <div><span>{{item.reportTime}}</span></div>
                <div class="containerclosestepdiv"><label>汇报内容:</label> </div>
                <div><p>{{item.reportContent}}</p> </div>

               </div>            
            </van-step>
            </template>

          </van-steps>
        </van-popup>
      </div>
    </div>

    <van-row slot="footer">
      <van-col span="24" class="colcontent">
        <van-button size="small" class="buttonsubmit" type="primary">提交</van-button>
      </van-col>
    </van-row>
  </van-panel>
</template>

<script>
const citys = {
  HT20190617: ["HT1701xxxx项目"],
  HT20190618: ["HT1801xxxx项目"],
  HT20190619: ["HT1901xxxx项目"]
};

import {GetReportingrecordList} from '@/api/Mission'

export default {
  name:"missionEdit",
  // components: {
  //   MissionAddTabFooter: () => import("./MissionAddTabFooter")
  // },

  data() {
    return {
      MissionContent: "",
      ContractNo: "",
      showPicker: false,
      Reportprogress: "",
      Reportworkinghours: "",
      ContractName: "",
      fileList: [],
      showRecord: false,
      MissionDate:this.$route.params.Mission,
      MissionContentList:[]

    };
  },
  mounted(){
   this._loadData();
  },
  methods: {

    _loadData(){
      GetReportingrecordList("").then(res=>{
        this.MissionContentList=res.data
      }).catch(err=>{
        console.error(err)
      })

    },
    

    onClickRecord() {
      this.showRecord = true;
    }
  },
  computed: {
    // MissionDate() {
    // //    if(Object.keys(this.$route.query).length>0){
    // //    return this.$route.query.Mission;
    // //  }else{
    //    return this.$route.params.Mission;
    //  //}

      
    // }
  }
};
</script>

<style  scoped>
.buttonsubmit{
  width: 100%;
}
.colorlable {
  color: black;
}
.container {
  text-align: center;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 50% 50%;
  padding-bottom: 10px
}
.containerclose {
  display: grid;
  text-align: right;
  grid-template-rows: 100%;
  font-size: 1.5rem;
}
.containerclose div {
  margin: 10px 10px 0px 0px;
}
.containerclosestep{
   display: grid;
    grid-template-rows: 100%;
   grid-template-columns: 30% 70%;
   font-size: 1rem;
}

 .containerclosestepdiv{
line-height: 3
 }   
.tabtext {
  font-size: 1rem;
  line-height: 2;
}
.tabicon {
  font-size: 2rem;
}
.colcontent {
  text-align: center;
}
.ProjectItem {
  font-size: 0.8rem;
  padding: 0px 15px 0px 15px;
}
</style>