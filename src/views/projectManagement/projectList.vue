<template>
    <div>
        <el-col :span="24" style="background-color: white">

            <el-form ref="form" v-model="searchForm" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="5" :xs="20">
                    <el-form-item label="项目名称">
                        <el-input v-model="searchForm.projectName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="5" :xs="20">
                    <el-form-item label="项目经理">
                        <el-input v-model="searchForm.pmName" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>

                <el-col :span="5" :xs="20">
                    <el-form-item label="项目类型">

                        <el-select v-model="searchForm.projectType" placeholder="请选择" clearable filterable  size="small" style="width: 95%">
                            <el-option
                                    v-for="item in projectTypeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="项目状态" prop="projectState">
                        <el-select v-model="searchForm.projectState" placeholder="请选择" size="small" clearable style="width: 95%">
                            <el-option
                                    v-for="item in projectStateData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                        查询
                    </el-button>
                    <el-button style="margin-top: 5px" type="primary" size="small" @click="showMore()">展开更多</el-button>
                </el-col>
            </el-form>
            <el-form ref="form" :model="searchForm" label-width="80px" style="margin-bottom: 20px"
                     v-show="isShowMore">
                <el-col :span="5" :xs="20">
                    <el-form-item label="客户名称" prop="customerId">
                        <el-select v-model="searchForm.customerId" clearable placeholder="请选择" filterable  size="small" style="width: 95%">
                            <el-option
                                    v-for="item in customerIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="计费类型" prop="feeType">
                        <el-select v-model="searchForm.feeType" placeholder="请选择" size="small" clearable style="width: 95%">
                            <el-option
                                    v-for="item in feeTypeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="PMO">
                        <el-select v-model="searchForm.pmoId" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in pmoIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="项目总监">
                        <el-select v-model="searchForm.pdId" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in pdIdData"
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
            <!--v-hasPermission="'projectAddBtn'"-->
            <!--v-hasPermission="'projectSelfListBtn'"-->
            <!--v-hasPermission="'projectListExportBtn'"-->
            <el-button v-show="false"  id="addOppoBtn" type="primary">新增项目</el-button>
            <el-button v-show="false"  id="selfListBtn" type="primary">自定义列表</el-button>
            <el-button v-show="false"  id="listExportBtn" type="primary">报表导出</el-button>
        </div>
        <div class="tableBtnControl">
            <el-button v-show="false"  id="viewOrNot" type="primary" v-hasPermission="'projectViewBtn'">查看</el-button>
            <el-button v-show="false"  id="editOrNot" type="primary" v-hasPermission="'projectEditBtn'">编辑</el-button>
            <el-button v-show="false"  id="delOrNot" type="primary" v-hasPermission="'projectDelBtn'">删除</el-button>
        </div>
        <my-table ref="tableOppoList" :myTableData="myTableData"></my-table>
    </div>

</template>


