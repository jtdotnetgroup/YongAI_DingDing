import {request} from '../lib/request'

export function GetInformationList(params){
    return request({
     
        url:"/Information/GetInformationList",
        method:'get',
        params
    })

}