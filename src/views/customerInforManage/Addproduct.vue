<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">

            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 50px;margin-bottom: 20px;overflow: hidden">

                <el-col :span="8" :xs="20">
                    <el-form-item label="产品名称" prop="productName">    <!-- @blur="repeatJudgeInit"-->
                        <el-input v-model="form.productName" style="width: 95%" placeholder="请输入" size="small" @blur="remindRepeat"></el-input>
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
                    <el-form-item label="所属产品线" prop="productLineId">
                        <el-select v-model="form.productLineId" placeholder="请选择" clearable filterable size="small"
                                   style="width: 95%">
                            <el-option
                                    v-for="item in productLineIdData"
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
                productLineIdData:[],
                form: {
                    productLineName:'',
                    managerName:'',
                    status:true,
                    memo:''
                },
                isShow: false,
                flag:true,
                productAllArray:[],
                rules: {
                    productName: [
                        {required: true, message: '请输入产品名称', trigger: 'change'}
                    ],
                    productLineId: [
                        {required: true, message: '请选择产品线', trigger: 'change'}
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
            getAllProduct(){    /*获取所有产品名*/
                var _this = this;
                var productAllArray=[];
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getProduct'+ window.suffix,
                    data: {
                        "entity": {

                        },
                    }
                }).then(res => {
                    for(var i=0;i<res.data.rows.length;i++){
                        if(res.data.rows[i].productName){
                            productAllArray.push(res.data.rows[i].productName);
                        }
                    }
                    _this.productAllArray=productAllArray;
                    console.log('所有产品',_this.productAllArray);
                })
            },
            remindRepeat(){
                var _this = this;
                console.log('所填的名称是',this.form.productName);
               if(this.productAllArray.indexOf(this.form.productName)>-1){
                   _this.flag=false;
                   _this.$notify({
                       title: '名称重复',
                       message: '所填名称与已有名称重复，请重新填写',
                       type: 'warning'
                   });
               }else {
                   _this.flag=true;
               }
            },


            saveProjectsInfo: function () {
                var _this = this;
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }else {
                        this.ruleFormOne = false;
                    }

                    this.$refs['ruleFormTwo'].validate((valid) => {
                        if (valid) {
                            this.ruleFormTwo = true
                        }else {
                            this.ruleFormTwo = false;
                        }
                    });

                    if (this.ruleFormOne && this.ruleFormTwo) {
                        if(this.flag==true){
                            if(_this.form.status==true){
                                _this.form.status="01"
                            }else if(_this.form.status==false){
                                _this.form.status="02"
                            }
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'sysData/saveProduct'+ window.suffix,
                                /*url:'http://192.168.99.24:6004/channel/save',*/
                                data:{
                                    "entity":{
                                        /*'id': _this.$route.params.id,*/
                                        "id": _this.$route.params.id,
                                        "productName":_this.form.productName,
                                        "productLineId":_this.form.productLineId,
                                        "managerId":_this.form.managerId,
                                        "status":_this.form.status,
                                        "memo": _this.form.memo,
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
                                    name: 'customerInforManage/product',
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
                    name: 'customerInforManage/product',
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
                    _this.managerNameData = resArry;
                });
                //产品线
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getProductLine'+ window.suffix,
                    data: {
                        "entity": {
                            "status": "01"
                        },
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].productLineName,
                            value:res.data.rows[items].id
                        })
                    }
                    _this.productLineIdData = resArry;
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
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSalePersons'+ window.suffix,
                    /* url:'http://192.168.99.24:6004/customer/getSalePersons',*/
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
                    console.log(_this.managerIdData)
                });
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
            this.currentPage = this.$route.params.currentPage;
            //生成当前页面需要的数据字典内容
            this.makeDataDictionary();
            this.getAllProduct();
            /* console.log('litan',this.$route.params);*/
            /*if (this.$route.params.id) {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getProduct'+ window.suffix,
                    /!*url: "http://192.168.99.24:6004/channel/view",*!/
                    data: {
                        "entity":{
                            /!*"id":_this.$route.params.id*!/
                            "id":_this.$route.params.id
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form= res.data.rows[0];
                    if(res.data.rows[0].status=="01"||res.data.rows[0].status=="true"){
                        _this.form.status=true
                    }else if(res.data.rows[0].status=="02"||res.data.rows[0].status=="false"){
                        _this.form.status=false
                    }
                })
            }*/

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
