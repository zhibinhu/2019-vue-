<template>
    <div>
        <el-col :span="24" style="background-color: white">
            <el-form ref="form" :model="searchForm" label-width="150px" style="margin-top: 20px;margin-bottom: 20px;padding-left:10px;">
                <el-row>
                    <el-col :span="6" :xs="20" label-width="150px">
                        <el-form-item label="审批状态" prop="status">
                            <el-select v-model="searchForm.status" placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in statusData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :xs="20">
                        <el-form-item label="报销人"  prop="cname">
                            <el-input v-model="searchForm.cname" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :xs="20" >
                        <el-form-item label="费用种类" prop="expenseFor">
                            <el-select v-model="searchForm.expenseFor" placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in expenseData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :xs="20">
                        <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                            查询
                        </el-button>

                        <el-button :span="3" :xs="20" type="primary" size="small" @click="showMore()">展开更多</el-button>
                    </el-col>
                </el-row>
            </el-form>

            <el-form ref="form" :model="searchForm" label-width="150px" style="margin-top: 20px;margin-bottom: 20px;padding-left:10px;"
                     v-show="isShowMore">
                <el-row>
                    <el-col :span="6" :xs="20">
                        <el-form-item label="单据编号" prop="documentNo">
                            <el-input v-model="searchForm.documentNo" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :xs="20">
                        <el-form-item label="报销人所在部门"  prop="reserve2">
                            <el-input v-model="searchForm.reserve2" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :xs="20">
                        <el-form-item label="报销金额" prop="expenseAmount">
                            <el-input v-model="searchForm.expenseAmount" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="6" :xs="20">
                        <el-form-item label="报销开始月份" prop="startTime">
                            <el-date-picker
                                    v-model="searchForm.startTime"
                                    size="small"
                                    type="month"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择月份" style="width: 90%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :xs="20">
                        <el-form-item label="报销结束月份" prop="endTime">
                            <el-date-picker
                                    v-model="searchForm.endTime"
                                    size="small"
                                    type="month"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions0"
                                    start-placeholder="form.startTime"
                                    placeholder="选择月份" style="width: 90%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                   <!-- <el-col :span="6" :xs="60">
                        <el-form-item label="出差事由"  prop="reason">
                            <el-input v-model="searchForm.reason" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>-->
                </el-row>
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
                statusData:[],
                currentPage: 1,
                pagesize: 15,
                total: null,
                expenseData:[],
                isShowMore: false,
                pickerOptions0: this.endTime(),
                searchForm: {
                    documentNo: '',//文件编号
                    status: '',//状态
                    expenseFor:'',
                    applyUser:{
                        cname:""
                    }

                },
                myorderBy: '',
                myTableData: {
                    url: 'expense/getExpenseAccount',
                    dlUrl: 'expense/delExpenseAccount.do',
                    viewName: 'viewExpenseAccount',
                    viewName2:'viewExpenseBusiness',
                    editName: 'editExpenseAccount',
                    editName2: 'editExpenseBusiness',
                    addName:'addExpenseAccount',
                    addName2:'addExpenseBusiness',
                    nodeCode: '513697710159691776',
                    addButtonName:'新增差旅报销',
                    addBtnName:'新增非差旅报销',
                    isFixRight:true,
                    isHiddenEdit:true,
                    isHiddenView:true,
                    isHiddenView2:true,
                    isHiddenEdit2:true,
                    tableThead: [
                        {
                            headName: '单据编号',
                            headKey: 'documentNo',
                            isNeedFix:true,
                            isFirstColumn:true
                        },

                        {
                            headName: '报销人',
                            headKey: 'reserve1',
                            isNeedTips:true,
                            width:40
                        },
                        {
                            headName: '报销人所在部门',
                            headKey: 'reserve2',
                        },
                        {
                            headName: '报销申请日期',
                            headKey: 'applyDate',
                            width:60

                        },
                        {
                            headName: '费用类型',
                            headKey: 'expenseFor',
                            dirKey:"报销类型",
                            width:60

                        },
                        {
                            headName: '报销月份',
                            headKey: 'reserve4',
                            width:50
                        },
                        {
                            headName: '本次报销金额',
                            headKey: 'expenseAmount',
                            formatFilNew:'totalAmount',
                            align:'right',
                            isNumber:true,
                            width:55
                        },
                        {
                            headName: '审批状态',
                            headKey: 'status',
                            dirKey:'审批状态',
                            width:40
                        },
                        {
                            headName: '当前节点',
                            headKey: 'processUser',
                            width:60
                        }
                    ],
                    checkedThreadData: ['documentNo','applyDate', 'expenseFor', 'status'],
                    entity:{
                    },
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
                let searchRange = [];
                let searchWhere = [];
                this.myTableData.where = [];
                this.myTableData.range = [];
                if (this.searchForm.documentNo) {
                    searchData.documentNo = this.searchForm.documentNo
                }
                if (this.searchForm.status) {
                    searchData.status = this.searchForm.status;
                }
                if (this.searchForm.expenseFor) {
                    searchData.expenseFor = this.searchForm.expenseFor;
                }

                if (this.searchForm.cname) {
                    searchData.cname = this.searchForm.cname
                }

                if (this.searchForm.reserve2) {
                    searchData.reserve2 = this.searchForm.reserve2
                }
                if (this.searchForm.expenseAmount) {
                    searchData.expenseAmount = this.searchForm.expenseAmount;

                    //searchWhere = [{'field': 'expenseAmount', 'value': this.searchForm.expenseAmount, 'opt': "=", "assemble":'and'}];
                }
                let moment = require('moment');
                if(this.searchForm.startTime){
                    //获取当前时间
                    let date=new Date(this.searchForm.startTime);
                    //获取当前月的第一天
                    let monthStart = date.setDate(1);
                    let firstDay = moment(monthStart).format("YYYY-MM-DD");
                    this.searchForm.startTime = firstDay
                }
                if(this.searchForm.endTime){
                    //获取当前时间
                    let date=new Date(this.searchForm.endTime);
                    //获取当前月
                    let currentMonth=date.getMonth();
                    //获取到下一个月，++currentMonth表示本月+1，一元运算
                    let nextMonth=++currentMonth;
                    //获取到下个月的第一天
                    let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
                    //一天时间的毫秒数
                    let oneDay=1000*60*60*24;
                    //nextMonthFirstDay-oneDay表示下个月的第一天减一天时间的毫秒数就是本月的最后一天
                    let lastDay = moment(nextMonthFirstDay-oneDay).format("YYYY-MM-DD");
                    this.searchForm.endTime = lastDay;
                }
                console.log(this.searchForm.endTime + "----" + this.searchForm.startTime)
                if (this.searchForm.startTime && this.searchForm.endTime) {
                    searchRange = [{'field': 'lastmodifiedTime', 'from': this.searchForm.startTime, 'to': this.searchForm.endTime}];
                    searchData.status = "1";
                    //searchWhere = [{'field': 'status', 'value': "1", 'opt': "=", "assemble":'and'}];
                } else if (this.searchForm.startTime) {
                    //searchWhere = [{'field': 'status', 'value': "1", 'opt': "=", "assemble":'and'}];
                    searchRange = [{'field': 'lastmodifiedTime', 'from': this.searchForm.startTime, 'to': '2100-01-01'}];
                    searchData.status = "1";
                } else if (this.searchForm.endTime) {
                    //searchWhere = [{'field': 'status', 'value': "1", 'opt': "=", "assemble":'and'}];
                    searchRange = [{'field': 'lastmodifiedTime', 'from': '1900-01-01', 'to': this.searchForm.endTime}];
                    searchData.status = "1";
                }

                this.myTableData.entity=searchData;
                this.myTableData.where = searchWhere;
                this.myTableData.range = searchRange;
                this.$refs.tableProduct.findAllProject(1);
            },

            makeDataDictionary () {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix, /* 选择客户，自动带出销售 */
                    data: {
                        "entity": {
                            "dtype": "报销类型"
                        },
                    }
                }).then(res => {
                    // 成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label: res.data.rows[items].dvalue,
                            value: res.data.rows[items].dkey
                        })
                    }
                    this.expenseData = resArry;
                });

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "审批状态"
                        },
                    }
                }).then(res => {// 成功回调方法
                    var resArry = [];
                    resArry.push({
                        label: "全部",
                        value: ""
                    })
                    for(var items in res.data.rows){
                        if(res.data.rows[items].dkey != "0") {
                            resArry.push({
                                label: res.data.rows[items].dvalue,
                                value: res.data.rows[items].dkey
                            })
                        }
                    }
                    this.statusData = resArry;
                });
            },

            /**
             * 校验结束时间选项
             */
            endTime () {
                var that = this;
                return {
                    disabledDate (time) {
                        if (that.searchForm.startTime) {
                            return new Date(that.searchForm.startTime).getTime() >= time.getTime();
                        } else {

                        }
                    }
                };
            },
        },
        filters: {

        },
        mounted: function () {
            //生成当前页面需要的数据字典内容
           /* if(this.$store.state.oppoListSearchData){
                this.searchForm = this.$store.state.oppoListSearchData
            }*/
            if (this.$route.params.currentPage) {
                this.currentPage = this.$route.params.currentPage;
            }
            this.makeDataDictionary();
        },
        computed: {

        }
    }
</script>
