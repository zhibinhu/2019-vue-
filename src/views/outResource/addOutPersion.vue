<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 0 0;padding-left: 10px;font-size: 15px;">新增/编辑外包人员</div>
            <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="120px" :rules="rules"
                     style="margin-top: 20px;margin-bottom: 20px;overflow: hidden">

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="姓名" prop="outName">
                            <el-input v-model="form.outName" placeholder="请输入" style="width: 95%" size="small" maxlength="10"  ></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="身份证号" prop="idNumber">
                            <el-input v-model="form.idNumber" placeholder="请输入" style="width: 95%" size="small" maxlength="18"  @change="checkIdNumber"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="性别" prop="outSex">
                            <el-radio-group v-model="form.outSex">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="所属供应商" prop="belongSupplier">
                            <el-select v-model="form.belongSupplier" @change="autoSupplier" clearable placeholder="请选择" clearable filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in supplierData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系方式" prop="outConnect">
                            <el-input v-model="form.outConnect" style="width: 95%" placeholder="请输入" size="small" maxlength="15"  @change="checkPhone" ></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="5" :xs="20">
                        <el-form-item label="人员单价(元/天)" prop="employSalary">
                            <el-input-number v-model="form.employSalary" placeholder="请输入" controls-position="right" maxlength="16"  style="width: 95%" size="small" @change="checkSalary" ></el-input-number>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="岗位" prop="post">
                            <el-input v-model="form.post" style="width: 95%" placeholder="请输入" maxlength="40" size="small"  ></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="职级" prop="rank">
                            <el-input v-model="form.rank" maxlength="20" placeholder="请输入" style="width: 95%" size="small" ></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row v-if="isShow">
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

                <el-row v-if="isShow">
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
                supplierData:[],
                phoneFlag:true,
                idNumberFlag:true,
                employSalaryFlag:true,
                form: {
                    outName:'',
                    idNumber:'',
                    outSex:1,
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
                isShow: false,
                flag:true,
                productLineAllArray:[],
                rules: {
                    outName: [
                        {required: true, message: '请输入姓名', trigger: 'change'}
                    ],
                    idNumber: [
                        {required: true, message: '请输入身份证号', trigger: 'change'}
                    ],
                    /*outSex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],*/
                    belongSupplier: [
                        {required: true, message: '请选择供应商', trigger: 'blur'}
                    ],
                    outConnect: [
                        {required: true, message: '请输入联系方式', trigger: 'change'}
                    ],
                    employSalary: [
                        {required: true, message: '请输入人员单价', trigger: 'change'}
                    ],
                }
            };
        },
        methods: {
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
            /**
             * 校验身份证号
             */
            checkIdNumber:function(){
                var format =  /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
                if(!format.test(this.form.idNumber)){
                    this.$notify({
                        title: '错误',
                        message: '所填身份证号有误，请重新填写',
                        type: 'warning'
                    });
                    this.idNumberFlag = false;
                    return false;
                }

                var year = this.form.idNumber.substr(6,4),//身份证年
                    month = this.form.idNumber.substr(10,2),//身份证月
                    date = this.form.idNumber.substr(12,2),//身份证日
                    time = Date.parse(month+'-'+date+'-'+year),//身份证日期时间戳date
                    now_time = Date.parse(new Date()),//当前时间戳
                    dates = (new Date(year,month,0)).getDate();//身份证当月天数
                if(time>now_time||date>dates) {
                    this.$notify({
                        title: '错误',
                        message: '所填身份证号有误，请重新填写',
                        type: 'warning'
                    });
                    this.idNumberFlag = false;
                    return false;
                }else{
                    this.idNumberFlag = true;
                    return true;
                }
            },
            /**
             * 校验联系方式
             */
            checkPhone:function(){
                var tel = /^0\d{2,3}-?\d{7,8}$/;
                var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
                if(!phone.test(this.form.outConnect) && !tel.test(this.form.outConnect)){
                    this.$notify({
                        title: '错误',
                        message: '联系方式格式不正确',
                        type: 'warning'
                    });
                    this.phoneFlag = false;
                    return false;
                }else{
                    this.phoneFlag = true;
                    return true;
                }
            },
            /**
             * 校验员工单价
             */
            checkSalary:function(){
                var reg=/^[1-9]{1}\d*(\.\d{1,9})?$/;
                var salary = this.form.employSalary;
                if(!reg.test(salary)){
                    this.$notify({
                        title: '错误',
                        message: '金额填写错误',
                        type: 'warning'
                    });
                    this.form.employSalary = "";
                    this.employSalaryFlag = false;
                    return false;

                }else{
                    this.employSalaryFlag = true;
                    return true;
                }
                this.form.employSalary = parseFloat(salary).toFixed(2);
                console.log(this.form.employSalary);
            },
            /**
             *保存
             */
            saveProjectsInfo: function () {
                var _this = this;
                _this.checkIdNumber();
                _this.checkSalary();
                _this.checkPhone();
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }else {
                        this.ruleFormOne = false;
                    }

                    if (this.ruleFormOne && this.employSalaryFlag && this.phoneFlag && this.idNumberFlag) {
                        if(this.flag==true){
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'outPersion/saveOutsourcPersion'+ window.suffix,
                                data:{
                                    "entity":{
                                        "id":this.$route.query.id,
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
                                console.log()
                                if (res.data.subCode == 0) {
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
        },
        created() {
            //跨router传参方式
            var _this = this;
            this.currentPage = this.$route.params.currentPage;
            //生成当前页面需要的数据字典内容
            this.autoSupplier();
            if(this.$route.query.id){
                var _this = this;
                _this.isShow = true;
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
                        _this.formatCreateAndModifyByFil(_this.form.createBy,"createBy");
                        _this.formatCreateAndModifyByFil(_this.form.lastmodifiedBy,"lastmodifiedBy");

                    })
                }

            }

        },
        mounted(){
            /*this.initOrg()*/
        },
        computed: {

        }
    };
</script>

<style>

</style>
