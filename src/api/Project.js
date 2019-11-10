import {request} from '../lib/request'

export function GetProjectList(params){
    return request({
        url:'/f/dingtalk/contract/list',
        method:'post',
        headers:{ "pageNo":1,
        "Content-Type":"text/plain;charset=UTF-8"},     
        data:params
    })
}

//项目管理的项目阶段 查询
export function GetStageList(params){
    return request({
        url:'/f/dingtalk/bdstage/dt/bdStageList',
        method:'get', 
        headers:{ "pageNo":1,
        "Content-Type":"text/plain;charset=UTF-8"},      
        params:params
    })
}

//项目类型接口
export function GetProjectType(params){
    return request({
        url:'/f/dingtalk/common/getConStageList',
        method:'get', 
        params:params
    })
}


//保存上传文件
export function ProjectSave(params){
    return request({
        url:"/f/dingtalk/bdstage/dt/upload",
        method:'post',    
        headers: {"Content-Type": "multipart/form-data"}, 
        data:params
    })
}