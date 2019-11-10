<template>
  <van-panel class="ProjectItem" title="任务名">
    <div slot="header">
      <van-row>
        <van-cell-group>
          <van-field required v-model="Taskname" label="任务名" />
        </van-cell-group>
      </van-row>
      <van-row>
        <van-cell-group>
          <van-field
            required
            v-model="ContractNo"
            center
            clearable
            label="合同编码"
            placeholder="请输入合同编码"
            @click="OnSearch"
          ></van-field>

          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              title="合同编号"
              show-toolbar
              value-key="key"
              :columns="columns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
              @change="onChange"
            />
          </van-popup>
        </van-cell-group>
      </van-row>

      <van-row>
        <van-cell-group>
          <van-field required :value="this.ContractName" label="项目名称" disabled />
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
          :columns="Taskstagecolumns"
          @cancel="showTaskStage = false"
          @confirm="onConfirmTaskStage"
        />
      </van-popup>
    </van-row>

    <van-row>
      <van-cell-group>
        <van-field
          label="任务内容"
          required
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
          type="date"
          :formatter=" formatter " 
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
        <van-datetime-picker
          v-model="currentDateendtime"
          type="date"
           :formatter=" formatter " 
          @confirm="OnConfirmendtime"
          @cancel="Oncancelendtime"
        />
      </van-popup>
    </van-row>

    <van-row>
      <div @click="OnClickPersonnel">
        <van-col span="6" class="colcontent">
          <span class="tabtext">人员</span>
        </van-col>
        <van-col span="4" class="colcontent">
          <van-icon class="tabicon" name="manager-o" />
        </van-col>
      </div>
    </van-row>

    <van-row>
      <van-grid :column-num="3" v-if="Personnel">
        <van-grid-item
          border
          v-for="(items,index) in PersonnelData"
          :key="index"
          :icon="items.avatar===''?'manager-o':items.avatar"
          :text="items.name"
          @click="OnClickItem(items.emplId)"
        />
      </van-grid>
    </van-row>

    <van-row>
      <div @click="OnClickPeoplewhorecipients">
        <van-col span="6" class="colcontent">
          <span class="tabtext">抄送人</span>
        </van-col>
        <van-col span="4" class="colcontent">
          <van-icon class="tabicon" name="manager-o" />
        </van-col>
      </div>
    </van-row>
    <van-row>
      <van-grid :column-num="3" v-if="Peoplewhorecipients">
        <van-grid-item
          border
          v-for="(items,index) in PeoplewhorecipientsData"
          :key="index"
          :icon="items.avatar===''?'manager-o':items.avatar"
          :text="items.name"
          @click="OnClickItemImg(items.emplId,items.PeoplewhorecipientsprincipalId)"
        />
      </van-grid>
    </van-row>

    <van-row slot="footer">
      <van-col span="24" class="colcontent">
        <van-button class="buttonsubmit" size="small" type="primary" @click="OnSubmit">提交</van-button>
      </van-col>
    </van-row>
    <!-- 底部组件 -->
    <!-- <MissionAddTabFooter/> -->
  </van-panel>
</template>

