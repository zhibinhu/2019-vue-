<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 0px;padding:0 10px;">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 0px 0 0;padding-left: 10px;font-size: 15px;">出差申请报销</div>
            <el-form :label-position="labelPosition"  ref="ruleFormOne" :model="form" label-width="150px"  :rules="rules"
                     style="margin-top: 50px;margin-bottom: 20px;overflow: hidden">

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="单据编号" prop="documentNo" >
                            <el-input disabled="disabled" v-model="documentCode" style="width: 95%" size="small"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请日期" prop="applyDate">
                            <el-date-picker
                                    v-model="form.applyDate"
                                    :default-value="form.applyDate"
                                    :readonly="true"
                                    size="small"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期日期" style="width: 95%">
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
                        <el-form-item label="报销人所在部门" prop="reserve2" label-width="150px">
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
                    <el-col :span="8" :xs="20" >
                        <el-form-item label="费用原由" prop="belongTo" label-width="150px">
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
                            <el-select v-model="form.belongId" placeholder="请选择" @change="getBusinessTrip(0)" clearable filterable size="small"
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
                            <el-input v-model="form.cdwpDocumentNo" style="width: 90%" size="small"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="票据类型" prop="billType">
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

                    <el-col :span="8" :xs="20">
                        <el-form-item label="附件张数" prop="attachNum" >
                            <el-input-number v-model="form.attachNum" controls-position="right" :min="1" :max="9999" style="width: 90%" size="small"  ></el-input-number>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="发票税额" prop="taxAmount" label-width="150px">
                            <el-input v-model="form.taxAmount" style="width: 95%" size="small"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <!--<hr class="layui-bg-gray" style="width: 60%; ">-->
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差申请单号" prop="businessId" label-width="150px">
                            <el-select v-model="form.businessId" placeholder="请选择" @change="getBusinessInfo" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in businessTripData"
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
                        <el-form-item label="单据编号" prop="tripDocumentNo" label-width="150px">
                            <span class="textShow">{{trip.documentNo}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请日期" prop="tripApplyDate">
                            {{trip.applyDate}}
                        </el-form-item>

                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请人">
                            {{trip.reserve1}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="申请人所在部门" label-width="150px">
                            {{trip.reserve2}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="电话">
                            {{trip.reserve3}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱">
                            {{trip.reserve4}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>



                    <el-col :span="8" :xs="20" label-width="150px">
                        <el-form-item label="出差费用原由">
                            {{trip.belongTo}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差费用归属">
                            <span>{{tripBelongId}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item  label="出差目的地">
                            {{trip.destination}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差开始日期" label-width="150px">
                            {{trip.startTime}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="出差结束日期">
                            {{trip.endTime}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计远途交通费(元)">
                            {{util.returnFloat(trip.far)}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                  <!--  <el-col :span="8" :xs="20">
                        <el-form-item label="远途交通工具:">
                            {{trip.endTime}}
                        </el-form-item>
                    </el-col>-->
                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计酒店总金额(元)" label-width="150px">
                            {{util.returnFloat(trip.hotel)}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计市内交通费(元)">
                            {{util.returnFloat(trip.city)}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计其他费用(元)" label-width="150px">
                            {{util.returnFloat(trip.other)}}
                        </el-form-item>
                    </el-col>
                  <!--  <el-col :span="8" :xs="20">
                        <el-form-item label="预计差补(元):">
                            {{trip.endTime}}
                        </el-form-item>
                    </el-col-->
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="预计出差费用">
                            {{util.returnFloat(trip.totalAmount)}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16" :xs="20">
                        <el-form-item label="出差事由">
                            {{trip.reason}}

                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="本次报销金额" prop="expenseAmount" >
                            <!--<el-input v-model="util.returnFloat(expenseAmount)" readonly="true" style="width: 95%" size="small"  ></el-input>-->
                            {{util.returnFloat(expenseAmount)}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16" :xs="20">
                        <el-form-item label="备注" prop="comment" >
                            <el-input v-model="form.comment" style="width: 95%" maxlength="200" size="small" type="textarea" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>



                <el-row>
                    <el-col :span="24" style="margin-bottom: 100px;">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="预计发生费用" name="assessment">

                                <operation-table :parentParam = "1" ref="farTransportation" :operationTable="farTransportation"></operation-table>

                                <operation-table :parentParam = "1" ref="hotelExpense" :operationTable="hotelExpense"></operation-table>

                                <operation-table :parentParam = "1" ref="cityTransportation" :operationTable="cityTransportation"></operation-table>

                                <operation-table :parentParam = "1" ref="otherPayment" :operationTable="otherPayment"></operation-table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <el-col :span="24"  style="margin-bottom: 100px" >
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="相关附件" name="assessment">
                            <attach-table v-if="attachment2.refId!=null && attachment2.refId!=''" ref="tableUpload"  :attachTable="attachment2"></attach-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>

                <el-col :span="24"  style=" margin-bottom: 100px;">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="本人该项报销详情" name="assessment">
                            <my-easy-table :parentParam = "1" ref="myTableData2" :easyTableData="myTableData" style="margin-bottom: 100px;"></my-easy-table>
<!--
                            <my-easy-table :parentParam = "1" v-if="isShow" ref="myTableData" :easyTableData="myTableData"></my-easy-table>
-->
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
<!--
                    <el-button @click="saveProjectsInfo()" size="small" type="primary" style="margin-top: 20px;margin-bottom: 10px">保存</el-button>
-->
                    <el-button @click="close()" size="small" style="margin-top: 20px;margin-bottom: 10px;margin-left: 10px">返回</el-button>
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
                fromPath:'',
                twoClick:false,//判断是否为新增界面的第一次保存
                activeName:'assessment',
                documentCode:'创建后自动生成',
                costBelong:'',
                util:util,
                currentPage: '',
                labelPosition: 'right',
                innerMegType:[],
                isShowCenter:false,
                isShowFile:false,
                checkData:true,
                belongData: [],
                belongData2: [],
                businessType: [],
                billTypeData:[],
                hasTaxData:[],
                userData:[],
                projectTypeData:[],
                userId:'',
                pickerOptions0: this.endTime(),
                businessTripData:{},
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
                    status:'2',
                    userName:'',
                    costCenter:'',
                    id:this.$route.query.id,
                    projectType:'',
                    cdwpDocumentNo:'',
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
                totalFlag:true,
                isShow: false,
                flag:true,
                flagFar:true,
                flagOther:true,
                flagCity:true,
                farTransportation: {
                    type: '01',
                    id: this.$route.query.id,
                    allCost: ['totalrycbcost', 6],
                    allCostNoRate: ['totalxmwccostNoRate', 4],
                    clumns: [3],
                    costClumns:[1,2,3,4,5,7,8],
                    title: '远途交通费',
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
                            isShowMust:'star',
                            align:'right',
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
                            type: 'input'
                        }
                    ]
                },
                hotelExpense: {
                    type: '02',
                    id: this.$route.query.id,
                    allCost:['totalxxcbcost',7],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    costClumns:[1,2,3,4,5,6,8],
                    clumns: [3],
                    title: '酒店住宿费',
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
                            readOnly:true
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
                cityTransportation: {
                    type: '03',
                    id: this.$route.query.id,
                    costClumns:[1,2,3,5],
                    allCost:['totalxmwccost',4],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    clumns: [3],
                    title: '市内交通费',
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
                otherPayment: {
                    isNeedSummary: false,
                    type: '04',
                    costClumns:[1,2,4],
                    allCost:['totalwbrycost',3],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    clumns: [3],
                    title: '其他费用',
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
                    type: '05',
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
                            headName: '费用类型',
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
                    businessId: [
                        {required: true, message: '请选择出差', trigger: 'blur'}
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
                },
            };
        },
        methods: {

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
                    this.form.costCenter = res.data.rows[0].orgCode;
                    this.userId = res.data.rows[0].id;
                })
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
                //_this.form.id = this.$route.query.id;
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
                    if(totalData.otherList.length <= 0 && totalData.hotelList.length <= 0 && totalData.cityList.length <= 0 && totalData.farList.length <= 0){
                        this.$notify({
                            title: '输入不完整',
                            message: '请完善报销详细数据',
                            type: 'error'
                        });
                        return;
                    }
                    var isCheck = this.checkBeforeSave(totalData);
                    if(isCheck == false){
                        return false;
                    }
                    if (this.ruleFormOne) {
                        this.twoClick = true;
                        if(this.flag==true){
                            this.$myHttp({
                                method: 'POST',
                                url: url,
                                data:{
                                    "entity":totalData
                                }
                            }).then(res => {//成功回调方法
                                if (res.data.subCode == '0') {
                                    this.attachment2.bizType = "expense";
                                    this.attachment2.refId = res.data.ext.id;
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
                                                'ext': "",
                                                'pageNum': 0,
                                                'where': [
                                                    {
                                                        'assemble': 'and',
                                                        'field': ' ',
                                                        'opt': '=',
                                                        'value': ' '
                                                    }
                                                ],
                                                'pageSize': 0,
                                                'orderBy': ' '
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
                                                "paymentId": res.data.rows[0].id
                                            };
                                            this.isShowFile = true;
                                            this.attachment2.refId = res.data.rows[0].id;
                                            _this.$refs.farTransportation.getData('expense/getFarTransporList',search);
                                            _this.$refs.hotelExpense.getData('expense/getHotelExpenseList',search);
                                            _this.$refs.otherPayment.getData('expense/getOtherPaymentList',search);
                                            _this.$refs.cityTransportation.getData('expense/getCityTransportion',search);
                                            _this.autoSupplier(res.data.rows[0].belongTo,0);
                                            for(var items in this.belongData){
                                                if(this.belongData[items].value == this.form.belongId){
                                                    this.costBelong = this.belongData[items].label
                                                }
                                            }
                                            this.approval.processInstanceName = "出差报销【" + this.userData.cname + ":报销金额" + this.form.expenseAmount+"-费用由归属:"+this.costBelong+"】";
                                            this.approval.variables.type = _this.form.belongTo;
                                            this.approval.businessKey = _this.form.documentNo; //业务标识ID
                                            this.approval.show = true;
                                            _this.twoClick=false;
                                            this.getProjectInfo();
                                        }
                                    });
                                }/*else {
                                    _this.$notify({
                                        title: '警告',
                                        message: res.data.subMsg,
                                        type: 'warning'
                                    });
                                }*/
                                _this.twoClick=false;
                            })
                        }else{
                            this.$notify({
                                title: '警告',
                                message: '请完善详细数据',
                                type: 'warning'
                            });
                            _this.twoClick=false;
                        }
                    }else{
                        this.$notify({
                            title: '警告',
                            message: '请完善详细数据',
                            type: 'warning'
                        });
                        _this.twoClick=false;
                    }
                });
            },
            /**
             *保存前参数校验
             */
            checkBeforeSave:function(data){
                let far = data.farList;
                let city =data.cityList;
                let hotel = data.hotelList;
                let other =data.otherList;
                this.totalFlag = true;
                this.totalFlag = true
                this.flag=true;
                this.flagFar=true;
                this.flagOther=true;
                this.flagCity=true;
                for(var items in far){
                    if(this.checkNull(far[items].startTime)|| this.checkNull(far[items].endTime)|| this.checkNull(far[items].startPlace)
                        || this.checkNull(far[items].endPlace)|| this.checkNull(far[items].trafficTools)|| this.checkNull(far[items].amount)
                        || this.checkNull(far[items].drawee)){
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
                    if (this.checkNull(hotel[items].checkInDate) ||  this.checkNull(hotel[items].amount)||this.checkNull(hotel[items].checkOutDate)) {
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
            },
            /**
             * 关闭
             */
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
                    if(item.name=='editExpenseBusiness'){
                        pageOpenedList.splice(index,1);
                        localStorage.setItem('pageOpenedList',pageOpenedList);
                    }
                });
                this.$router.push({
                    name: this.fromPath,
                });
            },
            /**
             * 项目商机列表
             */
            autoSupplier (belongTo, isNull) {
                this.belongData = [];
                if(isNull == 1){
                    this.form.belongId = "";
                    this.trip = [];
                    this.form.businessId = "";
                    this.clearTableData();
                }
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
                        this.belongData = resArry;
                    });
                }else if(belongTo == 3){
                    this.belongData = this.innerMegType;
                    if(isNull == 1){
                        this.isShowCenter = true;
                    }

                    this.form.costCenter = this.userData.orgCode;
                }
            },

            /**
             * 项目商机列表
             */
            autoSupplier2 (belongTo, isNull) {
                this.belongData2 = [];
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
            /**
             * 字典项
             */
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
                        this.getUser();
                        this.attachment2.refId = res.data.rows[0].id;
                    });
                }
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
             * 控制结束时间
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
            /**
             * 出差列表
             */
            getBusinessTrip(target){
                var _this = this;//出差申请
                if(target == 0){
                    _this.trip = [];
                    _this.form.businessId = "";
                    this.clearTableData();
                }
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'expense/getBusinessTripList' + window.suffix,
                    data: {
                        "entity": {
                            "createBy": sessionStorage.getItem('userName'),
                            "status":1,
                            'belongId':this.form.belongId,
                            'belongTo':this.belongTo,

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
                    var report = {
                        "belongTo": _this.form.belongTo,
                        "belongId": _this.form.belongId,
                        "userName":sessionStorage.getItem('userName')
                    };
                    _this.$refs.myTableData2.getData('expense/calculateExpenseTotal',report);
                    _this.businessTripData = resArry;
                    if(_this.form.belongTo == 1) {
                        this.getProjectInfo();
                    }
                });
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
                            // this.form.projectType = this.projectTypeData[items].label;
                            this.$set(this.form,'projectType',this.projectTypeData[items].label)
                        }
                    }
                });
            },
            /**
             * 出差详情
             */
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
                    if(!this.form.id) {
                        var search = {
                            "paymentId": res.data.rows[0].id
                        }
                        this.clearTableData();
                        _this.$refs.farTransportation.getData('expense/getFarTransporList', search);
                        _this.$refs.hotelExpense.getData('expense/getHotelExpenseList', search);
                        _this.$refs.otherPayment.getData('expense/getOtherPaymentList', search);
                        _this.$refs.cityTransportation.getData('expense/getCityTransportion', search);
                    }
                    _this.autoSupplier2(belongTo, 0);
                    _this.autoSupplier2(belongTo, 0);
                });
            },

            /**
             * 清空详情数据
             */
            clearTableData:function(){
                this.$refs.farTransportation.cleanData();
                this.$refs.hotelExpense.cleanData();
                this.$refs.otherPayment.cleanData();
                this.$refs.cityTransportation.cleanData();
            },
            /**
             *计算总金额
             */
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
                var _this = this;
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
                    totalData.farList = this.$refs.farTransportation.getTableData();
                    totalData.cityList = this.$refs.cityTransportation.getTableData();
                    totalData.hotelList = this.$refs.hotelExpense.getTableData();
                    totalData.otherList = this.$refs.otherPayment.getTableData();*/
                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + 'expense/modifyStatus' + window.suffix,
                        data: {
                            "entity": data
                        }
                    }).then(res => {
                        let pageOpenedList = this.$store.state.app.pageOpenedList;
                        pageOpenedList.forEach((item,index)=>{
                            if(item.name=='editExpenseBusiness'){
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
            /**
             * 显示详情
             * @param id
             */
            showDetail(documentNo){
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
                    //成功回调方法
                    _this.form = res.data.rows[0];
                    var search = {
                        "paymentId": res.data.rows[0].id
                    }
                    var report = {
                        "id": res.data.rows[0].id
                    };
                    _this.$refs.farTransportation.getData('expense/getFarTransporList',search);
                    _this.$refs.hotelExpense.getData('expense/getHotelExpenseList',search);
                    _this.$refs.otherPayment.getData('expense/getOtherPaymentList',search);
                    _this.$refs.cityTransportation.getData('expense/getCityTransportion',search);
                    _this.autoSupplier(_this.form.belongTo, 0);
                    for(var items in this.belongData){
                        if(this.belongData[items].value == this.form.belongId){
                            this.costBelong = this.belongData[items].label
                        }
                    }
                    this.approval.processInstanceName = "出差报销【" + this.userData.cname + ":报销金额:" + this.form.expenseAmount+"-费用归属:"+this.costBelong+"】";
                    this.approval.variables.type = _this.form.belongTo;
                    this.approval.businessKey = _this.form.documentNo;
                    _this.getBusinessInfo();
                    _this.$refs.myTableData2.getData('expense/calculateExpenseTotal',report);
                    _this.getUser();
                    if(_this.form.belongTo == 1) {
                        this.getProjectInfo();
                    }
                    this.attachment2.refId = res.data.rows[0].id;
                    _this.documentCode =  _this.form.documentNo;
                    _this.getBusinessTrip(1);
                })
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm=>{
                if(from.name) {
                    sessionStorage.setItem('listExpenseBusinessName',from.name);
                    vm.fromPath = from.name;  //path为定义的变量，不是vue的data定义的变量，当前生命周期data还未初始化
                }else{
                    vm.fromPath=sessionStorage.getItem('listExpenseBusinessName');
                }
            });
        },

        created() {
            //跨router传参方式
            this.makeDataDictionary();
            this.currentPage = this.$route.params.currentPage;
            this.getUser();
            let id;
            let documentNo;
            if(this.$route.params.row){//判断进入详情页面时修改还是待办
                documentNo = this.$route.params.row.businessKey ;
            }else{
                documentNo = this.$route.query.documentNo;
                id = this.$route.query.id;
            }
            this.approval.woCode = "expenseBusiness";
            if (this.$route.params.row != undefined && this.$route.params.row.pid != undefined) {
                this.approval.show = this.$route.params.row.businessKey != undefined
                this.approval.taskInstanceId = this.$route.params.row.id;
                this.form.id = this.$route.params.row.businessKey;
                this.approval.businessKey = this.$route.params.row.businessKey;
                this.approval.taskType = this.$route.params.row.taskType;
            }
            if(documentNo){
                Promise.all([this.makeDataDictionary()]).then(res=>{
                    this.showDetail(documentNo);
                })
                this.isShowFile = true;
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
                const cost = (Number(this.$store.state.totalrycbcost) + this.$store.state.totalxxcbcost + this.$store.state.totalxmwccost + this.$store.state.totalwbrycost) || '0'
                _this.form.expenseAmount = (cost/1000);
                console.log("_this.form.expenseAmount",_this.form.expenseAmount)
                return cost/1000;
            },
            tripBelongId:function(){
                for(var items in this.belongData2){
                    if(this.belongData2[items].value == this.trip.belongId){
                        return this.belongData2[items].label
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

<style scoped>
.textShow{
    max-width: 100px;
    display: block;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
