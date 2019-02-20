<template>
    <div>
        <el-col :span="24" style="background-color: white">
            <el-form ref="form" :model="searchForm" label-width="90px" style="margin-top: 20px;margin-bottom: 20px">

                <el-col :span="5" :xs="20">
                    <el-form-item label="起始月份">
                        <el-date-picker size="small"   style="width: 90%"
                                        v-model="searchForm.startMonth"
                                        type="month"
                                        placeholder="选择月" value-format="yyyy-MM">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :span="5" :xs="20">
                    <el-form-item label="结束月份">
                        <el-date-picker size="small"   style="width: 90%"
                                        v-model="searchForm.endMonth"
                                        type="month"
                                        placeholder="选择月" value-format="yyyy-MM">
                        </el-date-picker>
                    </el-form-item>
                </el-col>



                <!--<el-col :span="5" :xs="20" label-width="90px">-->
                    <!--<el-form-item label="所属供应商" prop="belongSupplier">-->
                        <!--<el-select v-model="searchForm.belongSupplier" @change="autoSupplier" clearable placeholder="请选择" clearable filterable size="small"-->
                                   <!--style="width: 95%">-->
                            <!--<el-option-->
                                    <!--v-for="item in supplierData"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->

                <el-col :span="5" :xs="50">
                    <el-form-item label="项目名称">
                        <el-input v-model="searchForm.reserve2" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                    查询
                </el-button>

            </el-form>
        </el-col>
        <my-table ref="tableProduct" :myTableData="myTableData"></my-table>
    </div>
</template>

<script>

    import myTable from '../../components/myTable.vue'

    export default {
        data() {
            return {
                supplierData:[],
                currentPage: 1,
                pagesize: 15,
                total: null,
                isShowMore: false,
                searchForm: {
                    startMonth: '',
                    endMonth: '',
                    reserve2: '',
                    belongSupplier: ''
                },
                winRateData:[],
                orgCodeData:[],
                statusData:[],
                mysize: 10,
                mypage: 0,
                mysearchData: {},
                myorderBy: '',
                myextData: [],
                myTableData: {
                    isHiddendelete:true,
                    //isFixRight:true,
                    nodeCode: '507551419990016000',
                    url: 'outsourcerWorkload/getOutsourcerWorkloadInfoList',
                    dlUrl: 'outsourcerWorkload/delOutsourcerWorkloadInfo',
                    viewName: 'viewOutsourcerWorkloadInfo',
                    editName: 'addOutsourcerWorkloadInfo',
                    addName: 'addOutsourcerWorkloadInfo',
                    exportName:'外包工作量.xlsx',
                    isFixRight:true,
                    tableThead: [
                        // {
                        //     headName: '供应商名称',
                        //     headKey: 'reserve1',
                        //     isFirstColumn:true,
                        //     width:100
                        // },

                        {
                            headName: '项目名称',
                            headKey: 'reserve2',
                            isNeedTips:true,
                            isFirstColumn:true
                            //width:130
                        },
                        {
                            headName: '项目经理',
                            headKey: 'reserve3',
                            width:60
                            //dirKey:""
                        },
                        {
                            headName: '核算月份',
                            headKey: 'accounteMonth',
                            width:60
                        },
                        {
                            headName: '人天总数',
                            headKey: 'totalNumberOfPeopleDay',
                            align:"right",
                            keepOneDot:true,
                            width:60,
                            isNumber:true
                        },
                        {
                            headName: '总人力成本（元）',
                            headKey: 'totalLaborCost',
                            // amoutKey:'金额',
                            formatFilNew:'totalLaborCost',
                            align:"right",
                            width:60,
                            isNumber:true

                        },
                        {
                            headName: '最后操作人',
                            headKey: 'lastmodifiedBy',
                            width:60
                        },
                        {
                            headName: '最后操作时间',
                            headKey: 'lastmodifiedTime',
                            width:60
                        }
                    ],
                    entity: {},
                    myorderBy: ''
                }
            }
        },

        components: {
            myTable
        },
        methods: {
            search () {
                let searchData = {};
                let range = [];
                if (this.searchForm.startMonth && this.searchForm.endMonth ) {
                    range = [{"field": "accounteMonth", "from": this.searchForm.startMonth, "to": this.searchForm.endMonth}]
                }

                if (this.searchForm.reserve2) {
                    searchData.reserve2 = this.searchForm.reserve2
                }
                if (this.searchForm.belongSupplier) {
                    searchData.supplierId = this.searchForm.belongSupplier;
                }

                this.$store.state.oppoListSearchData = searchData;
                this.myTableData.entity = searchData;
                this.myTableData.range = range;
                this.$refs.tableProduct.findAllProject(1);
            },

            autoSupplier () {
                /* 根据  自动带出   */
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'supplier/getSupplierList' + window.suffix, /* 选择客户，自动带出销售 */
                    data: {
                        "entity": {
                            'serverQualify': 1
                        }
                    }
                }).then(res => {
                    // 成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].name,
                            value:res.data.rows[items].id
                        })
                    }
                    this.supplierData = resArry;
                });
            },
        },
        filters: {

        },
        mounted: function () {
            //生成当前页面需要的数据字典内容
            if(this.$store.state.oppoListSearchData){
                this.searchForm = this.$store.state.oppoListSearchData
            }
            if (this.$route.params.currentPage) {
                this.currentPage = this.$route.params.currentPage;
            }
            this.autoSupplier();

        },
        computed: {

        }
    }
</script>

<style scoped>

</style>
