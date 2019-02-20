<template>
    <div style="background-color: white">
        <div style="font-size: 14px;padding-left: 10px;margin-bottom: 10px;background: #F2F2F2;height: 40px;line-height: 40px;margin-top: 20px">
            {{relationOperTableData.title}}
            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showRelationOpen1" @click="showRelation()">
                <i class="el-icon-arrow-up"></i>收起
            </span>
            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showRelationClose1" @click="showRelation()">
                <i class="el-icon-arrow-right"></i>展开
            </span>
        </div>
        <el-table
                class="relationTable"
                :data="tableData"  v-show="showRelationTable"
                ref="operationTable"
                border
                show-summary
                :summary-method="getSummaries"
                style="width: 100%"
                :header-cell-style="{textAlign:'center'}">
            <el-table-column
                    type="selection"
                    width="60"
                    align="center"
            >
            </el-table-column>

            <el-table-column
                    prop="costNameKey"
                    label="角色">

                <template slot-scope="scope">

                    <el-select size="mini"  v-model="scope.row.costNameKey"  @change="getCostTypeData(scope)">
                        <el-option
                                v-for="item in costNameSelectData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>


                </template>
            </el-table-column>

            <el-table-column
                    prop="costTypeKey"
                    label="技术职称">

                <template slot-scope="scope">


                    <el-select size="mini"  v-model="scope.row.costTypeKey" @change="getCost(scope)">
                        <el-option
                                v-for="item in scope.row.costTypeSelectData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </template>
            </el-table-column>

            <el-table-column
                    prop="manday"
                    width="150"
                    label="有效天数">
                <template slot-scope="scope">
                    <el-input-number size="mini" v-model="scope.row.manday" controls-position="right" @input="getCost(scope)" :min="0.1" ></el-input-number>

                    <!--<el-input size="mini"  type="number" :min="1" v-model="scope.row.manday" @input="getCost(scope)" @keyup.native="number(scope)"></el-input>-->
                </template>
            </el-table-column>
            <el-table-column
                    prop="mandayCost"
                    label="单位人员成本/天"
                    :align="'right'">
                <template slot-scope="scope">
                    {{(scope.row.mandayCost/1000)|formatFilNew}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="cost"
                    label="人工成本费用"
                    :align="'right'">
                <template slot-scope="scope">
                    {{((scope.row.mandayCost*scope.row.manday)/1000)|formatFilNew}}
                </template>
            </el-table-column>


              <el-table-column
                    prop="itemRate"
                    label="税率">
                   <template slot-scope="scope">

                    <el-select size="mini"  v-model="scope.row.itemRate" @change="getcostNoRate(scope)">
                        <el-option
                                v-for="item in itemRateData"
                                :key="item.value"
                                :label="item.label*100 + '%'"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </template>
            </el-table-column>


             <el-table-column
                    prop="costNoRate"
                    label="人工成本费用(不含税)"
                    :align="'right'">
                <template slot-scope="scope">
                    {{ util.returnFloat(scope.row.costNoRate/1000)}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="memo"
                    label="备注">
                <template slot-scope="scope">
                    <el-input size="mini"  v-model="scope.row.memo" ></el-input>
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
                isShow:true,
                center:'center',
                tableData:[],
                role:'',
                title:'',
                date:'',
                cost:'',
                memo:'',
                costNameSelectData:[],
                testData:[
                ],
                showRelationTable:true,
                showRelationOpen1:true,
                showRelationClose1:false
            }

        },
        methods: {
            getcostNoRate(scope){
                let itemRate =Number(this.itemRateData.filter(o => o.value == scope.row.itemRate )[0] && this.itemRateData.filter(o => o.value == scope.row.itemRate )[0].label)
                scope.row.costNoRate = scope.row.cost / (1 + itemRate)
            },
            showRelation(){
                if(this.showRelationTable){
                    this.showRelationOpen1=false;
                    this.showRelationClose1=true;
                    this.showRelationTable=false;

                }else{
                    this.showRelationOpen1=true;
                    this.showRelationClose1=false;
                    this.showRelationTable=true
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

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "职级类型"
                        },
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
                    this.costNameSelectData = resArry;

                });


            },
            getCostTypeData(scope){

                this.getLabelByKey(scope);
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getPositionLevel'+ window.suffix,
                    data: {
                        "entity": {
                            "type":scope.row.costNameKey
                        }
                    }
                }).then(res => {
                    //成功回调方法

                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].title,
                            value:res.data.rows[items].code,
                            mandayCost:res.data.rows[items].cost
                        })
                    }

                    this.$refs.operationTable.data[scope.$index].costTypeSelectData = resArry;

                    let vm = this.$refs.operationTable
                    vm.$set(vm.data[scope.$index], scope.row.costTypeSelectData, resArry)
                });
            },
            getCost(scope){
                console.log('scope---',scope);
                let obj = {};
                if(scope.row.costTypeSelectData && typeof scope.row.costTypeSelectData.filter == "function"){
                    let costData = scope.row.costTypeSelectData.filter(o=> scope.row.costTypeKey.indexOf(o.value) > -1);
                    this.$refs.operationTable.data[scope.$index].mandayCost = costData[0].mandayCost;
                    this.$refs.operationTable.data[scope.$index].cost = costData[0].mandayCost * this.$refs.operationTable.data[scope.$index].manday
                    obj = scope.row.costTypeSelectData.filter(item => item.value == scope.row.costTypeKey);
                    this.$refs.operationTable.data[scope.$index].costType = obj[0].label;
                }

                this.getcostNoRate(scope)
            },
            getTableData(){

                this.$refs.operationTable.data.forEach(item =>{
                    item.type = '01';
                    item.costForecastId = this.relationOperTableData.id;
                    item.costTypeSelectData = JSON.stringify(item.costTypeSelectData)
                })
                // debugger;
                return this.$refs.operationTable.data;
            },
            getLabelByKey(scope){

                let obj = {};

                obj = this.costNameSelectData.filter(item => item.value == scope.row.costNameKey);

                this.$refs.operationTable.data[scope.$index].costName = obj[0].label

            },
            getOldData(){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastDetailList' + window.suffix,
                    data: {
                        "entity": {
                            costForecastId:this.relationOperTableData.id,
                            type:'01'
                        },
                        "orderBy": "id asc"
                    }
                }).then(res => {
                    //成功回调方法
                    // debugger;
                    res.data.rows.forEach(item => {
                        item.costTypeSelectData = JSON.parse(item.costTypeSelectData)
                    })
                    this.tableData = res.data.rows

                });

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

                //
                this.$store.state.totalrycbcost = sums[5]
                this.$store.state.totalrycbcostNoRate = sums[7]


                for(const items in sums){
                    if(items == 3){
                        resData.push(util.returnFloat(sums[items]));
                    }else {
                        resData.push(util.returnFloat(sums[items]/1000));
                    }
                }
                resData[0] = '合计';
                resData[1] = '';
                resData[2] = '';
                resData[4] = '';
                resData[6] = '';
                resData[8] = '';

            
                return resData;
            },
            getitemRateRateData(){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "税率"
                        },
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
                    this.itemRateData = resArry;
                    this.getSeletData();
                    this.getOldData();
                });

            },

        },
        props: ['relationOperTableData'],
        mounted: function () {

            this.getitemRateRateData();
            //调整表格不对齐的问题
            util.adjustTableHead('relationTable');
            window.onresize=function () {
                util.adjustTableHead('relationTable');
            }
        },
        filters:{

            fmt:function (value) {
                if(value){
                    return value/1000
                }

            }
        }

    }
</script>
