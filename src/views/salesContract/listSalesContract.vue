<template>
    <div>
        <el-col :span="24" style="background-color: white;padding:10px 20px;">
            <h2>
                <span style="float:left;height:32px;line-height: 32px;font-weight: normal;font-size: 14px;">销售合同管理</span>
                <div class="tableBtn" style="float:right;padding:0;">
                    <el-button v-hasPermission="'addSalesContract'" @click="addSalesContract()" icon="el-icon-circle-plus-outline" size="small" type="primary">新增
                    </el-button>
                    <el-button @click="customColumn()" type="danger" size="small" style="margin-top: 10px;margin-bottom: 5px">
                        <i style="margin-right: 5px" class="el-icon-rank"></i>自定义列表
                    </el-button>
                    <el-button @click="exportExcel()" type="success" size="small" style="margin-top: 10px;margin-bottom: 5px">
                        <i style="margin-right: 5px" class="el-icon-document"></i>报表导出
                    </el-button>
                    <!--<el-button v-hasPermission="'enableRole'" @click="enableRoleManagement('Y')" icon="el-icon-circle-check-outline" size="small" type="primary">启用-->
                    <!--</el-button>-->
                    <!--<el-button v-hasPermission="'unableRole'" @click="enableRoleManagement('N')" icon="el-icon-circle-close-outline" size="small" type="primary">停用-->
                    <!--</el-button>-->
                </div>
            </h2>
            <el-form ref="form" v-model="searchForm" label-width="80px" style="overflow: hidden;margin-bottom: 10px;">
                <el-col :span="6" :xs="20">
                    <el-form-item label="项目编号">
                        <el-input v-model="searchForm.projectId" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="6" :xs="20">
                    <el-form-item label="销售合同号" label-width="100px">
                        <el-input v-model="searchForm.salesContractNumber" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="合同金额">
                        <el-input v-model="searchForm.contractAmount" style="width: 90%" placeholder="请输入" size="small"></el-input>

                    </el-form-item>
                </el-col>


                <el-col :span="4" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()" round>
                        查询
                    </el-button>
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-refresh" size="small" @click="clearSearch()" round>
                        清空
                    </el-button>
                    <el-button icon="el-icon-plus" @click="showMore()" circle></el-button>
                    <!--<el-button style="margin-top: 5px" type="primary" size="small" @click="showMore()">展开更多</el-button>-->
                </el-col>
            </el-form>
            <el-form ref="form" :model="searchForm" label-width="80px" style="margin-bottom: 20px"
                     v-show="isShowMore">

                <el-col :span="6" :xs="20">
                    <el-form-item label="销售主体">
                        <el-input v-model="searchForm.salesSubject" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="客户名称">
                        <el-input v-model="searchForm.clientName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="销售经理">
                        <el-input v-model="searchForm.salesManager" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="项目经理">
                        <el-input v-model="searchForm.projectManager" placeholder="请输入" style="width: 90%" size="small"></el-input>
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
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    import myTable from '../../components/myTable.vue'
    export default {
        data() {
            return {
                myTableData: {
                    searchDataName:'projectListSearchData',
                    addOppoBtnShow:true,
                    selfListBtnShow:true,
                    listExportBtnShow:false,
                    nodeCode: '516646216998584320',
                    url: 'project/salesContract/list',
                    dlUrl: 'project/salesContract/del',
                    viewName: 'viewSalesContract',
                    editName: 'addSalesContract',
                    exportName: '销售合同管理.xlsx',
                    customStyleData:['salesContractTableThead','salesContractCheckedThreadData'],
                    checkedThreadData:['salesContractNumber','contractAmount','salesSubject','clientName',
                        'contractTime','billingTime','billingAmount','taxPoint','invoiceRecipient',
                        'invoiceSendTime','originalContract','moneyReceiveTime','moneyReceiveAmount',
                        'tenderFeeApplicationNumber','tenderFeeApplicationNumberAmount','tenderBailReturn',
                        'tenderBailReturnTime','projectName',
                        'salesManager','projectId','projectManager'],
                    isFixRight:true,
                    tableThead: [
                        {
                            headName: '销售合同号',
                            headKey: 'salesContractNumber',
                            //width:100,
                            isFirstColumn:true,
                            isNeedFix:true,
                            isNeedTips:true
                        },
                        {
                            headName: '合同金额',
                            headKey: 'contractAmount',
                            formatFilNew:'contractAmount',
                            align:"right",
                            width:50,
                            isNumber:true
                        },
                        {
                            headName: '销售主体',
                            headKey: 'salesSubject',
                            //isTimeData:true,
                            width:150
                        },
                        {
                            headName: '客户名称',
                            headKey: 'clientName',
                            width:150
                        },
                        {
                            headName: '合同签订时间',
                            headKey: 'contractTime',
                            width:80,
                            isTimeData:true
                        },
                        {
                            headName: '开票时间',
                            headKey: 'billingTime',
                            width:80,
                            isTimeData:true
                        },
                        {
                            headName: '开票金额',
                                headKey: 'billingAmount',
                            formatFilNew:'contractAmount',
                            align:"right",
                            width:50,
                            isNumber:true
                        },
                        {
                            headName: '税点',
                                headKey: 'taxPoint',
                            dirKey:'taxRateWithPercent',
                            //isContractRateFmt:true,
                            width:50,
                            isNumber:true
                        },
            {
                headName: '发票寄送单号',
                    headKey: 'invoiceRecipient',
                width:80
            }, {
                headName: '发票寄出时间',
                    headKey: 'invoiceSendTime',
                    width:80,
                            isTimeData:true
            },
            {
                headName: '合同正本',
                    headKey: 'originalContract',
                    width:50
            },
            {
                headName: '收款时间',
                    headKey: 'moneyReceiveTime',
                width:80,
                            isTimeData:true
            },
            {
                headName: '收款金额',
                    headKey: 'moneyReceiveAmount',
                formatFilNew:'contractAmount',
                align:"right",
                width:50,
                isNumber:true
            },{
                headName: '投标费用申请单号',
                    headKey: 'tenderFeeApplicationNumber',
                    width:80
            },{
                headName: '投标费用申请单额度',
                    headKey: 'tenderFeeApplicationNumberAmount',
                    formatFilNew:'contractAmount',
                    align:"right",
                    width:100,
                            isNumber:true
            },{
                headName: '投标保证金返还',
                    headKey: 'tenderBailReturn',
                    dirKey:'是否',
                    width:80
            },
            {
                headName: '保证金应返还时间',
                    headKey: 'tenderBailReturnTime',
                width:80,
                            isTimeData:true
            },
                        {
                            headName: '销售经理',
                            headKey: 'salesManager',
                            width:50
                        },
                        {
                            headName: '项目编号',
                            width:'40',
                            headKey: 'projectId'
                        },
                        {
                            headName: '项目名称',
                            width:'100',
                            //isNeedFix:true,
                            headKey: 'projectName'
                        },
                        {
                            headName: '项目经理',
                            headKey: 'projectManager',
                            width:50
                        }
                    ],
                    entity:{},
                    myorderBy: ''
                },
                //isShowMore: false,
                currentPage: 1,
                total:null,
                pagesize: 15,
                isShowMore: false,
                searchForm: {
                    projectId: '',
                    salesContractNumber: '',
                    contractAmount: '',
                    salesSubject: '',
                    clientName: '',
                    salesManager: '',
                    projectManager: ''
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
            //自定义列
            customColumn() {
                this.$refs.tableOppoList.customColumn();
            },
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
            addSalesContract: function () {
                this.$router.push({
                    name: 'addSalesContract'
                })
            },
            ///报表导出
            exportExcel() {
                console.log("fuck---------------------");
                this.$refs.tableOppoList.exportTableList();
            },
            clearSearch(){
                this.searchForm.projectId = '';
                this.searchForm.salesContractNumber = '';
                this.searchForm.contractAmount = '';
                this.searchForm.salesSubject = '';
                this.searchForm.clientName = '';
                this.searchForm.salesManager = '';
                this.searchForm.projectManager = '';
                this.search();
            },
            search() {
                let searchData = {};
                if (this.searchForm.projectId) {
                    searchData.projectId = this.searchForm.projectId
                }
                if (this.searchForm.salesContractNumber) {
                    searchData.salesContractNumber = this.searchForm.salesContractNumber
                }
                if (this.searchForm.contractAmount) {
                    searchData.contractAmount = this.searchForm.contractAmount
                }
                if (this.searchForm.salesSubject) {
                    searchData.salesSubject = this.searchForm.salesSubject
                }
                if (this.searchForm.clientName) {
                    searchData.clientName = this.searchForm.clientName
                }
                if (this.searchForm.salesManager) {
                    searchData.salesManager = this.searchForm.salesManager
                }
                if (this.searchForm.projectManager) {
                    searchData.projectManager = this.searchForm.projectManager
                }
                // if (this.searchForm.pdId) {
                //     searchData.pdId = this.searchForm.pdId
                // }
                this.myTableData.entity=searchData;

                this.$store.state.projectListSearchData = searchData;
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

            if(this.$store.state.projectListSearchData){
                this.searchForm = this.$store.state.projectListSearchData
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
    h2{
        overflow: hidden;
        padding: 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
    }
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
