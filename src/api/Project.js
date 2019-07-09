import {request} from '../lib/request'

// export function GetProjectList(params){
//     return request({
//         url:'/Project/GetProjectList',
//         method:'get',
//         params
//     })
// }

export function GetAccessToken(){
    return request({
        url:'/f/dingtalk/index/getAccessToken',
        method:'post',     
    })
}

export function GetProjectList(params){
    return request({
        url:'/f/dingtalk/contract/list',
        method:'post',     
        data:params
    })
}

//项目管理的项目阶段 查询
export function GetStageList(params){
    return request({
        url:'/f/dingtalk/bdstage/dt/bdStageList',
        method:'get',     
        params:params
    })
}