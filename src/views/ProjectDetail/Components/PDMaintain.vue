<template>
  <van-panel class="ProjectItem" :title="projectStatageData.projuctName">
    <template slot="header">
      <van-row class="projectHeader">
        <van-col span="5">项目名称：</van-col>
        <van-col span="19">{{projectStatageData.projuctName}}</van-col>
      </van-row>
      <van-row class="projectbottom">
        <!-- <van-col span="6"></van-col> -->
        <van-col span="5">主联系人：</van-col>
        <van-col span="19">{{projectStatageData.emplName}}</van-col>
      </van-row>
      <van-row>
        <van-col span="5">
          <span class="spanPhoneAndadd">联系方式：</span>
        </van-col>
        <van-col span="16">
          <span class="spanPhoneAndadd">{{Mobile}}</span>
        </van-col>
        <van-col span="3" class="rowcol">
          <a class="tel" :href="'tel:'+Mobile">
            <van-icon class="iconClass" size="35px" name="phone-circle-o" />
          </a>
        </van-col>
      </van-row>
      <van-row class>
        <van-col span="20">阶段名称：{{StatageData.conStage.name}}</van-col>
      </van-row>
    </template>
    <hr />
    <van-row>
      <span class="spanText">工作要求:</span>
      <van-cell-group>
        <van-field
          readonly
          :value="StatageData.remarks"
          type="textarea"
          placeholder
          :autosize="{maxHeight: 30, minHeight: 30}"
        />
      </van-cell-group>
    </van-row>

    <van-row>
      <span class="spanText">完成情况:</span>
      <van-radio-group :disabled="!isEdit" v-model="StatageData.status" >
        <van-cell >
          <van-radio checked-color="#07c160" :name="0"  >继续</van-radio>
        </van-cell>
        <van-cell >
          <van-radio checked-color="#07c160" :name="1" >完成</van-radio>
        </van-cell>
      </van-radio-group>
    </van-row>

    <van-row v-if="isEdit">
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

    <van-row v-if="isEdit">
      <span class="spanText">原件归档：</span>
      <van-cell-group>
        <van-field v-model="mail" label="邮寄发出" placeholder="请输入邮件">
          <div @click="OnClickScan" slot="right-icon">
            <span size="small">
              <van-icon name="scan" size="25" />
            </span>
          </div>
        </van-field>
        <van-cell>
          <template slot="title">
            <van-row>
              <van-col span="7">
                <span>签收归档</span>
              </van-col>
              <van-col span="12">
                <van-radio-group v-model="signin">
                  <van-col span="12">
                    <van-radio checked-color="#07c160" name="0">否</van-radio>
                  </van-col>
                  <van-col span="12">
                    <van-radio checked-color="#07c160" name="1">是</van-radio>
                  </van-col>
                </van-radio-group>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </van-cell-group>
    </van-row>

    <div v-if="isEdit" class="container">
      <div>
        <div class="accessoryStyle">上传附件</div>
      </div>

      <div>
        <div>
          <van-uploader accept="*" v-model="fileList" multiple />
        </div>
      </div>
    </div>

    <van-row>
      <span class="spanText">任务:</span>
      <van-collapse v-model="activeName" accordion>
        <template v-for="(items,index) in ProjectPhaseData.tasksList">
          <van-collapse-item :key="index">
            <template slot="title" v-if="items.status==='1'">
              <van-row>
                <van-col span="22">
                  <span>{{items.name }}</span>
                </van-col>
                <van-col span="2">
                  <van-icon color="#07c160" size="1.3rem" name="passed" />
                </van-col>
              </van-row>
            </template>

            <template slot="title" v-else>
              <van-row>
                <van-col span="22">
                  <span>{{items.name }}</span>
                </van-col>
              </van-row>
            </template>

            <van-row>
              <van-col span="8">
                <span>任务开始时间</span>
              </van-col>
              <van-col span="12">
                <span>{{items.appointTime}}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="8">
                <span>任务结束时间</span>
              </van-col>
              <van-col span="12">
                <span>{{items.requireTime}}</span>
              </van-col>
            </van-row>
          </van-collapse-item>
        </template>
      </van-collapse>
    </van-row>
    <van-row v-if="isEdit" slot="footer">
      <van-col span="24" class="colcontent">
        <van-button class="buttonsubmit" size="small" type="primary" @click="OnSubmit">提交</van-button>
      </van-col>
    </van-row>
  </van-panel>
