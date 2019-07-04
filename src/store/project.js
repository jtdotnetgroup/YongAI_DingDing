
const store = {
    state: {
        activeProject: {}
    },
    mutations: {
        SET_ACTIVEPROJECT: (state, payload) => {
            sessionStorage.setItem('activeProject', JSON.stringify(payload))
            state.activeProject = payload;
        }
    },
    actions: {
        
    }
}

export default store