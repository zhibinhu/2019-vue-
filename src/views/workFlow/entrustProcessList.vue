<template>
    <div>
        <el-col :span="24" style="background-color: white">
            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="流程模块">
                        <el-input v-model="form.orgCode" style="width: 95%" size="small"></el-input>
                    </el-form-item>

                </el-col>
                <el-button :span="6" :xs="20" type="primary" round @click.enter="search()" size="small">查询</el-button>
            </el-form>

        </el-col>

        <el-button @click="addEntrustProcess()" size="small" type="primary" style="margin-top: 20px;margin-bottom: 10px">添加流程
        </el-button>

        <my-table ref="tableProductLine" :myTableData="myTableData"></my-table>
    </div>
</template>

<script>
    import myTable from '../../components/myTableSys'
    export default {
        name: "entrustProcessList",
        data () {
            return{
                myTableData:{
                    url: '/microarch/activiti/delegate/list',
                    dlUrl: '/microarch/activiti/delegate/task/delegate',
                    viewName: '',
                    editName: '',
                    tableThead: [
                        {
                            headName: '序号',
                            headKey: 'pageIndex',
                            width: 30,
                            isNumber:true
                        },
                        {
                            headName: '流程模块',
                            headKey: 'activate_flag'
                        },
                        {
                            headName: '委托人',
                            headKey: 'consigner'
                        },
                        {
                            headName: '受委托人',
                            headKey: 'mandatary'
                        },
                        {
                            headName: '开始日期',
                            headKey: 'begin_date'
                        },
                        {
                            headName: '结束日期',
                            headKey: 'end_date'
                        },
                        {
                            headName: '运行标志',
                            headKey: 'proc_def_key',
                            width: 50
                        }
                    ],
                    entity: {},
                    where:[],
                    conditions: [],
                    pageRequest: {},
                    myorderBy: 'lastmodifiedTime DESC'
                },
                form:{
                    a:'',
                    b:''
                },
                total:1,
                pageNumber:1,
                pageSize:10,
                condition:[],//查询条件
            }
        },
        components: {
            myTable
        },
        methods:{
            search(){
                var _this = this;
                var myentity=[];
                if (this.form.orgCode) {
                    myentity.push({"field":'activate_flag',"opt": "like","value":_this.form.activate_flag,"assemble": "and"});
                }
                this.myTableData.where=myentity;
                console.log("查询条件是",this.myTableData.where);
                this.$refs.tableProductLine.findAllProject(1);
            },
            addEntrustProcess(){
                this.$router.push({
                    name: 'workFlow/addEntrustProcess'
                })
            }
        },
        mounted: function () {},
        filters:  {},
    }
</script>

<style scoped>

</style>