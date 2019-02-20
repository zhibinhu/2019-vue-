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
    <div>
        <el-col :span="24" style="background-color: white">

            <el-form ref="form" v-model="searchForm" label-width="80px" style="margin-top: 20px;overflow: hidden">
                <el-col :span="5" :xs="20">
                        <el-form-item label="起始月份">
                            <el-date-picker
                                    value-format="yyyy-MM"
                                    v-model="searchForm.month1" style="width: 90%"
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
                    <el-form-item label="项目名称">
                        <el-input v-model="searchForm.projectName" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="客户名称">
                        <el-input v-model="searchForm.customerName" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="项目经理">
                        <el-input v-model="searchForm.pmName" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="项目类型">
                        <el-select v-model="searchForm.projectType" placeholder="请选择" clearable filterable  size="small" style="width: 90%">
                            <el-option
                                    v-for="item in projectTypeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :xs="20">&nbsp;</el-col>
            </el-form>
        </el-col>
        <div v-hasPermission="'projectCostListExport'">
            <el-button @click="exportExcel()" type="success" size="small" style="margin-top: 10px;margin-bottom: 5px">
                <i style="margin-right: 5px" class="el-icon-document"></i>报表导出
            </el-button>
            <label style="font-size: 13px;margin-left: 10px"><span style="color: red">*</span>统计数据范围为已审批</label>
        </div>

        <el-table border stripe :summary-method="getSummaries" show-summary v-if="ref" id="myTable"
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
                    width="85"
                    sortable="custom"
            >
            </el-table-column>
            <el-table-column
                    prop="orgName"
                    label="部门名称"
                    width="125" sortable="custom"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.orgName}}</p>
                    <!--<p v-if="scope.row.authUser">{{scope.row.authUser.orgName}}</p>-->
                </template>
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="姓名"
                    width="75" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.authUser">{{scope.row.authUser.cname}}</p>-->
                    <p>{{scope.row.cname}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectNum"
                    label="项目编号"
                    width="95" sortable="custom"
            >
            </el-table-column>
            <el-table-column
                    prop="projectName"
                    label="项目名称"
                    width="155" sortable="custom"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.projectName}}</p>
                    <!--<p v-if="scope.row.project">{{scope.row.project.projectName}}</p>-->
                </template>
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    label="客户名称"
                    width="145" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.customerName}}</p>-->
                    <p>{{scope.row.customerName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pmName"
                    label="项目经理"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.pmName}}</p>-->
                    <p>{{scope.row.pmName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectType"
                    label="项目类型"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.projectType|projectTypeFil}}</p>-->
                    <p>{{scope.row.projectType|projectTypeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="mandayCancel"
                    label="核销人天"
                    width="95"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.mandayCancel|mandayNoCancelFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="mandayNoCancel"
                    label="非核销人天"
                    width="105"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.mandayNoCancel}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeEffortCancel"
                    label="核销成本(元)"
                    width="115"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.feeEffortCancel|formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeEffortNoCancel"
                    label="非核销成本(元)"
                    width="125"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.feeEffortNoCancel|formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="manday"
                    label="计费人天"
                    width="115"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p >
                        <span>{{scope.row.manday}}</span>
                    </p>
                    <!--<p v-if="scope.row.project">{{scope.row.mandayCancel}}</p>-->
                </template>
            </el-table-column>
           <el-table-column
                    prop="noManday"
                    label="非计费人天"
                    width="125"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p  >
                        <span>{{scope.row.noManday}}</span>
                    </p>
                </template>
            </el-table-column>
             <el-table-column
                    prop="feeEffort"
                    label="计费成本(元)"
                    width="115"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p >
                        <span>{{scope.row.feeEffort|formatFil}} </span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="noFeeEffort"
                    label="非计费成本(元)"
                    width="135"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <p>
                        <span>{{scope.row.noFeeEffort|formatFil}}</span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="contractName"
                    label="合同名称"
                    width="145" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.contractName}}</p>-->
                    <p>{{scope.row.contractName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectState"
                    label="项目状态"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.projectState}}</p>-->
                    <p>{{scope.row.projectState|statusFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="serviceType"
                    label="服务类型"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.serviceType}}</p>-->
                    <p>{{scope.row.serviceType|serviceTypeFmt}}</p>

                </template>
            </el-table-column>
            <el-table-column
                    prop="ignOrgName"
                    label="签订部门"
                    width="105" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.signOrgName}}</p>-->
                    <p>{{scope.row.signOrgName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="saleName"
                    label="销售人员"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.saleName}}</p>-->
                    <p>{{scope.row.saleName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="customerSigningDepartment"
                    label="客户签订部门"
                    width="135" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.customerSigningDepartment}}</p>-->
                    <p>{{scope.row.customerSigningDepartment}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="project_totalContractAmount"
                    label="合同金额(元)"
                    width="115"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.totalContractAmount|formatFil}}</p>-->
                    <p>{{scope.row.totalContractAmount|formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="project_totalNumberDays"
                    label="人天总数"
                    width="95"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.totalNumberDays}}</p>-->
                    <p>{{scope.row.totalNumberDays}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="project_totalHumanCost"
                    label="人力成本总预算(元)"
                    width="149"
                    sortable="custom"
                    align="right">
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.totalHumanCost|formatFil}}</p>-->
                    <p>{{scope.row.totalHumanCost|formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectStartTime"
                    label="项目开始时间"
                    width="120" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.projectStartTime|contractSignTimeFil}}</p>-->
                    <p>{{scope.row.projectStartTime|contractSignTimeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectEndTime"
                    label="项目结束时间"
                    width="120" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.projectEndTime|contractSignTimeFil}}</p>-->
                    <p>{{scope.row.projectEndTime|contractSignTimeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="contractSignTime"
                    label="合同签订时间"
                    width="125" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.contractSignTime|contractSignTimeFil}}</p>-->
                    <p>{{scope.row.contractSignTime|contractSignTimeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pmoName"
                    label="PMO"
                    width="85" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.pmoName}}</p>-->
                    <p >{{scope.row.pmoName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pdName"
                    label="项目总监"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.pdName}}</p>-->
                    <p >{{scope.row.pdName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeType"
                    label="计费类型"
                    width="95" sortable="custom"
            >
                <template slot-scope="scope">
                    <!-- <p v-if="scope.row.project">{{scope.row.project.feeType}}</p>-->
                    <p>{{scope.row.feeType|feeTypeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createBy"
                    label="创建人"
                    width="85" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.createBy|createByFil}}</p>-->
                    <p >{{scope.row.createBy|createByFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="145" sortable="custom"
            >
                <template slot-scope="scope">
                   <!-- <p v-if="scope.row.project">{{scope.row.project.createTime}}</p>-->
                    <p >{{scope.row.createTime}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="memo"
                    label="备注"
                    width="165" sortable="custom"
            >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.project">{{scope.row.project.memo}}</p>-->
                    <p >{{scope.row.memo}}</p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="mysize"
                :current-page="mypage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                style="background-color: white">
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
                page:'0',
                size:'',
                ref:true,
                serviceType:'',
                mypage:1,
                mysize:10,
                mysearchData:{},
                myorderBy:'',
                myextData:"",
                feeType:'',
                form: '',
                value5:'',
                tableData3: [ ],
                total:null,
                pagesize: 10,
                isShowMore: false,
                searchForm: {
                    projectName: '',
                    orgName: '',
                    cname: '',
                    month1:'',
                    month2:'',
                },
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
                execlUrl: this.prefix+"view/exportExcel?reportName=projectFeeDetail"
            }

        },
        components: {
            draggable
        },
        methods: {
            /**
             * 创建人修改人翻译
             */
            formatCreateAndModifyByFil(value,result,index){
                let username = "";
                if(value) {
                    value = value.split('|')[0]
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'sysData/getUserByUsername' + window.suffix,
                        data: {
                            "entity":{
                                username:value
                            }
                        }
                    }).then(res => {
                        username = res.data.rows[0].cname;
                        this.tableData3[index][result] =username
                    });
                }else{
                    this.tableData3[index][result] =username
                }
            },
            ///报表导出
            /*exportExcel() {
                util.exportExcel( 'myTable','项目成本明细.xlsx')
            },*/
            exportExcel() {
                //20181205导出数据修改
                var _this = this;
                //var url = this.prefix + 'stats/getViewProjUser' + window.suffix;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix +'stats/getViewProjUser' + window.suffix,
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
                        {"headKey":"cname","headName":"姓名"},{"headKey":"projectNum","headName":"项目编号"},
                        {"headKey":"projectName","headName":"项目名称"},{"headKey":"customerName","headName":"客户名称"},
                        {"headKey":"pmName","headName":"项目经理"},{"headKey":"projectType","headName":"项目类型","dirKey":"项目类型"},
                        {"headKey":"mandayCancel","headName":"核销人天","isNumber":true},{"headKey":"mandayNoCancel","headName":"非核销人天","isNumber":true} ,
                        {"headKey":"feeEffortCancel","headName":"核销成本(元)","isCost":1,"isNumber":true},{"headKey":"feeEffortNoCancel","headName":"非核销成本(元)","isCost":1,"isNumber":true},
                        {"headKey":"manday","headName":"计费人天","isNumber":true},{"headKey":"noManday","headName":"非计费人天","isNumber":true},
                        {"headKey":"feeEffort","headName":"计费成本(元)","isCost":1,"isNumber":true},{"headKey":"noFeeEffort","headName":"非计费成本(元)","isCost":1,"isNumber":true},
                        {"headKey":"contractName","headName":"合同名称"},{"headKey":"projectState","headName":"项目状态","dirKey":"项目状态"} ,
                        {"headKey":"serviceType","headName":"服务类型","dirKey":"服务类型"},{"headKey":"ignOrgName","headName":"签订部门"},
                        {"headKey":"saleName","headName":"销售人员"},{"headKey":"customerSigningDepartment","headName":"客户签订部门"},
                        {"headKey":"totalContractAmount","headName":"合同金额(元)","isCost":1,"isNumber":true},{"headKey":"totalNumberDays","headName":"人天总数","isNumber":true},
                        {"headKey":"totalHumanCost","headName":"人力成本总预算(元)","isCost":1,"isNumber":true},{"headKey":"projectStartTime","headName":"项目开始时间","isTimeData":1} ,
                        {"headKey":"projectEndTime","headName":"项目结束时间","isTimeData":1},{"headKey":"contractSignTime","headName":"合同签订时间","isTimeData":1},
                        {"headKey":"pmoName","headName":"PMO"},{"headKey":"pdName","headName":"项目总监"},
                        {"headKey":"feeType","headName":"计费类型","dirKey":"计费类型"},{"headKey":"createBy","headName":"创建人"},
                        {"headKey":"createTime","headName":"创建时间","isTimeData":1},{"headKey":"memo","headName":"备注"}];
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
                            } else if(header[k]['column']!='dictType'){
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
                    var fileName = "项目成本明细.xlsx";
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
                    if(column.prop=="noCharging"||column.prop=="charging"){
                        column.prop="manday";
                    }
                    if(column.prop=="billingCost"||column.prop=="noBillingCost"){
                        column.prop="feeEffort";
                    }
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
                    if(!isNaN(value)){
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
                    }else{
                        return 0
                    }
                }/*else{
                    return
                }*/

            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                const resData = [];


               /* data.forEach(function (e) {
                    console.log(e.manday)
                })*/


                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index === 1||index === 2||index === 3||index === 4||index === 5||index === 6||index === 7||index === 8||index===18 || index==19 || index===22 || index===34) {
                        sums[index] = '';
                        return;
                    }
                    if (index === 17||index === 20||index === 21||index === 26||index === 28||index === 27||index === 29||index === 30||index === 31||index === 32||index === 33) {
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
                    if(sums[items]!== ""&& items !== '9' && items !== '10'&&items !== '24' &&items !== '13' &&items !== '14'){
                        sums[items] = ((sums[items]/1000)).toString();
                    }
                    /*/!* 需要进行金额转化的情况下才走  returnFloat  方法*!/*/
                    if(items=="12"||items=="11"||items=="15"||items=="16"||items=="23"||items=="25"){
                        sums[items]=this.returnFloat(sums[items])
                    }
                    resData.push((sums[items]));
                }
                resData[0] = "合计";

                resData[9] = (Math.round(resData[9]*100)/100).toFixed(1);
                resData[10] = (Math.round(resData[10]*100)/100).toFixed(1);
                resData[13] = (Math.round(resData[13]*100)/100).toFixed(1);

                resData[14] = (Math.round(resData[14]*100)/100).toFixed(1);
                resData[24] = (Math.round(resData[24]*100)/100).toFixed(1);

                /* resData[9] = "-";
                 resData[8] = "-";*/



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
            findAllProject(mysearchData,myextData,myorderBy,mypage,mysize) {
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix +'stats/getViewProjUser' + window.suffix,
                    data: {
                        "entity": this.mysearchData,
                        "ext":this.myextData,
                        "range":this.range,
                        "orderBy": this.myorderBy,
                        "pageNum":  this.mypage-1,
                        "pageSize": this.mysize,
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data.rows;
                    var _this = this;

                    /*this.tableData3.forEach((item, index) => {
                        _this.serviceTypeData.forEach((subitem,index) => {
                            if(item.serviceType){
                                if(item.serviceType == subitem.dkey){
                                    item.serviceType = subitem.dvalue;
                                }
                            }
                        });
                    });*/
                    /*this.tableData3.forEach((item, index) => {
                        _this.feeTypeData.forEach((subitem,index) => {
                            if(item.feeType){
                                if(item.feeType == subitem.dkey){
                                    item.feeType = subitem.dvalue;
                                }
                            }
                        });
                    });*/
                    /*this.tableData3.forEach((item, index) => {
                        _this.projectStateData.forEach((subitem,index) => {
                            if(item.projectState){
                                if(item.projectState == subitem.dkey){
                                    item.projectState = subitem.dvalue;
                                }
                            }
                        });
                    });*/
                    this.tableData3.forEach((item, index) => {
                        if(item.totalContractAmount){
                            item.project_totalContractAmount=item.totalContractAmount;
                           /* console.log("合同金额",item);*/
                        }
                    });
                    this.tableData3.forEach((item, index) => {
                        if(item.totalNumberDays){
                            item.project_totalNumberDays=item.totalNumberDays;
                            /*console.log("人天总数",item);*/
                        }
                    });
                    this.tableData3.forEach((item, index) => {
                        if(item.totalHumanCost){
                            item.project_totalHumanCost=item.totalHumanCost;
                            /*console.log("人力成本预算",item);*/
                        }
                    });
                    this.tableData3.forEach((item,index) => {
                        if(item.feeType === '01'){
                            this.tableData3[index].charging = item.manday
                            this.tableData3[index].billingCost = item.feeEffort

                        }else if(item.feeType === '02'){
                            this.tableData3[index].noCharging = item.manday
                            this.tableData3[index].noBillingCost = item.feeEffort

                        }
                    });
                    this.tableData3.forEach((item, index) => {
                        if(item.createBy){
                            this.formatCreateAndModifyByFil(item.createBy,"createBy",index);
                        }
                    });
                    this.total = Number(res.data.total);
                })
            },
            search() {
                 var _this = this;
                 /*var searchData = {
                         "project": {

                         },
                         "authUser":{

                         }
                 };*/
                var searchData = {
                };
                var extData = '';
                this.range = [{"field": "month", "from": this.searchForm.month1, "to": this.searchForm.month2}]

                this.myextData = extData;
                searchData.cname = _this.searchForm.cname;
                searchData.orgName = _this.searchForm.orgName;
                searchData.projectName = _this.searchForm.projectName;
                searchData.customerName = _this.searchForm.customerName;
                searchData.pmName = _this.searchForm.pmName;
                searchData.projectType = _this.searchForm.projectType

                this.mysearchData=searchData;
                this.mypage=1;
                this.mysize=10;
                this.findAllProject(this.mysearchData,this.myextData,this.myorderBy,this.mypage-1,this.mysize);
            },

            makeDataDictionary: function () {
                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "服务类型"
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.serviceTypeData = res.data.rows;
                });

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "计费类型"
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.feeTypeData = res.data.rows;
                });

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "项目状态"
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.projectStateData = res.data.rows;
                });

                this.findAllProject();


            }


        },
        mounted: function () {
            this.makeDataDictionary();
        },
        filters:  {
            serviceTypeFmt:function (value) {
                if(value=='01'){
                    return "开发"
                }else if(value=='02'){
                    return "人天"
                }else if(value=='03'){
                    return "实施"
                }else if(value=='04'){
                    return "软硬件供货"
                }
            },
            mandayNoCancelFil:function(value){
                if(value==0||value==null){
                    return ''
                }else{
                    return value
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
            statusFil:function (value) {
                if(value=="01"){
                    return "进行中"
                }else if(value=="02"){
                    return "已结束"
                }else if(value=="03"){
                    return "提前开工"
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
            totalContractAmountFil:function (value) {
                return value/1000
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
            },
            projectState:function(value){
                this.projectStateData.forEach((subitem,index) => {
                    if(item.projectState){
                        if(item.projectState == subitem.dkey){
                            item.projectState = subitem.dvalue;
                        }
                    }
                });
            }
        },

        computed: {
            manday:function (value) {
                console.log(value)
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