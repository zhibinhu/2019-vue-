<template>

    <div style="background-color:#fff ">
        <el-col :span="24" style="background-color: white;padding-top: 10px;padding-bottom: 10px;padding-left: 15px;font-size: 13px">
            <span style="margin-right: 10px">{{"机会名称：  "+ oppoProjectName}}</span>
            <span>{{"商机编号： " + oppoNum}}</span>
            <el-button type="success" size="small" style="position: fixed;right: 20px ;z-index: 100;top: 113px;width: 70px" @click="back()">返回</el-button>

        </el-col>
        <el-table
                :data="tableData4.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
                border stripe
                :summary-method="getSummaries"
                max-height="850"
                size="small"
                ref="multipleTable">
            <el-table-column
                    type="selection" width="40">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="cname"
                    label="人员姓名"
                    width="80">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="period"
                    label="月份"
                    width="80">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="days"
                    label="核销人天（天）" width="110">
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
    export default {
        methods: {
            back:function () {
                this.$router.push({
                    name: 'workingHourManage/oneMonthWorkHoursList',
                    "query":{
                        'oppoNum':this.oppoNum,
                        'oppoProjectName':this.oppoProjectName,
                        'month':this.month
                    }
                })
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            initManhours: function () {
                var _this = this;
                var resArry = [];

                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'manhour/initManhoursByOneMonth' + window.suffix,
                    data:{
                        month:this.month
                    }
                }).then(res => {
                    _this.Manhours = res.data.content;

                    for (var item in _this.Manhours.everyDay) {
                        resArry.push(
                            {
                                prop: _this.Manhours.everyDay[item].day.substring(0, 8),
                                label: _this.Manhours.everyDay[item].day.substring(6)
                            }
                        )
                    }
                    //成功回调方法
                    this.cols = resArry;
                })
            },


            initOldData: function () {
                var _this = this;
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'manhour/getManhoursByProjectAndMonthAndPerson' + window.suffix,

                    data: {
                        month: this.month,
                        username:this.userId,
                        projectCode:this.oppoNum
                    }
                }).then(res => {
                    //成功回调方法
                    _this.tableData4 = res.data.content
                })
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
                    if (index === 2) {
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

                return sums;
            }

        },
        data() {
            return {
                currentPage: 1,
                pagesize: 15,
                Manhours: '',
                cols: [],
                tableData4: [],
                value: '',
                oppoProjectName:'',
                oppoNum:''
            }
        },
        filters: {
            taskFmt:function (value,row,task) {
                if(value){
                    for(var items in row ){
                        if(row[items].value == task){
                            return row[items].label
                        }
                    }
                }

            }
        },

        mounted: function () {
            if(this.$route.query.oppoNum && this.$route.query.month){
                this.oppoProjectName = this.$route.query.oppoProjectName;
                this.oppoNum = this.$route.query.oppoNum;
                this.month = this.$route.query.month;
                this.userId = this.$route.query.userId;
                this.initManhours();
                this.initOldData();

            }
        }
    }
</script>