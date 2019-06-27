<template>
  <van-panel class="ProjectItem" title="任务名">
    <div slot="header">
      <van-row>
        <van-cell-group>
          <van-field value="医疗设备" label="任务名" disabled/>
        </van-cell-group>
      </van-row>
      <van-row>
        <van-field
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
            :columns="columns"
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

export default {
  // components: {
  //   MissionAddTabFooter: () => import("./MissionAddTabFooter")
  // },
  data() {
    return {
      MissionContent: "",
      ContractNo: "",
      showPicker: false,
      showstarttime: false,
      showendtime: false,
      ContractName: "",
     
       currentDatestarttime: new Date(),
       currentDateendtime: new Date(),
       StartTime:'',
       EndTime:'',
      columns: [
        {
          values: Object.keys(citys),
          className: "column1"
        },
        {
          values: citys["HT20190617"],
          className: "column2",
          defaultIndex: 2
        }
      ]
    };
  },
  methods: {
    onConfirm(value) {
      this.ContractNo = value[0];
      this.showPicker = false;
      this.ContractName = value[1];
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

    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    }
  },
 
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