<template>
    <div style="background-color: white">

        <el-table
                :data="tableData"
                :show-header="false"
                size="small"
                style="width: 100%;margin-top: -20px;margin-left: -3px;margin-bottom: -21px">
            <el-table-column
                    prop="costForecastNum"
                    width="125">
                <template slot-scope="scope">

                    <router-link  :to="{}"   @click.native="handleView(scope.row)">{{scope.row.costForecastNum}}</router-link>

                </template>
            </el-table-column>
            <el-table-column
                    prop="projectName"
                    label="项目/商机名称"
            >
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="提交状态"
                    width="100"
            >
                <template slot-scope="scope">
                    {{scope.row.status|statusFil}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectType"
                    width="125"
                    label="预估类型"
            >
                <template slot-scope="scope">
                    {{scope.row.projectType|projectTypeFil}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectCost"
                    width="125"
                    align="right"
                    label="项目总成本"
            >
                <template slot-scope="scope">
                    {{scope.row.projectCost|amountFmt}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="contractValue"
                    width="125"
                    label="合同额"
                    align="right"
            >
                <template slot-scope="scope">
                    {{scope.row.contractValue|amountFmt}}
                </template>
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="132">
                <template slot-scope="scope">
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="success"-->
                            <!--circle-->
                            <!--title="查看"-->
                            <!--@click="handleView(scope.row)"><i class="el-icon-tickets" style="font-size: 11px"></i>-->
                    <!--</el-button>-->
                    <!--v-hasPermission="'tabTwo_update'"-->
                    <el-button
                            :disabled="scope.row.status != 2"
                            size="mini"
                            type="primary"
                            circle
                            title='编辑'
                            @click="handleEdit(scope.row)"><i class="el-icon-edit" style="font-size: 11px"></i>
                    </el-button>
                    <!--v-hasPermission="'tabTwo_copy'"-->
                    <el-button
                            :disabled="scope.row.status != 1"
                            size="mini"
                            type="success"
                            circle
                            title='拷贝'
                            @click="copy(scope.row)"><i class="el-icon-plus" style="font-size: 11px"></i>
                    </el-button>
                    <!--v-hasPermission="'tabTwo_del'"-->
                    <el-button
                            :disabled="scope.row.version == 1 || scope.row.status == 1 || scope.row.status == 3"
                            size="mini"
                            type="danger"
                            circle
                            title="删除"
                            @click="deleteRow(scope.$index, tableData,scope.row)"><i class="el-icon-delete"
                                                                                     style="font-size: 11px"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>


<script>
    import Cookies from 'js-cookie';

    export default {

        data() {
            return {
                copyRowsData:{},
                tableData: [],
                statusDirData:[],
                status:''
            }

        },
        methods: {

            //修改
            handleEdit(row) {

                //草稿状态
                this.$router.push({
                    "name": row.projectType == '01'? 'editOppoCost':'editProjectCost',
                    "query": {
                        "id": row.id,
                        "projectId":row.projectId,
                        "username": row.username,
                        "costForecastNum":row.costForecastNum,
                        "code": row.code,
                        "currentPage": this.currentPage,
                        "row":JSON.stringify(row),
                        "contractValue":row.contractValue,
                        "processInstanceId":row.processInstanceId
                    }
                })
            },

            //复制
            copy(row){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/copyCostForecast' + window.suffix,
                    data: {
                        "entity": row
                    }
                }).then(res => {
                    //成功回调方法
                    if(res.data.subCode == '10004'){
                        var _this = this;
                        let caogaoData=_this.tableData.filter(o=>o.status=='2');//草稿状态数据
                        let runningData=_this.tableData.filter(o=>o.status=='3');//审批中数据
                        if(caogaoData.length!=0) {
                            this.$confirm('该项目成本预估表已存在草稿状态，不允许复制，是否查看已存在草稿？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                            }).then(() => {
                                // console.log('caogaoData---',caogaoData)
                                _this.handleEdit(caogaoData[0]);//进入草稿编辑页面
                            })
                        }else if(runningData.length!=0){
                            this.$confirm('该项目成本预估表已存在审批中状态，不允许复制，是否查看审批中的数据？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                            }).then(() => {
                                _this.handleView(runningData[0]);//进入审批中查看页面
                            })
                        }
                    }else {
                        this.getSubVersionTableData('isCopy')
                        this.$confirm('该项目成本预估表已存在草稿状态，不允许复制，是否查看已存在草稿？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }).then(() => {
                            _this.handleEdit(caogaoData);//进入草稿编辑页面
                        })
                    }

                });
            },
            //查看
            handleView(row) {
                this.$router.push({
                    "name": row.projectType == '01'? 'viewOppoCost':'viewProjectCost',
                    "query": {
                        "id": row.id,
                        "projectId":row.projectId,
                        "costForecastNum":row.costForecastNum,
                        "currentPage": this.currentPage,
                        "row":JSON.stringify(row),
                        "contractValue":row.contractValue,
                        "processInstanceId":row.processInstanceId
                    }
                })
            },

            deleteRow(index, tableData, row) {
                var _this = this;
                this.$confirm('此操作将永久删除项目信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'project/cost/delCostForecastEX' + window.suffix,
                        data: {
                            "entity": {},
                            "ext": [
                                row.id
                            ],
                            "pageNum": 0,
                            "pageSize": 1000,
                        }
                    }).then(res => {
                        if (res.data.subCode == 0) {
                            if (_this.total % _this.mysize == 1)
                                _this.currentPage = _this.currentPage == 1 ? 1 : _this.currentPage - 1;
                            //成功回调方法
                            this.getSubVersionTableData()

                            this.$emit('reafshCostList');
                        }
                        else {
                            _this.$notify({
                                title: '无法删除',
                                message: res.data.subMsg,
                                type: 'warning'
                            });

                        }

                    });
                }).catch(() => {
                });

            },

            getSubVersionTableData(isCopy){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastList' + window.suffix,
                    data: {
                        entity:{
                            projectId:this.projectId
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData = res.data.rows

                    if(isCopy == 'isCopy'){
                        this.handleEdit(res.data.rows[0])
                    }
                });

            },
            getProjectStatusData(){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "提交状态"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for (var items in res.data.rows) {
                        resArry.push({
                            label: res.data.rows[items].dvalue,
                            value: res.data.rows[items].dkey
                        })
                    }
                    Cookies.set("statusDirData", resArry)

                    this.getProjectType()

                });

            },
            getProjectType(){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "预估类型"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for (var items in res.data.rows) {
                        resArry.push({
                            label: res.data.rows[items].dvalue,
                            value: res.data.rows[items].dkey
                        })
                    }
                    Cookies.set("projectTypeDirData", resArry)

                    this.getSubVersionTableData()

                });

            }


        },
        mounted: function () {
            this.getProjectStatusData()
        },
        props:['projectId'],
        filters: {
            statusFil: function (v) {
                let data = JSON.parse(Cookies.get("statusDirData"));
                return data.filter(o => o.value == v)[0].label
            },
            projectTypeFil:function (v) {
                let data = JSON.parse(Cookies.get("projectTypeDirData"));
                return data.filter(o => o.value == v)[0].label
            }
        },

    }
</script>

<style scoped="this">

</style>
