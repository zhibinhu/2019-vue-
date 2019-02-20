<template>
    <el-col :span="24" style="background-color: white">
        <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 10px 0 10px;padding-left: 10px;font-size: 15px;">项目基本信息 > 编辑信息/新增信息</div>

        <el-form ref="ruleForm" :model="form" label-width="145px" :rules="rules"
                 style="margin-top: 20px;margin-bottom: 20px">
            <el-col :span="8" :xs="20">
                <el-form-item label="项目编号">
                    <el-input v-model="projectNum" style="width: 95%" size="small" :disabled="true"></el-input>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="项目名称" prop="projectName">
                    <el-input v-model="form.projectName" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="项目类型" prop="projectType" >
                    <el-select v-model="form.projectType" placeholder="请选择" clearable size="small" style="width: 95%">
                        <el-option
                                v-for="item in projectTypeData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="项目经理" prop="pmId">

                    <el-select v-model="form.pmId" placeholder="请选择" clearable filterable size="small" style="width: 95%" @change="util.selectGet(form,pmIdData,'pmName',form.pmId)">
                        <el-option
                                v-for="item in pmIdData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="项目总监">
                    <el-select v-model="form.pdId" placeholder="请选择" clearable filterable size="small" style="width: 95%" @change="util.selectGet(form,pdIdData,'pdName',form.pdId)">
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
                    <el-select v-model="form.pmoId" placeholder="请选择" clearable filterable size="small" style="width: 95%" @change="util.selectGet(form,pmoIdData,'pmoName',form.pmoId)">
                        <el-option
                                v-for="item in pmoIdData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="项目开始时间" prop="projectStartTime">
                    <el-date-picker
                            v-model="form.projectStartTime"
                            size="small"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间" style="width: 95%">
                    </el-date-picker>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="项目结束时间" prop="projectEndTime">
                    <el-date-picker
                            v-model="form.projectEndTime"
                            size="small"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions"
                            placeholder="选择日期时间" style="width: 95%">
                    </el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="项目状态" prop="projectState">
                    <el-select v-model="form.projectState" placeholder="请选择" size="small" clearable style="width: 95%">
                        <el-option
                                v-for="item in projectStateData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

           <!-- <el-col :span="12" :xs="20">
                <el-form-item label="关联商机" >
                    <el-input style="width: 95%" size="small"></el-input>
                </el-form-item>

            </el-col>
            <el-col :span="4" :xs="20">
                <el-button style="height: 30px;line-height: 30px;margin-left: 0px;padding: 0 15px;margin-top: 5px;"  type="primary">选择商机</el-button>
            </el-col>-->

            <el-col :span="8" :xs="20">
                <el-form-item label="客户名称" prop="customerId">
                    <el-select v-model="form.customerId" clearable placeholder="请选择" filterable   @change="autoSales" size="small" style="width: 95%">
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
                <el-form-item label="合同编号" >
                    <el-input  v-model="form.contractId" style="width: 95%" placeholder="请输入" size="small"></el-input>
                </el-form-item>

            </el-col>
            <el-col :span="8" :xs="20">
                <el-form-item label="合同名称" >
                    <el-input  v-model="form.contractName" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>

            </el-col>


            <el-col :span="8" :xs="20">
                <el-form-item label="合同签订时间">
                    <el-date-picker
                            v-model="form.contractSignTime"
                            size="small"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间" style="width: 95%">
                    </el-date-picker>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="签订部门">
                    <el-select v-model="form.signOrgCode" clearable placeholder="请选择" filterable size="small" style="width: 95%" @change="util.selectGet(form,signOrgCodeData,'signOrgName',form.signOrgCode)">
                        <el-option
                                v-for="item in signOrgCodeData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="客户签订部门">
                    <el-input v-model="form.customerSigningDepartment" placeholder="请输入" style="width: 95%" size="small"></el-input>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="合同总金额(元)" prop="totalContractAmount">
                    <el-input-number controls-position="right" placeholder="请输入" :min="0" v-model="totalContractAmount" style="width: 95%" size="small"></el-input-number>
                </el-form-item>

            </el-col>


            <el-col :span="8" :xs="20">
                <el-form-item label="合同税率" prop="contractRate">
                    <el-select v-model="form.contractRate" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                        <el-option
                                v-for="item in contractRateData"
                                :key="item.value"
                                :label="item.label*100 + '%'"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="销售人员" prop="saleId">
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
            <el-col :span="8" :xs="20">
                <el-form-item label="服务类型" prop="serviceType">

                    <el-select v-model="form.serviceType" clearable placeholder="请选择" size="small" style="width: 95%">
                        <el-option
                                v-for="item in serviceTypeData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>

             <el-col :span="8" :xs="20">
               <el-form-item label="人天总数">
                   <el-input type="number" v-model="form.totalNumberDays" placeholder="请输入" style="width: 95%" size="small"></el-input>
               </el-form-item>

           </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="计费类型" prop="feeType">
                    <el-select v-model="form.feeType" placeholder="请选择" clearable filterable size="small" style="width: 95%">
                        <el-option
                                v-for="item in feeTypeData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="备注" >
                    <el-input
                            style="width: 95%"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="form.memo">
                    </el-input>
                </el-form-item>
            </el-col>

        </el-form>

        <el-col :span="24" :offset="10">
            <el-button @click="saveProjectsInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px">提交
            </el-button>
            <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">返回</el-button>

        </el-col>


        <el-col :span="22" :offset="1" style="margin-bottom: 100px;margin-left: 20px;width: 100%;padding-right: 35px;" v-if="isShowTab">
            <el-tabs v-model="activeName" v-if="isFromAdd">
                <el-tab-pane  label="项目成本评估" name="assessment" >
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
            </el-tabs>

        </el-col>





    </el-col>


