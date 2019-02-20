<template>

    <el-col :span="24" style="background-color: white">

        <div style="padding:0 10px;">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 0px 0 0;padding-left: 10px;font-size: 15px;">出差申请</div>
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
                        <el-form-item label="申请人：" prop="reserve1">
                            {{form.reserve1}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请人所在部门：" prop="reserve2">
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

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差目的地：" prop="destination">
                            {{form.destination}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差开始日期：" prop="startTime">
                           {{form.startTime}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差结束日期：" prop="endTime">
                            {{form.endTime}}
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20" >
                        <el-form-item label="预计出差费用：" prop="reason" >
                            {{util.returnFloat(form.totalAmount)}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span="16" :xs="20">
                        <el-form-item label="出差事由：" prop="reason" >
                            {{form.reason}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="margin-bottom: 100px;">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="预计发生费用：" name="assessment">

                                <my-easy-table :parentParam = "1" ref="farTransportation" :easyTableData="farTransportation"></my-easy-table>

                                <my-easy-table :parentParam = "1" ref="hotelExpense" :easyTableData="hotelExpense"></my-easy-table>

                                <my-easy-table :parentParam = "1" ref="cityTransportation" :easyTableData="cityTransportation"></my-easy-table>

                                <my-easy-table :parentParam = "1" ref="otherPayment" :easyTableData="otherPayment"></my-easy-table>

                            </el-tab-pane>
                        </el-tabs>
                    </el-col>

                </el-row>

            </el-form>


            <el-col :span="24" style="background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100;">
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
                    <el-button @click="close()" size="small" style="margin-top: 20px;margin-bottom: 10px;margin-left: 10px">返回</el-button>
                </div>
            </el-col>
        </div>

    </el-col>
</template>

<script>
    import myEasyTable from '../../components/myEasyTable.vue'
    import myApprovalBtn from "@/components/myApprovalBtn"
    import util from '../../libs/util'


    export default {
        components: {
            myEasyTable,
            myApprovalBtn
        },
        data() {
            return {
                fromPath:'',
                util:util,
                activeName: 'assessment',
                currentPage:'',
                labelPosition:'right',
                belongData:[],
                businessType:[],
                innerMegType:[],
                userData:[],
                isShowCenter:false,

                form: {
                    documentNo:'',
                    applyDate:'',
                    reserve1:'',
                    reserve2:'',
                    reserve3:'',
                    reserve4:'',
                    belongTo:'',
                    belongId:'',
                    employSalary:'',
                    destination:'',
                    startTime:'',
                    endTime:'',
                    reason:'',
                    totalAmount:'',
                    applyUser:'',
                    id:''
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
                flag:true,
                costBelong:'',
                farTransportation: {
                    type: '01',
                    id: this.$route.query.id,
                    allCost:['totalrycbcost',6],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    noSum:[1,2,3,4,5,7,8],
                    title:'远途交通费',
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
                            headName: '终止地点',
                            headKey: 'endPlace',
                            placeholder: '请输入起始地点',
                            type: 'input'
                        },
                        {
                            headName: '交通工具',
                            width: '120',
                            headKey: 'trafficTools',
                            placeholder: '请选择交通工具',
                            /*selectData: 'trafficData',
                            selectCode: '交通工具'*/
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
                    allCost:['totalxxcbcost',5],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    title:'酒店住宿费',
                    noSum:[1,2,3,4,5,6,8],
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
                    noSum:[1,2,3,5],
                    allCost:['totalxmwccost',4],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    id: this.$route.query.id,
                    title:'市内交通费',
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
                            placeholder: '请输入到达地点',
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
                otherPayment: {
                    isNeedSummary:false,
                    type: '04',
                    id: this.$route.query.id,
                    allCost:['totalwbrycost',3],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    noSum:[1,2,4],
                    title:'其他费用',
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
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm=>{
                if(from.name) {
                    sessionStorage.setItem('viewBusinessTripName',from.name);
                    vm.fromPath = from.name;  //path为定义的变量，不是vue的data定义的变量，当前生命周期data还未初始化
                }else{
                    vm.fromPath=sessionStorage.getItem('viewBusinessTripName');
                }
            });
        },
        methods: {
            getUser:function(applyUser){
                var entity = {id:applyUser};
                var url = this.prefix + 'sysData/getUser' + window.suffix;

                if(!applyUser){
                    entity = {username:sessionStorage.getItem('userName')};
                    url = this.prefix + 'sysData/getUserByUsername' + window.suffix;
                }
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
                })
            },
            close: function () {
               /* var _this = this;
                this.$router.push({
                    name: 'listBusinessTrip',
                    params:{
                        currentPage:_this.currentPage
                    }
                });*/
                let pageOpenedList = this.$store.state.app.pageOpenedList;
                pageOpenedList.forEach((item,index)=>{
                    if(item.name=='viewBusinessTrip'){
                        pageOpenedList.splice(index,1);
                        localStorage.setItem('pageOpenedList',pageOpenedList);
                    }
                });
                this.$router.push({
                    name: this.fromPath,
                });
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
                 }).then(res => {
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
            },

            autoSupplier (belongTo) {
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
                        this.belongData = resArry;
                    });
                }else if(belongTo == 3){
                    this.belongData = this.innerMegType;
                    this.isShowCenter = true;
                    this.form.costCenter = this.userData.orgCode;
                }
            },

            /**
             * 提交之前校验业务表单
             */
            checkBeforeProcess() {
                if (true) {
                    this.$refs.processSubmit.submit();
                } else {
                    this.$message({
                        message: '数据校验失败',
                        type: 'warning'
                    });
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
                    url: this.prefix + 'expense/getBusinessTripList' + window.suffix,
                    data: {
                        entity:{
                            id:this.form.id,
                        }
                    }
                }).then(res => {
                    let data = res.data.rows[0];
                    data.status = status;
                    data.processInstanceId = piid;
                    var totalData = {};
                    totalData.businessTrip =data;
                    totalData.farList = this.$refs.farTransportation.getTableAllData();
                    totalData.cityList = this.$refs.cityTransportation.getTableAllData();
                    totalData.hotelList = this.$refs.hotelExpense.getTableAllData();
                    totalData.otherList = this.$refs.otherPayment.getTableAllData();
                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + 'expense/saveBusinessTrip' + window.suffix,
                        data: {
                            "entity": totalData
                        }
                    }).then(res => {
                        let pageOpenedList = this.$store.state.app.pageOpenedList;
                        pageOpenedList.forEach((item,index)=>{
                            if(item.name=='viewBusinessTrip'){
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
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'expense/getBusinessTripList' + window.suffix,
                    data: {
                        "entity": {
                            "documentNo": documentNo
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form = res.data.rows[0];
                    _this.autoSupplier(res.data.rows[0].belongTo);
                    this.getUser(_this.form.applyUser);
                    this.approval.variables.type = _this.form.belongTo;
                    this.approval.businessKey = _this.form.documentNo; //业务标识ID
                    //工作流
                    var search = {
                        "paymentId": res.data.rows[0].id
                    };
                    _this.$refs.farTransportation.getData('expense/getFarTransporList',search);
                    _this.$refs.hotelExpense.getData('expense/getHotelExpenseList',search);
                    _this.$refs.otherPayment.getData('expense/getOtherPaymentList',search);
                    _this.$refs.cityTransportation.getData('expense/getCityTransportion',search);
                })
            },
            /**
             * 显示详情(根据单据编号查找)
             */
            getInfoByDocumentNo(documentNo){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'expense/getBusinessTripList' + window.suffix,
                    data: {
                        "entity": {
                            "documentNo": documentNo
                        }
                    }
                }).then(res => {//成功回调方法
                    _this.form = res.data.rows[0];
                });
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
                id = this.$route.query.id ;
            }

            /**
             * 工作流相关
             */
            if (this.$route.params.row != undefined && this.$route.params.row.activityId != undefined) {
                this.approval.taskInstanceId = this.$route.params.row.id;
                this.approval.businessKey = this.$route.params.row.businessKey;
                this.approval.taskType = this.$route.params.row.taskType;
            }
            this.approval.woCode = "businessTrip"; //工单启动
            this.currentPage = this.$route.query.currentPage;
            if (documentNo) {
                Promise.all([this.makeDataDictionary()]).then(res=>{
                    this.showDetail(documentNo);
                })
            }
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
                this.approval.processInstanceName = "出差申请【" + this.userData.cname + ":"
                    + this.form.startTime + "_" + this.form.endTime + "-"+this.form.destination + "-出差预算:" + this.form.totalAmount+"-费用归属:"+this.costBelong+"】";
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
