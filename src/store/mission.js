import { GetContrList ,GetstageByContIdList} from '@/api/Mission'
const store = {
    namespace: true,
    state: {
        contractList: [],
        stageByContIdList:[]
    },
    mutations: {
        SET_CONTRACTLIST: (state, payload) => {
            state.contractList = payload;
        },

        SET_STAGEBYCONTIDLIST: (state, payload) => {
            state.stageByContIdList = payload;
        }
    },
    actions: {
        
        //项目合同编号列表
        GetContrListData({ commit }) {
            GetContrList().then(res => {
                var data = res.data.body.contractList
                alert(data)
                commit('SET_CONTRACTLIST', data)
            }).catch(err => {

               alert(err)
            })

        },

       //项目阶段列表
        GetstageByContIdListData({ commit },params){
            GetstageByContIdList(params).then(res => {
                var data = res.data.body.stageList
                commit('SET_STAGEBYCONTIDLIST', data)
            }).catch(err => {
    
               alert(err)
            })

        }

    
    }
}

export default store