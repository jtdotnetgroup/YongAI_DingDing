import { request } from '../lib/request'

//任务管理的列表
export function GetMissionList(params) {
    return request({
        url: "/f/dingtalk/tasks/dt/taskList",
        method: 'get',
        params: params
    })
}



//获取合同编号的列表数据						
export function GetContrList() {
    return request({
        url: "/f/dingtalk/contract/dt/contrList",
        method: 'get'
    })
}


//获取任务阶段的列表
export function GetstageByContIdList(params) {
    return request({
        url: "/f/dingtalk/bdstage/dt/stageByContIdList",
        method: 'get',
        params: params
    })
}



//保存任务的方法					
export function CreatedTasks(params) {
    return request({
        url: "/f/dingtalk/tasks/dt/taskSave",
        method: "post",
        headers: {"Content-Type":"application/json;charset=utf-8"},
        data: params
    })

}



//汇报记录
export function GetReportingrecordList(params) {
    return request({
        url: "/f/dingtalk/taskreport/list",
        method: 'get',
        params:params

    })

}

//汇报管理
export function TaskreportSave(params) {
    return request({
        url: "/f/dingtalk/taskreport/save",
        method: 'post',
        headers: {"Content-Type": "multipart/form-data"},
        data: params

    })
}

//上传附件
export function TaskUploadSave(params) {
    return request({
        url: "/f/dingtalk/reportfile/upload",
        method: 'post',
        headers: {"Content-Type": "multipart/form-data"},
        data: params
    })
}


//根据当前钉钉用户ID获取数据库的ID
export function GetoriginatTasksUser(params) {
    return request({
        url: "/f/dingtalk/tasks/dt/originatTasksUser",
        method: 'get',
        params: params
    })
}

