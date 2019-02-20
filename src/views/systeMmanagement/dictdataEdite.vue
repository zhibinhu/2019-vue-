<style lang="less">
    input{
        font-size: 11px;
    }
</style>

<template>


    <el-col :span="24" style="background-color: white" >

        <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
            编辑字典数据（sys_area_type）
        </h2>

        <el-col :span="10" :offset="6" style="clear: both">
            <el-form ref="form" :model="form" label-width="80px">
                <h2 :span="24" style="clear: both"><el-tag type="success" style="margin-bottom: 10px">基本信息</el-tag></h2>

                <el-form-item label="上级字典">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="字典标签">
                    <font color="red" style="margin-left: -10px">*</font>

                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="字典键值">
                    <font color="red" style="margin-left: -10px">*</font>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="排序号">
                    <font color="red" style="margin-left: -10px">*</font>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>


                <el-form-item label="系统内置">
                    <font color="red" style="margin-left: -10px">*</font>

                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否</el-radio>
                </el-form-item>



                <el-form-item label="字典描述">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="textarea3">
                    </el-input>
                </el-form-item>

        <h2  style="clear: both"><el-tag type="success" style="margin-bottom: 10px">其他信息</el-tag></h2>
                <el-form-item label="备注信息">
                    <font color="red" style="margin-left: -10px">*</font>

                    <el-input v-model="form.name" type="textarea"></el-input>
                </el-form-item>
            </el-form>

        </el-col>

        <el-col :span="24" :offset="10">
            <el-button @click="saveProjectsInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px" >提交</el-button>
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
                    name:''
                },
                radio: '1',
                textarea3: ''
            };
        },
        methods: {


        },
        created() {

        }
    };
</script>

<style>
    el-tag{clear: both}
</style>
