<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 0 0;padding-left: 10px;font-size: 15px;">商机基本信息 > 编辑信息/新增信息</div>

            <el-form :label-position="labelPosition" ref="ruleForm" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 50px;margin-bottom: 20px">
              <el-row :gutter="20" style="clear: both">
                <el-col :span="8" :xs="20">
                    <el-form-item label="商机编号">
                        <el-input v-model="oppoNum" style="width: 95%" :disabled="true" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="机会名称" prop="oppoProjectName">
                        <el-input v-model="form.oppoProjectName" placeholder="请输入" style="width: 95%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">

                    <el-form-item label="销售" prop="saleId">

                        <el-select v-model="form.saleId" placeholder="请选择" clearable filterable size="small" style="width: 95%" @change="util.selectGet(form,saleIdData,'saleName',form.saleId)">
                            <el-option
                                    v-for="item in saleIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
              </el-row>
                <el-row :gutter="20" style="clear: both">
                <el-col :span="8" :xs="20">
                    <el-form-item label="所属部门" prop="orgCode">
                        <el-select v-model="form.orgCode"  clearable  placeholder="请选择" size="small" filterable style="width: 95%" @change="util.selectGet(form,orgCodeData,'orgName',form.orgCode)">
                            <el-option
                                    v-for="item in orgCodeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="赢单率" prop="winRate">
                        <el-select v-model="form.winRate" placeholder="请选择" clearable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in winRateData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="阶段" prop="projectStage">
                        <el-select v-model="form.projectStage" placeholder="请选择" clearable size="small" style="width: 95%">

                            <el-option
                                    v-for="item in projectStageData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
                </el-row>
                <el-row :gutter="20" style="clear: both">
                <el-col :span="8" :xs="20">
                    <el-form-item label="客户名称" prop="customerId">
                        <el-select v-model="form.customerId"  @change="autoSales" clearable placeholder="请选择" filterable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in customerIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="预计签订时间" prop="expectedTimeTosign">
                        <el-date-picker
                                v-model="form.expectedTimeTosign"
                                size="small"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间" style="width: 95%">
                        </el-date-picker>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="合同总金额(元)" prop="contractAmount">
                        <el-input-number controls-position="right" :min="0"   v-model="contractAmount" style="width: 95%" size="small" ></el-input-number>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="20" style="clear: both">
                <el-col :span="8" :xs="20">
                    <el-form-item label="合同税率" prop="contractRate">
                        <el-select v-model="form.contractRate" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in contractRateData"
                                    :key="item.value"
                                    :label="item.label*100+'%'"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <!--<el-radio-group v-model="form.isAllowWorkingHours">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>-->
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="关联填报工时" prop="isAllowWorkingHours">
                        <el-select v-model="form.isAllowWorkingHours" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in isAllowWorkingHoursData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <!--<el-radio-group v-model="form.isAllowWorkingHours">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>-->
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="状态" >
                        <el-select v-model="form.status" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                            <el-option
                                    v-for="item in statusData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>


                <el-row :gutter="20" style="clear: both">

                    <el-col :span="8" :xs="20">
                        <el-form-item label="商机类型"  prop="oppoType">
                            <el-select v-model="form.oppoType" placeholder="请选择" ref="oppoType" clearable filterable size="small" style="width: 95%" @change="changeOppoType">
                                <el-option
                                        v-for="item in oppoTypeData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20"></el-col>
                </el-row>

                <el-row :gutter="20" v-if="form.oppoType == '02'">

                <el-col :span="8" :xs="20">
                    <el-form-item label="售前经理" prop="preMangerId">
                        <el-select v-model="form.preMangerId" placeholder="请选择" clearable filterable size="small" @change="util.selectGet(form,preMangerIdData,'preMangerName',form.preMangerId)"
                                   style="width: 95%">
                            <el-option
                                    v-for="item in preMangerIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="项目总监" prop="pdId">
                        <el-select v-model="form.pdId" placeholder="请选择" clearable filterable size="small" style="width: 95%" @change="util.selectGet(form,pdIdData,'pdName',form.pdId);">
                            <el-option
                                    v-for="item in pdIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="PMO">
                        <el-select v-model="form.pmoId" placeholder="请选择" clearable filterable size="small" style="width: 95%" @change="util.selectGet(form,pmoIdData,'pmoName',form.pmoId);">
                            <el-option
                                    v-for="item in pmoIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                </el-row>


                <el-row :gutter="20" v-if="form.oppoType == '02'">
                    <el-col :span="8" :xs="20">
                        <el-form-item label="项目开始时间" >
                            <el-date-picker
                                    v-model="form.projectStartTime"
                                    size="small"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间" style="width: 95%">
                            </el-date-picker>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="项目结束时间" >
                            <el-date-picker
                                    v-model="form.projectEndTime"
                                    size="small"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptions0"
                                    placeholder="选择日期时间" style="width: 95%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20"></el-col>
                </el-row>



                <el-row :gutter="20" v-if="form.oppoType == '01'">
                    <el-col :span="8" :xs="20">
                        <el-form-item label="产品线">
                            <el-select v-model="form.productLineId" @change="autoProduct" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                                <el-option
                                        v-for="item in productLineIdData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="产品">
                            <el-select v-model="form.productId"  placeholder="请选择" :collapse-tags="true" :clearable="false" filterable size="small" style="width: 95%" @change="util.selectGet(form,productIdData,'productName',form.productId);">
                                <el-option
                                        v-for="item in productIdData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="渠道">
                            <el-select v-model="form.channelId" placeholder="请选择" clearable filterable size="small" style="width: 95%" @change="util.selectGet(form,channelIdData,'channelName',form.channelId);">
                                <el-option
                                        v-for="item in channelIdData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>



                <el-row :gutter="20">

                    <el-col :span="8" :xs="20" v-show="false">
                        <el-form-item label="项目类型">
                            <el-input v-model="labelProjectType" style="width: 95%" size="small"
                                      :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24" :xs="1">
                        <el-form-item label="备注" >
                            <el-input
                                    type="textarea"
                                    style="width: 95%"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="form.memo">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>




            <el-col :span="22" :offset="1" style="margin-bottom: 100px;margin-bottom: 100px;margin-left: 0;
    padding-right: 20px;  width: 100%;">
                <el-tabs v-model="activeName">
                    <el-tab-pane  label="项目成本评估" name="assessment" v-if="isFromAdd">
                        <div style="margin-bottom: 20px">成本预估编号：{{costNum}}</div>

                        <my-easy-table ref="myEasyTable" :easyTableData="assessmentData1"></my-easy-table>

                        <my-easy-table ref="myEasyTable2" :easyTableData="assessmentData2"></my-easy-table>

                        <my-easy-table ref="myEasyTable3" :easyTableData="assessmentData3"></my-easy-table>

                        <my-easy-table ref="myEasyTable4" :easyTableData="assessmentData4"></my-easy-table>

                        <div style="font-size: 14px;padding-left: 10px;margin-bottom: 10px;background: #F2F2F2;height: 40px;line-height: 40px;margin-top: 20px">
                            五、项目成本
                        </div>


                        <el-row  style="line-height: 40px">
                                <el-col :span="6" style="border-right: 1px solid #DBE2EB;background: #DBE2EB;padding-left: 10px">
                                    <div class="grid-content bg-purple">项目成本合计</div></el-col>
                                <el-col :span="18" style="padding-left: 10px">
                                    <div class="grid-content bg-purple-light">{{cost|amountFmt}}</div>
                                </el-col>
                            </el-row>

                            <el-row  style="line-height: 40px">
                                <el-col :span="6" style="border-right: 1px solid #DBE2EB;background: #DBE2EB;padding-left: 10px">
                                    <div class="grid-content bg-purple">项目成本合计（不含税)</div></el-col>
                                <el-col :span="18" style="padding-left: 10px">
                                    <div class="grid-content bg-purple-light">{{costNoRate|amountFmt}}</div>
                                </el-col>
                            </el-row>
                        <div style="font-size: 14px;padding-left: 10px;margin-bottom: 10px;background: #F2F2F2;height: 40px;line-height: 40px;margin-top: 20px">
                            六、附件
                            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showSixOpen" @click="showSix()">
                <i class="el-icon-arrow-up"></i>收起
            </span>
                            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showSixClose" @click="showSix()">
                <i class="el-icon-arrow-right"></i>展开
            </span>
                        </div>
                        <attach-table v-show="showSixTable" :attachTable="attachment1"></attach-table>


                    </el-tab-pane>
                    <el-tab-pane  label="利润测算表" name="profit" v-if="isFromAdd">

                        <profit-form :profitFormData="profitFormData"></profit-form>

                    </el-tab-pane>
                    <el-tab-pane label="相关附件" name="enclosure">
                        <attach-table ref="tableUpload" :attachTable="attachment2"></attach-table>
                    </el-tab-pane>
                </el-tabs>

            </el-col>


            <el-col :span="22" :offset="9"  :style="isShowTab ? 'position: fixed;bottom: 0; width: 100%; z-index: 100':''">

                <el-button @click="saveProjectsInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px">提交
                </el-button>
                <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">返回</el-button>


            </el-col>
        </div>

    </el-col>
