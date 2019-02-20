<template>
    <div>
        <el-tag>查看立项信息</el-tag><br/><br/>
        <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="10">
                <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label="拟稿人">
                        <el-input v-model="form.draftPerson" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label="拟稿部门" :span="12">
                        <el-input v-model="form.draftDepartment" placeholder="自动带出" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label="拟稿时间" >
                       <!-- <el-date-picker type="date" placeholder="选择日期" v-model="form.draftTime" style="width: 100%;"  disabled="true"></el-date-picker>-->

                        <el-input v-model="form.draftTime" placeholder="自动带出" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label="项目编号">
                        <el-input v-model="form.projectNum" placeholder="自动生成" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label="项目名称">
                        <el-input v-model="form.projectName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label="项目状态">
                        <el-select v-model="form.projectState" placeholder="项目状态" :disabled="true">
                            <el-option label="已立项" value="已立项"></el-option>
                            <el-option label="立项中" value="立项中"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label="项目类型">
                        <el-select v-model="form.projectType" placeholder="项目类型" :disabled="true">
                            <el-option label="内部项目" value="内部项目"></el-option>
                            <el-option label="投标项目" value="投标项目"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label="项目经理">
                        <el-select v-model="form.projectManager" placeholder="项目经理" :disabled="true">
                            <el-option label="苏利普" value="苏利普"></el-option>
                            <el-option label="吴正刚" value="吴正刚"></el-option>
                            <el-option label="孙佳亮" value="孙佳亮"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                    <el-form-item><br/>
                       <el-button  @click="goBackProjectListPage">返回</el-button>
                    </el-form-item>
                </el-col>
            </el-row>



        </el-form>
    </div>
</template>

<script>
    export default {
        name: "projectItemView",
        data() {
            return {
                form: {
                    draftPerson: '',
                    draftDepartment: '',
                    draftTime: '',
                    projectNum: '',
                    projectName: " ",
                    projectState: " ",
                    projectType: '',
                    projectManager: ''
                }
            }
        },
        created() {
            //跨router传参方式
            console.log(this.$route.params.myData);
            this.form.draftPerson=this.$route.params.draftedPerson;
            this.form.draftDepartment=this.$route.params.draftedDepartment;
            this.form.draftTime=this.$route.params.time;
            this.form.projectNum=this.$route.params.projectNum;
            this.form.projectName=this.$route.params.projectName;
            this.form.projectState=this.$route.params.projectState;
            this.form.projectType=this.$route.params.projectType;
            this.form.projectManager=this.$route.params.projectManager;
           /* "projectNum":row.projectNum,
                "projectName":row.projectName,
                "projectState":row.projectState,
                "projectType":row.projectType,
                "projectManager":row.projectManager,
                "draftedPerson":row.draftedPerson,
                "draftedDepartment":row.draftedDepartment,
                "time":row.time,*/

        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            goBackProjectListPage(){
                this.$router.push({
                    "name": "projectManagement/projectList",
                })
            }
        }
    }
</script>

<style scoped>
    .el-button{display: block;margin: auto;width: 120px}
    .el-select{width: 100%}
        .el-input__inner{color: #797979}
</style>