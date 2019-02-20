<template>

    <div>
        <el-col :span="24" style="background-color: white;padding-top: 10px;padding-bottom: 10px;padding-left: 10px;font-size: 13px">
            <span style="margin-right: 10px">{{"机会名称：  "+ oppoProjectName}}</span>
            <span>{{"商机编号： " + oppoNum}}</span>


            <el-button type="success" size="small" style="position: fixed;right: 20px ;z-index: 100;top: 100px;width: 70px" @click="back()">返回</el-button>
        </el-col>
        <el-table border stripe show-summary
                  :summary-method="getSummaries"
                  ref="multipleTable"
                  :data="tableData3"
                  tooltip-effect="dark"
                  style="width: 100%"
                  :header-cell-style="{textAlign:'center'}"
                  size="small"
                  @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection" width="50"
                    align="center">
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
                    align="right"
                    label="总人数（人）">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="mandayTotal"
                    align="right"
                    label="总人天（天）" >
            </el-table-column>
            <el-table-column
                    prop="feeEffort"
                    header-align="left"
                    align="right"
                    label="人力成本（元）" >
                <template  slot-scope="scope">
                    <span>{{scope.row.feeEffort|amountFil}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pendingApproveFeeEffort"
                    header-align="left"
                    align="right"
                    label="待审批人力成本（元）" >
                <template  slot-scope="scope">
                    <span>{{scope.row.pendingApproveFeeEffort|amountFil}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeBudget"
                    align="center"
                    label="项目费用预算（元）" >
                <template  slot-scope="scope">
                    <!--<span>{{scope.row.feeBudget|amountFil}}</span>-->
                    <span>-</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="feeCur"
                    align="center"
                    label="累计项目费用（元）">
                <template  slot-scope="scope" >
                    <!--<span>{{scope.row.feeCur|amountFil}}</span>-->
                    <span>-</span>
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
        data() {
            return {
                oppoNum:'',
                oppoProjectName:'',
                currentPage: 1,
                pagesize: 15,
                tableData3: [],
                total:null,
                mysize: 10,
                mypage: 0,
                entity:{},
                ext:'',
            }
        },
        mounted: function () {
            if(this.$route.query.oppoNum){
                this.oppoNum = this.$route.query.oppoNum;
                this.oppoProjectName = this.$route.query.oppoProjectName;
                this.findMonth();
            }
        },
        methods: {
            back:function () {
                this.$router.push({
                    name: 'workingHourManage/oppoWorkHoursManagement'
                })
            },
            handleSelectionChange (val) {
                this.multipleSelection = val
            },
            sizeChange(size) {
                this.mypage = 0;
                this.mysize = size;
                this.findOppoTotal();
                this.ref = true;
            },
            currentChange(page) {
                this.mypage = page - 1;
                this.findOppoTotal();
                this.ref = true;
                this.mypage = page;
            },
            /*跳到三级页面*/
            handleView(row){
                this.$router.push({
                    name: 'oneMonthWorkHoursList',
                    "query":{
                        "month":row.month,
                        "oppoProjectName":this.oppoProjectName,
                        "oppoNum":this.oppoNum,
                        "projectType":this.$route.query.projectType
                    }
                })
            },
            findMonth(){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + "viewWorkhour/getViewOppoMonth" + window.suffix,
                    /*url:"http://192.168.99.38:9001/viewWorkhour/getViewOppoMonth",*/
                    data: {
                        "entity": {
                            "oppoNum":this.oppoNum
                        },
                        "ext": this.ext,
                        "pageNum": this.mypage,
                        "pageSize": this.mysize,
                        "orderBy": ""
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data.rows;
                    this.total=Number(res.data.total);
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
                resData[3] = (resData[3]*100/100).toFixed(1);
                resData[7] = "";
                resData[6] = "";
                return resData;

            },

        },
        filters:{
            amountFil:function (value) {
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
        }

    }
</script>
<style>
    .el-range-editor--small .el-range-separator{padding: 0;width: 18px;}
</style>