</template>

<script>
    import util from '../../libs/util';
    import myEasyTable from '../../components/myEasyTable.vue';
    import attachTable from '../../components/attachTable.vue';
    import profitForm from '../../components/profitForm.vue';
    import operationTable from '../../components/operationTable.vue';
    import relationOperTable from '../../components/relationOperTable.vue';

    export default {

        data () {
            return {
                costNoRate:'',
                isProject:true,
                contractValue:'',
                costNum:'',
                costId:'',
                cost:'',
                isShowTab: false,
                isFromAdd: false,
                util: util,
                attachment2:{
                    bizType:"oppo",
                    uploadIds:[],
                    refId:this.$route.query.id   /* 六 ，商机id   附件*/
                },
                attachment1:{
                    bizType:"oppo",
                    isViewButton:true,
                    refId:''             /*成本明细id*/
                },
                profitFormData: {
                    contractValue:'',
                    contractRate:'',
                    allCotntactAmount:'',
                    cost:'',
                    profit:'',
                    profitargin:''
                },
                assessmentData1: {
                    type:'01',
                    isNeedNewVersion:true,
                    id:this.$route.query.id,
                    title:'一、项目人员成本',
                    tableThead: [
                        {
                            headName: '角色',
                            headKey: 'costName'
                        },
                        {
                            headName: '技术职称',
                            headKey: 'costType'
                        },
                        {
                            headName: '有效天数',
                            headKey: 'manday'
                        },
                        {
                            headName: '单位人员成本/天',
                            headKey: 'mandayCost',
                            isAmount:true

                        },
                        {
                            headName: '人工成本费用',
                            headKey: 'cost',
                            isAmount:true

                        },
                              {
                            headName: '税率',
                            headKey: 'itemRate'
                        },
                        {
                            headName: '人工成本费用(不含税)',
                            headKey: 'costNoRate',
                            isAmount:true
                        },
                        {
                            headName: '备注',
                            headKey: 'memo'

                        }
                    ],
                    noSum:[1,2,4,6,8],
                    dayData:[3]

                },
                assessmentData2:{
                    type:'02',
                    id:this.$route.query.id,
                    title:'二、项目费用成本',
                    isNeedNewVersion:true,
                    tableThead: [
                        {
                            headName: '费用类型',
                            headKey: 'costName'
                        },
                        {
                            headName: '金额',
                            headKey: 'cost'
                        },
                                                     {
                            headName: '税率',
                            headKey: 'itemRate'
                        },
                        {
                            headName: '人工成本费用(不含税)',
                            headKey: 'costNoRate',
                            isAmount:true
                        },
                        {
                            headName: '备注',
                            headKey: 'memo'
                        }
                    ],
                    noSum:[1,3,5]
                },
                assessmentData3:{
                    type:'03',
                    id:this.$route.query.id,
                    isNeedNewVersion:true,
                    title:'三、项目外采',
                    tableThead: [
                        {
                            headName: '供应商名称',
                            headKey: 'costName'
                        },
                        {
                            headName: '外采金额',
                            headKey: 'cost'
                        },
                              {
                            headName: '税率',
                            headKey: 'itemRate'
                        },
                        {
                            headName: '人工成本费用(不含税)',
                            headKey: 'costNoRate',
                            isAmount:true
                        },
                        {
                            headName: '备注',
                            headKey: 'memo'
                        }
                    ],
                    noSum:[1,3,5]
                },
                assessmentData4:{
                    type:'04',
                    id:this.$route.query.id,
                    title:'四、外包人员成本',
                    isNeedNewVersion:true,
                    tableThead: [
                        {
                            headName: '角色',
                            headKey: 'costName'
                        },
                        {
                            headName: '人天成本',
                            headKey: 'mandayCost'
                        },
                        {
                            headName: '天数',
                            headKey: 'manday'
                        },
                        {
                            headName: '金额',
                            headKey: 'cost'
                        },
                         {
                            headName: '税率',
                            headKey: 'itemRate'
                        },
                        {
                            headName: '人工成本费用(不含税)',
                            headKey: 'costNoRate',
                            isAmount:true
                        },
                        {
                            headName: '备注',
                            headKey: 'memo'
                        }
                    ],
                    noSum:[2,5,7],
                    dayData:[1,3,4]
                },
                activeName: 'enclosure',
                currentPage: '',
                labelProjectType: '商机',
                labelPosition: 'right',
                oppoNum: '创建商机后自动生成',
                industryData: [],
                projectStageData: [],
                winRateData: [],
                orgCodeData: [],
                customerIdData: [],
                pdIdData: [],
                saleIdData: [],
                pmoIdData: [],
                preMangerIdData: [],
                channelData: [],
                productLineIdData: [],
                productIdData: [],
                channelIdData: [],
                statusData: [],
                oppoTypeData:[],
                contractRateData:[],
                isAllowWorkingHoursData: [
                    {
                        label: '是',
                        value: "true"
                    },
                    {
                        label: '否',
                        value: "false"
                    }
                ],
                form: {
                    contractRate:'02',
                    oppoType:'02',
                    productId: '',
                    productName: '',
                    productLineId: '',
                    productLineName: '',
                    status: '',
                    pmoId: '',
                    pmoName: '',
                    oppoNum: '',
                    orgCode: '',
                    orgName: '',
                    oppoProjectName: '',
                    customerId: '',
                    customerName: '',
                    projectStage: '',
                    pdId: '',
                    pdName: '',
                    preMangerId: '',
                    preMangerName: '',
                    winRate: '',
                    contractAmount: '0',
                    expectedTimeTosign: '',
                    projectStartTime: '',
                    projectEndTime: '',
                    projectType: '3',
                    isAllowWorkingHours: 'true',
                    saleId: '',
                    saleName: '',
                    industry: '',
                    memo: '',
                    channelId: '',
                    channelName: ''
                },
                isShow: false,
                pickerOptions0: this.endTime(),
                rules: {
                    orgCode: [
                        {required: true, message: '请选择所属部门', trigger: 'change'}
                    ],
                    oppoProjectName: [
                        {required: true, message: '请输入机会名称', trigger: 'blur'}
                    ],
                    customerId: [
                        {required: true, message: '请输入客户名称', trigger: 'change'}
                    ],
                    expectedTimeTosign: [
                        {required: true, message: '请选择预计签订时间', trigger: 'blur'}
                    ],
                    projectStartTime: [
                        {required: true, message: '请选择项目开始时间', trigger: 'blur'}
                    ],
                    projectEndTime: [
                        {required: true, message: '请选择结束时间，应大于开始时间', trigger: 'blur'}
                    ],
                    industry: [
                        {required: true, message: '请选择行业', trigger: 'change'}
                    ],
                    winRate: [
                        {required: true, message: '请选择赢单率', trigger: 'change'}
                    ],
                    projectStatus: [
                        {required: true, message: '请选择项目状态', trigger: 'blur'}
                    ],
                    contractAmount: [
                        {required: true, message: '请输入合同总金额', trigger: 'blur'}
                    ],
                    saleId: [
                        {required: true, message: '请输入销售人员', trigger: 'change'}
                    ],
                    isAllowWorkingHours: [
                        {required: true, message: '请选择是否关联工时', trigger: 'blur'}
                    ],
                    oppoType:[
                        {required: true, message: '请选择商机类型', trigger: 'blur'}
                    ],
                    contractRate:[
                        {required: true, message: '请选择合同税率', trigger: 'blur'}
                    ],
                    preMangerId:[
                        {required: true, message: '请选择售前经理', trigger: 'blur'}

                    ]
                },
                showSixTable:true,
                showSixOpen:true,
                showSixClose:false,
                uploadIds:[],
            };
        },
        methods: {
            changeOppoType(scope){
                if(this.$route.query.id && scope == '01'){
                    this.isExistForzeCostList()
                }
            },
            isExistForzeCostList(){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastList' + window.suffix,
                    data: {
                        'entity': {
                            projectId: this.$route.query.id,
                            status: "01"
                        }
                    }
                }).then(res => {
                    if(res.data.rows.length > 0){
                        this.$confirm('成本预估表已经存在，该操作会同时删除成本预估表，确认执行该操作吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$refs.oppoType.blur()
                        }).catch(() => {
                            this.form.oppoType = '02'
                            this.$refs.oppoType.blur()
                        });
                    }
                });
            },
            showSix(){
                if(this.showSixTable){
                    this.showSixOpen=false;
                    this.showSixClose=true;
                    this.showSixTable=false;

                }else{
                    this.showSixOpen=true;
                    this.showSixClose=false;
                    this.showSixTable=true
                }
            },
            handleClick () {

            },
            initOrg () {
                /* 判断进来的页面是新增还是修改 */
                if (!this.$route.query.id) {
                    this.$myHttp({
                        method: 'GET',
                        url: this.prefix + 'org/getOrgByLoginUser' + window.suffix /* 新增，所属部门为当前用户所属部门 */
                    }).then(res => {
                        // 成功回调方法
                        if(res.data.content && res.data.content.orgCode){
                            this.form.orgCode = res.data.content.orgCode;
                        }
                        let obj = {};
                        obj = this.orgCodeData.find((item)=>{//这里的userList就是上面遍历的数据源
                            return item.value === this.form.orgCode;//筛选出匹配数据
                        });
                        if(obj && obj.label){
                            this.form.orgName = obj.label;
                        }
                    });
                }
            },
            autoSales () {
                util.selectGet(this.form, this.customerIdData, 'customerName', this.form.customerId);
                /* 根据客户自动带出销售 */
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSalePersonByCustomer' + window.suffix, /* 选择客户，自动带出销售 */
                    data: {
                        'entity': this.form.customerId
                    }
                }).then(res => {
                    // 成功回调方法
                    this.form.saleId = res.data.content.id;
                    util.selectGet(this.form, this.saleIdData, 'saleName', this.form.saleId);
                });
                /* 根据客户自动带出渠道 */
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/view' + window.suffix, /* 选择客户，自动带出销售 */
                    data: {
                        'entity': this.form.customerId
                    }
                }).then(res => {
                    // 成功回调方法
                    this.form.channelId = res.data.content.channel;
                    util.selectGet(this.form, this.channelIdData, 'channelName', this.form.channelId);
                });
            },
            autoProduct () {
                util.selectGet(this.form, this.productLineIdData, 'productLineName', this.form.productLineId);
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getProduct' + window.suffix, /* 选择客户，自动带出销售 */
                    data: {
                        'entity': {
                            'productLineId': this.form.productLineId,
                            'status': '01'
                        }
                    }
                }).then(res => {
                    // 成功回调方法
                    var resArry = [];
                    for (var items in res.data.rows) {
                        resArry.push({
                            label: res.data.rows[items].productName,
                            value: res.data.rows[items].id
                        });
                    }
                    this.productIdData = resArry;
                });
            },
            endTime () {
                var that = this;
                return {
                    disabledDate (time) {
                        if (that.form.projectStartTime) {
                            return new Date(that.form.projectStartTime).getTime() > time.getTime();
                        } else {
    
                        }
                    }
                };
            },
            saveProjectsInfo: function () {
            
                
                
                var _this = this;
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.ruleForm = true;
                    } else {
                        this.ruleForm = false;
                    }

                    if (this.ruleForm) {
                        if (this.form.status == '进行中') {
                            this.form.status = '0';
                        }
                         if(this.form.isAllowWorkingHours=="true"){
                            this.form.isAllowWorkingHours = true
                        }else if(this.form.isAllowWorkingHours=="false"){
                            this.form.isAllowWorkingHours = false
                        }

                        if (this.form.oppoType == '01') {
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'project/saveOppo' + window.suffix,
                                data: {
                                    'entity': _this.form,
                                    'pageNum': 0,
                                    'pageSize': 1000
                                }
                            }).then(res => {
                                // 成功回调方法
                                if(res.data.subCode == 0){
                                    if(this.attachment2.uploadIds){     /*如果有附件，才执行此方法*/

                                        var myentity=[];
                                        for(const i in this.attachment2.uploadIds){
                                            myentity.push({"bizType": "oppo","id":this.attachment2.uploadIds[i],"refId": res.data.ext.id});
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
                                    _this.$notify({
                                        title: '成功',
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                    _this.$router.push({
                                        name: 'projectManagement/oppoManagementList',
                                        params: {
                                            currentPage: _this.currentPage
                                        }
                                    });
                                }else {
                                    _this.$notify({
                                        title: '无法修改',
                                        message: res.data.subMsg,
                                        type: 'warning'
                                    });
                                }
                            });
                        } else {
                            if(!this.form.projectStartTime){
                                this.$myHttp({
                                    method: 'POST',
                                    url: this.prefix + 'project/saveOppo' + window.suffix,
                                    data: {
                                        'entity': _this.form,
                                        'pageNum': 0,
                                        'pageSize': 1000
                                    }
                                }).then(res => {
                                    // 成功回调方法

                                    if(res.data.subCode == 0){

                                        if(this.attachment2.uploadIds){     /*如果有附件，才执行此方法*/

                                            var myentity=[];
                                            for(const i in this.attachment2.uploadIds){
                                                myentity.push({"bizType": "oppo","id":this.attachment2.uploadIds[i],"refId": res.data.ext.id});
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
                                        _this.$notify({
                                            title: '成功',
                                            message: '保存成功',
                                            type: 'success'
                                        });
                                        _this.$router.push({
                                            name: 'projectManagement/oppoManagementList',
                                            params: {
                                                currentPage: _this.currentPage
                                            }
                                        });
                                    }else {
                                        _this.$notify({
                                            title: '无法修改',
                                            message: res.data.subMsg,
                                            type: 'warning'
                                        });
                                    }

                                });
                            }else if (this.form.projectStartTime < this.form.projectEndTime) {
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'project/saveOppo' + window.suffix,
                                data: {
                                    'entity': _this.form,
                                    'pageNum': 0,
                                    'pageSize': 1000
                                }
                            }).then(res => {
                                // 成功回调方法

                                if(res.data.subCode == 0){
                                    if(this.attachment2.uploadIds){     /*如果有附件，才执行此方法*/

                                        var myentity=[];
                                        for(const i in this.attachment2.uploadIds){
                                            myentity.push({"bizType": "oppo","id":this.attachment2.uploadIds[i],"refId": res.data.ext.id});
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
                                    _this.$notify({
                                        title: '成功',
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                    _this.$router.push({
                                        name: 'projectManagement/oppoManagementList',
                                        params: {
                                            currentPage: _this.currentPage
                                        }
                                    });
                                }else {
                                    _this.$notify({
                                        title: '无法修改',
                                        message: res.data.subMsg,
                                        type: 'warning'
                                    });
                                }

                            });
                        } else {
                            this.$notify({
                                title: '警告',
                                message: '不能提交，项目结束时间早于项目开始时间！',
                                type: 'warning'
                            });
                        }
                        }
                        
                    }
                });
            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'projectManagement/oppoManagementList',
                    params: {
                        currentPage: _this.currentPage
                    }
                });
            },
            makeDataDictionary: function () {
                var _this = this;

                // 激活的渠道
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getActiveChannels' + window.suffix,
                    data: {
                        'entity': {
                            'dtype': '渠道'
                        },
                        'orderBy': 'idx asc'
                    }
                }).then(res => {
                    // 成功回调方法
                    var resArry = [];
                    for (var items in res.data.content) {
                        resArry.push({
                            label: res.data.content[items].channelName,
                            value: res.data.content[items].id
                        });
                    }
                    _this.channelIdData = resArry;
                });

                // 获取数据字典值
                util.getDictionaryData(this, [

                    {
                        dataName: 'industryData',
                        dType: '行业'
                    },
                    {
                        dataName: 'winRateData',
                        dType: '赢单率'
                    },
                    {
                        dataName: 'statusData',
                        dType: '商机状态'
                    },
                    {
                        dataName:'oppoTypeData',
                        dType:'商机类型'
                    },
                    {
                        dataName:'contractRateData',
                        dType:'税率'
                    }
                ]);

                // 获取用户表数据 （胜哥方法）
                util.getUserDataByRoleCode(this, [
                    {
                        dataName: 'pdIdData', // 项目总监
                        roleCode: '03'
                    },
                    {
                        dataName: 'saleIdData', // 销售
                        roleCode: '02'
                    }, {
                        dataName: 'pmoIdData', // PMO
                        roleCode: '05'

                    }, {
                        dataName: 'preMangerIdData', // 售前经理
                        roleCode: '12'
                    }, {
                        dataName: 'industryData',
                        roleCode: '03'
                    }

                ]);

                //
                util.getUserDataByStatus(this, [
                    {
                        dataName: 'productLineIdData', // 产品线
                        status: '01',
                        url: 'sysData/getProductLine',
                        label: 'productLineName',
                        value: 'id'
                    },
                    {
                        dataName: 'productIdData', // 产品线
                        status: '01',
                        url: 'sysData/getProduct',
                        label: 'productName',
                        value: 'id'
                    }
                ]);



                //阶段
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "商机阶段"
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
                    this.projectStageData = resArry;
                });


                // 获取部门下拉数据
                this.$myHttp({
                    method: 'get',
                    url: this.prefix + 'org/getAllOrgs' + window.suffix

                }).then(res => {
                    var resArry = [];
                    for (var items in res.data.content) {
                        resArry.push({
                            label: res.data.content[items].orgName,
                            value: res.data.content[items].orgCode
                        });
                    }
                    this.orgCodeData = resArry;
                });

                // 客户名称
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getActiveCustomers' + window.suffix,
                    data: {

                    }
                }).then(res => {
                    var resArry = [];
                    for (var items in res.data.content) {
                        resArry.push({
                            label: res.data.content[items].customerName,
                            value: res.data.content[items].id
                        });
                    }
                    this.customerIdData = resArry;
                });
            },
            getCostDetail () {

                if(this.$route.query.id){

                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'project/cost/getCostForecastList' + window.suffix,
                        data: {
                            'entity': {
                                projectId: this.$route.query.id,
                                isLastVersion: true
                            }
                        }
                    }).then(res => {
                        // 成功回调方法
                        if (res.data.rows.length > 0 && res.data.rows[0].status == '1') {
                            this.contractValue = res.data.rows[0].contractValue;
                            this.isFromAdd = true
                            this.attachment1.refId=res.data.rows[0].id;
                            this.costNum = res.data.rows[0].costForecastNum;
                            this.costId  = res.data.rows[0].id;
                        }else {
                            this.activeName = 'enclosure'
                        }

                        this.getAllCost();

                        console.log('已冻结的商机的成本明细id',this.attachment1.refId)
                    });
                }else {
                    this.activeName = 'enclosure'
                }

            },
            getAllCost:function () {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastDetailList' + window.suffix,
                    data: {
                        "entity": {
                            costForecastId:this.costId
                        }
                    }
                }).then(res => {
                    //成功回调方法
                
                
                    const contractValue = this.contractValue     //项目合同总额（元）
                

                    let contractRate =Number(this.contractRateData.filter(o => o.value == this.form.contractRate)[0].label) 

                    

                    //项目合同（不含税）总金额（元）
                const allCotntactAmount = contractValue / (1 + contractRate)

                
                // 项目（不含税）总成本（元）
                const cost = res.data.ext[1]

                this.cost = res.data.ext[0]
                this.costNoRate = res.data.ext[1]

                // 利润
                const profit = allCotntactAmount - cost  

                // 利润率（%）
                const profitargin = profit/allCotntactAmount 

                    this.profitFormData.contractValue = this.contractValue
                    this.profitFormData.contractRate = contractRate
                    this.profitFormData.allCotntactAmount = allCotntactAmount
                    this.profitFormData.cost = cost
                    this.profitFormData.profit = profit
                    this.profitFormData.profitargin = profitargin
            
                });
            }

        },
        created () {
            // 跨router传参方式
            var _this = this;
            this.currentPage = this.$route.query.currentPage;
            this.type = this.$route.query.type;
            if (this.$route.query.oppoNum) {
                this.oppoNum = this.$route.query.oppoNum;
            }

            this.getCostDetail();

            if (this.$route.query.id) {
                this.activeName = 'assessment';
                this.isShow = true;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getOppoList' + window.suffix,
                    data: {
                        'entity': {
                            id: _this.$route.query.id
                        },
                        'pageNum': 0,
                        'pageSize': 1000
                    }
                }).then(res => {
                    // 成功回调方法
                    _this.form = res.data.rows[0];
                    if(res.data.rows[0].isAllowWorkingHours==true){
                        _this.form.isAllowWorkingHours="true"
                    }else if(res.data.rows[0].isAllowWorkingHours==false){
                        _this.form.isAllowWorkingHours="false"
                    }


                });
            } else {     /*新增情况*/
                this.isShowTab = true;
                this.attachment2.bizType="temp";
                this.attachment2.refId=new Date().getTime()+"_"+Math.floor(Math.random()*100)
            }

            // 生成当前页面需要的数据字典内容
            this.makeDataDictionary();
            // 马总需求
            this.form.status = '进行中';

            // 检测成本评估状态是否为冻结状态  是：显示tab
        },
        mounted () {
            this.initOrg();
        },
        components: {
            myEasyTable,
            attachTable,
            profitForm,
            operationTable,
            relationOperTable
        },
        computed: {
            contractAmount: {
                set: function (val) {
                    this.form.contractAmount = val * 1000;
                },
                get: function (val) {
                    return this.form.contractAmount / 1000;
                }
            },
            tipsData: function () {
                let array = this.productIdData.filter(o => this.form.productId.indexOf(o.value) > -1).map(o => o.label).join('、');

                return array;
            }
        }
    };
</script>

<style>

</style>
