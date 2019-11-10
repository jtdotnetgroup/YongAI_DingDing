<template>
  <van-panel class="ProjectItem" :title="projecDate.name" >
    <template slot="header">
      <van-row class="">
        <van-col span="5">项目名称：</van-col>
        <van-col span="19">{{projecDate.projuctName}}</van-col>
        <!-- <van-col class="projectStage" span="4">{{projecDate.stage}}</van-col> -->
      </van-row>
      <van-row >
        <van-col span="5">项目编号：</van-col>
        <van-col span="19">{{contractNumber}}</van-col>
        <!-- <van-col class="projectStage" span="4">{{projecDate.stage}}</van-col> -->
      </van-row>
      <van-row >
        <van-col span="5">项目类型：</van-col>
        <van-col span="19">{{projecDate.stageClass.name}}</van-col>
        <!-- <van-col class="projectStage" span="4">{{projecDate.stage}}</van-col> -->
      </van-row>
      <van-row>
        <van-col span="5">签约时间：</van-col>
        <van-col span="19">{{projecDate.date}}</van-col>
      </van-row>
    </template>
    <hr />
      <van-row class="">
        <van-col span="6">项目申报人：</van-col>
        <van-col span="18">{{projecDate.emplName+ ' ' + projecDate.mobile}}</van-col>
      </van-row>
      <van-row>
        <van-col span="4">
          <span class="spanPhoneAndadd">客户：</span>
        </van-col>
        <van-col span="16">
          <span class="spanPhoneAndadd">{{projecDate.custId}}</span>
        </van-col>
        <van-col span="3" class="rowcol">
          <a class="tel" :href="'tel:'+projecDate.mobile">
            <van-icon class="iconClass" name="phone-circle-o" />
          </a>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">签约单位：</van-col>
        <van-col span="6">{{projectCompanyName}}</van-col>
        <van-col span="6">立项时间：</van-col>
        <van-col span="6">{{projecDate.createDate}}</van-col>
      </van-row>
    <!-- </van-row> -->
    <hr />
    <van-row>
      <van-col span="7">合同金额：</van-col>
        <van-col span="5">{{projecDate.amount}}</van-col>
        <van-col span="7">去税合同额：</van-col>
        <van-col span="5">{{projecDate.deTaxationAmount}}</van-col>
    </van-row>
    <van-row>
      <van-col span="7">预估采购金额:</van-col>
        <van-col span="5">{{projecDate.estimatedAmount}}</van-col>
        <van-col span="7">估算毛利率：</van-col>
        <van-col span="5">{{projecDate.estimatingGrossInterestRate}}</van-col>
    </van-row>
    <van-row>
      <van-col span="7">居间费:</van-col>
        <van-col span="5">{{projecDate.intermediaryExpenses}}</van-col>
        <van-col span="7">运输安装费：</van-col>
        <van-col span="5">{{projecDate.installationFee}}</van-col>
    </van-row>
    <van-row>
      <van-col span="7">差旅费:</van-col>
        <van-col span="5">{{projecDate.travelExpenses}}</van-col>
        <van-col span="7">业务招待费：</van-col>
        <van-col span="5">{{projecDate.businessHospitality}}</van-col>
    </van-row>
    <van-row>
      <van-col span="7">其他费用:</van-col>
        <van-col span="5">{{projecDate.otherExpenses}}</van-col>
        <van-col span="7">预估商务费用：</van-col>
        <van-col span="5">{{projecDate.estimatingBusinessExpenses}}</van-col>
    </van-row>
    <van-row>
      <van-col span="7">商务毛利:</van-col>
        <van-col span="5">{{projecDate.businessGrossProfit}}</van-col>
        <van-col span="7">商务毛利率：</van-col>
        <van-col span="5">{{projecDate.grossBusinessInterestRate}}</van-col>
    </van-row>
    <hr/>
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
   
  },

  computed: {
    projecDate() {
      //return this.$store.state.project.activeProject;
      const jsonStr=sessionStorage.getItem("activeProject");
      let data= JSON.parse(jsonStr);
      data.date=this.$moment(data.date).format('Y-MM-D')
      data.createDate=this.$moment(data.createDate).format('Y-MM-D')
      return data
    },
    contractNumber(){
      const contractNumber=this.projecDate.currentNumber.replace("YACon","")
      let result=contractNumber+'(';
      result+=this.projecDate.number!=='null'?this.projecDate.number:'未同步';
      result+=')';
      
      return result;
    },
    projectCompanyName(){
      let list= this.$store.state.project.companyList

      const data=this.projecDate;

      const filters=list.filter(e=>{return e.value===data.companyId})

      if(!!filters&&filters.length>0)
        return filters[0].label;

      return "";
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