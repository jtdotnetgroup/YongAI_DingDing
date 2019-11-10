import {request} from '../lib/request'


//获取签名的方法（鉴权）
export function GetJsapiTicket(params) {
    return request({
        url:"/f/dingtalk/index/getJsapiTicket",
        method:"get",
        params:params
    })
}




//获取签名的方法（鉴权）
export function GetAccessToken() {
    return request({
        url:"/f/dingtalk/index/getAccessToken",
        method:"get",
        //params:params
    })
}