</template>

<script>

    import util from '../../libs/util';
    import myEasyTable from '../../components/myEasyTable.vue';
    import attachTable from '../../components/attachTable.vue';
    import profitForm from '../../components/profitForm.vue';
    import operationTable from '../../components/operationTable.vue'
    import relationOperTable from  '../../components/relationOperTable.vue'
    export default {
        components: {
            myEasyTable,
            attachTable,
            profitForm,
            operationTable,
            relationOperTable
        },
        data() {
            return {
                costNoRate:'',
                contractValue:'',
                costNum:'',
                costId:'',
                cost:'',
                isShowTab:false,
                activeName:'enclosure',
                util:util,
                isFromAdd:false,
                currentPage:'',
                projectNum:'创建项目后自动生成',
                projectStateData: [],
                contractRateData:[],
                saleIdData: [],
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
                projectTypeData:[
                    {
                        label: '内部项目',
                        value: '8'
                    },
                    {
                        label: '外部项目',
                        value: '5'
                    },
                    {
                        label: '研发项目',
                        value: '7'
                    }
                ],
                feeTypeData:[],
                serviceTypeData:[],
                signOrgCodeData:[],
                customerIdData:[],
                pmIdData:[],
                pmoIdData:[],
                pdIdData:[],
                form: {
                    contractRate:'02',
                    feeType:'01',
                    contractSignTime:'',
                    memo:'',
                    projectNum: '',
                    contractName: '',
                    projectState: '',
                    projectName: '',
                    serviceType: '',
                    signOrgCode: null,
                    saleId: '',
                    contractId:'',
                    totalContractAmount: '',
                    totalNumberDays: '',
                    customerId: '',
                    customerSigningDepartment: '',
                    isAllowWorkingHours:true,
                    pmId: '',
                    projectStartTime: '',
                    projectEndTime:'',
                    humanCost: '',
                    costOfExpenses: '',
                    totalCost: '',
                    pdId: '',
                    pmoId:'',
                    totalHumanCost:''
                },
                pickerOptions:this.endTime(),
                rules: {
                    projectState:[
                        {required: true, message: '请输入项目状态', trigger: 'change'}
                    ],
                    contractName: [
                        {required: true, message: '请输入合同名称', trigger: 'blur'}
                    ],
                    pmId: [
                        {required: true, message: '请输入项目经理', trigger: 'change'}

                    ],
                    projectName:[
                        {required: true, message: '请输入项目名称', trigger: 'blur'}
                    ],
                    projectType:[
                        {required: true, message: '请选择项目类型', trigger: 'change'}

                    ],
                    customerId:[
                        {required: true, message: '请选择客户名称', trigger: 'change'}

                    ],
                    projectStartTime:[
                        {required: true, message: '请选择项目开始时间', trigger: 'blur'}

                    ],
                    projectEndTime:[
                        {required: true, message: '请选择项目结束时间,应大于开始时间', trigger: 'blur'}

                    ],
                   /* totalContractAmount:[
                        {required: true, message: '请输入合同总金额', trigger: 'blur'}

                    ],*/
                    contractRate:[
                        {required: true, message: '请输入合同税率', trigger: 'blur'}
                    ],
                    feeType:[
                        {required: true, message: '请选择计费类型', trigger: 'blur'}
                    ],
                },
                showSixTable:true,
                showSixOpen:true,
                showSixClose:false,
                attachment1:{
                    bizType:"project",
                    isViewButton:true,
                    refId:''   /* 六 ，附件,传入成本明细id*/
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
            handleClick(){

            },
            autoSales(){
                /*alert("自动带出销售");*/
                console.log(this.form.customerId);
                util.selectGet(this.form,this.customerIdData,'customerName',this.form.customerId);
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSalePersonByCustomer'+ window.suffix,     /*选择客户，自动带出销售*/
                    data:{
                        "entity": this.form.customerId
                    }
                }).then(res => {
                    //成功回调方法
                    console.log(res);
                    this.form.saleId=res.data.content.id;
                    util.selectGet(this.form,this.saleIdData,'saleName',this.form.saleId);
                    /* this.form.saleName=res.data.content.saleName*/
                });
            },
            endTime(){
                var that=this;
                return {
                    disabledDate(time) {
                        //console.log('disabledDate')
                        if(that.form.projectStartTime){
                            //console.log('disabledDate1')

                            return new Date(that.form.projectStartTime).getTime() > time.getTime()
                        }else{
                            console.log('disabledDate2')

                            return
                        }
                    }
                }
            },
            saveProjectsInfo: function () {
                console.log(this.form)

                var _this = this;
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.ruleForm = true;
                    }else {
                        this.ruleForm = false;
                    }



                    if (this.ruleForm) {

                        if(this.form.projectStartTime < this.form.projectEndTime){
                            this.$myHttp({
                                method: 'POST',
                                url:this.prefix + 'project/saveProject'+ window.suffix,
                                data:{
                                    "entity": _this.form,
                                    "pageNum": 0,
                                    "pageSize": 1000,
                                }
                            }).then(res => {
                                //成功回调方法

                                _this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });

                                _this.$router.push({
                                    name: 'projectManagement/projectList',
                                    params:{
                                        currentPage:_this.currentPage
                                    }
                                });
                            })
                        }else {

                            this.$notify({
                                title: '警告',
                                message: '不能提交，项目结束时间早于项目开始时间！',
                                type: 'warning'
                            });
                        }



                    }
                });
            },
            close:function () {
                this.$router.push({
                    name: 'projectManagement/projectList',
                    params:{
                        currentPage:this.currentPage
                    }
                });
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
                        this.attachment1.refId=res.data.rows[0].id;
                        this.costNum = res.data.rows[0].costForecastNum;
                        this.costId  = res.data.rows[0].id;
                    }


                    this.getAllCost()

                });

            },


            makeDataDictionary:function () {

                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "项目状态"
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
                    _this.projectStateData = resArry;
                });

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "税率"
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
                    _this.contractRateData = resArry;
                });


                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "服务类型"
                        }
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
                    _this.serviceTypeData = resArry;
                });

                //获取部门下拉数据
                this.$myHttp({
                    method: 'get',
                    url: this.prefix + 'org/getAllOrgs' + window.suffix
                }).then(res => {


                    var resArry = [];
                    for(var items in res.data.content ){
                        resArry.push({
                            label:res.data.content[items].orgName,
                            value:res.data.content[items].orgCode
                        });
                    }
                    this.signOrgCodeData = resArry;
                });

                //获取费用类型下拉数据
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data:{
                        "entity": {
                            "dtype": "计费类型"
                        },
                    }
                }).then(res => {
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    this.feeTypeData = resArry;

                });


                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'masterdata/customer/getActiveCustomers' + window.suffix,
                   /* data: {
                    }*/
                }).then(res => {
                    var resArry = [];
                    for(var items in res.data.content ){
                        resArry.push({
                            label:res.data.content[items].customerName,
                            value:res.data.content[items].id
                        });
                    }
                    _this.customerIdData = resArry;
                    console.log(resArry)
                });




                //项目经理
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'microarch/sys/sysroleuser/find' + window.suffix,
                    data: {entity: {"id": 2}}
                }).then(res => {

                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].cname,
                            value:res.data.rows[items].id
                        })
                    }

                    this.pmIdData = resArry;
                });


                //PMO
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'microarch/sys/sysroleuser/find' + window.suffix,
                    data: {entity: {"id": 6}}
                }).then(res => {

                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].cname,
                            value:res.data.rows[items].id
                        })
                    }

                    this.pmoIdData = resArry;
                })


                //项目总监
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'userrole/getUsersByRoleCode' + window.suffix,
                    data:{
                        roleCode:'03'
                    }
                }).then(res => {

                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].cname,
                            value:res.data.content[items].id
                        })
                    }

                    this.pdIdData = resArry;
                });

                //销售
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'userrole/getUsersByRoleCode' + window.suffix,
                    data:{
                        roleCode:'02'
                    }
                }).then(res => {

                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].cname,
                            value:res.data.content[items].id
                        })
                    }

                    this.saleIdData = resArry;

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
        created() {
            var _this = this;
            this.currentPage = this.$route.query.currentPage;
            if(this.$route.query.projectNum){
                this.projectNum = this.$route.query.projectNum;
            }

            if(this.$route.query.id){
                this.isFromAdd = true ;
                this.activeName = 'assessment';
               /* this.abledchoice = true;*/
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getProjectList' + window.suffix,
                    data: {
                        "entity":{
                            id:_this.$route.query.id
                        },
                        "pageNum": 0,
                        "pageSize": 1000
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form = res.data.rows[0]
                })
            }


            //生成当前页面需要的数据字典内容
            this.makeDataDictionary();

            this.getCostDetail()


        },
        computed: {
            totalContractAmount: {
                set: function(val) {

                    this.form.totalContractAmount = val*1000
                },
                get: function(val) {

                    return this.form.totalContractAmount/1000
                }
            },
            totalHumanCost:{
                set: function(val) {

                    this.form.totalHumanCost = val*1000
                },
                get: function(val) {

                    return this.form.totalHumanCost/1000
                }
            }
        }

    };
</script>

<style>

</style>
