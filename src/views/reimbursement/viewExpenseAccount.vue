<template>

    <el-col :span="24" style="background-color: white">

        <div style="padding:0 10px;">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 0px 0 0;padding-left: 10px;font-size: 15px;">非出差申请报销</div>
            <el-form label-position="left" inline class="table-expand">

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="单据编号：" prop="documentNo">
                            {{form.documentNo}}
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请日期：" prop="applyDate">
                            {{form.applyDate}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="报销人：" prop="reserve1">
                            {{form.reserve1}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="报销人部门：" prop="reserve2">
                            {{form.reserve2}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="电话：" prop="reserve3">
                            {{form.reserve3}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱：" prop="reserve4">
                            {{form.reserve4}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="费用原由：" prop="belongTo">
                            {{belongTo}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="费用归属：" prop="belongId">
                            {{belongId}}
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
                        <el-form-item label="项目类型:" prop="projectType">
                            {{form.projectType}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="费用申请单号:" prop="cdwpDocumentNo">
                            {{form.cdwpDocumentNo}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="报销类型：" prop="expenseFor">
                            {{expenseFor}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="票据类型：" prop="billType" >
                            {{billType}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="增值专用发票：" prop="hasTax" >
                            {{hasTax}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="附件张数：" prop="attachNum" >
                            {{form.attachNum}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="发票税额：" prop="taxAmount" >
                            {{form.taxAmount}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="本次报销金额：" prop="expenseAmount" >
                            {{util.returnFloat(form.expenseAmount)}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="16" :xs="20">
                        <el-form-item label="备注：" prop="comment" >
                            {{form.comment}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"  style="margin-bottom: 100px;">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="报销详细：" name="assessment">
                                <my-easy-table :parentParam = "1" ref="expenseTable" :easyTableData="expenseTable"></my-easy-table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>

                <el-col :span="24"  style="margin-bottom: 100px" >
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="相关附件" name="assessment">
                            <attach-table v-if="form.id!=null && form.id!=''" ref="tableUpload" :attachTable="attachment2"></attach-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>

                <el-col :span="24"  style="margin-bottom: 100px">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="本人该项报销详情" name="assessment" >
                            <my-easy-table :parentParam = "1" ref="myTableData" :easyTableData="myTableData"></my-easy-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-form>


            <el-col :span="24" style="background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100">
                <div align="center" style="margin-left: -250px">
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
                                     @checkBeforeProcess="checkBeforeProcess">
                        <!--v-show="approval.show"-->
                    </my-approval-btn>
                    <el-button @click="close()"  size="small" style="margin-top: 20px;margin-bottom: 10px;margin-left: 10px">返回</el-button>
                </div>
            </el-col>
        </div>

    </el-col>
</template>

<script>
    import util from '../../libs/util'
    import myEasyTable from '../../components/myEasyTable.vue'
    import myApprovalBtn from "@/components/myApprovalBtn"
    import attachTable from '../../components/attachTable.vue'

    export default {
        components: {
            myEasyTable,
            myApprovalBtn,
            attachTable
        },
        data() {
            return {
                fromPath:'',
                activeName: 'assessment',
                util:util,
                costBelong:'',
                currentPage:'',
                expenseForData:[],
                labelPosition:'right',
                belongData:[],
                businessType:[],
                billTypeData:[],
                hasTaxData:[],
                calculateData:[],
                innerMegType:[],
                userData:[],
                isShowCenter:false,
                expenseTable:'',
                chooseData:'',
                expenseTypeFlag:false,
                businessTripData:{},
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
                    status:'1',
                    userName:'',
                    id:'',
                    projectType:'',
                    cdwpDocumentNo:'',
                },
                approval:{
                    businessKey:'',
                    processInstanceName:'',
                    processKey:'',
                    woCode:'',
                    taskInstanceId:'',
                    variables:{},
                    taskType:'',
                    show:true
                },
                attachment2:{
                    bizType:"expense",
                    uploadIds:[],
                    isViewButton:true,
                    refId:this.$route.query.id   /*报销ID   附件*/
                },
                isShow: false,
                flag:true,
                expense: {
                    type: '01',
                    title:'其他费用',
                    id: this.$route.query.id,
                    noSum:[1,3,4],
                    clumns:[3],
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择出差开始时间',
                            type: 'datePicker',
                            isTimeData:true
                        },
                        {
                            headName: '金额(元)',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            align:'right'
                        },
                        {
                            headName: '费用明细',
                            headKey: 'summery',
                            placeholder: '请输入费用明细',
                            type: 'input',
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
                    title:'加班餐费',
                    noSum:[1,2,3,4,5,6,8],
                    clumns:[3],
                    title:'',
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择出差开始时间',
                            type: 'datePicker',
                            isTimeData:true
                        },
                        {
                            headName: '工作日/休息日',
                            headKey: 'workOrRest',
                            placeholder: '请选择日期类型',

                        },
                        {
                            headName: '加班开始时间',
                            headKey: 'startTime',
                            placeholder: '请选择出差开始时间',
                            type: 'timePicker',
                            isHour:true,
                        },
                        {
                            headName: '加班结束时间',
                            headKey: 'endTime',
                            placeholder: '请选择出差结束时间',
                            type: 'timePickerCtrl',
                            isHour:true,
                        },
                        {
                            headName: '超过工作小时数',
                            headKey: 'hoursNum',
                            placeholder: '请输入工作小时数',
                            type: 'inputNum'
                        },
                        {
                            headName: '特殊情况',
                            headKey: 'isSpecial',
                            placeholder: '请选择',
                        },
                        {
                            headName: '餐费',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            align:'right'
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
                    title:'加班交通费',
                    noSum:[1,2,3,4,5,6,8],
                    clumns:[3],
                    title:'',
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择出差开始时间',
                            type: 'datePicker',
                            isTimeData:true
                        },
                        {
                            headName: '工作日/休息日',
                            headKey: 'workOrRest',
                            placeholder: '请选择日期类型',
                        },
                        {
                            headName: '加班开始时间',
                            headKey: 'startTime',
                            placeholder: '请选择出差开始时间',
                            type: 'timePicker',
                            isHour:true,
                        },
                        {
                            headName: '加班结束时间',
                            headKey: 'endTime',
                            placeholder: '请选择出差结束时间',
                            type: 'timePickerCtrl',
                            isHour:true,
                        },
                        {
                            headName: '超过工作小时数',
                            headKey: 'hoursNum',
                            placeholder: '请输入工作小时数',
                            type: 'inputNum'
                        },
                        {
                            headName: '特殊情况',
                            headKey: 'isSpecial',
                            placeholder: '请选择',
                        },
                        {
                            headName: '交通费费',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            align:'right'
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
                    noSum:[1,2,3],
                    clumns:[3],
                    tableThead: [
                        {
                            headName: '年度',
                            headKey: 'reserve1',
                            isNeedFix: true,
                            isFirstColumn: true,
                        },
                        {
                            headName: '申请日期',
                            headKey: 'applyDate',
                            isTimeData:true

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
                }
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm=>{
                if(from.name) {
                    sessionStorage.setItem('viewExpenseAccountName',from.name);
                    vm.fromPath = from.name;  //path为定义的变量，不是vue的data定义的变量，当前生命周期data还未初始化
                }else{
                    vm.fromPath=sessionStorage.getItem('viewExpenseAccountName');
                }
            });
        },
        methods: {
            getUser:function(userName){
                var entity = {username:userName};
                if(!userName){
                    entity = {username:sessionStorage.getItem('userName')};
                }
                var url = this.prefix + '/sysData/getUserByUsername' + window.suffix;
                this.$myHttp({
                    method: 'POST',
                    url: url,
                    data:{
                        "entity":entity
                    }
                }).then(res => {
                    this.userData = res.data.rows[0];
                    if(this.userData.username != sessionStorage.getItem('userName') && this.approval.taskType != "transated" && this.approval.taskType != "waitfor"){
                        this.approval.show = false;
                    }
                    this.form.reserve1 = res.data.rows[0].cname;
                    this.form.reserve2 = res.data.rows[0].orgName;
                    this.form.reserve3 = res.data.rows[0].mobile;
                    this.form.reserve4 = res.data.rows[0].email;
                    this.form.userName = res.data.rows[0].username;
                })
            },
            close: function () {
               /* var _this = this;
                this.$router.push({
                    name: 'listExpenseAccount',
                    params:{
                        currentPage:_this.currentPage
                    }
                });*/
                let pageOpenedList = this.$store.state.app.pageOpenedList;
                pageOpenedList.forEach((item,index)=>{
                    if(item.name=='viewExpenseAccount'){
                        pageOpenedList.splice(index,1);
                        localStorage.setItem('pageOpenedList',pageOpenedList);
                    }
                });
                this.$router.push({
                    name: this.fromPath,
                });
            },
            autoSupplier (belongTo, isNull) {
                if(isNull == 1){
                    this.form.belongId = "";
                }
                var url = "";
                if(belongTo == 1 || belongTo == 2){
                    this.isShowCenter = false;
                    if(belongTo == 2){
                        url = this.prefix + '/project/getOppoList' + window.suffix;
                    }else if(belongTo == 1){
                        url = this.prefix + '/project/getProjectList' + window.suffix;
                    }
                    this.$myHttp({
                        method: 'POST',
                        url: url,
                        data: {
                            "entity": {},
                        }
                    }).then(res => { // 成功回调方法
                        var resArry = [];
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

                        }
                        this.belongData = resArry;
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
                            this.form.projectType = this.projectTypeData[items].label;
                        }
                    }
                });
            },
            expenseForFunction(){
                var _this = this;
                this.expenseTypeFlag=true;
                let expense = _this.form.expenseFor;
                if(expense != "" && (expense != "6" && expense != "7")){
                    _this.expenseTable = _this.expense;
                }else if(expense != "" && expense == "6"){
                    _this.expenseTable = _this.expenseMeal;
                }else if(expense != "" && expense == "7"){
                    _this.expenseTable = _this.expenseTrans;
                }
            },

            /**
             * 提交之前校验业务表单
             */
            checkBeforeProcess() {
                var checkData = true;
                if (this.approval.taskType == "") {
                    checkData = false;
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'expense/checkExpenseAmount' + window.suffix,
                        data: {
                            "entity": this.form,
                            "orderBy": "id asc"
                        }
                    }).then(res => {//成功回调方法
                        if (res.data.subCode == '0') {
                            checkData = true;
                            if (checkData) {
                                this.$refs.processSubmit.submit();
                            }
                        } else {
                            this.$notify({
                                title: '警告',
                                message: res.data.subMsg,
                                type: 'warning'
                            });
                        }
                    });
                }
                if (checkData && this.approval.taskType != "") {
                    this.$refs.processSubmit.submit();
                }
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
                            id:this.form.id
                        }
                    }
                }).then(res => {
                    let data = res.data.rows[0];
                    data.status = status;
                    data.processInstanceId = piid;
                   /* var totalData = {};
                    totalData.account =data;
                    totalData.infoList = this.$refs.expenseTable.getTableAllData();*/
                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + 'expense/modifyStatus' + window.suffix,
                        data: {
                            "entity": data
                        }
                    }).then(res => {
                        let pageOpenedList = this.$store.state.app.pageOpenedList;
                        pageOpenedList.forEach((item,index)=>{
                            if(item.name=='viewExpenseAccount'){
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
            showDetail(documentNo){
                var _this = this;
                _this.isShow = true;
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
                    //成功回调方法
                    _this.form = res.data.rows[0];
                    _this.expenseForFunction();
                    var search = {
                        "accountId": res.data.rows[0].id
                    }
                    _this.autoSupplier(res.data.rows[0].belongTo, 0);
                    _this.getUser(_this.form.userName);
                    _this.$refs.expenseTable.getData('expense/getExpenseInfo',search);
                    var report = {
                        "id": res.data.rows[0].id
                    };
                    this.attachment2.refId = res.data.rows[0].id;
                    _this.$refs.myTableData.getData('expense/calculateExpenseTotal',report);
                    //工作流
                    this.approval.variables.type = _this.form.belongTo;
                    this.approval.businessKey = _this.form.documentNo; //业务标识ID
                    if(_this.form.belongTo == 1) {
                        this.getProjectInfo();
                    }
                })
            }
        },


        created() {
            //跨router传参方式
            this.makeDataDictionary();
            this.currentPage = this.$route.params.currentPage;
            let id;
            let documentNo;
            if(this.$route.params.row){//判断进入详情页面时修改还是待办
                documentNo = this.$route.params.row.businessKey;
            }else{
                documentNo = this.$route.query.documentNo;
                id = this.$route.query.id;

            }
            this.form.id = id;
            /**
             * 工作流相关
             */
            if (this.$route.params.row != undefined && this.$route.params.row.activityId != undefined) {
                this.approval.taskInstanceId = this.$route.params.row.id;
                this.approval.businessKey = this.$route.params.row.businessKey;
                this.approval.taskType = this.$route.params.row.taskType;
            }
            this.approval.woCode = "expenseAccount"; //工单启动
            this.currentPage = this.$route.query.currentPage;
            if (documentNo) {
                Promise.all([this.makeDataDictionary()]).then(res=>{
                    this.showDetail(documentNo);
                })
                this.attachment2.refId = id;
            }
            console.log("approval",this.approval)

        },
        mounted(){
            /**
             * 工作流相关
             */
            if(this.$route.query.processInstanceId != null) {
                this.$refs.processSubmit.submitVisable = false;
                this.$refs.processSubmit.hisVisable = true;
                this.$refs.processSubmit.processInstanceId = this.$route.query.processInstanceId;
            }
        },
        computed: {
            belongTo:function(){
                for(var items in this.businessType){
                    if(this.businessType[items].value == this.form.belongTo){
                        return this.businessType[items].label
                    }
                }
            },
            belongId:function(){
                for(var items in this.belongData){
                    if(this.belongData[items].value == this.form.belongId){
                        return this.belongData[items].label
                    }
                }
            },
            expenseFor:function(){
                for(var items in this.expenseForData){
                    if(this.expenseForData[items].value == this.form.expenseFor){
                        return this.expenseForData[items].label
                    }
                }
            },
            hasTax:function(){
                for(var items in this.hasTaxData){
                    if(this.hasTaxData[items].value == this.form.hasTax){
                        return this.hasTaxData[items].label
                    }
                }
            },
            billType:function(){
                for(var items in this.billTypeData){
                    if(this.billTypeData[items].value == this.form.billType){
                        return this.billTypeData[items].label
                    }
                }
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
