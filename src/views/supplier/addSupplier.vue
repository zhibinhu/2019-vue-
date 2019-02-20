<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 0 0;padding-left: 10px;font-size: 15px;">新增供应商</div>
            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" class="demo-form-inline" label-width="120px" :rules="rules"
                     style="margin-top: 20px;margin-bottom: 20px;overflow: hidden">
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="供应商名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入" style="width: 95%"  maxlength="50"  size="small"  ></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="组织机构代码" prop="orgCode">
                            <el-input v-model="form.orgCode" placeholder="请输入" style="width: 95%" size="small"  maxlength="9"  @change="checkOrgCode"></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="服务资格" prop="serverQualify">
                            <div class="grid-content">
                            <el-radio-group v-model="form.serverQualify"  placeholder="请选择">
                                <el-radio style="width: 60px" :label="1">正常</el-radio>
                                <el-radio style="width: 60px" :label="0">取消资格</el-radio>
                            </el-radio-group>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="类型" prop="supplierTypeHtml">
                            <el-checkbox v-model="form.supplierTypeHtml" placeholder="请输入" :label="0" @change="pushRules(form.supplierTypeHtml)">人员</el-checkbox>
                        </el-form-item>
                    </el-col>

                    <el-col :span="14" :xs="20" v-if="isPersion">
                        <el-form-item label="人员提供服务" prop="serverOfPersionHtml">
                            <el-checkbox-group v-model="form.serverOfPersionHtml" ref="checkBox">
                                <el-checkbox style="width: 60px" :label="0">SAP顾问</el-checkbox>
                                <el-checkbox style="width: 60px" :label="1">软件开发</el-checkbox>
                                <el-checkbox style="width: 60px" :label="2">测试</el-checkbox>
                                <el-checkbox style="width: 60px" :label="3" @change="serverOfPersionOther()">其他</el-checkbox>
                                <el-input v-if="persionOther" v-model="form.serverOfPersionOther" placeholder="请输入" style="width: 30%" size="small"></el-input>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="" prop="supplierTypeHtml" >
                            <el-checkbox v-model="form.supplierTypeHtml" :label="1" @change="pushRules(form.supplierTypeHtml)">任务</el-checkbox>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :xs="20" v-if="isTask">
                        <el-form-item label="任务提供服务" prop="serverOfTask">
                            <el-input v-model="form.serverOfTask" placeholder="请输入" style="width: 100%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系人" prop="contacts">
                            <el-input v-model="form.contacts" placeholder="请输入" style="width: 95%"  maxlength="10"  size="small"  ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系电话" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="请输入" style="width: 95%"  maxlength="15"  size="small" @blur="checkPhone(form.mobile)"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" placeholder="请输入" style="width: 95%" size="small"  maxlength="50"   @blur="chenckEmail(form.email)" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系人2" prop="contacts2">
                            <el-input v-model="form.contacts2" placeholder="请输入" style="width: 95%" size="small"  maxlength="10"   ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系电话2" prop="mobile2">
                            <el-input v-model="form.mobile2" placeholder="请输入" style="width: 95%" size="small"  maxlength="15"  @blur="checkPhone(form.mobile2)" ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱2" prop="email2">
                            <el-input v-model="form.email2" placeholder="请输入" style="width: 95%" size="small"  maxlength="50"  @blur="chenckEmail(form.email2)"></el-input>
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
                            <el-input v-model="form.address" placeholder="请输入" style="width: 95%"  maxlength="100"  size="small"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="备注" prop="memo">
                            <el-input v-model="form.memo" placeholder="请输入内容" style="width: 900px;" type="textarea"  maxlength="250"  :rows="5" ></el-input>
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
                    reserve3:''
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
                _this.form.supplierType =_this.form.supplierType.substring(0,_this.form.supplierType.length - 1)
                _this.form.reserve3 = _this.form.supplierType.substring(0,_this.form.supplierType.length - 1);
                _this.form.serverOfPersion = "";
                for(var i = 0; i < _this.form.serverOfPersionHtml.length; i++){
                    _this.form.serverOfPersion += _this.form.serverOfPersionHtml[i] + ",";
                    if( _this.form.serverOfPersionHtml[i] == 3){
                        if(this.form.serverOfPersionOther == "") {
                            _this.$notify({
                                title: '提示',
                                message: '请输入其他内容',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                }

                _this.form.serverOfPersion = _this.form.serverOfPersion.substring(0,_this.form.serverOfPersion.length - 1)
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
                                        "id":_this.form.id,
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
            //校验组织机构编码
            checkOrgCode:function(){
                var b = /^[0-9a-zA-Z]{9}$/g;
                if(!b.test(this.form.orgCode)){
                    this.$notify({
                        title: '错误',
                        message: '组织机构代码只能输入9位数字或字母，请重新输入',
                        type: 'error'
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
            makeDataDictionary:function () {

            },
            serverOfPersionOther:function(event){

                console.log(this.form.serverOfPersionHtml)
               console.log(this.form.serverOfPersionHtml.filter(o => o == '3').length > 0)


                if( this.form.serverOfPersionHtml.filter(o => o == '3').length > 0){
                    this.persionOther = true;
                }else{
                    this.persionOther = false;
                }
            }
        },
        created() {
            //跨router传参方式
            this.currentPage = this.$route.params.currentPage;
            //生成当前页面需要的数据字典内容
            this.makeDataDictionary();
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

<style scoped>
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

</style>
