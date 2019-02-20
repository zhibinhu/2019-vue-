<style>
    .el-input--small .el-input__inner {
        height: 32px;
        line-height: 32px;
    }

    .el-input--prefix .el-input__inner {
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
                                v-model="month2" style="width: 90%"
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


                <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
                <!--<el-button style="margin-top: 5px" type="primary" size="small" @click="showMore()">展开更多</el-button>-->

            </el-form>

            <el-form ref="form" :model="searchForm" label-width="80px" style="margin-bottom: 20px"
                     v-show="isShowMore">
                <el-col :span="5" :xs="20">
                    <el-form-item label="审批状态" >
                        <el-select v-model="searchForm.approvalState" placeholder="请选择" clearable filterable  size="small" style="width: 90%">
                            <el-option
                                    v-for="item in approvalStateData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>

        </el-col>
        <div v-hasPermission="'workRateExportBtn'">
            <el-button @click="exportExcel()" type="success" size="small" style="margin-top: 10px;margin-bottom: 5px">
                <i style="margin-right: 5px" class="el-icon-document"></i>报表导出
            </el-button>
        </div>
        <el-table border stripe v-if="ref" :summary-method="getSummaries" show-summary id="myTable"
                  ref="multipleTable"
                  :data="tableData3"
                  @sort-change="change"
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
                    label="月份" sortable="custom"
                    min-width="85"
            >
            </el-table-column>
            <el-table-column
                    prop="orgName"
                    label="部门名称" sortable="custom" min-width="105"
            >
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="姓名" sortable="custom" min-width="95"
            >
                <template slot-scope="scope">
                    <p style="text-decoration:underline;cursor: pointer" @click="handleView(scope.row)">
                        {{scope.row.cname}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="manhourRate"
                    label="报工率%" sortable="custom"
                    min-width="105"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.manhourRate | manhourRateFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="standardUnits"
                    label="标准人天" sortable="custom"
                    min-width="95"
                    align="right">
            </el-table-column>

            <el-table-column
                    prop="standardUnits"
                    label="填报人天"
                    sortable="custom"
                    min-width="100"
                    align="right">
                <template slot-scope="scope">
                    <!--<p>{{scope.row.sjhxDays + scope.row.nosjhxDays + scope.row.nxhxDays + scope.row.nonxhxDays +
                        scope.row.yxhxDays + scope.row.noyxhxDays + scope.row.wxhxDays + scope.row.nowxhxDays + scope.row.nghxDays}}</p>-->
                    <p>{{scope.row.fillinUnits}}</p>
                </template>
            </el-table-column>
         <!--   <el-table-column

                    prop="sjhxDays"
                    label="商机核销人天" sortable min-width="270"
            >-->
            <el-table-column  align="center" label="商机人天" min-width="200"
            >
                <el-table-column
                        prop="sjhxDays"
                        label="核销"
                        width="80"
                        sortable="custom"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="nosjhxDays"
                        label="未核销"
                        width="90"
                        sortable="custom"
                        align="right">
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="内部项目人天" min-width="200"
            >
                <el-table-column
                        prop="nxhxDays"
                        label="核销"
                        width="80"
                        sortable="custom"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="nonxhxDays"
                        label="未核销"
                        width="90"
                        sortable="custom"
                        align="right">
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="研发项目人天"  min-width="200"
            >
                <el-table-column
                        prop="yxhxDays"
                        label="核销"
                        width="80"
                        sortable="custom"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="noyxhxDays"
                        label="未核销"
                        width="90"
                        sortable="custom"
                        align="right">
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="外部项目人天"  min-width="200"
            >
                <el-table-column
                        prop="wxhxDays"
                        label="核销"
                        width="80"
                        sortable="custom"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="nowxhxDays"
                        label="未核销"
                        width="90"
                        sortable="custom"
                        align="right">
                </el-table-column>
            </el-table-column>
            <el-table-column
                    prop="nghxDays"
                    label="内部管理核销人天" sortable="custom" min-width="150"
                    align="right">
            </el-table-column>
         <!--   <el-table-column
                    prop="nosjhxDays"
                    label="商机未核销人天" sortable min-width="155"
            >
            </el-table-column>-->
    <!--        <el-table-column
                    prop="nonxhxDays"
                    label="内部项目未核销人天" sortable min-width="155"
            >
            </el-table-column>-->
<!--            <el-table-column
                    prop="noyxhxDays"
                    label="研发项目未核销人天" sortable min-width="155"
            >
            </el-table-column>-->
        <!--    <el-table-column
                    prop="nowxhxDays"
                    label="外部项目未核销人天" sortable min-width="155"
            >
            </el-table-column>-->
            <el-table-column
                    prop="yesFeeDays"
                    label="计费人天" sortable="custom"
                    min-width="100"
                    align="right">
            </el-table-column>

            <el-table-column
                    prop="noFeeDays"
                    label="不计费人天" sortable="custom"
                    min-width="110"
                    align="right">
            </el-table-column>
            <el-table-column
                    prop="yesFeeCost"
                    label="计费成本（元）" sortable="custom"
                    min-width="130"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.yesFeeCost | formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="noFeeCost"
                    label="不计费成本（元）" sortable="custom"
                    min-width="145"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.noFeeCost | formatFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="unitCost"
                    label="人天成本（元/天）" sortable="custom"
                    min-width="145"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.unitCost | formatFil}}</p>
                </template>
            </el-table-column><!-- -->


        </el-table>
        <el-pagination
                layout="total,sizes,prev, pager, next,jumper"
                :total="total"
                @current-change="currentChange"
                @size-change="sizeChange"
                :current-page="myPage"
                :page-size="mysize"
                style="background-color: white"
        >
        </el-pagination>
    </div>

