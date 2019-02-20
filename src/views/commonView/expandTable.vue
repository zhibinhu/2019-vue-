

<template>

    <div>


        <el-dialog title="拖动调整顺序" :visible.sync="dialogTableVisible" :modal-append-to-body="false" @close="closeDialog">

            <div style="width: 100%;margin-bottom: 50px;padding-left: 15px">

                <el-checkbox-group v-model="myTableData.checkedThreadData">

                    <draggable v-model="myTableData.tableThead">

                        <el-checkbox
                                style="width: 100%;height: 45px;border: 1px solid #ddd;background: #E9EAEC;border-radius: 5px;margin: 0 13px 10px 0;padding-left: 5px"
                                v-for="(element,index) in myTableData.tableThead" :key="index" :label="element.headKey">
                            <label>

                                <el-slider v-model="element.width" :max="200"
                                           style="margin-bottom: -28px;margin-left: 32%;width: 400px"
                                           show-input></el-slider>

                            </label>
                            {{element.headName}}
                        </el-checkbox>
                    </draggable>
                </el-checkbox-group>


            </div>

            <span slot="footer" class="dialog-footer">

                     <el-button type="primary" @click="confirmCustom()">确 定</el-button>

            </span>
        </el-dialog>


        <el-button @click="handleAdd()" type="primary" size="small" style="margin-top: 10px;margin-bottom: 5px"
                   v-if="myTableData.addName">
            <i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>{{myTableData.addBtnName||'新增'}}
        </el-button>

        <el-button @click="customColumn()" type="danger" size="small" style="margin-top: 10px;margin-bottom: 5px"
                   v-if="myTableData.custom">
            <i style="margin-right: 5px" class="el-icon-rank"></i>自定义列表
        </el-button>

        <el-button @click="exportExcel()" type="success" size="small" style="margin-top: 10px;margin-bottom: 5px"
                   v-if="myTableData.exportName">
            <i style="margin-right: 5px" class="el-icon-document"></i>报表导出
        </el-button>

        <div style="background-color: white">

            <el-table
                    class="myTable"
                    border stripe
                    :data="tableData"
                    id="myTable"
                    v-if="mark"
                    :style="myTableStyle"
                    size="small"
                    @sort-change="sorthange"
                    :sort-orders="sortOrders"
                    ref="myTable"
            >
                <el-table-column
                        type="selection"
                        width="40"
                >
                </el-table-column>



                <el-table-column :prop="items.headKey" :key='index' v-for='(items , index) in myTableData.tableThead'
                                 min-width="180px"
                                 :label="items.headName" :width="items.width*2.5" :align="items.align"
                                 v-if="!items.isHidden"
                                 sortable="custom">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" effect="light"
                                    :disabled="!items.isNeedTips || !scope.row[items.headKey]">

                            <div v-if="items.dirKey" slot="content">{{scope.row[items.headKey]}}</div>

                            <div v-else slot="content">{{scope.row[items.headKey]}}</div>

                            <p v-if="items.dirKey"> {{scope.row[items.headKey] | datafil(items.dirKey)}}</p>
                            <p v-if="items.amoutKey"> {{scope.row[items.headKey] | amountFil(items.amoutKey)}}</p>
                            <p v-if="items.isProjectFmt"> {{scope.row[items.headKey] |
                            projectTypeFil(items.amoutKey)}}</p>
                            <p v-if="items.isTimeData">
                                {{scope.row[items.headKey] | prAndOppoTimeFmt(items.amoutKey)}}</p>
                            <p v-if="items.isPersonData">
                                {{scope.row[items.headKey] | prAndOppoPersonFmt(items.amoutKey)}}</p>
                            <p v-if="items.isAmountFmt"> {{scope.row[items.headKey] | amountFmt(items.amoutKey)}}</p>

                            <p v-if="items.headKey == 'isAllowWorkingHours'">{{scope.row[items.headKey]== 'true'? '是':'否'}}</p>

                            <p v-else>{{scope.row[items.headKey]}}</p>
                        </el-tooltip>

                    </template>


                </el-table-column>

            </el-table>


            <el-pagination
                    layout="total,sizes,prev, pager, next,jumper"
                    :total="total"
                    @current-change="currentChange"
                    @size-change="sizeChange"
                    :current-page="currentPage"
                    :page-size="mysize"
                    :style="paginationStyle"
            >
            </el-pagination>
        </div>

    </div>


</template>


