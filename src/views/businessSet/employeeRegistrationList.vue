<template>
    <div>
        <el-col :span="24" style="background-color: white;float: none;overflow: hidden;margin-bottom: 10px">

            <el-form :model="form" label-width="90px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="部门名称">
                        <el-input v-model="form.orgName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="姓名">
                        <el-input v-model="form.cname" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                        查询
                    </el-button>

                </el-col>
            </el-form>
        </el-col>
        <!--<div class="tableBtnControl">-->
            <!--<el-button v-show="false"  id="editOrNot" type="primary" v-hasPermission="'leaveOrStayPosEditBtn'">编辑</el-button>-->
        <!--</div>-->
        <my-table ref="employeeList" :myTableData="myTableData"></my-table>
    </div>
</template>

<script>
    import myTable from '../../components/myTable'
    export default {
        data() {
            return {
                myTableData: {
                    addOppoBtnShow:true,
                    addBtnName:'新增人员入职离职信息',
                    addName:'editEmployeeRegistration',
                    url: 'sysData/getUser',
                    dlUrl: '',
                    viewName: '',
                    editName: 'editEmployeeRegistration',
                    isHiddenView:true,
                    isHiddendelete:true,
                    nodeCode:'499651636424081408',
                    tableThead: [
                        {
                            headName: '部门名称',
                            headKey: 'orgName',
                            width:'125px'
                        },
                        {
                            headName: '姓名',
                            headKey: 'cname',
                            width:'95px'
                        },
                        {
                            headName: '性别',
                            headKey: 'gender',
                            width:'75px'
                        },
                        {
                            headName: '入职时间',
                            headKey: 'entryDate',
                            width:'115px'
                        },
                       /* {
                            headName: '入职当月标准人天',
                            headKey: 'entryStandardDays',
                            width:'155px'
                        },*/
                        {
                            headName: '离职时间',
                            headKey: 'dimissionDate',
                            width:'115px'
                        }/*,
                        {
                            headName: '离职当月标准时间',
                            headKey: 'dimissionStandardDays',
                            width:'155px'
                        }*/
                    ],
                    entity: {},
                    ext: "",
                    conditions: [],
                    pageRequest: {},
                    myorderBy: ''
                },
                form:{
                    orgName:'',
                    cname:''
                }
            }
        },
        methods:{
            search(){
                var _this = this;
                var myentity={};
                if (this.form.orgName) {
                    myentity.orgName=_this.form.orgName
                }
                if (this.form.cname) {
                    myentity.cname=_this.form.cname
                }
                this.myTableData.entity=myentity;
                console.log("查询条件是",this.myTableData.entity);
                this.$refs.employeeList.findAllProject(1);
            },
        },
        filters: {

            entryTimeFil:function (value) {
                if(value){
                    return value.substring(0, 10)
                }
            },
            timeFmt:function (value) {
                if(value){
                    return value.substring(0, 10)+" "+value.substring(11, 18)
                }
            }


        },
        mounted(){
            //表格内部按钮权限控制
            // this.$set(this.myTableData,'editBtnHidden',!Boolean(document.getElementById('editOrNot')));
        },
        components: {
            myTable
        }
    }
</script>

<style scoped>

</style>