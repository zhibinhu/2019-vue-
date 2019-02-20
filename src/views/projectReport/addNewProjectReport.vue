<style lang="less">
    input{
        font-size: 11px;
    }

</style>
<template>
    <div>
        <el-col :span="24" style="background-color: white" >

            <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 25px">
                编辑月报
            </h2>

            <el-form ref="ruleFormOne" :rules="rules" :model="form" label-width="120px"  style="align:right;margin-bottom: 20px;margin-left: 10px;">
                <el-col :span="8" :xs="20" >
                    <el-form-item label="项目名称" prop="projectName" :title="form.projectName" :hide-required-asterisk="true">
                        <el-input :disabled="true" v-model="form.projectName" style="width: 95%"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="8" :xs="20">
                    <el-form-item label="项目开始" label-width="120px" prop="projectStartTime" :hide-required-asterisk="true">
                        <el-input v-model="form.projectStartTime" style="width: 95%" :disabled="true" ></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="项目结束" label-width="120px" prop="projectEndTime">
                        <el-input v-model="form.projectEndTime" style="width: 95%"  :disabled="true"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="项目编号" label-width="120px" prop="projectNum">
                        <el-input v-model="form.projectNum" style="width: 95%"  :disabled="true" ></el-input>
                    </el-form-item>

                </el-col>


                <el-col :span="8" :xs="20">
                    <el-form-item label="项目经理" label-width="120px" prop="pmName">
                        <el-input v-model="form.pmName" style="width: 95%"  :disabled="true" ></el-input>
                    </el-form-item>


                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="周期" label-width="120px" prop="cycle">
                        <el-input v-model="form.cycle" style="width: 95%"  :disabled="true" ></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="项目运行状态" label-width="120px" prop="projectState">
                        <el-select v-model="form.projectState"  size="small" clearable style="width: 95%">
                            <el-option value="正常"></el-option>
                            <el-option value="提前"></el-option>
                            <el-option value="延迟"></el-option>
                            <el-option value="暂停"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                <el-form-item  label="项目完成度" label-width="120px" prop="projectCompletionSchedule">
                    <el-input  type="tel" v-model.number="form.projectCompletionSchedule" style="width: 50%" >
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                    
                </el-col>
            </el-form>
            <!--         <el-dialog
                      title="选择一个项目"
                      :visible.sync="dialogVisible"
                      :modal="false"
                      width="40%">
                      <span slot="footer" class="dialog-footer">
                        <el-table :data="ProjectInfo" style="margin-bottom:20px;padding-top:-30px" @row-click="Choose_one_project" max-height="400">
                        <el-table-column property="projectNum" label="项目编号" width="150"></el-table-column>
                        <el-table-column property="projectName" label="项目名称" width="200"></el-table-column>
                        <el-table-column property="pmName" label="项目经理"></el-table-column>
                        <el-table-column label="操作" width="100"  >
                            <template slot-scope="scope">
                                <el-button type="primary">选择</el-button>
                            </template>
                        </el-table-column>
                      </el-table>
                      </span>
                    </el-dialog>
             -->







             <!-- 
                2018-12-13
                字段经过UAT后定为如下长度 
        
            -->
            <el-col>
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="项目成本情况" name="first">
                        <el-table  border stripe
                                   ref="multipleTable"
                                   :data="tableDataList"
                                   tooltip-effect="dark"
                                   style="width: 100%;border-collapse: collapse"
                                   size="small">
                            <el-table-column
                                    prop="costType"
                                    class-name="columnTitle"
                                    align="left"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="manPower"
                                    label="人力成本"
                                    align="right"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="cost"
                                    label="费用成本"
                                    align="right"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="procurement"
                                    label="外采成本"
                                    align="right"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="outSource"
                                    label="外包成本"
                                    align="right"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="costSum"
                                    label="总和"
                                    align="right"
                                    width="230">
                            </el-table-column>
                        </el-table>



                        <el-col style="margin-left:10px;margin-top:10px;margin-bottom:20px;">
                            <font color="black" style="font-size:14px;color:#A4A4A4;">
                                注：偏差率=(预算金额-预计总成本)÷预算金额
                            </font>
                        </el-col>


                        <h3 style="margin-top: 30px;margin-left: 10px;margin-bottom: 20px">
                            每月详情
                        </h3>
                        <el-table  border stripe
                                   ref="multipleTable_2"
                                   :data="tableDataList_2"
                                   tooltip-effect="dark"
                                   style="width: 100%;border-collapse: collapse"
                                   size="small">
                            <el-table-column
                                    prop="cycleTable"
                                    label="周期"
                                    width="150">
                            </el-table-column>
                            <!-- 

                                根据showindex判断该输入框是否可填
                            -->
                            <el-table-column
                                    prop="manPower"
                                    label="人力成本"
                                    align="right"
                                    width="150">
                                <template slot-scope="scope">
                                    <el-input  type="tel" v-if="scope.$index>showindex" @change="changevalue(scope.$index)" v-model="tableDataList_2[scope.$index].manPower"></el-input>
                                    <el-input v-else v-model="tableDataList_2[scope.$index].manPower"     :disabled="true"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="cost"
                                    label="费用成本"
                                    align="right"
                                    width="150">
                                <template slot-scope="scope">
                                    <el-input type="tel" v-if="scope.$index>showindex" @change="changevalue(scope.$index)" v-model="tableDataList_2[scope.$index].cost"></el-input>
                                    <el-input type="tel" v-else v-model="tableDataList_2[scope.$index].cost"     :disabled="true"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="procurement"
                                    label="外采成本"
                                    align="right"
                                    width="150">
                                <template slot-scope="scope">
                                    <el-input type="tel" v-if="scope.$index>=showindex" @change="changevalue(scope.$index)" v-model="tableDataList_2[scope.$index].procurement"></el-input>
                                    <el-input type="tel" v-else v-model="tableDataList_2[scope.$index].procurement"     :disabled="true"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="outSource"
                                    label="外包成本"
                                    align="right"
                                    width="150">
                                <template slot-scope="scope">
                                    <el-input type="tel" v-if="scope.$index>showindex" @change="changevalue(scope.$index)" v-model="tableDataList_2[scope.$index].outSource"></el-input>
                                    <el-input type="tel" v-else v-model="tableDataList_2[scope.$index].outSource"     :disabled="true"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="listSum"
                                    label="总和"
                                    align="right"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="reportState"
                                    label="状态"
                                    width="80">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="本月完成工作情况及下月工作计划" name="second" style="width:100%">
                        <el-form ref="form" :model="form" label-width="180"  style="width:100%;margin-top:10px;margin-bottom: 20px;">
                            <el-col :span="8" :xs="20" style="width:100%;">
                                <el-form-item label="1.本月完成工作情况">
                                    <hr style="margin-top:30px;">
                                    <el-input v-model="form.workSituation" placeholder="请输入小于500个汉字" style="width:1000px;margin-top:20px;margin-left:-120px;" type="textarea" :rows="10" maxlength="500">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="2.存在问题及风险">
                                    <hr style="margin-top:30px;">
                                    <el-input v-model="form.problemAndRisk" placeholder="请输入小于500个汉字" style="width:1000px;margin-top:20px;margin-left:-110px;" type="textarea" :rows="10" maxlength="500" ></el-input>
                                </el-form-item>

                                <el-form-item label="3.下月工作计划">
                                    <hr style="margin-top:30px;">
                                    <el-input v-model="form.workPlan" placeholder="请输入小于500个汉字" style="width:1000px;margin-top:20px;margin-left:-100px;" type="textarea" :rows="10" maxlength="500"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-col>

            <el-col :span="24" :offset="10">
                <el-button  @click="saveProjectReport()" style="margin-top: 20px;margin-bottom: 10px;margin-right: 10px"  >保存</el-button>

                <my-approval-btn ref="oppoCostForecast"
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

                <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px;margin-left: 10px">取消</el-button>
                <el-button @click="autoinput()" style="margin-top: 20px;margin-bottom: 10px;margin-left: 10px">自动填充</el-button>
            </el-col>

        </el-col>

    </div>
