<template>

    <div>
        <div class="container">
            <div style="margin-top: 20px">当前填报周期{{this.$route.query.month}} </div>
        </div>
        <div>
            <el-button type="success" style="margin-top: 20px;margin-bottom: 10px;float: right"
                       size="small" @click="back"><Icon type="ios-redo" style="margin-right: 5px"/>返回
            </el-button>
        </div>
        <el-table
                :data="tableData4.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
                :header-cell-style="{textAlign:'center'}"
                show-summary
                border stripe
                :summary-method="getSummaries"
                max-height="850"
                size="small"
                class="workTimeTableClass"
                ref="multipleTable">
            <el-table-column
                    type="selection"
                    width="55"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="project"
                    label="项目"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="task"
                    label="任务"
                    width="90">
               <template slot-scope="scope">
                    <span>{{scope.row.task|taskFmt(scope)}}</span>
                </template>
            </el-table-column>


            <el-table-column
                    prop="billable"
                    label="是否核销"
                    width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.billable|billableFmt}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="auditStatus"
                    label="审批状态"
                    width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.auditStatus|auditStatusFil}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    v-for="(col,key) in cols"
                    :prop="col.prop"
                    :label="col.label"
                    :key="col.prop"
                    width="60">
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData4.length"
                style="background-color: white">
        </el-pagination>


    </div>

</template>

<script>
    import util from '../../libs/util'
    export default {
        methods: {
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            initManhours: function () {
                var _this = this;
                var resArry = [];

                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'workhour/initByOneMonth'+window.suffix,
                    /*url:'http://192.168.99.38:9001/workhour/initByOneMonth',*/
                    data:{
                        /* month:this.$route.query.month*/
                        "entity":this.$route.query.month,
                        "ext": {},
                        "pageNum": 0,
                        "where": [
                            {
                                "assemble": "and",
                                "field": " ",
                                "opt": "=",
                                "value": " "
                            }
                        ],
                        "pageSize": 0,
                        "orderBy": " "
                    },
                   /* headers: {
                        'user':'songchao',
                        'id':'15302559515867820',
                        'roles':'pUser',
                        'userName':'songchao'
                    }*/
                }).then(res => {
                    for (var item in res.data.rows[0].workhourDetails) {
                        resArry.push(
                            {
                                prop: res.data.rows[0].workhourDetails[item].date,
                                label: res.data.rows[0].workhourDetails[item].date.substring(6),
                            }
                        );
                    }
                    //成功回调方法
                    this.cols = resArry;
                    console.log('this.cols:',this.cols)
                })
            },
            initOldData: function () {
                var _this = this;
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'workhour/getByOneMonth'+ window.suffix,
                    /*url:'http://192.168.99.38:9001/workhour/getByOneMonth',*/
                    data:{
                        "entity":this.$route.query.month,
                        "ext": {},
                        "pageNum": 0,
                        "where": [
                            {
                                "assemble": "and",
                                "field": "",
                                "opt": "=",
                                "value": ""
                            }
                        ],
                        "pageSize": 0,
                        "orderBy": ""
                    },
                    /*headers: {
                        'user':'songchao',
                        'id':'15302559515867820',
                        'roles':'pUser',
                        'userName':'songchao'
                    }*/
                }).then(res => {
                    //成功回调方法
                    this.tableData4 = res.data.rows;
                    for(var i in this.tableData4){
                        var arr=this.tableData4[i].workhourDetails;
                        for(var j in arr){
                            this.tableData4[i][arr[j].date]=arr[j].amount;
                        }

                    }
                    if(this.tableData4.length==0) {
                        //把‘暂无数据’字样居左展示
                        document.getElementsByClassName('el-table__empty-text')[0].style.left = '10%';
                    }
                })
                util.adjustTableHead('workTimeTableClass');//调整表格竖线对齐
            },

            handleSizeChange: function (size) {
                this.pagesize = size
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage

            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row)
                    })
                } else {
                    this.$refs.multipleTable.clearSelection()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 1) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index === 2||index === 3) {
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
                        sums[index] += ' 天';
                    } else {
                        sums[index] = '';
                    }
                });


                sums[4] = ''

                return sums;
            },
            back(){
                this.$router.push({
                    name: 'workingHourManage/workTimeInfoMange'
                })
            },

        },
        data() {
            return {
                projectOptions: [],
                currentPage: 1,
                pagesize: 10,
                Manhours: '',
                cols: [],
                tableData4: [],
                value4: [],
                value: '',
                month:''
            }
        },
        filters: {
            auditStatusFil:function(value){
                if(value==0){
                    return "草稿"
                }else if(value==1){
                    return "待审批"
                }else if(value==2){
                    return "同意"
                }else if(value==3){
                    return "退回"
                }
            },
            billableFmt:function(value){
                if(value==0){
                    return "N";
                }else if(value==1){
                    return "Y";
                }
            },
            taskFmt:function (value,scope) {
                if(scope.row.ext){
                    let taskData = JSON.parse(scope.row.ext).filter(o => o.value == value)[0]
                    if (value && taskData) {
                        if (taskData.label) {
                            return taskData.label
                        }
                    }
                }
            }
        },

        mounted: function () {
            this.month = this.$route.query.months;

            this.initManhours();
            this.initOldData();
        }
    }
</script>