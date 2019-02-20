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

        <div style="height: 35px;line-height: 35px;margin: 10px 10px 0 10px;padding-left: 10px;font-size: 15px;border-bottom: 2px solid #DDE1E4;">采购合同信息 > 信息查看</div>

        <div style="font-size: 16px;">

            <el-col :span="24" style="background-color: white">



                <div style="margin-left: 20px;margin-top:10px;font-size: 16px">

                    <el-form :model="form" label-position="left" inline class="table-expand">
                        <el-row :gutter="20">
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="项目编号 :">
                                    <span>{{ form.projectId }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="项目名称 :">
                                    <span>{{ form.projectName }}</span>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="项目类型 :">-->
                                    <!--<span>{{ projectType | projectTypeFil}}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="项目经理 :">
                                    <span>{{form.projectManager }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="采购合同号 :">
                                    <span>{{form.purchaseContractNumber}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="采购主体 :">
                                    <span>{{form.purchaseSubject }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="外采供应商名称 :">
                                    <span>{{form.supplierName }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="合同签订时间 :">
                                    <span>{{form.contractTime|timeFmt}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="外采合同金额 :">
                                    <span>{{form.contractAmount|formatFilNew }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="收票时间 :">
                                    <span>{{form.billingTime|timeFmt}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="收票金额 :">
                                    <span>{{form.billingAmount|formatFilNew}}</span>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="外采供应商名称 :">-->
                                    <!--<span>{{form.purchaseSubject}}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->

                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="客户名称 :">-->
                                    <!--<span>{{customerName }}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="合同编号 :">-->
                                    <!--<span>{{contractId }}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="合同名称 :">-->
                                    <!--<span>{{contractName }}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->

                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="合同签订时间 :">-->
                                    <!--<span>{{contractSignTime |timeFmt}}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="签订部门 :">-->
                                    <!--<span>{{signOrgName }}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="客户签订部门 :">-->
                                    <!--<span>{{customerSigningDepartment }}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->

                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="税点："><span>{{form.taxPoint |contractRateFil}}</span>
                                </el-form-item>
                            </el-col>

                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="合同金额(元) :">-->
                                    <!--<span>{{totalContractAmount|totalContractAmountFil }}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->

                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="发票收件人 :">-->
                                    <!--<span>{{form.invoiceRecipient }}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="发票寄出时间 :">-->
                                    <!--<span>{{form.invoiceSendTime|timeFmt}}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="合同正本 :">
                                    <span>{{form.originalContract}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                <el-form-item label="付款时间 :">
                                    <span>{{form.moneyReceiveTime|timeFmt}}</span>
                                </el-form-item>
                            </el-col>
                                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" style="padding-left: 10px;">
                                    <el-form-item label="付款金额 :">
                                        <span>{{form.moneyReceiveAmount|formatFilNew}}</span>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" style="padding-left: 10px;">
                                    <el-form-item label="费用申请单号:">
                                        <span>{{form.tenderFeeApplicationNumber}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" style="padding-left: 10px;">
                                    <el-form-item label="人工费用 :" >
                                        <span>{{form.tenderFeeApplicationNumberAmount|formatFilNew}}</span>
                                    </el-form-item>
                                </el-col>

                                <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" style="padding-left: 10px;">-->
                                    <!--<el-form-item label="投标保证金返还 :">-->
                                        <!--<span>{{form.tenderBailReturn|yesNoFil}}</span>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                <!--<el-form-item label="保证金应返还时间 :">-->
                                    <!--<span>{{form.tenderBailReturnTime|timeFmt}}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                                <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" style="padding-left: 10px;">-->
                                    <!--<el-form-item label="采购经理 :">-->
                                        <!--<span>{{form.purchaseManager}}</span>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->

                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="padding-left: 10px;">
                                    <el-form-item label="付款条件:">
                                        <span>{{form.moneyReceivecondition}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="padding-left: 10px;">
                                    <el-form-item label="合同扫描件上传位置 :" label-width="150px">
                                        <span>{{form.contractScanUploadLocation}}</span>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="padding-left: 10px;">
                                    <el-form-item label="备注:">
                                        <span>{{form.remark}}</span>
                                    </el-form-item>
                                </el-col>

                            <!--<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">-->
                                <!--<el-form-item label="备注 :">-->
                                    <!--<span>{{memo }}</span>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->

                            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                                 <el-form-item label="人力成本总预算(元):">
                                     <span>{{totalHumanCost|totalHumanCostFil}}</span>
                                 </el-form-item>
                             </el-col>-->
                            <!--<el-row style="padding-left: 10px;">-->
                                <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                    <!--<el-form-item label="创建人 :">-->
                                        <!--<span>{{createBy|createByFil }}</span>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->
                                <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                    <!--<el-form-item label="创建时间 :">-->
                                        <!--<span>{{createTime }}</span>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row style="padding-left: 10px;">-->
                                <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                    <!--<el-form-item label="最后修改人 :">-->
                                        <!--<span>{{lastmodifiedBy |lastmodifiedByFil}}</span>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->
                                <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">-->
                                    <!--<el-form-item label="最后修改时间 :">-->
                                        <!--<span>{{lastmodifiedTime }}</span>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->
                            <!--</el-row>-->

                        </el-row>
                    </el-form>

                </div>


            </el-col>
            <el-col :span="22" :offset="8" :style="'margin-left:45%'">
                <el-button @click="close()"  style="margin-bottom: 20px">返回</el-button>
            </el-col>

        </div>


    </el-col>
</template>

<script>




    export default {
        components: {

        },
        data() {
            return {
                contractRate:'',
                contractRateData:[],
                costNum:'',
                costId:'',
                cost:'',
                costNoRate:'',
                isShowTab:false,
                id:'',
                currentPage:'',
                form: {
                    billingAmount: '',
                    billingTime: '',
                    clientId: '',
                    supplierName: '',
                    contractAmount: '',
                    contractScanUploadLocation: '',
                    contractTime: '',
                    id: '',
                    invoiceRecipient: '',
                    invoiceSendTime: '',
                    moneyReceiveAmount: '',
                    moneyReceiveTime: '',
                    moneyReceivecondition: '',
                    originalContract: '',
                    projectId: '',
                    projectManager: '',
                    projectName: '',
                    remark: '',
                    purchaseContractNumber: '',
                    purchaseManager: '',
                    purchaseSubject: '',
                    taxPoint: '',
                    tenderBailReturn: '',
                    tenderBailReturnTime: '',
                    tenderFeeApplicationNumber: '',
                    tenderFeeApplicationNumberAmount: ''
                }
            };
        },
        methods: {

            close: function () {
                this.$router.push({
                    //"name": "purchaseContract/listPurchaseContract",
                    "name": "listPurchaseContract",
                    "params":{
                        "currentPage":this.currentPage
                    }
                })
            },


            makeDataDictionary: function () {

            },


        },
        created() {
            this.currentPage = this.$route.query.currentPage;
            this.id = this.$route.query.id
            this.makeDataDictionary()
            //查数据
            if(this.id){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/purchaseContract/list' + window.suffix,
                    data: {
                        "entity": {
                            id:this.id
                        }
                    }
                }).then(res => {
                    this.form=res.data.rows[0];
                    console.log("detail data---->",this.form)
                });
            }
        },
        mounted:function () {
        },
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
                }else if(value == '04') {
                    return '3%'
                }
            },
            yesNoFil:function (value) {
                if(value == '0'){
                    return '否'
                }else if(value == '1'){
                    return '是'
                }
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
