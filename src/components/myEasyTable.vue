<template>
    <div style="background-color: white">

        <div style="font-size: 14px;margin-bottom: 10px;margin-top: 20px;padding-left: 10px;background: rgb(242, 242, 242);height: 38px;line-height: 38px;">{{easyTableData.title}}
            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showStausOpen" @click="showTable()">
                <i class="el-icon-arrow-up"></i>收起
            </span>
            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showStausClose" @click="showTable()">
                <i class="el-icon-arrow-right"></i>展开
            </span>
        </div>


        <el-table
                class="myEasyTable"
                border stripe
                :data="tableData"
                size="small"
                :summary-method="getSummaries"
                :header-cell-style="{textAlign:'center'}"
                show-summary
                ref="easyTableData" v-show="showEasyTable"
        >
            <el-table-column
                    type="selection"
                    width="50"
                    align="center"
            >
            </el-table-column>
            <el-table-column :prop="items.headKey" :key='index' v-for='(items , index) in easyTableData.tableThead'
                             min-width="180px"
                             :label="items.headName" :align="items.align"
                             >
                <template slot-scope="scope">

                    <p v-if="items.headKey == 'itemRate'">{{scope.row.itemRate|itemRateFmt}}</p>

                    <p v-else-if="items.headKey == 'costNoRate'">{{(scope.row.costNoRate) | returnFloat}}</p>

                    <p v-else-if="items.headKey=='mandayCost'">
                        {{scope.row[items.headKey] | returnFloat}}
                    </p>

                    <p v-else-if="items.headKey=='cost' || items.headKey=='amount' || items.headKey=='expenseAmount'">
                        {{scope.row[items.headKey] | returnFloat}}
                    </p>

                    <p v-else-if="items.headKey=='total'">
                        {{scope.row[items.headKey] | returnFloat}}
                    </p>

                    <p v-else-if="items.isTimeData">
                        {{scope.row[items.headKey] | prAndOppoTimeFmt}}
                    </p>

                    <p v-else-if="items.isHour">
                        {{scope.row[items.headKey] | formatDateHour(scope.row[items.headKey])}}</p>

                    <p v-else-if="items.selectCode">
                        {{scope.row[items.headKey] | dictionaryData}}</p>

                    <p v-else>{{scope.row[items.headKey]}}</p>

                </template>


            </el-table-column>


        </el-table>

    </div>

</template>


