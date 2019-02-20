<template>
    <div style="background-color: white">
        <div style="font-size: 14px;padding-left: 10px;margin-bottom: 10px;background: #F2F2F2;height: 40px;line-height: 40px;margin-top: 20px">
            {{operationTable.title}}
            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showOperationOpen1" @click="showOperation()">
                <i class="el-icon-arrow-up"></i>收起
            </span>
            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showOperationClose1" @click="showOperation()">
                <i class="el-icon-arrow-right"></i>展开
            </span>
        </div>
       <!-- :show-summary = "operationTable.isNeedSummary"-->
        <el-table
                class="operationTable"
                :data="tableData" v-show="showOperationTable"
                ref="operationTable"
                show-summary
                :summary-method="getSummaries2"
                border
                style="width: 100%"
                :header-cell-style="{textAlign:'center'}">
            <el-table-column
                    type="selection"
                    width="55"
                    align="center"
            >
            </el-table-column>
            <el-table-column :prop="items.headKey" :key='index' v-for='(items , index) in operationTable.tableThead'
                             min-width="180px"
                             :label="items.headName" :align="items.align"
                             :width="items.width" :label-class-name="items.isShowMust"
                             :render-header="companyRenderHeader"

            >
                <template slot-scope="scope">

                    <el-input style="width: 100%" size="mini" v-if="items.type == 'input'" v-model="scope.row[items.headKey]" :readOnly="items.readOnly" :placeholder="items.placeholder"></el-input>

                    <el-input-number ref="liveDate" style="width: 100%"  size="mini" v-if="items.type == 'inputNum'" v-model="scope.row[items.headKey]"  :placeholder="items.placeholder" :min="0" controls-position="right" @blur="computeUnit(scope,items.headKey)" @change="getCostNoRate(scope)"></el-input-number>


                    <el-select style="width: 100%" size="mini" v-if="items.sysData" v-model="scope.row[items.headKey]" :placeholder="items.placeholder" @change="getSysDataLabel(scope,items.headKey)">
                        <el-option
                                v-for="item in suplierData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>


                     <el-select style="width: 100%" size="mini" v-if="items.headKey == 'itemRate'" v-model="scope.row[items.headKey]" :placeholder="items.placeholder" @change="getCostNoRate(scope)">
                        <el-option
                                v-for="item in itemRateData"
                                :key="item.value"
                                :label="item.label * 100 + '%'"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <div style="width: 100%" v-if="items.needSubCost" >{{scope.row[items.needSubCost[0]]* scope.row[items.needSubCost[1]]|| ''}}</div>
                    <div style="width: 100%" v-if="items.headKey == 'costNoRate'" >{{util.returnFloat(scope.row.costNoRate)}}</div>


                    <el-select style="width: 100%" size="mini" v-if="items.selectData" v-model="scope.row[items.headKey]" :placeholder="items.placeholder" @change="getLabelByKey(scope,items.selectData,items.headKey)">
                        <el-option
                                v-for="item in getOptionData(items.selectData)"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>


                    <el-col size="mini" v-if="items.type == 'datePicker'" v-model="scope.row[items.headKey]" :placeholder="items.placeholder">
                        <el-date-picker
                                v-model="scope.row[items.headKey]"
                                size="small"
                                @change="startTimeCheck(scope,items)"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间" style="width: 100%">
                        </el-date-picker>
                    </el-col>


                    <el-col size="mini" v-if="items.type == 'datePickerCtrl'" v-model="scope.row[items.headKey]" :placeholder="items.placeholder">
                        <el-date-picker
                                v-model="scope.row[items.headKey]"
                                size="small"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                @change="endTimeCheck(scope, items)"
                                :picker-options="pickerOptions0(scope, items)"
                                placeholder="选择日期时间"  style="width: 100%">
                        </el-date-picker>
                    </el-col>


                    <el-col size="mini" v-if="items.type == 'timePicker'" v-model="scope.row[items.headKey]" :placeholder="items.placeholder">
                        <el-time-select
                                v-model="scope.row[items.headKey]"
                                size="small"
                                :picker-options="{
                                    start: '18:30',
                                    step: '00:15',
                                    end: '22:30'
                                }"
                                style="width: 100%"
                                placeholder="任意时间点">
                        </el-time-select>
                    </el-col>

                    <el-col size="mini" v-if="items.type == 'timePickerCtrl'" v-model="scope.row[items.headKey]" :placeholder="items.placeholder">
                        <el-time-select
                                v-model="scope.row[items.headKey]"
                                size="small"
                                :picker-options="{
                                  start: '18:30',
                                  step: '00:15',
                                  end: '22:30',
                                  minTime: scope.row.startTime
                                }"
                                style="width: 100%"
                                placeholder="任意时间点">
                        </el-time-select>
                    </el-col>

                    <el-col size="mini" v-if="items.type == 'timePickerFree'" v-model="scope.row[items.headKey]" :placeholder="items.placeholder">
                        <el-time-picker
                                v-model="scope.row[items.headKey]"
                                size="small"
                                :picker-options="{
                                    selectableRange: '00:00:00 - 23:59:59',
                                }"
                                style="width: 100%"
                                placeholder="任意时间点">
                        </el-time-picker>
                    </el-col>

                    <el-col size="mini" v-if="items.type == 'timePickerCtrlFree'" v-model="scope.row[items.headKey]" :placeholder="items.placeholder">
                        <el-time-picker
                                v-model="scope.row[items.headKey]"
                                size="small"
                                :picker-options="{
                                  selectableRange:'00:00:00 - 23:59:59',
                                  minTime: scope.row.startTime
                                }"
                                style="width: 100%"
                                placeholder="任意时间点">
                        </el-time-picker>
                    </el-col>


                </template>


            </el-table-column>

            <el-table-column
                    label="操作"
                    width="100"
                    :align="center"
                    :render-header="renderHeader"
            >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            circle
                            title="删除"
                            @click="deleteRow(scope.$index, tableData)"><i class="el-icon-delete"
                                                                                     style="font-size: 11px"></i>
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

    </div>

