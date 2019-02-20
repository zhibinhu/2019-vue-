<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">

            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 50px;margin-bottom: 20px;overflow: hidden">

                <el-col :span="8" :xs="20">
                    <el-form-item label="产品线名称" prop="productLineName">    <!-- @blur="repeatJudgeInit"-->
                        <el-input v-model="form.productLineName" placeholder="请输入" style="width: 95%" size="small" @blur="remindRepeat"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="8" :xs="20">
                    <el-form-item label="负责人" prop="managerId">
                        <el-select v-model="form.managerId" placeholder="请选择" clearable filterable size="small"
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
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio :label="true">激活</el-radio>
                            <el-radio :label="false">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-form>


            <el-form :label-position="labelPosition" ref="ruleFormTwo" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 20px;margin-bottom: 20px">
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

    export default {
        components: {},
        data() {
            return {
                currentPage:'',
                labelPosition:'right',
                managerIdData:[],
                form: {
                    productLineName:'',
                    managerName:'',
                    status:true,
                    memo:''
                },
                isShow: false,
                flag:true,
                productLineAllArray:[],
                currentProductLineName:'',
                rules: {
                    productLineName: [
                        {required: true, message: '请输入产品线名称', trigger: 'change'}
                    ],
                    managerId: [
                        {required: true, message: '请选择负责人', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'change'}
                    ]
                }
            };
        },
        methods: {
            getAllProductLine(){    /*获取所有产品名*/
                var _this = this;
                var productLineAllArray=[];
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getProductLine'+ window.suffix,
                    data: {
                        "entity": {

                        },
                    }
                }).then(res => {
                    for(var i=0;i<res.data.rows.length;i++){
                        if(res.data.rows[i].productLineName){
                            productLineAllArray.push(res.data.rows[i].productLineName);
                        }
                    }
                    _this.productLineAllArray=productLineAllArray;
                    console.log('所有产品线',productLineAllArray);
                })
            },
            remindRepeat(){
                var _this = this;
                console.log('所填的名称是',this.form.productLineName);
                if(this.form.productLineName==this.currentProductLineName){
                    _this.flag=true;
                }else {
                    if(this.productLineAllArray.indexOf(this.form.productLineName)>-1){
                        _this.flag=false;
                        _this.$notify({
                            title: '名称重复',
                            message: '所填名称与已有名称重复，请重新填写',
                            type: 'warning'
                        });
                    }else{
                        _this.flag=true;
                    }
                }
            },


            saveProjectsInfo: function () {
                var _this = this;
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }

                    this.$refs['ruleFormTwo'].validate((valid) => {
                        if (valid) {
                            this.ruleFormTwo = true
                        }
                    });

                    if (this.ruleFormOne && this.ruleFormTwo) {

                        if(this.flag==true){
                            /*if(_this.form.status==true){
                                _this.form.status="01"
                            }else if(_this.form.status==false){
                                _this.form.status="02"
                            }*/
                            let formStatus=_this.form.status==true?'01':'02';
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'sysData/saveProductLine'+ window.suffix,
                                /*url:'http://192.168.99.24:6004/channel/save',*/
                                data:{
                                    "entity":{
                                        /*'id': _this.$route.params.id,*/
                                        "id":_this.$route.query.id,
                                        "productLineName":_this.form.productLineName,
                                        "managerId":_this.form.managerId,
                                        "status":formStatus,
                                        "memo": _this.form.memo,
                                    }
                                }
                            }).then(res => {
                                //成功回调方法
                                if(res.data.subCode==0) {
                                    _this.$notify({
                                        title: '成功',
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                    _this.$router.push({
                                        name: 'customerInforManage/productLine',
                                        params:{
                                            currentPage:_this.currentPage
                                        }
                                    });
                                }
                                else{
                                    _this.$notify({
                                        title: '无法停用',
                                        message: res.data.subMsg,
                                        type: 'warning'
                                    });
                                   /* _this.form.status=true*/

                                }


                            })
                        }else {
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
                    name: 'customerInforManage/productLine',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            },
            makeDataDictionary:function () {
                //负责人
                var _this=this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSalePersons'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "销售负责人"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].userName,
                            value:res.data.content[items].id
                        })
                    }
                    _this.managerIdData = resArry;
                });
                //渠道类型
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "渠道类型"
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
                    _this.channelTypeData = resArry;
                });
                //所属业务部门
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSaleOrgs'+ window.suffix,
                    /*url:'http://192.168.99.24:6004/customer/getSaleOrgs',*/
                    data: {
                        "entity": {
                            "dtype": "所属业务部门"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].orgName,
                            value:res.data.content[items].id
                        })
                    }
                    _this.salesDepartmentData = resArry;
                });
                //销售负责人
               /* this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSalePersons'+ window.suffix,
                    /!* url:'http://192.168.99.24:6004/customer/getSalePersons',*!/
                    data: {
                        "entity": {
                            "dtype": "销售负责人"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].userName,
                            value:res.data.content[items].id
                        })
                    }
                    _this.salesLeaderData = resArry;
                    console.log(_this.salesLeaderData)
                });*/
                //渠道类型
                /* this.$myHttp({
                     method: 'POST',
                     /!*url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,*!/
                     url:this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                     data: {
                         "entity": {
                             "dtype": "渠道类型"
                         },
                         "orderBy": "idx asc"
                     }
                 }).then(res => {
                     //成功回调方法
                     console.log('渠道类型',res);
                     var resArry = [];
                     for(var items in res.data.content){
                         resArry.push({
                             label:res.data.content[items].userName,
                             value:res.data.content[items].id
                         })
                     }
                     _this.channelTypeData = resArry;
                 });*/
            }
        },
        created() {
            //跨router传参方式
            var _this = this;
            this.currentPage = this.$route.query.currentPage;
            //生成当前页面需要的数据字典内容
            this.makeDataDictionary();
            this.getAllProductLine();
            /* console.log('litan',this.$route.params);*/
            if (this.$route.query.id) {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getProductLine'+ window.suffix,
                    /*url: "http://192.168.99.24:6004/channel/view",*/
                    data: {
                        "entity":{
                            "id":_this.$route.query.id
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form= res.data.rows[0];
                    _this.currentProductLineName=res.data.rows[0].productLineName;
                    if(res.data.rows[0].status=="01"||res.data.rows[0].status=="true"){
                        _this.form.status=true
                    }else if(res.data.rows[0].status=="02"||res.data.rows[0].status=="false"){
                        _this.form.status=false
                    }
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
