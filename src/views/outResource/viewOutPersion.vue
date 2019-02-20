<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 0 0;padding-left: 10px;font-size: 15px;">人员基本信息</div>

            <el-form label-position="left" inline class="table-expand" style="padding-left: 10px">
                <el-row>
                    <el-col :span="8" :xs="20">

                        <el-form-item label="姓名：">    <!-- @blur="repeatJudgeInit"-->
                            <span>{{form.outName}}</span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="身份证号：" prop="idNumber">    <!-- @blur="repeatJudgeInit"-->
                            <span>{{form.idNumber}}</span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="性别：">
                            <span>{{outSex}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="所属供应商：" prop="belongSupplier">
                            <span>{{belongSupplier}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系方式：" prop="outConnect">    <!-- @blur="repeatJudgeInit"-->
                            <span>{{form.outConnect}}</span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="人员单价(元/天)：" prop="employSalary">    <!-- @blur="repeatJudgeInit"-->
                            <span>{{form.employSalary}}</span>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="岗位：" prop="post">    <!-- @blur="repeatJudgeInit"-->
                            <span>{{form.post}}</span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="职级：" prop="rank">    <!-- @blur="repeatJudgeInit"-->
                            <span>{{form.rank}}</span>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row >
                    <el-col :span="8" :xs="20">
                        <el-form-item label="创建人：" prop="createBy">
                            <span>{{form.createBy}}</span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="创建时间：" prop="createTime">
                            <span>{{form.createTime}}</span>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row >
                    <el-col :span="8" :xs="20">
                        <el-form-item label="修改人：" prop="lastmodifiedBy">
                            <span>{{form.lastmodifiedBy}}</span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="修改时间：" prop="lastmodifiedTime">
                            <span>{{form.lastmodifiedTime}}</span>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-col :span="24" style="margin-bottom: 100px;padding-right: 15px">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="合作记录" name="assessment">

                            <my-easy-table :parentParam = "1" ref="recordData" :easyTableData="recordData"></my-easy-table>

                        </el-tab-pane>
                    </el-tabs>
                </el-col>

            </el-form>


            <el-col :span="24" :offset="10">

                <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">返回</el-button>

            </el-col>
        </div>

    </el-col>
</template>

<script>

    import myEasyTable from '../../components/myEasyTable.vue'
    export default {
        components: {
            myEasyTable
        },
        data() {
            return {
                currentPage:'',
                activeName: 'assessment',
                labelPosition:'right',
                supplierData:[],
                outSexData:[],
                outsourcerWorkloadInfoItemList:[],
                form: {
                    outName:'',
                    idNumber:'',
                    outSex:'0',
                    belongSupplier:'',
                    outConnect:'',
                    employSalary:'',
                    post:'',
                    rank:'',
                    createTime:'',
                    lastmodifiedTime:'',
                    createBy:'',
                    lastmodifiedBy:''
                },
                recordData: {
                    type: '01',
                    id: this.$route.query.id,
                    allCost:['totalrycbcost',6],
                    allCostNoRate:['totalxmwccostNoRate',4],
                    noSum:[1,2,3,4,6,7],
                    keepOneDotSum:[5],
                    title:'',
                    tableThead: [
                        {
                            headName: '项目名称',
                            headKey: 'projectNaem',
                        },
                        {
                            headName: '项目经理',
                            headKey: 'managerName',
                        },
                        {
                            headName: '进入项目时间',
                            headKey: 'inProject',
                        },
                        {
                            headName: '离开项目时间',
                            headKey: 'outProject',
                        },
                        {
                            headName: '参与项目总人天',
                            headKey: 'sumDays',
                            align:"right",
                            keepOneDot:true
                        },
                        {
                            headName: '岗位',
                            headKey: 'post',
                        },
                        {
                            headName: '职级',
                            headKey: 'rank',
                        },/*
                        {
                            headName: '当时人员单价（元/天）',
                            headKey: 'employSalary',
                        },*/
                        {
                            headName: '人力成本（元）',
                            headKey: "total",
                            align:"right"
                        }
                    ]
                },
            };
        },
        methods: {
            formatCreateAndModifyByFil(value,result){
                let username = "";
                if(value) {
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
                        this.form[result]=username;
                    });
                }else{
                    this.form[result]=username;
                }
            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'outresourcePersion',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            },
            autoSupplier () {
                /* 根据客户自动带出销售 */
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'supplier/getSupplierList' + window.suffix, /* 选择客户，自动带出销售 */
                    data: {
                        "entity": {
                            'serverQualify': 1
                        },
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
            },
            makeDataDictionary:function () {
                //负责人
                var _this=this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "sex"
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
                    _this.outSexData = resArry;
                    console.log('9999',_this.outSexData)
                });
            },
            /***
             * 员工工作量
             */
            getPersionWorkHours:function(){
                var _this=this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'outPersion/outPersionWorkload'+ window.suffix,
                    data: {
                        "entity": {
                            "outsourcerId": this.$route.query.id
                        },
                        "orderBy": "id asc",
                        "pageSize": 100,
                    }
                }).then(res => {
                    //成功回调方法
                    _this.outsourcerWorkloadInfoItemList= res.data.rows;
                    console.log('9999',_this.outsourcerWorkloadInfoItemList)
                });
            }
        },
        created() {
            //跨router传参方式
            var _this = this;
            _this.autoSupplier();
            _this.makeDataDictionary();
            this.currentPage = this.$route.query.currentPage;
            if (this.$route.query.id) {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'outPersion/getOutsourcPersionList'+ window.suffix,
                    data: {
                        "entity":{
                            "id":_this.$route.query.id
                        },
                        "pageSize": 100,
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form= res.data.rows[0];
                    this.formatCreateAndModifyByFil(_this.form.createBy,'createBy');
                    this.formatCreateAndModifyByFil(_this.form.lastmodifiedBy,'lastmodifiedBy');
                    var search = {
                        "outsourcerId": res.data.rows[0].id
                    };
                    _this.$refs.recordData.getData('outPersion/outPersionWorkload',search);

                })
            }
        },
        mounted(){
            /*this.initOrg()*/
        },
        computed: {
            belongSupplier:function(){
                for(var items in this.supplierData){
                    if(this.supplierData[items].value == this.form.belongSupplier){
                        return this.supplierData[items].label
                    }
                }
            },

            outSex:function(){
                for(var items in this.outSexData){
                    if(this.outSexData[items].value == this.form.outSex){
                        return this.outSexData[items].label
                    }
                }
            },
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
