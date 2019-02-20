
<template>
    <div style="background-color: white;width: 100%">



        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="查看成本评估" name="tabOne" v-if="myShow('tabOne')">

                <el-col :span="24" style="background-color: white;margin-bottom: 5px;margin-left: 10px">

                    <el-form ref="form" v-model="searchFormTabOne" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                        <el-col :span="5" :xs="20">
                            <el-form-item label="预估类型">
                                <el-select v-model="searchFormTabOne.projectType" placeholder="请选择" clearable filterable size="small"
                                           style="width: 95%">
                                    <el-option
                                            v-for="item in projectTypeData"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </el-col>

                        <el-col :span='10' :xs="20" :offset="1">
                            <el-form-item label="商机名称/项目名称"  label-width="100">
                                <el-input v-model="searchFormTabOne.projectName" placeholder="请输入" style="width: 40%" size="small"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="4" :xs="20">
                            <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small"
                                       @click="searchTabOne()">
                                查询
                            </el-button>
                        </el-col>
                    </el-form>

                </el-col>

                <cost-list-table ref="tabOne" v-if="tabOneFlag" :showWhich="whichTab" :myTableData="tabOneData"></cost-list-table>
            </el-tab-pane>
            <el-tab-pane label="我的成本评估" name="tabTwo" v-if="myShow('tabTwo')">

                <el-col :span="24" style="background-color: white;margin-bottom: 5px;margin-left: 10px">

                    <el-form ref="form" v-model="searchFormTabTwo" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                        <el-col :span="5" :xs="20">
                            <el-form-item label="预估类型">
                                <el-select v-model="searchFormTabTwo.projectType" placeholder="请选择" clearable filterable size="small"
                                           style="width: 95%">
                                    <el-option
                                            v-for="item in projectTypeData"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </el-col>

                        <el-col :span='10' :xs="20" :offset="1">
                            <el-form-item label="商机名称/项目名称" label-width="100">
                                <el-input v-model="searchFormTabTwo.projectName" style="width: 40%" size="small"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="4" :xs="20">
                            <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small"
                                       @click="searchTabTwo()">
                                查询
                            </el-button>
                        </el-col>
                    </el-form>

                </el-col>

                <cost-list-table ref="tabTwo" v-if="tabTwoFlag" @reafshCostList = "reafshCostList" :showWhich="whichTab" :myTableData="tabTwoData"></cost-list-table>

            </el-tab-pane>
        </el-tabs>



    </div>

</template>