</template>


<script>
    import draggable from 'vuedraggable';

    import Cookies from 'js-cookie';
    import util from '../../libs/util'

    export default {
        data () {
            return {
                //        20181211 修改员工报工率只显示已审批数据 cff
                ext:'2',
                approvalStateData:[
                    {
                        label:'待审批',
                        value:'1'
                    },{
                        label:'已审批',
                        value:'2'
                    }
                ],
                month1: '',
                month2: '',
                value5: '',
                ref: true,
                tableData3: [],
                currentPage: 0,
                total: null,
                pagesize: 10,
                isShowMore: false,
                searchForm: {
                    approvalState:'',
                    month1: '',
                    month2: '',
                    orgName: '',
                    cname: ''
                },
                myPage: 1,
                mysize: 10,
                mydirection: '',
                myfield: '',
                conditions: [],
                entity:{}
            };
        },
        components: {},
        methods: {
            showMore(){
                if(!this.isShowMore){
                    this.isShowMore = true;
                }else {
                    this.isShowMore = false;
                }
            },
            ///报表导出
            exportExcel() {
                //util.exportExcel( 'myTable','员工报工率.xlsx')
                //20181205导出数据修改
                let field=this.field || '';
                let direction=this.direction || '';
                var _this = this;
                var url = this.prefix + 'stats/getViewStatsWorkhourRate' + window.suffix;
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
                        {"headKey":"cname","headName":"姓名"},{"headKey":"manhourRate","headName":"报工率%","percent":1,"isNumber":true},
                        {"headKey":"standardUnits","headName":"标准人天","isNumber":true},{"headKey":"fillinUnits","headName":"填报人天","isNumber":true},
                        {"headKey":"sjhxDays","headName":"商机核销","isNumber":true},{"headKey":"nosjhxDays","headName":"商机未核销","isNumber":true},
                        {"headKey":"nxhxDays","headName":"内部项目核销","isNumber":true},{"headKey":"nonxhxDays","headName":"内部项目未核销","isNumber":true},
                        {"headKey":"yxhxDays","headName":"研发项目核销","isNumber":true},{"headKey":"noyxhxDays","headName":"研发项目未核销","isNumber":true},
                        {"headKey":"wxhxDays","headName":"外部项目核销","isNumber":true},{"headKey":"nowxhxDays","headName":"外部项目未核销","isNumber":true},
                        {"headKey":"nghxDays","headName":"内部管理核销人天","isNumber":true},{"headKey":"yesFeeDays","headName":"计费人天","isNumber":true},
                        {"headKey":"noFeeDays","headName":"不计费人天","isNumber":true},{"headKey":"yesFeeCost","headName":"计费成本（元）","isCost":1,"isNumber":true},
                        {"headKey":"noFeeCost","headName":"不计费成本（元）","isCost":1,"isNumber":true},{"headKey":"unitCost","headName":"人天成本（元/天）","isCost":1,"isNumber":true}]
                    for (var i = 0; i < exportThead.length; i++) {
                        var headerEle={};
                        headerEle['column'] = exportThead[i].headKey;
                        headerEle['columnName'] = exportThead[i].headName;
                        if(exportThead[i].isCost != "" && exportThead[i].isCost != undefined ){
                            headerEle['isCost'] = exportThead[i].isCost;
                        }
                        if(exportThead[i].isNumber){
                            headerEle['isNumber'] = exportThead[i].isNumber;
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
                    // console.log('list----', list);
                    var fileName = "员工报工率.xlsx";
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
            sizeChange (size) {
                this.ref = false;
                this.mysize = size;
                this.findAllProject();
                this.ref = true;
            },
            currentChange (page) {
                this.myPage = page;
                this.ref = false;
                this.findAllProject();
                this.ref = true;
            },
            // 排序
            change (column, prop, order) {
                this.field = '';
                this.direction = '';
                if (column.prop && column.order) {
                    this.direction = column.order === 'ascending' ? 'asc' : 'desc';
                    this.field = column.prop;
                    this.myPage = 1;
                    this.findAllProject();
                }
            },
            toggleSelection (rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            findAllProject () {
                let field=this.field || '';
                let direction=this.direction || '';
                this.$myHttp({
                    method: 'POST',
                    /* url: this.prefix +'stats/findByCondition' + window.suffix, */
                    url: this.prefix + 'stats/getViewStatsWorkhourRate' + window.suffix,
                    data: {
                        'range': this.conditions,
                        'ext':this.ext,
                        'entity':this.entity,
                        'pageNum': this.myPage - 1,
                        'pageSize': this.mysize,
                        'orderBy':field+' '+ direction
                    }
                }).then(res => {
                    // 成功回调方法
                    this.tableData3 = res.data.rows;
                    this.total = Number(res.data.total);
                });
            },

            search () {
                var _this = this;
                var myconditions = [];
                this.entity={};
                if (this.month1 && this.month2) {
                    var preyear = (this.month1.getFullYear()).toString() + '-';
                    var premonth = (this.month1.getMonth() + 1);
                    if (premonth > 9) {
                        premonth = (this.month1.getMonth() + 1).toString();
                    } else {
                        premonth = '0' + (this.month1.getMonth() + 1).toString();
                    }
                    var nextyear = (this.month2.getFullYear()).toString() + '-';
                    var nextmonth = (this.month2.getMonth() + 1);
                    if (nextmonth > 9) {
                        nextmonth = (this.month2.getMonth() + 1).toString();
                    } else {
                        nextmonth = '0' + (this.month2.getMonth() + 1).toString();
                    }
                    var value1 = preyear + premonth;
                    var value2 = nextyear + nextmonth;
                    myconditions.push({'field': 'period', 'from': value1, 'to': value2});
                }else if(this.month1 && !this.month2){
                    var preyear = (this.month1.getFullYear()).toString() + '-';
                    var premonth = (this.month1.getMonth() + 1);
                    if (premonth > 9) {
                        premonth = (this.month1.getMonth() + 1).toString();
                    } else {
                        premonth = '0' + (this.month1.getMonth() + 1).toString();
                    }
                    var value1 = preyear + premonth;
                    myconditions.push({'field': 'period', 'from': value1, 'to': null});
                }else if(!this.month1 && this.month2){
                    var nextyear = (this.month2.getFullYear()).toString() + '-';
                    var nextmonth = (this.month2.getMonth() + 1);
                    if (nextmonth > 9) {
                        nextmonth = (this.month2.getMonth() + 1).toString();
                    } else {
                        nextmonth = '0' + (this.month2.getMonth() + 1).toString();
                    }
                    var value2 = nextyear + nextmonth;
                    myconditions.push({'field': 'period', 'from': null, 'to': value2});
                }

                this.entity.cname= this.searchForm.cname;
                this.entity.orgName=this.searchForm.orgName;

                this.ext = this.searchForm.approvalState
                this.conditions = myconditions;
                this.myPage = 1;
                this.mysize = 10;
                console.log('查询条件是', myconditions);
                this.findAllProject();
            },
            getSummaries (param) {
                const {columns, data} = param;
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                const sums = [];
                const resData = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
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
                for (const items in sums) {
                    if (sums[items] !== '' && items !== '2' && items !== '3') {
                        sums[items] = ((sums[items])).toString();
                    }
//                    if (items == '13' || items == '14') {
//                        sums[items] = this.returnFloat(sums[items]/1000);
//                    }

                    if (items == '4') {
                        /* 计算最后一页的表格数据条数 */
                      /*  const lastPageSize = this.total - this.mysize * (this.myPage - 1);
                        if (lastPageSize < this.mysize) {
                            sums[items] = ((sums[items]) / lastPageSize).toFixed(2) + '%' + '（平均）';
                        } else {
                            sums[items] = ((sums[items]) / this.mysize).toFixed(2) + '%' + '（平均）';
                        }*/

                        sums[4] = ((Number(sums[7])+Number(sums[9])+Number(sums[11])+Number(sums[13]))/sums[5])*100;
                        sums[4] = sums[4].toFixed(2) +'%（平均）';
                    }


                    // if (items == '15') {
                    //     /* 计算最后一页的表格数据条数 */
                    //
                    //     const lastPageSize = this.total - this.mysize * (this.myPage - 1);
                    //
                    //
                    //     if (lastPageSize < this.mysize) {
                    //         sums[items] = this.returnFloat(sums[items] / lastPageSize) + '（平均）';
                    //     } else {
                    //         sums[items] = this.returnFloat(sums[items] / this.mysize) + '（平均）';
                    //     }
                    //
                    //     if(sums[15] == 'undefined（平均）'){
                    //         sums[15] = 0
                    //     }
                    //
                    //     if (items == '6') {
                    //         sums[6] = Number(sums[7])+Number(sums[8])+Number(sums[9])+Number(sums[10])
                    //             +Number(sums[11])+Number(sums[12])+Number(sums[13])+Number(sums[14])+Number(sums[15]);
                    //         console.log(sums[6])
                    //     }
                    // }


                    if(items ==5||items ==6||items ==7||items ==8||items ==9||items ==10||items ==11||items ==12||items ==13||items ==14||items ==15||items ==16){
                        sums[items] = (Math.round(sums[items]*100)/100).toFixed(1);
                    }else if(items == 18||items == 19||items == 20||items == 17){
                        sums[items] = util.returnFloat(sums[items]/1000);
                    }

                    resData.push((sums[items]));
                }

                resData[0] = '合计';

                if(!sums[18]){
                    sums[18] = 0.00
                }
                return sums;
            },
            returnFloat (value) {
                if (value) {
                    const pattern = /(?=((?!\b)\d{3})+$)/g;
                    var value = Math.round(parseFloat(value) * 1000) / 1000;
                    var xsd = value.toString().split('.');
                    if (xsd.length == 1) {
                        value = value.toString().replace(pattern, ',') + '.00';
                        return value;
                    }
                    if (xsd.length > 1) {
                        if (xsd[1].length < 2) {
                            value = value.toString().replace(pattern, ',') + '0';
                        }
                        return value;
                    }
                }
            },
            handleView (row) {
                this.$router.push({
                    name: 'rateDetails',
                    'query': {
                        'username': row.username,
                        'period': row.period,
                        'orgCode': row.orgCode
                    }
                });
            }
        },
        mounted: function () {
            this.findAllProject();
        },
        filters: {
            /* 以分为单位的转换 */
            formatFil: function (value) {
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                if (value) {
                    var value = Math.round(parseFloat(value / 1000) * 100) / 100;
                    var xsd = value.toString().split('.');
                    if (xsd.length == 1) {
                        value = value.toString().replace(pattern, ',') + '.00';
                        return value;
                    }
                    if (xsd.length > 1) {
                        if (xsd[1].length < 2) {
                            value = value.toString().replace(pattern, ',') + '0';
                        }
                        return value;
                    }
                }
            },
            manhourRateFil: function (value) {
                return (value).toFixed(2) + '%';
            },
            /* 以元为单位的转换 */
            formatFilNew: function (value) {
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                if (value) {
                    var value = Math.round(parseFloat(value / 1000) * 1000);
                    var xsd = value.toString().split('.');
                    if (xsd.length == 1) {
                        value = value.toString().replace(pattern, ',') + '.00';
                        return value;
                    }
                    if (xsd.length > 1) {
                        if (xsd[1].length < 2) {
                            value = value.toString().replace(pattern, ',') + '0';
                        }
                        return value;
                    }
                }
            }
        },
        computed: {}
    };
</script>
<style scoped="this">
    .el-button.is-circle {
        padding: 6px
    }

    .el-checkbox + .el-checkbox {
        margin-left: 0;
    }

    .el-checkbox {
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