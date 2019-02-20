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

            <el-form ref="form" v-model="searchForm" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="5" :xs="20">
                    <el-form-item label="起始月份">
                        <el-date-picker
                                v-model="month1" style="width: 90%"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>

                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="结束月份">
                        <el-date-picker
                                v-model="month2"  style="width: 90%"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="部门名称">
                        <el-input v-model="searchForm.orgName" placeholder="请输入" style="width: 90%" size="small" clearable></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="5" :xs="20">
                    <el-form-item label="姓名">
                        <el-input v-model="searchForm.cname" placeholder="请输入" style="width: 90%" size="small" clearable></el-input>
                    </el-form-item>

                </el-col>

                <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
                <el-button style="margin-top: 5px" type="primary" size="small" @click="showMore()">展开更多</el-button>
            </el-form>


            <el-form ref="form" :model="searchForm" label-width="80px" style="margin-bottom: 20px"
                     v-show="isShowMore">
                <!--<el-col :span="5" :xs="20">-->
                    <!--<el-form-item label="审批状态" >-->
                        <!--<el-select v-model="searchForm.approvalState" placeholder="请选择" clearable filterable  size="small" style="width: 90%">-->
                            <!--<el-option-->
                                    <!--v-for="item in approvalStateData"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->

                <el-col :span="5" :xs="20">
                    <el-form-item label="类型">
                        <el-select v-model="searchForm.mgtType" placeholder="请选择" clearable filterable  size="small" style="width: 90%">
                            <el-option
                                    v-for="item in mgtTypeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>

        </el-col>
        <div v-hasPermission="'innerListExportBtn'">
            <el-button @click="exportExcel()" type="success" size="small" style="margin-top: 10px;margin-bottom: 5px">
                <i style="margin-right: 5px" class="el-icon-document"></i>报表导出
            </el-button>
            <label style="font-size: 13px;margin-left: 10px"><span style="color: red">*</span>统计数据范围为已审批</label>
        </div>

        <el-table border stripe :summary-method="getSummaries" show-summary v-if="ref" id="myTable"
                  ref="multipleTable"
                  @sort-change ="change"
                  :data="tableData3"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="400"
                  :header-cell-style="{textAlign:'center'}"
                  size="small"
                  @selection-change="handleSelectionChange">

            <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="55"-->
                    <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="period"
                    label="月份"
                    width="95" sortable
            >
            </el-table-column>
            <el-table-column
                    prop="orgName"
                    width="150"
                    label="部门名称" sortable
            >
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="姓名"
                    width="95" sortable
            >
            </el-table-column>
            <el-table-column
                    prop="mgtType"
                    label="类型"
                    width="95" sortable
            >
                <template slot-scope="scope">
                    <p>{{scope.row.mgtType|mgtTypeFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="project"
                    label="项目"
                    width="95" sortable
            >
            </el-table-column>
            <el-table-column
                    prop="ctask"
                    label="任务"
                    width="95" sortable
            >
                <!--<template slot-scope="scope">-->
                    <!--<p>{{scope.row.task|taskFil(scope)}}</p>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column
                    prop="standardUnits"
                    label="标准人天"
                    width="95"
                    sortable
                    align="right">

            </el-table-column>
            <el-table-column
                    prop="manhourDays"
                    label="核销人天"
                    sortable
                    align="right">

            </el-table-column>
            <el-table-column
                    prop="unitCost"
                    label="核销成本(元)"
                    sortable
                    min-width="100"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.unitCost|amountFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="notManhourDays"
                    label="非核销人天"
                    sortable
                    min-width="120"
                    align="right">

            </el-table-column>
            <el-table-column
                    prop="notUnitCost"
                    label="非核销成本(元)"
                    sortable
                    min-width="130"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.notUnitCost|amountFil}}</p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                layout="total,sizes,prev, pager, next,jumper"
                :total="total"
                @current-change="currentChange"
                :current-page="mypage"
                @size-change="sizeChange"
                style="background-color: white"
        >
        </el-pagination>
    </div>

</template>


