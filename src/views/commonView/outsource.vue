<template>
    <div style="background-color: white">
        <div style="font-size: 14px;padding-left: 10px;margin-bottom: 10px;background: #F2F2F2;height: 40px;line-height: 40px;margin-top: 20px">
                四、外包人员成本
            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showRelationOpen1" @click="showRelation()">
                <i class="el-icon-arrow-up"></i>收起
            </span>
            <span style="float: right;margin-right: 15px;color: #409EFF;cursor: pointer" v-if="showRelationClose1" @click="showRelation()">
                <i class="el-icon-arrow-right"></i>展开
            </span>
        </div>
        <el-table
                class="outSourceTable"
                :data="tableData"  v-show="showRelationTable"
                ref="outsource"
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
                    prop="costName"
                    label="角色">

                <template slot-scope="scope">

                    <el-input size="mini"  v-model="scope.row.costName" ></el-input>

                </template>
            </el-table-column>

            <el-table-column
                    prop="mandayCost"
                    label="人天成本"
                    align='right'>

                <template slot-scope="scope">
                    <el-input-number size="mini" v-model="scope.row.mandayCost" controls-position="right"  :min="0.1" @change="getCost(scope)" ></el-input-number>

                </template>
            </el-table-column>

            <el-table-column
                    prop="manday"
                    width="150"
                    label="天数"
                    align='right'>
                <template slot-scope="scope">
                    <el-input-number size="mini" v-model="scope.row.manday" controls-position="right"  :min="0.1" @change="getCost(scope)"></el-input-number>

                    <!--<el-input size="mini"  type="number" :min="1" v-model="scope.row.manday" @input="getCost(scope)" @keyup.native="number(scope)"></el-input>-->
                </template>
            </el-table-column>
            <el-table-column
                    prop="cost"
                    label="金额"
                    align='right'>
                <template slot-scope="scope">
                    {{util.returnFloat(scope.row.mandayCost*scope.row.manday)}}
                </template>
            </el-table-column>


                    <el-table-column
                    prop="itemRate"
                    label="税率"
                    align='right'>
                   <template slot-scope="scope">

                    <el-select size="mini"  v-model="scope.row.itemRate" @change="getcostNoRate(scope)">
                        <el-option
                                v-for="item in itemRateData"
                                :key="item.value"
                                :label="item.label * 100 + '%'"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </template>
            </el-table-column>


             <el-table-column
                    prop="costNoRate"
                    label="人工成本费用(不含税)"
                    align='right'>
                <template slot-scope="scope">
                    {{ util.returnFloat(scope.row.costNoRate)}}
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

    import util from '../../libs/util'
    export default {
        data() {
            return {
                util:util,
                itemRateData:[],
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
                if(this.itemRateData.filter(o => o.value == scope.row.itemRate)[0]) {
                    let itemRate = Number(this.itemRateData.filter(o => o.value == scope.row.itemRate)[0].label)
                    scope.row.costNoRate = scope.row.cost / (1 + itemRate)
                }
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
                });

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
            getOldData(){

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'project/cost/getCostForecastDetailList' + window.suffix,
                    data: {
                        "entity": {
                            costForecastId:this.costForecastId,
                            type:'04'
                        },
                        "orderBy": "id asc"
                    }
                }).then(res => {
                    //成功回调方法

                    res.data.rows.forEach(item => {
                        item.mandayCost = item.mandayCost/1000
                        item.cost = item.cost/1000   
                        item.costNoRate = item.costNoRate/1000


                    })
                    this.tableData = res.data.rows
                });

            },
            getTableData(){

                this.$refs.outsource.data.forEach(item =>{
                    item.type = '04';
                    item.costForecastId = this.costForecastId;
                })
                return this.$refs.outsource.data;
            },
            getCost(scope){
                this.$refs.outsource.data[scope.$index].cost = this.$refs.outsource.data[scope.$index].mandayCost*this.$refs.outsource.data[scope.$index].manday

                this.getcostNoRate(scope);
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

                this.$store.state.totalwbrycost = sums[4]*1000
                this.$store.state.totalwbrycostNoRate = sums[6]*1000


                for(const items in sums){
                    resData.push(util.returnFloat(sums[items]));
                }
                resData[0] = '合计';
                resData[1] = '';
                resData[2] = '';
                resData[5] = '';
                resData[7] = '';
                return resData;
            },

        },
        props: ['costForecastId'],
        mounted: function () {
            this.getOldData();
            this.getitemRateRateData();
            //调整表格不对齐的问题
            util.adjustTableHead('outSourceTable');
            window.onresize=function () {
                util.adjustTableHead('outSourceTable');
            }
        }

    }
</script>
