import {request} from '../lib/request'

export function GetProjectList(params){
    return request({
        url:'/Project/GetProjectList',
        method:'get',
        params
    })
}