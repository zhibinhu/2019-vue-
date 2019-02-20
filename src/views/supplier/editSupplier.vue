<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 0 0;padding-left: 10px;font-size: 15px;">编辑供应商</div>
            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 20px;margin-bottom: 20px;overflow: hidden">

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="供应商名称" prop="name">
                            <el-input v-model="form.name" style="width: 95%" size="small"   maxlength="50" ></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="组织机构代码" prop="orgCode">
                            <el-input v-model="form.orgCode" style="width: 95%" size="small"  maxlength="9"  @change="checkOrgCode"></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="服务资格" prop="serverQualify">
                            <el-radio-group v-model="form.serverQualify">
                                <el-radio style="width: 60px" label="1">正常</el-radio>
                                <el-radio style="width: 60px" label="0">取消资格</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="类型" prop="supplierTypeHtml">
                            <el-checkbox v-model="form.supplierTypeHtml" label="0" @change="pushRules(form.supplierTypeHtml)">人员</el-checkbox>
                        </el-form-item>
                    </el-col>

                    <el-col v-if="isPersion" :span="14" :xs="20">
                        <el-form-item label="人员提供服务" prop="serverOfPersionHtml">
                            <el-checkbox-group v-model="form.serverOfPersionHtml">
                                <el-checkbox style="width: 60px" label="0">SAP顾问</el-checkbox>
                                <el-checkbox style="width: 60px" label="1">软件开发</el-checkbox>
                                <el-checkbox style="width: 60px" label="2">测试</el-checkbox>
                                <el-checkbox style="width: 60px" label="3" @change="serverOfPersionOther()">其他</el-checkbox>
                                <el-input v-if="persionOther" v-model="form.serverOfPersionOther" style="width: 30%" size="small"></el-input>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="" prop="supplierTypeHtml">
                            <el-checkbox v-model="form.supplierTypeHtml" label="1" @change="pushRules(form.supplierTypeHtml)">任务</el-checkbox>
                        </el-form-item>
                    </el-col>

                    <el-col v-if="isTask" :span="10" :xs="20">
                        <el-form-item label="任务提供服务" prop="serverOfTask">
                            <el-input v-model="form.serverOfTask" style="width: 100%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系人" prop="contacts">
                            <el-input v-model="form.contacts" style="width: 95%" size="small"  maxlength="10"  ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系电话" prop="mobile">
                            <el-input v-model="form.mobile" style="width: 95%" size="small"  maxlength="15"  @blur="checkPhone(form.mobile)"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" style="width: 95%" size="small"  maxlength="50"   @blur="chenckEmail(form.email)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系人2" prop="contacts2">
                            <el-input v-model="form.contacts2" style="width: 95%" size="small"  maxlength="10"  ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系电话2" prop="mobile2">
                            <el-input v-model="form.mobile2" style="width: 95%" size="small"  maxlength="15"  @blur="checkPhone(form.mobile2)"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱2" prop="email2">
                            <el-input v-model="form.email2" style="width: 95%" size="small"   maxlength="50"  @blur="chenckEmail(form.email2)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                   <!-- <el-col :span="8" :xs="20">
                        <el-form-item label="地址" prop="cityCode">
                            <el-select v-model="form.cityCode" placeholder="请选择" clearable filterable size="small" style="width: 90%">
                                <el-option label="上海" value="shanghai"></el-option>
                                <el-option label="北京" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>-->

                    <el-col :span="15" :xs="20">
                        <el-form-item label="地址" prop="address">
                            <el-input v-model="form.address" style="width: 95%" size="small"  maxlength="100"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="备注" prop="memo">
                            <el-input v-model="form.memo" style="width: 900px;" type="textarea" maxlength="150" :rows="5" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="创建人" prop="createBy">
                            {{form.createBy}}
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="创建时间" prop="createTime">
                            {{form.createTime}}
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="修改人" prop="lastmodifiedBy">
                            {{form.lastmodifiedBy}}
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="修改时间" prop="lastmodifiedTime">
                            {{form.lastmodifiedTime}}
                        </el-form-item>

                    </el-col>
                </el-row>


            </el-form>

            <el-col :span="24" :offset="10">
                <el-button @click="saveProjectsInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px">保存
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
                phoneFlag:true,
                emailFlag:true,
                orgCodeFlag:true,
                isPersion:false,
                isTask:false,
                persionOther:false,
                form: {
                    id:'',
                    name:'',
                    orgCode:'',
                    serverQualify:1,
                    supplierTypeHtml:[],
                    supplierType:'',
                    serverOfPersionHtml:[],
                    serverOfPersion:'',
                    serverOfPersionOther:'',
                    serverOfTask:'',
                    contacts:'',
                    mobile:'',
                    email:'',
                    contacts2:'',
                    mobile2:'',
                    email2:'',
                    cityCode:'',
                    address:'',
                    memo:'',
                },
                isShow: false,
                flag:true,
                productLineAllArray:[],
                rules: {
                    name: [
                        {required: true, message: '请输入供应商名称', trigger: 'change'}
                    ],
                    orgCode: [
                        {required: true, message: '请输入组织机构代码', trigger: 'change'}
                    ],
                    serverQualify: [
                        {required: true, message: '请选择服务资格', trigger: 'change'}
                    ],
                    supplierTypeHtml: [
                        {required: true, message: '请选择类型', trigger: 'change'}
                    ],
                    contacts: [
                        {required: true, message: '请输入联系人', trigger: 'change'}
                    ],
                    mobile: [
                        {required: true, message: '请输入电话', trigger: 'change'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'change'}
                    ],
                }
            };
        },
        methods: {
            /**
             *保存
             */
            saveProjectsInfo: function () {
                var _this = this;
                _this.form.supplierType = "";
                for(var i = 0; i < _this.form.supplierTypeHtml.length; i++){
                    _this.form.supplierType += _this.form.supplierTypeHtml[i] + ",";

                }
                _this.form.reserve3 = _this.form.supplierType.substring(0,_this.form.supplierType.length - 1);
                _this.form.serverOfPersion = "";
                for(var i = 0; i < _this.form.serverOfPersionHtml.length; i++){
                    _this.form.serverOfPersion += _this.form.serverOfPersionHtml[i] + ",";
                }
                _this.form.supplierType =_this.form.supplierType.substring(0,_this.form.supplierType.length - 1);
                _this.form.serverOfPersion = _this.form.serverOfPersion.substring(0,_this.form.serverOfPersion.length - 1);
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }else {
                        this.ruleFormOne = false;
                    }

                    if (this.ruleFormOne) {
                        if(this.flag==true && this.orgCodeFlag && this.phoneFlag && this.emailFlag){
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'supplier/saveSupplier'+ window.suffix,
                                data:{
                                    "entity":{
                                        "id":this.$route.query.id,
                                        "name":_this.form.name,
                                        "orgCode":_this.form.orgCode,
                                        "serverQualify":_this.form.serverQualify,
                                        "supplierType":_this.form.supplierType,
                                        "serverOfPersion":_this.form.serverOfPersion,
                                        "serverOfPersionOther":_this.form.serverOfPersionOther,
                                        "serverOfTask":_this.form.serverOfTask,
                                        "contacts":_this.form.contacts,
                                        "mobile":_this.form.mobile,
                                        "email":_this.form.email,
                                        "contacts2":_this.form.contacts2,
                                        "mobile2":_this.form.mobile2,
                                        "email2":_this.form.email2,
                                        "cityCode":_this.form.cityCode,
                                        "address":_this.form.address,
                                        "memo":_this.form.memo
                                    }
                                }
                            }).then(res => {
                                if (res.data.subCode == 0) {
                                    //成功回调方法
                                    _this.$notify({
                                        title: '成功',
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                    _this.$router.push({
                                        name: 'listSupplier',
                                        params:{
                                            currentPage:_this.currentPage
                                        }
                                    });
                                }else {
                                    _this.$notify({
                                        title: '警告',
                                        message: res.data.subMsg,
                                        type: 'warning'
                                    });

                                }
                            })
                        }else{
                            this.$notify({
                                title: '警告',
                                message: '数据填写错误，请重新填写',
                                type: 'warning'
                            });
                        }


                    }
                });
            },
            //校验祖师机构编码
            checkOrgCode:function(){
                var b = /^[0-9a-zA-Z]{9}$/g;
                if(!b.test(this.form.orgCode)){
                    this.$notify({
                        title: '错误',
                        message: '组织机构代码只能输入9位数字或字母，请重新输入',
                        type: 'warning'
                    });
                    this.orgCodeFlag = false;
                }else{
                    this.orgCodeFlag = true;
                }
            },

            /**
             * 校验联系方式
             */
            checkPhone:function(event){
                var tel = /^0\d{2,3}-?\d{7,8}$/;
                var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
                if(!phone.test(event) && !tel.test(event) && event != ""){
                    this.$notify({
                        title: '错误',
                        message: '联系方式格式不正确',
                        type: 'warning'
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
                if(!mailReg.test(event) && event !=""){
                    this.$notify({
                        title: '错误',
                        message: '邮箱格式不正确',
                        type: 'warning'
                    });
                    this.emailFlag = false;
                }else{
                    this.emailFlag = true;
                }
            },
            /**
             * 校验类型
             */
            pushRules:function(event){
                if(event.length  != "") {
                    if (event[0] == 0 && event.length == 1) {
                        this.isPersion = true;
                        this.isTask = false;
                        this.rules.serverOfPersionHtml = {required: true, message: '请选择人员提供服务', trigger: 'change'};
                    } else if (event[0] == 1 && event.length == 1) {
                        this.isTask = true;
                        this.isPersion = false;
                        this.rules.serverOfTask = {required: true, message: '请输入任务提供服务', trigger: 'change'}
                    } else if (event.length == 2) {
                        this.isPersion = true;
                        this.isTask = true;
                        this.rules.serverOfPersionHtml = {required: true, message: '请选择人员提供服务', trigger: 'change'};
                        this.rules.serverOfTask = {required: true, message: '请输入任务提供服务', trigger: 'change'}
                    }
                }else{
                    this.isPersion = false;
                    this.isTask = false;
                }
            },

            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'listSupplier',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            },
            formatCreateAndModifyByFil(value,target){
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
                        this.form[target] = res.data.rows[0].cname;
                        //return username;
                    });
                }else{
                    this.form[target] = username;
                    console.log(this.form);
                    //return username;
                }
            },
            serverOfPersionOther:function(event){
                if( this.form.serverOfPersionHtml.filter(o => o == '3').length > 0){
                    this.persionOther = true;
                }else{
                    this.persionOther = false;
                }
            }
        },
        created() {
            //跨router传参方式
            var _this = this;
            this.currentPage = this.$route.params.currentPage;
            if(this.$route.query.id) {
                var _this = this;
                this.currentPage = this.$route.query.currentPage;
                if (this.$route.query.id) {
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'supplier/getSupplierList' + window.suffix,
                        data: {
                            "entity": {
                                "id": _this.$route.query.id
                            }
                        }
                    }).then(res => {
                        //成功回调方法
                        // _this.form = res.data.rows[0];
                        _this.form.id = res.data.rows[0].id;
                        _this.form.name = res.data.rows[0].name;
                        _this.form.orgCode = res.data.rows[0].orgCode;
                        _this.form.serverQualify = res.data.rows[0].serverQualify;
                        _this.form.supplierType = res.data.rows[0].supplierType;
                        _this.form.serverOfPersion = res.data.rows[0].serverOfPersion;
                        _this.form.serverOfPersionOther = res.data.rows[0].serverOfPersionOther;
                        _this.form.serverOfTask = res.data.rows[0].serverOfTask;
                        _this.form.contacts = res.data.rows[0].contacts;
                        _this.form.mobile = res.data.rows[0].mobile;
                        _this.form.email = res.data.rows[0].email;
                        _this.form.contacts2 = res.data.rows[0].contacts2;
                        _this.form.mobile2 = res.data.rows[0].mobile2;
                        _this.form.email2 = res.data.rows[0].email2;
                        _this.form.cityCode = res.data.rows[0].cityCode;
                        _this.form.address = res.data.rows[0].address;
                        _this.form.memo = res.data.rows[0].memo;
                        _this.form.createTime = res.data.rows[0].createTime;
                        _this.form.lastmodifiedTime = res.data.rows[0].lastmodifiedTime;
                        _this.form.createBy = res.data.rows[0].createBy;
                        _this.form.lastmodifiedBy = res.data.rows[0].lastmodifiedBy;
                        _this.formatCreateAndModifyByFil(_this.form.createBy,"createBy");
                        _this.formatCreateAndModifyByFil(_this.form.lastmodifiedBy,"lastmodifiedBy");
                        _this.form.supplierTypeHtml = _this.form.supplierType.split(",");
                        _this.form.serverOfPersionHtml = _this.form.serverOfPersion.split(",");
                        console.log('_this.form.supplierTypeHtml-----',_this.form.supplierTypeHtml)
                        this.pushRules(_this.form.supplierTypeHtml);
                        this.serverOfPersionOther();

                    })
                }
            }

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