</template>


<script type="text/jsx">

    import util from '../libs/util'
    export default {
        data() {
            return {
                util:util,
                suplierData:[],
                center:'center',
                tableData:[],
                showOperationTable:true,
                showOperationOpen1:true,
                showOperationClose1:false,
                itemRateData:[],
                timePickerCtrlData:{},
                liveTime:'',
            }

        },
        methods: {
            computeUnit(scope,headKEY){
                if(this.operationTable.hotelFlag=='02') {
                        if(headKEY=='totalDays') {//如果是入住天数，则填写范围是0.5~差值+1
                            let least = 0.5;
                            let max = scope.row.liveTime + 1;
                            let result=(Math.round(scope.row[headKEY]*10)/10).toFixed(1);
                            console.log('headKEY---',scope.row[headKEY])
                            console.log('liveTime---',scope.row.liveTime)
                            if (!scope.row.checkOutDate) {
                                this.$message({
                                    type: 'warning',
                                    message: '请先填写入住日期和离开日期'
                                });
                                setTimeout(()=>{
                                    this.$set(scope.row,headKEY,'');
                                },1);

                                return false;
                            }
                            if(scope.row[headKEY]=='0'){
                                this.$message({
                                    type:'warning',
                                    message:'入住天数不能为0'
                                });
                                this.$set(scope.row,headKEY,'');
                                this.$set(scope.row,'priceUnit','');
                                return false;
                            }else if(scope.row[headKEY]==undefined){
                                this.$message({
                                    type:'warning',
                                    message:'入住天数不能为空'
                                });
                                this.$set(scope.row,headKEY,'');
                                this.$set(scope.row,'priceUnit','');
                                return false;
                            }
                            if(result<least || result>=max){
                                setTimeout(()=>{
                                    this.$set(scope.row,'totalDays',scope.row.liveTime);
                                },1)
                                this.$message({
                                    type:'warning',
                                    message:'入住天数填写值超出范围'
                                });
                            }else{
                                let amount=Number(scope.row.amount);
                                let totalDays=(Math.round(scope.row[headKEY]*10)/10).toFixed(1);
                                let priceUnit=util.returnFloat(amount/totalDays);
                                this.$set(scope.row,'priceUnit',priceUnit);
                                setTimeout(()=>{
                                    this.$set(scope.row,'totalDays',totalDays);
                                },1)
                            }
                        }else if(headKEY=='amount'){
                            let amount=scope.row.amount;
                            let totalDays=scope.row.totalDays;
                            if(totalDays==0 || totalDays==''){
                                this.$message({
                                    type:'warning',
                                    message:'请填写正确的入住天数'
                                });
                                return false;
                            }
                            let priceUnit=util.returnFloat(amount/totalDays);
                            this.$set(scope.row,'priceUnit',priceUnit);
                    }
                }
            },
            getCostNoRate(scope){
                    if(this.itemRateData.filter(o => o.value == scope.row.itemRate)[0]) {
                        let itemRate = Number(this.itemRateData.filter(o => o.value == scope.row.itemRate)[0].label)
                        scope.row.costNoRate = scope.row.cost / (1 + itemRate);
                    }
            },
            getSysDataLabel(scope,headKey){

                console.log(scope.row[headKey])
                let obj = {};
                obj = this.suplierData.filter(item => item.value == scope.row[headKey]);
                this.$refs.operationTable.data[scope.$index][headKey] = obj[0].label
            },
            showOperation(){
                if(this.showOperationTable){
                    this.showOperationOpen1=false;
                    this.showOperationClose1=true;
                    this.showOperationTable=false;

                }else{
                    this.showOperationOpen1=true;
                    this.showOperationClose1=false;
                    this.showOperationTable=true
                }
            },
            renderHeader(h) {
                return (
                    <el-button type="success" size="mini" icon="el-icon-plus" circle  onClick={this.addOperData}></el-button>
            )
            },
            addOperData(){
                this.tableData.push({})
            },
            deleteRow(index, rows){
                rows.splice(index, 1);

            },
            getSeletData(){

                let selectReqArray = this.operationTable.tableThead.filter(o=> (o.selectData)).map(function (o) {
                    return  {
                        key:o.selectData,
                        value:o.selectCode
                    }
                });
                selectReqArray.forEach(items=>{
                    this.$myHttp({
                        method: 'POST',
                        url:this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                        data: {
                            "entity": {
                                "dtype": items.value
                            },
                            "orderBy": "idx asc"
                        }
                    }).then(res => {
                        //成功回调方法
                        let resArry = [];
                        for(let items in res.data.rows){
                            resArry.push({
                                label: res.data.rows[items].dvalue,
                                value: res.data.rows[items].dkey
                            })
                        }
                        this[items.key] = resArry;
                    });

                })

                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                        data: {
                            "entity": {
                                "dtype": '税率'
                            },
                           // "orderBy": "idx asc"
                        }
                    }).then(res => {
                        //成功回调方法
                        let resArry = [];
                        for(let items in res.data.rows){
                            resArry.push({
                                label: res.data.rows[items].dvalue,
                                value: res.data.rows[items].dkey
                            })
                        }
                        this.itemRateData = resArry;
                    });
            },
            getOptionData(key){
                return this[key]
            },
            getTableData(){

                this.$refs.operationTable.data.forEach(item => {
                    item.type = this.operationTable.type
                    item.costForecastId = this.operationTable.id;
                })
                return this.$refs.operationTable.data;
            },
            getLabelByKey(scope,selectData,headKey){
                let obj = {};
                obj = this[selectData].filter(item => item.value == scope.row[headKey]);
                this.$refs.operationTable.data[scope.$index][headKey] = obj[0].label
            },
            getOldData(){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastDetailList' + window.suffix,
                    data: {
                        "entity": {
                            costForecastId:this.operationTable.id,
                            type:this.operationTable.type
                        },
                        "orderBy": "id asc"
                    }
                }).then(res => {
                    //成功回调方法
                    let resData = res.data.rows.filter(o=> o.cost = o.cost/1000)

                    res.data.rows.filter(o=> o.mandayCost = o.mandayCost/1000)

                    res.data.rows.filter(o=> o.costNoRate = o.costNoRate/1000)
                    this.tableData = resData
                });
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
                    this.tableData = resData;
                    if(this.operationTable.hotelFlag=='02') {
                        this.tableData.map((item) => {
                            if (item.checkInDate && item.checkOutDate) {
                                let start = (new Date(item.checkInDate).getTime()) / (24 * 3600 * 1000);
                                let leave = (new Date(item.checkOutDate).getTime()) / (24 * 3600 * 1000);
                                let liveTime = leave - start;
                                item.liveTime = liveTime;
                            }
                        })
                    }
                });
            },

            cleanData(){
                console.log('cleanData',this.$refs.operationTable.data)


                this.tableData = []
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                const pattern = /(?=((?!\b)\d{3})+$)/g;
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

                this.$store.state[this.operationTable.allCost[0]] = sums[this.operationTable.allCost[1]]*1000

                this.$store.state[this.operationTable.allCostNoRate[0]] = sums[this.operationTable.allCostNoRate[1]]*1000

                for(const items in sums){
                    resData.push(util.returnFloat(sums[items]));
                }
                resData[0] = '合计';
                resData[1] = '';
                resData[3] = '';
                resData[5] = '';
                resData[6] = '';
            
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
                this.$store.state[this.operationTable.allCost[0]] = sums[this.operationTable.allCost[1]]*1000;
                this.$store.state[this.operationTable.allCostNoRate[0]] = sums[this.operationTable.allCostNoRate[1]]*1000;
                for(const items in sums){
                    resData.push(util.returnFloat(sums[items]));
                }
                this.operationTable.costClumns.forEach(function(item){
                        resData[0] = '合计';
                        resData[item] = '';
                });
                return resData;
            },


            pickerOptions0(scope, items){
                var startTime = scope.row[items.startTime];
                if (!startTime) {
                }else{
                    return {
                        disabledDate (time) {
                            if (startTime) {
                                return new Date(startTime).getTime() > time.getTime();
                            }
                        }
                    };
                }
            },
            startTimeCheck(scope,items){
                console.log('scope---',scope,items);
                if(this.operationTable.hotelFlag=='02') {//酒店住宿费
                    let startTime=scope.row[items.headKey];
                    let endTime=scope.row.checkOutDate;
                    if(startTime>endTime){
                        scope.row.checkOutDate='';
                        this.$set(scope.row,'priceUnit','');
                        this.$set(scope.row,'totalDays','');
                        // this.$set(scope.row,'amount','');
                    }
                }
            },
            endTimeCheck:function(scope,items){
                var startTime = scope.row[items.startTime];
                if(this.operationTable.hotelFlag=='02'){//酒店住宿费
                    this.$set(scope.row,'priceUnit','');
                    this.$set(scope.row,'totalDays','');
                    // this.$set(scope.row,'amount','');
                }
                if (!startTime || scope.row[items.headKey] < startTime) {
                    if(this.operationTable.hotelFlag=='02') {//酒店住宿费
                        this.$message({
                            type: 'warning',
                            message: '请先选择入住日期'
                        });
                    }
                    scope.row[items.headKey] = '';
                }else{
                    let leaveTime=scope.row[items.headKey];
                    console.log('tableData--',this.tableData)
                    console.log('scope--',scope)
                    console.log('items--',items)
                    if(leaveTime) {
                        console.log('tableData22222--',this.tableData)
                        console.log('startTime--', startTime, 'leaveTime--', leaveTime);
                        console.log('startTime--', new Date(startTime).getTime(), 'leaveTime--', new Date(leaveTime).getTime());
                        let start = (new Date(startTime).getTime()) / (24 * 3600 * 1000);
                        let leave = (new Date(leaveTime).getTime()) / (24 * 3600 * 1000);
                        let liveTime = leave - start;
                        this.$set(scope.row,'totalDays',Number(liveTime));
                        this.$set(scope.row,'liveTime',liveTime);
                        if(scope.row.amount>0 && liveTime>0){//如果金额大于0，且入住天数也大于0
                            let amount=Number(scope.row.amount);
                            let totalDays=(Math.round(liveTime*10)/10).toFixed(1);
                            let priceUnit=util.returnFloat(amount/totalDays);
                            this.$set(scope.row,'priceUnit',priceUnit);
                        }
                    }else{
                        this.$set(scope.row,'totalDays','');
                        this.$set(scope.row,'liveTime',0);
                    }
                }
            },
            /**
             * 表头加*
             * @param h
             * @param column
             * @param $index
             * @returns {*}
             */
            companyRenderHeader(h, { column, $index}) {
                if (column.labelClassName && column.labelClassName.indexOf('star') > -1) {
                    return h("span", [
                        h("span", {
                            "class": "red-star"

                        }, "*"),
                        h("span", column.label),
                    ])
                }else{
                    return h("span", [
                        h("span", column.label),
                    ])
                }
            },
            getSuplierData(){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'supplier/getSupplierList' + window.suffix,
                    data: {
                        "entity": {
                            "serverQualify":'1'
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    console.log(res.data.rows)
                    var resArry = [];
                    for (var items in res.data.rows) {
                        resArry.push({
                            label: res.data.rows[items].name,
                            value: res.data.rows[items].id
                        })
                    }

                    this.suplierData = resArry

                });
            }
        },
        props: ['operationTable', "parentParam"],
        mounted: function () {
            this.getSeletData();
            this.getSuplierData();
            // debugger;
            if(this.parentParam != '1'){
                this.getOldData();
            }
            if(this.parentParam=='1' && this.operationTable.search){
                this.getData('expense/getExpenseInfo',this.operationTable.search);//获取报销详细旧数据
            }
            //调整表格不对齐的问题
            util.adjustTableHead('operationTable');
            window.onresize=function () {
                util.adjustTableHead('operationTable');
            }
        }

    }
</script>

<style >
   .el-table .red-star {
       color:red
   }

</style>


