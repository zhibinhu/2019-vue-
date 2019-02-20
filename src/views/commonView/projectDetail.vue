<style>
    .table-expand {
        font-size: 0;
    }

    .table-expand label {
        width: 140px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>
<template>

    <el-col :span="24" style="background-color: white">



        <div style="margin-left: 20px;margin-top:10px;font-size: 16px">

            <el-form label-position="right" inline class="table-expand">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="项目编号 :">
                            <span>{{ projectNum }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="项目名称 :">
                            <span>{{ projectName }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="项目类型 :">
                            <span>{{ projectType | projectTypeFil}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="项目经理 :">
                            <span>{{pmName }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="项目总监 :">
                            <span>{{pdName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="PMO :">
                            <span>{{pmoName }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="项目开始时间 :">
                            <span>{{projectStartTime|timeFmt}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="项目结束时间 :">
                            <span>{{projectEndTime|timeFmt}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="项目状态 :">
                            <span>{{projectState |projectStateFil}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="客户名称 :">
                            <span>{{customerName }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="合同编号 :">
                            <span>{{contractId }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="合同名称 :">
                            <span>{{contractName }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="合同签订时间 :">
                            <span>{{contractSignTime |timeFmt}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="签订部门 :">
                            <span>{{signOrgName }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="客户签订部门 :">
                            <span>{{customerSigningDepartment }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="合同金额(元) :">
                            <span>
                                {{util.returnFloat(totalContractAmount/1000)}}
<!--
                                {{totalContractAmount|totalContractAmountFil }}
-->
                            </span>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="合同税率："><span>{{contractRateValue }}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="销售人员 :">
                            <span>{{saleName }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="服务类型 :">
                            <span>{{serviceValue}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="人天总数 :">
                            <span>{{totalNumberDays | transformDot}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="计费类型:">
                            <span>{{feeTypeValue}}</span>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="备注 :">
                            <span>{{memo }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                   <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="人力成本总预算(元):">
                            <span>{{totalHumanCost|totalHumanCostFil}}</span>
                        </el-form-item>
                    </el-col>-->
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="创建人 :">
                            <span>{{createBy }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="创建时间 :">
                            <span>{{createTime }}</span>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="最后修改人 :">
                                <span>{{lastmodifiedBy}}</span>
                            </el-form-item>
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

    import util from '../../libs/util'
    export default {
        components: {

        },
        data() {
            return {
                util:util,
                contractRateData:[],
                currentPage:'',
                serviceTypeData: [],
                feeTypeData:[],
                pdName: '',
                contractSignTime:'',
                projectState:'',
                customerSigningDepartment: '',
                customerName: '',
                projectNum: '',
                serviceType:'',
                signOrgCode: '',
                projectType: '',
                contractName: '',
                projectName: '',
                signOrgName: '',
                saleName: '',
                totalContractAmount: '',
                totalNumberDays: '',
                pmName: '',
                projectStartTime: '',
                pmoName: '',
                memo: '',
                createTime:'',
                createBy:'',
                lastmodifiedTime:'',
                lastmodifiedBy:'',
                projectEndTime:'',
                totalHumanCost:'',
                feeType:'',
                contractId:'',
                contractRate:''
            };
        },
        methods: {
            formatCreateAndModifyByFil(value,result){
                let username = "";
                if(value) {
                    value = value.split('|')[0]
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'sysData/getUserByUsername' + window.suffix,
                        data: {
                            "entity":{
                                username:value
                            }
                        }
                    }).then(res => {
                        username = res.data.rows[0].cname;
                        this[result]=username;
                    });
                }else{
                    this[result]=username;
                }
            },
            findProjectInfo: function () {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getProjectList',
                    data: {
                        "entity": {
                            "id": this.projectId
                        }
                    }
                }).then(res => {
                    //成功回调方法

                    this.projectNum = res.data.rows[0].projectNum;
                    this.contractName = res.data.rows[0].contractName;
                    this.contractSignTime = res.data.rows[0].contractSignTime;
                    this.projectState = res.data.rows[0].projectState;
                    this.projectName = res.data.rows[0].projectName;
                    this.serviceType = res.data.rows[0].serviceType;
                    this.signOrgCode = res.data.rows[0].signOrgCode;
                    this.pdName = res.data.rows[0].pdName;
                    this.createTime = res.data.rows[0].createTime;
                    this.lastmodifiedTime = res.data.rows[0].lastmodifiedTime;
                    this.createBy = res.data.rows[0].createBy;
                    this.lastmodifiedBy = res.data.rows[0].lastmodifiedBy;
                    this.customerSigningDepartment = res.data.rows[0].customerSigningDepartment;
                    this.customerName = res.data.rows[0].customerName;
                    this.projectType = res.data.rows[0].projectType;
                    this.signOrgName = res.data.rows[0].signOrgName;
                    this.saleName = res.data.rows[0].saleName;
                    this.totalContractAmount = res.data.rows[0].totalContractAmount;
                    this.totalNumberDays = res.data.rows[0].totalNumberDays;
                    this.pmName = res.data.rows[0].pmName;
                    this.projectStartTime = res.data.rows[0].projectStartTime;
                    this.pmoName = res.data.rows[0].pmoName;
                    this.memo = res.data.rows[0].memo;
                    this.projectEndTime = res.data.rows[0].projectEndTime;
                    this.totalHumanCost = res.data.rows[0].totalHumanCost;
                    this.feeType = res.data.rows[0].feeType;
                    this.contractId = res.data.rows[0].contractId;
                    this.contractRate = res.data.rows[0].contractRate;
                    this.formatCreateAndModifyByFil(this.createBy,'createBy');
                    this.formatCreateAndModifyByFil(this.lastmodifiedBy,'lastmodifiedBy');
                    this.$store.state.proContractAmount = res.data.rows[0].totalContractAmount;

                });
            },
            close: function () {
                this.$router.push({
                    "name": "projectManagement/projectList",
                    "params":{
                        "currentPage":this.currentPage
                    }
                })
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
                    this.findProjectInfo();
                });


                var _this = this;
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
                    _this.feeTypeData = res.data.rows;
                });


            }
        },
        created() {
            this.makeDataDictionary();
            this.currentPage = this.$route.params.currentPage;
        },
        mounted:function () {
        },
        props:['projectId'],
        filters: {
            projectTypeFil: function (value) {
                if (value == '3') {
                    return '商机'
                } else if (value == '5') {
                    return '外部项目'
                } else if (value == '7') {
                    return '研发项目'
                } else if (value == '8') {
                    return '内部项目'
                }else if (value == '9') {
                    return '内部管理'
                }
            },
            projectStateFil: function (value) {
                if (value == "01") {
                    return '进行中'
                } else if (value == '02') {
                    return '已结束'
                }else if (value == '03') {
                    return '提前开工'
                }
            },
            totalContractAmountFil:function (value) {
                return value/1000
            },
            createByFil:function (value) {
                if(value){
                    return value.split('|')[0]
                }
            },
            lastmodifiedByFil:function (value) {
                if(value){
                    return value.split('|')[0]
                }
            },
            timeFmt:function (value) {
                if(value){
                    return value.substring(0, 10)
                }
            },
            totalHumanCostFil:function (value) {
                if(value){
                    return value/1000
                }
            },
            contractRateFil:function (value) {
                if(value == '01'){
                    return '0%'
                }else if(value == '02'){
                    return '6%'
                }else if(value == '03') {
                    return '16%'
                }
            },
            transformDot(value){
                return parseFloat(Math.round(value*10)/10).toFixed(1);
            }

        },
        computed: {
            serviceValue:function () {
                for(var items in this.serviceTypeData){
                    if(this.serviceTypeData[items].dkey == this.serviceType){
                        return this.serviceTypeData[items].dvalue
                    }
                }
            },
            feeTypeValue:function () {
                for(var items in this.feeTypeData){
                    if(this.feeTypeData[items].dkey == this.feeType){
                        return this.feeTypeData[items].dvalue
                    }
                }
            },
            contractRateValue:function () {
                if(this.contractRateData && this.contractRateData.filter(o => o.value == this.contractRate).length > 0){
                    return this.contractRateData.filter(o => o.value == this.contractRate)[0].label*100 + '%'
                }
            }
        }
    };
</script>

<style>

</style>
