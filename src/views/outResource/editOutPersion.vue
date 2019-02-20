<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">

            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 20px;margin-bottom: 20px;overflow: hidden">

                <el-col :span="8" :xs="20">
                    <el-form-item label="姓名"  prop="outName">    <!-- @blur="repeatJudgeInit"-->
                        <el-input v-model="form.outName" placeholder="请输入" style="width: 95%" size="small"  @blur="remindRepeat"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="8" :xs="20">
                    <el-form-item label="身份证号" prop="idNumber">    <!-- @blur="repeatJudgeInit"-->
                        <el-input v-model="form.idNumber"  placeholder="请输入" style="width: 95%" size="small"  @blur="remindRepeat"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="8" :xs="20">
                    <el-form-item label="性别"  prop="status">
                        <el-radio-group v-model="form.outSex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :xs="20">
                    <el-form-item label="所属供应商" prop="belongSupplier">
                        <el-select v-model="form.belongSupplier" placeholder="请选择" clearable filterable size="small"
                                   style="width: 95%">
                            <el-option
                                    v-for="item in managerIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="联系方式"  prop="outConnect">    <!-- @blur="repeatJudgeInit"-->
                        <el-input v-model="form.outConnect" placeholder="请输入" style="width: 95%" size="small"  @blur="remindRepeat"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="8" :xs="20">
                    <el-form-item label="人员单价（元/天）" prop="employSalary">    <!-- @blur="repeatJudgeInit"-->
                        <el-input v-model="form.employSalary" placeholder="请输入" style="width: 95%" size="small"  @blur="remindRepeat"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="8" :xs="20">
                    <el-form-item label="岗位" prop="post">    <!-- @blur="repeatJudgeInit"-->
                        <el-input v-model="form.post" style="width: 95%" placeholder="请输入"  size="small"  @blur="remindRepeat"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="8" :xs="20">
                    <el-form-item label="职级" prop="rank">    <!-- @blur="repeatJudgeInit"-->
                        <el-input v-model="form.rank" style="width: 95%" placeholder="请输入" size="small"  @blur="remindRepeat"></el-input>
                    </el-form-item>

                </el-col>

            </el-form>


            <el-col :span="24" :offset="10">

                <el-button @click="saveProjectsInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px">提交
                </el-button>
                <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">返回</el-button>

            </el-col>
        </div>

    </el-col>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                currentPage:'',
                labelPosition:'right',
                managerIdData:[],
                form: {
                    outName:'',
                    idNumber:'',
                    outSex:'0',
                    belongSupplier:'',
                    outConnect:'',
                    employSalary:'',
                    post:'',
                    rank:''
                },
                isShow: false,
                flag:true,
                productLineAllArray:[],
                rules: {
                 /*   productLineName: [
                        {required: true, message: '请输入产品线名称', trigger: 'change'}
                    ],
                    managerId: [
                        {required: true, message: '请选择负责人', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'change'}
                    ]*/
                }
            };
        },
        methods: {
            remindRepeat(){
             /*   var _this = this;
                console.log('所填的名称是',this.form.outName);
                if(this.productLineAllArray.indexOf(this.form.productLineName)>-1){
                    _this.flag=false;
                    _this.$notify({
                        title: '名称重复',
                        message: '所填名称与已有名称重复，请重新填写',
                        type: 'warning'
                    });
                }else {
                    _this.flag=true;
                }*/
            },
            saveProjectsInfo: function () {
                var _this = this;
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }else {
                        this.ruleFormOne = false;
                    }
                    if (this.ruleFormOne) {
                        if(this.flag==true){
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'outPersion/saveOutsourcPersion'+ window.suffix,
                                /*url:'http://192.168.99.24:6004/channel/save',*/
                                data:{
                                    "entity":{
                                        //"id":_this.$route.query.id,
                                        "outName":_this.form.outName,
                                        "idNumber":_this.form.idNumber,
                                        "outSex":_this.form.outSex,
                                        "belongSupplier": _this.form.belongSupplier,
                                        "outConnect":_this.form.outConnect,
                                        "employSalary":_this.form.employSalary,
                                        "post":_this.form.post,
                                        "rank": _this.form.rank,
                                    }
                                }
                            }).then(res => {
                                //成功回调方法
                                _this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });
                                _this.$router.push({
                                    name: 'outresourcePersion',
                                    params:{
                                        currentPage:_this.currentPage
                                    }
                                });
                            })
                        }else{
                            this.$notify({
                                title: '警告',
                                message: '所填名称与其他名称重复，请修改！',
                                type: 'warning'
                            });
                        }


                    }
                });
            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'productLine',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            },
            makeDataDictionary:function () {
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
        },
        created() {
            //跨router传参方式
            var _this = this;
            this.currentPage = this.$route.query.currentPage;
            if (this.$route.query.id) {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'outPersion/getOutsourcPersionList'+ window.suffix,
                    data: {
                        "entity":{
                            "id":_this.$route.query.id
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form= res.data.rows[0];

                })
            }

            //马总需求
            /* this.form.salesLeader = '进行中';*/

        },
        mounted(){
            /*this.initOrg()*/
        },
        computed: {
            contractAmount: {
                set: function (val) {

                    this.form.contractAmount = val * 1000
                },
                get: function (val) {

                    return this.form.contractAmount / 1000
                }
            }
        }
    };
</script>

<style>

</style>
