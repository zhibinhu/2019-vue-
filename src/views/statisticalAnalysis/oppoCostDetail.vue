<style>
    .el-input--small .el-input__inner {
        height: 32px;
        line-height: 32px;
    }
    .el-input--prefix .el-input__inner{
        height: 32px;
    }
</style>
<template>
    <div class="hhhhhh">
        <el-col :span="24" style="background-color: white">

            <el-form ref="form" v-model="searchForm" label-width="80px" style="margin-top: 20px;overflow: hidden">
                <el-col :span="5" :xs="20">
                    <el-form-item label="起始月份">
                        <el-date-picker
                                value-format="yyyy-MM"
                                v-model="searchForm.month1" style="width: 90%;height: 32px"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>

                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="结束月份">
                        <el-date-picker
                                value-format="yyyy-MM"
                                v-model="searchForm.month2"  style="width: 90%"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="部门名称">
                        <el-input v-model="searchForm.orgName" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="姓名">
                        <el-input v-model="searchForm.cname" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="4" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                        查询
                    </el-button>
                    <el-button style="margin-top: 5px" type="primary" size="small" @click="showMore()">展开更多</el-button>
                </el-col>
            </el-form>
            <el-form ref="form" :model="searchForm" label-width="80px" style="margin-bottom: 20px"
                     v-show="isShowMore">
                <el-col :span="5" :xs="20">
                    <el-form-item label="机会名称">
                        <el-input v-model="searchForm.oppoProjectName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="客户名称">
                        <el-input v-model="searchForm.customerName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="销售">
                        <el-input v-model="searchForm.saleName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">&nbsp;</el-col>
            </el-form>
        </el-col>
        <div v-hasPermission="'costTableExportBtn'">
        <el-button @click="exportExcel()" type="success" size="small" style="margin-top: 10px;margin-bottom: 5px">
            <i style="margin-right: 5px" class="el-icon-document"></i>报表导出
        </el-button>

        <label style="font-size: 13px;margin-left: 10px"><span style="color: red">*</span>统计数据范围为已审批</label>
       <!-- <el-button type="primary" size="small" style="margin: 10px;float: right" @click="Excel">
           &lt;!&ndash; <a :href="execlUrl" download="oppoFeeDetail.xls" style="color: #fff"></a>&ndash;&gt;
            <i style="margin-right: 5px" class="el-icon-download"></i>导出

        </el-button>-->
        </div>
        <el-table v-if="ref" stripe border :summary-method="getSummaries" show-summary id="myTable"
                  ref="multipleTable"
                  :data="tableData3"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="400"
                  :header-cell-style="{textAlign:'center'}"
                  size="small"
                  @sort-change ="change"
                  @selection-change="handleSelectionChange">
            <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="55"-->
                    <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="month"
                    label="月份"
                    width="85" sortable="custom"
            >
            </el-table-column>
            <el-table-column
                    prop="orgName"
                    label="部门名称"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.authUser">{{scope.row.authUser.orgName}}</p>-->
                    <p >{{scope.row.orgName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="姓名"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                   <!-- <p v-if="scope.row.authUser">{{scope.row.authUser.cname}}</p>-->
                    <p >{{scope.row.cname}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="oppoNum"
                    label="商机编号"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.oppoNum}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="oppoProjectName"
                    label="机会名称"
                    width="245" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.oppo">{{scope.row.oppo.oppoProjectName}}</p>-->
                    <p >{{scope.row.oppoProjectName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    label="客户名称"
                    width="225" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.oppo">{{scope.row.oppo.customerName}}</p>-->
                    <p >{{scope.row.customerName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="saleName"
                    label="销售"
                    width="75" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.oppo">{{scope.row.oppo.saleName}}</p>-->
                    <p>{{scope.row.saleName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="mandayCancel"
                    label="核销人天"
                    width="100"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.mandayCancel|mandayNoCancelFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="mandayNoCancel"
                    label="非核销人天"
                    width="115"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.mandayNoCancel|mandayNoCancelFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeEffortCancel"
                    label="核销人力成本(元)"
                    width="145"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.feeEffortCancel|formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeEffortNoCancel"
                    label="非核销人力成本(元)"
                    width="155"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.feeEffortNoCancel|formatFil}}</p>
                </template>
            </el-table-column>

            <el-table-column
                    prop="expectedTimeTosign"
                    label="预计签订时间"
                    width="120" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.expectedTimeTosign|contractSignTimeFil}}</p>-->
                    <p  >{{scope.row.expectedTimeTosign|contractSignTimeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectStartTime"
                    label="项目开始时间"
                    width="120" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.projectStartTime|contractSignTimeFil}}</p>-->
                    <p  >{{scope.row.projectStartTime|contractSignTimeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectEndTime"
                    label="项目结束时间"
                    width="120" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.projectEndTime|contractSignTimeFil}}</p>-->
                    <p  >{{scope.row.projectEndTime|contractSignTimeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="preMangerName"
                    label="售前经理"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.preMangerName}}</p>-->
                    <p  >{{scope.row.preMangerName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pdName"
                    label="项目总监"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.pdName}}</p>-->
                    <p  >{{scope.row.pdName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="winRate"
                    label="赢单率"
                    width="95"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.winRate}}</p>-->
                    <p  >{{scope.row.winRate|winRateFmt}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="oppo_contractAmount"
                    label="合同总金额(元)"
                    width="135"
                    sortable="custom"
                    align="right">
                <!--prop="oppo_contractAmount"    1.嵌套表以此方式写以实现后台排序，但传参时把“_”转化成“|”，2.可实现前端内层表字段的合计，-->
                <!--prop="oppo|projectStage"      1.嵌套表以此方式写以方便实现后台排序-->
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.contractAmount|formatFil}}</p>-->
                    <p  >{{scope.row.contractAmount|formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectStage"
                    label="阶段"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.projectStage}}</p>-->
                    <p  >{{scope.row.projectStage|projectStageFmt}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pmoName"
                    label="PMO"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.pmoName}}</p>-->
                    <p  >{{scope.row.pmoName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.status|statusFil}}</p>-->
                    <p  >{{scope.row.status|statusFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="isAllowWorkingHours"
                    label="关联填报工时"
                    width="120"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.isAllowWorkingHours|isAllowWorkingHoursFil}}</p>-->
                    <p  >{{scope.row.isAllowWorkingHours|isAllowWorkingHoursFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="138" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.createTime}}</p>-->
                    <p  >{{scope.row.createTime}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="memo"
                    label="备注"
                    width="245" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p  v-if="scope.row.oppo">{{scope.row.oppo.memo}}</p>-->
                    <p  >{{scope.row.memo}}</p>
                </template>
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
    </div>

</template>


<script>
    import draggable from 'vuedraggable'
    import util from '../../libs/util'


    export default {
        data() {
            return {
                range:[],
                form: '',
                ref:true,
                value5:'',
                tableData3: [ ],
                total:null,
                pagesize:10,
                page:'',
                size:'',
                mysize:10,
                mypage:1,
                isShowMore: false,
                searchForm: {
                    projectName: '',
                    contractType: '',
                    pmName: '',
                    month1:'',
                    month2:'',
                },
                mysearchData:{},
                myorderBy:'',
                myextData:"",
                projectStateData:[],
                projectTypeData:[
                    {
                        label: '内部项目',
                        value: '8'
                    },
                    {
                        label: '外部项目',
                        value: '5'
                    },
                    {
                        label: '研发项目',
                        value: '7'
                    }
                ],
                execlUrl: this.prefix+"view/exportExcel?reportName=oppoFeeDetail"
            }

        },
        components: {
            draggable
        },
        methods: {
            ///报表导出
            /*exportExcel() {
                util.exportExcel( 'myTable','商机成本明细.xlsx')
            },*/
            exportExcel() {
                //20181205导出数据修改
                var _this = this;
                //var url = this.prefix + 'stats/getViewProjUser' + window.suffix;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix +'stats/getViewOppoUser' + window.suffix,
                    data: {
                        "entity": _this.mysearchData,
                        "ext":_this.myextData,
                        "range":_this.range,
                        "orderBy": _this.myorderBy,
                        'pageNum': 0,
                        'pageSize':10000,
                    }
                }).then(res => {
                    // 成功回调方法
                    this.loading = true;
                    var exportList = res.data.rows;//导出表格的内容
                    var header = [];
                    var exportThead = [{"headKey":"month","headName":"月份"},{"headKey":"orgName","headName":"部门名称"},
                        {"headKey":"cname","headName":"姓名"},{"headKey":"oppoNum","headName":"商机编号"},
                        {"headKey":"oppoProjectName","headName":"机会名称"},{"headKey":"customerName","headName":"客户名称"},
                        {"headKey":"saleName","headName":"销售"},{"headKey":"mandayCancel","headName":"核销人天","isNumber":true},{"headKey":"mandayNoCancel","headName":"非核销人天","isNumber":true} ,
                        {"headKey":"feeEffortCancel","headName":"核销成本(元)","isCost":1,"isNumber":true},{"headKey":"feeEffortNoCancel","headName":"非核销成本(元)","isCost":1,"isNumber":true},
                        {"headKey":"expectedTimeTosign","headName":"预计签订时间","isTimeData":1},{"headKey":"projectStartTime","headName":"项目开始时间","isTimeData":1},
                        {"headKey":"projectEndTime","headName":"项目结束时间","isTimeData":1},{"headKey":"preMangerName","headName":"售前经理"},
                        {"headKey":"pdName","headName":"项目总监"},{"headKey":"winRate","headName":"赢单率","dirKey":"赢单率"} ,
                        {"headKey":"totalContractAmount","headName":"合同金额(元)","isCost":1,"isNumber":true},{"headKey":"projectStage","headName":"阶段","dirKey":"阶段"},
                        {"headKey":"pmoName","headName":"PMO"},{"headKey":"status","headName":"状态","dirKey":"商机状态"},
                        {"headKey":"isAllowWorkingHours","headName":"关联填报工时","dirKey":"trueOrFalse"},{"headKey":"createTime","headName":"创建时间","isTimeData":1},{"headKey":"memo","headName":"备注"}];
                    for (var i = 0; i < exportThead.length; i++) {
                        var headerEle={};
                        headerEle['column'] = exportThead[i].headKey;
                        headerEle['columnName'] = exportThead[i].headName;
                        if(exportThead[i].isCost != "" && exportThead[i].isCost != undefined ){
                            headerEle['isCost'] = exportThead[i].isCost;
                        }
                        if(exportThead[i].dirKey){
                            headerEle['dictType']=exportThead[i].headKey;
                            headerEle['dirKey']=exportThead[i].dirKey;
                        }
                        if(exportThead[i].isTimeData){
                            headerEle['isTimeData']=true;
                        }
                        if(exportThead[i].isNumber){
                            headerEle['isNumber']=true;
                        }
                        header.push(headerEle);
                    }
                    var list = [];
                    for (var i = 0; i < exportList.length; i++) {
                        let obj = {};
                        for (var k in header) {
                            if (header[k]['column'] == 'pageIndex') {
                                obj[header[k]['column']] = i + 1;
                                // continue;
                            } else if(header[k]['column']!=='dictType'){
                                if([header[k]['isCost']] != "" && [header[k]['isCost']] != undefined ){
                                    obj[header[k]['column']] = exportList[i][header[k]['column']]/1000;
                                }else if([header[k]['percent']] != "" && [header[k]['percent']] != undefined ){
                                    obj[header[k]['column']] = exportList[i][header[k]['column']] * 100;
                                }else{
                                    obj[header[k]['column']] = exportList[i][header[k]['column']];
                                }
                            }
                        }
                        list.push(obj);
                    }
                    var fileName = "商机成本明细.xlsx";
                    this.$myHttp({
                        method: 'post',
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
            sizeChange(size){
                this.ref = false;
                this.mypage=1;
                this.mysize=size;
                this.findAllProject(this.mysearchData,this.myextData,this.myorderBy,this.mypage-1,this.mysize);
                this.ref = true;
            },
            currentChange(page){
                this.mypage=page;
                this.ref = false;
                this.findAllProject(this.mysearchData,this.myextData,this.myorderBy,this.mypage-1,this.mysize);
                this.ref = true
            },
            change(column, prop, order ){
                if(column.prop&&column.order){
                    column.prop=column.prop.replace(/\_/, '|');
                    this.myorderBy=column.prop+' '+(column.order==='ascending'?'asc':'desc');
                    this.mypage=1;
                    this.findAllProject(this.mysearchData,this.myextData,this.myorderBy,this.mypage-1,this.mysize);
                }
            },
            showMore(){
                if(!this.isShowMore){
                    this.isShowMore = true;
                }else {
                    this.isShowMore = false;
                }
            },
            returnFloat(value){
                if(value){
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
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                const resData = [];

                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index === 1||index === 2||index === 3||index === 4||index === 5||index === 6||index === 7||index === 17) {
                        sums[index] = '';
                        return;
                    }
                    if(index===13||index===14||index===15||index===16||index===17||index===19||index===20||index===21||index===22||index===24){
                        sums[index]='';
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
                    if(items == 10){
                        resData.push(util.returnFloat(sums[items]/1000));
                    }else if(items == 18){
                        resData.push(util.returnFloat(sums[items]/1000));
                    }else if(items==8 || items==9){
                        resData.push((Math.round(sums[items]*100)/100).toFixed(1));
                    }else{
                        resData.push(util.returnFloat(sums[items]));
                    }

                }
                resData[0] = '合计';
                resData[1] = '';
                resData[3] = '';
                resData[5] = '';
                resData[6] = '';

                return resData;

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
            findAllProject() {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix +'stats/getViewOppoUser' + window.suffix,
                    data: {
                        "entity":this.mysearchData,
                        "ext":this.myextData,
                        "range":this.range,
                        "orderBy": this.myorderBy,
                        "pageNum":  this.mypage-1,
                        "pageSize": this.mysize,
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data.rows;
                    this.total=Number(res.data.total);
                    var _this = this;
                    /*this.tableData3.forEach((item, index) => {
                        _this.industryData.forEach((subitem,index) => {
                            if(item.industry){
                                if(item.industry == subitem.value){
                                    item.industry = subitem.label;
                                }
                            }
                        });
                    });*/
                    /*this.tableData3.forEach((item, index) => {
                        _this.winRateData.forEach((subitem,index) => {
                            if(item.winRate){
                                if(item.winRate == subitem.value){
                                    item.winRate = subitem.label;
                                }
                            }
                        });
                    });*/
                    /*this.tableData3.forEach((item, index) => {
                        _this.projectStageData.forEach((subitem,index) => {
                            if(item.projectStage){
                                if(item.projectStage == subitem.value){
                                    item.projectStage = subitem.label;
                                }
                            }
                        });
                    });*/
                    this.tableData3.forEach((item, index) => {
                        if(item.contractAmount){
                            item.oppo_contractAmount=item.contractAmount;
                            /* console.log("合同金额",item);*/
                        }
                    });
                    this.total = Number(res.data.total);
                })
            },
            search() {/*console.log("查询条件",this.searchForm.month1,this.searchForm.month2);*/
                /*var searchData = {
                    "oppo": {

                    },
                    "authUser":{

                    }
                };*/
                var searchData = {
                };
                var extData = '';

                this.range = [{"field": "month", "from": this.searchForm.month1, "to": this.searchForm.month2}]

                this.myextData = extData;

                searchData.cname = this.searchForm.cname;
                searchData.orgName = this.searchForm.orgName;
                searchData.oppoProjectName = this.searchForm.oppoProjectName;
                searchData.customerName = this.searchForm.customerName;
                searchData.saleName = this.searchForm.saleName;

                this.mysearchData=searchData;
                this.mypage=1;
                this.mysize=10;
                this.findAllProject(this.mysearchData,this.myextData,this.myorderBy,this.mypage-1,this.mysize);

            },
            formatAmount(row, column, value, index){
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                if(value){
                    var value=Math.round(parseFloat(value/1000)*100)/100;
                    var xsd=value.toString().split(".");
                    console.log(xsd);

                    if(xsd.length==1){
                        value=value.toString().replace(pattern, ',')+".00";
                        return value;
                    }
                    if(xsd.length>1){
                        if(xsd[1].length<2){
                            value=value.toString().replace(pattern, ',')+"0";
                        }
                        return value;
                    }
                }
            },
            projectStateFmt:function (row, column, cellValue, index) {

                for(var items in this.projectStateData){
                    if(this.projectStateData[items].value == cellValue){
                        return this.projectStateData[items].label;
                    }
                }
            },

            projectTypeFmt:function (row, column, cellValue, index) {

                if(cellValue == 5){
                    return '外部项目'
                }else {

                    return '内部项目'
                }
            },
            contractSignTimeFmt:function (row, column, cellValue, index) {
                if(cellValue){
                    return cellValue.substring(0, 10)
                }
            },

            makeDataDictionary:function () {

                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "项目状态"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.projectStateData = resArry;
                });
                //行业
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "行业"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.industryData = resArry;
                });
                //赢单率
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "赢单率"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.winRateData = resArry;
                });
                //阶段
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "阶段"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.projectStageData = resArry;
                });
                //状态
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "状态"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }
                    _this.statusData = resArry;
                    console.log('状态',_this.statusData);
                });
            }


        },
       mounted: function () {
           this.findAllProject();
            this.makeDataDictionary();
        },
        filters:  {
            projectStageFmt:function (value) {
                if(value=='01'){
                    return "初步沟通"
                }else if(value=='02'){
                    return "需求了解"
                }else if(value=='03'){
                    return "方案交流"
                }else if(value=='04'){
                    return "价格讨论"
                }else if(value=='05'){
                    return "合同流程"
                }
            },

            winRateFmt:function (value) {
                if(value=='01'){
                    return "高"
                }else if(value=='02'){
                    return "中"
                }else if(value=='03'){
                    return "低"
                }
            },

            isAllowWorkingHoursFil:function(value){
                if(value==1){
                    return "是"
                }else if(value==0){
                    return "否"
                }
            },
            contractSignTimeFil:function (value) {
                if(value){
                    var myValue = '' + value;
                    return myValue.substring(0, 10)
                }

            },
            statusFil: function (value) {
                if (value == "1") {
                    return '成功'
                } else if(value == "0"){
                    return '进行中'
                }else if(value == "2"){
                    return '失败'
                }else if(value == "3"){
                    return '终止'
                }
            },
            feeTypeFil:function (value) {
                if(value=="01"){
                    return "计费"
                }else if(value=="02"){
                    return "不计费"
                }
            },
            projectTypeFil:function (value) {
                if (value == '3') {
                    return '商机'
                } else if (value == '5') {
                    return '外部项目'
                } else if (value == '7') {
                    return '研发项目'
                } else if (value == '8') {
                    return '内部项目'
                }else if (value == '9') {
                    return '内部管理'
                }
            },
            projectStageFil:function(value){
                if (value == '01') {
                    return '初步沟通'
                } else if (value == '02') {
                    return '需求了解'
                } else if (value == '03') {
                    return '方案交流'
                } else if (value == '04') {
                    return '价格讨论'
                }else if (value == '05') {
                    return '合同流程'
                }
            },

            totalContractAmountFil:function (value) {
                return value/1000
            },
            mandayNoCancelFil:function(value){
                return value
            },
            createByFil:function (value) {
                if(value){
                    return value.split('|')[1]
                }
            },
            formatFil:function(value){
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                if(value){
                    var value=Math.round(parseFloat(value/1000)*100)/100;
                    var xsd=value.toString().split(".");
                    if(xsd.length==1){
                        value=value.toString().replace(pattern, ',')+".00";
                        return value;
                    }
                    if(xsd.length>1){
                        if(xsd[1].length<2){
                            value=value.toString().replace(pattern, ',')+"0";
                        }
                        return value;
                    }
                }
            }
        },
        computed: {
            statusValue:function () {
                for(var items in this.statusData){
                    if(this.statusData[items].dkey == this.status){
                        return this.statusData[items].dvalue
                    }
                }
            }
        }
    }
</script>
<style scoped="this">
    .el-button.is-circle{padding: 6px}
    .el-checkbox+.el-checkbox{
        margin-left:0;
    }
    .el-checkbox{
        width: 23%;
        border: 1px solid #ddd;
        background: #E9EAEC;
        padding: 5px 6px;
        border-radius: 5px;
        margin: 0 13px 10px 0;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }

</style>