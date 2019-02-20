<template>
    <section>

        <el-row style="background-color: white;margin-bottom: 10px">
            <el-col :span="24">
                <el-form ref="form" :model="form" label-width="50px" style="margin-top: 20px;margin-bottom: 20px">
                    <el-col :span="6" :xs="20">
                        <el-form-item label="姓名">
                            <el-input v-model="cname" placeholder="请输入姓名" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" :xs="20" style="margin-top: 10px;font-size: 14px">审批状态</el-col>
                    <el-col :span="3" :xs="20">
                        <el-checkbox v-model="checked1" style="margin-top: 8px">待审批</el-checkbox>
                    </el-col>
                    <el-col :span="3" :xs="20">
                        <el-checkbox v-model="checked2" style="margin-top: 8px">审批通过</el-checkbox>
                    </el-col>
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small"
                               @click="searchByCname()">查询
                    </el-button>
                    <el-button type="success" size="small"
                               style="position: fixed;right: 20px ;z-index: 100;top: 135px;width: 70px" @click="back()">
                        返回
                    </el-button>

                </el-form>
            </el-col>
        </el-row>
        <el-col :span="24"
                style="background-color: white;padding-top: 10px;padding-bottom: 10px;padding-left: 10px;font-size: 13px">
            <el-button style="margin-top: 5px" type="success" icon="el-icon-success" size="small"
                       @click="agreenApprove">同意
            </el-button>
            <el-button style="margin-top: 5px" type="danger" icon="el-icon-circle-close-outline" @click="refuseApprove"
                       size="small">退回
            </el-button>
            <span style="margin-left:10px;">{{"部门名称：  " + orgName}}</span>
            <span>{{"月份： " + period}}</span>
        </el-col>

        <el-row style="clear: both">
            <el-table border stripe show-summary
                      :summary-method="getColumnSummaries"
                      :data="tableDataList"
                      style="width: 100%"
                      max-height="400"
                      :header-cell-style="{textAlign:'center'}"
                      size="small"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection" width="50" align="center" :selectable='checkboxInit'>
                </el-table-column>
                <el-table-column
                        prop="period"
                        label="月份"
                >
                </el-table-column>
                <el-table-column
                        prop="cname"
                        label="姓名"
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.cname}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="projectName"
                        label="项目"
                        width="180"
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.projectName}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="task"
                        label="任务"
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.task}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="mandayCancel"
                        label="核销人天（天）"
                        align="right"
                >
                </el-table-column>
                <el-table-column
                        prop="billable"
                        label="是否核销"
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.billable | billableFil}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="auditStatus"
                        label="审批状态"
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.auditStatus | auditStatusFil}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fillWorkhourRate"
                        label="填报率"
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.fillWorkhourRate | fillWorkhourRateFil}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="lastmodifiedTime"
                        label="最后操作时间"
                        width="150"
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.lastmodifiedTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        v-for="(col,key) in cols"
                        :prop="col.prop"
                        :label="col.label"
                        :key="col.prop"
                        align="right"
                        width="60">
                </el-table-column>
            </el-table>
            <el-pagination
                    layout="total,sizes,prev, pager, next,jumper"
                    :total="total"
                    @current-change="currentChange"
                    @size-change="sizeChange"
                    :current-page="mypage"
                    :page-size="mysize"
                    style="background-color: white"
            >
            </el-pagination>
        </el-row>
    </section>
</template>

