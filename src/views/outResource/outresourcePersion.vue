<template>
    <div>
        <el-col :span="24" style="background-color: white">
            <el-form ref="form" :model="searchForm" label-width="90px" style="margin-top: 20px;margin-bottom: 20px;padding-left:10px;">


                <el-col :span="6" :xs="20" label-width="90px">
                    <el-form-item label="所属供应商" prop="belongSupplier">
                        <el-select v-model="searchForm.belongSupplier" @change="autoSupplier" clearable placeholder="请选择" clearable filterable size="small"
                                   style="width: 95%">
                            <el-option
                                    v-for="item in supplierData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6" :xs="50">
                    <el-form-item label="姓名">
                        <el-input v-model="searchForm.outName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="6" :xs="20" label-width="90px">
                    <el-form-item>
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
                customerIdData: [],
                tableData3: [],
                supplierData:[],
                currentPage: 1,
                pagesize: 15,
                total: null,
                isShowMore: false,
                searchForm: {
                    outName: '',
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
                    url: 'outPersion/getOutsourcPersionList',
                    dlUrl: 'outPersion/delOutsourcPersion.do',
                    nodeCode: '507551190146351104',
                    viewName: 'viewOutPersion',
                    editName: 'editOutPersion',
                    addBtnName:'新增外包人员',
                    addName:'addOutPersion',
                    tableThead: [
                        {
                            headName: '姓名',
                            headKey: 'outName',
                            isNeedFix:true,
                            isFirstColumn:true,
                        },

                        {
                            headName: '身份证号',
                            headKey: 'idNumber',
                            isNeedTips:true
                        },
                        {
                            headName: '性别',
                            headKey: 'outSex',
                            dirKey:"sex"
                        },
                        {
                            headName: '所属供应商',
                            headKey: 'reserve1',
                            isNeedTips:true

                        },
                        {
                            headName: '联系电话',
                            headKey: 'outConnect',
                        },
                        {
                            headName: '岗位',
                            headKey: 'post',
                            isNeedTips:true
                        },
                        {
                            headName: '职级',
                            headKey: 'rank',
                            isNeedTips:true
                        }
                    ],
                    checkedThreadData: ['outName','idNumber', 'outSex', 'belongSupplier', 'outConnect', 'post', 'rank'],
                    entity:{},
                    myorderBy: ''

                }

            }

        },

        components: {
            myTable
        },
        methods: {
            search() {
                let searchData = {};

                if (this.searchForm.outName) {
                    searchData.outName = this.searchForm.outName
                }
                if (this.searchForm.belongSupplier) {
                    searchData.belongSupplier = this.searchForm.belongSupplier;
                }

                this.$store.state.oppoListSearchData = searchData;
                this.myTableData.entity=searchData;
                this.$refs.tableProduct.findAllProject(1);
            },

            autoSupplier () {
                /* 根据客户自动带出销售 */
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'supplier/getSupplierList' + window.suffix, /* 选择客户，自动带出销售 */
                    data: {
                        "entity": {
                            'serverQualify': 1
                        },
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
          /*  if(this.$store.state.oppoListSearchData){
                this.searchForm = this.$store.state.oppoListSearchData
            }*/
            if (this.$route.params.currentPage) {
                this.currentPage = this.$route.params.currentPage;
            }
            this.autoSupplier();

        },
        computed: {

        }
    }
</script>
