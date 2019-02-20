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

        <div style="margin-left: 15px;font-size: 16px">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 0 0;padding-left: 10px;font-size: 15px;">项目基本信息 > 查看信息</div>

            <project-detail :projectId="projectId" v-if="projectId!=null"></project-detail>

            <el-col :span="24" style="margin-bottom: 100px;padding-right: 15px" v-if="isFromEdit">
                <el-tabs v-model="activeName">
                    <el-tab-pane  label="项目成本评估" name="assessment">
                        <div style="margin-bottom: 20px">成本预估编号：{{costForecastNum}}</div>

                        <my-easy-table ref="myEasyTable" :easyTableData="assessmentData1" v-if="costForecastId!=null"></my-easy-table>

                        <my-easy-table ref="myEasyTable2" :easyTableData="assessmentData2" v-if="costForecastId!=null"></my-easy-table>

                        <my-easy-table ref="myEasyTable3" :easyTableData="assessmentData3" v-if="costForecastId!=null"></my-easy-table>

                        <my-easy-table ref="myEasyTable4" :easyTableData="assessmentData4" v-if="costForecastId!=null"></my-easy-table>

                        <div style="font-size: 14px;padding-left: 10px;margin-bottom: 10px;background: #F2F2F2;height: 40px;line-height: 40px;margin-top: 20px">
                            五、项目成本
                        </div>


                        <el-row  style="border: 1px solid #DBE2EB;line-height: 40px">
                            <el-col :span="6" style="border-right: 1px solid #DBE2EB;background: #DBE2EB;padding-left: 10px">
                                <div class="grid-content bg-purple">项目成本合计</div></el-col>
                            <el-col :span="18" style="padding-left: 10px">
                                <!--<div class="grid-content bg-purple-light">{{cost|amountFmt}}</div>-->

                                <div class="grid-content bg-purple-light">{{util.returnFloat(cost/1000)}}</div>
                            </el-col>

                            <el-col :span="6" style="border-right: 1px solid #DBE2EB;background: #DBE2EB;padding-left: 10px">
                                <div class="grid-content bg-purple">项目成本合计（不含税）</div></el-col>
                            <el-col :span="18" style="padding-left: 10px">
                                <div class="grid-content bg-purple-light">{{util.returnFloat(costNoRate/1000)}}</div>
                                <!--<div class="grid-content bg-purple-light">{{costNoRate|amountFmt}}</div>-->
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
                        <attach-table v-if="showSixTable && costForecastId!=null" :attachTable="attachment1"></attach-table>


                    </el-tab-pane>
                    <el-tab-pane  label="利润测算表" name="profit">

                        <profit-form :profitFormData="profitFormData"></profit-form>
                    </el-tab-pane>
                </el-tabs>

            </el-col>

            <el-col :span="24"  style="background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100">

                <div  align="center" style="margin-left: -200px">
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
                    <my-approval-btn ref="projectCostForecast"
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

                    <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px;margin-left: 10px" size="small">返回</el-button>
                </div>


            </el-col>

        </div>


    </el-col>
</template>

