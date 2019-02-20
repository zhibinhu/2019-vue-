<template>
    <div>
        <el-row style="background-color: white;padding: 0 10px;">
            <el-form ref="form" :model="form" label-width="90px" style="margin-top: 20px;margin-bottom: 20px" class="table-expand">
                <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 0px 20px 0;padding-left: 10px;font-size: 15px;">基本信息</div>

                    <el-row :gutter="20">

                        <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                            <!--<el-form-item label="所属供应商：" label-width="100px"><span>{{form.reserve1}}</span></el-form-item>-->
                        <!--</el-col>-->
                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="项目名称："><span>{{form.reserve2}}</span></el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="项目经理："><span>{{form.reserve3}}</span></el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="核算月份："><span>{{form.accounteMonth}}</span></el-form-item>
                        </el-col>
                    </el-row>

                <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 0px 20px 0;padding-left: 10px;font-size: 15px;">人员工作量信息</div>
                <el-col :span="24">



                    <el-table
                            :data="form.outsourcerWorkloadInfoItemList"  v-show="showRelationTable"
                            ref="operationTable"
                            border
                            show-summary
                            :summary-method="getSummaries"
                            style="width: 100%"
                            :header-cell-style="{textAlign:'center'}">
                        <!--<el-table-column-->
                                <!--type="selection"-->
                                <!--width="60"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->
                        <el-table-column label="所属供应商" prop="supplierId" width="200">
                            <template slot-scope="scope">
                                {{scope.row.reserve1}}
                                <!--<el-select v-model="scope.row.supplierId" @change="autoSupplier(scope)" clearable placeholder="请选择" clearable filterable size="small"-->
                                           <!--style="width: 95%">-->
                                    <!--<el-option-->
                                            <!--v-for="item in supplierData"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="outsourcerId"
                                label="姓名"
                                width="150">

                            <template slot-scope="scope">
                                {{scope.row.outsourcerName}}
                                <!--<el-select size="mini"  v-model="scope.row.outsourcerId"  @change="getCostTypeData(scope)">-->
                                    <!--<el-option-->
                                            <!--v-for="item in supplierOutData"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->


                            </template>
                        </el-table-column>


                        <el-table-column
                                align="right"
                                prop="numberOfPeopleDay"
                                width="150"
                                label="结算人天">
                            <template slot-scope="scope">
                                {{scope.row.numberOfPeopleDay}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="enterProjectTime"
                                label="进入项目时间"
                                width="150">
                            <template slot-scope="scope">
                                {{scope.row.enterProjectTime}}
                                <!--<el-date-picker size="small"   style="width: 90%"-->
                                                <!--v-model="scope.row.enterProjectTime"-->
                                                <!--type="date"-->
                                                <!--placeholder="选择日期" value-format="yyyy-MM-dd">-->
                                <!--</el-date-picker>-->

                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="exitProjectTime"
                                label="离开项目时间"
                                width="150">
                            <template slot-scope="scope">
                                {{scope.row.exitProjectTime}}
                                <!--<el-date-picker size="small"   style="width: 90%"-->
                                                <!--v-model="scope.row.exitProjectTime"-->
                                                <!--type="date"-->
                                                <!--placeholder="选择日期" value-format="yyyy-MM-dd">-->
                                <!--</el-date-picker>-->
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="outConnect"
                                label="联系电话"
                                width="150">
                            >
                            <template slot-scope="scope">
                                {{scope.row.outConnect}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                align="right"
                                prop=" "
                                label="单价(元/天)"
                                width="150">
                            >
                            <template slot-scope="scope">
                                <!--{{(scope.row.employSalary/1000)|formatFilNew}}-->
                                {{(scope.row.employSalary)|formatFilNew}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="right"
                                prop="cost"
                                label="人工成本（元）"
                                width="150">
                            >
                            <template slot-scope="scope">
                                <!--{{((scope.row.employSalary*scope.row.numberOfPeopleDay)/1000)|formatFilNew}}-->
                                {{((scope.row.employSalary*scope.row.numberOfPeopleDay))|getCostData(scope.row)|formatFilNew}}
                            </template>
                        </el-table-column>


                        <el-table-column
                                prop="post"
                                label="岗位"
                                width="150">
                            >
                            <template slot-scope="scope">
                                {{scope.row.post}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="rank"
                                label="职级"
                                width="150">
                            >
                            <template slot-scope="scope">
                                {{scope.row.rank}}
                            </template>
                        </el-table-column>


                        <el-table-column
                                prop="remarks"
                                label="备注"
                                width="150">
                            >
                            <template slot-scope="scope">
                                {{scope.row.remarks}}
                                <!--<el-input size="mini"  v-model="scope.row.remarks" ></el-input>-->
                            </template>
                        </el-table-column>



                    </el-table>



                </el-col>
            </el-form>
            <div style="text-align: center">
                <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">返回</el-button>
            </div>
        </el-row>
    </div>
</template>

<script>
    import util from '../../libs/util';
    export default {
        data() {
            return {
                currentPage:'',
                labelPosition:'right',
                supplierData:[],
                projectData:[],
                projectManager:'',
                businessType:[],
                // 以下为ralationOptionTable的东西
                util:util,
                isShow:true,
                center:'center',
                tableData:[],
                role:'',
                title:'',
                date:'',
                cost:'',
                remarks:'',
                costNameSelectData:[],
                testData:[
                ],
                showRelationTable:true,
                showRelationOpen1:true,
                showRelationClose1:false,
                supplierOutData:'',
                // 以上为ralationOptionTable的东西
                label:'',
                form: {
                    projectId:'',
                    //projectName:'',
                    accounteMonth:'',
                    projectManagerId:'',
                    reserve1:'',
                    reserve2:'',
                    reserve3:'',
                    supplierId:'',
                    totalNumberOfPeopleDay:'',
                    totalLaborCost:''
                },
                flag:true,

                rules: {
                }
            };
        },
        methods: {
            getSummaries(param){

                const { columns, data } = param;
                const sums = [];
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                const resData = [];
                columns.forEach((column, index) => {
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
                });//
                this.form.totalNumberOfPeopleDay = sums[2];
                this.form.totalLaborCost = sums[8];

                for(const items in sums){
                    if(items == 3){
                        resData.push(util.returnFloat(sums[items],1));
                    }else  {
                        // resData.push(util.returnFloat(sums[items]/1000));
                        resData.push(util.returnFloat(sums[items]));
                    }
                }

                resData[0] = '合计';
                resData[1] = '';
                resData[2] = '';
                resData[4] = '';
                resData[5] = '';
                resData[6] = '';
                resData[7] = '';
                resData[9] = '';
                resData[10] = '';
                resData[11] = '';
                resData[12] = '';
                return resData;
            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'outsourcerWorkloadInfo',
                    params: {
                        currentPage: _this.currentPage
                    }
                });
            }
        },
        filters:{
            fmt:function (value) {
                if(value){
                    return value/1000
                }
            },

            getCostData:function(value,currentCost){
                currentCost.cost = value;
                //this.form.totalLaborCost += Number(value);
                return  Number(currentCost.cost);
            }
        },
        created() {
            //跨router传参方式
            var _this = this;
            this.currentPage = this.$route.query.currentPage;
            if (this.$route.query.id) {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'outsourcerWorkload/getOutsourcerWorkloadInfoList'+ window.suffix,
                    data: {
                        "entity":{
                            "id":_this.$route.query.id
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form= res.data.rows[0];
                    console.log("data",_this.form)
                })
            }
        }
    };
</script>

<style>
    .table-expand {
        font-size: 0;
    }
    .table-expand label {
        width: 120px;
        color: #99a9bf;
    }

    .el-table th>.cell {
        white-space: nowrap;
    }
    /*.el-table-column{*/
        /*white-space: nowrap;*/
    /*}*/
</style>
