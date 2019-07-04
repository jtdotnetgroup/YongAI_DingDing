import {request} from '../lib/request'

export function GetProjectList(params){
    return request({
        url:'/Project/GetProjectList',
        method:'get',
        params
    })
}

export function GetTest(params){
    return request({
        url:'/f/dingtalk/index/getAccessToken',
        method:'get',
        headers:params
    })
}