<script>
    import Cookies from 'js-cookie';
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    import draggable from 'vuedraggable'
    import util from '../../libs/util'

    export default {

        data() {
            return {
                placement: 'right-end',
                dialogTableVisible: false,
                disabled: true,
                mark: true,
                fullHeight: document.documentElement.clientHeight,
                tableData: [],
                dirData: {},
                dirLablArry: [],
                mysize: 10,
                currentPage: 1,
                total: 1,
                direction: '',
                field: '',
                myorderBy: '',
                sortOrders: ['ascending', 'descending'],
                paginationStyle: 'background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100',
                myTableStyle: 'margin-bottom:35px'
            }

        },
        components: {
            draggable
        },
        props: ['myTableData'],
        methods: {

            closeDialog() {
                this.findAllProject()
            },
            //模态框点击确认后逻辑
            confirmCustom() {

                this.dialogTableVisible = false;
                this.refreshMyTable();

                this.myTableData.tableThead.forEach((item) => {
                    if (this.myTableData.checkedThreadData.indexOf(item.headKey) >= "0") {
                        item.isHidden = false
                    } else {
                        item.isHidden = true
                    }

                });

                console.log(this.myTableData.tableThead)

                this.findAllProject()

                //将用户选择存储本地
                Cookies.set(this.myTableData.customStyleData[0], this.myTableData.tableThead);
                Cookies.set(this.myTableData.customStyleData[1], this.myTableData.checkedThreadData);

            },

            //刷新table
            refreshMyTable() {
                this.mark = false;
                this.mark = true;
            },

            //自定义列
            customColumn() {
                this.dialogTableVisible = true;
            },

            //新增xx
            handleAdd() {
                let _this = this;
                this.$router.push({
                    "name": _this.myTableData.addName,
                    "query": {
                        "currentPage": _this.currentPage
                    }
                })
            },

            ///报表导出
            exportExcel() {

                var _this = this;

                var wb = XLSX.utils.table_to_book(document.querySelector('#myTable'))

                var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})

                try {
                    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), _this.myTableData.exportName)
                } catch (e) {
                    console.log(e, wbout)
                }
                return wbout
            },

            //数据字典值请求
            makeDataDictionary: function (dtype) {

                var _this = this;
                return this.$myHttp({
                    method: 'POST',
                    url: _this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": dtype
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
                    _this.dirData[dtype] = resArry;

                    Cookies.set("dirData", _this.dirData)

                });
            },
            /**
             * 查询table数据
             */
            findAllProject() {

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + this.myTableData.url + window.suffix,
                    data: {
                        "entity": this.myTableData.entity,
                        "ext": this.myTableData.ext,
                        "where":this.myTableData.where,
                        "pageNum": this.currentPage - 1,
                        "pageSize": this.mysize,
                        "orderBy": this.myTableData.myorderBy
                    }
                }).then(res => {
                    //成功回调方法
                    this.total = Number(res.data.total);
                    this.tableData = res.data.rows;
                    if(this.$refs.myTable.$el){
                        this.setPaginationStyle();
                    }
                });
            },
            sizeChange(size) {
                this.mysize = size;
                this.currentPage = 1;
                this.findAllProject();
            },
            currentChange(page) {
                this.currentPage = page;
                this.findAllProject();
            },
            sorthange(column) {
                if (column.prop !== null) {
                    this.myTableData.myorderBy = column.prop + ' ' + (column.order === 'ascending' ? 'asc' : 'desc');
                }
                this.currentPage = 1;
                this.findAllProject();
            },
            //查看
            handleView(row) {
                this.$router.push({
                    "name": row.projectType == '01'? 'viewOppoCost':'viewProjectCost',
                    "query": {
                        /* "projectName":row.projectName,*/
                        "id": row.id,
                        "projectId":row.projectId,
                        "costForecastNum":row.costForecastNum,
                        "currentPage": this.currentPage,
                        "row":JSON.stringify(row),
                        "searchData":JSON.stringify(this.myTableData.entity),
                        "contractValue":row.contractValue
                    }
                })
            },
            //修改
            handleEdit(row) {
                if(row.status == '2'){
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
                            "searchData":JSON.stringify(this.myTableData.entity),
                            "contractValue":row.contractValue
                        }
                    })
                }else if (row.status == '1'){
                    //已冻结/审批通过状态

                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'project/cost/copyCostForecast' + window.suffix,
                        data: {
                            "entity": row
                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.subCode == '10004'){

                            this.$notify({
                                title: '无法复制',
                                message: res.data.subMsg,
                                type: 'warning'
                            });
                        }else {
                            this.findAllProject();
                        }

                    });
                }

            },
            //删除
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
                            _this.findAllProject()
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
            /**
             * 设置分页位置的方法
             */
            setPaginationStyle: function () {

                //浏览器高度小于 704 直接定位到底部
                if (this.fullHeight < 704) {

                    this.paginationStyle = 'background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100;'
                    this.myTableStyle = 'margin-bottom:35px'
                } else {
                    //table宽度小于 浏览器高度 - （面包屑 + 导航栏的高度）说明需要固定位置
                    if (this.$refs.myTable.$el.clientHeight < this.fullHeight - 320) {
                        this.paginationStyle = 'background-color: white'
                        this.myTableStyle = 'margin-bottom:0px'
                    } else {
                        this.paginationStyle = 'background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100;'
                        this.myTableStyle = 'margin-bottom:35px'
                    }
                }
            },

            /**
             * 读取用户储存后的排序数据
             */
            readCustomStyleData: function () {
                //初始化读取 用户存储排列顺序
                if ((Cookies.get(this.myTableData.customStyleData[0])) && (Cookies.get(this.myTableData.customStyleData[1]))) {

                    this.myTableData.tableThead = JSON.parse(Cookies.get(this.myTableData.customStyleData[0]));
                    this.myTableData.checkedThreadData = JSON.parse(Cookies.get(this.myTableData.customStyleData[1]));
                }
            }


        },
        mounted: function () {
            var _this = this, dirArry = [], reqArry = [];

            window.onresize = () => {
                return (() => {
                    window.fullHeight = document.documentElement.clientHeight
                    _this.fullHeight = window.fullHeight
                    if(_this.$refs.myTable.$el){
                        _this.setPaginationStyle()
                    }
                })()
            }


            if (this.myTableData.customStyleData) {
                this.readCustomStyleData()
            }


            this.myTableData.tableThead.forEach(function (item) {

                if (item.dirKey) {
                    dirArry.push(item.dirKey)
                    _this.dirLablArry.push(item.headKey)
                }
            });


            for (var items in dirArry) {
                reqArry.push(this.makeDataDictionary(dirArry[items]))
            }


            if(this.$store.state.projectListCostSearchData){

                this.myTableData.entity = this.$store.state.projectListCostSearchData
            }


            if(this.$route.params.currentPage){
                this.currentPage = this.$route.params.currentPage;
            }


            this.$myHttp.all(reqArry)
                .then(_this.$myHttp.spread(function (acct, perms) {
                    // 两个请求现在都执行完成
                    _this.findAllProject();
                }));

        },
        filters: {
            optfil(v, idx, perimission) {
                if (perimission == null || perimission == '') perimission = '0'
                if (v == null || v == '') v = '0'
                let num = Number.parseInt(perimission, 2) | Number.parseInt(v, 2);
                v = num.toString(2).length < 4 ? util.addPreZero(num.toString(2)) : num.toString(2)
                return v == null ? true : v.charAt(idx) == 1 ? false : true;
            },
            datafil: function (v1, v2) {

                var data = JSON.parse(Cookies.get("dirData"));
                var res = "";
                data[v2].forEach(function (item) {
                    if (item.value == v1) {
                        res = item.label
                    }
                });
                return res
            }
        },
        computed: {
            permission() {
                let nodeCode=this.myTableData.nodeCode==null?"":this.myTableData.nodeCode;
                if (this.myGlobal.getPermission)
                    return this.myGlobal.getPermission(nodeCode);//11101
            }
        },
        watch: {
            //监控屏幕的高度，动态设置分页样式
            fullHeight(val) {
                this.fullHeight = val
                if (this.$refs.myTable.$el.clientHeight < this.fullHeight - 280) {
                    this.paginationStyle = 'background-color: white'
                    this.myTableStyle = 'margin-bottom:0px'

                } else {
                    this.paginationStyle = 'background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100;'
                    this.myTableStyle = 'margin-bottom:35px'
                }
            },
            clientHeight(val) {
                this.clientHeight = val
            }

        },
        updated: function () {
            //render完成之后出发调整样式方法
            if(this.$refs.myTable.$el){
                this.setPaginationStyle();
            }
        }

    }
</script>

<style scoped>
    .el-button.is-circle {
        padding: 7px;
    }

    .el-tooltip {

        height: 28px;
    }

    .myTable .cell {
        overflow-y: hidden !important;
        max-height: 28px !important;
    }

</style>