<script>

    import CommonUtils from '../../libs/common.js'
    import util from '../../libs/util'
    export default {
        data() {
            return {
                cname: '',
                total: 0,
                pagesize: 15,
                currentPage: 1,
                orgName: "",
                form: {
                    cname: '',
                    month: '',
                    orgCode: ''
                },
                tableDataList: [],
                cols: [],
                tasks: [],
                mysize: 10,
                mypage: 1,
                entity: {},
                ext: '1',
                listIds: [],
                period: "",
                checked1: true,
                checked2: false
            };
        },
        methods: {
            back: function () {
                this.$router.push({
                    name: 'workingHourManage/innerProjectMonthList'
                })
            },
            /* 判断每条记录是否可勾选*/
            checkboxInit(row, index) {
                if (row.optStatus == 1)
                    return 1;//不可勾选
                else
                    return 0;//可勾选
            },
            makeDataDictionary: function (projectName) {
                //任务查字典
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": projectName
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
                    this.tasks = resArry;

                    console.log("tasksppp:", JSON.stringify(this.tasks));

                });


            },
            sizeChange(size) {
                this.mypage = 1;
                this.mysize = size;
                this.findAll();
                this.ref = true;
            },
            currentChange(page) {
                this.mypage = page;
                this.findAll();
                this.ref = true;
                this.mypage = page;
            },
            handleSelectionChange(val) {
                var ids = [];
                for (var i in val) {
                    ids.push(val[i].id);
                }
                this.listIds = ids;
            },
            getColumnSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                const resData = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index === 1 || index === 2 || index === 3 || index === 4 || index === 6 || index === 7 || index === 8) {
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
                    resData.push(util.keepOneDot(sums[items]));
                }
                return resData

            },
            returnFloat(value) {
                if (value) {
                    const pattern = /(?=((?!\b)\d{3})+$)/g;
                    var value = Math.round(parseFloat(value) * 100) / 100;
                    var xsd = value.toString().split(".");
                    if (xsd.length == 1) {
                        value = value.toString().replace(pattern, ',') + ".00";
                        return value;
                    }
                    if (xsd.length > 1) {
                        if (xsd[1].length < 2) {
                            value = value.toString().replace(pattern, ',') + "0";
                        }
                        return value;
                    }
                }

            },


            // 通过月份查询
            searchByCname() {
                console.log(this.checked1)
                console.log(this.checked2)
                this.entity.cname = this.cname;
                if (this.checked1 && this.checked2) {
                    this.ext = "";
                } else if (!this.checked1 && !this.checked2) {
                    //toDo 处理特定情况（都不选择时，随意传参数据不展示)
                    this.entity.cname = '####';
                } else if (this.checked1) {
                    this.ext = "1";
                } else if (this.checked2) {
                    this.ext = "2";
                }
                this.findAll();
            },
            /*初始化表头*/
            initManhours: function () {

                var resArry = [];

                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'workhour/initByOneMonth' + window.suffix,
                    /*url:'http://192.168.99.38:9001/workhour/initByOneMonth',*/
                    data: {
                        /* month:this.$route.params.month*/
                        "entity": this.$route.query.month,
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
                        "pageSize": 15,
                        "orderBy": " "
                    },
                    headers: {
                        'user': 'songchao',
                        'id': '15302559515867820',
                        'roles': '10',//2018-11-26 16:51数据库角色编码统一高管pUser去掉用数字编码10  author cff
                        'userName': 'songchao'
                    }
                }).then(res => {

                    for (var item in res.data.rows[0].workhourDetails) {
                        resArry.push(
                            {
                                /*把状态值status拼在key值的后面，方便后面根据入离职日期来判断每天是否可以填报*/
                                prop: res.data.rows[0].workhourDetails[item].date,
                                label: res.data.rows[0].workhourDetails[item].date.substring(6),
                            }
                        );
                    }
                    //成功回调方法
                    this.cols = resArry;
                })
            },
            // 加载总数据
            findAll() {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'viewWorkhour/getViewMgtDetail' + window.suffix,
                    data: {
                        "entity": this.entity,
                        "ext": this.ext,
                        "pageNum": this.mypage - 1,
                        "pageSize": this.mysize,
                        "orderBy": " "
                    }
                }).then(res => {
                    this.tableDataList = res.data.rows;
                    for (var i in this.tableDataList) {
                        var arr = this.tableDataList[i].workhourDetails;
                        for (var j in arr) {
                            this.tableDataList[i][arr[j].date] = arr[j].amount;
                        }
                    }
                    this.total = Number(res.data.total);

                })
            },
            /*同意按钮*/
            agreenApprove() {
                if (this.listIds.length > 0) {
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + "workhour/auditWorkhours" + window.suffix,
                        data: {
                            "entity": this.listIds,
                            "ext": "2",
                            "pageNum": 0,
                            "pageSize": 0,
                            "orderBy": ""
                        }
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '审批' + res.data.msg,
                            type: 'success'
                        });
                        /* this.$router.push({
                             name: 'innerProjectSingleMonth'
                         })*/
                        this.findAll()
                    })
                } else {
                    this.$notify({
                        title: '警告',
                        message: '请选择您要操作的列！',
                        type: 'warning'
                    });
                }

            },
            /*退回按钮*/
            refuseApprove() {
                if (this.listIds.length > 0) {
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + "workhour/auditWorkhours" + window.suffix,
                        /*url:"http://192.168.99.38:9001/workhour/auditWorkhours",*/
                        data: {
                            "entity": this.listIds,
                            "ext": "3",
                            "pageNum": 0,
                            "pageSize": 0,
                            "orderBy": ""
                        }
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '退回' + res.data.msg,
                            type: 'success'
                        });
                        /*this.$router.push({
                            name: 'innerProjectSingleMonth'
                        })*/
                        this.findAll()
                    })
                } else {
                    this.$notify({
                        title: '警告',
                        message: '请选择您要操作的列！',
                        type: 'warning'
                    });
                }
            },

        },
        filters: {
            auditStatusFil: function (value) {
                if (value == 0) {
                    return "草稿"
                } else if (value == 1) {
                    return "待审批"
                } else if (value == 2) {
                    return "同意"
                } else if (value == 3) {
                    return "退回"
                }
            },
            billableFil: function (value) {
                if (value == 0) {
                    return "N"
                } else if (value == 1) {
                    return "Y"
                }
            },
            taskFil: function (value) {
                alert(value);
            },
            fillWorkhourRateFil: function (value) {
                return value + '%'
            }
        },
        mounted: function () {
            if (this.$route.query.orgName && this.$route.query.month) {
                this.orgName = this.$route.query.orgName;
                this.period = this.$route.query.month
                this.form.period = this.$route.query.month;
                this.form.orgCode = this.$route.query.orgCode;


                this.entity.oppoNum = this.$route.query.oppoNum;
                this.entity.period = this.$route.query.month;
                this.entity.orgCode = this.$route.query.orgCode;


                this.findAll();
                this.initManhours();
                this.makeDataDictionary()
            }
        },
        computed: {
            taskValue() {

                for (var iterm in this.tableData4) {
                    alert(this.tableData4[iterm].projectName);
                    if (this.tableData4[iterm].projectName) {
                        this.makeDataDictionary(this.tableData4[iterm].projectName);
                        for (var m in this.tasks) {
                            if (this.tableData4[iterm].task == this.tasks[m].value) {
                                return this.tasks[m].label
                            }
                        }
                    }
                }
            }
        }
    };
</script>
