<template>

	<div>
		<el-col :span="24" style="background-color: white" >
			<el-col :span="24" style="background-color: white" >
				<h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 25px">
                    查看月报
                </h2>
				<el-form ref="form" :model="form"   style="align:right;margin-bottom: 20px;margin-left: 10px;">
					<el-col :span="8" :xs="20" >
                       <!--  <font color="red" style="position:relative;top:30px;left:45px;">*</font> -->
						<el-form-item label="项目名称" label-width="100px" :title="form.projectName">
							<el-input v-model="form.projectName" placeholder="自动带出" :disabled="true" style="width: 95%"></el-input>
						</el-form-item>

					</el-col>
					<el-col :span="8" :xs="20">
                       <!--  <font color="red" style="position:relative;top:30px;left:45px;">*</font> -->
						<el-form-item label="项目开始" label-width="100px">
							<el-input v-model="form.projectStartTime" placeholder="自动带出" style="width: 95%" :disabled="true" ></el-input>
						</el-form-item>

					</el-col>

					<el-col :span="8" :xs="20">
                        <!-- <font color="red" style="position:relative;top:30px;left:45px;">*</font> -->
						<el-form-item label="项目结束" label-width="100px">
							<el-input v-model="form.projectEndTime" placeholder="自动带出" style="width: 95%"  :disabled="true"></el-input>
						</el-form-item>

					</el-col>

				</el-form>

				<el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px;margin-left: 10px">
					<el-col :span="8" :xs="20">
                        <!-- <font color="red" style="position:relative;top:30px;left:45px;">*</font> -->
						<el-form-item label="项目编号" label-width="100px">
							<el-input v-model="form.projectNum" placeholder="自动带出" style="width: 95%"  :disabled="true" ></el-input>
						</el-form-item>

					</el-col>


					<el-col :span="8" :xs="20">
                        <!-- <font color="red" style="position:relative;top:30px;left:45px;">*</font> -->
						<el-form-item label="项目经理" label-width="100px">
							<el-input v-model="form.pmName" placeholder="自动带出" style="width: 95%"  :disabled="true" ></el-input>
						</el-form-item>

					</el-col>

					<el-col :span="8" :xs="20">
                        <!-- <font color="red" style="position:relative;top:30px;left:45px;">*</font> -->
						<el-form-item label="周期" label-width="100px">
							<el-input v-model="form.cycle" placeholder="自动带出" style="width: 95%"  :disabled="true" ></el-input>
						</el-form-item>

					</el-col>

					<el-col :span="8" :xs="20">
                        <!-- <font color="red" style="position:relative;top:30px;left:15px;">*</font> -->
						<el-form-item label="项目运行状态" label-width="100px">
							<el-input v-model="form.projectState" placeholder="自动带出" :disabled="true" style="width: 40%"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="8" :xs="20">
                        <!-- <font color="red" style="position:relative;top:30px;left:25px;">*</font> -->
						<el-form-item label="项目完成度" label-width="100px">
							<el-input  v-model="form.projectCompletionSchedule" placeholder="自动带出" :disabled="true" style="width: 50%;" >
								<template slot="append">%</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-form>
				<el-col>
					<el-tabs v-model="activeName" type="card" style="margin-bottom: 100px">
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


							<h3 style="margin-top: 30px;margin-left: 10px;margin-bottom: 10px">
								每月详情
							</h3>
							<el-table  border stripe
									   ref="multipleTable"
									   :data="tableDataList_2"
									   tooltip-effect="dark"
									   style="width: 100%;border-collapse: collapse"
									   size="small">
								<el-table-column
										prop="cycleTable"
										label="周期"
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
										prop="listSum"
										label="总和"
										align="right"
										width="150">
								</el-table-column>
								<el-table-column
										prop="reportState"
										label="状态"
										align="center"
										width="80">
								</el-table-column>
							</el-table>
						</el-tab-pane>
                         <el-tab-pane label="本月完成工作情况及下月工作计划" name="second" style="width:100%">
                            <el-form ref="form" :model="form" label-width="180"  style="width:100%;margin-top:10px;margin-bottom: 20px;">
                                <el-col :span="8" :xs="20" style="width:100%;">
                                   <el-form-item label="1.本月完成工作情况">
                                    <hr style="margin-top:30px;">
                                    <el-input v-model="form.workSituation" :disabled="true" style="width:1000px;margin-top:20px;margin-left:-120px;" type="textarea" :rows="10" maxlength="500">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="2.存在问题及风险">
                                    <hr style="margin-top:30px;">
                                    <el-input v-model="form.problemAndRisk" :disabled="true" style="width:1000px;margin-top:20px;margin-left:-110px;" type="textarea" :rows="10" maxlength="500" ></el-input>
                                </el-form-item>

                                <el-form-item label="3.下月工作计划">
                                    <hr style="margin-top:30px;">
                                    <el-input v-model="form.workPlan" :disabled="true" style="width:1000px;margin-top:20px;margin-left:-100px;" type="textarea" :rows="10" maxlength="500"></el-input>
                                </el-form-item>
                                </el-col>
                            </el-form>
                        </el-tab-pane>
						<!-- <el-tab-pane label="本月完成工作情况及下月工作计划" name="second">
							<el-form ref="form" :model="form" label-width="180px" width="1200px" style="margin-top:40px;margin-bottom: 20px;">
								<el-col :span="8" :xs="20">
									<el-form-item label="1.本月完成工作情况">
										<el-input v-model="form.workSituation" style="width: 1100px;margin-top:40px;margin-left:-120px;" :disabled="true" type="textarea" :rows="10" maxlength="500"></el-input>
									</el-form-item>
									<el-form-item label="2.存在问题及风险">
										<el-input v-model="form.problemAndRisk" style="width:  1100px;margin-top:40px;margin-left:-120px;" :disabled="true" type="textarea" :rows="10" maxlength="500"></el-input>
									</el-form-item>
									<el-form-item label="3.下月工作计划">
										<el-input v-model="form.workPlan" style="width: 1100px;margin-top:40px;margin-left:-120px;" :disabled="true" type="textarea" :rows="10" maxlength="500"></el-input>
									</el-form-item>
								</el-col>
							</el-form>
						</el-tab-pane> -->
					</el-tabs>
				</el-col>
			</el-col>

			<el-col :span="24"  style="background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100">

				<div  align="center" style="margin-left: -200px">

					<el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">取消</el-button>
				</div>
			</el-col>
		</el-col>
	</div>

