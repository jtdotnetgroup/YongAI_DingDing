import { GetContrList} from '@/api/Mission'
const store = {
    namespace: true, //加上这一句就可以在其他组件了正常访问 actions的方法
    state: {
        contractList: [],
       // stageByContIdList:[]
    },
    mutations: {
        SET_CONTRACTLIST: (state, payload) => {
            state.contractList = payload;
        },
    },
    actions: {
        
        //项目合同编号列表
        GetContrListData({ commit }) {
            GetContrList().then(res => {
                var data = res.data.body.contractList    
                commit('SET_CONTRACTLIST', data)
            }).catch(err => {

               alert(err)
            })
        },
    }
}

export default store