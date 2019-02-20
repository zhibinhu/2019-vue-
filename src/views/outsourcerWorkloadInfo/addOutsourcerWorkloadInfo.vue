<template>
    <div>
        <el-col :span="24" style="background-color: white">
            <el-form ref="form" :rules="rules" :model="form" label-width="90px" style="margin-top: 20px;margin-bottom: 20px;padding-left:10px;">
                <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 20px 0;padding-left: 10px;font-size: 15px;">基本信息</div>
                <el-row>
                    <el-col :span="8" :xs="20" >
                        <!--<el-form-item label="所属供应商" prop="supplierId" label-width="100px">-->
                            <!--<el-select v-model="form.supplierId" @change="autoSupplier" clearable placeholder="请选择" clearable filterable size="small"-->
                                       <!--style="width: 95%">-->
                                <!--<el-option-->
                                        <!--v-for="item in supplierData"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.value">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    </el-col>


                    <el-col :span="8" :xs="50">
                        <el-form-item label="项目名称" prop="projectId">

                            <el-select v-model="form.projectId" @change="autoProject()" clearable placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in projectData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>

                        </el-form-item>

                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="项目经理" prop="reserve2">
                            {{form.reserve3}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="核算月份" prop="accounteMonth">
                            <el-date-picker size="small"   style="width: 90%"
                                            v-model="form.accounteMonth"
                                            type="month"
                                            placeholder="选择月" value-format="yyyy-MM">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 20px 0;padding-left: 10px;font-size: 15px;">人员工作量信息</div>
                <el-col :span="24" style="margin-bottom: 100px;padding-right: 15px">



                    <el-table
                            :header-cell-class-name="must"
                            :data="form.outsourcerWorkloadInfoItemList"  v-show="showRelationTable"
                            ref="operationTable"
                            border
                            show-summary
                            :summary-method="getSummaries"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="60"
                        >
                        </el-table-column>

                        <el-table-column label="所属供应商" prop="supplierId"  width="200">
                            <template slot-scope="scope">
                            <el-select v-model="scope.row.supplierId" @change="autoSupplier(scope)" clearable placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in supplierData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="outsourcerId"
                                label="姓名"
                                width="150">

                            <template slot-scope="scope">

                                <el-select size="mini" placeholder="请选择"  v-model="scope.row.outsourcerId"  @input="getCostTypeData(scope)">
                                    <el-option
                                            v-for="item in scope.row.supplierOutData"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>


                            </template>
                        </el-table-column>

                        <el-table-column
                                align="right"
                                prop="numberOfPeopleDay"
                                width="150"
                                label="结算人天">
                            <template slot-scope="scope">
                                <el-input-number size="mini" :precision="1" v-model="scope.row.numberOfPeopleDay" controls-position="right" @input="getCost(scope)" :min="0.5"  ></el-input-number>

                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="enterProjectTime"
                                label="进入项目时间"
                                width="150">
                            <template slot-scope="scope">

                                <el-date-picker size="small"   style="width: 100%"
                                                v-model="scope.row.enterProjectTime"
                                                type="date"
                                                placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>

                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="exitProjectTime"
                                label="离开项目时间"
                                width="150">
                            <template slot-scope="scope">
                                <el-date-picker size="small"   style="width: 100%"
                                                v-model="scope.row.exitProjectTime"
                                                type="date"
                                                :picker-options= endTime(scope.row.exitProjectTime,scope.row.enterProjectTime)
                                                placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="outConnect"
                                label="联系电话"
                                width="150">
                            <template slot-scope="scope">
                                {{scope.row.outConnect}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                align="right"
                                prop="employSalary"
                                label="单价(元/天)"
                                width="100">
                            <template slot-scope="scope">
                                <!--{{(scope.row.employSalary/1000)|formatFilNew}}-->
                                {{(scope.row.employSalary)|formatFilNew}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="right"
                                prop="cost"
                                label="人工成本（元）"
                                width="150">
                            <template slot-scope="scope">
                                <!--{{((scope.row.employSalary*scope.row.numberOfPeopleDay)/1000)|formatFilNew}}-->
                                {{((scope.row.employSalary*scope.row.numberOfPeopleDay))|getCostData(scope.row)|formatFilNew}}
                            </template>
                        </el-table-column>


                        <el-table-column
                                prop="post"
                                label="岗位"
                                width="150">
                            <template slot-scope="scope">
                                {{scope.row.post}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="rank"
                                label="职级"
                                width="150">
                            <template slot-scope="scope">
                                {{scope.row.rank}}
                            </template>
                        </el-table-column>


                        <el-table-column
                                prop="remarks"
                                label="备注"
                                width="150">
                            <template slot-scope="scope">
                                <el-input size="mini"  placeholder="请输入内容" v-model="scope.row.remarks" ></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                width="100"
                                :align="center"
                                :render-header="renderHeader"
                        >
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="danger"
                                        circle
                                        title="删除"
                                        @click="deleteRow(scope.$index, form.outsourcerWorkloadInfoItemList)"><i class="el-icon-delete"
                                                                                       style="font-size: 11px"></i>
                                </el-button>
                            </template>
                        </el-table-column>

                    </el-table>



                </el-col>
            </el-form>
        </el-col>

        <el-col :span="24" :offset="10">
            <el-button @click="saveProjectsInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px">保存
            </el-button>
            <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">返回</el-button>
        </el-col>
    </div>
</template>

<script>
    import util from '../../libs/util';
    import Cookies from 'js-cookie';
    export default {
        components: {
            //operationTable
        },
        data() {
            return {
                originalSupplierId:'',
                currentPage:'',
                labelPosition:'right',
                supplierData:[],
                projectData:[],
                projectManager:'',
                businessType:[],
                // 以下为ralationOptionTable的东西
                util:util,
                isShow:true,
                center:'center',
                tableData:[],
                role:'',
                title:'',
                date:'',
                cost:'',
                remarks:'',
                costNameSelectData:[],
                testData:[
                ],
                showRelationTable:true,
                showRelationOpen1:true,
                showRelationClose1:false,

                // 以上为ralationOptionTable的东西
                label:'',
                form: {
                    projectId:'',
                    //projectName:'',
                    accounteMonth:'',
                    projectManagerId:'',
                    reserve1:'',
                    reserve2:'',
                    reserve3:'',
                    //supplierId:'',
                    totalNumberOfPeopleDay:'',
                    totalLaborCost:0,
                    outsourcerWorkloadInfoItemList:[],
                    supplierOutData:[]
                    //todo 加一个字段，保存每个选项的内容
                },
                flag:false,
                rules: {
                    // supplierId: [
                    //     {required: true, message: '请选择所属供应商', trigger: 'blur'}
                    // ],
                    projectId: [
                        {required: true, message: '请选择项目名称', trigger: 'blur'}
                    ],
                    accounteMonth: [
                        {required: true, message: '请选择核算月份', trigger: 'blur'}
                    ]

                }
            };
        },
        methods: {
            /*search() {
                let searchData = {};

                if (this.form.reserve2) {
                    searchData.reserve2 = this.form.reserve2
                }
                if (this.form.supplierId) {
                    searchData.supplierId = this.form.supplierId;
                }

                this.$store.state.oppoListSearchData = searchData;
                this.myTableData.entity=searchData;
                this.$refs.tableProduct.findAllProject(1);
            },*/

            /**
             * 校验结束时间选项
             */
            endTime (exit, enter) {
                return {
                    disabledDate (time) {
                        if (enter) {
                            return new Date(enter).getTime() > time.getTime();
                        }
                    }
                };
            },
            must(obj) {
                //console.log('columnIndex----',obj.columnIndex);
                if(obj.columnIndex == 1 || obj.columnIndex == 2 || obj.columnIndex == 3) {
                    return 'must';
                }
            },
            /**
             * 校验员工单价
             */
            checkSalary: function () {
                var reg = /^[1-9]{1}\d*(\.\d{1,9})?$/;
                var salary = this.form.employSalary;
                if (!reg.test(salary)) {
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
             *保存
             */
            saveProjectsInfo: function () {
                var _this = this;
                _this.form.outsourcerWorkloadInfoItemList = _this.form.outsourcerWorkloadInfoItemList;
                for (var item in _this.form.outsourcerWorkloadInfoItemList) {
                    _this.form.outsourcerWorkloadInfoItemList[item].supplierOutData=JSON.stringify(_this.form.outsourcerWorkloadInfoItemList[item].supplierOutData)
                }
                _this.form.supplierOutData = JSON.stringify(_this.form.supplierOutData);
                //console.log("数据", _this.form);
                //console.log("form.outsourcerWorkloadInfoItemList", _this.form.outsourcerWorkloadInfoItemList);

                var url = this.prefix + 'outsourcerWorkload/saveOutsourcerWorkloadInfo' + window.suffix;

                this.$refs.form.validate((valid) => {
                    if (valid) {

                        //console.log("valid", valid)
                        let supplyFlag = true;
                        let outPersonFlag = true;
                        let numberOfPeopleDayFlag = true;
                        for (var item in this.form.outsourcerWorkloadInfoItemList) {
                            if(this.form.outsourcerWorkloadInfoItemList[item].numberOfPeopleDay ==undefined)
                                numberOfPeopleDayFlag = false;
                            if(this.form.outsourcerWorkloadInfoItemList[item].supplierId ==undefined)
                                supplyFlag = false;
                            if(this.form.outsourcerWorkloadInfoItemList[item].outsourcerId ==undefined)
                                outPersonFlag = false;
                           // console.log("numberOfPeopleDayFlag",numberOfPeopleDayFlag,"supplyFlag",supplyFlag,"outPersonFlag",outPersonFlag);
                        }
                        if (this.form && this.form.outsourcerWorkloadInfoItemList.length!=0
                            &&numberOfPeopleDayFlag==true&&supplyFlag==true&&outPersonFlag==true) {

                            this.$myHttp({
                                method: 'POST',
                                url: url,
                                data: {
                                    "entity": _this.form
                                }
                            }).then(res => {
                                //成功回调方法
                                //console.log("返回数据",res)
                                if(res.status == 500){
                                    _this.$notify({
                                        title: '提示',
                                        message: '未知错误',
                                        type: 'error'
                                    });
                                }
                                if (res.data.code == 10003 ){
                                    _this.$notify({
                                        title: '提示',
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                }else{
                                    _this.$notify({
                                        title: '成功',
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                    _this.$router.push({
                                        name: 'outsourcerWorkloadInfo',
                                        params: {
                                            currentPage: _this.currentPage
                                        }
                                    });
                                }

                                /*
                                */
                            })

                        } else if(supplyFlag ==false){
                            this.$notify({
                                title: '警告',
                                message: '请确认供应商填写无误！',
                                type: 'warning'
                            });
                            // this.form.outsourcerWorkloadInfoItemList = [] ;
                        }else if(outPersonFlag ==false){
                            this.$notify({
                                title: '警告',
                                message: '请确认姓名填写无误！',
                                type: 'warning'
                            });
                            // this.form.outsourcerWorkloadInfoItemList = [] ;
                        }else if(numberOfPeopleDayFlag ==false){
                            this.$notify({
                                title: '警告',
                                message: '请确认结算人天填写无误！',
                                type: 'warning'
                            });
                            // this.form.outsourcerWorkloadInfoItemList = [] ;
                        }else {
                            this.$notify({
                                title: '警告',
                                message: '所填内容有误！',
                                type: 'warning'
                            });
                            // this.form.outsourcerWorkloadInfoItemList = [] ;
                        }

                    }

                })

            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'outsourcerWorkloadInfo',
                    params: {
                        currentPage: _this.currentPage
                    }
                });
            },
            autoSupplier (scope) {
                /*
                //todo 如果值不相等则提示 清除列表
                if (this.originalSupplierId){
                    if (this.originalSupplierId != this.form.supplierId) {
                        //弹窗
                        var _this = this;
                        this.$confirm('该操作会同时删除外包人员工作量填报表，确认执行删除操作吗？', '提示', {
                            confirmButtonText: '确定',
                            //cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //确认则清除数据
                            _this.form.outsourcerWorkloadInfoItemList = []
                        }).catch(() => {
                        });


                    }
                }*/
                //console.log("fucking ....... supplierId",scope.row.supplierId)
                //console.log("fucking ....... reserve1",scope.row.reserve1)
                //根据供应商选外包人员
                /*//此操作更改为后台做
                if (this.form.supplierId) {
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'supplier/getSupplierList' + window.suffix,
                        data: {
                            "entity": {
                                'id': this.form.supplierId
                            }
                        }
                    }).then(res => {

                        this.form.reserve1 = res.data.rows[0].name;
                        console.log("fucking ....... reserve1",this.form.reserve1)
                        console.log("fucking ....... supplierId",this.form.supplierId)
                    });
                }*/
                if(scope.row.supplierId){
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'outPersion/getOutsourcPersionList' + window.suffix, /* 选择供应商，自动带出外包人员 */
                        data: {
                            "entity": {
                                'belongSupplier': scope.row.supplierId
                            }
                        }
                    }).then(res => {
                        // 成功回调方法
                        var resArry = [];
                        for(var items in res.data.rows){
                            resArry.push({
                                label:res.data.rows[items].outName,
                                value:res.data.rows[items].id,
                                //TODO 1.添加外包人员电话、日工资、职位、职级 等等
                                employSalary:res.data.rows[items].employSalary,
                                outConnect:res.data.rows[items].outConnect,
                                post:res.data.rows[items].post,
                                rank:res.data.rows[items].rank

                            })
                        }
                        this.$refs.operationTable.data[scope.$index].supplierOutData = resArry;
                        //console.log("each row supplierOutData ----",resArry )
                        //看看好用不
                        let vm = this.$refs.operationTable
                        vm.$set(vm.data[scope.$index], scope.row.supplierOutData, resArry)
                    });
                }



            },
            autoProject () {

                //设置项目经理
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getProjectList' + window.suffix, /* 选择项目信息，自动带出项目经理 */
                    //url: 'http://127.0.0.1:6002/' + 'project/getProjectList' + window.suffix,
                    data: {
                        "entity": {
                            'id':this.form.projectId
                        }
                    }
                }).then(res => {
                    // 成功回调方法
                    // console.log("projectName",res.data.rows[0].projectName,"pmId",res.data.rows[0].pmId,"pmName",res.data.rows[0].pmName);
                    this.form.projectManagerId = res.data.rows[0].pmId;
                    this.form.reserve2 = res.data.rows[0].projectName;
                    this.form.reserve3 = res.data.rows[0].pmName;
                });

            },
            getSupplier () {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'supplier/getSupplierList' + window.suffix, /* 选择供应商，自动带出外包人员 */
                    data: {
                        "entity": {
                            'serverQualify': 1
                        }
                    }
                }).then(res => {
                    // 成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].name,
                            value:res.data.rows[items].id
                        })
                    }
                    this.supplierData = resArry;
                });

                // Cookies.set('loginId', '孙佳亮');//todo 测试时写死，提交时注掉
                let userName = Cookies.get('user');

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getProjectList' + window.suffix, /* 选择项目信息，自动带出项目经理 */
                    // url: 'http://127.0.0.1:6002/' + 'project/getProjectList' + window.suffix,
                    data: {
                        "entity": {
                            //项目经理为当前登陆用户
                            'pmName':userName
                        }
                    }
                }).then(res => {
                    // 成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].projectName,
                            value:res.data.rows[items].id,
                            projectManager:res.data.rows[items].projectManager
                        })
                    }
                    this.projectData = resArry;
                });
            },
            showRelation(){
                if(this.showRelationTable){
                    this.showRelationOpen1=false;
                    this.showRelationClose1=true;
                    this.showRelationTable=false;

                }else{
                    this.showRelationOpen1=true;
                    this.showRelationClose1=false;
                    this.showRelationTable=true
                }
            },
            renderHeader(h) {
                return (
                    <el-button type="success" size="mini" icon="el-icon-plus" circle  onClick={this.addOperData}></el-button>
            )
            },
            addOperData(){
                this.form.outsourcerWorkloadInfoItemList.push({})
            },
            deleteRow(index, rows){
                rows.splice(index, 1);
            },
            getCostTypeData(scope){  // 获取外包人员具体信息

                //todo

                if(scope.row.supplierOutData){
                    let costData = scope.row.supplierOutData.filter(o=> scope.row.outsourcerId.indexOf(o.value) > -1);
                    // 显示外包人员相关信息
                    this.$refs.operationTable.data[scope.$index].outConnect = costData[0].outConnect;
                    this.$refs.operationTable.data[scope.$index].employSalary = costData[0].employSalary;
                    this.$refs.operationTable.data[scope.$index].post = costData[0].post;
                    this.$refs.operationTable.data[scope.$index].rank = costData[0].rank;
                }
            },
            getCost(scope){
                let obj = {};
                //todo 判断传的值是否合法
                let inputNum = this.$refs.operationTable.data[scope.$index].numberOfPeopleDay;
                //console.log("----inputNum------",inputNum);
                if (inputNum) {
                    let temp = parseFloat(inputNum).toFixed(1);
                    if ((temp * 10 % 5 != 0)) {
                        var _this = this;
                        this.$confirm('请重新输入正确的数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //确认则清除数据
                            _this.$refs.operationTable.data[scope.$index].numberOfPeopleDay = 1;
                        }).catch(() => {
                        });

                    } else {
                        if (scope.row.supplierOutData) {
                            let costData = scope.row.supplierOutData; // .filter(o=> scope.row.outsourcerId.indexOf(o.value) > -1); 这是啥
                            this.$refs.operationTable.data[scope.$index].cost = costData[0].employSalary * this.$refs.operationTable.data[scope.$index].numberOfPeopleDay
                        }
                    }
                }
            },


            getTableData(){
                // 启动的时候调用这个
                this.$refs.operationTable.data.forEach(item =>{
                    item.costTypeSelectData = JSON.stringify(item.costTypeSelectData)
                })
                return this.$refs.operationTable.data;
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                const resData = [];
                columns.forEach((column, index) => {
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {

                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);

                        sums[index] += '';
                    } else {
                        sums[index] = '';
                    }
                });
                this.form.totalNumberOfPeopleDay = sums[3];
                this.form.totalLaborCost = sums[8];
                for(const items in sums){
                    if(items == 3){
                        resData.push(util.returnFloat(sums[items],1));
                    }else  {
                        // resData.push(util.returnFloat(sums[items]/1000));
                        resData.push(util.returnFloat(sums[items]));
                    }
                }

                resData[0] = '合计';
                resData[1] = '';
                resData[2] = '';
                resData[4] = '';
                resData[5] = '';
                resData[6] = '';
                resData[7] = '';
                resData[9] = '';
                resData[10] = '';
                resData[11] = '';
                resData[12] = '';

                return resData;
            },




        },


        created() {
            //跨router传参方式
            var _this = this;
            this.currentPage = this.$route.params.currentPage;
            //生成当前页面需要的数据字典内容
            //this.autoSupplier();
            this.getSupplier();
            if(this.$route.query.id){
                var _this = this;
                this.currentPage = this.$route.query.currentPage;
                if (this.$route.query.id) {
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'outsourcerWorkload/getOutsourcerWorkloadInfoList'+ window.suffix,
                        data: {
                            "entity":{
                                "id":_this.$route.query.id
                            }
                        }
                    }).then(res => {
                        //成功回调方法
                        // Cookies.set('loginId', 'hanfang');
                        // Cookies.set('user', '韩芳');
                        // let userName = Cookies.get('loginId');
                        let userName=sessionStorage.getItem('userName')
                        let userNameStr = Cookies.get('user');
                        let str = userName + '|'//+userNameStr;



                        //如果不是最后操作人，就提示不能操作，然后跳转到列表页
                        //if (res.data.rows[0].lastmodifiedBy != str) {
                            //console.log("弹出提示---->");
                            // this.$confirm('只能修改本人的数据', '提示', {
                            //     confirmButtonText: '确定',
                            //     //cancelButtonText: '取消',
                            //     type: 'warning'
                            // }).then(() => {
                            //     console.log("跳转---->");
                            //     var _this = this;
                            //     this.$router.push({
                            //         name: 'outsourcerWorkloadInfo',
                            //         params: {
                            //             currentPage: _this.currentPage
                            //         }
                            //     });
                            // }).catch(() => {
                            //     console.log("跳转---->");
                            //     var _this = this;
                            //     this.$router.push({
                            //         name: 'outsourcerWorkloadInfo',
                            //         params: {
                            //             currentPage: _this.currentPage
                            //         }
                            //     });
                            // });

                        //}else {

                            console.log("hehehehe--------------------",res.data.rows[0])

                            //res.data.rows[0] = JSON.parse(res.data.rows[0]);
                            _this.form = res.data.rows[0];
                            for (var item in _this.form.outsourcerWorkloadInfoItemList) {
                                _this.form.outsourcerWorkloadInfoItemList[item].supplierOutData=JSON.parse(_this.form.outsourcerWorkloadInfoItemList[item].supplierOutData);
                               /* this.form.totalLaborCost += Number(_this.form.outsourcerWorkloadInfoItemList[item].employSalary) * Number(_this.form.outsourcerWorkloadInfoItemList[item].numberOfPeopleDay);
                                console.log(this.form.totalLaborCost);*/
                            }

                            //_this.originalSupplierId = res.data.rows[0].supplierId
                            //todo 这里需要判空吗
                            //遍历每一行的缓存，进行比较然后处理===========================================================
                            for(var item in _this.form.outsourcerWorkloadInfoItemList){
                                //旧的数据，工资以旧数据为准
                                let oldSupplierOutData = _this.form.outsourcerWorkloadInfoItemList[item].supplierOutData;
                                this.$myHttp({
                                    method: 'POST',
                                    url: this.prefix + 'outPersion/getOutsourcPersionList' + window.suffix, /* 选择供应商，自动带出外包人员 */
                                    data: {
                                        "entity": {
                                            'belongSupplier': _this.form.outsourcerWorkloadInfoItemList[item].supplierId
                                        }
                                    }
                                }).then(res => {
                                    // 成功回调方法
                                    var resArry = [];
                                    for (var items in res.data.rows) {
                                        resArry.push({
                                            label: res.data.rows[items].outName,
                                            value: res.data.rows[items].id,
                                            //TODO 1.添加外包人员电话、日工资、职位、职级 等等
                                            employSalary: res.data.rows[items].employSalary,
                                            outConnect: res.data.rows[items].outConnect,
                                            post: res.data.rows[items].post,
                                            rank: res.data.rows[items].rank

                                        })
                                    }
                                    //遍历旧数据 oldSupplierOutData
                                    //如果 res.data.rows[items].id 旧数据里面有 即== oldSupplierOutData[olditems].value
                                    //新数据 resArry 里面的工资 改成  旧数据的工资
                                    for (var items in resArry) {
                                        for (var oldItems in oldSupplierOutData) {
                                            if (resArry[items].value == oldSupplierOutData[oldItems].value) {
                                                resArry[items].employSalary = oldSupplierOutData[oldItems].employSalary
                                            }
                                        }
                                    }

                                    _this.form.outsourcerWorkloadInfoItemList[item].supplierOutData = resArry;
                                    //console.log("supplierOutData ---- handled", _this.form.outsourcerWorkloadInfoItemList[item].supplierOutData)
                                });
                            }
                        //}
                    })
                }

            }

        },
        mounted(){
        },
        computed: {
            contractAmount:function() {
                return this.form.employSalary*this.form.numberOfPeopleDay
            }
        },
        filters:{
            fmt:function (value) {
                if(value){
                    return value/1000
                }
            },

            getCostData:function(value,currentCost){
                currentCost.cost = value;
                //this.form.totalLaborCost += Number(value);
                return  Number(currentCost.cost);
            }
        }
    };

</script>

<style>


    table th.must div:before {
        content: '*';
        color: #ff1818;
    }
</style>
