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

        <div style="height: 35px;line-height: 35px;margin: 10px 10px 0 10px;padding-left: 10px;font-size: 15px;border-bottom: 2px solid #DDE1E4;">项目基本信息 > 信息查看</div>

        <div style="font-size: 16px;">


            <project-detail :projectId="id"></project-detail>


            <el-col :span="24"  style="margin-bottom: 100px;" v-if="isShowTab">
            <el-tabs v-model="activeName" style="margin: 0 10px">
                <el-tab-pane  label="项目成本评估" name="assessment">
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
                            <div class="grid-content bg-purple">项目成本合计（不含税）</div></el-col>
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
                <el-tab-pane  label="利润测算表" name="profit">

                    <profit-form :profitFormData="profitFormData"></profit-form>

                </el-tab-pane>
               <!-- <el-tab-pane label="相关附件" name="enclosure">
                    <attach-table></attach-table>
                </el-tab-pane>-->
            </el-tabs>

            </el-col>



            <el-col :span="22" :offset="8" :style="isShowTab ? 'position: fixed;bottom: 0; width: 100%; z-index: 100':'margin-left:45%'">


                <el-button @click="close()"  style="margin-bottom: 20px">返回</el-button>

            </el-col>

        </div>


    </el-col>
</template>

<script>

    import myEasyTable from '../../components/myEasyTable.vue'
    import attachTable from '../../components/attachTable.vue'
    import profitForm from '../../components/profitForm.vue'
    import operationTable from '../../components/operationTable.vue'
    import projectDetail from '../commonView/projectDetail.vue'


    export default {
        components: {
            myEasyTable,
            attachTable,
            profitForm,
            operationTable,
            projectDetail
        },
        data() {
            return {
                contractRate:'',
                contractRateData:[],
                costNum:'',
                costId:'',
                cost:'',
                costNoRate:'',
                isShowTab:false,
                id:'',
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
                    noSum:[2,5,7],
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
                    refId:""   /* 六 ，附件*/
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
                this.$router.push({
                    "name": "projectManagement/projectList",
                    "params":{
                        "currentPage":this.currentPage
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

                        console.log(1111,res.data.rows[0])


                        this.contractValue = res.data.rows[0].contractValue;
                        this.contractRate = res.data.rows[0].contractRate;
                        this.isShowTab = true;
                        this.attachment1.refId=res.data.rows[0].id;
                        this.costNum = res.data.rows[0].costForecastNum;
                        this.costId  = res.data.rows[0].id;
                        this.$store.state.costId = res.data.rows[0].id

                        this.assessmentData1.id = res.data.rows[0].id
                        this.assessmentData2.id = res.data.rows[0].id
                        this.assessmentData3.id = res.data.rows[0].id
                        this.assessmentData4.id = res.data.rows[0].id
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


                    if(this.contractRateData.filter(o => o.value == this.contractRate)[0]) {
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
                    }
                });
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
                    this.getCostDetail()
                });
            },


        },
        created() {
            this.currentPage = this.$route.query.currentPage;
            this.id = this.$route.query.id
            this.makeDataDictionary()

        },
        mounted:function () {
        }
    };
</script>

<style>

</style>
