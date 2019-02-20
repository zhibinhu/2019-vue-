<style>
    .el-range-editor--small .el-range-separator{padding: 0;width: 18px;}
</style>
<template>
    <div>
        <el-col :span="24" style="background-color: white;margin-bottom: 10px">

               <!-- <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
                    项目工时审批
                </h2>-->
                <el-form ref="form" :model="searchFormPro" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                    <el-col :span="6" :xs="20">
                        <el-form-item label="项目名称">
                            <el-input v-model="searchFormPro.projectName" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :xs="20">
                        <el-form-item label="项目经理">
                            <el-input v-model="searchFormPro.pmName" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :xs="20">
                        <el-form-item label="客户名称">
                            <el-input v-model="searchFormPro.customerName" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" :xs="20">
                        <el-checkbox v-model="checked" style="margin-top: 8px">待审批</el-checkbox>
                    </el-col>
                    <!--<el-col :span="6" :xs="20">
                        <el-form-item label="项目类型" prop="projectType">
                            <el-select v-model="searchFormPro.projectType" placeholder="请选择" clearable size="small" style="width: 95%">
                                <el-option
                                        v-for="item in projectTypeData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>-->
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="searchPro()">查询</el-button>

                </el-form>
        </el-col>
        <el-table border stripe show-summary
                  :summary-method="getSummaries"
                  ref="multipleTable"
                  :data="tableDataPro"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="400"
                  :header-cell-style="{textAlign:'center'}"
                  size="small"
                  @selection-change="handleSelectionChange">

                    <!--<el-table-column-->
                            <!--type="selection"-->
                            <!--width="55"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="project"
                            label="项目编号"  width="90">
                        <template slot-scope="scope">
                            <p  v-if="scope.row.project" style="text-decoration:underline;cursor: pointer" @click=handlePro(scope.row)>{{scope.row.project.projectNum}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="project"
                            label="项目名称"
                            width="220">
                        <template slot-scope="scope">
                            <p  v-if="scope.row.project">{{scope.row.project.projectName}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="project"
                            label="客户名称"
                            width="220">
                        <template slot-scope="scope">
                            <p  v-if="scope.row.project">{{scope.row.project.customerName}}</p>
                        </template>
                    </el-table-column>
                   <!-- <el-table-column
                            prop="project"
                            label="项目类型">
                        <template slot-scope="scope">
                            <p  v-if="scope.row.project">{{scope.row.project.projectType|projectTypeFil}}</p>
                        </template>
                    </el-table-column>-->
                    <el-table-column
                            prop="project"
                            label="项目经理" width="80">
                        <template slot-scope="scope">
                            <p  v-if="scope.row.project">{{scope.row.project.pmName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="effortBudgetAmount" align="right" width="130"
                            label="人力成本预算（元）"
                    >
                        <template slot-scope="scope">
                            <p v-if="scope.row.project">{{scope.row.effortBudgetAmount|amountFil}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="feeEffort" align="right" width="130"
                            label="累计人力成本（元）" >
                        <template  slot-scope="scope">
                            <span   v-if="scope.row.project">{{scope.row.feeEffort|amountFil}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pendingApproveFeeEffort" align="right" width="145"
                            label="待审批人力成本（元）" >
                        <template  slot-scope="scope">
                            <span>{{scope.row.pendingApproveFeeEffort|amountFil}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="feeBudget" align="center" width="130"
                            label="项目费用预算（元）" >
                        <template slot-scope="scope">
                           <!-- <p>{{scope.row.feeBudget|formatFil }}</p>--> <p v-if="scope.row.project">-</p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="feeCur" align="center" width="130"
                            label="累计项目费用（元）" >
                        <template  slot-scope="scope">
                          <!--  <span  :style="scope.row.feeCur> scope.row.feeBudget ?'color: red':''">{{scope.row.feeCur}}</span>-->
                            <p v-if="scope.row.project">-</p>
                        </template>
                    </el-table-column>

                </el-table>
        <el-pagination
                layout="total,sizes,prev, pager, next,jumper"
                :total="total"
                @current-change="currentChange"
                @size-change="sizeChange"
                :current-page="mypage"
                :page-size="mysize"
                style="background-color: white"
        >
        </el-pagination>


    </div>
</template>
<script>
    export default {
        data () {
            return {
                valuePro:[],
                tableDataPro: [

                ],
                currentPage: 1,
                total:null,
                pagesize: 15,
                searchFormPro: {
                    projectName: '',
                    customerName:'',
                    pmName:''
                },
                projectTypeData:[
                    {
                        label: '内部项目',
                        value: '8'
                    },
                    {
                        label: '外部项目',
                        value: '5'
                    }
                ],
                isShowMore:false,
                total:null,
                mysize: 10,
                mypage: 0,
                entity:{},
                ext:" ",
                checked:false
            }
        },
        created(){
           /* this.makeDataDictionary();*/
            this.findProjectTotal();
        },
        filters: {
            TimeFil:function(value){
                if(value){
                    return value.substr(0,10)
                }
            },
            projectTypeFil:function(value){
                if (value == '5') {
                    return '外部项目'
                } else if (value == '8') {
                    return '内部项目'
                }
            },
            formatFil:function(value){
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                if(value){
                    var value=Math.round(parseFloat(value/1000)*100)/100;
                    var xsd=value.toString().split(".");
                    if(xsd.length==1){
                        value=value.toString().replace(pattern, ',')+".00";
                        return value;
                    }
                    if(xsd.length>1){
                        if(xsd[1].length<2){
                            value=value.toString().replace(pattern, ',')+"0";
                        }
                        return value;
                    }
                }
            }
        },
        methods: {
            returnFloat(value){
                if(value){
                    const pattern = /(?=((?!\b)\d{3})+$)/g;
                    var value = Math.round(parseFloat(value) * 100) / 100;
                    var xsd = value.toString().split(".");
                    if (xsd.length == 1) {
                        value = value.toString().replace(pattern, ',') + ".00";
                        return value;
                    }
                    if (xsd.length > 1) {
                        if (xsd[1].length < 2) {
                            value = value.toString().replace(pattern, ',') + "0";
                        }
                        return value;
                    }
                }

            },
            getSummaries(param) {
                const { columns, data } = param;

                const sums = [];
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                const resData = [];

                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index === 1||index === 2||index === 3||index === 4) {
                        sums[index] = '';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += '';
                    } else {
                        sums[index] = '';
                    }

                });


                for(const items in sums){
                    if(sums[items]!== ""){
                        sums[items] = ((sums[items]/1000)).toString();
                    }

                    resData.push(this.returnFloat(sums[items]));
                }
                resData[0] = "合计";

                resData[9] = "-";
                resData[8] = "-";



                return resData;

            },

            toProjectApprove: function () {
                this.$router.push({
                    name: 'addOppoProject'
                })
            },
            sizeChange(size) {
                this.mypage = 0;
                this.mysize = size;
                this.findProjectTotal();
                this.ref = true;
            },
            currentChange(page) {
                this.mypage = page - 1;
                this.findProjectTotal();
                this.ref = true;
                this.mypage = page;
            },
            toggleSelection (rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row)
                    })
                } else {
                    this.$refs.multipleTable.clearSelection()
                }
            },
            handleSelectionChange (val) {
                this.multipleSelection = val
            },
            handleCommand(command) {
                this.$message('click on item ' + command);
            },
            showMore(){
                if(!this.isShowMore){
                    this.isShowMore = true;
                }else {
                    this.isShowMore = false;
                }
            },
            findProjectTotal(){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix+"viewWorkhour/getViewProjTotal"+window.suffix,
                   /* url:'http://192.168.99.38:9001/viewWorkhour/getViewProjTotal',*/
                    data: {
                        "entity": this.entity,
                        "ext": this.ext,
                        "pageNum": this.mypage,
                        "pageSize": this.mysize,
                        "orderBy": ""
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableDataPro=res.data.rows;
                    this.total=Number(res.data.total);
                })
            },
            /*项目工时搜索*/
            searchPro(){
                var _this = this;
                var searchData = {};
                if(this.searchFormPro.projectName){
                    searchData.projectName = _this.searchFormPro.projectName
                }
                if(this.searchFormPro.customerName){
                    searchData.customerName = _this.searchFormPro.customerName
                }
                if(this.searchFormPro.pmName){
                    searchData.pmName = _this.searchFormPro.pmName
                }
                if(this.checked==true){
                    this.ext="1";
                }else{
                    this.ext=" ";
                }
                this.entity = {
                    "project":searchData
                };
                this.findProjectTotal();
            },


            /*跳到项目工时审批审批二级页面*/
            handlePro(row){
                var starMonth;
                var endMonth;
                var randMonth;
                if(row.project.projectStartTime==undefined||row.project.projectStartTime==null){
                    starMonth=0;
                }else{
                    starMonth=Number(row.project.projectStartTime.slice(5,7));
                }

                if(row.project.projectEndTime==undefined||row.project.projectEndTime==null){
                    endMonth=starMonth;
                }else{
                    endMonth=Number(row.project.projectEndTime.slice(5,7));
                }
                if(endMonth-starMonth<0){
                    randMonth=1;
                }else if(endMonth-starMonth>0){

                    randMonth=endMonth-starMonth+1;
                }else{
                    randMonth=1;
                }
                this.$router.push({
                    "name": 'oneProjectHoursList',
                    "query":{
                        "projectName":row.project.projectName,
                        "projectNum":row.project.projectNum,
                        "feeEffortBudget":row.effortBudgetAmount,
                        "monthLength":randMonth,
                        "projectType":row.project.projectType
                    }
                })
            },

            makeDataDictionary:function () {
                var _this = this;
                //项目类型
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
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
            },
        }

    }
</script>