<script>
    import util from  '../../libs/util'

    import myTable from '../../components/myTable.vue'
    export default {
        data() {
            return {
                myTableData: {
                    searchDataName:'projectListQueryData',
                    addOppoBtnShow:true,
                    selfListBtnShow:true,
                    listExportBtnShow:true,
                    addBtnName:'新增项目',
                    nodeCode: '499646107643543552',
                    url: 'project/getProjectList',
                    dlUrl: 'project/delProject',
                    viewName: 'viewProjectDetails',
                    editName: 'projectApprove',
                    addName: 'projectApprove',
                    exportName: '项目信息管理.xlsx',
                    custom:'true',
                    customStyleData: ['proTableThead', 'proCheckedThreadData'],
                    tableThead: [
                        {
                            headName: '项目编号',
                            isFirstColumn:true,
                            width:'40',
                            isNeedFix:true,
                            headKey: 'projectNum'
                        },
                        {
                            headName: '项目名称',
                            headKey: 'projectName',
                            width:100,
                            isNeedTips:true
                        },
                        {
                            headName: '项目状态',
                            headKey: 'projectState',
                            dirKey:'项目状态',
                            width:40
                        },
                        {
                            headName: '合同签订时间',
                            headKey: 'contractSignTime',
                            isTimeData:true,
                            width:50
                        },
                        {
                            headName: '项目经理',
                            headKey: 'pmName',
                            width:50
                        },
                        {
                            headName: 'PMO',
                            headKey: 'pmoName',
                            width:50
                        },
                        {
                            headName: '项目类型',
                            headKey: 'projectType',
                            dirKey: 'projectType',
                            //isProjectFmt:true,
                            width:50
                        },
                        {
                            headName: '计费类型',
                            headKey: 'feeType',
                            dirKey:'计费类型',
                            isHidden: true
                        },
                        {
                            headName: '签订部门',
                            headKey: 'signOrgName',
                            width:60,
                            isNeedTips:true
                        },
                        {
                            headName: '销售人员',
                            headKey: 'saleName',
                            width:40
                        },
                        {
                            headName: '合同总金额(元)',
                            headKey: 'totalContractAmount',
                            align:'right',
                            width:50,
                            isAmountFmt:true,
                            isNumber:true
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
                            headName: '项目总监',
                            headKey: 'pdName',
                            isHidden: true
                        },
                        {
                            headName: '创建时间',
                            headKey: 'createTime',
                            isHidden: true
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
                            width:50,
                            isHidden: true,
                            isTimeData:true
                        },
                        {
                            headName: '人天总数',
                            headKey: 'totalNumberDays',
                            isHidden: true,
                            isNumber: true
                        },
                        {
                            headName: '合同名称',
                            headKey: 'contractName',
                            isHidden: true,
                            isNeedTips:true

                        },
                        {
                            headName: '合同编号',
                            headKey: 'contractId',
                            isHidden: true,
                            isNeedTips:true

                        },
                        {
                            headName: '客户名称',
                            headKey: 'customerName',
                            isHidden: true,
                            isNeedTips:true
                        },
                        {
                            /* 新加的*/
                            headName: '服务类型',
                            headKey: 'serviceType',
                            dirKey:'服务类型',
                            isHidden: true
                        },
                        {
                            /* 新加的*/
                            headName: '客户签订部门',
                            headKey: 'customerSigningDepartment',
                            isHidden: true
                        },
                        {
                            /* 新加的*/
                            headName: '人力成本总预算(元)',
                            headKey: 'totalHumanCost',
                            isAmountFmt:true,
                            isHidden: true,
                            isNumber: true
                        },
                        {
                            /* 新加的*/
                            headName: '最后修改时间',
                            headKey: 'lastmodifiedTime',
                            isHidden: true
                        },
                        {
                            /* 新加的*/
                            headName: '备注',
                            isNeedTips:true,
                            headKey: 'memo',
                            isHidden: true
                        },
                    ],
                    checkedThreadData: ['projectName','projectState','contractSignTime','pmName','pmoName','projectType','signOrgName','saleName','totalContractAmount'],
                    entity:{},
                    myorderBy: ''
                },
                currentPage: 1,
                total:null,
                pagesize: 15,
                isShowMore: false,
                searchForm: {
                    projectName: '',
                    contractType: '',
                    pmName: '',
                    projectState:'',
                    feeType:'',
                    customerId:'',
                    pmoId:'',
                    pdId:''
                },
                projectStateData:[],
                pdIdData:[],
                feeTypeData:[],
                customerIdData:[],
                pmoIdData:[],
                projectTypeData:[],
                mysize:10,
                mypage:0,
                mysearchData:{},
                myorderBy:'',
                myextData:[],
                serviceTypeData:[],
                mark: true,
            }

        },
        components: {
            myTable
        },
        methods: {
            showMore(){
                if(!this.isShowMore){
                    this.isShowMore = true;
                }else {
                    this.isShowMore = false;
                }
                setTimeout(()=>{
                    this.$refs.tableOppoList.setPaginationStyle();
                },1);
            },



            search() {
                let searchData = {};
                if (this.searchForm.projectName) {
                    searchData.projectName = this.searchForm.projectName
                }
                if (this.searchForm.projectType) {
                    searchData.projectType = this.searchForm.projectType
                }
                if (this.searchForm.pmName) {
                    searchData.pmName = this.searchForm.pmName
                }
                if (this.searchForm.projectState) {
                    searchData.projectState = this.searchForm.projectState
                }
                if (this.searchForm.customerId) {
                    searchData.customerId = this.searchForm.customerId
                }
                if (this.searchForm.feeType) {
                    searchData.feeType = this.searchForm.feeType
                }
                if (this.searchForm.pmoId) {
                    searchData.pmoId = this.searchForm.pmoId
                }
                if (this.searchForm.pdId) {
                    searchData.pdId = this.searchForm.pdId
                }
                this.myTableData.entity=searchData;

                this.$store.state.projectListQueryData = searchData;
                this.$refs.tableOppoList.findAllProject(1);

            },


            makeDataDictionary:function () {

                let _this = this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "项目状态"
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
                    _this.projectStateData = resArry;
                });
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "服务类型"
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.serviceTypeData = res.data.rows;
                });
                //计费类型
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "计费类型"
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
                    _this.feeTypeData = resArry;
                });
                //项目类型
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "项目类型"
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
                    _this.projectTypeData = resArry;
                });
                //PMO
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'userrole/getUsersByRoleCode' + window.suffix,
                    data:{
                        roleCode:'05'
                    }
                }).then(res => {

                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].cname,
                            value:res.data.content[items].id
                        })
                    }

                    this.pmoIdData = resArry;
                });
                //项目总监
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'userrole/getUsersByRoleCode' + window.suffix,
                    data:{
                        roleCode:'03'
                    }
                }).then(res => {

                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].cname,
                            value:res.data.content[items].id
                        })
                    }

                    this.pdIdData = resArry;
                });
                //所有客户
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
                    _this.customerIdData = resArry;
                });
            }
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
            this.makeDataDictionary();

            if(this.$store.state.projectListQueryData){
                this.searchForm = this.$store.state.projectListQueryData;
                this.myTableData.entity=this.searchForm;
                this.$refs.tableOppoList.findAllProject(1);
            }
            if(this.$route.params.currentPage){
                this.currentPage = this.$route.params.currentPage;
            }

        },



        filters:  {

        },
        computed: {

        }

    }
</script>
<style scoped="this">
    .el-button.is-circle{padding: 6px}
    .el-checkbox+.el-checkbox{
        margin-left:0;
    }
    .el-checkbox{
        width: 23%;
        border: 1px solid #ddd;
        background: #E9EAEC;
        padding: 5px 6px;
        border-radius: 5px;
        margin: 0 13px 10px 0;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }

</style>
