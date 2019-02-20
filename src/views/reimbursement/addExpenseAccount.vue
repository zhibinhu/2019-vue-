<template>

    <el-col :span="24" style="background-color: white">

        <div style="padding:0 10px;">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 0px 0 0;padding-left: 10px;font-size: 15px;">非出差申请报销</div>
            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 20px;margin-bottom: 20px;overflow: hidden">
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="单据编号" prop="documentNo">
                            <el-input disabled="disabled" v-model="documentCode"  style="width: 95%" size="small" ></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请日期" prop="applyDate">
                            <el-date-picker
                                    v-model="form.applyDate"
                                    :default-value="form.applyDate"
                                    :disabled="true"
                                    size="small"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间" style="width: 95%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="报销人" prop="reserve1">
                            {{form.reserve1}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="报销人所在部门" prop="reserve2">
                            {{form.reserve2}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="电话" prop="reserve3">
                            {{form.reserve3}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱" prop="reserve4">
                            {{form.reserve4}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="费用原由" prop="belongTo">
                            <el-select v-model="form.belongTo" @change="autoSupplier(form.belongTo, 1)" clearable placeholder="请选择" filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in businessType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="费用归属" prop="belongId">
                            <el-select v-model="form.belongId" placeholder="请选择" clearable @change="getBusinessTrip" filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in belongData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item v-if="isShowCenter" label="成本中心" prop="belongId">
                            {{form.reserve2}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="form.belongTo == 1">
                    <el-col :span="8" :xs="20" >
                        <el-form-item label="项目类型" prop="projectType">
                            {{form.projectType}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="单据编号" prop="cdwpDocumentNo">
                            <el-input v-model="form.cdwpDocumentNo" placeholder="请输入" style="width: 90%" size="small"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="费用类型" prop="expenseFor">
                            <el-select v-model="form.expenseFor" placeholder="请选择" clearable @change="expenseForFunction" filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in expenseForData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="票据类型" prop="billType" >
                            <el-select v-model="form.billType" placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in billTypeData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="增值专用发票" prop="hasTax" >
                            <el-select v-model="form.hasTax" placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in hasTaxData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="附件张数" prop="attachNum" >
                            <el-input-number v-model="form.attachNum"  controls-position="right" :min="1" :max="9999" style="width: 95%" size="small"  ></el-input-number>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="发票税额" prop="taxAmount" >
                            <el-input v-model="form.taxAmount" placeholder="请输入" maxlength="16" style="width: 95%" size="small"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="本次报销金额" prop="expenseAmount" >
                            {{util.returnFloat(expenseAmount)}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16" :xs="20">
                        <el-form-item label="备注" prop="comment" >
                            <el-input v-model="form.comment" placeholder="请输入内容" maxlength="200" style="width: 95%" size="small" type="textarea" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" >
                        <el-tabs v-model="activeName" >
                            <el-tab-pane label="报销详细" name="assessment">
                                <operation-table v-if="updateFlag" :parentParam = "1" ref="expenseTable" :operationTable="expenseTable"></operation-table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>


                <el-col :span="24"  style="margin-bottom: 100px" >
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="相关附件" name="assessment">
                            <!--v-if="isShowFile"-->
                            <attach-table v-if="attachment2.refId!=null && attachment2.refId!=''" ref="tableUpload" :attachTable="attachment2"></attach-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>

                <el-col :span="24"  style="margin-bottom: 100px" >
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="本人该项报销详情" name="assessment">
                            <my-easy-table :parentParam = "1" ref="myTableData" :easyTableData="myTableData" style="margin-bottom: 100px;"></my-easy-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-form>


            <el-col :span="24" style="background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100">
                <div align="center" style="margin-left: -250px">
                    <el-button @click="checkBeforeSubmit()" :disabled="twoClick" type="primary" size="small" style="margin-top: 20px;margin-bottom: 10px;margin-right: 10px">保存</el-button>
                    <el-col style="display: none" :span="16" :xs="20">
                        {{processData}}
                    </el-col>
                    <!--
                      businessKey 发起流程时必须传入 业务id
                      processInstanceName 流程实例名称（业务单据名称） 发起流程时必须传入
                      processKey 流程图key
                      woCode 工单编码-需在“工单与流程映射”中配置
                      taskInstanceId 从待办，已办页面进入时获取任务ID 发起流程是没有可为空
                      taskType    任务类型 已办还是待办 从待办已办进入时可以获取 发起流程是没有可为空
                      variables    业务参数 配合流程图中配置的业务参数传入具体的值
                      processCallback 审批完成之后业务回调方法
                      checkBeforeProcess 审批之前业务校验
                  -->
                    <my-approval-btn ref="processSubmit"
                                     :businessKey="approval.businessKey"
                                     :processInstanceName="approval.processInstanceName"
                                     :processKey="approval.processKey"
                                     :woCode="approval.woCode"
                                     :taskInstanceId="approval.taskInstanceId"
                                     :variables="approval.variables"
                                     :taskType="approval.taskType"
                                     @processCallback="processCallback"
                                     @checkBeforeProcess="checkBeforeProcess"
                                     v-show="approval.show">
                    </my-approval-btn>
                    <el-button @click="close()"  size="small" style="margin-top: 20px;margin-bottom: 10px;margin-left: 10px">返回</el-button>
                </div>
            </el-col>
        </div>

    </el-col>
</template>

<script>
    import operationTable from '../../components/operationTable.vue'
    import util from '../../libs/util'
    import myEasyTable from '../../components/myEasyTable.vue'
    import attachTable from '../../components/attachTable.vue'
    import myApprovalBtn from "@/components/myApprovalBtn"

    export default {
        components: {
            operationTable,
            myEasyTable,
            attachTable,
            myApprovalBtn
        },
        data() {
            return {
                updateFlag:true,
                fromPath:'',
                twoClick:false,//判断是否为新增界面的第一次保存
                util:util,
                costBelong:'',
                documentCode:'创建后自动生成',
                activeName:'assessment',
                currentPage:'',
                expenseForData:[],
                labelPosition:'right',
                belongData:[],
                businessType:[],
                billTypeData:[],
                userData:[],
                innerMegType:[],
                isShowCenter:false,
                isShowFile:false,
                checkData:true,
                hasTaxData:[],
                projectTypeData:[],
                calculateData:[],
                expenseTable:'',
                chooseData:'',
                pickerOptions0: this.endTime(),
                expenseTypeFlag:false,
                attachment2:{
                    bizType:"expense",
                    uploadIds:[],
                    refId:this.$route.query.id   /*报销ID   附件*/
                },
                approval:{
                    businessKey:'',
                    processInstanceName:'',
                    processKey:'',
                    woCode:'',
                    taskInstanceId:'',
                    variables:{},
                    taskType:'',
                    show:''
                },
                form: {
                    documentNo:'',
                    applyDate:new Date(),
                    reserve1:'',
                    reserve2:'',
                    reserve3:'',
                    reserve4:'',
                    belongTo:'',
                    belongId:'',
                    expenseFor:'',
                    expenseAmount:0,
                    expenseType:'1',
                    taxAmount:'',
                    comment:'',
                    hasTax:'',
                    attachNum:'',
                    billType:'',
                    status:'2',
                    userName:'',
                    id:this.$route.query.id,
                    projectType:'',
                    cdwpDocumentNo:'',
                },
                isShow: false,
                flag:true,
                flagFar:true,
                flagOther:true,
                flagCity:true,
                expense: {
                    type: '01',
                    id: this.$route.query.id,
                    allCost:['totalrycbcost',2],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    costClumns:[1,3,4],
                    clumns:[3],
                    title:'',
                    search:'',//获取旧数据所需参数
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择日期',
                            type: 'datePicker',
                            isShowMust:'star'
                        },
                        {
                            headName: '金额(元)',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            isShowMust:'star',
                            align:'right',
                        },
                        {
                            headName: '费用明细',
                            headKey: 'summery',
                            placeholder: '请输入费用明细',
                            type: 'input'
                        },
                        {
                            headName: '备注',
                            headKey: 'comment',
                            placeholder: '请输入备注',
                            type: 'input'
                        }
                    ]
                },

                expenseMeal : {//报销加班餐费
                    type: '01',
                    allCost:['totalxxcbcost',7],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    costClumns:[1,2,3,4,5,6,8],
                    clumns:[3],
                    title:'',
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择日期时间',
                            type: 'datePicker',
                            isShowMust:'star'
                        },
                        {
                            headName: '工作日/休息日',
                            headKey: 'workOrRest',
                            placeholder: '请选择日期类型',
                            selectData: 'dateType',
                            selectCode: '日期类型',
                            isShowMust:'star'
                        },
                        {
                            headName: '加班开始时间',
                            headKey: 'startTime',
                            placeholder: '请选择开始时间',
                            type: 'timePickerFree',
                            isShowMust:'star'
                        },
                        {
                            headName: '加班结束时间',
                            headKey: 'endTime',
                            placeholder: '请选择结束时间',
                            type: 'timePickerCtrlFree',
                            isShowMust:'star'
                        },
                        {
                            headName: '超过工作小时数',
                            headKey: 'hoursNum',
                            placeholder: '请输入工作小时数',
                            type: 'inputNum',
                            isShowMust:'star'
                        },
                        {
                            headName: '特殊情况',
                            headKey: 'isSpecial',
                            placeholder: '请选择',
                            selectData: 'isSpecialData',
                            selectCode: '是否',
                            isShowMust:'star'
                        },
                        {
                            headName: '餐费',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            isShowMust:'star',
                            align:'right',
                        },
                        {
                            headName: '同餐员工',
                            headKey: 'summery',
                            placeholder: '请输入员工名称',
                            type: 'input'
                        },
                        {
                            headName: '备注',
                            headKey: 'comment',
                            placeholder: '请输入备注',
                            type: 'input'
                        }
                    ]
                },
                expenseTrans : {//报销加班交通费
                    type: '01',
                    allCost:['totalxmwccost',7],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    costClumns:[1,2,3,4,5,6,8],
                    clumns:[3],
                    title:'',
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择日期时间',
                            type: 'datePicker',
                            isShowMust:'star'
                        },
                        {
                            headName: '工作日/休息日',
                            headKey: 'workOrRest',
                            placeholder: '请选择日期类型',
                            selectData: 'dateType',
                            selectCode: '日期类型',
                            isShowMust:'star'
                        },
                        {
                            headName: '加班开始时间',
                            headKey: 'startTime',
                            placeholder: '请选择开始时间',
                            type: 'timePickerFree',
                            isShowMust:'star'
                        },
                        {
                            headName: '加班结束时间',
                            headKey: 'endTime',
                            placeholder: '请选择结束时间',
                            type: 'timePickerCtrlFree',
                            isShowMust:'star'
                        },
                        {
                            headName: '超过工作小时数',
                            headKey: 'hoursNum',
                            placeholder: '请输入工作小时数',
                            type: 'inputNum',
                            isShowMust:'star'
                        },
                        {
                            headName: '特殊情况',
                            headKey: 'isSpecial',
                            placeholder: '请选择',
                            selectData: 'isSpecialData',
                            selectCode: '是否',
                            isShowMust:'star'
                        },
                        {
                            headName: '交通费',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            isShowMust:'star',
                            align:'right',
                        },
                        {
                            headName: '备注',
                            headKey: 'comment',
                            placeholder: '请输入备注',
                            type: 'input'
                        }
                    ]
                },
                myTableData: {
                    type: '01',
                    allCost:['totalxmwccost',4],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    noSum:[1,2,3],
                    clumns:[3],
                    tableThead: [
                        {
                            headName: '年度',
                            headKey: 'reserve1',
                        },
                        {
                            headName: '申请日期',
                            headKey: 'applyDate',

                        },
                        {
                            headName: '报销类型',
                            headKey: 'expenseFor',
                            selectCode: '报销类型',
                            selectData: 'expenseData',
                        },
                        {
                            headName: '金额（元）',
                            headKey: 'expenseAmount',
                            align:'right'
                        },
                    ]
                },
                rules: {
                    belongTo: [
                        {required: true, message: '请选择费用原由', trigger: 'blur'}
                    ],
                    belongId: [
                        {required: true, message: '请选择费用归属', trigger: 'blur'}
                    ],
                    expenseFor: [
                        {required: true, message: '请选择报销类型', trigger: 'blur'}
                    ],
                    billType: [
                        {required: true, message: '请选择发票类型', trigger: 'blur'}
                    ],
                    attachNum: [
                        {required: true, message: '请输入附件张数', trigger: 'blur'}
                    ],
                    hasTax: [
                        {required: true, message: '请选择是否有增值税发票', trigger: 'blur'}
                    ],
                    /*cdwpDocumentNo: [
                        {required: true, message: '请输入费用申请单号', trigger: 'blur'}
                    ],*/
                }
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm=>{
                if(from.name) {
                    sessionStorage.setItem('listExpenseName',from.name);
                    vm.fromPath = from.name;  //path为定义的变量，不是vue的data定义的变量，当前生命周期data还未初始化
                }else{
                    vm.fromPath=sessionStorage.getItem('listExpenseName');
                }
            });
        },
        methods: {
            /**
             * 校验员工单价
             */
            checkSalary:function(){
                var reg=/^[1-9]{1}\d*(\.\d{1,9})?$/;
                var salary = this.form.employSalary;
                if(!reg.test(salary)){
                    this.$notify({
                        title: '错误',
                        message: '金额填写错误',
                        type: 'warning'
                    });
                    this.form.employSalary = "";
                    return false;
                }
                this.form.employSalary = parseFloat(salary).toFixed(2);
            },
            getUser:function(){
                //console.log("coolies",Cookies);
                var url = this.prefix + 'sysData/getUserByUsername' + window.suffix;
                this.$myHttp({
                    method: 'POST',
                    url: url,
                    data:{
                        "entity":{
                            username:sessionStorage.getItem('userName')
                        }
                    }
                }).then(res => {
                    this.userData = res.data.rows[0];
                    this.form.reserve1 = res.data.rows[0].cname;
                    this.form.reserve2 = res.data.rows[0].orgName;
                    this.form.reserve3 = res.data.rows[0].mobile;
                    this.form.reserve4 = res.data.rows[0].email;
                    this.form.userName = res.data.rows[0].username;
                })
            },
            getDocumentCode:function(){
                //console.log("coolies",Cookies);
                if(!this.$route.query.id) {
                    var url = this.prefix + 'expense/getDocumentCode' + window.suffix;
                    this.$myHttp({
                        method: 'POST',
                        url: url,
                        data: {
                            "entity": {
                                documentNo: "BX"
                            }
                        }

                    }).then(res => {
                        this.form.documentNo = res.data.rows[0].documentNo;
                    })
                }
            },

            /**
             * 提交之前校验业务表单
             */
            checkBeforeSubmit() {
                let url = 'expense/checkExpenseAmount';
                if(this.approval.taskType != ""){
                    url = 'expense/checkExpenseAmountForPros';
                }
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + url + window.suffix,
                    data: {
                        "entity": this.form,
                    }
                }).then(res => {//成功回调方法
                    if (res.data.subCode == '0') {
                        this.saveProjectsInfo();
                    } else {
                        this.$notify({
                            title: '警告',
                            message: res.data.subMsg,
                            type: 'warning'
                        });
                    }
                });
            },
            /**
             *保存
             */
            saveProjectsInfo: function () {
                var _this = this;
                var totalData = {};
                totalData.infoList = this.$refs.expenseTable.getTableData();
                totalData.account = _this.form;
                var url = this.prefix + 'expense/saveExpenseAccount' + window.suffix;
                this.$refs['ruleFormOne'].validate((valid) => {
                if (valid) {
                    this.ruleFormOne = true;
                }else {
                    this.ruleFormOne = false;
                }
                if(totalData.infoList.length <= 0){
                    this.$notify({
                        title: '输入不完整',
                        message: '请输入报销详细数据',
                        type: 'error'
                    });
                    return false;
                }
                var isCheck = this.checkBeforeSave(totalData);
                if(isCheck == false){
                    return false;
                }
                if (this.ruleFormOne) {
                    this.twoClick = true;
                        this.$myHttp({
                            method: 'POST',
                            url: url,
                            data:{
                                "entity":totalData
                            }
                        }).then(res => {
                            //成功回调方法
                            if (res.data.subCode == '0') {
                                if(this.attachment2.uploadIds){     /*如果有附件，才执行此方法*/
                                    var myentity=[];
                                    for(const i in this.attachment2.uploadIds){
                                        myentity.push({"bizType": "expense","id":this.attachment2.uploadIds[i],"refId": res.data.ext.id});
                                    }
                                    console.log('获取到的所有图片id是',myentity);
                                    this.$myHttp({
                                        method: 'POST',
                                        url: this.prefix + 'resource/updateByIds' + window.suffix,
                                        data: {
                                            'entity':myentity,
                                        }
                                    }).then(res => {
                                        console.log("上传保存成功")
                                    });
                                }
                                this.$message({
                                    message: '保存成功',
                                    type: 'success',
                                    duration: 1000,
                                    onClose: () => {
                                        _this.form = res.data.rows[0];
                                        _this.documentCode =  _this.form.documentNo;
                                        this.$route.query.id = res.data.rows[0].id;
                                        var search = {
                                            "accountId": res.data.rows[0].id
                                        };
                                        _this.autoSupplier(res.data.rows[0].belongTo,0);
                                        for(var items in this.belongData){
                                            if(this.belongData[items].value == this.form.belongId){
                                                this.costBelong = this.belongData[items].label
                                            }
                                        }
                                        this.isShowFile = true;
                                        this.attachment2.bizType = "expense";
                                        this.attachment2.refId = res.data.rows[0].id;
                                        _this.$refs.expenseTable.getData('expense/getExpenseInfo',search);
                                        this.approval.processInstanceName = "非出差报销【" + this.userData.cname + ":报销金额:" + this.form.expenseAmount+"-费用归属:"+this.costBelong+"】";
                                        this.approval.variables.type = _this.form.belongTo;
                                        this.approval.businessKey = _this.form.documentNo; //业务标识ID
                                        this.approval.show = true;
                                        _this.twoClick=false;
                                        this.getProjectInfo();
                                    }
                                });
                            }else {
                                _this.twoClick=false;
                            }
                        })
                    }else{
                        this.$notify({
                            title: '输入不完整',
                            message: '请完善详细数据',
                            type: 'error'
                        });
                        _this.twoClick=false;
                    }
                });
            },


            /**
             *保存前参数校验
             */
            checkBeforeSave:function(data){
                let info = data.infoList;
                var flag = true;
                let expense = this.form.expenseFor;
                for(var items in info) {
                    if (expense != "" && (expense != "6" && expense != "7")) {
                        if(this.checkNull(info[items].date)|| this.checkNull(info[items].amount)){
                            this.$message({
                                message: '报销详细数据填写不完全',
                                type: 'warning'
                            });
                            flag = false;
                            break;
                        }else{
                            flag = true;
                        }
                    } else if (expense != "" && expense == "6") {
                        if(this.checkNull(info[items].date)|| this.checkNull(info[items].amount) || this.checkNull(info[items].workOrRest)
                        || this.checkNull(info[items].startTime)|| this.checkNull(info[items].endTime)|| this.checkNull(info[items].isSpecial)){
                            this.$message({
                                message: '报销详细数据填写不完全',
                                type: 'warning'
                            });
                            flag = false;
                            break;
                        }else{
                            flag = true;
                        }
                    } else if (expense != "" && expense == "7") {
                        if(this.checkNull(info[items].date)|| this.checkNull(info[items].amount) || this.checkNull(info[items].workOrRest)
                            || this.checkNull(info[items].startTime)|| this.checkNull(info[items].endTime)|| this.checkNull(info[items].isSpecial)){
                            this.$message({
                                message: '报销详细数据填写不完全',
                                type: 'warning'
                            });
                            flag = false;
                            break;
                        }else{
                            flag = true;
                        }
                    }
                }
                return flag;
            },

            checkNull:function(str){
                console.log(str)
                if(str == null || str == "" || str == undefined){
                    return true
                }
                return false;
            },
            close: function () {
                let pageOpenedList = this.$store.state.app.pageOpenedList;
                pageOpenedList.forEach((item,index)=>{
                    if(item.name=='editExpenseAccount'){
                        pageOpenedList.splice(index,1);
                        localStorage.setItem('pageOpenedList',pageOpenedList);
                    }
                });
                console.log('this.fromPath--',this.fromPath)
                this.$router.push({
                    name: this.fromPath,
                });
            },
            autoSupplier (belongTo, isNull) {
                this.belongData = [];
                if(isNull == 1){
                    this.form.belongId = "";
                }
                var url = "";
                var resArry = [];
                if(belongTo == 1 || belongTo == 2){
                    this.isShowCenter = false;
                    if(belongTo == 2){
                        url = this.prefix + 'project/getOppoList' + window.suffix;
                    }else if(belongTo == 1){
                        url = this.prefix + 'project/getProjectList' + window.suffix;
                    }
                    this.$myHttp({
                        method: 'POST',
                        url: url,
                        data: {
                            "entity": {},
                        }
                    }).then(res => { // 成功回调方法
                        for(var items in res.data.rows){
                            if(belongTo == 2){
                                resArry.push({
                                    label:res.data.rows[items].oppoProjectName,
                                    value:res.data.rows[items].id
                                })
                            }else if(belongTo == 1){
                                resArry.push({
                                    label:res.data.rows[items].projectName,
                                    value:res.data.rows[items].id
                                })
                            }
                            this.belongData = resArry;
                        }
                    });
                }else if(belongTo == 3){
                    this.belongData = this.innerMegType;
                    this.isShowCenter = true;
                    this.form.costCenter = this.userData.orgCode;
                }
            },
            makeDataDictionary:function () {
                var _this = this;
                //出差归属
                this.$myHttp({
                     method: 'POST',
                     url:this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                     data: {
                         "entity": {
                             "dtype": "出差归属"
                         },
                         "orderBy": "idx asc"
                     }
                 }).then(res => {  //成功回调方法
                     var resArry = [];
                     for(var items in res.data.rows){
                         resArry.push({
                             label:res.data.rows[items].dvalue,
                             value:res.data.rows[items].dkey
                         })
                     }
                    _this.businessType = resArry;
                 });

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
                        if(res.data.rows[items].dkey != 8) {
                            resArry.push({
                                label: res.data.rows[items].dvalue,
                                value: res.data.rows[items].dkey
                            })
                        }
                    }
                    this.expenseForData = resArry;
                });

                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "票据类型"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {//成功回调方法
                    var resArry = [];

                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.billTypeData = resArry;
                });

                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "是否"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {//成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.hasTaxData = resArry;
                    console.log("33444",resArry)
                });

                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "报销内部管理"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.innerMegType = resArry;
                });

                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "项目类型"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.projectTypeData = resArry;
                });

                /**
                 * 工作流
                 */
                if(this.approval.taskType) {
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'expense/getExpenseAccount' + window.suffix,
                        data: {
                            entity: {
                                documentNo: this.$route.params.row.businessKey
                            }
                        }
                    }).then(res => {
                        this.form = res.data.rows[0];
                        this.attachment2.refId = res.data.rows[0].id;
                    });
                }
            },
            endTime () {
                var that = this;
                return {
                    disabledDate (time) {
                        if (that.form.startTime) {
                            return new Date(that.form.startTime).getTime() > time.getTime();
                        } else {

                        }
                    }
                };
            },
            expenseForFunction(search){
                var _this = this;
                this.expenseTypeFlag=true;
                this.$refs.expenseTable.cleanData();
                let expense = _this.form.expenseFor;
                this.updateFlag=false;
                if(expense != "" && (expense != "6" && expense != "7")){
                    if(search) {
                        _this.expense.search = search;
                    }
                    _this.expenseTable = _this.expense;
                }else if(expense != "" && expense == "6"){
                    _this.expenseTable = _this.expenseMeal;
                }else if(expense != "" && expense == "7"){
                    _this.expenseTable = _this.expenseTrans;
                }
                setTimeout(()=>{
                    this.updateFlag=true;
                },1)
            },

            getApplyDate(){
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'expense/getApplyDate' + window.suffix,
                    data: {
                        "entity": {},
                    }
                }).then(res => {
                    this.form.applyDate = res.data.ext.applyDate;
                });
            },
            /**
             *
             * 出差列表
             */
            getBusinessTrip(){
                var _this = this;//出差申请
                var report = {
                    "belongTo": _this.form.belongTo,
                    "belongId": _this.form.belongId,
                    "userName":sessionStorage.getItem('userName')
                };
                _this.$refs.myTableData.getData('expense/calculateExpenseTotal',report);
                if(_this.form.belongTo == 1) {
                    this.getProjectInfo();
                }
            },

            getProjectInfo:function(){
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'project/getProjectList' + window.suffix,
                    data: {
                        "entity": {
                            "id": this.form.belongId,
                        },
                        "orderBy": "id asc"
                    }
                }).then(res => {//成功回调方法
                    for(var items in this.projectTypeData){
                        if(this.projectTypeData[items].value == res.data.rows[0].projectType){
                            /*this.form.projectType = this.projectTypeData[items].label;*/
                            this.$set(this.form,'projectType',this.projectTypeData[items].label)
                        }
                    }
                });
            },
            showDetail(documentNo){
                // debugger;
                var _this = this;
                _this.approval.show = true;
                this.currentPage = this.$route.query.currentPage;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'expense/getExpenseAccount' + window.suffix,
                    data: {
                        "entity": {
                            "documentNo": documentNo
                        }
                    }
                }).then(res => {
                    console.log('res--form----',res)
                    //成功回调方法
                    _this.form = res.data.rows[0];
                    console.log('form----',this.form)
                    var search = {
                        "accountId": res.data.rows[0].id
                    }
                    _this.expenseForFunction(search);
                    _this.autoSupplier(res.data.rows[0].belongTo,0);
                    for(var items in this.belongData){
                        if(this.belongData[items].value == this.form.belongId){
                            this.costBelong = this.belongData[items].label
                        }
                    }
                    this.approval.processInstanceName = "非出差报销【" + this.userData.cname + ":报销金额" + this.form.expenseAmount+"-费用归属:"+this.costBelong+"】";
                    this.approval.businessKey = _this.form.documentNo; //业务标识ID
                    this.approval.variables.type = _this.form.belongTo;
                    _this.getUser();
                    // _this.$refs.expenseTable.getData('expense/getExpenseInfo',search);
                    var report = {
                        "id": res.data.rows[0].id
                    };
                    if(_this.form.belongTo == 1) {
                        this.getProjectInfo();
                    }
                    this.attachment2.refId = res.data.rows[0].id;
                    _this.documentCode =  _this.form.documentNo;
                    _this.$refs.myTableData.getData('expense/calculateExpenseTotal',report);
                })
            },
            /**
             * 提交之前校验业务表单
             */
            checkBeforeProcess() {
                let url = 'expense/checkExpenseAmount';
                if(this.approval.taskType != ""){
                    url = 'expense/checkExpenseAmountForPros';
                }
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + url + window.suffix,
                    data: {
                        "entity": this.form,
                        "orderBy": "id asc"
                    }
                }).then(res => {//成功回调方法
                    if (res.data.subCode == '0') {
                        this.saveProjectsInfo();
                        this.$refs.processSubmit.submit();
                    } else {
                        this.$notify({
                            title: '警告',
                            message: res.data.subMsg,
                            type: 'warning'
                        });
                    }
                });
            },


            /**
             * 流程审批之后业务数据更改
             */
            processCallback(piid, optionType,taskType) {
                let status = '3';
                if(optionType == 'endProcess') {
                    status = '1';
                }else if(optionType == "repelProcess") {
                    status = '2';
                }
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'expense/getExpenseAccount' + window.suffix,
                    data: {
                        entity:{
                            id:this.form.id,
                            pageSize:1
                        }
                    }
                }).then(res => {
                    let data = res.data.rows[0];
                    data.status = status;
                    data.processInstanceId = piid;
                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + 'expense/modifyStatus' + window.suffix,
                        data: {
                            "entity": data
                        }
                    }).then(res => {
                        let pageOpenedList = this.$store.state.app.pageOpenedList;
                        pageOpenedList.forEach((item,index)=>{
                            if(item.name=='editExpenseAccount'){
                                pageOpenedList.splice(index,1);
                                localStorage.setItem('pageOpenedList',pageOpenedList);
                            }
                        });
                        this.$router.push({
                            name: this.fromPath,
                        });
                    });
                });
            },
        },


        created() {
            //跨router传参方式
            this.makeDataDictionary();
            this.currentPage = this.$route.params.currentPage;
            this.getUser();
            this.expenseTable = this.expenseMeal;
            this.approval.show = this.$route.params.id != undefined
            let id;
            let documentNo;
            if(this.$route.params.row){//判断进入详情页面时修改还是待办\
                documentNo = this.$route.params.row.businessKey;
            }else{
                documentNo = this.$route.query.documentNo;
                id = this.$route.query.id;
            }
            this.approval.woCode = "expenseAccount";
            if (this.$route.params.row != undefined && this.$route.params.row.pid != undefined) {
                this.approval.show = this.$route.params.row.businessKey != undefined
                this.approval.taskInstanceId = this.$route.params.row.id
                this.form.id = this.$route.params.row.businessKey
                this.approval.taskType = this.$route.params.row.taskType
                this.approval.businessKey = this.$route.params.row.businessKey;
            }
            if(documentNo){
                Promise.all([this.makeDataDictionary()]).then(res=>{
                    this.showDetail(documentNo);
                });
                this.isShowFile = true;
                this.attachment2.bizType="expense";
                this.attachment2.refId = id;
            }else {     /*新增情况*/
                this.attachment2.bizType="temp";
                this.attachment2.refId=new Date().getTime()+"_"+Math.floor(Math.random()*100)
                this.getApplyDate();
            }

        },
        mounted(){
        },
        computed: {
            //总计
            expenseAmount: function () {
                var _this = this;
                let cost = 0;
                let expense = _this.form.expenseFor;
                if (expense != "" && (expense != "6" && expense != "7")) {
                    cost = Number(this.$store.state.totalrycbcost) || '0'
                } else if (expense != "" && expense == "6") {
                    cost = Number(this.$store.state.totalxxcbcost) || '0'
                } else if (expense != "" && expense == "7") {
                    cost = Number(this.$store.state.totalxmwccost) || '0'
                }
                _this.form.expenseAmount = cost / 1000;
                return _this.form.expenseAmount;
            },
            /**
             *
             **/
            processData(){
                for(var items in this.belongData){
                    if(this.belongData[items].value == this.form.belongId){
                        this.costBelong = this.belongData[items].label
                    }
                }
                //工作流
                this.approval.processInstanceName = "非出差报销【"+this.userData.cname+":报销金额" + this.form.expenseAmount+"-费用归属:"+
                    this.costBelong+"】";
                console.log( this.approval.processInstanceName)
            },
        }
    };
</script>

<style>

</style>
