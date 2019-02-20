<style>
    .el-input--small .el-input__inner {
        height: 32px;
        line-height: 32px;
    }
    .el-input--prefix .el-input__inner{
        height: 32px;
    }
    .el-table thead.is-group th{
        border: 1px solid #fff;
        background: #dbe2eb;
    }
    .el-table__body, .el-table__footer, .el-table__header{
        border-collapse: collapse;
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
                <el-col :span="4" :xs="20">
                    <el-form-item label="部门名称">
                        <el-input v-model="searchForm.orgName" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="4" :xs="20">
                    <el-form-item label="姓名">
                        <el-input v-model="searchForm.username" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" :xs="20" style="margin-top: 10px;font-size: 13px">填报率</el-col>
                <el-col :span="2" :xs="20">
                        <el-checkbox label="不足100%" v-model="checked" name="type" style="border: none;background: none;margin-top: 5px"></el-checkbox>
                </el-col>
                <el-col :span="3" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                        查询
                    </el-button>
                  <!--  <el-button style="margin-top: 5px" type="primary" size="small" @click="showMore()">展开更多</el-button>-->
                </el-col>
            </el-form>
        </el-col>
        <div v-hasPermission="'workWriteSumBtn'">
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
                  show-summary
                  :summary-method="getSummaries"
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
                    sortable="month"
            >
            </el-table-column>
            <el-table-column
                    prop="orgName"
                    sortable="orgName"
                    label="部门名称"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.orgName}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="姓名"
                    sortable="username"
                    width="95"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.username}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="standardDays"
                    label="标准人天"
                    width="80"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.standardDays}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    label="商机"
                    align="center"
            >
                <el-table-column
                        prop="daysOfBillableForOppo"
                        label="核销人天"
                        width="80"
                        align="right">
                    <template slot-scope="scope">
                        <p>{{scope.row.daysOfBillableForOppo}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="daysOfBillEnableForOppo"
                        label="非核销人天"
                        width="90"
                        align="right">
                    <template slot-scope="scope">
                        <p>{{scope.row.daysOfBillEnableForOppo}}</p>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                    label="项目"
                    align="center"
            >
                <el-table-column
                        prop="daysOfBillableForProject"
                        label="核销人天"
                        width="80"
                        align="right">
                    <template slot-scope="scope">
                        <p>{{scope.row.daysOfBillableForProject}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="daysOfBillEnableForProject"
                        label="非核销人天"
                        width="90"
                        align="right">
                    <template slot-scope="scope">
                        <p>{{scope.row.daysOfBillEnableForProject}}</p>
                    </template>
                </el-table-column>
            </el-table-column>

            <el-table-column
                    prop="daysOfInterManage"
                    label="内部管理核销人天"
                    width="130"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.daysOfInterManage}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="daysOfPendingApproval"
                    label="待审批人天"
                    width="90"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.daysOfPendingApproval}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="fillReportRate"
                    label="填报率"
                    width="85"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.fillReportRate|fillReportRateFil}}</p>
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
                    month1:'',
                    month2:'',
                    orgName:'',
                    username:''
                },
                checked:false,
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
                //util.exportExcel( 'myTable','员工报工率.xlsx')
                //20181205导出数据修改
                let field=this.field || '';
                let direction=this.direction || '';
                var _this = this;
                var url = this.prefix + 'stats/getViewWorkhourReport' + window.suffix;
                this.$myHttp({
                    method: 'POST',
                    url: url,
                    data: {
                        'range': this.conditions,
                        'ext':this.ext,
                        'entity':this.entity,
                        'orderBy':field+' '+ direction,
                        'pageNum': 0,
                        'pageSize':99999,
                    }
                }).then(res => {
                    // 成功回调方法
                    this.loading = true;
                    var exportList = res.data.rows;//导出表格的内容
                    // var header = {"手机名称":"id","颜色":"name","售价":"sex"};
                    var header = [];
                    var exportThead = [{"headKey":"month","headName":"月份"},{"headKey":"orgName","headName":"部门名称"},
                        {"headKey":"username","headName":"姓名"},{"headKey":"standardUnits","headName":"标准人天","isNumber":true},
                        {"headKey":"daysOfBillableForOppo","headName":"商机核销人天","isNumber":true},{"headKey":"daysOfBillEnableForOppo","headName":"商机非核销人天","isNumber":true},
                        {"headKey":"daysOfBillableForProject","headName":"项目核销人天","isNumber":true},{"headKey":"daysOfBillEnableForProject","headName":"项目非核销人天","isNumber":true},
                        {"headKey":"daysOfInterManage","headName":"内部管理核销人天","isNumber":true},{"headKey":"daysOfPendingApproval","headName":"待审批人天","isNumber":true} ,
                        {"headKey":"fillReportRate","headName":"填报率","percent":1,"isNumber":true}];
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
            /*exportExcel() {
                util.exportExcel( 'myTable','工时填报情况统计.xlsx')
            },*/
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
                var _this = this;
                this.findAllProject();
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
            getSummaries(param){

                const { columns, data } = param;
                const sums = [];
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                const resData = [];
                columns.forEach((column, index) => {
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
                    resData.push((Math.round(sums[items]*100)/100).toFixed(1));
                }
                resData[0] = '合计';
                resData[1] = '';
                resData[2] = '';
                resData[3] = '';
//                resData[6] = '';
                resData[11] = '';


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
                    url: this.prefix +'stats/getViewWorkhourReport' + window.suffix,
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

                this.entity.username = this.searchForm.username;
                this.entity.orgName = this.searchForm.orgName;

                if (this.checked) {
                    this.range.push({"field": "fillReportRate","from": '0',"to":"99.99"})
                }
                this.mypage=1;
                this.mysize=10;
                this.findAllProject();
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
            fillReportRateFil:function(value){
                if(value){
                    return value+"%"
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