</template>

<style>
	.columnTitle{
		font-size: 16px;
	}
    el-label{
        text-align: right;
    }
</style>

<script>
    import myApprovalBtn from '@/components/myApprovalBtn';
    import util from '../../libs/util';
    export default{
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
                    show: true
                },
                form: {
                    'approvalState': '',
                    'cycle': '',
                    'id': '',
                    'projectCompletionSchedule': '',
                    'projectNum': '',
                    'projectState': '',
                    'reserve1': '',
                    'reserve2': '',
                    projectName: '',
                    projehctStartTime: '',
                    projectEndTime: '',
                    pmName: '',
                    workSituation: '',
                    problemAndRisk: '',
                    workPlan: '',
                    manPower: '',
                    cost: '',
                    procurement: '',
                    outSource: '',
                    reportState: ''
                },
                showindex: '',
                showTable: [],
                options: [],
                activeName: 'first',
                ProjectInfo: [],
                selectProjectName: [],
                tableDataList: [
                    {costType: '预算金额', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '累计发生', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '完成百分比', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '预计发生', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '预计总成本', manPower: '', cost: '', procurement: '', outSource: ''},
                    {costType: '偏差率', manPower: '', cost: '', procurement: '', outSource: ''}
                ],
                tableDataList_2: []
            };
        },
        methods: {
            judgezero (value) {
                if (value == 0) {
                    value = '0.00';
                }
                return value;
            },
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

                // 为每月详情赋值以及为累计总和 预计总和累加
                for (i = 1; i < len; i++) {
                    this.tableDataList_2[i - 1].manPower = temp[i][1];
                    this.tableDataList_2[i - 1].cost = temp[i][2];
                    this.tableDataList_2[i - 1].procurement = temp[i][3];
                    this.tableDataList_2[i - 1].outSource = temp[i][4];
                    this.tableDataList_2[i - 1].listSum = parseFloat(this.tableDataList_2[i - 1].manPower) + parseFloat(this.tableDataList_2[i - 1].cost) + parseFloat(this.tableDataList_2[i - 1].procurement) + parseFloat(this.tableDataList_2[i - 1].outSource);
                    if (i - 1 <= this.showindex) {
                        this.tableDataList[1].manPower += parseFloat(this.tableDataList_2[i - 1].manPower);
                        this.tableDataList[1].cost += parseFloat(this.tableDataList_2[i - 1].cost);
                        this.tableDataList[1].procurement += parseFloat(this.tableDataList_2[i - 1].procurement);
                        this.tableDataList[1].outSource += parseFloat(this.tableDataList_2[i - 1].outSource);
                    } else {
                        this.tableDataList[3].manPower += parseFloat(this.tableDataList_2[i - 1].manPower);
                        this.tableDataList[3].cost += parseFloat(this.tableDataList_2[i - 1].cost);
                        this.tableDataList[3].procurement += parseFloat(this.tableDataList_2[i - 1].procurement);
                        this.tableDataList[3].outSource += parseFloat(this.tableDataList_2[i - 1].outSource);
                    }
                    // 判0
                    this.judgezero(this.tableDataList_2[i - 1].manPower);
                    this.judgezero(this.tableDataList_2[i - 1].cost);
                    this.judgezero(this.tableDataList_2[i - 1].procurement);
                    this.judgezero(this.tableDataList_2[i - 1].outSource);
                }

                // 判0
                this.judgezero(this.tableDataList[1].manPower);
                this.judgezero(this.tableDataList[1].cost);
                this.judgezero(this.tableDataList[1].procurement);
                this.judgezero(this.tableDataList[1].outSource);

                this.judgezero(this.tableDataList[3].manPower);
                this.judgezero(this.tableDataList[3].cost);
                this.judgezero(this.tableDataList[3].procurement);
                this.judgezero(this.tableDataList[3].outSource);
    
                // 成本总和
                this.tableDataList[4].manPower = parseFloat(this.tableDataList[3].manPower) + parseFloat(this.tableDataList[1].manPower);
                this.tableDataList[4].cost = parseFloat(this.tableDataList[3].cost) + parseFloat(this.tableDataList[1].cost);
                this.tableDataList[4].procurement = parseFloat(this.tableDataList[3].procurement) + parseFloat(this.tableDataList[1].procurement);
                this.tableDataList[4].outSource = parseFloat(this.tableDataList[3].outSource) + parseFloat(this.tableDataList[1].outSource);

                this.judgezero(this.tableDataList[4].manPower);
                this.judgezero(this.tableDataList[4].cost);
                this.judgezero(this.tableDataList[4].procurement);
                this.judgezero(this.tableDataList[4].outSource);

                // 计算table2总和
                this.tableDataList[0].allSum = 0;
                for (i = 0; i < len - 1; i++) {
                    this.showTable[i] = i <= this.showindex;// 设置输入框
                    this.tableDataList_2[i].listSum = parseFloat(this.tableDataList_2[i].manPower) + parseFloat(this.tableDataList_2[i].cost) + parseFloat(this.tableDataList_2[i].outSource) + parseFloat(this.tableDataList_2[i].procurement);
                    this.tableDataList[0].allSum += this.tableDataList_2[i].listSum;
                    this.tableDataList_2[i].listSum = this.tableDataList_2[i].listSum == 0 ? '0.00' : this.tableDataList_2[i].listSum;
                }
            },
            initProjectData () {
                var prid;
                if (this.$route.params.row) {
                    prid = this.$route.params.row.businessKey;
                } else {
                    prid = this.$route.query.id;
                }
                var that = this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getReportList' + window.suffix,
                    data: {
                        'entity': {id: prid}
                    }
                }).then(res => {
                    // 成功回调方法
                    var that = this;
                    var temp = res.data.rows[0];
                    // debugger
                    this.approval.businessKey = temp.id; // 业务标识
                    // //this.approval.processKey = "num_one"; //流程key启动
                    this.approval.processInstanceName = '项目月报【' + temp.id + '】';
                    // 项目开始时间
                    this.form.projectStartTime = this.check_time(temp.projectStartTime + '');
                    // 项目结束时间
                    this.form.projectEndTime = this.check_time(temp.projectEndTime + '');

                    that.form.id = temp.id;
                    that.form.projectName = temp.projectName;
                    that.form.cycle = temp.cycle;
                    that.form.pmName = temp.pmName;
                    that.form.projectState = temp.projectState;
                    that.form.projectNum = temp.projectNum;
                    that.form.projectCompletionSchedule = temp.projectCompletionSchedule;
                    that.form.workPlan = temp.workPlan;
                    that.form.problemAndRisk = temp.problemAndRisk;
                    that.form.workSituation = temp.workSituation;

                    that.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'project/getProjectCostList' + window.suffix,
                        data: {
                            'entity': {
                                'projectNum': this.form.projectNum,
                                'pid': this.form.id,
                                'cycle': this.form.cycle
                            },
                            'pageSize': 1000
                        }
                    }).then(res => {
                        // 成功回调方法
                        var that = this;
                        if (res.status == 200) {
                            console.log(res.data);
                            var temp = res.data;

                            // 预算总额赋值
                            that.tableDataList[0].manPower = temp[0][0];
                            that.tableDataList[0].cost = temp[0][1];
                            that.tableDataList[0].procurement = temp[0][2];
                            that.tableDataList[0].outSource = temp[0][3];

                            // 每月赋值以及累计发生值

                            var len = temp.length;
                            var i, ans = 0, flag = 0;

                            if (that.tableDataList_2 != null) {
                                that.tableDataList_2 = [];
                            }
                            for (i = 1; i < len; i++) {
                                that.tableDataList_2.push({
                                    'cycleTable': temp[i][0]
                                });
                            }

                            ans = 0;
                            flag = 0;
                            // 判断月报状态
                            for (i = 0; i < len - 1; i++) {
                                if (flag == 0) {
                                    this.tableDataList_2[i].reportState = '已发生';
                                } else {
                                    this.tableDataList_2[i].reportState = '未发生';
                                }
                                if (this.form.cycle == temp[i + 1][0]) {
                                    this.showindex = i;
                                    flag = 1;
                                }
                            }
                            if (flag == 0) {
                                this.showindex = len;
                            }
                            console.log('index:' + that.showindex);

                            this.assignment(temp);

                            // 计算百分比
                            // 人力
                            if (that.tableDataList[0].manPower != 0) {
                                that.tableDataList[2].manPower = (that.tableDataList[1].manPower / that.tableDataList[0].manPower * 100).toFixed(2) + '%';
                                that.tableDataList[5].manPower = ((that.tableDataList[0].manPower - that.tableDataList[4].manPower) / that.tableDataList[0].manPower * 100).toFixed(2) + '%';
                                if(that.tableDataList[5].procurement == '-0.00%'){
                                    that.tableDataList[5].procurement = '0.00%';
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

                            // 计算总和
                            that.tableDataList[0].costSum = parseFloat(that.tableDataList[0].manPower) + parseFloat(that.tableDataList[0].cost) + parseFloat(that.tableDataList[0].procurement) + parseFloat(that.tableDataList[0].outSource);
                            that.tableDataList[0].costSum = that.tableDataList[0].costSum == 0 ? '0.00' : that.tableDataList[0].costSum;

                            that.tableDataList[1].costSum = parseFloat(that.tableDataList[1].manPower) + parseFloat(that.tableDataList[1].cost) + parseFloat(that.tableDataList[1].procurement) + parseFloat(that.tableDataList[1].outSource);
                            that.tableDataList[1].costSum = that.tableDataList[1].costSum == 0 ? '0.00' : that.tableDataList[1].costSum;
    
                            that.tableDataList[3].costSum = parseFloat(that.tableDataList[3].manPower) + parseFloat(that.tableDataList[3].cost) + parseFloat(that.tableDataList[3].procurement) + parseFloat(that.tableDataList[3].outSource);
                            that.tableDataList[3].costSum = that.tableDataList[3].costSum == 0 ? '0.00' : that.tableDataList[3].costSum;

                            that.tableDataList[4].costSum = parseFloat(that.tableDataList[4].manPower) + parseFloat(that.tableDataList[4].cost) + parseFloat(that.tableDataList[4].procurement) + parseFloat(that.tableDataList[4].outSource);
                            that.tableDataList[4].costSum = that.tableDataList[4].costSum == 0 ? '0.00' : that.tableDataList[4].costSum;

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

                            for (let j = 0; j < 5; j++) {
                                if (j == 2) { continue; }
                                that.tableDataList[j].manPower = that.returnFloatEx(that.tableDataList[j].manPower);

                                that.tableDataList[j].cost = that.returnFloatEx(that.tableDataList[j].cost);

                                that.tableDataList[j].procurement = that.returnFloatEx(that.tableDataList[j].procurement);

                                that.tableDataList[j].outSource = that.returnFloatEx(that.tableDataList[j].outSource);

                                that.tableDataList[j].costSum = that.returnFloatEx(that.tableDataList[j].costSum);
                            }
                            for (let j = 0; j < that.tableDataList_2.length; j++) {
                                that.tableDataList_2[j].manPower = that.returnFloatEx(that.tableDataList_2[j].manPower);

                                that.tableDataList_2[j].cost = that.returnFloatEx(that.tableDataList_2[j].cost);

                                that.tableDataList_2[j].procurement = that.returnFloatEx(that.tableDataList_2[j].procurement);

                                that.tableDataList_2[j].outSource = that.returnFloatEx(that.tableDataList_2[j].outSource); ;

                                that.tableDataList_2[j].listSum = that.returnFloatEx(that.tableDataList_2[j].listSum);
                            }
                        }
                    });
                });
            },
            returnFloatEx (value) {
                const pattern = /(?=((?!\b)\d{3})+$)/g; /* 小数位前加千分符 */
                if (value) {
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
            check_time (str) {
                var arr = str.split(' ');
                return arr[0];
            },
            check_money: function (str) {
                var arr = Array();
                str += '';
                arr = str.split('.');
                return arr[0] + '%';
            },
            close: function () {
            	this.$router.push({
                name: 'projectReport',
                });
                //this.$router.back(-1);
            }

        },

        created () {
            this.initProjectData();
        }
    };
</script>