</template>

<script>
import { ProjectSave } from "@/api/Project";
import * as dd from "dingtalk-jsapi";
import { deepcopy } from "@/lib/deepcopy";

export default {
  data() {
    return {
      // JobRequirement: "",
      Condition: "",
      fileList: [],
      signin: "0",
      mail: "",
      activeName: "1",
      projectStatageData: {},
      StatageData: {},
      isEdit:false
    };
  },
  mounted() {
    // alert(this.ProjectPhaseData)
    const data = sessionStorage.getItem("activeProject");
    const result = JSON.parse(data);
    this.projectStatageData = result;
    const param = this.$route.params.Maintain;
    this.StatageData = deepcopy(param);
    this.isEdit=param.status===0
  },
  methods: {
    OnClickScan() {
      var _this = this;
      dd.ready(() => {
        dd.biz.util.scan({
          onSuccess: function(data) {
            //正则匹配快递单号，连续匹配最少4位数据以上的第一条结果
            const regx = /[\d]{4,}/;
            const matches = data.text.match(regx);
            if (!matches || matches.length === 0) {
              this.$toast("未检测到快递单号");
            } else {
              _this.mail = matches[0];
            }
          },
          onFail: function(err) {
            this.$toast(JSON.stringify(err));
          }
        });
      });

      dd.error(function(error) {
        alert("dd error: " + JSON.stringify(error));
      });
    },
    statusClick(event) {
      const { name } = event.currentTarget.dataset;
      this.projectStatageData.status = name;
    },

    statusChange(event) {
      console.log(event)
      this.StatageData.status = event.status;
    },
    OnSubmit() {
      var _this = this;

      const data = _this.fileList;
      var paramimg = new FormData();

      for (let i = 0; i < data.length; i++) {
        paramimg.append("content", data[i].content);
        paramimg.append("file", data[i].file);
      }

      paramimg.append("id", _this.StatageData.id);
      paramimg.append("stageId", _this.StatageData.stageId);
      paramimg.append("status", this.StatageData.status);
      //  paramimg.append("endTime",_this.ProjectPhaseData.endTime)
      paramimg.append("contractId", _this.ProjectPhaseData.contractId);
      paramimg.append("mailNumber", _this.mail);
      paramimg.append("signFor", _this.signin);
      paramimg.append("remarks", _this.Condition);

      ProjectSave(paramimg)
        .then(res => {
          this.$toast(res.data.msg);
          setTimeout(() => {
            switch (res.data.code) {
              case "1":
              case "2":
              case "3":
              case "4":
              case "6":
              case "8":
              case "9":
              default:
                break;
              case "7":
              case "5":
                _this.$router.push({
                  name: "projectdetailsIndex"
                });
                break;
            }
          }, 2000);
        })
        .catch(err => {
          //alert(err);
        });
    }
  },
  computed: {
    ProjectPhaseData() {
      return this.$route.params.Maintain;
    },
    
    Mobile() {
      let result = "";
      if (!!this.projectStatageData.mobile) {
        result = this.projectStatageData.mobile;
      }
      return result;
    },
    status() {
      return this.projectStatageData.status;
    },
    
  }
};
</script>

<style  scoped>
.submiticon {
  font-size: 1.5rem;
  color: springgreen;
  float: right;
}
.spanText {
  display: block;
  padding-bottom: 10px;
  color: blue;
  padding-top: 5px;
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
  grid-template-columns: 30% 70%;
  padding-bottom: 10px;
}
.accessoryStyle {
  line-height: 6;
  padding-left: 15px;
}
.colcontent {
  text-align: center;
}

.buttonsubmit {
  width: 100%;
}
</style>