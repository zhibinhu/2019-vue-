<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">


            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 50px;margin-bottom: 20px">

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="渠道名称" prop="channelName">
                            <el-input v-model="form.channelName" placeholder="请输入" style="width: 95%" size="small" @blur="checkDuplicateChannel"></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="行业" prop="channelIndustry">
                            <el-select v-model="form.channelIndustry" placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in channelIndustryData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="类型" prop="channelType">
                            <el-select v-model="form.channelType" placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in channelTypeData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="销售负责人" prop="salesLeader">
                            <el-select v-model="form.salesLeader" placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
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
                        <el-form-item label="部门" prop="salesDepartment">
                            <el-select v-model="form.salesDepartment" placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
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
                        <el-form-item label="状态" prop="status">
                            <el-radio-group v-model="form.status">
                                <el-radio :label="true">激活</el-radio>
                                <el-radio :label="false">停用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="渠道主要联系人" prop="primaryContact">
                            <el-input v-model="form.primaryContact" placeholder="请输入" style="width: 95%" size="small"></el-input>
                        </el-form-item>

                    </el-col>


                    <el-col :span="8" :xs="20">
                        <el-form-item label="电话" prop="telephone">
                            <el-input v-model="form.telephone" style="width: 95%" placeholder="请输入" size="small" @blur="checkPhone(form.telephone)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="传真">
                            <el-input v-model="form.fax" style="width: 95%" placeholder="请输入" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="网站">
                            <el-input v-model="form.site" style="width: 95%" placeholder="请输入" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="电子邮件" prop="email">
                            <el-input v-model="form.email" style="width: 95%" placeholder="请输入" size="small"  @blur="chenckEmail(form.email)"></el-input>
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
                </el-row>
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
                oppoNum: '创建商机后自动生成',
                industryData:[],
                projectStageData:[],
                winRateData:[],
                orgCodeData: [],
                customerIdData: [],
                pdIdData: [],
                saleIdData: [],
                projectDirectorData:[],
                pmoIdData:[],
                preMangerIdData:[],
                salesLeaderData:[],
                channelIndustryData:[],
                channelTypeData:[],
                salesDepartmentData:[],
                channelIdData:[],
                form: {
                    channelName:'',
                    channelIndustry:'',
                    channelType:'',
                    salesLeader:'',
                    salesDepartment:"",
                    status:true,
                    primaryContact:'',
                    telephone:'',
                    fax:'',
                    site:'',
                    email:'',
                    memo:''
                },
                isShow: false,
                repeatStatus:'',
                rules: {
                    channelName: [
                        {required: true, message: '请输入渠道名称', trigger: 'change'}
                    ],
                    channelIndustry: [
                        {required: true, message: '请选择渠道行业', trigger: 'blur'}
                    ],
                    channelType: [
                        {required: true, message: '请输入渠道类型', trigger: 'change'}
                    ],
                    salesLeader: [
                        {required: true, message: '请选择销售负责人', trigger: 'blur'}
                    ],
                    salesDepartment: [
                        {required: true, message: '请选择销售负责部门', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'blur'}
                    ],
                    primaryContact: [
                        {required: true, message: '请输入主要联系人', trigger: 'change'}
                    ],
                    telephone: [
                        {required: true, message: '请输入主要联系人电话', trigger: 'change'}
                    ],
                    email: [
                        {required: true, message: '请输入主要联系人电子邮箱', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            checkDuplicateChannel(){
                var _this = this;
                if(_this.form.channelName){
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'masterdata/channel/checkDuplicateChannel'+ window.suffix,
                        data: {
                                "entity":_this.form.channelName
                        }
                    }).then(res => {
                        //成功回调方法
                        _this.repeatStatus=res.data.status;
                        if(res.data.status=="error"){
                            _this.$notify({
                                title: '警告',
                                message: '渠道名称重复，请重新输入！',
                                type: 'warning'
                            });
                        }
                    });
                }
            },
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
            saveProjectsInfo: function () {
                var _this = this;
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }else {
                        this.ruleFormOne = false;
                    }
/*
                    this.$refs['ruleFormTwo'].validate((valid) => {
                        if (valid) {
                            this.ruleFormTwo = true
                        }else {
                            this.ruleFormTwo = false;
                        }
                    });
                    this.$refs['ruleFormThree'].validate((valid) => {
                        if (valid) {
                            this.ruleFormThree = true
                        }else {
                            this.ruleFormThree = false;
                        }
                    });
                    this.$refs['ruleFormFour'].validate((valid) => {
                        if (valid) {
                            this.ruleFormFour = true
                        }else {
                            this.ruleFormFour = false;
                        }
                    });*/
                    if(_this.form.status==true){
                        _this.form.status="Y"
                    }else if(_this.form.status==false){
                        _this.form.status="N"
                    }
                    console.log("所属行业：",_this.form.channelIndustry);
                    console.log("所属业务部门：",_this.form.salesDepartment);
                    console.log("销售负责人：",_this.form.salesLeader);
                    console.log("状态：",_this.form.status);

                    if (this.ruleFormOne) {
                        if(_this.repeatStatus=="ok"){
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'masterdata/channel/save'+ window.suffix,
                                /*url:'http://192.168.99.24:6004/channel/save',*/
                                data:{
                                    "entity":{
                                        "channelName":_this.form.channelName,
                                        "channelIndustry":_this.form.channelIndustry,
                                        "channelType":_this.form.channelType,
                                        "salesLeader":_this.form.salesLeader,
                                        "salesDepartment":_this.form.salesDepartment,
                                        "status":_this.form.status,
                                        "primaryContact": _this.form.primaryContact,
                                        "telephone": _this.form.telephone,
                                        "businessDepartment": _this.form.businessDepartment,
                                        "fax": _this.form.fax,
                                        "site": _this.form.site,
                                        "email": _this.form.email,
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
                                    name: 'customerInforManage/channelInfor',
                                    params:{
                                        currentPage:_this.currentPage
                                    }
                                });
                            })
                        }else{
                            _this.$notify({
                                title: '警告',
                                message: '渠道名称重复，请重新输入！',
                                type: 'warning'
                            });
                        }


                    }/*else {
                            this.$notify({
                                title: '警告',
                                message: '不能提交，项目结束时间早于项目开始时间！',
                                type: 'warning'
                            });
                    }*/

                });
            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'customerInforManage/channelInfor',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            },
            makeDataDictionary:function () {
                //行业
                var _this=this;
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
                    _this.channelIndustryData = resArry;
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
                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].userName,
                            value:res.data.content[items].id
                        })
                    }
                    _this.salesLeaderData = resArry;
                    console.log(_this.salesLeaderData)
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
            /* console.log('litan',this.$route.params);*/
            if(this.$route.params.oppoNum){
                this.oppoNum = this.$route.params.oppoNum;
            }
            //生成当前页面需要的数据字典内容
            this.makeDataDictionary();
            //马总需求
          /*  this.form.status = '进行中';*/

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
