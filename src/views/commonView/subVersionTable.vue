<template>
    <div style="background-color: white;">

        <el-table
                :data="tableData"
                :show-header="false"
                size="small"
                style="width: 100%;margin-top: -20px;margin-left: -3px;margin-bottom: -21px">
            <el-table-column
                    prop="costForecastNum"
                    label="项目预估编号"
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
                    label="项目总成本"
            >
                <template slot-scope="scope">
                    {{scope.row.projectCost|amountFmt}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="contractValue"
                    width="146"
                    label="合同额"
            >
                <template slot-scope="scope">
                    {{scope.row.contractValue|amountFmt}}
                </template>
            </el-table-column>

            <!--<el-table-column-->
                    <!--label="操作"-->
                    <!--width="67"-->
                    <!--style="margin-right: -100px"-->
            <!--&gt;-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="success"-->
                            <!--circle-->
                            <!--title="查看"-->
                            <!--@click="handleView(scope.row)"><i class="el-icon-tickets" style="font-size: 11px"></i>-->
                    <!--</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
    </div>

</template>


<script>
    import Cookies from 'js-cookie';

    export default {

        data() {
            return {
                tableData: [],
                statusDirData:[],
                status:''
            }

        },
        methods: {
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
            getSubVersionTableData(){

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



