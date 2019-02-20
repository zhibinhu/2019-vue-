<template>

    <div>
        <el-col :span="24" style="background-color: white;padding-top: 10px;padding-bottom: 10px;padding-left: 10px;font-size: 13px">
            <span style="margin-right: 10px">{{"项目名称：  "+ projectName}}</span>
            <span>{{"项目编号： " + projectNum}}</span>
            <el-button type="success" size="small" style="position: fixed;right: 20px ;z-index: 100;top: 100px;width: 70px" @click="back()">返回</el-button>
        </el-col>
        <!--暂时隐藏-->
       <!-- <el-col :span="24" style="background-color: white;margin-bottom: 10px">

           &lt;!&ndash; <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
                {{projectNameTitle}}
            </h2>&ndash;&gt;

            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="月份">
                        <el-date-picker
                                v-model="month1"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="月份">
                        <el-date-picker
                                v-model="month2"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-button style="margin-top: 5px;margin-left: 20px" type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
            </el-form>
        </el-col>-->
        <el-table border stripe show-summary :summary-method="getSummaries"
                :data="tableData4.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
                :header-cell-style="{textAlign:'center'}"
                max-height="850"
                size="small"
                ref="multipleTable">
            <el-table-column
                    type="selection" width="50">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="month"
                    label="月份">
                <template slot-scope="scope">
                    <p style="text-decoration:underline;cursor: pointer" @click="handleView(scope.row)">{{scope.row.month}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    fixed
                    prop="peopleTotal"
                    label="总人数（人）"
                    align="right">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="mandayTotal"
                    label="总人天（人天）"
                    align="right">
            </el-table-column>
            <el-table-column
                    prop="feeEffortBudget"
                    label="人力成本预算(元)"
                    align="right">
                <template  slot-scope="scope">
                    <span>{{scope.row.feeEffortBudget | amountFil}}</span>   <!--scope.row.feeEffortBudget|-->
                </template>
            </el-table-column>

            <el-table-column
                    prop="feeEffort"
                    label="人力成本（元）"
                    align="right">
                <template  slot-scope="scope">
                    <!--<span  :style="scope.row.feeEffort> scope.row.feeEffortBudget ?'color: red':''">{{scope.row.feeEffort|amountFil}}</span>-->
                    <span>{{scope.row.feeEffort|amountFil}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pendingApproveFeeEffort" align="right" width="145"
                    label="待审批人力成本（元）" >
                <template  slot-scope="scope">
                    <span>{{scope.row.pendingApproveFeeEffort|formatFil}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeBudget" align="right"
                    label="项目费用预算（元）" >
                <template  slot-scope="scope" >
                   <!-- <span  :style="scope.row.feeCur > scope.row.feeBudget ?'color: red':''">{{scope.row.feeCur|amountFil}}</span>-->
                    <span>-</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="feeCur" align="right"
                    label="累计项目费用（元）">
                <template  slot-scope="scope" >
                   <!-- <span  :style="scope.row.feeCur > scope.row.feeBudget ?'color: red':''">{{scope.row.feeCur|amountFil}}</span>-->
                    <span>-</span>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData4.length"
                style="background-color: white">
        </el-pagination>


    </div>

</template>

<script>
    export default {
        data() {
            return {
                currentPage: 1,
                pagesize: 15,
                tableData4: [
                   /* {month:"2018-05",totalMan:"5",totalManDay:"40",manPowerCumulaCost:"0.00",projectCostBudget:'-',projectCumulativeCost:"-"},
                    {month:"2018-04",totalMan:"4",totalManDay:"28",manPowerCumulaCost:"2000.00",projectCostBudget:'-',projectCumulativeCost:"-"},
                    {month:"2018-03",totalMan:"5",totalManDay:"30",manPowerCumulaCost:"3000.00",projectCostBudget:'-',projectCumulativeCost:"-"},*/
                ],
                searchForm:{
                    oppoProjectName:'',
                    projectManager:'',
                    draftedPerson:''
                },
                form: {
                    oppoProjectName: '',
                    delivery: false,
                    type: [],
                    resource: ''
                },
                month1:[],
                month2:[],
                value4:"",
                value5:[],
                projectNameTitle:'',
                projectName:'',
                projectNum:'',
                monthLength:'',
            }
        },
        mounted: function () {
            this.projectName = this.$route.query.projectName;
            this.projectNum = this.$route.query.projectNum;
            this.feeEffortBudget = this.$route.query.feeEffortBudget;//人力成本总预算
            this.monthLength = this.$route.query.monthLength; //月份跨度
            if(this.$route.query.projectNum){
                this.findProjectMonth();

            }


        },
        filters:{
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
            },
        },
        methods: {
            back:function () {
                this.$router.push({
                    name: 'workingHourManage/projectWorkHoursManagement'
                })
            },
            handleSizeChange: function (size) {
                this.pagesize = size
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage

            },
            search(){
                var preyear=(this.month1.getFullYear()).toString()+"-";
                var premonth="0"+(this.month1.getMonth()+1).toString() ;
                var nextyear=(this.month2.getFullYear()).toString()+"-";
                var nextmonth="0"+(this.month2.getMonth()+1).toString();
                var value1=preyear+premonth;
                var value2=nextyear+nextmonth;
                console.log(value1,value2);
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix+"view/getViewProjMonth"+window.suffix,
                    data: {
                        "entity":{
                            "projectNum":this.projectNum
                        },
                        "ext": [
                            {
                                "filed": "month",
                                "from":value1,
                                "to":value2
                            }
                        ],
                        "pageNum": 0,
                        "pageSize": 1000,
                        "orderBy": "month desc"
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData4 = res.data.rows;
                    /* console.log(res);*/
                })
            },

            handleView(row){
                this.$router.push({
                    name: 'oneMonthWorkHoursListPro',
                    "query":{
                        "month":row.month,
                        "projectName":this.projectName,
                        "projectNum":this.projectNum,
                        "feeEffortBudget":this.feeEffortBudget/this.monthLength,
                        "projectType":this.$route.query.projectType
                    }
                })
            },
            findProjectMonth(){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'viewWorkhour/getViewProjMonth'+ window.suffix,
                   /* url:'http://192.168.99.38:9001/viewWorkhour/getViewProjMonth',*/
                    data: {
                        "entity":{
                            "projectNum":this.projectNum
                        },
                        "pageNum": 0,
                        "pageSize": 1000,
                        "orderBy": "month desc"
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData4 = res.data.rows;
                   /* for (var items in this.tableData4) {
                        this.tableData4[items].feeEffortBudget = this.feeEffortBudget/this.monthLength;
                    }*/

                })
            },
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
                    if (index === 1) {
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
                    if(sums[items]!== "" && items !== '2' && items !== '3'){
                        sums[items] = ((sums[items]/1000)).toString();
                    }
                    resData.push(this.returnFloat(sums[items]));
                }

                resData[0] = "合计";
                resData[2] = resData[2]*100/100;
                resData[3] = resData[3]*100/100;
                resData[6] = "";
                resData[7] = "";
                return resData;

            },

        }

    }
</script>
<style>
    .el-range-editor--small .el-range-separator{padding: 0;width: 18px;}
</style>