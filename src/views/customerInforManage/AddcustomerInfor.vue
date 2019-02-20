<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">

            <el-form :label-position="labelPosition" ref="ruleForm" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 50px;margin-bottom: 20px">
                <el-col :span="8" :xs="20">
                    <el-form-item label="客户名称" prop="customerName">
                        <el-input v-model="form.customerName" placeholder="请输入" style="width: 95%" size="small" @blur="checkDuplicateCustomer"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="所属行业">
                        <el-select v-model="form.customerIndustry" placeholder="请选择" clearable filterable size="small"
                                   style="width: 95%">
                            <el-option
                                    v-for="item in customerIndustryData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="渠道">
                        <el-select v-model="form.channel" placeholder="请选择" clearable filterable size="small"
                                   style="width: 95%">
                            <el-option
                                    v-for="item in channelData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="主要联系人" prop="primaryContact">
                        <el-input v-model="form.primaryContact" placeholder="请输入" style="width: 95%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="电话">
                        <el-input v-model="form.telephone" style="width: 95%" placeholder="请输入" size="small" @blur="checkPhone(form.telephone)"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="网站">
                        <el-input v-model="form.site" style="width: 95%" placeholder="请输入" size="small"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="电子邮件" >
                        <el-input v-model="form.email" style="width: 95%" placeholder="请输入" size="small"  @blur="chenckEmail(form.email)"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="传真">
                        <el-input v-model="form.fax" style="width: 95%" placeholder="请输入" size="small"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">

                    <el-form-item label="地址">
                        <el-input v-model="form.customerAddress" placeholder="请输入" style="width: 95%" size="small"></el-input>

                    </el-form-item>
                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="邮政编码">
                        <el-input v-model="form.postalCode" placeholder="请输入" style="width: 95%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="所属业务部门" prop="salesDepartment">
                        <el-select v-model="form.salesDepartment" placeholder="请选择" clearable size="small" style="width: 95%">

                            <el-option
                                    v-for="item in salesDepartmentData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>

                <el-col :span="8" :xs="20">
                    <el-form-item label="销售负责人" prop="salesLeader">
                        <el-select v-model="form.salesLeader" placeholder="请选择" clearable size="small" style="width: 95%">

                            <el-option
                                    v-for="item in salesLeaderData"
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
                labelProjectType: '商机',
                labelPosition: 'right',
               /* customerCode: '创建后自动生成',*/
                channelData:[],
                customerIndustryData:[],
                salesDepartmentData:[],
                salesLeaderData:[],
                repeatStatus:'',
                form: {
                    customerCode:'',
                    customerName:'',
                    channel:'',
                    primaryContact: '',
                    customerIndustry:'',
                    telephone:'',
                    email:'',
                    fax:'',
                    site:'',
                    postalCode:'',
                    salesDepartment:'',
                    salesLeader:'',
                    customerAddress:'',
                    status:true,
                    memo:''
                },
                isShow: false,
                rules: {
                    customerCode: [
                        {required: true, message: '请输入客户编号', trigger: 'blur'}
                    ],
                    customerName: [
                        {required: true, message: '请输入客户名称', trigger: 'blur'}
                    ],
                    primaryContact: [
                        {required: true, message: '请选择主要联系人', trigger: 'blur'}
                    ],
                    salesDepartment:[
                        {required: true, message: '请选择所属业务部门', trigger: 'blur'}
                    ],
                    salesLeader:[
                        {required: true, message: '请选择销售负责人', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            /**
             * 校验联系方式
             */
            checkPhone:function(event){
                var tel = /^0\d{2,3}-?\d{7,8}$/;
                var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
                if(!phone.test(event) && !tel.test(event) &&event != ""){

                    this.$notify({
                        title: '错误',
                        message: '联系方式格式不正确',
                        type: 'error'
                    });
                    this.phoneFlag = false;
                }else{
                    this.phoneFlag = true;
                }
            },

            /**
             *校验邮箱
             */
            chenckEmail:function(event){
                var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if(!mailReg.test(event) && event != ""){
                    this.$notify({
                        title: '错误',
                        message: '邮箱格式不正确',
                        type: 'error'
                    });
                    this.emailFlag = false;
                }else{
                    this.emailFlag = true;
                }
            },
            checkDuplicateCustomer(){
                var _this = this;
                if(_this.form.customerName){
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'masterdata/customer/checkDuplicateCustomer'+ window.suffix,
                        data: {
                                "entity":_this.form.customerName
                        }
                    }).then(res => {
                        //成功回调方法
                        console.log(res.data.status);
                        _this.repeatStatus=res.data.status;
                        if(res.data.status=="error"){
                            _this.$notify({
                                title: '警告',
                                message: '客户名称重复，请重新输入！',
                                type: 'warning'
                            });
                        }
                    });
                }
            },
            saveProjectsInfo: function () {
                var _this = this;
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {

                        if(_this.form.status==true){
                            _this.form.status="Y"
                        }else if(_this.form.status==false){
                            _this.form.status="N"
                        }

                        if(_this.repeatStatus=="ok"){
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix+"masterdata/customer/save"+window.suffix,
                                /*url: 'http://192.168.99.24:6004/customer/save',*/
                                data:{
                                    "entity":_this.form
                                    /*"pageNum": 0,
                                    "pageSize": 1000,*/
                                }
                            }).then(res => {
                                //成功回调方法
                                _this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });
                                _this.$router.push({
                                    name: 'customerInforManage/customerInfor',
                                    params:{
                                        currentPage:_this.currentPage
                                    }
                                });
                            })
                        }else{
                            _this.$notify({
                                title: '警告',
                                message: '客户名称重复，请重新输入！',
                                type: 'warning'
                            });
                        }
                    }
                });
            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'customerInforManage/customerInfor',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            },
            makeDataDictionary:function () {
                var _this = this;
                //行业
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "行业"
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
                    _this.customerIndustryData = resArry;
                });
                //获取可用的渠道
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getActiveChannels'+ window.suffix,
                   /* url:'http://192.168.99.24:6004/customer/getChannels',*/
                    data: {
                        "entity": {
                            "dtype": "渠道"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].channelName,
                            value:res.data.content[items].id
                        })
                    }
                    _this.channelData = resArry;
                });
                //所属业务部门
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSaleOrgs'+ window.suffix,
                    /*url:'http://192.168.99.24:6004/customer/getSaleOrgs',*/
                    data: {
                       /* "conditions":this.conditions,
                        "pageRequest":{
                            'pageNum':this.mypage,
                            'pageSize':this.mysize
                        },*/
                        "sortBy":{
                            'direction':"up",
                            'field':"orgName"
                        }
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
                    /*url:'http://192.168.99.24:6004/customer/getSalePersons',*/
                    data: {
                        "entity": {
                            "dtype": "销售负责人"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    console.log(res);
                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].userName,
                            value:res.data.content[items].id
                        })
                    }
                    _this.salesLeaderData = resArry;
                });
            }
        },
        created() {
            //跨router传参方式
            var _this = this;
            this.currentPage = this.$route.params.currentPage;
            /* console.log('litan',this.$route.params);*/
          /*  if(this.$route.params.oppoNum){
                this.oppoNum = this.$route.params.oppoNum;
            }*/

            //生成当前页面需要的数据字典内容
            this.makeDataDictionary();
            //马总需求


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
