<template>
  <van-panel class="ProjectItem" title="任务名">
    <div slot="header">
      <van-row>
        <van-cell-group>
          <van-field  label="任务名" />
        </van-cell-group>
      </van-row>
      <van-row>
        <van-field
        required
          readonly
          clickable
          label="合同编码"
          :value="ContractNo"
          placeholder="选择合同编码"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :default-index="0"
            :columns="get"
            @cancel="showPicker = false"
            @confirm="onConfirm"
            @change="onChange"
          />
        </van-popup>
      </van-row>


      


      <van-row>
        <van-cell-group>
          <van-field :value="this.ContractName" label="项目名称" disabled/>
        </van-cell-group>
      </van-row>
    </div>


       <van-row>
        <van-field
        required
          readonly
          clickable
          label="任务阶段"
          :value="TaskStage"
          placeholder="选择任务阶段"
          @click="showTaskStage = true"
        />
        <van-popup v-model="showTaskStage" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsss"
            @cancel="showTaskStage = false"
            @confirm="onConfirmTaskStage"
          
          />
        </van-popup>
      </van-row>

    <van-row>
      <van-cell-group>
        <van-field
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
      <van-field
        readonly
        clickable
        label="开始时间"
        :value="StartTime"
        placeholder="选择开始时间"
        @click="showstarttime = true"
      />
      <van-popup v-model="showstarttime" position="bottom">
        <van-datetime-picker
          type="datetime"
          v-model="currentDatestarttime"
          @confirm="OnConfirmstarttime"
          @cancel="Oncancelstarttime"
        />
      </van-popup>
    </van-row>

    <van-row>
      <van-field
        readonly
        clickable
        label="结束时间"
        :value="EndTime"
        placeholder="选择结束时间"
        @click="showendtime = true"
      />
      <van-popup v-model="showendtime" position="bottom">
        <van-datetime-picker v-model="currentDateendtime" 
        
         
        type="datetime" @confirm="OnConfirmendtime"
         @cancel="Oncancelendtime"/>
      </van-popup>
    </van-row>

     <van-row>
        <van-col span="6" class="colcontent">
         <span class="tabtext"> 人员</span>
       </van-col>
       <van-col span="4" class="colcontent">
         <van-icon class="tabicon" name="manager-o"/>
       </van-col>
    </van-row>

    <van-row  slot="footer">
      <van-col span="24" class="colcontent"> <van-button  class="buttonsubmit" size="small" type="primary">提交</van-button></van-col>  
    </van-row>
    <!-- 底部组件 -->
    <!-- <MissionAddTabFooter/> -->
  </van-panel>
</template>

<script>
const citys = {
  HT20190617: ["HT1701xxxx项目"],
  HT20190618: ["HT1801xxxx项目"],
  HT20190619: ["HT1901xxxx项目"]
};

// const citys = [{id:"HT20190617",name:"HT1701xxxx项目"},{id:"HT20190618",name:"HT1801xxxx项目"}];

// {
//   {id:"",name:""}
// }

export default {
  // components: {
  //   MissionAddTabFooter: () => import("./MissionAddTabFooter")
  // },
  data() {
    return {
      MissionContent: "",
      ContractNo: "",
      showPicker: false,
      showTaskStage:false,
      showstarttime: false,
      showendtime: false,
      ContractName: "",
      TaskStage:'',//任务阶段
       currentDatestarttime: new Date(),
       currentDateendtime: new Date(),
       StartTime:'',
       EndTime:'',
       columnsss:["阶段一","阶段二","阶段三"],
       columns: [
        {
         
          values: Object.keys(citys),
          //values: citys[0].id,
          className: "column1"
        },
        {
          //values: citys[0][0].name,
          values: citys['HT20190617'],
          className: "column2",
          defaultIndex: 2
        }
      ]
    };
  },
  created(){
   

      this.GetData()
    
  },
  methods: {

    GetData(){

 
      this.$store.dispatch('mission/GetContrListData')

      console.log( this.$store)
      
      var data=this.$store.state.mission.contractList

      //console.log(data)


       
    },


    
    //合同编号
    onConfirm(value) {
      this.ContractNo = value[0];
      this.showPicker = false;
      this.ContractName = value[1];
    },

    //项目阶段的回调方法
    onConfirmTaskStage(value){
      this.TaskStage=value
      this.showTaskStage = false;
    },

    // 开始时间的确定关闭
    OnConfirmstarttime(value) {
      this.showstarttime = false;
      this.StartTime=this.$moment(value).format('YYYY-MM-DD');
    },
    // 开始时间的取消关闭
    Oncancelstarttime() {
      this.showstarttime = false;
    },
    //结束时间的确定关闭
    OnConfirmendtime(value) {
      this.showendtime = false;
      this.EndTime=this.$moment(value).format('YYYY-MM-DD');
    },
    //结束时间的取消关闭
    Oncancelendtime() {
      this.showendtime = false;
    },

   //合同编号 联动选择 项目名称
     onChange(picker, values) {  
      picker.setColumnValues(1, citys[values[0]]);

    }
  },
  computed:{

     get(){

      const result=[]

      // const data=[
      // {id:"1",contract:"HT20190617",project:"HT1701xxxx项目"},
      // {id:"2",contract:"HT20190618",project:"HT1801xxxx项目"},
      // {id:"3",contract:"HT20190619",project:"HT1901xxxx项目"}]

     const data=[
      {id:"1",contract:"54c0881bd1994bdf96961c8204141c1f",project:"提交的合同审批"},
      {id:"2",contract:"06d39f13701046ef94c398b4d28948c7",project:"测试"},
     ]


     const cols={}
      data.forEach(e=>{  
         cols[e.contract]=[e.project] 
      })

    var key=Object.keys(cols)
      
    result.push({values:Object.keys(cols) ,className:'contract'},{values:cols[key[0]],className:'project'})
      
     return   result;


  }

  }
 
};
</script>

<style  scoped>
.buttonsubmit{
  width: 100%;
}
.tabtext{
   font-size: 1rem;
   line-height: 2
}
.tabicon {
  font-size: 2.0rem;
}
.colcontent{
  text-align: center
}
.ProjectItem {
  font-size: 0.8rem;
  padding: 0px 15px 0px 15px;
}
</style>