<template>
  <van-panel class="ProjectItem" :title="Maintain.name" >
    <template slot="header">
      <van-row class="projectHeader">
        <van-col span="20">{{Maintain.name}}</van-col>
   
      </van-row>

      <van-row class="projectbottom">
        <van-col span="4">主联系人</van-col>
        <van-col span="6">{{Maintain.emplName}}</van-col>
        <van-col span="10">{{Maintain.pose}}</van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          <span class="spanPhoneAndadd">联系方式</span>
        </van-col>
        <van-col span="16">
          <span class="spanPhoneAndadd">{{Maintain.mobile}}</span>
        </van-col>
        <van-col span="3" class="rowcol">
          <a class="tel" :href="'tel:'+Maintain.mobile">
            <van-icon class="iconClass" size="35px" name="phone-circle-o" />
          </a>
        </van-col>
      </van-row>
    </template>
    <hr/>
   

    <van-row>
      <span class="spanText">工作要求:</span>
      <van-cell-group>
        <van-field
        readonly
         :value="Maintain.remarks"
          type="textarea"
          placeholder="请输入工作要求"
          :autosize="{maxHeight: 30, minHeight: 30}"
        />
      </van-cell-group>
    </van-row>
  

    <van-row>
   <span class="spanText">完成情况:</span>
     
  <van-radio-group v-model="Completedno">
    <van-cell-group>
    <van-cell title="完成" clickable @click="Completedno = '1'">
      <van-radio slot="right-icon"   checked-color="#07c160" name="1" />
    </van-cell>
    <van-cell title="继续" clickable @click="Completedno = '2'">
      <van-radio slot="right-icon" checked-color="#07c160" name="2" />
    </van-cell>
    </van-cell-group>
</van-radio-group>


    </van-row>
 

    <van-row>
      <span class="spanText">情况说明:</span>
      <van-cell-group>
        <van-field
          v-model="Condition"
          type="textarea"
          placeholder="请输情况说明"
          :autosize="{maxHeight: 100, minHeight: 100}"
        />
      </van-cell-group>
    </van-row>


     <van-row>
      <span class="spanText">原件归档：</span>
      <van-cell-group>

        <van-field v-model="mail" label="邮寄发出" placeholder="请输入邮件"   >
      
        <div @click="OnClickScan" slot="right-icon" ><span  size="small" ><van-icon name="scan" size="25" /></span></div> 


        </van-field>
        <van-cell  >
          <template slot="title">
            <van-row>
              <van-col span="7"><span>签收归档</span></van-col>
              <van-col span="12"><van-radio-group v-model="signin">
              <van-col span="12"> <van-radio checked-color="#07c160"  name="0">否</van-radio></van-col>
              <van-col span="12"> <van-radio checked-color="#07c160"  name="1">是</van-radio></van-col>
             </van-radio-group></van-col>
              
            </van-row>
          </template>

        </van-cell>
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
              <van-uploader  accept="*" v-model="fileList" multiple />
            </div> 
          </div>    
        </div>

    <van-row>
     

    <span class="spanText">任务:</span>
   <van-collapse v-model="activeName" accordion>
     <template v-for="(items,index) in ProjectPhaseData.tasksList">  

      <van-collapse-item :key="index"    >


        <template slot="title" v-if="items.status==='1'">
            <van-row>
              <van-col span="22">
               <span>{{items.name }} </span>
              </van-col>
              <van-col span="2">
                <van-icon color="#07c160" size="1.3rem" name="passed" />
              </van-col>
            </van-row>







          </template>

          <template slot="title" v-else>
            <van-row>
              <van-col span="22">
               <span>{{items.name }} </span>
              </van-col>
            
            </van-row>
          </template>

     

        <van-row >
          <van-col span="8"> 
            <span>任务开始时间</span>
          </van-col>
          <van-col span="12"> 
            <span> {{items.appointTime}}</span>
          </van-col>
         
        </van-row>
      <van-row >
      <van-col span="8">
          <span> 任务结束时间</span>
        </van-col>
        <van-col span="12">
          <span> {{items.requireTime}}</span>
        </van-col>
        </van-row>
        

        </van-collapse-item>       
     </template>

    </van-collapse>


    </van-row>
     <van-row slot="footer">
      <van-col span="24" class="colcontent">
        <van-button class="buttonsubmit" size="small" type="primary" @click="OnSubmit">提交</van-button>
      </van-col>
    </van-row>

  </van-panel>
</template>

<script>

