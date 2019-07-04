import Vue from 'vue'
import Vuex from 'vuex'
import project from './store/project'

Vue.use(Vuex)

export default new Vuex.Store({
  namespace:true,//用于区分 两个相同的seate 里面的变量相同的
  state: {
    CorpId:'ding2ced2e5420af006835c2f4657eb6378f',
    asscesstoken:'',
  },
  mutations: {
    SET_ASSCESSTOKEN:(state,payload)=>{
      state.asscesstoken=payload
    }
  },
  actions: {

  },
  modules:{
    project
  },
  getters:{

  }
})
