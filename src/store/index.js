import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        notifyShowFlag:true,//token失效提示标识
        myGlobalermission: {},
        totalrycbcost:'',
        totalxxcbcost:'',
        totalxmwccost:'',
        totalwbrycost:'',

        totalrycbcostNoRate: '',
        totalxxcbcostNoRate: '',
        totalxmwccostNoRate: '',
        totalwbrycostNoRate: '',


        oppoContractAmount:'',
        proContractAmount:'',
        projectListCostSearchData:'',       //项目成本列表搜索数据
        projectListSearchData:'',           //项目列表列表搜索数据
        oppoListSearchData:'',               //商机列表列表搜索数据

        costId:'',
        oppoContractValue:'',


        projectListCostListTab:''



    
    },
    mutations: {

    },
    actions: {

    },
    modules: {
        app,
        user
    }
});

export default store;
