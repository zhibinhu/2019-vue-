<template>
    <el-col :span="24" style="background-color: white" >

        <h2 style="margin-top: 10px;margin-left: 10px;margin-bottom: 15px">
            流程模块
        </h2>

        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" style="margin-top: 20px;margin-bottom: 20px" class="demo-ruleForm">
            <el-col :span="8" :xs="20" >
                <el-form-item label="流程模块" prop="activate_flag">
                    <el-input v-model="ruleForm.activate_flag" style="width: 80%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20" >
                <el-form-item label="委托人" prop="consigner">
                    <el-input v-model="ruleForm.consigner" style="width: 90%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20" >
                <el-form-item label="	受委托人" prop="mandatary">
                    <el-input v-model="ruleForm.mandatary" style="width: 80%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20" >
                <el-form-item label="委托运行标志" prop="mandatary">
                    <el-input v-model="ruleForm.proc_def_key" style="width: 80%" size="small"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20" >
                <el-form-item label="委托开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.begin_date" style="width: 80%;" size="small"></el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20" >
                <el-form-item label="	委托结束时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.end_date" style="width: 80%;" size="small"></el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="8" :offset="7"><el-form-item>
                <el-button @click="submitForm('ruleForm')" type="primary" style="margin-top: 20px;margin-bottom: 10px" round size="small">提交</el-button>
                <el-button @click="close()"  style="margin-top: 20px;margin-bottom: 10px" round size="small">取消</el-button></el-form-item>
            </el-col>

        </el-form>
    </el-col>
</template>

<script>
    export default {
        name: "addEntrustProcess",
        data() {
            return {
                ruleForm: {
                    activate_flag: '',
                    consigner:'',
                    mandatary:'',
                    begin_date:'',
                    end_date:'',
                    proc_def_key:''
                },
                rules: {
                    activate_flag: [
                        { required: true, message: '请输入流程编码', trigger: 'change' }
                    ],
                    consigner: [
                        { required: true, message: '请输入委托人', trigger: 'change' }
                    ],
                    mandatary: [
                        { required: true, message: '请输入受委托人', trigger: 'change' }
                    ],
                    proc_def_key: [
                        { required: true, message: '请输入运行标志', trigger: 'change' }
                    ]
                },
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveProjectsInfo();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            saveProjectsInfo() {
                var _this = this;
                console.log('提交的数据：',this.ruleForm);
                var param = {};
                this.$myHttp({
                    method: 'POST',
                    url: this.permissionPrefixWork+'/microarch/activiti/delegate/save',
                    data: {'entity': this.ruleForm}
                }).then(res => {
                    this.$router.push({
                        name: 'workFlow/entrustProcessList'
                    });
                    this.$message({
                        showClose: true,
                        message: '保存成功！',
                        type: 'success'
                    });
                })
            },
            close:function () {
                this.$router.push({
                    name: 'workFlow/entrustProcessList'
                });
            }
        }



    }
</script>

<style scoped>

</style>