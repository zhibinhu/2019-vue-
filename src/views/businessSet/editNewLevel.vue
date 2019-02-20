<template>
    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">
            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 50px;margin-bottom: 20px">
                <el-col :span="8" :xs="20">
                    <el-form-item label="类别" prop="type">
                        <el-select v-model="form.type" placeholder="请选择" clearable filterable size="small" @change="getAllTitleByType"
                                   style="width: 95%">
                            <el-option
                                    v-for="item in typeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="职级" prop="title">
                        <el-input v-model="form.title" style="width: 95%" placeholder="请输入" size="small" @blur="judgRepeatTitle"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="职级代码" prop="code">
                        <el-input v-model="form.code" style="width: 95%" placeholder="请输入" size="small" @blur="judgRepeatCode"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="项目成本" prop="cost">
                        <el-input type="number" onkeyup="value=parseInt(value)" placeholder="请输入" v-model="form.cost" style="width: 95%" size="small"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="备注" >
                        <el-input
                                type="textarea"
                                style="width: 95%"
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
        </div>

    </el-col>
</template>

<script>
   /* import util from '../../libs/util.judgRepetition'*/
    export default {
        name: "addNewLevel",
        data(){
            return {
                labelPosition:"right",
                form:{
                    type:'',
                    title:'',
                    code:'',
                    cost:'',
                    memo:'',
                },
                typeData:[],
                rules:{
                    type:[ {required: true, message: '请输入选择职级类型', trigger: 'change'}],
                    title:[ {required: true, message: '请输入职级名称', trigger: 'blur'}],
                    code:[ {required: true, message: '请输入职级代码', trigger: 'blur'}],
                    cost:[ {required: true, message: '请输入项目成本', trigger: 'blur'}]
                },
                codeFlag:true,
                titleFlag:true,
                codeArray:[],
                titleArray:[],
                currentCode:'',
                currentTitle:'',
                currentType:''
            }
        },
        methods:{
            /*获取全局下所有的值机编码*/
            getAllCode(){
                var _this=this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getPositionLevel'+ window.suffix,
                    data: {
                        "entity": {

                        },
                    }
                }).then(res => {
                    //成功回调方法
                    var codeArray=[];
                    for(var i=0;i<res.data.rows.length;i++){
                        if(res.data.rows[i].code){
                            codeArray.push(res.data.rows[i].code);
                        }
                    }
                    _this.codeArray = codeArray;
                });
            },
            /*获取同一类型下所有的职级名称*/
            getAllTitleByType(){
                var _this=this;
                console.log('同职级类型',this.form.type);
                if(this.form.type!=this.currentType){    /*改变类型后,职级和职级代码都清空，重新填写*/
                    this.form.title='';
                    this.form.code=''
                }else{      /*没有改变类型,正常重新填写其他的*/
                    if(this.form.type){
                        this.currentType=this.form.type;
                    }
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'sysData/getPositionLevel'+ window.suffix,
                        data: {
                            "entity": {
                                'type':_this.currentType
                            },
                        }
                    }).then(res => {
                        //成功回调方法
                        var titleArray=[];
                        for(var i=0;i<res.data.rows.length;i++){
                            if(res.data.rows[i].title){
                                titleArray.push(res.data.rows[i].title);
                            }
                        }
                        _this.titleArray = titleArray;

                    });
                }
            },
            /*全局编码判重的提示*/
            judgRepeatCode(){
               /* this.judgRepetition("sysData/getPositionLevel",this.form.code,this,"职级代码11");*/
                if(this.form.type==this.currentType&&this.form.code==this.currentCode){
                    this.codeFlag=true;
                }else{
                    if(this.codeArray.indexOf(this.form.code)>-1){
                        this.codeFlag=false;
                        this.$notify({
                            title: '编码重复',
                            message: '该职级代码已经存在！请重新输入！',
                            type: 'warning'
                        });
                    }else {
                        this.codeFlag=true;
                    }
                }
            },
            /*判断同类型下的标题是否重复*/
            judgRepeatTitle(){
                if(this.form.title==this.currentTitle){
                    this.titleFlag=true;
                }else{
                    if(this.titleArray.indexOf(this.form.title)>-1){
                        this.titleFlag=false;
                        this.$notify({
                            title: '编码重复',
                            message: '该类型下的职级名称已经存在！请重新输入！',
                            type: 'warning'
                        });
                    }else {
                        this.titleFlag=true;
                    }
                }
            },
            saveProjectsInfo: function () {
                var _this = this;
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }
                    if (this.ruleFormOne) {
                        if(_this.codeFlag==true&&_this.titleFlag==true){
                            this.form.cost=(this.form.cost*1000);
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'sysData/savePositionLevel'+ window.suffix,
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
                                    name: 'businessSet/levelCostManage',
                                    params:{
                                        currentPage:_this.currentPage
                                    }
                                });
                            })
                        }else{
                            _this.$notify({
                                title: '重复',
                                message: '您输入的编码或名称重复，请从输入！',
                                type: 'warning'
                            });
                        }


                    }

                });
            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'businessSet/levelCostManage',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            },
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
                    _this.typeData = resArry;
                });

            }
        },
        created(){
            this.makeDataDictionary();
            this.getAllCode();
            this.getAllTitleByType();
            var _this=this;
            if (this.$route.query.id) {
                this.isShow = true;
                this.$myHttp({
                    method: 'POST',
                    url:  this.prefix + 'sysData/getPositionLevel'+ window.suffix,
                    data: {
                        "entity":{
                            id: _this.$route.query.id
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form= res.data.rows[0];
                    _this.form.cost= res.data.rows[0].cost/1000;
                    _this.currentCode=res.data.rows[0].code;
                    _this.currentTitle=res.data.rows[0].title;
                    _this.currentType=res.data.rows[0].type
                })
            }
        },
        computed: {
            /*cost: {
                set: function (val) {

                    this.form.cost = val * 1000
                },
                get: function (val) {

                    return this.form.cost / 1000
                }
            }*/
        }

    }
</script>

<style scoped>

</style>