const Mock = require('mockjs')

const Random = Mock.Random;

Random.extend({
    projectstage: function () {
        var arr = ['洽谈中', '签订合同', '物资供应', '项目验收']
        return this.pick(arr)
    },
    missionName:function(){
        var arr = ['一期验收', '二期验收', '整天验收', '开票跟进','开票测试','开票测试2']
        return this.pick(arr)
    },
    missionType:function(){
        var arr = ['应收', '任务']
        return this.pick(arr)
    }
})

// 项目列表数据
const ProjectListData = () => {
    const data = []
    const count = Random.integer(15, 30)
    const stageCount = Random.integer(3, 5)
    const missionCount = Random.integer(4, 6)
    for (let index = 0; index < count; index++) {
        let row = {
            // 客户名称
            customerName: Random.csentence(3, 3),
            // 是否完成状态
            finish: Random.boolean(),
            // 项目阶段
            stage: Random.projectstage(),
            // 联系人
            contacts: {
                name: Random.cname(),
                phone: '13' + Random.string('0123456789', 9),
                pose:'院长'
            },
            // 地址
            addr: Random.city(true) + 'XXX敬老院',
            // 最后更新时间
            updateTime: Random.datetime('yyyy-MM-dd HH:mm'),
            // 阶段明细
            stageDetails: []
        }

        for (let j = 0; j < stageCount; j++) {
            let stageItem = {
                stage: Random.projectstage(),
                planTime: Random.datetime('yyyy-MM-dd'),
                missions: []
            }

            //编辑任务的方法
            for (let k = 0; k < missionCount; k++) {
            let missionsrow={
               // addr: Random.city(true) + 'XXX敬老院',
                missionName:"任务"+Random.string('123456789', 1),
               // missionTime:Random.datetime('yyyy-MM-dd'),
                  // 是否完成状态
               // finish: Random.boolean(),
               ProjectNo:"HT"+Random.string('123456789', 5),
               ProjectName:"XXXXX"+Random.string('123456789', 2)+"项目",
               projectNamestwo: Random.missionName()

            }

                stageItem.missions.push(missionsrow)
            }

            row.stageDetails.push(stageItem)
        }

        data.push(row)
    }
    return data;
}


//汇报记录的API
const ReportingrecordList=()=>{
    const data=[]
    const MissionContentCount=Random.integer(5,10)
    for (let index = 0; index < MissionContentCount; index++) {
        let report={
            reportTime:Random.datetime('yyyy-MM-dd'),
            reportContent:Random.cparagraph(2, 3)
            // reportContent:"XXXXX"+Random.string('123456789', 2)+"项目",
        }
        data.push(report)
   }
   return data

}

// 任务列表数据
const MissionListData = () => {
    const data = []
    const count=Random.integer(10,20)
   
    for (let index = 0; index < count; index++) {
        let row={
             // 地址
            addr: Random.city(true) + 'XXX敬老院',
            missionName:"任务"+Random.string('123456789', 1),
            missionTime:Random.datetime('yyyy-MM-dd'),
              // 是否完成状态
            finish: Random.boolean(),
            ProjectNo:"HT"+Random.string('123456789', 5),
            ProjectName:"XXXXX"+Random.string('123456789', 2)+"项目",
             //委派人员
            delegating:Random.boolean(),
           
        }
      
        data.push(row)
    }

    return data
}



//提醒我
const InformationList=()=>{
    const data = []
    const count=Random.integer(5,10)
   
for (let index = 0; index < count; index++) {

   let row={
    addr: Random.city(true) + 'XXX敬老院',
    expire:Random.datetime('yyyy-MM-dd'),
    money: Random.string('123456789', 4), 
    project:"XXX"+Random.string('123456789', 4)+"项目",
    TypeName: Random.missionType(), 
   }

   data.push(row)
}
   return data
}


Mock.mock('/Project/GetProjectList', 'get', ProjectListData)
Mock.mock('/Mission/GetMissionList','get',MissionListData)
Mock.mock('/Information/GetInformationList','get',InformationList)
Mock.mock('/Mission/GetReportingrecordList','get',ReportingrecordList)
//新建任务 编辑任务 post请求
