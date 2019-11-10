

import { GetInformationList } from '@/api/CommonApi'
import {GetProjectType} from '@/api/Project'

const store = {
    state: {
        activeProject: {},
        companyList: [],
        projectTypes:[]
    },
    mutations: {
        SET_ACTIVEPROJECT: (state, payload) => {
            sessionStorage.setItem('activeProject', JSON.stringify(payload))
            state.activeProject = payload;
        },
        SET_COMPANYLIST: (state, payload) => {
            state.companyList = payload;
        },
        SET_PROJECTTYPES:(state,payload)=>{
            state.projectTypes=payload;
        }
    },
    actions: {
        async GetCompaynList({ commit },pars) {
            await GetInformationList(pars)
                .then(res => {
                    let {data}=res;
                    commit('SET_COMPANYLIST', data.rows)
                })
                .catch(err=>{
                })
        },
        GetProjectTypes({commit},pars){
            GetProjectType(pars).then(res=>{
                let {data}=res;
                commit('SET_PROJECTTYPES',data.body.stageClassList)
            })
        }
    }
}

export default store