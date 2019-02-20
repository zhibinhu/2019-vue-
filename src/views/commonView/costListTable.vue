

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

        <el-button @click="exportTableList()" type="success" size="small" style="margin-top: 10px;margin-bottom: 5px"
                   v-if="myTableData.exportName">
            <i style="margin-right: 5px" class="el-icon-document"></i>报表导出
        </el-button>

        <div style="background-color: white;position: relative;overflow: hidden;width:100%;" id="tableBox" class="tableBox">

            <el-table
                    class="myTable"
                    :data="tableData"
                    id="myTable"
                    v-if="mark"
                    :style="myTableStyle"
                    :max-height="maxHeight"
                    size="small"
                    @sort-change="sorthange"
                    :sort-orders="sortOrders"
                    @expand-change="expand"
                    ref="myTable"
                    :row-class-name="tableRowClassName"

            >

                <el-table-column type="expand">
                    <template slot-scope="props" style="width: 100%">

                        <sub-version-table-operation v-if="myTableData.useSubVersionTableOperation" :projectId="props.row.projectId" @reafshCostList="reafshCostList"> </sub-version-table-operation>
                        <sub-version-table v-else :projectId="props.row.projectId"></sub-version-table>

                    </template>
                </el-table-column>


                <el-table-column :prop="items.headKey" :key='index' v-for='(items , index) in myTableData.tableThead'
                                 min-width="180px"
                                 :label="items.headName" :width="items.width*2.5" :align="items.align"
                                 v-if="!items.isHidden"
                                 sortable="custom">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" effect="light"
                                    :disabled="!items.isNeedTips || !scope.row[items.headKey]" >

                            <div v-if="items.dirKey" slot="content">{{scope.row[items.headKey]}}</div>

                            <div v-else slot="content">{{scope.row[items.headKey]}}</div>

                            <p v-if="items.dirKey"> {{scope.row[items.headKey] | datafil(items.dirKey)}}</p>
                            <p v-if="items.amoutKey"> {{scope.row[items.headKey] | amountFil(items.amoutKey)}}</p>
                            <p v-if="items.isProjectFmt"> {{scope.row[items.headKey] | projectTypeFil(items.amoutKey)}}</p>
                            <p v-if="items.isTimeData">
                                {{scope.row[items.headKey] | prAndOppoTimeFmt(items.amoutKey)}}</p>
                            <p v-if="items.isPersonData">
                                {{scope.row[items.headKey] | prAndOppoPersonFmt(items.amoutKey)}}</p>
                            <p v-if="items.isAmountFmt"> {{scope.row[items.headKey] | amountFmt(items.amoutKey)}}</p>

                            <p v-if="items.headKey == 'isAllowWorkingHours'">{{scope.row[items.headKey]== 'true'? '是':'否'}}</p>

                            <router-link v-if="items.isFirstColumn" :to="{}"   @click.native="handleView(scope.row)">{{scope.row[items.headKey]}}</router-link>
                            <p v-else>{{scope.row[items.headKey]}}</p>
                        </el-tooltip>

                    </template>


                </el-table-column>

                <el-table-column
                        v-if="!myTableData.isHiddenperationO"
                        label="操作"
                        :width="myTableData.width">
                    <template slot-scope="scope">
                        <!--<el-button-->
                                <!--size="mini"-->
                                <!--type="success"-->
                                <!--circle-->
                                <!--title="查看"-->
                                <!--@click="handleView(scope.row)"><i class="el-icon-tickets" style="font-size: 11px"></i>-->
                        <!--</el-button>-->
                        <!--v-hasPermission="myTableData.editPermission"-->
                        <el-button
                                :disabled="scope.row.status != 2"
                                size="mini"
                                type="primary"
                                circle
                                title='编辑'
                                @click="handleEdit(scope.row)"><i class="el-icon-edit" style="font-size: 11px"></i>
                        </el-button>
                        <!--v-hasPermission="myTableData.copyPermission"-->
                        <el-button
                                :disabled="scope.row.status != 1"
                                size="mini"
                                type="success"
                                circle
                                title='拷贝'
                                @click="copy(scope.row,scope)"><i class="el-icon-plus" style="font-size: 11px"></i>
                        </el-button>
                        <!--v-hasPermission="myTableData.delPermission"-->
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
    import subVersionTable from '../commonView/subVersionTable.vue'
    import subVersionTableOperation from '../commonView/subVersionTableOperation.vue'

    export default {

        data() {
            return {
                copyRowsData:{},
                placement: 'right-end',
                dialogTableVisible: false,
                disabled: true,
                mark: true,
                fullHeight: document.documentElement.clientHeight,
                maxHeight:null,
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
                paginationStyle: 'background-color: white;position: absolute;bottom: 0; width: 100%; z-index: 100',
                myTableStyle: 'margin-bottom:32px'
            }

        },
        components: {
            draggable,
            subVersionTable,
            subVersionTableOperation
        },
        props: ['myTableData','showWhich'],
        methods: {
            exportTableList () {
                var _this = this;
                var url = _this.prefix + _this.myTableData.url + window.suffix;
                this.$myHttp({
                    method: 'POST',
                    url: url,
                    data: {
                        'entity': _this.myTableData.entity,
                        'ext': _this.myTableData.ext,
                        'where': _this.myTableData.where,
                        'pageNum': 0,
                        'pageSize':99999,
                        'orderBy': _this.myTableData.myorderBy
                    }
                }).then(res => {
                    // 成功回调方法
                    this.loading = true;
                    this.exportList = res.data.rows;//导出表格的内容
                    // var header = {"手机名称":"id","颜色":"name","售价":"sex"};
                    var header = [];
                    for (var i = 0; i < this.exportThead.length; i++) {
                        if (!this.exportThead[i].isHidden) {
                            var headerEle={};
                            headerEle['column'] = this.exportThead[i].headKey;
                            headerEle['columnName'] = this.exportThead[i].headName;
                            if(this.exportThead[i].dirKey){
                                headerEle['dictType']=this.exportThead[i].headKey;
                                headerEle['dirKey']=this.exportThead[i].dirKey;
                            }
                            if(this.exportThead[i].isAmountFmt){
                                headerEle['isAmountFmt']=true;
                            }
                            if(this.exportThead[i].isTimeData){
                                headerEle['isTimeData']=true;
                            }
                            if(this.exportThead[i].isNumber){
                                headerEle['isNumber']=true;
                            }
                            header.push(headerEle);
                        }
                    }
                    console.log('header---', header);
                    // var list =[{"id":"w","name":"red","sex":"1234"},{"id":"w","name":"red","sex":"1234"},{"id":"w","name":"red","sex":"1234"}];
                    var list = [];
                    for (var i = 0; i < this.exportList.length; i++) {
                        let obj = {};
                        for (var k in header) {
                            if (header[k]['column'] == 'pageIndex') {
                                obj[header[k]['column']] = i + 1;
                                // continue;
                            } else if(header[k]['column']!=='dictType'){
                                obj[header[k]['column']] = this.exportList[i][header[k]['column']];
                            }
                        }
                        list.push(obj);
                    }
                    // console.log('list----', list);
                    var fileName = this.myTableData.exportName;
                    this.$myHttp({
                        method: 'post',
                        // url: this.prefix + '/microarch/sys/syscommon/exportexcel',
                        url: this.prefix + '/sysData/exportexcel',
                        data: {
                            "list": list,
                            "header": header,
                            "fileName": fileName
                        },
                        responseType: 'arraybuffer'
                    }).then(res => {
                        // 成功回调
                        console.log('res--excel导出--',res)
                        var headers = res.headers;
                        var blob = new Blob([res.data], {
                            type: headers['content-type']
                        });
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = decodeURIComponent(headers['filename']);
                        link.click();
                        //   firefox 里面触发
                        var browser=navigator.userAgent.toLowerCase();
                        if(browser.indexOf('firefox')>-1) {
                            var event = document.createEvent("MouseEvents");
                            event.initEvent("click", true, true);
                            link.dispatchEvent(event);
                        }
                        _this.loading = false;
                    });
                });
            },
            reafshCostList(){
                this.$emit('reafshCostList');
            },
//计算table距离顶部的最大高度值
            getElementTop(elem){
                var elemTop=elem.offsetTop;//获得elem元素距相对定位的父元素的top
                elem=elem.offsetParent;//将elem换成起相对定位的父元素
                while(elem!=null){//只要还有相对定位的父元素
                    /*获得父元素 距他父元素的top值,累加到结果中 */
                    elemTop+=elem.offsetTop;
                    //再次将elem换成他相对定位的父元素上;
                    elem=elem.offsetParent;
                }
                return elemTop;
            },
            tableRowClassName({row, rowIndex}) {
                return 'my-row';
            },

            expand(row){
                console.log(row)
            },
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
            findAllProject(isCopy,pageNum) {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + this.myTableData.url + window.suffix,
                    data: {
                        "entity": this.myTableData.entity,
                        "ext": this.myTableData.ext,
                        "where":this.myTableData.where,
                        "pageNum": pageNum == 'search'? '0' :this.currentPage - 1,
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

                    if(isCopy == 'isCopy'){
                        this.handleEdit(res.data.rows[0])
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
                        "contractValue":row.contractValue,
                        "processInstanceId":row.processInstanceId
                    }
                })
            },
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
                        "searchData":JSON.stringify(this.myTableData.entity),
                        "contractValue":row.contractValue,
                        "processInstanceId":row.processInstanceId
                    }
                })
            },

            //复制
            copy(row,scope){
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
                        this.findAllProject('isCopy');
                    }

                });
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
                //动态设置table最大高度  使头部、尾部在数据增多时固定'
                let myTableCur='';
                let myTable=document.getElementsByClassName('myTable');
                if(this.showWhich=='tabOne'){
                    myTableCur=myTable[0];
                }else{
                    myTableCur=myTable[1];
                }
                let eleTop=this.getElementTop(myTableCur);
                this.maxHeight = this.fullHeight - eleTop - 42;
                let tableBoxCur='';
                let tableBox=document.getElementsByClassName('tableBox');
                if(this.showWhich=='tabOne'){
                    tableBoxCur=tableBox[0];
                }else{
                    tableBoxCur=tableBox[1];
                }
                let boxEleTop=this.getElementTop(tableBoxCur);
                let tableBoxHeight=tableBoxCur.offsetHeight;
                if(tableBoxHeight + boxEleTop < this.fullHeight){
                    this.paginationStyle='background-color: white;position: absolute;left:0;bottom: 0; width: 100%; z-index: 100;';
                }else{
                    this.paginationStyle = 'background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100;';
                }
                //浏览器高度小于 704 直接定位到底部
                // if (this.fullHeight < 704) {
                //
                //     this.paginationStyle = 'background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100;'
                //     this.myTableStyle = 'margin-bottom:35px'
                // } else {
                //     //table宽度小于 浏览器高度 - （面包屑 + 导航栏的高度）说明需要固定位置
                //     if (this.$refs.myTable.$el.clientHeight < this.fullHeight - 320) {
                //         this.paginationStyle = 'background-color: white'
                //         this.myTableStyle = 'margin-bottom:0px'
                //     } else {
                //         this.paginationStyle = 'background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100;'
                //         this.myTableStyle = 'margin-bottom:35px'
                //     }
                // }
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
                    _this.setPaginationStyle()
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
                // this.fullHeight = val
                // if (this.$refs.myTable.$el.clientHeight < this.fullHeight - 280) {
                //     this.paginationStyle = 'background-color: white'
                //     this.myTableStyle = 'margin-bottom:0px'
                //
                // } else {
                //     this.paginationStyle = 'background-color: white;position: fixed;bottom: 0; width: 100%; z-index: 100;'
                //     this.myTableStyle = 'margin-bottom:35px'
                // }
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

<style>
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



    .el-table .my-row {
        background: #fafafa
    }


</style>
