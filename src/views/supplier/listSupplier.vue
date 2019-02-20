<template>
    <div>
        <el-col :span="24" style="background-color: white">
            <el-form ref="form" :model="searchForm" label-width="90px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="50">
                    <el-form-item label="供应商名称">
                        <el-input v-model="searchForm.name" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="6" :xs="20" label-width="90px">
                    <el-form-item label="服务资格" prop="serverQualify">
                        <el-radio-group v-model="searchForm.serverQualify">
                            <el-radio label="1">正常</el-radio>
                            <el-radio label="0">取消资格</el-radio>
                        </el-radio-group>
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
                currentPage: 1,
                pagesize: 15,
                total: null,
                isShowMore: false,
                searchForm: {
                    name: '',
                    serverQualify: ''
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
                    url: 'supplier/getSupplierList',
                    dlUrl: 'supplier/delSupplier.do',
                    viewName: 'viewSupplier',
                    editName: 'editSupplier',
                    nodeCode: '507550977780350976',
                    addName:'addSupplier',
                    addBtnName:'新增供应商',
                    entity:{
                    },
                    tableThead: [
                        {
                            headName: '供应商名称',
                            headKey: 'name',
                            isNeedFix:true,
                            isFirstColumn:true,
                            width:120
                        },

                        {
                            headName: '组织机构代码',
                            headKey: 'orgCode',
                            isNeedTips:true
                        },
                        {
                            headName: '类型',
                            headKey: 'reserve3',
                            width:40
                        },
                        {
                            headName: '联系人',
                            headKey: 'contacts',
                            width:40

                        },
                        {
                            headName: '联系电话',
                            headKey: 'mobile',
                            width:60
                        },
                        {
                            headName: '邮箱',
                            headKey: 'email',
                            width:70
                        },
                        {
                            headName: '地址',
                            headKey: 'address',
                        },
                        {
                            headName: '服务资格',
                            headKey: 'serverQualify',
                            dirKey:"服务资格",
                            width:40
                        }
                    ],
                    checkedThreadData: ['name','orgCode','reserve3', 'contacts', 'mobile', 'email', 'address', 'serverQualify'],
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

                if (this.searchForm.name) {
                    searchData.name = this.searchForm.name
                }
                if (this.searchForm.serverQualify) {
                    searchData.serverQualify = this.searchForm.serverQualify;
                }

                this.$store.state.oppoListSearchData = searchData;
                this.myTableData.entity=searchData;
                this.$refs.tableProduct.findAllProject(1);
            },
            makeDataDictionary:function () {
                //服务资格
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "服务资格"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.statusData = resArry;
                });

            },

        },
        filters: {

        },
        ed: function () {
            //生成当前页面需要的数据字典内容
            if(this.$store.state.oppoListSearchData){
                this.searchForm = this.$store.state.oppoListSearchData
            }
            if (this.$route.params.currentPage) {
                this.currentPage = this.$route.params.currentPage;
            }

        },
        computed: {

        }
    }
</script>
