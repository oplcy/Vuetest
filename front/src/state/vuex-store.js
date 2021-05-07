import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: localStorage.getItem("seaUser") != null ? 
        JSON.parse(localStorage.getItem("seaUser")) : null,
        goodsDetail: null
    },
    mutations: {
        user (state, payload) {
            state.user = payload;
            if(payload == null){
                localStorage.removeItem("seaUser", JSON.stringify(payload));
            }else{
                localStorage.setItem("seaUser", JSON.stringify(payload));
            }
        },
    }
});