<script>
    import costListTable from '../commonView/costListTable.vue';
    import util from '../../libs/util'

    export default {
        data() {
            return {
                activeName:'tabOne',
                whichTab:'tabOne',
                tabOneFlag:true,
                tabTwoFlag:true,
                searchFormTabOne: {
                    projectName: '',
                    projectType: ''
                },
                searchFormTabTwo: {
                    projectName: '',
                    projectType: ''
                },
                tabOneData: {
                    width:'120',
                    isHiddenperationO:true,
                    url: 'project/cost/getCostForecastList',
                    dlUrl: 'project/delProject',
                    viewName: 'viewProjectCost',
                    editName: 'editProjectCost',
                    tableThead: [
                        {
                            headName: '项目预估编号',
                            headKey: 'costForecastNum',
                            isFixed:true,
                            isFirstColumn:true,
                            width: 50
                        },
                        {
                            headName: '项目/商机名称',
                            headKey: 'projectName',
                            isNeedTips: true
                        },
                        {
                            headName: '提交状态',
                            headKey: 'status',
                            dirKey: '提交状态',
                            width: 40
                        },
                        {
                            headName: '预估类型',
                            headKey: 'projectType',
                            dirKey: '预估类型',
                            width: 50
                        },
                        {
                            headName: '项目总成本',
                            headKey: 'projectCost',
                            isAmountFmt: true,
                            width: 50,
                            isNumber:true,
                            align:'right'
                        },
                        {
                            headName: '合同额',
                            headKey: 'contractValue',
                            isAmountFmt: true,
                            width: 80,
                            isNumber:true,
                            align:'right'
                        }
                    ],
                    entity: {
                        isNewVersion:true
                    },
                    ext: "01",
                    myorderBy: ''
                },
                tabTwoData: {
                    width:'185',
                    useSubVersionTableOperation:true,
                    editPermission:'tabTwo_update',
                    copyPermission:'tabTwo_copy',
                    delPermission:'tabTwo_del',
                    url: 'project/cost/getCostForecastList',
                    dlUrl: 'project/delProject',
                    viewName: 'viewProjectCost',
                    editName: 'editProjectCost',
                    tableThead: [
                        {
                            headName: '项目预估编号',
                            headKey: 'costForecastNum',
                            isFixed:true,
                            isFirstColumn:true,
                            width: 50
                        },
                        {
                            headName: '项目/商机名称',
                            headKey: 'projectName',
                            isNeedTips: true
                        },
                        {
                            headName: '提交状态',
                            headKey: 'status',
                            dirKey: '提交状态',
                            width: 40
                        },
                        {
                            headName: '预估类型',
                            headKey: 'projectType',
                            dirKey: '预估类型',
                            width: 50
                        },
                        {
                            headName: '项目总成本',
                            headKey: 'projectCost',
                            align:'right',
                            isAmountFmt: true,
                            width: 50,
                            isNumber:true
                        },
                        {
                            headName: '合同额',
                            headKey: 'contractValue',
                            align:'right',
                            isAmountFmt: true,
                            width: 50,
                            isNumber:true
                        }
                    ],
                    entity: {
                        isNewVersion:true
                    },
                    ext: "02",
                    myorderBy: ''
                },

                projectTypeData: []

            };
        },
        methods: {
            reafshCostList(){
                this.$refs.tabTwo.findAllProject();
            },
            handleClick(cc){
                this.$refs.tabOne.findAllProject(1);
                this.$refs.tabTwo.findAllProject(1);
                if(cc.name=='tabOne'){
                    this.whichTab='tabOne';
                }else{
                    this.whichTab='tabTwo';
                }
            },
            myShow(key){
                //暂时不作tab页签的权限控制

                // if(util.hasTabsPermission(this,key).length> 0){
                //     this.activeName = util.hasTabsPermission(this,key)[0];
                // }
                //
                // return util.hasTabsPermission(this,key).indexOf(key)> -1
                //以上注释不要删除
                return true
            },
            searchTabOne() {
                let searchData = {};
                if (this.searchFormTabOne.projectName) {
                    searchData.projectName = this.searchFormTabOne.projectName;
                }
                if (this.searchFormTabOne.projectType) {
                    searchData.projectType = this.searchFormTabOne.projectType;
                }

                searchData.isNewVersion = true
                this.tabOneData.entity = searchData;

                this.$refs.tabOne.findAllProject(1,'search');
            },
            searchTabTwo(){
                let searchData = {};
                if (this.searchFormTabTwo.projectName) {
                    searchData.projectName = this.searchFormTabTwo.projectName;
                }
                if (this.searchFormTabTwo.projectType) {
                    searchData.projectType = this.searchFormTabTwo.projectType;
                }

                searchData.isNewVersion = true
                this.tabTwoData.entity = searchData;

                this.$refs.tabTwo.findAllProject(1,'search');
            },
            makeDataDictionary: function () {
                let _this = this;

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        'entity': {
                            'dtype': '预估类型'
                        }
                    }
                }).then(res => {
                    // 成功回调方法
                    var resArry = [];
                    for (var items in res.data.rows) {
                        resArry.push({
                            label: res.data.rows[items].dvalue,
                            value: res.data.rows[items].dkey
                        });
                    }
                    _this.projectTypeData = resArry;
                });
            }
        },
        components: {
            costListTable
        },
        mounted: function () {
            var _this=this;
            this.makeDataDictionary();
            window.onresize=function () {
               if(_this.whichTab=='tabOne') {
                   _this.tabOneFlag=false;
                   setTimeout(()=>{
                      _this.tabOneFlag=true;
                   },1)
               }else{
                   _this.tabTwoFlag=false;
                   setTimeout(()=>{
                       _this.tabTwoFlag=true;
                   },1)
               }
            }
        }

    };
</script>
