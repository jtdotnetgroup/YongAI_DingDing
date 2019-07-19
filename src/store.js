import Vue from 'vue'
import Vuex from 'vuex'
import project from './store/project'
import mission from './store/mission'
import {GetAccessToken} from "@/api/ddjsapi";

import * as dd from "dingtalk-jsapi";
// import { reject } from 'q';
//import { reject } from 'q';

Vue.use(Vuex)

export default new Vuex.Store({
  namespace: true,//用于区分 两个相同的seate 里面的变量相同的
  state: {
    CorpId: 'ding2ced2e5420af006835c2f4657eb6378f',
    asscesstoken: '',
    code: '',
    userId: '',
    taskname:'',
    url:"http://66d0ec59.cpolar.io/",
    agentId:"273268283",   //微应用的ID
    loading:false
  },
  mutations: {

    SET_ASSCESSTOKEN: (state, payload) => {
      sessionStorage.setItem('token', payload)
      state.asscesstoken = payload
    },

    //存取code
    SET_CODE: (state, payload) => {
      sessionStorage.setItem('code', payload)
      state.code = payload
    },
    //存取UserID
    SET_USERID: (state, payload) => {
      sessionStorage.setItem('userId', payload)
      state.userId = payload
    },
    //存取页码
    SET_PAGENO: (state, payload) => {
      sessionStorage.setItem('pageNo', payload)
    },
    
    //任务管理的项目名称
    SET_TASKNAME:(state,payload)=>{
      state.taskname = payload
    },
    
    SET_LOADING:(state)=>{
       state.loading=!state.loading
     //state.loading=true
    }

  },
  actions: {

     GetCode({ commit,state }) {
       return new Promise((resolve, reject)=>{
       dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: state.CorpId,
          onSuccess: function (result) {
            //alert(result.code)
            commit("SET_CODE", result.code); //赋值 把值存在 state
            return resolve() 
          },
          onFail: function (err) {
            alert(err);
            return reject()
          }
        });
      });
    
    })
     

    },

    //获取accessToken 的方法
     GetAccessTokenDate({ commit}){

      // alert("先执行Token方法")
       return new Promise((resolve, reject)=>{
       GetAccessToken()
      .then(res => {
        let { accessToken, userId } = res.data.body;
        //alert("accessToken"+accessToken)
        commit("SET_ASSCESSTOKEN", accessToken);
        commit("SET_USERID", userId);  
        commit("SET_PAGENO", "1");//页码        
        return resolve();
       
      })
      .catch(err => {
        alert(err);
        return reject()
      // return Promise.resolve()
    });
  })
  }

  },
  modules: {
    project,
    mission,

  },
  getters: {

  }
})
