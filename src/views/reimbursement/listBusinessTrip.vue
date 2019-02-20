<template>
    <div>
        <el-col :span="24" style="background-color: white">
            <el-form ref="form" :model="searchForm" label-width="150px" style="margin-top: 20px;margin-bottom: 20px;padding-left:10px;">

                <el-row>
                    <el-col :span="6" :xs="20">
                        <el-form-item label="审批状态" prop="status">
                            <el-select v-model="searchForm.status" clearable placeholder="请选择" filterable size="small"
                                       style="width: 95%">
                                <el-option
                                        v-for="item in statusData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :xs="60">
                        <el-form-item label="申请人" prop="cname">
                            <el-input v-model="searchForm.cname" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :xs="60">
                        <el-form-item label="出差目的地"  prop="destination">
                            <el-input v-model="searchForm.destination" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :xs="20" label-width="90px">
                        <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                            查询
                        </el-button>

                        <el-button :span="3" :xs="20" type="primary" size="small" @click="showMore()">展开更多</el-button>
                    </el-col>
                </el-row>
            </el-form>


            <el-form ref="form" :model="searchForm" label-width="150px" style="margin-top: 20px;margin-bottom: 20px;padding-left:10px;"
                     v-show="isShowMore">
                <el-row>
                    <el-col :span="6" :xs="60">
                        <el-form-item label="单据编号"  prop="documentNo">
                            <el-input v-model="searchForm.documentNo" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :xs="60">
                        <el-form-item label="申请人所在部门" prop="reserve2">
                            <el-input v-model="searchForm.reserve2" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :xs="60">
                        <el-form-item label="预计出差费用"  prop="totalAmount">
                            <el-input v-model="searchForm.totalAmount" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" :xs="60">
                        <el-form-item label="开始日期" prop="startTime">
                            <el-date-picker
                                    v-model="searchForm.startTime"
                                    size="small"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" style="width: 90%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :xs="60">
                        <el-form-item label="结束日期"  prop="endTime">
                            <el-date-picker
                                    v-model="searchForm.endTime"
                                    size="small"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions0"
                                    start-placeholder="form.startTime"
                                    placeholder="选择日期" style="width: 90%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :xs="60">
                        <el-form-item label="出差事由" prop="reason">
                            <el-input v-model="searchForm.reason" placeholder="请输入" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </el-col>
        <my-table ref="tableProduct" :myTableData="myTableData"></my-table>
    </div>

</template>


