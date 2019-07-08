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