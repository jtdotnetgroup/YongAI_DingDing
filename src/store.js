import Vue from 'vue'
import Vuex from 'vuex'
import project from './store/project'

Vue.use(Vuex)

export default new Vuex.Store({
  namespace:true,//用于区分 两个相同的seate 里面的变量相同的
  state: {
  },
  mutations: {

  },
  actions: {

  },
  modules:{
    project
  },
  getters:{

  }
})