<script>
    import util from '../libs/util'
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                util:util,
                tableData:[],
                showEasyTable:true,
                showStausOpen:true,
                showStausClose:false
            }

        },
        props: ['easyTableData', 'parentParam'],
        methods: {
            showTable(){
                if(this.showEasyTable){
                    this.showStausOpen=false;
                    this.showStausClose=true;
                    this.showEasyTable=false;

                }else{
                    this.showStausOpen=true;
                    this.showStausClose=false;
                    this.showEasyTable=true
                }
            },
            /**
             * 获取easyTable 主数据
             */
            getTableData(id){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastDetailList' + window.suffix,
                    data: {
                        "entity": {
                            costForecastId:id||this.easyTableData.id,
                            type:this.easyTableData.type
                        },
                        "orderBy":'id asc'
                    }
                }).then(res => {
                    //成功回调方法
                  let resData =

                    res.data.rows.filter(o=> o.cost = (o.cost/1000).toFixed(2))

                    res.data.rows.filter(o=> o.mandayCost = o.mandayCost/1000)

                    res.data.rows.filter(o=> o.costNoRate = (o.costNoRate/1000).toFixed(2))


                    this.tableData = resData

                    console.log("tableData---222--3333---",this.tableData)

                });


            },

            getTableAllData(){
                console.log(this.easyTableData);
                this.$refs.easyTableData.data.forEach(item => {
                    item.type = this.easyTableData.type
                    item.costForecastId = this.easyTableData.id;
                })
                return this.$refs.easyTableData.data;
            },
            getNeedNewVersionId(){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastList' + window.suffix,
                    data: {
                        "entity": {
                            projectId :this.easyTableData.id,
                            isLastVersion:true
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    this.getTableData(res.data.rows[0].id);

                });
            },
            getSummaries(param){

                const { columns, data } = param;
                const sums = [];
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
                    resData.push(util.returnFloat(sums[items]));
                }

                for(let items in this.easyTableData.noSum){

                    resData[this.easyTableData.noSum[items]] = '';
                }

                resData[0] = '合计';
                return resData;
            },

            getSummaries2(param){
                const { columns, data } = param;
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
                for(const items in sums){
                    resData.push(util.returnFloat(sums[items]));
                }
                this.easyTableData.costClumns.forEach(function(item){
                    resData[0] = '合计';
                    resData[item] = '';
                });
                return resData;
            },

            getData(url, search){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + url + window.suffix,
                    data: {
                        "entity": search,
                        "orderBy": "id asc"
                    },
                    async:false
                }).then(res => {
                    //成功回调方法
                    var resData = res.data.rows;
                    this.tableData = resData
                    console.log('tableData--22--99--',resData)
                });
            },

            getItemRate(){


                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "税率"
                        }
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
                    
                    

                    Cookies.set("RateData",resArry)
                
                });
            },
            adjustTableHead () {
                setTimeout(function () {
                    var myTableSys = document.getElementsByClassName('myEasyTable');
                    var myTableArr=Array.prototype.slice.call(myTableSys);
                    if (myTableArr.length>0) {
                        myTableArr.forEach((item,index)=>{
                            var thGutter0 = item.getElementsByClassName('gutter')[0];
                            var thGutter1 = item.getElementsByClassName('gutter')[1];
                            if (thGutter0 != undefined) { thGutter0.style.display = 'table-cell'; }
                            if (thGutter1 != undefined) { thGutter1.style.display = 'table-cell'; }
                        })

                    }
                }, 500);
            },
            /**
             *字典项
             */
            makeDataDictionary:function () {
                if(this.easyTableData.tableThead) {
                    let selectReqArray = this.easyTableData.tableThead.filter(o => (o.selectData)).map(function (o) {
                        return {
                            key: o.selectData,
                            value: o.selectCode
                        }
                    });
                    selectReqArray.forEach(items => {
                        this.$myHttp({
                            method: 'POST',
                            url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                            data: {
                                "entity": {
                                    "dtype": items.value
                                },
                                "orderBy": "idx asc"
                            }
                        }).then(res => {
                            //成功回调方法
                            let resArry = [];
                            for (let items in res.data.rows) {
                                resArry.push({
                                    label: res.data.rows[items].dvalue,
                                    value: res.data.rows[items].dkey
                                })
                            }
                            this[items.key] = resArry;
                            Cookies.set("DictionaryList", resArry)
                        });

                    })
                }
            },

        },
        mounted: function () {
            if(this.parentParam != '1'){
                if(this.easyTableData.isNeedNewVersion){
                    this.getNeedNewVersionId()
                }else {
                    this.getTableData();
                }
            }else{
                this.getTableAllData();
            }

            this.makeDataDictionary();
            this.getItemRate ();
            //调整表头和表体行对齐
            this.adjustTableHead();
            var _this=this;
            window.onresize=function () {
                _this.adjustTableHead();
            }
        },
        filters:{
            itemRateFmt:function(value) {
             if(JSON.parse(Cookies.get("RateData")).filter(o => o.value == value)[0]) {
                 return JSON.parse(Cookies.get("RateData")).filter(o => o.value == value)[0].label * 100 + '%'
             }
            },

            dictionaryData:function(value) {
                console.log(JSON.parse(Cookies.get("DictionaryList")).filter(o => o.value == value));

                return  JSON.parse(Cookies.get("DictionaryList")).filter(o => o.value == value)[0].label;

            },
            returnFloat(value){
                return util.returnFloat(value);
            }

        }

    }
</script>

