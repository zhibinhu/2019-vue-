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

            <el-col :span="24" style="margin-bottom: 100px;padding-right: 15px">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="项目成本评估" name="assessment">
                        <div style="margin-bottom: 20px">成本预估编号：{{costForecastNum}}</div>

                        <relation-oper-table  ref="perCost"  :relationOperTableData="perCost" v-if="costForecastId!=null"></relation-oper-table>

                        <operation-table  ref="projectCost" :operationTable="projectCost" v-if="costForecastId!=null"></operation-table>

                        <operation-table  ref="external" :operationTable="external" v-if="costForecastId!=null"></operation-table>

                        <!--<operation-table  ref="outCost" :operationTable="outCost"></operation-table>-->
                        <outsource ref="outCost" :costForecastId="costForecastId" v-if="costForecastId!=null"></outsource>


                        <div style="font-size: 14px;padding-left: 10px;margin-bottom: 10px;background: #F2F2F2;height: 40px;line-height: 40px;margin-top: 20px">
                            五、项目成本
                        </div>

                        <el-row  style="border: 1px solid #DBE2EB;line-height: 40px">
                            <el-col :span="6" style="border-right: 1px solid #DBE2EB;background: #DBE2EB;padding-left: 10px">
                                <div class="grid-content bg-purple">项目成本合计</div></el-col>
                            <el-col :span="18" style="padding-left: 10px">
                                <div class="grid-content bg-purple-light">{{allCost|formatFilNew}}</div>
                            </el-col>

                            <el-col :span="6" style="border-right: 1px solid #DBE2EB;background: #DBE2EB;padding-left: 10px">
                                <div class="grid-content bg-purple">项目成本合计（不含税）</div></el-col>
                            <el-col :span="18" style="padding-left: 10px">
                                <div class="grid-content bg-purple-light">{{costNoRate|formatFilNew}}</div>
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
                    <el-tab-pane label="利润测算表" name="profit">

                        <profit-form v-if="changeDataFlag" :profitFormData="profitFormData"></profit-form>

                    </el-tab-pane>
                </el-tabs>

            </el-col>

            <el-col :span="24" style="background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100">

                <div align="center" style="margin-left: -250px">

                    <el-button @click="saveCostForecastDetail(approval.taskType ? '3' : '2')" :disabled="twoClick" type="primary"
                               style="margin-top: 20px;margin-bottom: 10px;margin-right: 10px;" size="small">保存
                    </el-button>

                    <!--<el-button @click="saveCostForecastDetail('02')" type="primary"-->
                               <!--style="margin-top: 20px;margin-bottom: 10px">提交-->
                    <!--</el-button>-->

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

                    <el-button @click="close()" style="margin-top: 20px;margin-left: 10px;margin-bottom: 10px;" size="small">返回</el-button>
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
    import relationOperTable from '../../components/relationOperTable.vue'
    import operationTable from '../../components/operationTable.vue'
    import projectDetail from '../commonView/projectDetail.vue'
    import outsource from '../commonView/outsource.vue'
    import util from "../../libs/util";


    export default {
        components: {
            myEasyTable,
            attachTable,
            profitForm,
            relationOperTable,
            operationTable,
            projectDetail,
            outsource,
            myApprovalBtn
        },
        data() {
            return {
                util:util,
                changeDataFlag:true,
                twoClick:false,//判断是否为新增界面的第一次保存
                approval:{
                    businessKey:'',
                    processInstanceName:'',
                    processKey:'',
                    woCode:'',
                    taskInstanceId:'',
                    variables:{},
                    taskType:'',
                    show:true,
                    data:{}
                },
                projectName:'',
                contractRateData:[],
                reqData:{},
                showFiveTable:true,
                projectId:this.$route.query.projectId,
                costForecastId:this.$route.query.id,
                test: [],
                attachment1:{
                    bizType:"project",
                    refId:this.$route.query.id   /* 六 ，附件*/
                },
                perCost:{
                    id: this.$route.query.id,
                    title:'一、项目人员成本'
                },
                projectCost: {
                    allCost:['totalxxcbcost',2],
                    allCostNoRate:['totalxxcbcostNoRate',4],
                    type: '02',
                    clumns:[3],
                    costClumns:[1,3,5],
                    id: this.$route.query.id,
                    title:'二、项目费用成本',
                    tableThead: [
                        {
                            headName: '费用类型',
                            headKey: 'costName',
                            placeholder: '请选择费用类型',
                            width: '130',
                            selectData: 'costTypeData',
                            selectCode: '费用类型'
                        },
                        {
                            headName: '金额',
                            width: '160',
                            headKey: 'cost',
                            placeholder: '请输入金额',
                            type: 'inputNum'
                        },

                        {
                            headName: '税率',
                            headKey: 'itemRate',
                            placeholder: '请选择税率',
                            width: '130'
                        },
                        {
                            headName: '金额(不含税)',
                            headKey: 'costNoRate',
                            width: '130'
                        },
                        {
                            headName: '备注',
                            headKey: 'memo',
                            placeholder: '请输入备注',
                            type: 'input'
                        }
                    ]
                },
                external: {
                    type: '03',
                    id: this.$route.query.id,
                    allCost:['totalxmwccost',2],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    clumns:[3],
                    costClumns:[1,3,5],
                    title:'三、项目外采',
                    tableThead: [
                        {
                            headName: '供应商名称',
                            headKey: 'costName',
                            placeholder: '请选择角色',
                            width: '130',
                            sysData:true
                        },
                        {
                            headName: '金额',
                            width: '160',
                            headKey: 'cost',
                            placeholder: '请输入金额',
                            type: 'inputNum'
                        },
                        {
                            headName: '税率',
                            headKey: 'itemRate',
                            placeholder: '请选择税率',
                            width: '130'
                        },
                        {
                            headName: '金额(不含税)',
                            headKey: 'costNoRate',
                            width: '130'
                        },
                        {
                            headName: '备注',
                            headKey: 'memo',
                            placeholder: '请输入备注',
                            type: 'input'
                        }
                    ]
                },
                outCost: {
                    type: '04',
                    id: this.$route.query.id,
                    allCost:['totalwbrycost',2],
                    allCostNoRate:['totalwbrycost',4],
                    fixEd:[2],
                    clumns:[1,5],
                    title:'四、外包人员成本',
                    tableThead: [
                        {
                            headName: '角色',
                            headKey: 'costName',
                            placeholder: '请输入角色',
                            type: 'input',
                            width: '130'
                        },
                        {
                            headName: '人天成本',
                            width: '160',
                            headKey: 'mandayCost',
                            placeholder: '请输入人天成本',
                            type: 'inputNum'
                        },
                        {
                            headName: '天数',
                            width: '160',
                            headKey: 'manday',
                            placeholder: '请输入天数',
                            type: 'inputNum'
                        },
                        {
                            headName: '金额',
                            width: '160',
                            headKey: 'cost',
                            placeholder: '请输入金额',
                            type: 'inputNum'
                        },
                        {
                            headName: '备注',
                            headKey: 'memo',
                            placeholder: '请输入备注',
                            type: 'input'
                        }
                    ]
                },
                profitFormData: {
                    contractValue:'',
                    contractRate:'',
                    allCotntactAmount:'',
                    cost:'',
                    profit:'',
                    profitargin:'',
                    isFromEdit:true
                },
                activeName: 'assessment',
                currentPage: '',
                showSixTable:true,
                showSixOpen:true,
                showSixClose:false
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
            handleClick(){

                //项目合同总金额（元）

                let contractValue;
                //税率
                if (this.$route.query.row) {
                    contractValue = JSON.parse(this.$route.query.row).contractValue;
                }
                /**
                 * 工作流
                 */
                if(this.approval.taskType){
                    contractValue = this.approval.data.contractValue;
                }

                let  contractRate;
                if (this.$route.query.row) {
                    contractRate = Number(this.contractRateData.filter(o => o.value == JSON.parse(this.$route.query.row).contractRate)[0].label);
                }
                /**
                 * 工作流
                 */
                if(this.approval.taskType){
                    contractRate = Number(this.contractRateData.filter(o => o.value == this.approval.data.contractRate)[0].label);
                }

                //项目合同（不含税）总金额（元）
                const allCotntactAmount = contractValue / (1 + contractRate)

                // 项目（不含税）总成本（元）
                const cost = (Number(this.$store.state.totalrycbcostNoRate) + this.$store.state.totalxxcbcostNoRate + this.$store.state.totalxmwccostNoRate + this.$store.state.totalwbrycostNoRate) || '0'

                // 利润
                const profit = allCotntactAmount - cost

                // 利润率（%）
                const profitargin = profit/allCotntactAmount


                this.$store.state.oppoContractValue = contractValue;


                if(cost!= '000' && contractValue!= 0){
                    this.profitFormData.contractValue = contractValue
                    this.profitFormData.contractValueResult=contractValue/1000;
                    this.profitFormData.contractRate = contractRate
                    this.profitFormData.allCotntactAmount = allCotntactAmount
                    this.profitFormData.cost = cost
                    this.profitFormData.profit = profit
                    this.profitFormData.profitargin = profitargin
                }
            },
            saveCostForecastDetail: function (status,type) {
                var costForecastId=this.costForecastId;
                //this.changeDataFlag = false;
                this.handleClick();
                this.twoClick=true;
                this.reqData = this.$refs.perCost.getTableData().concat(this.$refs.projectCost.getTableData(), this.$refs.external.getTableData(), this.$refs.outCost.getTableData());
                let extData;
                // debugger;
                if(this.$route.query.row){
                    extData = JSON.parse(this.$route.query.row);
                }else{
                    extData = this.approval.data;
                }
                let reqDataTo=JSON.parse(JSON.stringify(this.reqData))
                reqDataTo.filter(function (o) {
                    if(o.type!= '01'){

                        o.cost = o.cost*1000;
                        o.mandayCost = o.mandayCost*1000
                        o.costNoRate = o.costNoRate*1000
                    }
                })

                extData['status'] = status

                if(this.$store.state.oppoContractValue){
                    extData['contractValue'] = this.$store.state.oppoContractValue
                }
                this.costForecastId=null;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/saveCostForecastDetailEX' + window.suffix,
                    data: {
                        "entity": reqDataTo,
                        "ext":extData
                    }
                }).then(res => {
                    //成功回调方法
                    console.log(res)
                    if(res.status === 200){
                        if(res.data.subCode != '0'){
                            this.$notify({
                                title: '输入不完整',
                                message: (res.data.subMsg).substring(0, res.data.subMsg.indexOf(' ')),
                                type: 'warning'
                            });

                            // this.reqData.filter(function (o) {
                            //     if(o.type == '01'){
                            //         if(o.costTypeSelectData){
                            //             o.costTypeSelectData = JSON.parse(o.costTypeSelectData)
                            //         }
                            //     }else {
                            //         o.cost = o.cost/1000;
                            //         o.mandayCost = o.mandayCost/1000
                            //         o.costNoRate = o.costNoRate/1000
                            //     }
                            // })

                        }else {
                            if(type==undefined || "approval" != type) {
                                // this.reqData.filter(function (o) {
                                //     if(o.type == '01'){
                                //         if(o.costTypeSelectData){
                                //             o.costTypeSelectData = JSON.parse(o.costTypeSelectData)
                                //         }
                                //     }else {
                                //         o.cost = o.cost/1000;
                                //         o.mandayCost = o.mandayCost/1000
                                //         o.costNoRate = o.costNoRate/1000
                                //     }
                                // });
                                this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });
                            //     /*this.$router.push({
                            //         name: 'costBudget/projectListCostList',
                            //         params:{
                            //             currentPage:this.currentPage
                            //         }
                            //     });*/
                            //     //this.$router.back(-1);
                            }else{

                                // this.reqData.filter(function (o) {
                                //     if(o.type == '01'){
                                //         if(o.costTypeSelectData){
                                //             o.costTypeSelectData = JSON.parse(o.costTypeSelectData)
                                //         }
                                //     }else {
                                //         o.cost = o.cost/1000;
                                //         o.mandayCost = o.mandayCost/1000
                                //         o.costNoRate = o.costNoRate/1000
                                //     }
                                // })
                                this.$refs.projectCostForecast.submit();
                            }
                        }
                        this.costForecastId=costForecastId;
                        setTimeout(()=>{
                            this.twoClick=false;
                        },500)
                    }
                });

            },
            close: function () {
                /*this.$router.push({
                    "name": "costBudget/projectListCostList",
                    "params": {
                        "currentPage": this.currentPage
                    }
                })*/
                this.$router.back(-1);
            },
            getContractRateData:function () {

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

                });

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
                        console.log("this.$route.query.id",this.$route.query.id);
                        console.log("res.data.rows[0]",res.data.rows[0]);
                        let data = res.data.rows[0];
                        this.projectId = data.projectId;
                        this.perCost.id = data.id;
                        this.projectCost.id = data.id;
                        this.external.id = data.id;
                        this.attachment1.refId = data.id;
                        this.costForecastId = data.id;
                        this.approval.data = data;
                        if(this.$route.params.row.pid != undefined && data.status == '2') {
                            this.approval.taskInstanceId = ""
                            this.approval.taskType = ""
                        }
                    });
                }
            },
            /**
             * 提交之前校验业务表单
             */
            checkBeforeProcess() {
                if (true) {
                    this.saveCostForecastDetail(this.approval.taskType ? '3' : '2', "approval");
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
                    data.status = status;//设置审批状态
                    data.processInstanceId = piid;//设置流程实例id
                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + '/project/cost/saveCostForecast' + window.suffix,
                        data: {
                            "entity": data
                        }
                    }).then(res => {
                        this.$refs.projectCostForecast.tagClose('editProjectCost');
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
            this.findOneOppoInfo();
            this.currentPage = this.$route.query.currentPage;
            if(this.$route.query.row){
                this.costForecastNum = JSON.parse(this.$route.query.row).costForecastNum;
            }

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
            this.approval.businessKey = this.costForecastNum; //业务标识
            //this.approval.processKey = "num_one"; //流程key启动
            this.approval.woCode = "project_costForecast"; //工单启动

            this.getContractRateData();
        },
        mounted: function () {
            /**
             * 工作流相关
             */
            if(this.$route.query.processInstanceId != null) {
                this.$refs.projectCostForecast.submitVisable = false;
                this.$refs.projectCostForecast.hisVisable = true;
                this.$refs.projectCostForecast.processInstanceId = this.$route.query.processInstanceId;
            }
        },
        computed:{
            allCost:function () {
                let firstCost=parseFloat(this.$store.state.totalrycbcost/1000).toFixed(2);
                let secondCost=parseFloat(this.$store.state.totalxxcbcost/1000).toFixed(2);
                let thirdCost=parseFloat(this.$store.state.totalxmwccost/1000).toFixed(2);
                let fourthCost=parseFloat(this.$store.state.totalwbrycost/1000).toFixed(2);
                return parseFloat(firstCost*1 + secondCost*1 + thirdCost*1 + fourthCost*1).toFixed(2);
            },
            costNoRate:function () {
                let firstCost=parseFloat(this.$store.state.totalrycbcostNoRate/1000).toFixed(2);
                let secondCost=parseFloat(this.$store.state.totalxxcbcostNoRate/1000).toFixed(2);
                let thirdCost=parseFloat(this.$store.state.totalxmwccostNoRate/1000).toFixed(2);
                let fourthCost=parseFloat(this.$store.state.totalwbrycostNoRate/1000).toFixed(2);
                return parseFloat(firstCost*1 + secondCost*1 + thirdCost*1 + fourthCost*1).toFixed(2);
            }
        }
    };
</script>

<style>

</style>
