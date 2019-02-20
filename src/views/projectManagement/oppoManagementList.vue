<template>
    <div>
        <el-col :span="24" style="background-color: white">
            <el-form ref="form" :model="searchForm" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="5" :xs="20">
                    <el-form-item label="机会名称">
                        <el-input v-model="searchForm.oppoProjectName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="5" :xs="20">
                    <el-form-item label="销售">

                        <el-input v-model="searchForm.saleName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span='5' :xs="20">
                    <el-form-item label="客户名称">
                        <el-select v-model="searchForm.customerId" clearable filterable placeholder="请选择" size="small"
                                   style="width: 95%">
                            <el-option
                                    v-for="item in customerIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='5' :xs="20">
                    <el-form-item label="所属部门" prop="orgCode">
                        <el-select v-model="searchForm.orgCode" placeholder="请选择"  clearable size="small" filterable style="width: 95%">
                            <el-option
                                    v-for="item in orgCodeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                    查询
                </el-button>
                <el-button :span="3" :xs="20" type="primary" size="small" @click="showMore()">展开更多</el-button>

            </el-form>

            <el-form ref="form" :model="searchForm" label-width="80px" style="margin-top: 20px;margin-bottom: 20px"
                     v-show="isShowMore">
                <el-col :span="5" :xs="20">
                    <el-form-item label="赢单率" prop="winRate">
                        <el-select v-model="searchForm.winRate" placeholder="请选择" clearable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in winRateData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="状态" >
                        <el-select v-model="searchForm.status" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in statusData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="关联工时" prop="isAllowWorkingHours">
                        <el-select v-model="searchForm.isAllowWorkingHours" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in isAllowWorkingHoursData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-col>
        <div class="fnBtnControl">
            <!--v-hasPermission="'addOppoBtn'"-->
            <!--v-hasPermission="'selfListBtn'"-->
            <!--v-hasPermission="'listExportBtn'"-->
            <el-button v-show="false"  id="addOppoBtn" type="primary">新增商机</el-button>
            <el-button v-show="false"  id="selfListBtn" type="primary">自定义列表</el-button>
            <el-button v-show="false"  id="listExportBtn" type="primary">报表导出</el-button>
        </div>
        <div class="tableBtnControl">
            <el-button v-show="false"  id="viewOrNot" type="primary" v-hasPermission="'oppoViewBtn'">查看</el-button>
            <el-button v-show="false"  id="editOrNot" type="primary" v-hasPermission="'oppoEditBtn'">编辑</el-button>
            <el-button v-show="false"  id="delOrNot" type="primary" v-hasPermission="'oppoDelBtn'">删除</el-button>
        </div>

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
                currentPage: 1,
                pagesize: 15,
                total: null,
                isShowMore: false,
                searchForm: {
                    oppoProjectName: '',
                    saleName: '',
                    customerId: '',
                    winRate:'',
                    orgCode:'',
                    status:'',
                    isAllowWorkingHours:''
                },
                winRateData:[],
                orgCodeData:[],
                statusData:[],
                isAllowWorkingHoursData:[
                    {
                        label:'是',
                        value:true
                    },
                    {
                        label:'否',
                        value:false
                    }
                ],
                mysize: 10,
                mypage: 0,
                mysearchData: {},
                myorderBy: '',
                myextData: [],
                myTableData: {
                    searchDataName:'oppoListQueryData',
                    addOppoBtnShow:true,
                    selfListBtnShow:true,
                    listExportBtnShow:true,
                    addBtnName:'新增商机',
                    nodeCode: "499645764230709248",
                    // nodeCode: 11101,
                    url: 'project/getOppoList',
                    dlUrl: 'project/delOppoList.do',
                    viewName: 'viewOppoManagement',
                    editName: 'addOppoProject',
                    addName:'addOppoProject',
                    exportName:'商机信息管理.xlsx',
                    customStyleData:['oppoTableThead','oppoCheckedThreadData'],
                    tableThead: [
                        {
                            headName: '商机编号',
                            headKey: 'oppoNum',
                            isNeedFix:true,
                            isFirstColumn:true,
                            width:'40',
                        },

                        {
                            headName: '机会名称',
                            headKey: 'oppoProjectName',
                            width:100,
                            isNeedTips:true
                        },
                        {
                            headName: '客户名称',
                            headKey: 'customerName',
                            width:100,
                            isNeedTips:true
                        },
                        {
                            headName: '销售',
                            headKey: 'saleName',
                            width:40

                        },
                        {
                            headName: '售前经理',
                            headKey: 'preMangerName',
                            width:40
                        },
                        {
                            headName: '创建时间',
                            headKey: 'createTime',
                            isTimeData:true,
                            width:50
                        },
                        {
                            headName: '预计签订时间',
                            headKey: 'expectedTimeTosign',
                            isTimeData:true,
                            width:50
                        },
                        {
                            headName: '赢单率',
                            headKey: 'winRate',
                            dirKey: '赢单率',
                            width:35
                        },
                        {
                            headName: '状态',
                            headKey: 'status',
                            dirKey: '商机状态',
                            width:50
                        },
                        {
                            headName: '最后修改时间',
                            headKey: 'lastmodifiedTime',
                            isHidden: true,
                            isTimeData:true
                        },
                        {
                            headName: '创建人',
                            headKey: 'createBy',
                            isHidden: true,
                            isPersonData:true
                        },
                        {
                            headName: '最后修改人',
                            headKey: 'lastmodifiedBy',
                            isHidden: true,
                            isPersonData:true
                        },
                        {
                            headName: '所属部门',
                            headKey: 'orgName',
                            isHidden: true
                        },
                        {
                            headName: '项目总监',
                            headKey: 'pdName',
                            isHidden: true
                        },
                        {
                            headName: 'PMO',
                            headKey: 'pmoName',
                            isHidden: true
                        },
                        {
                            headName: '合同总金额(元)',
                            headKey: 'contractAmount',
                            isAmountFmt:true,
                            isHidden: true,
                            isNumber: true
                        },
                        {
                            headName: '项目开始时间',
                            headKey: 'projectStartTime',
                            isTimeData:true,
                            isHidden: true
                        },
                        {
                            headName: '项目结束时间',
                            headKey: 'projectEndTime',
                            isTimeData:true,
                            isHidden: true
                        },
                        {
                            headName: '关联填报工时',
                            headKey: 'isAllowWorkingHours',
                            isHidden: true
                        },
                        {
                            headName: '备注信息',
                            headKey: 'memo',
                            isHidden: true
                        },
                        {
                            headName:'阶段',
                            headKey:'projectStage',
                            dirKey: '商机阶段',
                            isHidden: true
                        },
                        {
                            headName:'渠道',
                            headKey:'channelName',
                            isHidden: true
                        },
                        {
                            headName:'产品线',
                            headKey:'productLineName',
                            isHidden: true
                        },
                        {
                            headName:'产品',
                            headKey:'productName',
                            isHidden: true
                        }
                    ],
                    checkedThreadData: ['oppoNum','oppoProjectName', 'customerName', 'saleName', 'preMangerName', 'createTime', 'expectedTimeTosign', 'winRate', 'status'],
                    entity:{},
                    myorderBy: ''

                }

            }

        },

        components: {
            myTable
        },
        methods: {

            showMore() {
                if (!this.isShowMore) {
                    this.isShowMore = true;
                } else {
                    this.isShowMore = false;
                }
                setTimeout(()=>{
                    this.$refs.tableProduct.setPaginationStyle();
                },1);
            },
            search() {
                let searchData = {};

                if (this.searchForm.customerId) {
                    searchData.customerId = this.searchForm.customerId
                }
                if (this.searchForm.saleName) {
                    searchData.saleName = this.searchForm.saleName;
                }
                if (this.searchForm.oppoProjectName) {
                    searchData.oppoProjectName = this.searchForm.oppoProjectName;
                }
                if (this.searchForm.winRate) {
                    searchData.winRate = this.searchForm.winRate;
                }
                if (this.searchForm.orgCode) {
                    searchData.orgCode = this.searchForm.orgCode;
                }
                if (this.searchForm.status) {
                    searchData.status = this.searchForm.status;
                }
                searchData.isAllowWorkingHours = this.searchForm.isAllowWorkingHours;


                this.$store.state.oppoListQueryData = searchData;
                this.myTableData.entity=searchData;
                this.$refs.tableProduct.findAllProject(1);
            },

            makeDataDictionary: function () {
                //客户名称
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'sysConfig/getCustomerList' + window.suffix,
                    data: {
                        "entity": {},
                        "orderBy": "customerName asc"
                    }
                }).then(res => {

                    var resArry = [];
                    for (var items in res.data.rows) {
                        resArry.push({
                            label: res.data.rows[items].customerName,
                            value: res.data.rows[items].id
                        });
                    }
                    this.customerIdData = resArry;
                });
                //获取部门下拉数据
                this.$myHttp({
                    method: 'GET',
                    url: this.prefix + 'org/getAllOrgs' + window.suffix,
                    /* data:{}*/
                }).then(res => {
                    console.log(res);
                    var resArry = [];
                    for(var items in res.data.content ){
                        resArry.push({
                            label:res.data.content[items].orgName,
                            value:res.data.content[items].orgCode,
                        });
                    }
                    this.orgCodeData = resArry;
                });
                //赢单率

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "赢单率"
                        }
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
                    this.winRateData = resArry;
                });

                //商机状态
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "商机状态"
                        }
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
                    this.statusData = resArry;
                });
            }
        },
        filters: {

        },
        mounted: function () {
            //表格外部按钮权限控制
            // this.$set(this.myTableData,'addOppoBtnShow',Boolean(document.getElementById('addOppoBtn')));
            // this.$set(this.myTableData,'selfListBtnShow',Boolean(document.getElementById('selfListBtn')));
            // this.$set(this.myTableData,'listExportBtnShow',Boolean(document.getElementById('listExportBtn')));
            //表格内部按钮权限控制
            this.$set(this.myTableData,'viewBtnHidden',!Boolean(document.getElementById('viewOrNot')));
            this.$set(this.myTableData,'editBtnHidden',!Boolean(document.getElementById('editOrNot')));
            this.$set(this.myTableData,'delBtnHidden',!Boolean(document.getElementById('delOrNot')));
            //生成当前页面需要的数据字典内容
            this.makeDataDictionary();
            if(this.$store.state.oppoListQueryData){
                this.searchForm = this.$store.state.oppoListQueryData;
                this.myTableData.entity=this.searchForm;
                this.$refs.tableProduct.findAllProject(1);
            }
            if (this.$route.params.currentPage) {
                this.currentPage = this.$route.params.currentPage;
            }

        },
        computed: {

        }
    }
</script>
