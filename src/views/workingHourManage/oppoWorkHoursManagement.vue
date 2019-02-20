<style>

    .el-table td.is-left, .el-table th.is-left {
        text-align: right;
    }
</style>
<template>
    <div>
        <el-col :span="24" style="background-color: white;margin-bottom: 10px">
            <el-form ref="form" :model="searchForm" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="机会名称">
                        <el-input v-model="searchForm.oppoProjectName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="销售">
                        <el-input v-model="searchForm.saleName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="客户名称">
                        <el-input v-model="searchForm.customerName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :xs="20">
                    <el-checkbox v-model="checked" style="margin-top: 8px">待审批</el-checkbox>
                </el-col>

                <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
            </el-form>
        </el-col>
        <el-table border stripe show-summary
                  :summary-method="getSummaries"
                  ref="multipleTable"
                  :data="tableData3"
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
                    prop="oppo"
                    label="商机编号" width="90">
                <template slot-scope="scope">
                    <p style="text-decoration:underline;cursor: pointer" v-if="scope.row.oppo" @click=handle(scope.row)>{{scope.row.oppo.oppoNum}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="oppo"
                    label="机会名称"
                    width="220">
                <template slot-scope="scope">
                    <p v-if="scope.row.oppo">{{scope.row.oppo.oppoProjectName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="oppo"
                label="客户名称"
                width="220">
                <template slot-scope="scope">
                    <p v-if="scope.row.oppo">{{scope.row.oppo.customerName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="oppo"
                    label="销售" width="80">
                <template slot-scope="scope">
                    <p v-if="scope.row.oppo">{{scope.row.oppo.saleName}}</p>
                </template>
            </el-table-column>

            <el-table-column
                    prop="feeTotal"
                    header-align="left"
                    label="合同总金额(元)"
                    width="130px"
                    align="right">
                <template slot-scope="scope">
                    <p v-if="scope.row.oppo">{{scope.row.feeTotal|formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeEffort"
                    header-align="left"
                    label="累计人力成本（元）"
                    width="130px"
                    align="right">
                <template slot-scope="scope">
                    <p v-if="scope.row.oppo">{{scope.row.feeEffort|formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pendingApproveFeeEffort"
                    header-align="left"
                    label="待审批人力成本（元）"
                    width="145"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.pendingApproveFeeEffort|formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeTotalRatio"
                    label="占合同总金额百分比"
                    width="130px"
                    align="right">
                <template slot-scope="scope">
                    <p v-if="scope.row.oppo">{{scope.row.feeTotalRatio|feeTotalRatioFil}}</p>
                </template>
            </el-table-column>

            <el-table-column
                    prop="feeBudget"
                    label="项目费用预算（元）"
                    width="130px"
                    align="right">
                <template slot-scope="scope">
                    <p v-if="scope.row.oppo">-</p>
                </template>
            </el-table-column>

            <el-table-column
                    prop="feeCur"
                    label="累计项目费用（元）"
                    width="130px"
                    align="right">
                <template slot-scope="scope">
                    <p v-if="scope.row.oppo">-</p>
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
    import Cookies from 'js-cookie';
    export default {
        data () {
            return {
                tableData3: [],
                pagesize: 15,
                searchForm:{
                    oppoProjectName:'',
                    customerName:'',
                    saleName:''
                },
                winRateData:[],
                customerIdData:[],
                oppoId:"",
                id:'',
                total:null,
                mysize: 10,
                mypage: 0,
                entity:{},
                ext:'',
                checked:false
            }

        },
        created(){
            this.makeDataDictionary();
        },
        filters: {
            winRateFil:function(value){
                if (value == '01') {
                    return '高'
                } else if (value == '02') {
                    return '中'
                } else if (value == '03') {
                    return '低'
                }
            },
            projectStartTimeFil:function(value){
                if(value){
                    return value.substr(0,10)
                }
            },
            projectEndTimeFil:function(value){
                if(value){
                    return value.substr(0,10)
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
            },
            feeTotalRatioFil:function (value) {
                return value + '%'
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
                const resData = [];

                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if(index >=1 && index <= 4){
                        sums[index] = '';
                        return;
                    }
                    if (index === 8) {
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
                resData[10] = "-";
                resData[9] = "-";
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
                this.findOppoTotal();
                this.ref = true;
            },
            currentChange(page) {
                this.mypage = page - 1;
                this.findOppoTotal();
                this.ref = true;
                this.mypage = page;
            },
            handleSelectionChange (val) {
                this.multipleSelection = val
            },
            search(){
                var _this = this;
                var searchData = {};
                if(this.searchForm.oppoProjectName){
                    searchData.oppoProjectName = _this.searchForm.oppoProjectName;
                }
                if(this.searchForm.customerName){
                    searchData.customerName = _this.searchForm.customerName;
                }
                if(this.searchForm.saleName){
                    searchData.saleName = _this.searchForm.saleName;
                }
                if(this.checked==true){
                    this.ext="1";
                }else{
                    this.ext=" ";
                }
                this.entity = {
                    "oppo":searchData
                };
                this.findOppoTotal();
            },
            makeDataDictionary:function () {
                var _this = this;
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
                    _this.winRateData = resArry;
                });
            },
            /*跳到二级页面*/
            handle(row){
                this.$router.push({
                    "name": 'oneOppoHoursList',
                    "query":{
                        "oppoProjectName":row.oppo.oppoProjectName,
                        "oppoNum":row.oppoNum,
                        "projectType":row.oppo.projectType
                    }
                })
            },
            findOppoTotal (){
                this.$myHttp({
                    method: 'POST',
                   /* url: "http://192.168.99.38:9001/viewWorkhour/getViewOppoTotal",*/
                    url: this.prefix + "viewWorkhour/getViewOppoTotal"+ window.suffix,
                    data: {
                        "entity": this.entity,
                        "ext": this.ext,
                        "pageNum": this.mypage,
                        "pageSize": this.mysize,
                        "orderBy": ""
                    }

                }).then(res => {
                    //成功回调方法
                    this.tableData3=res.data.rows;
                    this.total=Number(res.data.total);
                })
            }
        },
        mounted:function () {
             this.findOppoTotal();
        },
        computed:{

        }

    }
</script>
