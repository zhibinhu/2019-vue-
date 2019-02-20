<template>
    <el-col :span="24" style="background-color: white">
        <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 10px 0 10px;padding-left: 10px;font-size: 15px;">采购合同管理 > 编辑采购合同/新增采购合同</div>

        <el-form ref="ruleForm" :model="form" label-width="145px" :rules="rules"
                 style="margin-top: 20px;margin-bottom: 20px">
            <el-col :span="8" :xs="20">
                <el-form-item label="项目编号" prop="projectId">
                    <el-input @focus="showProjectTable()" placeholder="请选择" v-model="form.projectId" style="width: 95%" size="small" ></el-input>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="项目名称" prop="projectName">
                    <el-input v-model="form.projectName" placeholder="自动带出" style="width: 95%" size="small" :disabled="true"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="项目经理" prop="projectManager">
                    <el-input v-model="form.projectManager" style="width: 95%" placeholder="自动带出" size="small" :disabled="true"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="采购合同号" prop="purchaseContractNumber">
                    <el-input v-model="form.purchaseContractNumber"  placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="采购主体" prop="purchaseSubject">
                    <el-input v-model="form.purchaseSubject" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :xs="20">
                <el-form-item label="外采供应商名称" prop="supplierName">
                    <el-input v-model="form.supplierName" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <!--<el-col :span="8" :xs="20">-->
            <!--<el-form-item label="客户名称" prop="supplierName" >-->
            <!--<el-select v-model="form.supplierName" placeholder="请选择" clearable size="small" style="width: 95%">-->
            <!--<el-option-->
            <!--v-for="item in customerIdData"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.label">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--</el-col>-->



            <el-col :span="8" :xs="20">
                <el-form-item label="合同签订时间" prop="contractTime">
                    <el-date-picker
                            v-model="form.contractTime"
                            size="small"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间" style="width: 95%">
                    </el-date-picker>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="外采合同金额" prop="contractAmount">
                    <el-input v-model="form.contractAmount" placeholder="自动带出" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="收票时间" prop="billingTime">
                    <el-date-picker
                            v-model="form.billingTime"
                            size="small"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间" style="width: 95%">
                    </el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="收票金额" prop="billingAmount">
                    <el-input v-model="form.billingAmount" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="税点" prop="taxPoint">
                    <el-select v-model="form.taxPoint" placeholder="请选择" clearable size="small" style="width: 95%">
                        <el-option
                                v-for="item in contractRateData"
                                :key="item.value"
                                :label="item.label*100 + '%'"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <!--<el-col :span="8" :xs="20">-->
            <!--<el-form-item label="发票收件人" prop="invoiceRecipient">-->
            <!--<el-input v-model="form.invoiceRecipient" style="width: 95%" size="small"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="8" :xs="20">-->
            <!--<el-form-item label="发票寄出时间" prop="invoiceSendTime">-->
            <!--<el-date-picker-->
            <!--v-model="form.invoiceSendTime"-->
            <!--size="small"-->
            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
            <!--placeholder="选择日期时间" style="width: 95%">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <el-col :span="8" :xs="20">
                <el-form-item label="合同正本" prop="originalContract">
                    <el-input v-model="form.originalContract" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="付款时间" prop="moneyReceiveTime">
                    <el-date-picker
                            v-model="form.moneyReceiveTime"
                            size="small"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间" style="width: 95%">
                    </el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="付款金额" prop="moneyReceiveAmount">
                    <el-input v-model="form.moneyReceiveAmount" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="费用申请单号" prop="tenderFeeApplicationNumber">
                    <el-input v-model="form.tenderFeeApplicationNumber" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="人工费用" prop="tenderFeeApplicationNumberAmount" >
                    <el-input v-model="form.tenderFeeApplicationNumberAmount" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <!--<el-col :span="8" :xs="20">-->
            <!--<el-form-item label="投标保证金返还" prop="tenderBailReturn">-->
            <!--<el-select v-model="form.tenderBailReturn" placeholder="请选择" clearable size="small" style="width: 95%">-->
            <!--<el-option-->
            <!--v-for="item in yesNoData"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--&lt;!&ndash;<el-input v-model="form.tenderBailReturn" style="width: 95%" size="small"></el-input>&ndash;&gt;-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="8" :xs="20">-->
            <!--<el-form-item label="保证金应返还时间" prop="tenderBailReturnTime">-->
            <!--<el-date-picker-->
            <!--v-model="form.tenderBailReturnTime"-->
            <!--size="small"-->
            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
            <!--placeholder="选择日期时间" style="width: 95%">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="8" :xs="20">-->
            <!--<el-form-item label="采购经理" prop="salesManager">-->
            <!--<el-select v-model="form.salesManager" placeholder="请选择" size="small" clearable style="width: 95%">-->
            <!--<el-option-->
            <!--v-for="item in saleIdData"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.label">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <el-col :span="24" :xs="20">
                <el-form-item label="付款条件" prop="moneyReceivecondition" >
                    <el-input
                            style="width: 95%"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="form.moneyReceivecondition">
                    </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24" :xs="20">
                <el-form-item label="合同扫描件上传位置" prop="contractScanUploadLocation">
                    <el-input v-model="form.contractScanUploadLocation" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24" :xs="20">
                <el-form-item label="备注" >
                    <el-input
                            style="width: 95%"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="form.remark">
                    </el-input>
                </el-form-item>
            </el-col>

        </el-form>

        <el-col :span="24" :offset="10">
            <el-button @click="saveProjectsInfo()" icon="el-icon-circle-plus-outline" size="small" type="primary" style="margin-top: 20px;margin-bottom: 10px" round>保存
            </el-button>
            <el-button @click="close()" icon="el-icon-back" size="small" style="margin-top: 20px;margin-bottom: 10px" round>返回</el-button>

        </el-col>


        <el-dialog top="8vh" width="55%" title="选择项目"  class="popApproval"
                   @close='closeDialog'
                   :visible.sync="dialogVisible" append-to-body :modal-append-to-body="false">
            <project-list-dialog ref="projectListDlg" @getProjectName="showProjectName" id="formStyle1"></project-list-dialog>
        </el-dialog>




    </el-col>