<script>
    import draggable from 'vuedraggable'

    import Cookies from 'js-cookie';
    import util from '../../libs/util'
    export default {
        data() {
            return {
                ext:'',
                approvalStateData:[
                    {
                        label:'待审批',
                        value:'1'
                    },{
                        label:'已审批',
                        value:'2'
                    }
                ],
                mgtTypeData:[
                    {
                        label:'商机',
                        value:'3'
                    },{
                        label:'外部项目',
                        value:'5'
                    },
                    {
                        label:'研发项目',
                        value:'7'
                    },{
                        label:'内部项目',
                        value:'8'
                    },
                    {
                        label:'内部管理',
                        value:'9'
                    }
                ],
                month1:'',
                month2:'',
                value5:'',
                ref:true,
                tableData3: [],
                total:null,
                pagesize: 10,
                mypage:1,
                mysize:10,
                isShowMore: false,
                searchForm: {
                    approvalState:'',
                    mgtType:'',
                    month1:"",
                    month2:"",
                    orgName:"",
                    cname:"",
                },
                mydirection:'',
                myfield:'',
                conditions:[],
                entity:{}
            }
        },
        components: {
        },
        methods: {
            showMore(){
                if(!this.isShowMore){
                    this.isShowMore = true;
                }else {
                    this.isShowMore = false;
                }
            },
            ///报表导出
           /* exportExcel() {
                util.exportExcel( 'myTable','内部管理成本明细.xlsx')
            },*/
            ///报表导出
            exportExcel() {
                //util.exportExcel( 'myTable','员工报工率.xlsx')
                //20181205导出数据修改
                let field=this.field || '';
                let direction=this.direction || '';
                var _this = this;
                var url = this.prefix + 'stats/getVIewMgtCostDetail' + window.suffix;
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
                    var exportThead = [{"headKey":"period","headName":"月份"},{"headKey":"orgName","headName":"部门名称"},
                        {"headKey":"cname","headName":"姓名"},{"headKey":"project","headName":"项目"},
                        {"headKey":"ctask","headName":"任务"},{"headKey":"standardUnits","headName":"标准人天","isNumber":true},
                        {"headKey":"manhourDays","headName":"核销人天","isNumber":true},{"headKey":"unitCost","headName":"核销成本(元)","isCost":1,"isNumber":true},
                        {"headKey":"notManhourDays","headName":"非核销人天","isNumber":true},{"headKey":"notUnitCost","headName":"非核销成本(元)","isCost":1,"isNumber":true}];
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
                    var fileName = "内部管理成本明细.xlsx";
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
                this.findAllProject(this.conditions,this.mypage-1,this.mysize,this.direction,this.field);
                this.ref = true;
            },
            currentChange(page){
                this.mypage=page;
                this.ref = false;
                var _this = this;
                this.findAllProject(this.conditions,this.mypage-1,this.mysize,this.direction,this.field);
                this.ref = true
            },
            returnFloat(value){
                if(value){
                    const pattern = /(?=((?!\b)\d{3})+$)/g;
                    var value = Math.round(parseFloat(value) * 100) / 100;
                    var xsd = value.toString().split(".");
                    if (xsd.length == 1) {
                        value = xsd[0].toString().replace(pattern, ',') + ".00";
                        return value;
                    }
                    if (xsd.length > 1) {
                        if (xsd[1].length < 2) {
                            value = xsd[0].toString().replace(pattern, ',') + '.'+xsd[1]+"0";
                        }else if(xsd[1].length>=2){ /*有两位小数的情况*/
                            value=xsd[0].toString().replace(pattern, ',')+'.'+xsd[1];
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
                    if (index === 1||index === 2||index === 3||index === 4||index === 5) {
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
                     if(items == '9' || items=='11'){
                        resData.push(util.returnFloat(sums[items]/1000));
                    }else if(items=='7' || items=='8' || items=='10'){
                         resData.push((Math.round(sums[items]*100)/100).toFixed(1));
                     }else{
                        resData.push(util.returnFloat(sums[items]));
                    }
                }
                resData[0] = "合计";
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
            //排序
            change(column, prop, order ){
                this.field="";
                this.direction='';
                if(column.prop&&column.order){
                    this.direction=column.order==='ascending'?'asc':'desc';
                    this.field=column.prop;
                    this.mypage=1;
                    this.findAllProject(this.conditions,this.mypage-1,this.mysize,this.direction,this.field)
                }
            },
            findAllProject(range,mypage,mysize,direction,field) {
                field=this.field || '';
                direction=this.direction || '';
                this.$myHttp({
                    method: 'POST',
                    /*url: this.prefix +'stats/findByCondition' + window.suffix, findMgtCostDetailByCondition*/
                    url:this.prefix+"stats/getVIewMgtCostDetail"+ window.suffix,
                    data: {
                        "entity":this.entity,
                        'ext':this.ext,
                        "range":this.conditions,
                        'pageNum':this.mypage-1,
                        'pageSize':this.mysize,
                        "orderBy":field +' '+direction

                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data.rows;
                    this.total = Number(res.data.total);
                })
            },
            search() {
                var _this = this;
                var myconditions=[];
                this.entity={};
                if(this.month1&&this.month2){
                    var preyear=(this.month1.getFullYear()).toString()+"-";
                    var premonth=(this.month1.getMonth()+1);
                    if(premonth>9){
                        premonth=(this.month1.getMonth()+1).toString();
                    }else{
                        premonth="0"+(this.month1.getMonth()+1).toString()
                    }
                    var nextyear=(this.month2.getFullYear()).toString()+"-";
                    var nextmonth=(this.month2.getMonth()+1);
                    if(nextmonth>9){
                        nextmonth=(this.month2.getMonth()+1).toString();
                    }else{
                        nextmonth="0"+(this.month2.getMonth()+1).toString()
                    }
                    var value1=preyear+premonth;
                    var value2=nextyear+nextmonth;
                    myconditions.push({"field":'period',"from":value1,"to":value2});
                }else if(this.month1 && !this.month2){
                    var preyear=(this.month1.getFullYear()).toString()+"-";
                    var premonth=(this.month1.getMonth()+1);
                    if(premonth>9){
                        premonth=(this.month1.getMonth()+1).toString();
                    }else{
                        premonth="0"+(this.month1.getMonth()+1).toString()
                    }
                    var value1=preyear+premonth;
                    myconditions.push({"field":'period',"from":value1,"to":null});
                }else if(!this.month1 && this.month2){
                    var nextyear=(this.month2.getFullYear()).toString()+"-";
                    var nextmonth=(this.month2.getMonth()+1);
                    if(nextmonth>9){
                        nextmonth=(this.month2.getMonth()+1).toString();
                    }else{
                        nextmonth="0"+(this.month2.getMonth()+1).toString()
                    }
                    var value2=nextyear+nextmonth;
                    myconditions.push({"field":'period',"to":value2,"from":null});
                }
                this.entity.cname=this.searchForm.cname;
                this.entity.orgName=this.searchForm.orgName;
                this.entity.mgtType = this.searchForm.mgtType;
                this.ext = this.searchForm.approvalState;
                this.conditions=myconditions;
                this.mypage=1;
                this.mysize=10;
                console.log("查询条件是",this.conditions);
                this.findAllProject(this.conditions,this.entity,this.mypage-1,this.mysize,this.direction,this.field)
            },


            makeDataDictionary: function () {



            }
        },
        mounted: function () {
            this.findAllProject();
            this.makeDataDictionary();
        },
        filters:  {
            mgtTypeFil:function(value){
                if (value == '3') {
                    return '商机'
                } else if (value == '5') {
                    return '外部项目'
                } else if(value == '7'){
                    return '研发项目'
                }else if (value == '8') {
                    return '内部项目'
                } else if (value == '9') {
                    return '内部管理'
                }
            },
            taskFil:function (value,scope) {


                let mgtName = ''
                let dirData = JSON.parse(localStorage.getItem('DirData'))


                switch (scope.row.mgtType){
                    case '3':
                        mgtName = '商机类型'
                        break
                    case '5':
                        mgtName = '外部项目'
                        break
                    case '7':
                        mgtName = '研发项目'
                        break
                    case '8':
                        mgtName = '内部项目'
                        break
                    case '9':
                        mgtName = '内部管理类型'
                        break
                }

                let mgtTypeData = dirData.filter(o => o.dtype == mgtName)


                console.log(mgtTypeData)

                //console.log(mgtTypeData.filter(o => o.dkey == value))

              

            }
        },
        computed: {}
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