<script>

    import myApprovalBtn from "@/components/myApprovalBtn"
    import myEasyTable from '../../components/myEasyTable.vue'
    import attachTable from '../../components/attachTable.vue'
    import profitForm from '../../components/profitForm.vue'
    import projectDetail from '../commonView/projectDetail.vue'
    import util from '../../libs/util'
    export default {
        components: {
            myEasyTable,
            attachTable,
            profitForm,
            projectDetail,
            myApprovalBtn,
        },
        data() {
            return {
                util:util,
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
                projectName:'',
                contractRateData:[],
                costForecastNum:this.$route.query.costForecastNum,
                cost:'',
                costNoRate:'',
                projectId:this.$route.query.projectId,
                costForecastId:this.$route.query.id,
                isFromEdit:true,
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
                            headKey: 'manday',
                            align:'right'
                        },
                        {
                            headName: '单位人员成本/天',
                            headKey: 'mandayCost',
                            isAmount:true,
                            align:'right'

                        },
                        {
                            headName: '人工成本费用',
                            headKey: 'cost',
                            isAmount:true,
                            align:'right'

                        },
                        {
                            headName: '税率',
                            headKey: 'itemRate',
                            align:'right'
                        },
                        {
                            headName: '人工成本费用(不含税)',
                            headKey: 'costNoRate',
                            isAmount:true,
                            align:'right'
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
                            headKey: 'cost',
                            align:'right'
                        },
                        {
                            headName: '税率',
                            headKey: 'itemRate',
                            align:'right'
                        },
                        {
                            headName: '人工成本费用(不含税)',
                            headKey: 'costNoRate',
                            isAmount:true,
                            align:'right'
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
                            headKey: 'cost',
                            align:'right'
                        },
                        {
                            headName: '税率',
                            headKey: 'itemRate',
                            align:'right'
                        },
                        {
                            headName: '人工成本费用(不含税)',
                            headKey: 'costNoRate',
                            isAmount:true,
                            align:'right'
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
                            headKey: 'mandayCost',
                            align:'right'
                        },
                        {
                            headName: '天数',
                            headKey: 'manday',
                            align:'right'
                        },
                        {
                            headName: '金额',
                            headKey: 'cost',
                            align:'right'
                        },
                        {
                            headName: '税率',
                            headKey: 'itemRate',
                            align:'right'
                        },
                        {
                            headName: '人工成本费用(不含税)',
                            headKey: 'costNoRate',
                            isAmount:true,
                            align:'right'
                        },
                        {
                            headName: '备注',
                            headKey: 'memo'
                        }
                    ],
                    noSum:[1,2,5,7],
                    dayData:[1,3,4]
                },
                activeName:'assessment',
                currentPage:'',
                showSixTable:true,
                showSixOpen:true,
                showSixClose:false,
                attachment1:{
                    bizType:"project",
                    isViewButton:true,
                    refId:this.$route.query.id   /* 六 ，附件*/
                }
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

            close: function () {
                /*this.$router.push({
                    "name": "costBudget/projectListCostList",
                    "params":{
                        "currentPage":this.currentPage
                    }
                });*/
                this.$router.back(-1);
            },
            getAllCost:function () {
                /**
                 * 工作流
                 */
                if(this.approval.taskType){
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'project/cost/getCostForecastList' + window.suffix,
                        data: {
                            entity:{
                                costForecastNum:this.$route.params.row.businessKey
                            }
                        }
                    }).then(res => {
                        let data = res.data.rows[0];
                        this.projectId = data.projectId;
                        this.assessmentData1.id = data.id;
                        this.assessmentData2.id = data.id;
                        this.assessmentData3.id = data.id;
                        this.assessmentData4.id = data.id;
                        this.attachment1.refId = data.id;
                        this.costForecastId = data.id;
                        this.getAllCostChild(data.id, data);
                        if(this.$route.params.row.pid != undefined && data.status == '2') {
                            this.approval.taskInstanceId = ""
                            this.approval.taskType = ""
                        }
                    });
                } else {
                    this.getAllCostChild(this.costForecastId);
                }
            },
            getAllCostChild:function(costForecastId, data){
                //项目合同总金额（元）
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastDetailList' + window.suffix,
                    data: {
                        "entity": {
                            costForecastId:costForecastId
                        }
                    }
                }).then(res => {

                    let contractValue;//税率
                    if (this.$route.query.row) {
                        contractValue = JSON.parse(this.$route.query.row).contractValue;
                    }
                    /**
                     * 工作流
                     */
                    if(this.approval.taskType){
                        contractValue = data.contractValue;
                    }

                    let contractRate;
                    if (this.$route.query.row) {
                        contractRate = Number(this.contractRateData.filter(o => o.value == JSON.parse(this.$route.query.row).contractRate)[0].label);
                    }
                    /**
                     * 工作流
                     */
                    if(this.approval.taskType){
                        contractRate = Number(this.contractRateData.filter(o => o.value == data.contractRate)[0].label);
                    }

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


                    this.$store.state.oppoContractValue = contractValue;


                    if(cost!= '000' && contractValue!= 0){
                        this.profitFormData.contractValue = contractValue
                        this.profitFormData.contractRate = contractRate
                        this.profitFormData.allCotntactAmount = allCotntactAmount
                        this.profitFormData.cost = cost
                        this.profitFormData.profit = profit
                        this.profitFormData.profitargin = profitargin
                    }
                })
            },
            getContractRate:function () {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "税率"
                        },
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
                    this.contractRateData = resArry;

                    this.getAllCost();
                });
            },
            /**
             * 提交之前校验业务表单
             */
            checkBeforeProcess() {
                if (true) {
                    this.$refs.projectCostForecast.submit();
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
                    url: this.prefix + 'project/cost/getCostForecastList' + window.suffix,
                    data: {
                        entity:{
                            id:this.costForecastId
                        }
                    }
                }).then(res => {
                    let data = res.data.rows[0];
                    data.status = status;
                    data.processInstanceId = piid;
                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + '/project/cost/saveCostForecast' + window.suffix,
                        data: {
                            "entity": data
                        }
                    }).then(res => {
                        if(optionType == 'endProcess'){
                            this.$myHttp({
                                method: 'post',
                                url: this.prefix + '/project/cost/effectUpdateCostForecast' + window.suffix,
                                data: {
                                    "entity": res.data.ext
                                }
                            });
                        }
                        this.$refs.projectCostForecast.tagClose('viewProjectCost');
                    });
                });
            },

            //20181129 09:23商机详细
            findOneOppoInfo: function () {
                if(this.projectId) {
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'project/getProjectList',
                        data: {
                            "entity": {
                                "id": this.projectId
                            }
                        }
                    }).then(res => {
                        this.projectName = res.data.rows[0].projectName;

                        this.approval.processInstanceName = "项目成本预估【" + this.costForecastNum + "-项目名称:" + this.projectName + "】";
                    });
                }

            },
        },
        created() {
            this.currentPage = this.$route.query.currentPage;
            this.findOneOppoInfo();
            /**
             * 工作流相关
             */
            if (this.$route.params.row != undefined && this.$route.params.row.activityId != undefined) {
                this.approval.taskInstanceId = this.$route.params.row.id;
                this.approval.businessKey = this.$route.params.row.businessKey;
                this.approval.taskType = this.$route.params.row.taskType;
                this.costForecastNum = this.approval.businessKey;
                this.approval.processInstanceName = this.$route.params.row.businessInfo;
            }
            console.log(this.approval.processInstanceName)
            this.approval.businessKey = this.costForecastNum; //业务标识
            //this.approval.processKey = "num_one"; //流程key启动
            this.approval.woCode = "project_costForecast"; //工单启动


            this.getContractRate();
        },
        mounted:function () {
            /**
             * 工作流相关
             */
            if(this.$route.query.processInstanceId != null) {
                this.$refs.projectCostForecast.submitVisable = false;
                this.$refs.projectCostForecast.hisVisable = true;
                this.$refs.projectCostForecast.processInstanceId = this.$route.query.processInstanceId;
            } else {
                if(this.approval.taskType){
                    this.$refs.projectCostForecast.submitVisable = true;
                }else{
                    this.$refs.projectCostForecast.submitVisable = false;
                }
            }
        }
    };
</script>

<style>

</style>
