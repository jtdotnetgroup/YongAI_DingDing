import Vue from 'vue'
import Vuex from 'vuex'
import project from './store/project'
import mission from './store/mission'
import { GetAccessToken } from "@/api/Project";

import * as dd from "dingtalk-jsapi";
import { resolve } from 'path';
//import { reject } from 'q';

Vue.use(Vuex)

export default new Vuex.Store({
  namespace: true,//用于区分 两个相同的seate 里面的变量相同的
  state: {
    CorpId: 'ding2ced2e5420af006835c2f4657eb6378f',
    asscesstoken: '',
    code: '',
    userId: '',
    taskname:''
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
    }


  },
  actions: {

    GetCode({ commit,state }) {

      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: state.CorpId,
          onSuccess: function (result) {
            alert(result.code)
            commit("SET_CODE", result.code); //赋值 把值存在 state
            //获取token 的api
            GetAccessToken()
              .then(res => {
                let { accessToken, userId } = res;
                commit("SET_ASSCESSTOKEN", accessToken);
                commit("SET_USERID", userId);
              
              })
              .catch(err => {
                alert(err);
               // reject()
            });
          },
          onFail: function (err) {
            alert(err);
          }
        });
      });
      resolve()

    },

  
  },
  modules: {
    project,
    mission,

  },
  getters: {

  }
})
