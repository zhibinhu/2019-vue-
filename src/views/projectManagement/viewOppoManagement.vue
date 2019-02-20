<template>


        <el-col :span="24" style="background-color: white">

            <div style="margin-left: 20px;font-size: 16px">
                <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 0 0;padding-left: 10px;font-size: 15px;">商机基本信息 > 查看信息</div>

                <el-form label-position="right" inline class="table-expand" style="padding-left: 10px">
                    <el-row :gutter="20">

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="商机编号："><span>{{oppoNum}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="机会名称："><span>{{oppoProjectName}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="销售："><span>{{saleName}}</span></el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="所属部门："><span>{{orgName}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="赢单率："><span>{{winRate | winRateFil}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="阶段："><span>{{projectStage | projectStateFil}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="客户名称："><span>{{customerName}} </span></el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="预计签订时间："><span>{{expectedTimeTosign | expectedTimeTosignFil}}</span>
                            </el-form-item>
                        </el-col>

                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="合同总金额(元)：">
                                <span>
                                    <!--{{contractAmount | contractAmountFil }}-->
                                    {{util.returnFloat(contractAmount/1000)}}
                                </span>
                            </el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="合同税率："><span>{{contractRateValue }}</span>
                            </el-form-item>
                        </el-col>


                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="关联填报工时："><span>{{isAllowWorkingHours | isAllowWorkingHoursFil}}</span>
                            </el-form-item>
                        </el-col>

                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="状态："><span>{{status | statusFil}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="商机类型："><span>{{oppoType|oppoTypeFmt}}</span>
                            </el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '01'">
                            <el-form-item label="产品线："><span>{{productLineName}}</span></el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '01'">
                            <el-form-item label="产品："><span>{{productName}}</span></el-form-item>
                        </el-col>
                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '01'">
                            <el-form-item label="渠道："><span>{{channelName}}</span></el-form-item>
                        </el-col>


                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="售前经理："><span>{{preMangerName}}</span></el-form-item>
                        </el-col>

                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="项目总监："><span>{{pdName}} </span></el-form-item>
                        </el-col>

                         <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="PMO："><span>{{pmoName}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="项目开始时间："><span>{{projectStartTime | projectStartTimeFil}}</span>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="oppoType == '02'">
                            <el-form-item label="项目结束时间："><span>{{projectEndTime | projectEndTimeFil}}</span></el-form-item>
                        </el-col>



                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="备注信息："><span>{{memo }}</span></el-form-item>
                        </el-col>

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

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="最后修改人 :"><span>{{lastmodifiedBy}}</span></el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                            <el-form-item label="最后修改时间 :">
                                <span>{{lastmodifiedTime }}</span>
                            </el-form-item>
                        </el-col>

                        
                    </el-row>
                </el-form>


                <el-col :span="22"  style="margin-bottom: 100px;margin-bottom: 100px;margin-left: 0;
    padding-right: 20px;  width: 100%;">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane  label="项目成本评估" v-if="isShowTab" name="assessment">
                            <div style="margin-bottom: 20px">成本预估编号：{{costNum}}</div>
                            <my-easy-table ref="myEasyTable" :easyTableData="assessmentData1"></my-easy-table>

                            <my-easy-table ref="myEasyTable2" :easyTableData="assessmentData2"></my-easy-table>

                            <my-easy-table ref="myEasyTable3" :easyTableData="assessmentData3"></my-easy-table>

                            <my-easy-table ref="myEasyTable4" :easyTableData="assessmentData4"></my-easy-table>

                            <div style="font-size: 14px;padding-left: 10px;margin-bottom: 10px;background: #F2F2F2;height: 40px;line-height: 40px;margin-top: 20px">
                                五、项目成本
                            </div>

                            <el-row  style="border: 1px solid #DBE2EB;line-height: 40px">
                                <el-col :span="6" style="border-right: 1px solid #DBE2EB;background: #DBE2EB;padding-left: 10px">
                                    <div class="grid-content bg-purple">项目成本合计</div></el-col>
                                <el-col :span="18" style="padding-left: 10px">
                                    <div class="grid-content bg-purple-light">{{cost|amountFmt}}</div>
                                </el-col>


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
                        <el-tab-pane  label="利润测算表" v-if="isShowTab" name="profit">

                            <profit-form :profitFormData="profitFormData"></profit-form>

                        </el-tab-pane>
                        <el-tab-pane label="相关附件" name="enclosure">
                            <attach-table v-show="showSixTable" :attachTable="attachment2"></attach-table>
                        </el-tab-pane>
                    </el-tabs>

                </el-col>



                <el-col :span="22" :offset="8" :style="isShowTab ? 'position: fixed;bottom: 0; width: 100%; z-index: 100':'margin-left:45%'">


                    <el-button @click="close()" type="primary" style="margin-top: 30px">返回</el-button>

                </el-col>
            </div>


        </el-col>

</template>

<script>

    import myEasyTable from '../../components/myEasyTable.vue'
    import attachTable from '../../components/attachTable.vue'
    import profitForm from '../../components/profitForm.vue'
    import util from '../../libs/util'
    export default {
        components: {
            myEasyTable,
            attachTable,
            profitForm
        },
        data() {
            return {
                util:util,
                contractRate:'',
                contractRateData:[],
                costNum:'',
                costId:'',
                cost:'',
                costNoRate:'',
                isShowTab:false,
                activeName:'assessment',
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
                currentPage: '',
                oppoProjectNameTitle: '',
                serviceTypeData: [],
                industryData: [],
                pdName: '',
                pmoName: '',
                oppoNum: '',
                orgCode: '',
                orgName: '',
                draftTime: '',
                oppoProjectName: '',
                customerName: '',
                projectStage: '',
                pmId: '',
                projectSupervisor: '',
                projectDirector: '',
                winRate: '',
                contractAmount: '',
                expectedTimeTosign: '',
                projectStartTime: '',
                projectEndTime: '',
                projectType: '',
                isAllowWorkingHours: true,
                saleId: '',
                industry: '',
                totalIncome: '',
                saleName: '',
                id: '',
                memo: '',
                channelName: '',
                createTime: '',
                productLineName: '',
                productName: '',
                createBy: '',
                lastmodifiedTime: '',
                lastmodifiedBy: '',
                status: '',
                preMangerName: '',
                isShow: false,
                contractRate:'',
                showSixTable:true,
                showSixOpen:true,
                showSixClose:false,
                oppoType:'',
                attachment2:{
                    bizType:"oppo",
                    isViewButton:true,
                    refId:this.$route.query.id   /* 六 ，附件*/
                },
                attachment1:{
                    bizType:"oppo",
                    isViewButton:true,
                    refId:''
                },
            };
        },

        methods: {
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
            handleClick:function () {

            },
            findOneOppoInfo: function () {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getOppoList',
                    data: {
                        "entity": {
                            "id": this.$route.query.id
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    this.id = res.data.rows[0].id;
                    this.oppoNum = res.data.rows[0].oppoNum;
                    this.orgCode = res.data.rows[0].orgCode;
                    this.orgName = res.data.rows[0].orgName;
                    this.oppoProjectName = res.data.rows[0].oppoProjectName;
                    this.customerName = res.data.rows[0].customerName;
                    this.projectStage = res.data.rows[0].projectStage;
                    this.pmId = res.data.rows[0].pmId;
                    this.pdName = res.data.rows[0].pdName;
                    this.pmoName = res.data.rows[0].pmoName;
                    this.winRate = res.data.rows[0].winRate;
                    this.status = res.data.rows[0].status;
                    this.createTime = res.data.rows[0].createTime;
                    this.lastmodifiedTime = res.data.rows[0].lastmodifiedTime;
                    this.createBy = res.data.rows[0].createBy;
                    this.lastmodifiedBy = res.data.rows[0].lastmodifiedBy;
                    this.contractAmount = res.data.rows[0].contractAmount;
                    this.expectedTimeTosign = res.data.rows[0].expectedTimeTosign;
                    this.projectStartTime = res.data.rows[0].projectStartTime;
                    this.projectEndTime = res.data.rows[0].projectEndTime;
                    this.projectType = res.data.rows[0].projectType;
                    this.isAllowWorkingHours = res.data.rows[0].isAllowWorkingHours;
                    this.saleId = res.data.rows[0].saleId;
                    this.saleName = res.data.rows[0].saleName;
                    this.industry = res.data.rows[0].industry;
                    this.totalIncome = res.data.rows[0].totalIncome;
                    this.memo = res.data.rows[0].memo;
                    this.preMangerName = res.data.rows[0].preMangerName;
                    this.productName = res.data.rows[0].productName;
                    this.channelName = res.data.rows[0].channelName;
                    this.productLineName = res.data.rows[0].productLineName;
                    this.oppoType = res.data.rows[0].oppoType;
                    this.contractRate = res.data.rows[0].contractRate;

                    this.formatCreateAndModifyByFil(this.createBy,'createBy');
                    this.formatCreateAndModifyByFil(this.lastmodifiedBy,'lastmodifiedBy');
                    this.getCostDetail()

                });
            },
            formatCreateAndModifyByFil(value,result){
                let username = "";
                if(value && value != "|") {
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

                    this.findOneOppoInfo();

                });
            },
            close: function () {
                this.$router.push({
                    "name": "projectManagement/oppoManagementList",
                    "params": {
                        "currentPage": this.currentPage
                    }
                })
            },
            getCostDetail(){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastList' + window.suffix,
                    data: {
                        "entity": {
                            projectId :this.$route.query.id,
                            isLastVersion:true
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    if (res.data.rows.length > 0 && res.data.rows[0].status == '1') {
                        this.contractValue = res.data.rows[0].contractValue;
                        this.isShowTab = true;
                        this.costNum = res.data.rows[0].costForecastNum;
                        this.costId  = res.data.rows[0].id;
                        this.attachment1.refId=res.data.rows[0].id;

                        this.assessmentData1.id = res.data.rows[0].id
                        this.assessmentData2.id = res.data.rows[0].id
                        this.assessmentData3.id = res.data.rows[0].id
                        this.assessmentData4.id = res.data.rows[0].id

                    }else {
                        this.activeName = 'enclosure';
                    }

                    this.getAllCost();

                });

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

                    let contractRate = Number(this.contractRateData.filter(o => o.value == this.contractRate)[0].label)

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
        created() {
            this.makeDataDictionary();
            this.currentPage = this.$route.query.currentPage;


            //检测成本评估状态是否为冻结状态  是：显示tab



        },
        filters: {
            projectTypeFil: function (value) {
                if (value == '3') {
                    return '商机'
                } else if (value == '5') {
                    return '外部项目'
                } else if (value == '8') {
                    return '内部项目'
                } else if (value == '9') {
                    return '内部管理'
                }
            },
            projectStateFil: function (value) {
                if (value == "01") {
                    return '初步沟通'
                } else if (value == '02') {
                    return '需求了解'
                } else if (value == '03') {
                    return '方案交流'
                } else if (value == '04') {
                    return '价格讨论'
                } else if (value == '05') {
                    return '合同流程'
                }
            },
            contractAmountFil: function (value) {
                return value / 1000
            },
            winRateFil: function (value) {
                if (value == '01') {
                    return '高'
                } else if (value == '02') {
                    return '中'
                } else if (value == '03') {
                    return '低'
                }
            },
            statusFil: function (value) {
                if (value == "1") {
                    return '成功'
                } else if (value == "0") {
                    return '进行中'
                } else if (value == "2") {
                    return '失败'
                }
            },
            createByFil: function (value) {
                if (value) {
                    return value.split('|')[0]
                }

            },
            lastmodifiedByFil: function (value) {
                if (value) {
                    return value.split('|')[0]
                }
            },
            expectedTimeTosignFil: function (value) {
                if (value) {
                    return value.substr(0, 10)
                }
            },
            projectStartTimeFil: function (value) {
                if (value) {
                    return value.substr(0, 10)
                }
            },
            projectEndTimeFil: function (value) {
                if (value) {
                    return value.substr(0, 10)
                }
            },
            isAllowWorkingHoursFil: function (value) {
                if (value) {
                    return '是'
                } else {
                    return '否'
                }
            },
            oppoTypeFmt:function (value) {
                
                if(value  == '01'){
                    return '分销'
                }else if(value == '02'){

                    return '项目'
            
                }
            }
        },
        computed: {
            contractRateValue:function () {
                if(this.contractRateData && this.contractRateData.filter(o => o.value == this.contractRate).length > 0){
                    return this.contractRateData.filter(o => o.value == this.contractRate)[0].label*100 + '%'
                }
            }

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
l