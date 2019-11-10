import {request} from '@/lib/request.js'

export function GetInformationList(params){
    return request({
        url:"/f/dingtalk/base/listDictDataByType",
        method:'get',
        params
    })

}