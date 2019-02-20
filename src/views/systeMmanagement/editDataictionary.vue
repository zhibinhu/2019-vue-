<style lang="less">
    input{
        font-size: 11px;
    }
</style>

<template>


    <el-col :span="24" style="background-color: white" >

      <!--  <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
            修改数据字典类型
        </h2>-->

        <el-col :span="10" :offset="6">
            <el-form ref="ruleForm" :model="form" :rulers="rulers" label-width="80px" style="margin-top: 25px">

                <el-form-item label="字典键值" >
                    <font color="red" style="margin-left: -10px">*</font>

                    <el-input v-model="form.dkey"></el-input>
                </el-form-item>

                <el-form-item label="字典类型">
                    <font color="red" style="margin-left: -10px">*</font>

                    <el-input v-model="form.dtype"></el-input>
                </el-form-item>

                <el-form-item label="字典数据">
                    <font color="red" style="margin-left: -10px">*</font>

                    <el-input v-model="form.dvalue"></el-input>
                </el-form-item>


                <!-- <el-form-item label="系统字典">
                     <font color="red" style="margin-left: -10px">*</font>

                     <el-radio v-model="radio" label="1">是</el-radio>
                     <el-radio v-model="radio" label="2">否</el-radio>
                 </el-form-item>-->



                <el-form-item label="备注信息">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="form.memo">
                    </el-input>
                </el-form-item>



            </el-form>

        </el-col>

        <el-col :span="24" :offset="10">
            <el-button @click="saveDicInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px" >提交</el-button>
            <el-button @click="search()"  style="margin-top: 20px;margin-bottom: 10px" >取消</el-button>

        </el-col>

    </el-col>
</template>

<script>

    export default {
        components: {
        },
        data() {
            return {
                form:{
                    dkey:'',
                    dtype:'',
                    dvalue:'',
                    memo:''
                },
                rulers: {
                    dkey: [
                        {required: true, message: '请输入字典键值', trigger: 'blur'}
                    ],
                    dtype: [
                        {required: true, message: '请输入字典类型', trigger: 'blur'}
                    ],
                    dvalue: [
                        {required: true, message: '请输入字典值', trigger: 'blur'}
                    ],
                    memo: [
                        {required: false}
                    ],
                }
            }
        },
        methods: {
            dicInformation:function(){
                this.form.dkey=this.$route.params.dkey;
                this.form.dtype=this.$route.params.dtype;
                this.form.dvalue=this.$route.params.dvalue;
                this.form.memo=this.$route.params.memo;
            },
            saveDicInfo: function () {
                var _this = this;
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.ruleForm = true;
                    }
                    if (this.ruleForm) {
                        this.$myHttp({
                            method: 'POST',
                            url: "http://192.168.99.90:6003/config/sysDictionaries",
                            data: _this.form,
                            /* "pageNum": 0,
                             "pageSize": 1000*/
                        }).then(res => {
                            //成功回调方法
                            _this.$notify({
                                title: '成功',
                                message: '保存成功',
                                type: 'success'
                            });
                            _this.$router.push({
                                name: 'dataictionaryList'
                            });
                        })

                    }
                });
            },

        },
        mounted() {
            this.dicInformation();
        }
    };
</script>

<style>

</style>
