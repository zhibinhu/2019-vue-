<template>
    <section>
        <!--内部管理工时核销列表(按月)-->
        <el-row style="background-color: white;margin-bottom: 10px">
           <el-col :span="24" >
                <el-form ref="form" :model="form" label-width="50px" style="margin-top: 20px;margin-bottom: 20px">
                    <el-col :span="6" :xs="20">
                        <el-form-item label="月份">
                            <el-date-picker size="small"   style="width: 90%"
                                    v-model="form.month"
                                    type="month"
                                    placeholder="选择月" value-format="yyyy-MM">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" :xs="20">
                        <el-checkbox v-model="checked" style="margin-top: 8px">待审批</el-checkbox>
                    </el-col>
                    <el-button  style="margin-top: 5px"  type="primary" icon="el-icon-search" size="small" @click="searchByMonth()">查询</el-button>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                    border stripe
                    show-summary
                    :summary-method="getColumnSummaries"
                    :data="tableDataList"
                    style="width: 100%"
                    max-height="400"
                    :header-cell-style="{textAlign:'center'}"
                    sum-text="合计："
                    size="small"
                    ref="multipleTable">

                <el-table-column
                        prop="orgName"
                        label="部门"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="period"
                        label="月份"
                        width="200">
                    <template slot-scope="scope">
                        <p style="text-decoration:underline;cursor: pointer" @click=handleChildLink(scope.row)>
                            {{scope.row.period}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="totalPersonNumbers"
                        label="总人数(总)"
                        align="right"
                        >
                </el-table-column>
                <el-table-column
                        prop="totalPersonTime"
                        label="总人天(天)"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="pendingApprovalPersonTime"
                        label="待审批人天(天)"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="notReportManhourPercent"
                        label="未报工率"
                        align="right">
                    <template slot-scope="scope">
                        <p>{{scope.row.notReportManhourPercent|notReportManhourPercentFil}}</p>
                    </template>
                </el-table-column>

            </el-table>

            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40,50,100]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    style="background-color: white">
            </el-pagination>
        </el-row>
    </section>
</template>

<script>
    import CommonUtils from '../../libs/common.js'
    import util from '../../libs/util'

    export default {
        data: function () {
            return {
                // page variables
                total: 0,
                currentPage: 1,
                pagesize:10,
                form: {
                    month: ''
                },
                tableDataList:[],
                mysize: 10,
                mypage: 0,
                entity:{},
                ext:" ",
                checked:false
            };
        },
        methods: {
            handleSizeChange: function (size) {
                this.pagesize = size;
                //this.setPageSliceData();
                this.loadTotalDataList()

            },
            handleCurrentChange (currentPage) {
                this.currentPage = currentPage;
                //this.setPageSliceData();
                this.loadTotalDataList()

            },
            setPageSliceData(){
                let  pagesize = this.pagesize;
                let  currentPage = this.currentPage;
                this.tableDataList = this.totalDataList.slice( (currentPage-1) * pagesize,currentPage * pagesize );
            },
            toggleSelection (rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            /* 跳到内部管理工时二级页面 */
            handleChildLink (row) {
                this.orgCode = row.orgCode;
                this.$router.push({
                    'name': 'innerProjectSingleMonth',
                    'query': {
                        'month': row.period,  // '2018-01'
                        'orgCode':row.orgCode,
                        'orgName':row.orgName,
                        "projectType":this.$route.query.projectType
                    }
                });
            },
            getColumnSummaries (param) {
                const {columns, data} = param;
                const sums = [];
                let _this = this;
                const resData = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index === 1||index === 5) {
                        sums[index] = '';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += '';
                    } else {
                        sums[index] = '';
                    }
                });
                for(const items in sums){
                    if(items=='3' || items=='4'){
                        resData.push(util.keepOneDot(sums[items]));
                    }else{
                        resData.push(sums[items]);
                    }
                }
                return resData;
            },
            // 通过月份查询
            searchByMonth () {
                let param = {};
                if(this.form.month){
                    param = {"period":this.form.month};
                    this.entity=param;
                }else {
                    this.entity={};
                }
                if(this.checked==true){
                    this.ext="1";
                }else{
                    this.ext=" ";
                }
                this.loadTotalDataList();
            },

            loadTotalDataList(){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'viewWorkhour/getViewMgtMonth'+ window.suffix,
                    /*url:'http://192.168.99.38:9001/viewWorkhour/getViewMgtMonth',*/
                    data: {
                        "entity":this.entity,
                        "ext": this.ext,
                        "pageNum": this.currentPage-1,
                        "range": [
                            {
                                "field": "string",
                                "from": "string",
                                "to": "string"
                            }
                        ],
                        "where": [
                            {
                                "assemble": "and",
                                "field": "string",
                                "opt": "=",
                                "value": "string"
                            }
                        ],
                        "pageSize": this.pagesize,
                        "orderBy": "string"
                    }
                }).then(res => {
                    console.log(11111,res.data.total)
                    this.total = Number(res.data.total)
                    this.tableDataList = res.data.rows

                    //this.resolveResultData(res.data);
                })
            },
            resolveResultData(data){
                if(data.status == 'error'){
                    this.totalDataList = [];
                }else{
                    this.totalDataList = data.rows;
                }
                //this.total = this.totalDataList.length;
                this.setPageSliceData();
            },
        },
        mounted: function () {
            this.loadTotalDataList();
        },
        filters:{
            notReportManhourPercentFil:function (value) {
                return value +  '%'
            }
        },
    };

</script>
