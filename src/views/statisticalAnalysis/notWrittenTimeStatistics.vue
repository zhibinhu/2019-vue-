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
                                v-model="searchForm.month1" style="width: 90%;height: 32px"
                                type="month"
                                value-format="yyyy-MM"
                                placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>

                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="结束月份">
                        <el-date-picker
                                v-model="searchForm.month2"  style="width: 90%"
                                type="month"
                                value-format="yyyy-MM"
                                placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                        查询
                    </el-button>
                </el-col>
            </el-form>
        </el-col>
        <div v-hasPermission="'notWriteExportBtn'">
            <el-button @click="exportExcel()" type="success" size="small" style="margin-top: 10px;margin-bottom: 5px">
                <i style="margin-right: 5px" class="el-icon-document"></i>报表导出
            </el-button>
            <!-- <el-button type="primary" size="small" style="margin: 10px;float: right" @click="Excel">
                &lt;!&ndash; <a :href="execlUrl" download="oppoFeeDetail.xls" style="color: #fff"></a>&ndash;&gt;
                 <i style="margin-right: 5px" class="el-icon-download"></i>导出

             </el-button>-->
        </div>
        <el-table v-if="ref" stripe border id="myTable"
                  ref="multipleTable"
                  :data="tableData3"
                  tooltip-effect="dark"
                  style="width: 100%;border-collapse: collapse"
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
                    width="155"
            >
            </el-table-column>
            <el-table-column
                    prop="projectType"
                    label="类型"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.projectType|projectTypeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectCode"
                    label="编号"
            >
            </el-table-column>
            <el-table-column
                    prop="projectName"
                    label="名称"
            >
            </el-table-column>
            <el-table-column
                    prop="pmName"
                    label="负责人"
            >
            </el-table-column>
            <el-table-column
                    prop="daysOfApprovalPending"
                    label="待审批人天(天)"
            >
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
                form: '',
                checked:false,
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
                    month1:'',
                    month2:'',
                },
                mysearchData:{},
                myextData:[],
                entity:{},
                myorderBy:'',
                ext:[],
                range:[],
                execlUrl: this.prefix+"view/exportExcel?reportName=oppoFeeDetail"
            }

        },
        components: {
            draggable
        },
        methods: {
            ///报表导出
            exportExcel() {
                // util.exportExcel( 'myTable','工时未被审批情况.xlsx')
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix +'viewWorkhour/getViewPendingAudit' + window.suffix,
                    data: {
                        "entity":this.entity,
                        "ext":this.ext,
                        "range":this.range,
                        "orderBy": this.myorderBy,
                        "pageNum":  this.mypage-1,
                        "pageSize": 99999,
                    }
                }).then(res => {
                    //成功回调方法
                    var exportList = res.data.rows;//导出表格的内容
                    // var header = {"手机名称":"id","颜色":"name","售价":"sex"};
                    var header = [];
                    var exportThead =[
                        {"headKey":"month","headName":"月份"},
                        {"headKey":"projectType","headName":"类型"},
                        {"headKey":"projectCode","headName":"编号"},
                        {"headKey":"projectName","headName":"名称"},
                        {"headKey":"pmName","headName":"负责人"},
                        {"headKey":"daysOfApprovalPending","headName":"待审批（人天）","isNumber":true}
                    ];

                    for (var i = 0; i < exportThead.length; i++) {
                        var headerEle={};
                        headerEle['column'] = exportThead[i].headKey;
                        headerEle['columnName'] = exportThead[i].headName;
                        if(exportThead[i].isCost != "" && exportThead[i].isCost != undefined ){
                            headerEle['isCost'] = exportThead[i].isCost;
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
                                console.log([header[k]['isCost']])
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
                    // console.log('list----', list);
                    var fileName = "工时填报情况统计.xlsx";
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
            sizeChange(size){
                this.ref = false;
                this.mypage=1;
                this.mysize=size;
                this.findAllProject();
                this.ref = true;
            },
            currentChange(page){
                this.mypage=page;
                this.ref = false;
                this.findAllProject();
                this.ref = true
            },
            change(column, prop, order ){
                if(column.prop&&column.order){
                    column.prop=column.prop.replace(/\_/, '|');
                    this.myorderBy=column.prop+' '+(column.order==='ascending'?'asc':'desc');
                    this.mypage=1;
                    this.findAllProject();
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
                    if(sums[items]!== ""&& items !== '7' && items !== '8'){
                        sums[items] = ((sums[items]/1000)).toString();
                    }

                    resData.push(this.returnFloat(sums[items]));
                }
                resData[0] = "合计";
                resData[9] = resData[9]*100/100;
                resData[8] = resData[8]*100/100;

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
                    url: this.prefix +'viewWorkhour/getViewPendingAudit' + window.suffix,
                    data: {
                        "entity":this.entity,
                        "ext":this.ext,
                        "range":this.range,
                        "orderBy": this.myorderBy,
                        "pageNum":  this.mypage-1,
                        "pageSize": this.mysize,
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data.rows;
                    this.total=Number(res.data.total);
                })
            },
            search() {
                this.range=[];
                if(this.searchForm.month1&&this.searchForm.month2){
                    this.range.push({"field": "month","from": this.searchForm.month1,"to": this.searchForm.month2})
                }else{
                    this.range=[];
                }
                this.mypage=1;
                this.mysize=10;
                this.findAllProject();
            },

            makeDataDictionary:function () {
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
                    this.industryData = resArry;
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
                    this.winRateData = resArry;
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
                    this.projectStageData = resArry;
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
                    this.statusData = resArry;
                });
            }


        },
        mounted: function () {
            this.findAllProject();
            this.makeDataDictionary();
        },
        filters:  {

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
                if(value==0||value==null){
                    return ''
                }else{
                    return value
                }
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