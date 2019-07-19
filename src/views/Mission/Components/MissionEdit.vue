<template>
  <van-tabs type="card"  @click="onClickTab">
    <van-tab title="汇报任务">
      <van-panel class="ProjectItem" :title="MissionDate.name">
        <div slot="header">
          <van-row>
            <van-cell-group>
              <van-field :value="MissionDate.name" label="任务名" disabled />
            </van-cell-group>
          </van-row>

          <van-row>
            <van-cell-group>
              <van-field :value="MissionDate.number" label="合同编码" disabled />
            </van-cell-group>
          </van-row>

          <van-row>
            <van-cell-group>
              <van-field :value="MissionDate.contractName" label="项目名称" disabled />
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
            <van-field
              required
              v-model="Reportprogress"
              type="number"
              label="汇报进度"
              placeholder="请输入汇报进度"
            >
              <b slot="button" class="colorlable">%</b>
            </van-field>
            <van-field
              required
              v-model="Reportworkinghours"
              type="number"
              label="汇报工时"
              placeholder="请输入汇报工时"
            >
              <b slot="button" class="colorlable">小时</b>
            </van-field>
          </van-cell-group>
        </van-row>



        <div class="container">

           <div>
            <div class="accessoryStyle">
              上传附件
            </div>
          </div>

          <div>    
            <div>
              <van-uploader  accept="*"  v-model="fileList" multiple />
            </div> 
          </div>

       
        </div>

        <van-row slot="footer">
          <van-col span="24" class="colcontent">
            <van-button size="small" class="buttonsubmit" @click="OnSubmit" type="primary">提交</van-button>
          </van-col>
        </van-row>
      </van-panel>
    </van-tab>
    <van-tab title="汇报记录">

      <van-panel class="ProjectItem" >
          <van-steps direction="vertical" :active="0">
                <template v-for="(item,index) in MissionContentList">
                  <van-step :key="index">

                    <div class="containerclosestep">
                      <div>
                        <label>汇报时间:</label>
                      </div>
                      <div>
                        <span>{{item.createDate}}</span>
                      </div>
                      <div >
                        <label>汇报内容:</label>
                      </div>
                      <div >
                        <p style="margin:0px">{{item.context}}</p>
                      </div>
                   </div>       
                            
                  </van-step>
                </template>
              </van-steps>
       </van-panel>

    </van-tab>
  </van-tabs>
</template>

<script>


import { GetReportingrecordList,TaskreportSave,TaskUploadSave } from "@/api/Mission";

export default {
  name: "missionEdit",
  data() {
    return {
      MissionContent: "",
      showPicker: false,
      Reportprogress: "",
      Reportworkinghours: "",
      ContractName: "",
      fileList: [],
      showRecord: false,
      MissionDate: this.$route.params.Mission,
      MissionContentList:[]
    };
  },
  

  mounted() {

    console.log(this.$route.params.Mission)
    this._loadData();
  },
  methods: {
    _loadData() {

      var params={
        taskId:this.MissionDate.id
      }
      GetReportingrecordList(params)
        .then(res => {
    
        if(res.data.success===true){
            this.MissionContentList = res.data.body.taskReportList;
         }else{

           alert('无数据')
         }
              
        })
        .catch(err => {
          console.error(err);
        });
    },


     //验证是否为空
    verification() {
      if (!(!!this.MissionContent)) {
        //this.DDApiAert("任务名称不能为空")
        alert("任务内容不能为空");
        return true;
       } 
    
      else if (!!!this.Reportprogress) {
        // this.DDApiAert("任务内容不能为空")
        alert("汇报进度不能为空");
        return true;
      } else if (!!!this.Reportworkinghours) {
        //this.DDApiAert("合同编号不能为空")
        alert("汇报工时不能为空");
        return true;
      }
   
    },






    OnSubmit(){
      var _this=this;

     if (_this.verification() === true) {
        return;
      } //验证是否为空的方法

      //  var params = {
      //     contractId:_this.MissionDate.contract,		// 合同id
      //     stageId:_this.MissionDate.stage,	 // 阶段id
      //     taskId:_this.MissionDate.id ,	     // 任务id
      //     context:_this.MissionContent,		// 汇报内容
      //     totalRate:_this.Reportprogress,		// 任务完成进度
      //     wordTime:_this.Reportworkinghours,		// 任务汇报工时
      //     isPushed:1,		// 是否已经推送给发起人(默认为1)
      //     orgId:_this.MissionDate.orgId   //公司的组织ID 后期定下来再改
      //  };


     const data=_this.fileList
    

      var param = new FormData(); 
      for (let i = 0; i < data.length; i++) {
       param.append("content", data[i].content);
       param.append("files",  data[i].file);    
     }

      param.append("contractId",  _this.MissionDate.contract);    
      param.append("stageId", _this.MissionDate.stage);   
      param.append("taskId", _this.MissionDate.id); 
      param.append("context", _this.MissionContent); 
      param.append("totalRate", _this.Reportprogress); 
      param.append("wordTime", _this.Reportworkinghours); 
      param.append("isPushed", 1); 
      param.append("orgId", _this.MissionDate.orgId); 
  
      
      //保存的方法
      TaskreportSave(param)
        .then(res => {
          if(res.data.success===true){

            alert(res.data.msg)
                    _this.$router.push({
                      name: "missionList"
                    });
            
          }else{
             alert(res.data.msg)

          }
           
        })
        .catch(err => {
          console.log(err);
        });
 
      

    },

    //便签切换的方法
    onClickTab(name, title) {
      if(title==="汇报记录"){
         this._loadData();

      }

    },

    onClickRecord() {
      this.showRecord = true;
    },

   

    // //上传图片
    // afterRead(file){

    //   const data=this.fileList
    //   const filedata=[]

    //   let param = new FormData(); 
    
    //   for (let i = 0; i < data.length; i++) {
    //    param.append("content", data[i].content);
    //     param.append("file",  data[i].file);    
    //  }

    //    param.append("taskId",  this.MissionDate.id);    
    //   param.append("taskReportId", "123");    
    
    //    console.log(param.getAll("file"));
    //   TaskUploadSave(param).then(res=>{
    //      alert(res)

    //   }).catch(err=>{
    //     alert(err)
    //   })
    //   // console.log(file);
    // }
  },
  computed: {

  }
};
</script>

<style  scoped>

.accessoryStyle{
  line-height: 6;
  padding-left: 15px
}
.buttonsubmit {
  width: 100%;
}
.colorlable {
  color: black;
}
.container {
 
  margin-top: 10px;
  display: grid;
  grid-template-columns:30% 70%;
  padding-bottom: 10px;
 
 
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
.containerclosestep {
  display: grid;
  text-align: center;
  grid-template-columns: 30% 70%;
  grid-row-gap: 10px;
  font-size: 1rem;
}

.containerclosestepdiv {
  line-height: 2;
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