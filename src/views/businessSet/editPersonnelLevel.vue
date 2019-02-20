<template>
    <div>
        <el-col :span="24" style="background-color: white">

            <div style="margin-left: 20px">


                <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                         style="margin-top: 50px;margin-bottom: 20px">

                    <el-col  :span="8" :xs="20">
                        <el-form-item label="部门名称："> <span>{{orgName}}</span></el-form-item>
                    </el-col>

                    <el-col  :span="8" :xs="20">
                        <el-form-item label="姓名："> <span>{{cname}}</span></el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="类别" prop="positionLevelType">
                            <el-select v-model="form.positionLevelType" placeholder="请选择" clearable filterable size="small"
                                       @change="selectPositionLevel"          style="width: 90%">
                                <el-option
                                        v-for="item in positionLevelTypeData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="职级" prop="positionLevelCode">
                            <el-select v-model="form.positionLevelCode" placeholder="请选择" clearable filterable size="small"
                                @change="autoShowPositionLevelCode"   style="width: 90%">
                                <el-option
                                        v-for="item in positionLevelCodeData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="8" :xs="20">
                        <el-form-item label="职级代码："> <span>{{positionLevelCode}}</span></el-form-item>
                    </el-col>
                    <el-col  :span="8" :xs="20">
                        <el-form-item label="项目成本："> <span>{{positionLevelCost}}</span></el-form-item>
                    </el-col>

                    <el-col :span="24" :xs="1">
                        <el-form-item label="备注" >
                            <el-input
                                    type="textarea"
                                    style="width: 24%"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="form.memo">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-form>

                <el-col :span="24" :offset="10">
                    <el-button @click="saveProjectsInfo()" type="primary" style="display:none;margin-top: 20px;margin-bottom: 10px">提交
                    </el-button>
                    <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">返回</el-button>
                </el-col>
            </div>
        </el-col>
    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                labelPosition:"right",
                orgName:'',
                cname:'',
                positionLevelCode:'',
                positionLevelCost:'',
                positionLevelTypeData:[],
                positionLevelCodeData:[],
                form:{
                    positionLevelType:'',
                    positionLevelCode:'',
                    memo:''
                },
                rules: {
                    positionLevelCode:[ {required: true, message: '请选择职级类型', trigger: 'change'}],
                    positionLevelType:[ {required: true, message: '请选择职级名称', trigger: 'change'}],
                },
                positionLevelTypeCurrent:''
            };
        },
        methods: {
            makeDataDictionary:function () {
                //职级类型
                var _this=this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "职级类型"
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
                    _this.positionLevelTypeData = resArry;
                });
                //职级下拉框
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getPositionLevel'+ window.suffix,
                    data: {
                        "entity": {
                            "type":this.positionLevelTypeCurrent
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].title,
                            value:res.data.rows[items].code
                        })
                    }
                    _this.positionLevelCodeData = resArry;
                });

            },
            /*刚打开页面时，按照初四类型筛选职级*/
            autoSelectType(){
                var _this=this;
                //职级下拉框
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getPositionLevel'+ window.suffix,
                    data: {
                        "entity": {
                            "type":this.positionLevelTypeCurrent
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].title,
                            value:res.data.rows[items].code
                        })
                    }
                    _this.positionLevelCodeData = resArry;
                });
            },
            /*自动根据类型筛选职级*/
            selectPositionLevel(){
                var _this=this;
                if(this.form.positionLevelType){
                    this.positionLevelTypeCurrent=this.form.positionLevelType;
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'sysData/getPositionLevel'+ window.suffix,
                        data: {
                            "entity": {
                                "type":this.positionLevelTypeCurrent
                            }
                        }
                    }).then(res => {
                        //成功回调方法
                        var resArry = [];
                        for(var items in res.data.rows){
                            resArry.push({
                                label:res.data.rows[items].title,
                                value:res.data.rows[items].code
                            })
                        }
                        _this.positionLevelCodeData = resArry;
                    });
                }else{
                    _this.positionLevelCodeData=[];
                    _this.form.positionLevelCode='';
                    _this.$notify({
                        title: '类型',
                        message: '请先选择职级类型！',
                        type: 'warning'
                    });
                }

            },
            /*自动显示职级成本与职级代码*/
            autoShowPositionLevelCode(){
                if(this.form.positionLevelType&&this.form.positionLevelCode){
                    this.positionLevelCode=this.form.positionLevelCode;
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'sysData/getPositionLevel'+ window.suffix,
                        data: {
                            "entity": {
                                "code":this.form.positionLevelCode
                            }
                        }
                    }).then(res => {
                        //成功回调方法
                        this.positionLevelCost = res.data.rows[0].cost/1000;
                    });
                }else{

                }
            },
            saveProjectsInfo: function () {
                var _this = this;
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }
                    if (this.ruleFormOne) {
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'sysData/saveUser'+ window.suffix,
                                data:{
                                    "entity":_this.form
                                }
                            }).then(res => {
                                //成功回调方法
                                _this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });
                                _this.$router.push({
                                    name: 'businessSet/personnelLevelManage',
                                    params:{
                                        currentPage:_this.currentPage
                                    }
                                });
                            })
                    }else {

                    }

                });
            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'businessSet/personnelLevelManage',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            }
        },
        created() {
            this.makeDataDictionary();
            //跨router传参方式
            var _this = this;
            this.currentPage = this.$route.params.currentPage;
            if(this.$route.query.username){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + "sysData/getUser" +window.suffix,
                    data: {
                        "entity": {
                            "username": this.$route.query.username
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form= res.data.rows[0];
                    _this.orgName=res.data.rows[0].orgName;
                    _this.cname=res.data.rows[0].cname;
                    console.log('反出来的类型',res.data.rows[0].positionLevelType);
                    if(!res.data.rows[0].positionLevelType){    /*如果本来就没有职级类型，那个职级下拉框为空*/
                        _this.positionLevelCodeData=[];
                    }else{
                       _this.positionLevelTypeCurrent=res.data.rows[0].positionLevelType;
                       _this.autoSelectType()
                    }
                    _this.positionLevelCode=res.data.rows[0].positionLevelCode;
                    _this.positionLevelCost=res.data.rows[0].positionLevelCost/1000;

                })
            }
        },
        mounted(){

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