<script>

    import myTable from '../../components/myTable.vue'

    export default {
        data() {
            return {
                statusData:[],
                currentPage: 1,
                pagesize: 15,
                total: null,
                isShowMore: false,
                searchForm: {
                    documentNo: '',//文件编号
                    status: ''//状态
                },
                pickerOptions0: this.endTime(),
                myTableData: {
                    url: 'expense/getBusinessTripList',
                    dlUrl: 'expense/delBusinessTrip.do',
                    viewName: 'viewBusinessTrip',
                    editName: 'editBusinessTrip',
                    addName:'addBusinessTrip',
                    nodeCode: '513697476671176704',
                    isHiddenAdd2:false,
                    addBtnName:'新增出差申请',
                    isFixRight:true,
                    tableThead: [
                        {
                            headName: '单据编号',
                            headKey: 'documentNo',
                            isNeedFix:true,
                            isFirstColumn:true,
                        },

                        {
                            headName: '申请人',
                            headKey: 'reserve1',
                            isNeedTips:true,
                            width:40
                        },
                        {
                            headName: '申请人所在部门',
                            headKey: 'reserve2',
                            width:60
                        },
                        {
                            headName: '申请日期',
                            headKey: 'applyDate',
                            width:60
                        },
                        {
                            headName: '出差目的地',
                            headKey: 'destination',
                        },
                        {
                            headName: '预计出差费用',
                            headKey: 'totalAmount',
                            formatFilNew:'totalAmount',
                            align:'right',
                            isNumber:true,
                            width:60
                        },
                        {
                            headName: '出差事由',
                            headKey: 'reason',
                            isNeedTips:true
                        },
                        {
                            headName: '审批状态',
                            headKey: 'status',
                            dirKey:'审批状态',
                            width:40
                        },
                        {
                            headName: '当前节点',
                            headKey: 'processUser',
                            width:60
                        }
                    ],
                    checkedThreadData: ['documentNo','reserve1', 'applyDate', 'destination', 'totalAmount', 'reason', 'status'],
                    entity:{
                    },
                    myorderBy: ''

                }

            }

        },

        components: {
            myTable
        },
        methods: {
            showMore() {
                if (!this.isShowMore) {
                    this.isShowMore = true;
                } else {
                    this.isShowMore = false;
                }
                setTimeout(()=>{
                    this.$refs.tableProduct.setPaginationStyle();
                },1);
            },
            search() {
                let searchData = {};
                let searchRange = [];
                let searchWhere = [];
                this.myTableData.range = [];
                this.myTableData.where = [];
                if (this.searchForm.documentNo) {
                    searchData.documentNo = this.searchForm.documentNo
                }
                if (this.searchForm.status) {
                    searchData.status = this.searchForm.status;
                }

                if (this.searchForm.cname) {
                    searchData.cname = this.searchForm.cname
                }
                if (this.searchForm.destination) {
                    searchData.destination = this.searchForm.destination;
                }

                if (this.searchForm.reserve2) {
                    searchData.reserve2 = this.searchForm.reserve2;
                }
                if (this.searchForm.totalAmount) {
                    searchData.totalAmount = this.searchForm.totalAmount;
                }

                if (this.searchForm.reason) {
                    searchData.reason = this.searchForm.reason
                }

                if (this.searchForm.startTime && this.searchForm.endTime) {
                    searchRange = [{'field': 'applyDate', 'from': this.searchForm.startTime, 'to': this.searchForm.endTime}];
                } else if (this.searchForm.startTime) {
                    searchRange = [{'field': 'applyDate', 'from': this.searchForm.startTime, 'to': '2100-01-01'}];
                    /*this.myTableData.entity = searchData;
                    this.myTableData.range = searchRange;
                    this.$refs.tableProduct.findAllProject(1);*/
                } else if (this.searchForm.endTime) {
                    searchRange = [{'field': 'applyDate', 'from': '1900-01-01', 'to': this.searchForm.endTime}];
                    /*this.myTableData.entity = searchData;
                    this.myTableData.range = searchRange;
                    this.$refs.tableProduct.findAllProject(1);*/
                }/* else {
                    this.myTableData.entity = searchData;
                    this.$refs.tableProduct.findAllProject(1);
                }*/

                this.myTableData.entity = searchData;
                this.myTableData.where = searchWhere;
                this.myTableData.range = searchRange;
                this.$refs.tableProduct.findAllProject(1);
            },

            makeDataDictionary:function () {
                var _this = this;
                //出差归属
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "审批状态"
                        },
                        "orderBy": "id asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    resArry.push({
                        label: "全部",
                        value: ""
                    })
                    for(var items in res.data.rows){
                        if(res.data.rows[items].dkey != "0") {
                            resArry.push({
                                label: res.data.rows[items].dvalue,
                                value: res.data.rows[items].dkey
                            })
                        }
                    }
                    _this.statusData = resArry;
                });
            },

            /**
             * 校验结束时间选项
             */
            endTime () {
                var that = this;
                return {
                    disabledDate (time) {
                        if (that.searchForm.startTime) {
                            return new Date(that.searchForm.startTime).getTime() >= time.getTime();
                        } else {

                        }
                    }
                };
            },

        },
        filters: {

        },
        mounted: function () {
            //生成当前页面需要的数据字典内容

           /* if(this.$store.state.oppoListSearchData){
                this.searchForm = this.$store.state.oppoListSearchData
            }*/
            if (this.$route.params.currentPage) {
                this.currentPage = this.$route.params.currentPage;
            }
            this.makeDataDictionary();
        },
        computed: {

        }
    }
</script>