</template>

<script>

    import util from '../../libs/util';
    import projectListDialog from '@/views/salesContract/projectListDialog';
    export default {
        components: {
            projectListDialog
        },
        data() {
            return {
                contractRateData:[],
                yesNoData:[],
                customerIdData:[],
                saleIdData:[],
                dialogVisible:false,
                moneyFlag:true,
                form: {
                    billingAmount: '',
                    billingTime: '',
                    clientId: '',
                    supplierName: '',
                    contractAmount: '',
                    contractScanUploadLocation: '',
                    contractTime: '',
                    id: '',
                    // invoiceRecipient: '',
                    // invoiceSendTime: '',
                    moneyReceiveAmount: '',
                    moneyReceiveTime: '',
                    moneyReceivecondition: '',
                    originalContract: '',
                    projectId: '',
                    projectManager: '',
                    projectName: '',
                    remark: '',
                    purchaseContractNumber: '',
                    // salesManager: '',
                    purchaseSubject: '',
                    taxPoint: '',
                    // tenderBailReturn: '',
                    // tenderBailReturnTime: '',
                    tenderFeeApplicationNumber: '',
                    tenderFeeApplicationNumberAmount: ''
                },
                rules: {/*
                    purchaseContractNumber:[
                        {required: true, message: '请输入采购合同号', trigger: 'change'}
                    ],
                    purchaseSubject:[
                        {required: true, message: '请输入采购主体', trigger: 'change'}
                    ],
                    supplierName:[
                        {required: true, message: '请输入供应商名称', trigger: 'blur'}
                    ],
                    contractTime:[
                        {required: true, message: '请输入合同签订时间', trigger: 'blur'}
                    ],
                    contractAmount:[
                        {required: true, message: '请输入合同金额', trigger: 'change'}
                    ],
                    billingTime:[
                        {required: true, message: '请输入收票时间', trigger: 'blur'}
                    ],
                    billingAmount:[
                        {required: true, message: '请输入收票金额', trigger: 'change'}
                    ],
                    taxPoint:[
                        {required: true, message: '请输入税点', trigger: 'blur'}
                    ],
                    // invoiceRecipient:[
                    //     {required: true, message: '请输入发票收件人', trigger: 'change'}
                    // ],
                    // invoiceSendTime:[
                    //     {required: true, message: '请输入发票寄出时间', trigger: 'blur'}
                    // ],
                    originalContract:[
                        {required: true, message: '请输入合同正本', trigger: 'change'}
                    ],
                    moneyReceiveTime:[
                        {required: true, message: '请输入付款时间', trigger: 'blur'}
                    ],
                    moneyReceiveAmount:[
                        {required: true, message: '请输入付款金额', trigger: 'change'}
                    ],
                    tenderFeeApplicationNumber:[
                        {required: true, message: '请输入费用申请单号', trigger: 'change'}
                    ],
                    tenderFeeApplicationNumberAmount:[
                        {required: true, message: '人工费用', trigger: 'change'}
                    ],
                    // tenderBailReturn:[
                    //     {required: true, message: '请输入投标保证金返还', trigger: 'blur'}
                    // ],
                    // tenderBailReturnTime:[
                    //     {required: true, message: '请输入保证金应返还时间', trigger: 'blur'}
                    // ],
                    moneyReceivecondition:[
                        {required: true, message: '请输入付款条件', trigger: 'change'}
                    ]*/

                    /*
                    projectState:[
                        {required: true, message: '请输入项目状态', trigger: 'change'}
                    ],
                    contractName: [
                        {required: true, message: '请输入合同名称', trigger: 'blur'}
                    ],
                    pmId: [
                        {required: true, message: '请输入项目经理', trigger: 'change'}

                    ],
                    projectName:[
                        {required: true, message: '请输入项目名称', trigger: 'blur'}
                    ],
                    projectType:[
                        {required: true, message: '请选择项目类型', trigger: 'change'}

                    ],
                    customerId:[
                        {required: true, message: '请选择客户名称', trigger: 'change'}

                    ],
                    projectStartTime:[
                        {required: true, message: '请选择项目开始时间', trigger: 'blur'}

                    ],
                    projectEndTime:[
                        {required: true, message: '请选择项目结束时间,应大于开始时间', trigger: 'blur'}

                    ],
                    totalContractAmount:[
                        {required: true, message: '请输入合同总金额', trigger: 'blur'}

                    ],
                    contractRate:[
                        {required: true, message: '请输入合同税率', trigger: 'blur'}
                    ]
                    */
                }
            };
        },
        methods: {
            showProjectTable(){
                this.dialogVisible=true;
                // 解决表头问题？
            },
            closeDialog(){
                console.log("closeDialog start...")
                this.$refs.projectListDlg.cleanSelectCondition();
                console.log("closeDialog end...")
            },
            showProjectName(projectName, projectNum,pmName){
                console.log('dialog---->',projectName, projectNum,pmName)
                this.form.projectName = projectName;
                this.form.projectId = projectNum;
                this.form.projectManager = pmName;
                this.dialogVisible=false;
            },
            /*autoSales(){
                /!*alert("自动带出采购");*!/
                console.log(this.form.customerId);
                util.selectGet(this.form,this.customerIdData,'customerName',this.form.customerId);
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSalePersonByCustomer'+ window.suffix,     /!*选择客户，自动带出采购*!/
                    data:{
                        "entity":this.form.customerId
                    }
                }).then(res => {
                    //成功回调方法
                    console.log(res);
                    this.form.saleId=res.data.content.id;
                    util.selectGet(this.form,this.saleIdData,'saleName',this.form.saleId);
                    /!* this.form.saleName=res.data.content.saleName*!/
                });
            },*/

            saveProjectsInfo: function () {
                console.log(this.form)
                var _this = this;

                if(this.form.contractAmount && this.form.billingAmount && this.form.moneyReceiveAmount && this.form.tenderFeeApplicationNumberAmount) {
                    var reg = /^\d+(\.\d{0,2})?$/;//  /^[1-9]{1}\d*(\.\d{1,9})?$/;
                    if ((!reg.test(this.form.contractAmount))
                        || (!reg.test(this.form.billingAmount))
                        || (!reg.test(this.form.moneyReceiveAmount))
                        || (!reg.test(this.form.tenderFeeApplicationNumberAmount))
                    ) {
                        this.$notify({
                            title: '错误',
                            message: '金额填写错误',
                            type: 'warning'
                        });
                        this.form.contractAmount = '';
                        this.form.billingAmount = '';
                        this.form.moneyReceiveAmount = '';
                        this.form.tenderFeeApplicationNumberAmount = '';
                        this.moneyFlag = false;
                    } else {
                        this.moneyFlag = true;
                        this.form.contractAmount = parseFloat(this.form.contractAmount).toFixed(2);
                        this.form.billingAmount = parseFloat(this.form.billingAmount).toFixed(2);
                        this.form.moneyReceiveAmount = parseFloat(this.form.moneyReceiveAmount).toFixed(2);
                        this.form.tenderFeeApplicationNumberAmount = parseFloat(this.form.tenderFeeApplicationNumberAmount).toFixed(2);
                    }

                }
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.ruleForm = true;
                    }else {
                        this.ruleForm = false;
                    }



                    if ( this.ruleForm && this.moneyFlag ) {
                        // if(this.form.projectStartTime < this.form.projectEndTime){
                        this.$myHttp({
                            method: 'POST',
                            url:this.prefix + 'project/purchaseContract/save'+ window.suffix,
                            data:{
                                "entity": _this.form,
                                "pageNum": 0,
                                "pageSize": 1000,
                            }
                        }).then(res => {
                            //成功回调方法
                            console.log("res----",res);
                            if (res.data.code == 500 ){
                                _this.$notify({
                                    title: '提示',
                                    message: res.data.msg ,
                                    type: 'error'
                                });
                            }else{
                                _this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });

                                _this.$router.push({
                                    name: 'listPurchaseContract',
                                    params:{
                                        currentPage:_this.currentPage
                                    }
                                });
                            }
                        })
                        // }else {
                        //
                        //     this.$notify({
                        //         title: '警告',
                        //         message: '不能提交，项目结束时间早于项目开始时间！',
                        //         type: 'warning'
                        //     });
                        // }



                    }
                });
            },
            close:function () {
                this.$router.push({
                    //name: 'salesContract/listSalesContract',
                    name: 'listPurchaseContract',
                    params:{
                        currentPage:this.currentPage
                    }
                });
            },
            makeDataDictionary:function () {

                var _this = this;

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "税率"
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
                    _this.contractRateData = resArry;
                });

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "是否"
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
                    _this.yesNoData = resArry;
                });


                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'masterdata/customer/getActiveCustomers' + window.suffix,
                    data: {
                    }
                }).then(res => {
                    var resArry = [];
                    for(var items in res.data.content ){
                        resArry.push({
                            label:res.data.content[items].customerName,
                            value:res.data.content[items].id
                        });
                    }
                    _this.customerIdData = resArry;
                    console.log(resArry)
                });





                //采购
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'userrole/getUsersByRoleCode' + window.suffix,
                    data:{
                        roleCode:'02'
                    }
                }).then(res => {

                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].cname,
                            value:res.data.content[items].id
                        })
                    }

                    this.saleIdData = resArry;

                });
            }


        },
        created() {
            var _this = this;
            this.currentPage = this.$route.query.currentPage;
            /*
            if(this.$route.query.projectNum){
                this.projectNum = this.$route.query.projectNum;
            }
            */
            if(this.$route.query.id){
                // this.isFromAdd = true ;
                // this.activeName = 'assessment';
                /* this.abledchoice = true;*/
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/purchaseContract/list' + window.suffix,
                    data: {
                        "entity":{
                            id:_this.$route.query.id
                        },
                        "pageNum": 0,
                        "pageSize": 1000
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form = res.data.rows[0]
                })
            }


            //生成当前页面需要的数据内容
            this.makeDataDictionary();

        },
        computed: {
            /*
            totalContractAmount: {
                set: function(val) {

                    this.form.totalContractAmount = val*1000
                },
                get: function(val) {

                    return this.form.totalContractAmount/1000
                }
            },
            totalHumanCost:{
                set: function(val) {

                    this.form.totalHumanCost = val*1000
                },
                get: function(val) {

                    return this.form.totalHumanCost/1000
                }
            }*/
        }

    };
</script>

<style>

</style>
