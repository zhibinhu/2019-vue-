<template>

    <el-col :span="24" style="background-color: white">

        <div style="padding:0 10px;">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 0px 0 0;padding-left: 10px;font-size: 15px;">出差申请</div>
            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 50px;margin-bottom: 20px;overflow: hidden">
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
                                    size="small"
                                    :disabled="true"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间" style="width: 95%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请人" prop="reserve1">
                            {{form.reserve1}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请人所在部门" prop="reserve2">
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
                            <el-select v-model="form.belongId" placeholder="请选择" clearable filterable size="small"
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

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差目的地" prop="destination">
                            <el-input v-model="form.destination" maxlength="20" style="width: 95%" size="small"  ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差开始日期" prop="startTime">
                            <el-date-picker
                                    v-model="form.startTime"
                                    size="small"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    @change="form.endTime = ''"
                                    placeholder="选择日期时间" style="width: 95%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差结束日期" prop="endTime">
                            <el-date-picker
                                    v-model="form.endTime"
                                    size="small"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptions0"
                                    start-placeholder="form.startTime"
                                    placeholder="选择日期日期" style="width: 95%">
                            </el-date-picker>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16" :xs="20">
                        <el-form-item label="预计出差费用" prop="reason" >
                            {{util.returnFloat(totalAmount)}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16" :xs="20">
                        <el-form-item label="出差事由" prop="reason" >
                            <el-input v-model="form.reason" style="width: 95%" maxlength="200" size="small"  type="textarea" ></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>

                    <el-col :span="24" style="margin-bottom: 100px;">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="预计发生费用" name="assessment">

                                <operation-table :parentParam = "1" ref="farTransportation" :operationTable="farTransportation"></operation-table>

                                <operation-table :parentParam = "1" ref="hotelExpense" :operationTable="hotelExpense"></operation-table>

                                <operation-table :parentParam = "1" ref="cityTransportation" :operationTable="cityTransportation"></operation-table>

                                <operation-table :parentParam = "1" ref="otherPayment" :operationTable="otherPayment"></operation-table>
                            </el-tab-pane>

                        </el-tabs>
                    </el-col>
                </el-row>



            </el-form>


            <el-col :span="24" style="background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100">
                <div align="center" style="margin-left: -250px">
                    <el-col style="display: none" :span="16" :xs="20">
                        {{processData}}
                    </el-col>
                    <el-button @click="saveProjectsInfo()" :disabled="twoClick"  type="primary" size="small" style="margin-top: 20px;margin-bottom: 10px;margin-right: 10px">保存</el-button>
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

                    <el-button @click="close()" size="small" style="margin-top: 20px;margin-bottom: 10px; margin-left: 10px">返回</el-button>
                </div>
            </el-col>
        </div>

    </el-col>
</template>

<script>
    import operationTable from '../../components/operationTable.vue'
    import util from '../../libs/util'
    import myApprovalBtn from "@/components/myApprovalBtn"

    export default {
        components: {
            operationTable,
            myApprovalBtn
        },
        data() {
            return {
                fromPath:'',
                twoClick:false,//判断是否为新增界面的第一次保存
                util:util,
                documentCode:'创建后自动生成',
                currentPage:'',
                labelPosition:'right',
                belongData:[],
                businessType:[],
                innerMegType:[],
                userData:[],
                activeName: 'assessment',
                pickerOptions0: this.endTime(),
                isShowCenter:false,
                costBelong:'',
                form: {
                    documentNo:'',
                    applyDate:new Date(),
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
                    status:'2',
                    totalAmount:0,
                    orgCode:'',
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
                    show:''
                },
                totalFlag:true,
                flag:true,
                flagFar:true,
                flagOther:true,
                flagCity:true,
                farTransportation: {
                    type: '01',
                    id: this.$route.query.id,
                    allCost:['totalrycbcost',6],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    costClumns:[1,2,3,4,5,7,8],
                    clumns:[3],
                    title:'远途交通费',
                    tableThead: [
                        {
                            headName: '开始日期',
                            headKey: 'startTime',
                            placeholder: '请选择开始日期',
                            type: 'datePicker',
                            isShowMust:'star'
                        },
                        {
                            headName: '结束日期',
                            headKey: 'endTime',
                            placeholder: '请选择结束日期',
                            type: 'datePickerCtrl',
                            startTime: 'startTime',
                            isShowMust:'star'
                        },
                        {
                            headName: '起始地点',
                            headKey: 'startPlace',
                            placeholder: '请输入起始地点',
                            type: 'input',
                            isShowMust:'star'

                        },
                        {
                            headName: '终止地点',
                            headKey: 'endPlace',
                            placeholder: '请输入终止地点',
                            type: 'input',
                            isShowMust:'star'
                        },
                        {
                            headName: '交通工具',
                            headKey: 'trafficTools',
                            placeholder: '请选择交通工具',
                            selectData: 'trafficData',
                            selectCode: '交通工具',
                            isShowMust:'star'
                        },
                        {
                            headName: '金额(元)',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            align:'right',
                            isShowMust:'star'
                        },
                        {
                            headName: '付款方',
                            headKey: 'drawee',
                            placeholder: '请选择付款方',
                            selectData: 'draweeData',
                            selectCode: 'drawee',
                            isShowMust:'star'
                        },
                        {
                            headName: '备注',
                            headKey: 'comment',
                            placeholder: '请输入备注',
                            type: 'input',
                        }
                    ]
                },
                hotelExpense: {
                    type: '02',
                    id: this.$route.query.id,
                    allCost:['totalxxcbcost',7],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    costClumns:[1,2,3,4,5,6,8],
                    clumns:[3],
                    liveDate:false,
                    title:'酒店住宿费',
                    hotelFlag:'02',
                    tableThead: [
                        {
                            headName: '入住日期',
                            headKey: 'checkInDate',
                            placeholder: '请选择入住日期',
                            type: 'datePicker',
                            isShowMust:'star'
                        },
                        {
                            headName: '离开日期',
                            headKey: 'checkOutDate',
                            placeholder: '请选择离开日期',
                            type: 'datePickerCtrl',
                            startTime: 'checkInDate',
                            isShowMust:'star'
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
                            isShowMust:'star',
                            readOnly:true,
                            align:'right'
                        },
                        {
                            headName: '入住天数',
                            headKey: 'totalDays',
                            placeholder: '自动计算,可修改',
                            type: 'inputNum',
                            isShowMust:'star'
                        },
                        {
                            headName: '金额(元)',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            align:'right',
                            isShowMust:'star'
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
                    costClumns:[1,2,3,5],
                    allCost:['totalxmwccost',4],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    clumns:[3],
                    title:'市内交通费',
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择日期',
                            type: 'datePicker',
                            isShowMust:'star'
                        },
                        {
                            headName: '起始地点',
                            width: '180',
                            headKey: 'startPlace',
                            placeholder: '请输入起始地点',
                            type: 'input'
                        },
                        {
                            headName: '到达地点',
                            headKey: 'endPlace',
                            placeholder: '输入到达地点',
                            type: 'input'
                        },
                        {
                            headName: '金额(元)',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            align:'right',
                            isShowMust:'star'
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
                    costClumns:[1,2,4],
                    id: this.$route.query.id,
                    allCost:['totalwbrycost',3],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    clumns:[3],
                    title:'其他费用',
                    tableThead: [
                        {
                            headName: '日期',
                            headKey: 'date',
                            placeholder: '请选择日期',
                            type: 'datePicker',
                            isShowMust:'star'
                        },
                        {
                            headName: '摘要',
                            headKey: 'summary',
                            placeholder: '请输入摘要',
                            type: 'input'
                        },
                        {
                            headName: '金额(元)',
                            headKey: 'amount',
                            placeholder: '请输入金额',
                            type: 'inputNum',
                            align:'right',
                            isShowMust:'star'
                        },
                        {
                            headName: '备注',
                            headKey: 'comment',
                            placeholder: '请输入备注',
                            type: 'input'
                        }
                    ]
                },
                rules: {
                    belongTo: [
                        {required: true, message: '请选择费用原由', trigger: 'blur'}
                    ],
                    belongId: [
                        {required: true, message: '请选择费用归属', trigger: 'blur'}
                    ],
                    destination: [
                        {required: true, message: '请输入目的地', trigger: 'change'}
                    ],
                    startTime: [
                        {required: true, message: '请选择开始时间', trigger: 'change'}
                    ],
                    endTime: [
                        {required: true, message: '请选择结束时间', trigger: 'change'}
                    ],
                }
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
            /**
             * 获得当前登录人信息
             */
            getUser:function(){
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
                    this.form.orgCode = res.data.rows[0].orgCode;
                })
            },
            /**
             *保存
             */
            saveProjectsInfo: function () {
                var _this = this;
                var totalData = {};
                totalData.businessTrip = _this.form;
                //_this.form.id = this.$route.query.id;
                totalData.farList = this.$refs.farTransportation.getTableData();
                totalData.cityList = this.$refs.cityTransportation.getTableData();
                totalData.hotelList = this.$refs.hotelExpense.getTableData();
                totalData.otherList = this.$refs.otherPayment.getTableData();

                //this.totalAmount();
                var url = this.prefix + 'expense/saveBusinessTrip' + window.suffix;
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }else {
                        this.ruleFormOne = false;
                    }
                    if(totalData.otherList.length <= 0 && totalData.hotelList.length <= 0 && totalData.cityList.length <= 0 && totalData.farList.length <= 0){
                        this.$notify({
                            title: '输入不完整',
                            message: '请完善出差详细数据',
                            type: 'error'
                        });
                        return false;
                    }
                    var isCheck = this.checkBeforeSave(totalData);
                    if(isCheck == false){
                        return false;
                    }
                    if (this.ruleFormOne) {
                        this.twoClick=true;
                        this.$myHttp({
                            method: 'POST',
                            url: url,
                            data:{
                                "entity":totalData
                            }
                        }).then(res => {
                            if(res.status === 200) {
                                if (res.data == "" && res.data.subCode != '0') {
                                    this.$notify({
                                        title: '输入不完整',
                                        message: '输入参数错误',
                                        type: 'warning'
                                    });
                                }else{
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success',
                                        duration: 1000,
                                        onClose: () => {
                                            _this.form = res.data.rows[0];
                                            _this.documentCode =  _this.form.documentNo;
                                            var search = {
                                                "paymentId": res.data.rows[0].id
                                            };
                                            _this.autoSupplier(res.data.rows[0].belongTo,0);
                                            this.$route.query.id = res.data.rows[0].id;
                                            for(var items in this.belongData){
                                                if(this.belongData[items].value == this.form.belongId){
                                                    this.costBelong = this.belongData[items].label
                                                }
                                            }
                                            _this.$refs.farTransportation.getData('expense/getFarTransporList',search);
                                            _this.$refs.hotelExpense.getData('expense/getHotelExpenseList',search);
                                            _this.$refs.otherPayment.getData('expense/getOtherPaymentList',search);
                                            _this.$refs.cityTransportation.getData('expense/getCityTransportion',search);
                                            this.approval.processInstanceName = "出差申请【" + this.userData.cname + ":" +
                                                this.form.startTime + "_" + this.form.endTime + "-"+this.form.destination + "-出差预算:" + this.form.totalAmount+"-出差归属:"+this.costBelong+"】";
                                            this.approval.variables.type = _this.form.belongTo;
                                            this.approval.businessKey = _this.form.documentNo; //业务标识ID
                                            this.approval.show = true;
                                            _this.twoClick=false;
                                        }
                                    });
                                }
                            }
                        })
                    }else{
                        this.$notify({
                            title: '输入不完整',
                            message: '请完善出差详细数据',
                            type: 'error'
                        });
                    }
                });
            },
            /**
             *关闭
             */
            close: function () {
             /*   var _this = this;
                this.$router.push({
                    name: 'listBusinessTrip',
                    params:{
                        currentPage:_this.currentPage
                    }
                });*/
                let pageOpenedList = this.$store.state.app.pageOpenedList;
                pageOpenedList.forEach((item,index)=>{
                    if(item.name=='editBusinessTrip'){
                        pageOpenedList.splice(index,1);
                        localStorage.setItem('pageOpenedList',pageOpenedList);
                    }
                });
                this.$router.push({
                    name: this.fromPath,
                });
            },
            /**
             *项目/商机列表
             */
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
             *字典项
             */
            makeDataDictionary:function () {
                var _this = this;
                this.$myHttp({//出差归属
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
                     for(var [items] in res.data.rows){
                         resArry.push({
                             label:res.data.rows[[items]].dvalue,
                             value:res.data.rows[[items]].dkey
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
                    for(var [items] in res.data.rows){
                        resArry.push({
                            label:res.data.rows[[items]].dvalue,
                            value:res.data.rows[[items]].dkey
                        })
                    }
                    _this.innerMegType = resArry;
                });
            },
            /**
             * 校验结束时间选项
             */
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

            handleClick(){//总计
                var _this = this;
                const cost = (Number(this.$store.state.totalrycbcost) + this.$store.state.totalxxcbcost + this.$store.state.totalxmwccost + this.$store.state.totalwbrycost) || '0'
                _this.form.totalAmount = (cost/1000);
                console.log("total", _this.form.totalAmount);
            },

            /**
             * 提交之前校验业务表单
             */
            checkBeforeProcess() {
                var checkData = true;
                if (this.approval.taskType == "") {
                    var _this = this;
                    checkData = false;
                    var totalData = {};
                    totalData.businessTrip = _this.form;
                    //_this.form.id = this.$route.query.id;
                    totalData.farList = this.$refs.farTransportation.getTableData();
                    totalData.cityList = this.$refs.cityTransportation.getTableData();
                    totalData.hotelList = this.$refs.hotelExpense.getTableData();
                    totalData.otherList = this.$refs.otherPayment.getTableData();

                    //this.totalAmount();
                    var url = this.prefix + 'expense/saveBusinessTrip' + window.suffix;
                    this.$refs['ruleFormOne'].validate((valid) => {
                        if (valid) {
                            this.ruleFormOne = true;
                        } else {
                            this.ruleFormOne = false;
                        }
                        if (totalData.otherList.length <= 0 && totalData.hotelList.length <= 0 && totalData.cityList.length <= 0 && totalData.farList.length <= 0) {
                            this.$notify({
                                title: '输入不完整',
                                message: '请完善出差详细数据',
                                type: 'error'
                            });
                            checkData = false;
                            return false;
                        }
                        var isCheck = this.checkBeforeSave(totalData);
                        if (isCheck == false) {
                            checkData = false;
                            return false;
                        }
                        if (this.ruleFormOne) {
                            this.twoClick = true;
                            this.$myHttp({
                                method: 'POST',
                                url: url,
                                data: {
                                    "entity": totalData
                                }
                            }).then(res => {
                                if (res.status === 200) {
                                    if (res.data == "" && res.data.subCode != '0') {
                                        this.$notify({
                                            title: '输入不完整',
                                            message: '输入参数错误',
                                            type: 'warning'
                                        });
                                        checkData = false;
                                    } else {
                                        checkData = true;
                                        this.$message({
                                            message: '保存成功',
                                            type: 'success',
                                            duration: 1000,
                                            onClose: () => {
                                                console.log("22222222", res.data)
                                                _this.form = res.data.rows[0];
                                                _this.documentCode = _this.form.documentNo;
                                                var search = {
                                                    "paymentId": res.data.rows[0].id
                                                };
                                                _this.autoSupplier(res.data.rows[0].belongTo, 0);
                                                this.$route.query.id = res.data.rows[0].id;
                                                for (var items in this.belongData) {
                                                    if (this.belongData[items].value == this.form.belongId) {
                                                        this.costBelong = this.belongData[items].label
                                                    }
                                                }
                                                _this.$refs.farTransportation.getData('expense/getFarTransporList', search);
                                                _this.$refs.hotelExpense.getData('expense/getHotelExpenseList', search);
                                                _this.$refs.otherPayment.getData('expense/getOtherPaymentList', search);
                                                _this.$refs.cityTransportation.getData('expense/getCityTransportion', search);
                                                this.approval.processInstanceName = "出差申请【" + this.userData.cname + ":" +
                                                    this.form.startTime + "_" + this.form.endTime + "-" + this.form.destination + "-出差预算:" + this.form.totalAmount + "-出差归属:" + this.costBelong + "】";
                                                this.approval.variables.type = _this.form.belongTo;
                                                this.approval.businessKey = _this.form.documentNo; //业务标识ID
                                                this.approval.show = true;
                                                _this.twoClick = false;
                                                if (checkData) {
                                                    this.$refs.processSubmit.submit();
                                                }
                                                /*if (_this.$route.params.row.pid != undefined && res.data.entity.status == '2') {
                                                this.approval.taskInstanceId = ""
                                                this.approval.taskType = ""
                                            }*/
                                            }
                                        });
                                    }
                                }
                            })
                        } else {
                            this.$notify({
                                title: '输入不完整',
                                message: '请完善出差详细数据',
                                type: 'error'
                            });
                            checkData = false;
                        }
                    });
                }
                if (checkData && this.approval.taskType != "") {
                    this.saveProjectsInfo();
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
                var _this = this;
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
                            id:this.form.id
                        }
                    }
                }).then(res => {
                    let data = res.data.rows[0];
                    data.status = status;
                    data.processInstanceId = piid;
                    var totalData = {};
                    totalData.businessTrip =data;
                    totalData.farList = this.$refs.farTransportation.getTableData();
                    totalData.cityList = this.$refs.cityTransportation.getTableData();
                    totalData.hotelList = this.$refs.hotelExpense.getTableData();
                    totalData.otherList = this.$refs.otherPayment.getTableData();
                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + 'expense/saveBusinessTrip' + window.suffix,
                        data: {
                            "entity": totalData
                        }
                    }).then(res => {
                        let pageOpenedList = this.$store.state.app.pageOpenedList;
                        pageOpenedList.forEach((item,index)=>{
                            if(item.name=='editBusinessTrip'){
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
             * 显示详情
             */
            showDetail(documentNo){
                var _this = this;
                _this.approval.show = true;
                this.currentPage = this.$route.query.currentPage;
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
                    var search = {
                        "paymentId": res.data.rows[0].id
                    };
                    _this.getUser();
                    _this.autoSupplier(res.data.rows[0].belongTo,0);
                    for(var items in this.belongData){
                        if(this.belongData[items].value == this.form.belongId){
                            this.costBelong = this.belongData[items].label
                        }
                    }
                    _this.documentCode =  _this.form.documentNo;
                    this.approval.processInstanceName = "出差申请【" + _this.userData.cname + ":"
                        + _this.form.startTime + "_" + _this.form.endTime + "-"+_this.form.destination + "-出差预算:" + _this.form.totalAmount+"-出差归属:"+this.costBelong+"】";
                    this.approval.variables.type = _this.form.belongTo;
                    this.approval.businessKey = _this.form.documentNo;
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
                var _this = this;
                _this.approval.show = true;
                this.currentPage = this.$route.query.currentPage;
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
            /**
             *保存前参数校验
             */
            checkBeforeSave:function(data){
                this.totalFlag = true
                this.flag=true;
                this.flagFar=true;
                this.flagOther=true;
                this.flagCity=true;
                let far = data.farList;
                let city =data.cityList;
                let hotel = data.hotelList;
                let other =data.otherList;
                for(var items in far){
                    if(this.checkNull(far[items].startTime)|| this.checkNull(far[items].endTime)|| this.checkNull(far[items].startPlace)
                        || this.checkNull(far[items].endPlace)|| this.checkNull(far[items].trafficTools)|| this.checkNull(far[items].amount)
                    ||this.checkNull(far[items].drawee)){
                        this.flagFar = false;
                        break;
                    }else{
                        this.flagFar = true;
                    }

                }

                for(var items in city){
                    if(this.checkNull(city[items].date)||  this.checkNull(city[items].amount)){
                        this.flagCity = false;
                        break;
                    }else{
                        this.flagCity = true;
                    }
                }

                for(var items in hotel) {
                    if (this.checkNull(hotel[items].checkInDate)|| this.checkNull(hotel[items].checkOutDate) || this.checkNull(hotel[items].priceUnit) || this.checkNull(hotel[items].totalDays) ||  this.checkNull(hotel[items].amount)) {
                        this.flag = false;
                        break;
                    } else {
                        this.flag = true;
                    }
                }

                for(var items in other){
                    if(this.checkNull(other[items].date)|| this.checkNull(other[items].amount)){
                        this.flagOther = false;
                        break;
                    }else{
                        this.flagOther = true;
                    }
                }
                if(!this.flagOther)
                    this.$message({
                        message: '其他报销费用数据填写不完全',
                        type: 'warning'
                    });
                if(!this.flag)
                    this.$message({
                        message: '酒店住宿费数据填写不完全',
                        type: 'warning'
                    });
                if(!this.flagCity)
                    this.$message({
                        message: '市内交通费数据填写不完全',
                        type: 'warning'
                    });
                if(!this.flagFar)
                    this.$message({
                        message: '远途交通费数据填写不完全',
                        type: 'warning'
                    });
                if(this.flagOther && this.flag && this.flagCity && this.flagFar){
                    this.totalFlag = true
                }else{
                    this.totalFlag = false
                }
                return this.totalFlag;
            },

            checkNull:function(str){
                console.log(str)
                if(str == null || str == "" || str == undefined){
                    return true
                }
                return false;
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm=>{
                if(from.name) {
                    sessionStorage.setItem('listBusinessTripName',from.name);
                    vm.fromPath = from.name;  //path为定义的变量，不是vue的data定义的变量，当前生命周期data还未初始化
                }else{
                    vm.fromPath=sessionStorage.getItem('listBusinessTripName');
                }
            });
        },
        created() {
            //跨router传参方式
            this.makeDataDictionary();
            this.currentPage = this.$route.params.currentPage;
            this.getUser();
            this.approval.show = this.$route.params.id != undefined
            let id;
            let documentNo;
            if(this.$route.params.row){//判断进入详情页面时修改还是待办
                documentNo = this.$route.params.row.businessKey;
            }else{
                documentNo = this.$route.query.documentNo;
                id = this.$route.query.id;
                this.form.id = id;
            }

            this.approval.woCode = "businessTrip";
            if (this.$route.params.row != undefined && this.$route.params.row.pid != undefined) {
                this.approval.show = this.$route.params.row.businessKey != undefined
                this.approval.taskInstanceId = this.$route.params.row.id;
                this.form.documentNo = this.$route.params.row.businessKey;
                this.approval.taskType = this.$route.params.row.taskType;
                this.approval.businessKey=this.$route.params.row.businessKey;
            }
            if(documentNo){
                Promise.all([this.makeDataDictionary()]).then(res=>{
                    this.showDetail(documentNo);
                })
            }else{
                this.getApplyDate();
            }

        },
        mounted(){
        },
        computed: {
            totalAmount:function () {
                var _this = this;
                const cost = (Number(this.$store.state.totalrycbcost) + this.$store.state.totalxxcbcost + this.$store.state.totalxmwccost + this.$store.state.totalwbrycost) || '0'
                _this.form.totalAmount = (cost/1000);
                return cost/1000;
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

</style>