</template>
<style>
    .columnTitle{
        font-size: 16px;
    }
</style>
<script>
    import myApprovalBtn from '@/components/myApprovalBtn';
    import util from '../../libs/util';
    export default {
        components: {
            myApprovalBtn
        },
        data () {
            return {
                approval: {
                    businessKey: '',
                    processInstanceName: '',
                    processKey: '',
                    woCode: '',
                    taskInstanceId: '',
                    variables: {},
                    taskType: '',
                    show: false,
                    data: {}
                },
                form: {
                    'status': '',
                    'cycle': '',
                    'id': '',
                    'projectCompletionSchedule': '',
                    'projectNum': '',
                    'projectState': '',
                    'reserve1': '',
                    'reserve2': '',
                    'projectName': '',
                    'projectStartTime': '',
                    'projectEndTime': '',
                    'pmName': '',
                    'pmId': '',
                    'workSituation': '',
                    'problemAndRisk': '',
                    'workPlan': '',
                    'manPower': '',
                    'cost': '',
                    'procurement': '',
                    'outSource': '',
                    'reportState': ''
                },
                nowDate: '',
                rpid: '',
                showindex: '',
                showTable: [],
                options: [],
                activeName: 'first',
                ProjectInfo: [],
                selectProjectName: [],
                startTime: '',
                endTime: '',
                /*
                预算列表头以及字段初始化
                */
                tableDataList: [
                    {costType: '预算金额', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '累计发生', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '完成百分比', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '预计发生', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '预计总成本', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '偏差率', manPower: '', cost: '', procurement: '', outSource: ''}
                ],

                /*
                校验规则
                */
                rules: {
                    projectCompletionSchedule: [
                        { required: true, message: '完成度不能为空', trigger: 'blur'},
                    ],
                    projectState: [ { required: true, message: '请选择项目状态', trigger: 'blur'}],
                    projectStartTime: [ { required: true, message: '', trigger: 'blur'}],
                    projectEndTime: [ { required: true, message: '', trigger: 'blur'}],
                    projectName: [ { required: true, message: '', trigger: 'blur'}],
                    projectNum: [ { required: true, message: '', trigger: 'blur'}],
                    pmName: [ { required: true, message: '', trigger: 'blur'}],
                    cycle: [ { required: true, message: '', trigger: 'blur'}]
                },
                tableDataList_2: [],
                fore_manPower: '',
                fore_cost: '',
                fore_procurement: '',
                fore_outSource: ''
            };
        },
        mounted: function () {
            /**
             * 工作流相关  
             2018.12.14 现已废除 刘峰做的工作流 我不清楚具体增加了哪些内容 所以没有删掉相关代码 不会影响程序运行
             */
            if (this.$route.query.processInstanceId != null) {
                this.$refs.oppoCostForecast.submitVisable = false;
                this.$refs.oppoCostForecast.hisVisable = true;
                this.$refs.oppoCostForecast.processInstanceId = this.$route.query.processInstanceId;
            }

            var prid = this.$route.query.id;        //获取月报ID
            if (prid != null) {
                var prnum;
                var that = this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getReportList' + window.suffix,
                    data: {
                        'entity': {id: prid}
                    }
                }).then(res => {                //处理取到的月报列表
                    console.log('ReportResData:');
                    var restemp = res.data.rows[0];
                    console.log(restemp);
                    /*
                        由于开始和结束时间有另外的显示规则，所以单独声明两个变量处理
                    */
                    this.startTime = restemp.projectStartTime;          
                    this.endTime = restemp.projectEndTime;      
                    prnum = restemp.projectNum;
    
                    // 项目开始时间
                    this.form.projectStartTime = this.check_time(restemp.projectStartTime);
                    // 项目结束时间
                    this.form.projectEndTime = this.check_time(restemp.projectEndTime);

                    this.form.projectName = restemp.projectName;
                    this.form.projectNum = restemp.projectNum;
                    this.form.id = restemp.id;
                    this.form.pmId = restemp.pmId;
                    this.form.pmName = restemp.pmName;
                    this.form.workSituation = restemp.workSituation;
                    this.form.problemAndRisk = restemp.problemAndRisk;
                    this.form.workPlan = restemp.workPlan;
                    this.form.projectCompletionSchedule = restemp.projectCompletionSchedule;
                    this.form.projectState = restemp.projectState;
                    this.form.cycle = restemp.cycle;
                    this.getProjectCost(restemp);
                });
            }
        },
        methods: {
            /*
                点击自动填充时调用
                将每月详情中的可填项赋值为剩余平均数
                公式例为：
                人力预算平均值=（人力预算总值-人力累计发生值）/未发生月份
                外采多一个可填月，做特殊判断
            */
            autoinput () {
                var i, len;
                len = this.tableDataList_2.length;
    
                console.log('fore_manPower:' + this.fore_manPower);
                console.log('fore_cost:' + this.fore_cost);
                console.log('fore_procurement:' + this.fore_procurement);
                console.log('fore_outSource:' + this.fore_outSource);

                for (i = this.showindex; i < len; i++) {
                    if (i == this.showindex) { this.tableDataList_2[i].procurement = this.fore_procurement; } 
                    else {
                        this.tableDataList_2[i].manPower = this.fore_manPower;
                        this.tableDataList_2[i].cost = this.fore_cost;
                        this.tableDataList_2[i].procurement = this.fore_procurement;
                        this.tableDataList_2[i].outSource = this.fore_outSource;
                    }
                }
                this.returnNum(); // 将千分位数字转化为数字字符串
                this.refreash(); // 将新获得的所有数据重新计算
                this.cal_percent(); // 计算百分比
                this.toFixFloat(); // 转为千分位
            },
            /*
                重新计算每月详情和预算表中的总和
            */
            refreash () {
                var i, len;
                len = this.tableDataList_2.length;
                this.tableDataList[1].manPower = 0.00;
                this.tableDataList[1].cost = 0.00;
                this.tableDataList[1].outSource = 0.00;
                this.tableDataList[1].procurement = 0.00;
                this.tableDataList[1].costSum = 0.00;

                this.tableDataList[3].manPower = 0.00;
                this.tableDataList[3].cost = 0.00;
                this.tableDataList[3].outSource = 0.00;
                this.tableDataList[3].procurement = 0.00;
                this.tableDataList[3].costSum = 0.00;

                this.tableDataList[4].manPower = 0.00;
                this.tableDataList[4].cost = 0.00;
                this.tableDataList[4].outSource = 0.00;
                this.tableDataList[4].procurement = 0.00;
                this.tableDataList[4].costSum = 0.00;

                for (i = 0; i < len; i++) {
                    this.tableDataList_2[i].listSum = parseFloat(this.tableDataList_2[i].manPower) + parseFloat(this.tableDataList_2[i].cost) + parseFloat(this.tableDataList_2[i].procurement) + parseFloat(this.tableDataList_2[i].outSource);
                    if (i <= this.showindex) {
                        this.tableDataList[1].manPower += parseFloat(this.tableDataList_2[i].manPower);
                        this.tableDataList[1].cost += parseFloat(this.tableDataList_2[i].cost);
                        this.tableDataList[1].procurement += parseFloat(this.tableDataList_2[i].procurement);
                        this.tableDataList[1].outSource += parseFloat(this.tableDataList_2[i].outSource);
                        continue;
                    }
                    this.tableDataList[3].manPower += parseFloat(this.tableDataList_2[i].manPower);
                    this.tableDataList[3].cost += parseFloat(this.tableDataList_2[i].cost);
                    this.tableDataList[3].procurement += parseFloat(this.tableDataList_2[i].procurement);
                    this.tableDataList[3].outSource += parseFloat(this.tableDataList_2[i].outSource);
                }
                this.tableDataList[4].manPower = parseFloat(this.tableDataList[3].manPower) + parseFloat(this.tableDataList[1].manPower);
                this.tableDataList[4].cost = parseFloat(this.tableDataList[3].cost) + parseFloat(this.tableDataList[1].cost);
                this.tableDataList[4].procurement = parseFloat(this.tableDataList[3].procurement) + parseFloat(this.tableDataList[1].procurement);
                this.tableDataList[4].outSource = parseFloat(this.tableDataList[3].outSource) + parseFloat(this.tableDataList[1].outSource);

                this.tableDataList[1].costSum = parseFloat(this.tableDataList[1].manPower) + parseFloat(this.tableDataList[1].cost) + parseFloat(this.tableDataList[1].procurement) + parseFloat(this.tableDataList[1].outSource);
                this.tableDataList[3].costSum = parseFloat(this.tableDataList[3].manPower) + parseFloat(this.tableDataList[3].cost) + parseFloat(this.tableDataList[3].procurement) + parseFloat(this.tableDataList[3].outSource);
                this.tableDataList[4].costSum = parseFloat(this.tableDataList[4].manPower) + parseFloat(this.tableDataList[4].cost) + parseFloat(this.tableDataList[4].procurement) + parseFloat(this.tableDataList[4].outSource);
            },
            /*
                初始化每月详情表并为每一行赋值
                并累加计算累计发生和预计总发生
                赋值后计算每月总和
            */
            assignment (temp) {
                // 给每一行赋值
                var len = temp.length;
                var i;
                this.tableDataList[1].manPower = 0.00;
                this.tableDataList[1].cost = 0.00;
                this.tableDataList[1].outSource = 0.00;
                this.tableDataList[1].procurement = 0.00;
                this.tableDataList[3].manPower = 0.00;
                this.tableDataList[3].cost = 0.00;
                this.tableDataList[3].outSource = 0.00;
                this.tableDataList[3].procurement = 0.00;
                this.tableDataList[4].manPower = 0.00;
                this.tableDataList[4].cost = 0.00;
                this.tableDataList[4].outSource = 0.00;
                this.tableDataList[4].procurement = 0.00;
                for (i = 1; i < len; i++) {
                    this.tableDataList_2[i - 1].manPower = temp[i][1];
                    this.tableDataList_2[i - 1].cost = temp[i][2];
                    this.tableDataList_2[i - 1].procurement = temp[i][3];
                    this.tableDataList_2[i - 1].outSource = temp[i][4];
                    this.tableDataList_2[i - 1].listSum = parseFloat(this.tableDataList_2[i - 1].manPower) + parseFloat(this.tableDataList_2[i - 1].cost) + parseFloat(this.tableDataList_2[i - 1].procurement) + parseFloat(this.tableDataList_2[i - 1].outSource);
                    if (i - 1 <= this.showindex) {
                        // 已发生总和
                        this.tableDataList[1].manPower += parseFloat(this.tableDataList_2[i - 1].manPower);
                        this.tableDataList[1].cost += parseFloat(this.tableDataList_2[i - 1].cost);
                        this.tableDataList[1].procurement += parseFloat(this.tableDataList_2[i - 1].procurement);
                        this.tableDataList[1].outSource += parseFloat(this.tableDataList_2[i - 1].outSource);
                    } else {
                        // 预计总和
                        this.tableDataList[3].manPower += parseFloat(this.tableDataList_2[i - 1].manPower);
                        this.tableDataList[3].cost += parseFloat(this.tableDataList_2[i - 1].cost);
                        this.tableDataList[3].procurement += parseFloat(this.tableDataList_2[i - 1].procurement);
                        this.tableDataList[3].outSource += parseFloat(this.tableDataList_2[i - 1].outSource);
                    }
                }
                // 成本总和
                this.tableDataList[4].manPower = parseFloat(this.tableDataList[3].manPower) + parseFloat(this.tableDataList[1].manPower);
                this.tableDataList[4].cost = parseFloat(this.tableDataList[3].cost) + parseFloat(this.tableDataList[1].cost);
                this.tableDataList[4].procurement = parseFloat(this.tableDataList[3].procurement) + parseFloat(this.tableDataList[1].procurement);
                this.tableDataList[4].outSource = parseFloat(this.tableDataList[3].outSource) + parseFloat(this.tableDataList[1].outSource);
            },
            /*
                目的是将千分位数据全部转化为浮点数字
            */
            returnNum () {
                for (let i = 0; i < 5; i++) {
                    if (i == 2) continue;
                    this.tableDataList[i].manPower = this.commafyback(this.tableDataList[i].manPower + '');
                    this.tableDataList[i].cost = this.commafyback(this.tableDataList[i].cost + '');
                    this.tableDataList[i].procurement = this.commafyback(this.tableDataList[i].procurement + '');
                    this.tableDataList[i].outSource = this.commafyback(this.tableDataList[i].outSource + '');
                    this.tableDataList[i].costSum = this.commafyback(this.tableDataList[i].costSum + '');
                    console.log(this.tableDataList[i].manPower + '||' + this.tableDataList[i].cost + '||' + this.tableDataList[i].procurement + '||' + this.tableDataList[i].outSource + '||' + this.tableDataList[i].costSum);
                }
                for (let i = 0; i < this.tableDataList_2.length; i++) {
                    this.tableDataList_2[i].manPower = this.commafyback(this.tableDataList_2[i].manPower + '');
                    this.tableDataList_2[i].cost = this.commafyback(this.tableDataList_2[i].cost + '');
                    this.tableDataList_2[i].procurement = this.commafyback(this.tableDataList_2[i].procurement + '');
                    this.tableDataList_2[i].outSource = this.commafyback(this.tableDataList_2[i].outSource + '');
                    this.tableDataList_2[i].listSum = this.commafyback(this.tableDataList_2[i].listSum + '');
                    console.log(this.tableDataList_2[i].manPower + '||' + this.tableDataList_2[i].cost + '||' + this.tableDataList_2[i].procurement + '||' + this.tableDataList_2[i].outSource + '||' + this.tableDataList_2[i].listSum);
                }
            },
            /*
                修改数据后触发 条件为input-@change 失焦时触发
                先将千分位数据转化回数字
                然后更新总和数据
                再重新计算百分比
                最后再修改为千分位
                这个流程有优化空间 但因为我不熟悉前端 util中也没有能直接用的方法
                转为千分位是将util中的returnFloatEx()方法删除了部分 然后增加了一个对于0的判断来达到目的
            */
            changevalue: function (index) {
                console.log('---------changevalue--------');
                this.returnNum();
                this.refreash();
                this.cal_percent();
                this.toFixFloat();
            },
            /*
                处理周期中哪些月份是已发生、未发生
                为showindex赋值为最后一个已发生月
            */
            check_cost (data) {                     
                var len = data.length;
                var i, ans = 0, flag = 0;
                if (this.tableDataList_2 != null) {
                    this.tableDataList_2 = [];
                }
                for (i = 1; i < len; i++) {
                    this.tableDataList_2.push({
                        'cycleTable': data[i][0]
                    });
                }
                /*
                    马总要求改为"已发生"和"未发生"
                */
                for (i = 0; i < len - 1; i++) {
                    if (flag == 0) {
                        this.tableDataList_2[i].reportState = '已发生';
                    } else {
                        this.tableDataList_2[i].reportState = '未发生';
                    }
                    if (this.form.cycle == data[i + 1][0]) {
                        this.showindex = i;
                        flag = 1;
                    }
                }
                if (flag == 0) {
                    this.showindex = len;
                }
                console.log('showindex:' + this.showindex);

                this.assignment(data);
            },
            getProjectCost (restemp) {
                console.log('-------run getProjectCost-------');
                var that = this;
                /*
                    获取预算表和每月详情表中的数据，在后台处理打包整理为一个List，传给前端，方便处理
                */
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getProjectCostList' + window.suffix,
                    data: {
                        'entity': {
                            'pid': this.form.id,
                            'projectNum': this.form.projectNum,
                            'cycle': this.form.cycle
                        },
                        'pageSize': 1000
                    }
                }).then(res => {
                    // 成功回调方法
                    if (res.status == 200) {
                        console.log('-----成功调回方法-----');
                        console.log(res.data);
                        var temp = res.data;
                        /*
                            将从成本预估表中取到的预算总值赋值
                            预算总值为temp[0]中的四个数据（人力、费用、外采、外包）
                        */
                        this.tableDataList[0].manPower = temp[0][0];
                        this.tableDataList[0].cost = temp[0][1];
                        this.tableDataList[0].procurement = temp[0][2];
                        this.tableDataList[0].outSource = temp[0][3];

                        // 每月赋值以及累计发生值
                        this.check_cost(temp);

                        this.cal_table1_sum();

                        this.cal_percent();

                        var count = this.tableDataList_2.length - this.showindex - 1;

                        // 计算自动填充应填入的预算值
                        this.fore_manPower = parseFloat(this.tableDataList[0].manPower) - parseFloat(this.tableDataList[1].manPower);
                        this.fore_cost = parseFloat(this.tableDataList[0].cost) - parseFloat(this.tableDataList[1].cost);
                        this.fore_procurement = parseFloat(this.tableDataList[0].procurement) - parseFloat(this.tableDataList[1].procurement)+parseFloat(this.tableDataList_2[this.showindex].procurement);
                        this.fore_outSource = parseFloat(this.tableDataList[0].outSource) - parseFloat(this.tableDataList[1].outSource);

                        this.fore_manPower = this.fore_manPower > 0 ? this.fore_manPower / count : 0;
                        this.fore_cost = this.fore_cost > 0 ? this.fore_cost / count : 0;
                        this.fore_procurement = this.fore_procurement > 0 ? this.fore_procurement / (count + 1) : 0;
                        this.fore_outSource = this.fore_outSource > 0 ? this.fore_outSource / count : 0;

                        this.toFixFloat();
                    } // if结束
                });
            },
            /*
                计算累计发生百分比和偏差率
                偏差率的计算公式为：
                偏差率=(预算金额-预计总成本)÷预算金额
            */
            cal_percent () {
                // 计算百分比
                var that = this;
                // 人力
                if (that.tableDataList[0].manPower != 0) {
                    that.tableDataList[2].manPower = (that.tableDataList[1].manPower / that.tableDataList[0].manPower * 100).toFixed(2) + '%';
                    that.tableDataList[5].manPower = ((that.tableDataList[0].manPower - that.tableDataList[4].manPower) / that.tableDataList[0].manPower * 100).toFixed(2) + '%';
                    if(that.tableDataList[5].manPower == '-0.00%'){
                        that.tableDataList[5].manPower = '0.00%';
                    }
                } else {
                    that.tableDataList[2].manPower = '0.00%';
                    that.tableDataList[5].manPower = '0.00%';
                }

                // 费用
                if (that.tableDataList[0].cost != 0) {
                    that.tableDataList[2].cost = (that.tableDataList[1].cost / that.tableDataList[0].cost * 100).toFixed(2) + '%';
                    that.tableDataList[5].cost = ((that.tableDataList[0].cost - that.tableDataList[4].cost) / that.tableDataList[0].cost * 100).toFixed(2) + '%';
                    if(that.tableDataList[5].cost == '-0.00%'){
                        that.tableDataList[5].cost = '0.00%';
                    }
                } else {
                    that.tableDataList[2].cost = '0.00%';
                    that.tableDataList[5].cost = '0.00%';
                }

                // 外采
                if (that.tableDataList[0].procurement != 0) {
                    that.tableDataList[2].procurement = (that.tableDataList[1].procurement / that.tableDataList[0].procurement * 100).toFixed(2) + '%';
                    that.tableDataList[5].procurement = ((that.tableDataList[0].procurement - that.tableDataList[4].procurement) / that.tableDataList[0].procurement * 100).toFixed(2) + '%';
                    if(that.tableDataList[5].procurement == '-0.00%'){
                        that.tableDataList[5].procurement = '0.00%';
                    }
                } else {
                    that.tableDataList[2].procurement = '0.00%';
                    that.tableDataList[5].procurement = '0.00%';
                }

                // 外包
                if (that.tableDataList[0].outSource != 0) {
                    that.tableDataList[2].outSource = (that.tableDataList[1].outSource / that.tableDataList[0].outSource * 100).toFixed(2) + '%';
                    that.tableDataList[5].outSource = ((that.tableDataList[0].outSource - that.tableDataList[4].outSource) / that.tableDataList[0].outSource * 100).toFixed(2) + '%';
                    if(that.tableDataList[5].outSource == '-0.00%'){
                        that.tableDataList[5].outSource = '0.00%';
                    }
                } else {
                    that.tableDataList[2].outSource = '0.00%';
                    that.tableDataList[5].outSource = '0.00%';
                }

                // 总和
                if (that.tableDataList[0].costSum != 0) {
                    that.tableDataList[2].costSum = (that.tableDataList[1].costSum / that.tableDataList[0].costSum * 100).toFixed(2) + '%';
                    that.tableDataList[5].costSum = ((that.tableDataList[0].costSum - that.tableDataList[4].costSum) / that.tableDataList[0].costSum * 100).toFixed(2) + '%';
                    if(that.tableDataList[5].costSum == '-0.00%'){
                        that.tableDataList[5].costSum = '0.00%';
                    }
                } else {
                    that.tableDataList[2].costSum = '0.00%';
                    that.tableDataList[5].costSum = '0.00%';
                }
            },
            /*
                计算预算表中的总和数据
            */
            cal_table1_sum () {
                var that = this;
                // 计算总和
                that.tableDataList[0].costSum = parseFloat(that.tableDataList[0].manPower) + parseFloat(that.tableDataList[0].cost) + parseFloat(that.tableDataList[0].procurement) + parseFloat(that.tableDataList[0].outSource);
                that.tableDataList[1].costSum = parseFloat(that.tableDataList[1].manPower) + parseFloat(that.tableDataList[1].cost) + parseFloat(that.tableDataList[1].procurement) + parseFloat(that.tableDataList[1].outSource);

                that.tableDataList[3].costSum = parseFloat(that.tableDataList[3].manPower) + parseFloat(that.tableDataList[3].cost) + parseFloat(that.tableDataList[3].procurement) + parseFloat(that.tableDataList[3].outSource);
                that.tableDataList[4].costSum = parseFloat(that.tableDataList[4].manPower) + parseFloat(that.tableDataList[4].cost) + parseFloat(that.tableDataList[4].procurement) + parseFloat(that.tableDataList[4].outSource);
            },
            /*
                将所有数字转化为千分位并带两位小数，在页面数据变化（input-@change()）的时候会调用
            */
            toFixFloat () {
                var that = this;
                let vm = this.$refs.multipleTable;
                let vm2 = this.$refs.multipleTable_2;
                for (let j = 0; j < 5; j++) {
                    if (j == 2) continue;
                    var title = this.tableDataList[j].costType;
                    let res1 = that.returnFloatEx(that.tableDataList[j].manPower);
                    let res2 = that.returnFloatEx(that.tableDataList[j].cost);
                    let res3 = that.returnFloatEx(that.tableDataList[j].procurement);
                    let res4 = that.returnFloatEx(that.tableDataList[j].outSource);
                    let res5 = that.returnFloatEx(that.tableDataList[j].costSum);
                    console.log(res1 + '||' + res2 + '||' + res3 + '||' + res4);
                    vm.$set(this.tableDataList, j, {costType: title, manPower: res1, cost: res2, procurement: res3, outSource: res4, costSum: res5});
                }
                for (let j = 0; j < that.tableDataList_2.length; j++) {
                    var cycle = this.tableDataList_2[j].cycleTable;
                    var status = this.tableDataList_2[j].reportState;
                    let res1 = that.returnFloatEx(that.tableDataList_2[j].manPower);
                    let res2 = that.returnFloatEx(that.tableDataList_2[j].cost);
                    let res3 = that.returnFloatEx(that.tableDataList_2[j].procurement);
                    let res4 = that.returnFloatEx(that.tableDataList_2[j].outSource); ;
                    let res5 = that.returnFloatEx(that.tableDataList_2[j].listSum);
                    console.log(res1 + '||' + res2 + '||' + res3 + '||' + res4 + '||' + res5);
                    vm2.$set(this.tableDataList_2, j, {cycleTable: cycle, manPower: res1, cost: res2, procurement: res3, outSource: res4, listSum: res5, reportState: status});
                }
            },
            /*
                util中的方法不能满足需求，修改一部分代码、增加对于0的判断
            */
            returnFloatEx (value) {
                const pattern = /(?=((?!\b)\d{3})+$)/g; /* 小数位前加千分符 */
                if (value != '0' && value != '0.00') {
                    var value = (parseFloat(value).toFixed(2));
                    var xsd = value.toString().split('.');
                    /* alert(xsd); */
                    if (xsd.length == 1) { /* 没有小数的情况 */
                        value = value.toString().replace(pattern, ',') + '.00';
                        return value;
                    }
                    if (xsd.length > 1) {
                        if (xsd[1].length < 2) { /* 有一位小数的情况 */
                            value = xsd[0].toString().replace(pattern, ',') + '.' + xsd[1] + '0';
                        } else if (xsd[1].length >= 2) { /* 有两位小数的情况 */
                            value = xsd[0].toString().replace(pattern, ',') + '.' + xsd[1];
                        }
                        return value;
                    }
                } else {
                    return '0.00';
                }
            },
            // 去掉千分位分隔符
            commafyback (num) {
                num += '';
                var x = num.split(',');
                var sum = '';
                for (var i = 0; i < x.length; i++) { sum += x[i]; }
                return sum;
            },
            /*
                点击"取消"按钮返回到列表页
                之前是返回到前一个页面
            */
            close: function () {
                this.$router.push({
                name: 'projectReport',
                });
                //this.$router.back(-1);
            },
            /*
                整理数据提交给后端保存
                将每月详情的每一行处理为一个数字，pid为此周期的父周期id
                子周期只需存储projectNum，cycle，pid作为关联数据、manPower、cost、procurement、outSourse为所需数据
            */
            saveProjectReport: function () {
                var that = this;
                var i, flag = 0;
                /*
                    通过vue的rules验证以及正则表达式循环验证每一个数据是否为非负数
                */
                var reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
                this.$refs['ruleFormOne'].validate((valid) => {
                    for (i = this.showindex; i < this.tableDataList_2.length; i++) {
                        if (!reg.test(this.commafyback(this.tableDataList_2[i].manPower)) && this.tableDataList_2[i].manPower != '0.00') {
                            flag = 1;
                            this.$notify({
                                title: '错误',
                                message: '周期' + this.tableDataList_2[i].cycleTable + '的人力成本必须为非负数字',
                                type: 'warning'
                            });
                            break;
                        } else if (!reg.test(this.commafyback(this.tableDataList_2[i].cost)) && this.tableDataList_2[i].cost != '0.00') {
                            flag = 1;
                            this.$notify({
                                title: '错误',
                                message: '周期' + this.tableDataList_2[i].cycleTable + '的费用成本必须为非负数字',
                                type: 'warning'
                            });
                            break;
                        } else if (!reg.test(this.commafyback(this.tableDataList_2[i].procurement)) && this.tableDataList_2[i].procurement != '0.00') {
                            flag = 1;
                            this.$notify({
                                title: '错误',
                                message: '周期' + this.tableDataList_2[i].cycleTable + '的外采成本必须为非负数字',
                                type: 'warning'
                            });
                            break;
                        } else if (!reg.test(this.commafyback(this.tableDataList_2[i].outSource)) && this.tableDataList_2[i].outSource != '0.00') {
                            flag = 1;
                            this.$notify({
                                title: '错误',
                                message: '周期' + this.tableDataList_2[i].cycleTable + '的外包成本必须为非负数字',
                                type: 'warning'
                            });
                            break;
                        }
                    }
                    /*
                        验证成功，开始打包每月数据
                    */
                    if (valid && flag == 0) {
                        console.log('valid');
                        console.log(valid);
                        var len = this.tableDataList_2.length;
                        var entityList = new Array();
                        for (var i = this.showindex; i < len; i++) {
                            let temp = {};
                            if (i == this.showindex) {          //添加父周期
                                var node = {};
                                node.id = that.form.id;
                                node.projectStartTime = that.startTime;
                                node.projectEndTime = that.endTime;
                                node.workSituation = that.form.workSituation;
                                node.problemAndRisk = that.form.problemAndRisk;
                                node.workPlan = that.form.workPlan;
                                node.reportState = 0;
                                node.status = '2';
                                node.cycle = that.tableDataList_2[i].cycleTable;
                                node.pid = '-1';
                                node.pmId = that.form.pmId;
                                node.projectCompletionSchedule = that.form.projectCompletionSchedule;
                                node.projectNum = that.form.projectNum;
                                node.projectState = that.form.projectState;
                                node.projectName = that.form.projectName;
                                node.pmName = that.form.pmName;
                                entityList.push(node);
                            }
                            //添加子周期
                            temp.cycle = that.tableDataList_2[i].cycleTable;
                            temp.pid = that.form.id;
                            temp.projectNum = that.form.projectNum;

                            if (that.tableDataList_2[i]) {
                                temp.manPower = that.commafyback(that.tableDataList_2[i].manPower + '');
                                temp.cost = that.commafyback(that.tableDataList_2[i].cost + '');
                                temp.procurement = that.commafyback(that.tableDataList_2[i].procurement + '');
                                temp.outSource = that.commafyback(that.tableDataList_2[i].outSource + '');
                            }

                            entityList.push(temp);
                        }
                        console.log(entityList);
                        this.$myHttp({
                            method: 'POST',
                            url: this.prefix + 'project/saveProjectReport' + window.suffix,
                            data: {
                                'entity': entityList,
                                'pageSize': 10,
                                'orderBy': ''
                            }
                        }).then(res => {
                            console.log('success saveProjectReport! res:');
                            console.log(res.data.ext);// todo
                            // 成功回调方法
                            this.$router.push({
                                name: 'projectReport'
                            });
                        });
                    }
                });
            },
            /*
                之前需求有新增月报按钮时的方法，现已废除
            */
            showProjectTable () {
                this.dialogVisible = true;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getProjectList' + window.suffix,
                    data: {
                        'entity': {}
                    }
                }).then(res => {
                    // 成功回调方法
                    console.log(res.data.rows);
                    this.ProjectInfo = res.data.rows;
                });
            },
            /*
                将Date型时间处理为年-月-日形式
            */
            check_time (str) {
                var arr = str.split(' ');
                return arr[0];
            },
            /*
                通过开始时间和结束时间获取周期表的方法
                2018-12-14 现已废除，直接在后台整理周期表
            */
            // cycle_options(str1,str2){
            //     var list = new Array();;
            //     var arr1=str1.split("-");
            //     var arr2=str2.split("-");
            //     var year1=parseInt(arr1[0]);
            //     var month1=parseInt(arr1[1]);
            //     var year2=parseInt(arr2[0]);
            //     var month2=parseInt(arr2[1]);
            //     var temp;
            //     while(year1<year2){
            //         if(month1<10){
            //             temp=year1+"-0"+month1;
            //         }else{
            //             temp=year1+"-"+month1;
            //         }
            //         list.push(temp);
            //         month1++;
            //         if(month1==13){
            //             month1=1;
            //             year1++;
            //         }
            //     }
            //     while(year1==year2&&month1<=month2){
            //         if(month1<10){
            //             temp=year1+"-0"+month1;
            //         }else{
            //             temp=year1+"-"+month1;
            //         }
            //         list.push(temp);
            //         month1++;
            //     }
            //     return list;
            // },
            // chooseProject(){
            //     if(!this.ischooseProject){
            //         this.ischooseProject=true;
            //     }
            // },
            // ConfirmProject(){
            //     this.ischooseProject=false;
            // },
            /**
             * 提交之前校验业务表单
             2018-12-14 流程相关，现已废除
             */
            checkBeforeProcess () {
                if (true) {
                    // this.saveCostForecastDetail(this.approval.taskType ? '3' : '2',"approval");
                    // this.saveProjectReport();
                    this.$refs.oppoCostForecast.submit();
                } else {
                    this.$message({
                        message: '数据校验失败',
                        type: 'warning'
                    });
                }
            },
            /**
             * 流程审批之后业务数据更改
             2018-14-14 流程相关 现在已废除
             */
            processCallback (piid, optionType, taskType) {
                let status = '3';
                if (optionType == 'endProcess') {
                    status = '1';
                } else if (optionType == 'repelProcess') {
                    status = '2';
                }
                console.log('rpid ---->', this.rpid);
                this.$myHttp({
                    method: 'POST', // todo 改下面的url
                    url: this.prefix + 'project/getReportList' + window.suffix,
                    data: {
                        entity: {
                            'id': this.rpid
                        }
                    }
                }).then(res => {
                    let data = res.data.rows[0];
                    var entityList = new Array();
                    entityList.push(data);
                    console.log('status ---->', status);
                    data.status = status;// 设置审批状态
                    data.processInstanceId = piid;// 设置流程实例id
                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + '/project/saveProjectReport' + window.suffix,
                        data: {
                            'entity': entityList
                        }
                    }).then(res => {
                        this.$router.back(-1);
                    });
                });
            }
        },
        /*
                2018-12-14 工作流相关 现已废除
        */
        created () {
            /**
             * 工作流相关
             */
            if (this.$route.params.row != undefined && this.$route.params.row.activityId != undefined) {
                this.approval.taskInstanceId = this.$route.params.row.id;
                this.approval.businessKey = this.$route.params.row.businessKey;
                this.approval.taskType = this.$route.params.row.taskType;
                this.costForecastNum = this.approval.businessKey;
            }
            this.approval.businessKey = this.costForecastNum; // 业务标识
            // this.approval.processKey = "num_one"; //流程key启动
            this.approval.woCode = 'projectReport'; // 工单启动
            this.approval.processInstanceName = '项目月报【' + this.costForecastNum + '】';
        }

    };
</script>

<style>
    .el-input__inner{
        text-align: right;
    }
    .el-dialog__body{
        padding: 0 0 0 0
    }
</style>
