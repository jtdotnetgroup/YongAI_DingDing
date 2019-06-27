import {request} from '../lib/request'

export function GetMissionList(params){
    return request({
        url:"/Mission/GetMissionList",
        method:'get',
        params
    })

}

//汇报记录
export function GetReportingrecordList(params){
    return request({
        url:"/Mission/GetReportingrecordList",
        method:'get',
        params
    })

}