import{ProjectSave} from "@/api/Project";
import * as dd from "dingtalk-jsapi";

export default {
  data() {
    return {
     // JobRequirement: "",
      Condition: "",
      fileList: [],
      Completedno:'2',
      signin:'0',
      mail:'',
      activeName:'1',
      ProjectPhaseData:this.$route.params.Maintain
    };
  },
  created(){

  },
  methods:{




    OnClickScan(){
      var _this=this

    dd.ready(()=>{

    dd.biz.util.scan({
    onSuccess: function(data) {

      _this.mail=data.text
    
    },
    onFail : function(err) {
      alert(JSON.stringify(err))
    }

       })
    })


    

   dd.error(function(error){
        alert('dd error: ' + JSON.stringify(error));
      });
  },

    

    OnSubmit(){
   var _this=this
 

     const data=_this.fileList
      var paramimg = new FormData();   

      //   var params={
      //      id:_this.ProjectPhaseData.id,
      //      stageId:_this.ProjectPhaseData.stageId,  // 阶段类型Id
      //      status: _this.Completedno,  // 阶段状态
      //      planStartTime:"",// 计划开始时间
      //      planEndTime:"",  // 计划结束时间
      //      startTime:"",   // 实际开始时间
      //      endTime:_this.ProjectPhaseData.endTime,     // 实际结束时间
      //      proCondition:"",// 收款条件
      //      arAomunt:"",   // 应收金额
      //     ivnoAmount:"",// 开票金额
      //     proAmount:"", // 收款金额
      //     isMsginstart:"",// 开始是否触发信息
      //     isMsginend:"",// 结束是否触发信息
      //     msgContext:"",// 触发信息
      //     contractId:_this.ProjectPhaseData.contractId,// 合同id
      //     receivable:"", //是否触发应收
      //     rate:"",      // 应收百分百比
      //     mailNumber:_this.mail, //邮箱
      //     signFor:_this.signin, //签收归档
      //     remarks:_this.Condition //情况说明
      // }

      for (let i = 0; i < data.length; i++) {
       paramimg.append("content", data[i].content);
       paramimg.append("file",  data[i].file);   
      }

    
      paramimg.append("id",_this.ProjectPhaseData.id)
      paramimg.append("stageId",_this.ProjectPhaseData.stageId)
      paramimg.append("status",_this.ProjectPhaseData.status)
    //  paramimg.append("endTime",_this.ProjectPhaseData.endTime)
      paramimg.append("contractId",_this.ProjectPhaseData.contractId)
      paramimg.append("mailNumber",_this.mail)
      paramimg.append("signFor",_this.signin)
      paramimg.append("remarks",_this.Condition)

    

  
      ProjectSave(paramimg).then(res=>{
          switch (res.data.code) {
                case "1":    
                   alert(res.data.msg);

                    _this.$router.push({
                    name: "projectdetailsIndex"
                       });
                   
                  break;
                case "2":
                  alert(res.data.msg);
                  
                  break;
                case "3":
                   alert(res.data.msg);
                  break;
                case "4":
                   alert(res.data.msg);
                  break;
                  case "5":
                   alert(res.data.msg);
                  break;
                  case "6":
                   alert(res.data.msg);
                  break;
                  case "7":
                   alert(res.data.msg);
                  break;
                  case "8":
                   alert(res.data.msg);
                  break;
                   case "9":
                   alert(res.data.msg);
                  break;

                default:
                  break;
              }
             
      
      }).catch(err=>{
          //alert(err);
      })        
      

    
    }

  },
   computed: {
    Maintain() {
      //return this.$store.state.project.activeProject;
      return JSON.parse(sessionStorage.getItem("activeProject"));
    }
  }
};
</script>

<style  scoped>

.submiticon{
  font-size: 1.5rem;
  color:springgreen;
  float: right;

}
.spanText {
  display: block;
  padding-bottom: 10px;
  color: blue;
  padding-top: 5px
}

.spanPhoneAndadd {
  line-height: 3;
}

.ProjectItem {
  font-size: 0.8rem;
  padding: 0px 15px 0px 15px;
}
.projectHeader {
  padding: 10px 0px 10px 0px;
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
.container {
 
  margin-top: 10px;
  display: grid;
  grid-template-columns:30% 70%;
  padding-bottom: 10px;
}
.accessoryStyle{
  line-height: 6;
  padding-left: 15px
}
.colcontent {
  text-align: center;
}

.buttonsubmit {
  width: 100%;
}

</style>