<script>
import {
  GetContrList,
  GetstageByContIdList,
  CreatedTasks,
  GetoriginatTasksUser
} from "@/api/Mission";
import { GetJsapiTicket } from "@/api/ddjsapi";
import * as dd from "dingtalk-jsapi";
export default {
  name: "MissionAdd",
  data() {
    return {
      formatter(type, value) {
        if (type === "year") {
          return `${value}年`;
        } else if (type === "month") {
          return `${value}月`;
        }
        return value;
      },
      MissionContent: "",
      ContractNo: "",
      showPicker: false,
      showTaskStage: false,
      showstarttime: false,
      showendtime: false,
      ContractName: "", //项目名称
      Taskname: "", //任务名称
      TaskStage: "", //任务阶段
      currentDatestarttime: new Date(), //开始时间
      currentDateendtime: new Date(), //接收时间
      StartTime: "", //显示在UI的开始时间
      EndTime: "", //显示在UI的结束时间
      columns: [], //
      cols: {}, //合同编号的对象数组数据
      contractList: [], //用于记录合同的数据
      Taskstagecolumns: [], //任务阶段
      TaskstagecolumnsList: [], //记录任务阶段的数据
      PersonnelData: [],
      Personnel: false,
      PeoplewhorecipientsData: [], //抄送人
      Peoplewhorecipients: false, //抄送人

      timeStamp: "", //签名的方法的参数
      nonceStr: "",
      signature: "",
      PersonnelprincipalId: 0, //人员  数据库需要返回的principalId
      PeoplewhorecipientsprincipalId: [] //抄送人 数据库需要返回的principalId
    };
  },
  created() {
    this.GetContrListData();
  },
  methods: {
    //选择合同编号列表
    GetContrListData() {
      if (this.$store.state.mission.contractList.length === 0) {
        this.$store.dispatch("GetContrListData");
      }
    },

    //搜索的方法
    OnSearch() {
      this.columnsData();
      this.showPicker = true;
    },

    //合同表编码的数据
    columnsData() {
      const data = this.$store.state.mission.contractList;

      if (this.columns.length === data.length) {
        return;
      }

      this.columns = [];
      this.cols = {};
      this.contractList = [];
      this.contractList = data;

      try {
        let screenData = [];
        if (!!this.ContractNo) {
          screenData = data.filter(e => {
            if (
              // (!!e.name && e.name.indexOf(this.ContractNo) >= 0) ||
              !!e.number &&
              e.number.indexOf(this.ContractNo) >= 0
            ) {
              return e;
            }
          });
        } else {
          screenData = data;
        }

        screenData.forEach(e => {
          let itemkey = e.currentNumber + "\r\n(";
          itemkey += e.number === null ? e.number : "未同步";
          itemkey += ")";

          itemkey = itemkey.toLowerCase().replace("yacon", "");

          let item = { value: e.id, key: itemkey };

          this.columns.push(item);
        });
      } catch (error) {
        alert("error" + JSON.stringify(error));
      }
    },

    // 根据选择的合同编码取ID
    GetcontractListBycontractId(projectname) {
      const contractId = this.contractList.find(e => {
        return e.number === projectname;
      });
      if (!!contractId) {
        return contractId.id;
      } else {
        return 0;
      }
    },

    // 任务阶段名称去值
    GetTaskstageBystageId(TaskStage) {
      const data = this.TaskstagecolumnsList.find(e => {
        return e.name === TaskStage;
      });
      if (!!data) {
        return data.id;
      } else {
        return 0;
      }
    },

    //选择任务阶段列表
    GetTaskstageData(selectItem) {
      const project = this.contractList.filter(c => {
        return c.id === selectItem.value;
      })[0];

      var params = {
        contractId: project.id
      };

      GetstageByContIdList(params)
        .then(res => {
          this.Taskstagecolumns = [];
          this.TaskstagecolumnsList = [];
          var data = res.data.body.stageList;
          this.TaskstagecolumnsList = data;
          data.forEach(e => {
            this.Taskstagecolumns.push(e.name);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    //钉钉的提示接口
    DDApiAert(message) {
      dd.device.notification.alert({
        message: message,
        title: "提示", //可传空
        buttonName: "确定",
        onSuccess: function() {
          //onSuccess将在点击button之后回调
          /*回调*/
        },
        onFail: function(err) {}
      });
    },

    //验证是否为空
    verification() {
      if (!!!this.Taskname) {
        alert("任务名称不能为空");

        return true;
      } else if (!!!this.TaskStage) {
        alert("任务阶段不能为空");
        return true;
      } else if (!!!this.MissionContent) {
        alert("任务内容不能为空");
        return true;
      } else if (!!!this.ContractNo) {
        alert("合同编号不能为空");
        return true;
      } else if (!!!this.ContractName) {
        alert("项目名称不能为空");
        return;
      }
    },

    //提交的方法
    OnSubmit() {
      var _this = this;

      if (_this.verification() === true) {
        return;
      } //验证是否为空的方法

      var params = {
        name: _this.Taskname,
        status: "0",
        contract: _this.GetcontractListBycontractId(_this.ContractNo),
        stage: _this.GetTaskstageBystageId(_this.TaskStage),
        isMain: "0",
        principalId: _this.PersonnelprincipalId,
        addreId: _this.PeoplewhorecipientsprincipalId.join(","), //抄送人数组ID
        remarks: _this.MissionContent,
        appointTime: _this.StartTime,
        requireTime: _this.StartTime
      };

      //保存的方法
      CreatedTasks(params)
        .then(res => {
          switch (res.data.body.code) {
            case "1":
              alert("保存成功");
              _this.$router.push({
                name: "missionList"
              });

              break;
            case "2":
              alert("请求的用户不存在");
              break;
            case "3":
              alert("请求的用户禁用状态");
              break;
            case "4":
              alert("为请求的钉钉的Token失效，重新登录");
              break;

            default:
              break;
          }
        })
        .catch(err => {
          console.log(err);
          // alert("错误"+err);
        });
    },

    //合同编号
    onConfirm(value) {
      this.ContractNo = value.key;
      this.showPicker = false;

      let project = this.contractList.filter(c => {
        return c.id === value.value;
      })[0];

      this.ContractName = project.projuctName;
      this.GetTaskstageData(value);
    },

    //项目阶段的回调方法
    onConfirmTaskStage(value) {
      this.TaskStage = value;
      this.showTaskStage = false;
    },

    // 开始时间的确定关闭
    OnConfirmstarttime(value) {
      this.showstarttime = false;
      this.StartTime = this.$moment(value).format("YYYY-MM-DD");
    },
    // 开始时间的取消关闭
    Oncancelstarttime() {
      this.StartTime = "";
      this.showstarttime = false;
    },
    //结束时间的确定关闭
    OnConfirmendtime(value) {
      this.showendtime = false;
      this.EndTime = this.$moment(value).format("YYYY-MM-DD");
    },
    //结束时间的取消关闭
    Oncancelendtime() {
      this.EndTime = "";
      this.showendtime = false;
    },

    //合同编号 联动选择 项目名称
    onChange(picker, values) {
      // const project=this.contractList.filter(c=>{return c.id===values.value})
      // picker.setColumnValues(1, project[0].projuctName);
    },

    //选择人员的方法
    OnClickPersonnel() {
      var _this = this;
      var params = {
        url: _this.$store.state.url
      };
      GetJsapiTicket(params)
        .then(res => {
          _this.timeStamp = res.data.body.timeStamp;
          _this.nonceStr = res.data.body.nonceStr;
          _this.signature = res.data.body.signature;
          _this.GetDDPersonnel();
        })
        .catch(err => {
          //  alert(err);
        });
    },

    //抄送人选择
    OnClickPeoplewhorecipients() {
      var _this = this;
      var params = {
        url: _this.$store.state.url
      };
      GetJsapiTicket(params)
        .then(res => {
          _this.timeStamp = res.data.body.timeStamp;
          _this.nonceStr = res.data.body.nonceStr;
          _this.signature = res.data.body.signature;
          _this.GetDDPeoplewhorecipients();
        })
        .catch(err => {
          // alert(err);
        });
    },
    //人员的方法
    GetDDPersonnel() {
      var _this = this;

      _this.DDConfig(); //钉钉配置方法

      dd.ready(() => {
        dd.biz.contact.complexPicker({
          title: "选择人员", //标题
          corpId: _this.$store.state.CorpId, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: 273268283, //微应用的Id
          responseUserOnly: false, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(result) {
            _this.PersonnelData = [];
            _this.PersonnelprincipalId = [];

            var params = {
              emplId: result.users[0].emplId
            };

            GetoriginatTasksUser(params)
              .then(res => {
                switch (res.data.body.code) {
                  case "1":
                    _this.PersonnelprincipalId = res.data.body.principalId;
                    _this.PersonnelData = result.users;

                    break;
                  case "2":
                    alert("请求的用户不存在");
                    break;
                  case "3":
                    alert("请求的用户禁用状态");
                    break;
                  case "4":
                    alert("为请求的钉钉的Token失效，重新登录");
                    break;
                  case "5":
                    alert("请将该用户手动同步到本地！联系管理员，操作同步信息");
                    break;

                  default:
                    alert("请求异常！");
                    break;
                }
              })
              .catch(err => {
                // alert("错误"+err);
              });

            _this.Personnel = true;
          },
          onFail: function(err) {
            alert("错误" + JSON.stringify(err));
          }
        });
      });
      dd.error(function(error) {
        alert("dd error: " + JSON.stringify(error));
      });
    },

    OnClickItem(index) {
      var _this = this;

      dd.device.notification.confirm({
        message: "确定删除人员吗",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        onSuccess: function(result) {
          if (result.buttonIndex === 1) {
            const data = _this.PersonnelData.filter(e => {
              return e.emplId !== index;
            });
            _this.PersonnelData = data;

            _this.PersonnelprincipalId = 0;
          }
        },
        onFail: function(err) {}
      });
    },

    OnClickItemImg(emplId, PeoplewhorecipientsprincipalId) {
      var _this = this;

      dd.device.notification.confirm({
        message: "确定删除人员吗",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        onSuccess: function(result) {
          if (result.buttonIndex === 1) {
            const data = _this.PeoplewhorecipientsData.filter(e => {
              return e.emplId !== emplId;
            });

            _this.PeoplewhorecipientsData = data;

            //抄送人ID
            const PData = _this.PeoplewhorecipientsprincipalId.filter(e => {
              return e !== PeoplewhorecipientsprincipalId;
            });
            _this.PeoplewhorecipientsprincipalId = PData;
          }
        },
        onFail: function(err) {}
      });
    },

    //抄送人
    GetDDPeoplewhorecipients() {
      var _this = this;

      _this.DDConfig(); //钉钉配置方法

      dd.ready(() => {
        dd.biz.contact.complexPicker({
          title: "选择人员", //标题
          corpId: _this.$store.state.CorpId, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: 273268283, //微应用的Id
          responseUserOnly: false, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(result) {
            var arrprincipalId = [];
            result.users.forEach(e => {
              arrprincipalId.push(e.emplId);
            });

            var params = {
              addreId: arrprincipalId.join(",")
            };

            GetoriginatTasksUser(params)
              .then(res => {
                switch (res.data.body.code) {
                  case "1":
                    const ArrDataID = [];

                    res.data.body.userList.forEach(e => {
                      if (!!e.userIdDt) {
                        // 人员同步
                        _this.PeoplewhorecipientsprincipalId.push(e.id); // 返回给后台需要用到的id

                        ArrDataID.push({ userIdDt: e.userIdDt, id: e.id }); //把数据库存在钉钉同步的数据用户数据
                      }
                    });

                    var Staffname = ""; //显示没有同步钉钉用户的名称

                    result.users.forEach(es => {
                      let tmp = ArrDataID.filter(o => {
                        return es.emplId === o.userIdDt;
                      });
                      if (tmp.length === 0) {
                        Staffname += es.name + ",";
                      } else {
                        const data = {
                          PeoplewhorecipientsprincipalId: tmp[0].id,
                          name: es.name,
                          avatar: es.avatar,
                          emplId: es.emplId
                        };

                        _this.PeoplewhorecipientsData.push(data);
                      }
                    });

                    if (Staffname.length > 0) {
                      alert(
                        Staffname +
                          "    请将该用户手动同步到本地！联系管理员，操作同步信息"
                      );
                    }

                    break;
                  case "2":
                    alert("请求的用户不存在");
                    break;
                  case "3":
                    alert("请求的用户禁用状态");
                    break;
                  case "4":
                    alert("为请求的钉钉的Token失效，重新登录");
                    break;
                  default:
                    break;
                }
              })
              .catch(err => {});

            _this.Peoplewhorecipients = true;
          },
          onFail: function(err) {
            alert("错误" + JSON.stringify(err));
          }
        });
      });
      dd.error(function(error) {
        alert("dd error: " + JSON.stringify(error));
      });
    },

    //钉钉config 配置
    DDConfig() {
      var _this = this;

      dd.config({
        agentId: _this.$store.state.agentId,
        corpId: _this.$store.state.CorpId,
        timeStamp: _this.timeStamp,
        nonceStr: _this.nonceStr,
        signature: _this.signature,
        jsApiList: ["biz.contact.complexPicker", "biz.clipboardData.setData"]
      });
    }
  },
  computed: {}
};
</script>

<style  scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 3fr));
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  justify-items: center;
}

.buttonsubmit {
  width: 100%;
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