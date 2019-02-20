<template>

    <el-col :span="24" style="background-color: white">

        <div style="margin-left: 20px">
            <div style="border-bottom: 2px solid #DDE1E4;height: 35px;line-height: 35px;margin: 10px 20px 0 0;padding-left: 10px;font-size: 15px;">供应商基本信息</div>
            <el-form label-position="left" inline class="table-expand" style="padding-left: 10px">
                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="供应商名称：" prop="name">
                            <span>{{form.name}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="组织机构代码：" prop="orgCode">
                            <span>{{form.orgCode}}</span>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="服务资格：" prop="serverQualify">
                            <el-radio-group v-model="form.serverQualify">
                                <el-radio disabled="disabled" style="width: 60px" label="1">正常</el-radio>
                                <el-radio disabled="disabled" style="width: 60px" label="0">取消资格</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="类型：" prop="supplierTypeHtml">
                            <el-checkbox disabled="disabled" v-model="form.supplierTypeHtml" label="0">人员</el-checkbox>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :xs="20">
                        <el-form-item label="人员提供服务：" v-if="isPersion" prop="serverOfPersionHtml">
                            <el-checkbox-group v-model="form.serverOfPersionHtml">
                                <el-checkbox style="width: 60px" disabled="disabled" label="0">SAP顾问</el-checkbox>
                                <el-checkbox style="width: 60px" disabled="disabled" label="1">软件开发</el-checkbox>
                                <el-checkbox style="width: 60px" disabled="disabled" label="2">测试</el-checkbox>
                                <el-checkbox style="width: 60px" disabled="disabled" label="3">其他</el-checkbox>
                                <el-input v-model="form.serverOfPersionOther" disabled="" v-bind:title="form.serverOfPersionOther" style="width: 30%" size="small"   maxlength="50" ></el-input>
                                <!--<input>{{form.serverOfPersionOther}}</input>-->
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="  " prop="supplierTypeHtml">
                            <el-checkbox v-model="form.supplierTypeHtml" disabled="disabled" label="1">任务</el-checkbox>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :xs="20">
                        <el-form-item label="任务提供服务：" v-if="isTask" prop="serverOfTask">
                            <span>{{form.serverOfTask}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系人：" prop="contacts">
                            <span>{{form.contacts}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系电话：" prop="mobile">
                            <span>{{form.mobile}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱：" prop="email">
                            <span>{{form.email}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系人2：" prop="contacts2">
                            <span>{{form.contacts2}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="联系电话2：" prop="mobile2">
                            <span>{{form.mobile2}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" :xs="20">
                        <el-form-item label="邮箱2：" prop="email2">
                            <span>{{form.email2}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                  <!--  <el-col :span="8" :xs="20">
                        <el-form-item label="地址：" prop="cityCode">
                            <span>{{form.cityCode}}</span>
                        </el-form-item>
                    </el-col>-->

                    <el-col :span="15" :xs="20">
                        <el-form-item label="地址：" prop="address">
                            <span>{{form.address}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row >
                    <el-col :span="8" :xs="20">
                        <el-form-item label="创建人：" prop="createBy">
                            <span>{{form.createBy}}</span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="创建时间：" prop="createTime">
                            <span>{{form.createTime}}</span>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row >
                    <el-col :span="8" :xs="20">
                        <el-form-item label="修改人：" prop="lastmodifiedBy">
                            {{form.lastmodifiedBy}}
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="修改时间：" prop="lastmodifiedTime">
                            {{form.lastmodifiedTime}}
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :xs="20">
                        <el-form-item label="备注：" prop="memo">
                            {{form.memo}}
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>

            <el-col :span="24" :offset="10">
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
                isPersion:false,
                isTask:false,
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
                    createTime:'',
                    lastmodifiedTime:'',
                    createBy:'',
                    lastmodifiedBy:''

                },
                isShow: false,
                flag:true,
                productLineAllArray:[],
                rules: {

                }
            };
        },
        methods: {
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'listSupplier',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            },
            formatCreateAndModifyByFil(value,result){
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
                        username = res.data.rows[0].cname;
                        this.form[result]=username;
                    });
                }else{
                    this.form[result]=username;
                }
            }
        },
        created() {
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
                    _this.form.mobile2 = res.data.rows[0].mobile2
                    _this.form.email2 = res.data.rows[0].email2;
                    _this.form.cityCode = res.data.rows[0].cityCode;
                    _this.form.address = res.data.rows[0].address;
                    _this.form.memo = res.data.rows[0].memo;
                    _this.form.createTime = res.data.rows[0].createTime;
                    _this.form.lastmodifiedTime = res.data.rows[0].lastmodifiedTime;
                    _this.form.createBy = res.data.rows[0].createBy;
                    _this.form.lastmodifiedBy = res.data.rows[0].lastmodifiedBy;

                    _this.formatCreateAndModifyByFil(_this.form.createBy,'createBy');
                    _this.formatCreateAndModifyByFil(_this.form.lastmodifiedBy,'lastmodifiedBy');

                    if(_this.form.supplierType != null && _this.form.supplierType != ""){
                        _this.form.supplierTypeHtml = _this.form.supplierType.split(",");
                        if(_this.form.supplierTypeHtml.length  != "") {
                            if (_this.form.supplierTypeHtml[0] == 0 && _this.form.supplierTypeHtml.length == 1) {
                                this.isPersion = true;
                                this.isTask = false;
                            } else if (_this.form.supplierTypeHtml[0] == 1 && _this.form.supplierTypeHtml.length == 1) {
                                this.isTask = true;
                                this.isPersion = false;
                            } else if (_this.form.supplierTypeHtml.length == 2) {
                                this.isPersion = true;
                                this.isTask = true;
                            }
                        }else{
                            this.isPersion = false;
                            this.isTask = false;
                        }
                    }
                    if(_this.form.serverOfPersion != null && _this.form.serverOfPersion != ""){
                        _this.form.serverOfPersionHtml = _this.form.serverOfPersion.split(",");
                    }
                    console.log('_this.form-----', _this.form)

                    console.log('_this.form.supplierTypeHtml-----',_this.form.supplierTypeHtml)

                })
            }
        },
        mounted(){
            /*this.initOrg()*/
        },
        watch: {

        },
        computed: {
            contractAmount: {
                set: function (val) {

                    this.form.contractAmount = val * 1000
                },
                get: function (val) {

                    return this.form.contractAmount / 1000
                }
            },
        }
    };
</script>
<style>
    .table-expand {
        font-size: 0;
    }

    .table-expand label {
        width: 120px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>
