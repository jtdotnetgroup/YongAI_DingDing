import Vue from 'vue'
import Vuex from 'vuex'
import project from './store/project'
import mission from './store/mission'
import { GetAccessToken } from "@/api/ddjsapi";

import * as dd from "dingtalk-jsapi";
// import { reject } from 'q';
//import { reject } from 'q';

// sessionStorage.setItem("userId",6418063036333352)
// sessionStorage.setItem("token","aa39c1301e4c37f49e39bfa2d15f9b4d")

Vue.use(Vuex)

export default new Vuex.Store({
  namespace: true,//用于区分 两个相同的seate 里面的变量相同的
  state: {

    //永爱的
    // CorpId: 'ding25d2f67b6f5a896f35c2f4657eb6378f',
    // url:"http://120.76.205.135:8080/yapms/",
    // agentId:"284440209",


    //捷特的
    CorpId: 'ding2ced2e5420af006835c2f4657eb6378f',
    url: 'http://120.77.40.245:8066/',
    agentId: "273268283",


    asscesstoken: '',
    code: '',
    userId: '',
    taskname: '',
    loading: false
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
    SET_TASKNAME: (state, payload) => {
      state.taskname = payload
    },

    SET_LOADING: (state, payload) => {
      state.loading = payload
      //state.loading=true
    }

  },
  actions: {

    async GetCode({ commit, state }) {
      return await new Promise((resolve, reject) => {
        dd.ready(() => {
          dd.runtime.permission.requestAuthCode({
            corpId: state.CorpId,
            onSuccess: function (result) {
              //alert(result.code)
              commit("SET_CODE", result.code); //赋值 把值存在 state
              // alert('getCode')
              resolve(result.code)
            },
            onFail: function (err) {
              alert(JSON.stringify(err));
              reject()
            }
          });
        });

      })


    },

    async GetAccessTokenData({ commit, state }) {
      return await new Promise((resolve, reject) => {

        if (!!state.asscesstoken && !!state.userId) {
          resolve();
        }
        else {
          GetAccessToken()
            .then(res => {
              let { accessToken, userId } = res.data.body;
              commit("SET_ASSCESSTOKEN", accessToken);
              commit("SET_USERID", userId);
              commit("SET_PAGENO", "1");//页码   
              resolve();
            })
            .catch(err => {
              if (!state.userId) {
                Vue.prototype.$toast.fail('用户未同步')
              }
              reject()
            });
        }
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
