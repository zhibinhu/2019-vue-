<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 15px;margin-top:10px;font-size: 16px">

           <el-form label-position="left" inline class="table-expand" style="padding-left: 10px">
                    <el-row :gutter="20">

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="商机编号："><span>{{oppoNum}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="机会名称："><span>{{oppoProjectName}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="销售："><span>{{saleName}}</span></el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="所属部门："><span>{{orgName}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="赢单率："><span>{{winRate | winRateFil}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="阶段："><span>{{projectStage | projectStateFil}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="客户名称："><span>{{customerName}} </span></el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="预计签订时间："><span>{{expectedTimeTosign | expectedTimeTosignFil}}</span>
                            </el-form-item>
                        </el-col>

                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="合同总金额(元)："><span>{{contractAmount | contractAmountFil }}</span>
                            </el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="合同税率："><span>{{contractRateValue }}</span>
                            </el-form-item>
                        </el-col>


                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="关联填报工时："><span>{{isAllowWorkingHours | isAllowWorkingHoursFil}}</span>
                            </el-form-item>
                        </el-col>

                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="状态："><span>{{status | statusFil}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="商机类型"><span>{{oppoType|oppoTypeFmt}}</span>
                            </el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '01'">
                            <el-form-item label="产品线："><span>{{productLineName}}</span></el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '01'">
                            <el-form-item label="产品："><span>{{productName}}</span></el-form-item>
                        </el-col>
                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '01'">
                            <el-form-item label="渠道："><span>{{channelName}}</span></el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="售前经理："><span>{{preMangerName}}</span></el-form-item>
                        </el-col>

                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="项目总监："><span>{{pdName}} </span></el-form-item>
                        </el-col>

                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="PMO："><span>{{pmoName}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="项目开始时间："><span>{{projectStartTime | projectStartTimeFil}}</span>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="项目结束时间："><span>{{projectEndTime | projectEndTimeFil}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="备注信息："><span>{{memo }}</span></el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="创建人 :">
                                <span>{{createBy | createByFil }}</span>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="创建时间 :">
                                <span>{{createTime }}</span>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="最后修改人 :"><span>{{lastmodifiedBy | lastmodifiedByFil}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="最后修改时间 :">
                                <span>{{lastmodifiedTime }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
        </div>
    </el-col>
</template>

<script>

    import myEasyTable from '../../components/myEasyTable.vue'
    import attachTable from '../../components/attachTable.vue'
    import profitForm from '../../components/profitForm.vue'
    import util from '../../libs/util'
    export default {
        components: {
            myEasyTable,
            attachTable,
            profitForm
        },
        data() {
            return {
                contractRateData:[],
                currentPage: '',
                oppoProjectNameTitle: '',
                serviceTypeData: [],
                industryData: [],
                pdName: '',
                pmoName: '',
                oppoNum: '',
                orgCode: '',
                orgName: '',
                draftTime: '',
                oppoProjectName: '',
                customerName: '',
                projectStage: '',
                pmId: '',
                projectSupervisor: '',
                projectDirector: '',
                winRate: '',
                contractAmount: '',
                expectedTimeTosign: '',
                projectStartTime: '',
                projectEndTime: '',
                projectType: '',
                isAllowWorkingHours: true,
                saleId: '',
                industry: '',
                totalIncome: '',
                saleName: '',
                id: '',
                memo: '',
                channelName: '',
                createTime: '',
                productLineName: '',
                productName: '',
                createBy: '',
                lastmodifiedTime: '',
                lastmodifiedBy: '',
                status: '',
                preMangerName: '',
                isShow: false,
                contractRate:'',
                oppoType:''

            };
        },
        props: ['projectId'],
        methods: {
            handleClick:function () {

            },
            findOneOppoInfo: function () {
                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getOppoList',
                    data: {
                        "entity": {
                            "id": this.projectId
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    this.id = res.data.rows[0].id;
                    this.oppoNum = res.data.rows[0].oppoNum;
                    this.orgCode = res.data.rows[0].orgCode;
                    this.orgName = res.data.rows[0].orgName;
                    this.oppoProjectName = res.data.rows[0].oppoProjectName;
                    this.customerName = res.data.rows[0].customerName;
                    this.projectStage = res.data.rows[0].projectStage;
                    this.pmId = res.data.rows[0].pmId;
                    this.pdName = res.data.rows[0].pdName;
                    this.pmoName = res.data.rows[0].pmoName;
                    this.winRate = res.data.rows[0].winRate;
                    this.status = res.data.rows[0].status;
                    this.createTime = res.data.rows[0].createTime;
                    this.lastmodifiedTime = res.data.rows[0].lastmodifiedTime;
                    this.createBy = res.data.rows[0].createBy;
                    this.lastmodifiedBy = res.data.rows[0].lastmodifiedBy;
                    this.contractAmount = res.data.rows[0].contractAmount;
                    this.expectedTimeTosign = res.data.rows[0].expectedTimeTosign;
                    this.projectStartTime = res.data.rows[0].projectStartTime;
                    this.projectEndTime = res.data.rows[0].projectEndTime;
                    this.projectType = res.data.rows[0].projectType;
                    this.isAllowWorkingHours = res.data.rows[0].isAllowWorkingHours;
                    this.saleId = res.data.rows[0].saleId;
                    this.saleName = res.data.rows[0].saleName;
                    this.industry = res.data.rows[0].industry;
                    this.totalIncome = res.data.rows[0].totalIncome;
                    this.memo = res.data.rows[0].memo;
                    this.preMangerName = res.data.rows[0].preMangerName;
                    this.productName = res.data.rows[0].productName;
                    this.channelName = res.data.rows[0].channelName;
                    this.productLineName = res.data.rows[0].productLineName;
                    this.contractRate = res.data.rows[0].contractRate;     
                    this.oppoType = res.data.rows[0].oppoType      

                    this.$store.state.oppoContractAmount = res.data.rows[0].contractAmount;
                
                });
            },
            makeDataDictionary: function () {
            
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "税率"
                        }
                    }
                }).then(res => {
                    //成功回调方法
            
                    var resArry = [];
                    for (var items in res.data.rows) {
                        resArry.push({
                            label: res.data.rows[items].dvalue,
                            value: res.data.rows[items].dkey
                        })
                    }
                    
                    this.contractRateData = resArry;
                    this.findOneOppoInfo();

                });

            },
            close: function () {
                this.$router.push({
                    "name": "projectManagement/oppoManagementList",
                    "params": {
                        "currentPage": this.currentPage
                    }
                })
            }
        },
        created() {
            this.makeDataDictionary();
            this.currentPage = this.$route.params.currentPage;

        },
        filters: {
            projectTypeFil: function (value) {
                if (value == '3') {
                    return '商机'
                } else if (value == '5') {
                    return '外部项目'
                } else if (value == '8') {
                    return '内部项目'
                } else if (value == '9') {
                    return '内部管理'
                }
            },
            projectStateFil: function (value) {
                if (value == "01") {
                    return '初步沟通'
                } else if (value == '02') {
                    return '需求了解'
                } else if (value == '03') {
                    return '方案交流'
                } else if (value == '04') {
                    return '价格讨论'
                } else if (value == '05') {
                    return '合同流程'
                }
            },
            contractAmountFil: function (value) {
                return util.returnFloat(value / 1000);
            },
            winRateFil: function (value) {
                if (value == '01') {
                    return '高'
                } else if (value == '02') {
                    return '中'
                } else if (value == '03') {
                    return '低'
                }
            },
            statusFil: function (value) {
                if (value == "1") {
                    return '成功'
                } else if (value == "0") {
                    return '进行中'
                } else if (value == "2") {
                    return '失败'
                }
            },
            createByFil: function (value) {
                if (value) {
                    return value.split('|')[0]
                }

            },
            lastmodifiedByFil: function (value) {
                if (value) {
                    return value.split('|')[0]
                }
            },
            expectedTimeTosignFil: function (value) {
                if (value) {
                    return value.substr(0, 10)
                }
            },
            projectStartTimeFil: function (value) {
                if (value) {
                    return value.substr(0, 10)
                }
            },
            projectEndTimeFil: function (value) {
                if (value) {
                    return value.substr(0, 10)
                }
            },
            isAllowWorkingHoursFil: function (value) {
                if (value) {
                    return '是'
                } else {
                    return '否'
                }
            },
        
             oppoTypeFmt:function (value) {
                
                if(value  == '01'){
                    return '分销'
                }else if(value == '02'){

                    return '项目'
            
                }
            }
        },
        computed: {
            serviceValue: function () {
                for (var items in this.serviceTypeData) {
                    if (this.serviceTypeData[items].dkey == this.serviceType) {
                        return this.serviceTypeData[items].dvalue
                    }
                }
            },
            contractRateValue:function () {
                if(this.contractRateData.filter(o => o.value == this.contractRate).length > 0){
                    return this.contractRateData.filter(o => o.value == this.contractRate)[0].label*100 + '%'
                }
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

    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>