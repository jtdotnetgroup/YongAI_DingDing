import Vue from 'vue'
import Vuex from 'vuex'
import project from './store/project'

Vue.use(Vuex)

export default new Vuex.Store({
  namespace:true,
  state: {
   // project
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
