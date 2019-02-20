<style>
    .el-table thead.is-group th{
        border: 1px solid #fff;
        background: #dbe2eb;
    }
    .el-table__body, .el-table__footer, .el-table__header{
        border-collapse: collapse;
    }
</style>
<template>
    <div style="background-color: white">

        <el-table border stripe
                  ref="multipleTable"
                  :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  tooltip-effect="dark"
                  style="width: 100%;border-collapse: collapse"
                  max-height="600"
                  :header-cell-style="{textAlign:'center'}"
                  size="small"
                  @selection-change="handleSelectionChange">
            <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="40"-->
            <!--&gt;-->
            <!--</el-table-column>-->

            <el-table-column
                    prop="period"
                    label="周期"
            >
            </el-table-column>
            <el-table-column
                    prop="daysOfStandardManDay"
                    label="标准人天"
                    align="right">
            </el-table-column>
            <el-table-column label="商机"
                             align="center">
                <el-table-column
                        prop="daysOfBillableForOppo"
                        label="核销人天"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="daysOfBillEnableForOppo"
                        label="非核销人天"
                        align="right">
                </el-table-column>
            </el-table-column>
            <el-table-column label="项目"
                             align="center">
                <el-table-column
                        prop="daysOfBillableForProject"
                        label="核销人天"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="daysOfBillEnableForProject"
                        label="非核销人天"
                        align="right">
                </el-table-column>
            </el-table-column>

            <el-table-column
                    prop="daysOfInterManage" width="130"
                    label="内部管理核销人天"
                    align="right">
            </el-table-column>


            <el-table-column
                    label="报工率"
                    align="right">
                <template slot-scope="scope">
                    <span>{{scope.row.reportWorkhourRate|verificationPercentFil}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="daysOfApprovalPending"
                    label="待审批人天"
                    align="right">
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="110">
                <template slot-scope="scope">
                    <!--v-hasPermission="'writeOrViewBtn'"-->
                    <el-button
                            :type="scope.row.openFlag == true ? 'danger':'primary'"
                            size="mini"
                            @click="viewDetails(scope)"><i style="margin-right: 5px" :class="scope.row. openFlag == true ? 'el-icon-edit' : 'el-icon-search'"></i>{{scope.row. openFlag  ==  true ? '填报':'查看'}}
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <!--<el-pagination-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="currentPage"-->
                <!--:page-sizes="[10, 20, 50, 100]"-->
                <!--:page-size="pagesize"-->
                <!--layout="total, sizes, prev, pager, next, jumper"-->
                <!--:total="tableData3.length"-->
                <!--style="background-color: white">-->
        <!--</el-pagination>-->


    </div>

</template>


<script>
    export default {
        data () {
            return {
                tableData3: [],
                currentPage: 1,
                pagesize: 15,
                form: {
                    oppoProjectName: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                value4: [],
                value5: '',
                searchForm:{
                    oppoProjectName:'',
                    projectManager:'',
                    draftedPerson:''
                }
            }

        },
        methods: {
            handleSizeChange: function (size) {
                this.pagesize = size
            },
            handleCurrentChange (currentPage) {
                this.currentPage = currentPage

            },
            toggleSelection (rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row)
                    })
                } else {
                    this.$refs.multipleTable.clearSelection()
                }
            },
            handleSelectionChange (val) {
                this.multipleSelection = val
            },

            viewDetails (scope) {
                if(scope.row.openFlag){
                    this.$router.push({
                        "name": "timeManagement",
                        "query":{
                            'month':scope.row.period,
                            "dayNum":scope.row.daysOfStandardManDay
                        }
                    })
                }else {
                    console.log(scope.row.period);
                    this.$router.push({
                        "name": "personalWHDetaile",
                        "query":{
                            'month':scope.row.period
                        }
                    })

                }
            },

            handleCommand(command) {
                this.$message('click on item ' + command);
            },
            showMore(){
                if(!this.isShowMore){
                    this.isShowMore = true;
                }else {
                    this.isShowMore = false;
                }
            },
            findAllProject(){
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'workhour/getHistory'+ window.suffix,
                    data:{

                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data.rows
                })
            },

            search(){

                var _this = this;
                var searchData = {};
                if(this.searchForm.draftedPerson){
                    searchData.draftedPerson = _this.searchForm.draftedPerson
                }
                if(this.searchForm.projectManager){
                    searchData.projectManager = _this.searchForm.projectManager
                }
                if(this.searchForm.oppoProjectName){
                    searchData.oppoProjectName = _this.searchForm.oppoProjectName
                }

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/getOppoList' + window.suffix,
                    data: {
                        "entity":searchData,
                        "pageNum": 0,
                        "pageSize": 1000
                    }

                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data.rows;
                })

            }

        },
        mounted:function () {
            this.findAllProject();
        },
        filters:{
            verificationPercentFil:function (value) {
                if(value){
                    return value + '%';
                }
            }
        }

    }
</script>


