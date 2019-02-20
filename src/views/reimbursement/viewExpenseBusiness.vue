<template>

    <el-col :span="24" style="background-color: white">

        <div style="padding:0px 10px;">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 0px 0 0;padding-left: 10px;font-size: 15px;">出差申请报销</div>
            <el-form label-position="left" inline class="table-expand">

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="单据编号：" prop="documentNo">
                            {{form.documentNo}}
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请日期：" prop="documentNo">
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
                        <el-form-item label="报销人所在部门：" prop="reserve2">
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
                        <el-form-item v-if="isShowCenter" label="成本中心：" prop="belongId">
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
                        <el-form-item label="票据类型：" prop="billType" >
                            {{billType}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="增值专用发票：" prop="hasTax" >
                            {{hasTax}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="附件张数：" prop="attachNum" >
                            {{form.attachNum}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="发票税额：" prop="taxAmount" >
                            {{form.taxAmount}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差申请单号：" prop="businessId">
                            {{trip.documentNo}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="单据编号：" prop="tripDocumentNo">
                            <span>{{trip.documentNo}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请日期：" prop="tripApplyDate">
                            {{trip.applyDate}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请人：">
                            {{trip.reserve1}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请人所在部门：">
                            {{trip.reserve2}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="电话：">
                            {{trip.reserve3}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱：">
                            {{trip.reserve4}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差费用原由：">
                            {{trip.belongTo}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差费用归属：">
                            <span>{{tripBelongId}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item  label="出差目的地：">
                            {{trip.destination}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差开始日期：">
                            {{trip.startTime}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差结束日期：">
                            {{trip.endTime}}
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计远途交通费(元)：">
                            {{util.returnFloat(trip.far)}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计酒店总金额(元)：">
                            {{util.returnFloat(trip.hotel)}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计市内交通费(元)：">
                            {{util.returnFloat(trip.city)}}
                        </el-form-item>
                    </el-col>

                    <!--<el-col :span="8" :xs="20">
                        <el-form-item label="预计差补(元)：">
                            {{trip.endTime}}
                        </el-form-item>
                    </el-col>
                </el-row>-->
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计出差费用：">
                            {{util.returnFloat(trip.totalAmount)}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计其他费用(元)：">
                            {{util.returnFloat(trip.other)}}
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差事由：">
                            {{trip.reason}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="8" :xs="20">
                        <el-form-item label="本次报销金额：" prop="expenseAmount" >
                            {{util.returnFloat(form.expenseAmount)}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row >
                    <el-col :span="16" :xs="20">
                        <el-form-item label="备注：" prop="comment" >
                            {{form.comment}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="margin-bottom: 100px;">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="预计发生费用" name="assessment">

                                <my-easy-table :parentParam = "1" ref="farTransportation" :easyTableData="farTransportation"></my-easy-table>

                                <my-easy-table :parentParam = "1" ref="hotelExpense" :easyTableData="hotelExpense"></my-easy-table>

                                <my-easy-table :parentParam = "1" ref="cityTransportation" :easyTableData="cityTransportation"></my-easy-table>

                                <my-easy-table :parentParam = "1" ref="otherPayment" :easyTableData="otherPayment"></my-easy-table>
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


                <el-col :span="24">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="本人该项报销详情" name="assessment">
                            <my-easy-table :parentParam = "1" ref="myTableData" :easyTableData="myTableData" style="margin-bottom: 100px;"></my-easy-table>
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
    import operationTable from '../../components/operationTable.vue'
    import util from '../../libs/util'
    import myEasyTable from '../../components/myEasyTable.vue'
    import myApprovalBtn from "@/components/myApprovalBtn"
    import attachTable from '../../components/attachTable.vue'

    export default {
        components: {
            operationTable,
            myEasyTable,
            myApprovalBtn,
            attachTable

        },
        data() {
            return {
                activeName:'assessment',
                util:util,
                currentPage: '',
                costBelong:'',
                labelPosition: 'right',
                belongData: [],
                belongData2: [],
                businessType: [],
                billTypeData:[],
                innerMegType:[],
                isShowCenter:false,
                hasTaxData:[],
                userData:[],
                projectTypeData:[],
                userId:'',
                pickerOptions0: this.endTime(),
                businessTripData:{},
                form: {
                    documentNo: '',
                    applyDate: new Date(),
                    reserve1: '',
                    reserve2: '',
                    reserve3: '',
                    reserve4: '',
                    belongTo: '',
                    belongId: '',
                    expenseFor: '8',
                    expenseAmount: 0,
                    expenseType: '0',
                    businessId: '',
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
                trip: {
                    documentNo: '',
                    applyDate: '',
                    reserve1: '',
                    reserve2: '',
                    reserve3: '',
                    reserve4: '',
                    belongTo: '',
                    belongId: '',
                    employSalary: '',
                    destination: '',
                    startTime: '',
                    endTime: '',
                    reason: '',
                    totalAmount: 0,
                    trvlAllowance:'',
                    hotel:''
                },
                flag: true,
                farTransportation: {
                    type: '01',
                    id: this.$route.query.id,
                    clumns: [3],
                    noSum:[1,2,3,4,5,7,8],
                    title: '远途交通费',
                    tableThead: [
                        {
                            headName: '开始日期',
                            headKey: 'startTime',
                            placeholder: '请选择开始日期',
                            type: 'datePicker',
                            isTimeData:true
                        },
                        {
                            headName: '结束日期',
                            headKey: 'endTime',
                            placeholder: '请选择结束日期',
                            type: 'datePickerCtrl',
                            startTime: this.startTime,
                            isTimeData:true
                        },
                        {
                            headName: '起始地点',
                            headKey: 'startPlace',
                            placeholder: '请输入起始地点',
                            type: 'input'
                        },

                        {
                            headName: '终止地点',
                            headKey: 'endPlace',
                            placeholder: '请输入起始地点',
                            type: 'input'
                        },
                        {
                            headName: '交通工具',
                            headKey: 'trafficTools',
                            placeholder: '请选择交通工具',
                        },
                        {
                            headName: '金额(元)',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            align:'right'
                        },
                        {
                            headName: '付款方',
                            headKey: 'drawee',
                            placeholder: '请选择付款方',
                        },
                        {
                            headName: '备注',
                            headKey: 'comment',
                            placeholder: '请输入备注',
                            type: 'input'
                        }
                    ]
                },
                hotelExpense: {
                    type: '02',
                    id: this.$route.query.id,
                    noSum:[1,2,3,4,5,6,8],
                    clumns: [3],
                    title: '酒店住宿费',
                    hotelFlag:'02',
                    tableThead: [
                        {
                            headName: '入住日期',
                            headKey: 'checkInDate',
                            placeholder: '请选择开始日期',
                            type: 'datePicker',
                            isTimeData:true
                        },
                        {
                            headName: '离开日期',
                            headKey: 'checkOutDate',
                            placeholder: '请选择离开日期',
                            type: 'datePicker',
                            isTimeData:true
                        },
                        {
                            headName: '地点',
                            headKey: 'place',
                            placeholder: '请输入地点',
                            type: 'input'
                        },
                        {
                            headName: '酒店',
                            headKey: 'hotel',
                            placeholder: '请输入酒店',
                            type: 'input'
                        },
                        {
                            headName: '单价(元)',
                            headKey: 'priceUnit',
                            placeholder: '自动计算',
                            type: 'input',
                            readOnly:true
                        },
                        {
                            headName: '入住天数',
                            headKey: 'totalDays',
                            placeholder: '自动计算,可修改',
                            type: 'inputNum',
                        },
                        {
                            headName: '金额(元)',
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
                cityTransportation: {
                    type: '03',
                    id: this.$route.query.id,
                    clumns: [3],
                    title: '市内交通费',
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择出差开始日期',
                            type: 'datePicker',
                            isTimeData:true
                        },
                        {
                            headName: '起始地点',
                            headKey: 'startPlace',
                            placeholder: '请输入起始地点',
                            type: 'input'
                        },
                        {
                            headName: '到达地点',
                            headKey: 'endPlace',
                            placeholder: '请选择出差结束日期',
                            type: 'input'
                        },
                        {
                            headName: '金额(元)',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum'
                        },
                        {
                            headName: '备注',
                            headKey: 'comment',
                            placeholder: '请输入备注',
                            type: 'input',
                            align:'right'
                        }
                    ]
                },
                otherPayment: {
                    isNeedSummary: false,
                    type: '04',
                    noSum:[1,2,4],
                    clumns: [3],
                    title: '其他费用',
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择出差开始日期',
                            type: 'datePicker',
                            isTimeData:true
                        },
                        {
                            headName: '摘要',
                            headKey: 'summary',
                            placeholder: '请输入起始地点',
                            type: 'input'
                        },
                        {
                            headName: '金额(元)',
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
                    title: '',
                    tableThead: [
                        {
                            headName: '年度',
                            headKey: 'reserve1',
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
                },
            };
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
            getUser:function(applyUser){
                var entity = {username:applyUser};
                if(!applyUser){
                    entity = {username:sessionStorage.getItem('userName')};
                }
                var url = this.prefix + 'sysData/getUserByUsername' + window.suffix;
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
                    this.userId = res.data.rows[0].id;
                    this.getBusinessTrip();
                })
            },
            getDocumentCode:function(){
                //console.log("coolies",Cookies);
                var url = this.prefix + 'expense/getDocumentCode' + window.suffix;
                this.$myHttp({
                    method: 'POST',
                    url: url,
                    data:{
                        "entity":{
                            documentNo:"BX"
                        }
                    }
                }).then(res => {
                    this.form.documentNo = res.data.rows[0].documentNo;
                })
            },
            /**
             *保存
             */
            saveProjectsInfo: function () {
                var _this = this;
                var totalData = {};
                totalData.account = _this.form;
                totalData.farList = this.$refs.farTransportation.getTableData();
                totalData.cityList = this.$refs.cityTransportation.getTableData();
                totalData.hotelList = this.$refs.hotelExpense.getTableData();
                totalData.otherList = this.$refs.otherPayment.getTableData();

                var url = this.prefix + 'expense/saveExpenseAccount' + window.suffix;
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }else {
                        this.ruleFormOne = false;
                    }

                    if (this.ruleFormOne) {
                        if(this.flag==true){
                            this.$myHttp({
                                method: 'POST',
                                url: url,
                                data:{
                                    "entity":totalData
                                }
                            }).then(res => {
                                //成功回调方法
                                _this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });
                                _this.$router.push({
                                    name: 'reimbursement/listExpenseAccount',
                                    params:{
                                        currentPage:_this.currentPage
                                    }
                                });
                            })
                        }else{
                            this.$notify({
                                title: '警告',
                                message: '所填名称与其他名称重复，请修改！',
                                type: 'warning'
                            });
                        }


                    }
                });
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
                    if(item.name=='viewExpenseBusiness'){
                        pageOpenedList.splice(index,1);
                        localStorage.setItem('pageOpenedList',pageOpenedList);
                    }
                });
                this.$router.push({
                    name: 'reimbursement/listExpenseAccount',
                });
            },
            autoSupplier (belongTo, isNull) {
                if(isNull == 1){
                    this.form.belongId = "";
                }
                var url = "";
                if(belongTo == 1 || belongTo == 2){
                    if(isNull == 1){
                        this.isShowCenter = false;
                    }
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
                        },
                    }).then(res => {// 成功回调方法
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
                    if(isNull == 1){
                        this.isShowCenter = true;
                    }
                    this.isShowCenter = true;
                    this.form.costCenter = this.userData.orgCode;
                }
            },
            makeDataDictionary:function () {
                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "出差归属"
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
                    _this.businessType = resArry;
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
                        this.getUser(this.form.userName);
                        if(_this.form.belongTo == 1) {
                            this.getProjectInfo();
                        }
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

            getBusinessTrip(){
                var _this = this;//出差申请
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'expense/getBusinessTripList' + window.suffix,
                    data: {
                        "entity": {
                            "applyUser": this.userId,
                            "status":1
                        },
                        "orderBy": "id asc"
                    }
                }).then(res => {//成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].documentNo,
                            value:res.data.rows[items].id
                        })
                    }
                    _this.businessTripData = resArry;
                });
            },
            getBusinessInfo(){
                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'expense/getBusinessTripListForExp' + window.suffix,
                    data: {
                        "entity": {
                            "id": this.form.businessId
                        },
                        "orderBy": "id asc"
                    }
                }).then(res => {//成功回调方法
                    this.makeDataDictionary();
                    console.log("出差数据",res.data.rows[0])
                    var belongTo = res.data.rows[0].belongTo;
                    _this.trip = res.data.rows[0];
                    _this.trip.hotel = res.data.rows[0].maps[0].hotel;
                    _this.trip.far = res.data.rows[0].maps[0].far;
                    _this.trip.city = res.data.rows[0].maps[0].city;
                    _this.trip.other = res.data.rows[0].maps[0].other;
                    for(var items in _this.businessType){
                        if(_this.businessType[items].value == res.data.rows[0].belongTo){
                            _this.trip.belongTo = _this.businessType[items].label;
                        }
                    }
                });
            },
            handleClick(){
                //总计
                var _this = this;
                const cost = (Number(this.$store.state.totalrycbcost) + this.$store.state.totalxxcbcost + this.$store.state.totalxmwccost + this.$store.state.totalwbrycost) || '0'
                _this.form.expenseAmount = util.returnFloat(cost/1000);
                console.log("total", parseFloat(_this.form.expenseAmount))
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
                console.log(this.approval)
                if (checkData && this.approval.taskType != "") {
                    this.$refs.processSubmit.submit();
                } /*else {
                    this.$message({
                        message: '数据校验失败',
                        type: 'warning'
                    });
                }*/
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
                    /*var totalData = {};
                    totalData.account =data;
                    totalData.farList = this.$refs.farTransportation.getTableAllData();
                    totalData.cityList = this.$refs.cityTransportation.getTableAllData();
                    totalData.hotelList = this.$refs.hotelExpense.getTableAllData();
                    totalData.otherList = this.$refs.otherPayment.getTableAllData();*/
                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + 'expense/modifyStatus' + window.suffix,
                        data: {
                            "entity": data
                        }
                    }).then(res => {
                        let pageOpenedList = this.$store.state.app.pageOpenedList;
                        pageOpenedList.forEach((item,index)=>{
                            if(item.name=='viewExpenseBusiness'){
                                pageOpenedList.splice(index,1);
                                localStorage.setItem('pageOpenedList',pageOpenedList);
                            }
                        });
                        this.$router.push({
                            name: 'reimbursement/listExpenseAccount',
                        });
                    });
                });
            },
            /**
             *详情
             **/
            showDetail(documentNo){
                var _this = this;
                this.currentPage = this.$route.query.currentPage;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'expense/getExpenseAccount' + window.suffix,
                    data: {
                        "entity": {
                            "documentNo":documentNo
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form = res.data.rows[0];
                    var search = {
                        "paymentId": res.data.rows[0].id
                    }
                    _this.getUser(_this.form.userName);
                    _this.$refs.farTransportation.getData('expense/getFarTransporList',search);
                    _this.$refs.hotelExpense.getData('expense/getHotelExpenseList',search);
                    _this.$refs.otherPayment.getData('expense/getOtherPaymentList',search);
                    _this.$refs.cityTransportation.getData('expense/getCityTransportion',search);
                    var report = {
                        "id": res.data.rows[0].id
                    };
                    _this.$refs.myTableData.getData('expense/calculateExpenseTotal',report);
                    _this.getBusinessInfo();
                    _this.autoSupplier(_this.form.belongTo, 0);
                    this.approval.variables.type = _this.form.belongTo;
                    this.approval.businessKey = _this.form.documentNo; //业务标识ID
                    this.attachment2.refId = res.data.rows[0].id;
                   // this.processData();
                    if(_this.form.belongTo == 1) {
                        this.getProjectInfo();
                    }
                })
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
            /**
             * 项目商机列表
             */
            autoSupplier2 (belongTo, isNull) {
                var url = "";
                var resArry = [];
                if(belongTo == 1 || belongTo == 2){
                    if(isNull == 1){
                        this.isShowCenter = false;
                    }

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
                        },
                    }).then(res => {// 成功回调方法

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
                        this.belongData2 = resArry;
                    });
                }else if(belongTo == 3){
                    this.belongData2 = this.innerMegType;
                    if(isNull == 1){
                        this.isShowCenter = true;
                    }

                    this.form.costCenter = this.userData.orgCode;
                }
            },
        },


        created() {
            //跨router传参方式
            this.makeDataDictionary();
            let id;
            let documentNo;
            if(this.$route.params.row){//判断进入详情页面时修改还是待办
                documentNo = this.$route.params.row.businessKey;
            }else{
                documentNo = this.$route.query.documentNo;
                id = this.$route.query.id;
            }
            /**
             * 工作流相关
             */
            if (this.$route.params.row != undefined && this.$route.params.row.activityId != undefined) {
                this.approval.taskInstanceId = this.$route.params.row.id;
                this.approval.businessKey = this.$route.params.row.businessKey;
                this.approval.taskType = this.$route.params.row.taskType;
            }
            this.approval.woCode = "expenseBusiness"; //工单启动
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
            tripBelongId:function(){
                for(var items in this.belongData){
                    if(this.belongData[items].value == this.trip.belongId){
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
                this.approval.processInstanceName = "出差报销【"+this.userData.cname+":报销金额" + this.form.expenseAmount+"-费用归属:"+
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
        width: 150px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
        white-space:nowrap;
    }
</style>
