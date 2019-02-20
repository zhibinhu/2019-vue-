<template>

    <div>
        <el-col :span="24" style="background-color: white">

            <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
                {{projectNameTitle}}&nbsp;&nbsp;{{monthTitle}}月&nbsp;&nbsp;{{numName}}
            </h2>

            <el-form ref="form" :model="form" label-width="90px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="选择月份">
                        <el-date-picker  style="width: 90%" size="small"
                                         v-model="value2"
                                         type="month"
                                         placeholder="选择月份">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
                <!-- <el-button :span="3" :xs="20" type="primary" size="small" @click="showMore()">展开更多</el-button>-->

            </el-form>


        </el-col>
        <el-table border stripe
                :data="tableData4.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
                max-height="850"
                size="small"
                ref="multipleTable">
            <el-table-column
                    type="selection">
            </el-table-column>
            <el-table-column fixed
                    label="操作"  width="110">
                <template slot-scope="scope" >
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <!--<el-button ref="confirm" type=""
                            size="mini"
                            @click="handleconfirm(scope.$index, scope.row)">同意
                    </el-button>

                    <el-button
                            size="mini"
                            @click="handleCancle(scope.$index, scope.row)">退回
                    </el-button>-->

                </template>
            </el-table-column>
            <el-table-column width="60"
                    fixed
                    prop="month"
                    label="月份">
            </el-table-column>
            <el-table-column
                    v-for="(col,key) in cols"
                    :prop="col.prop"
                    :label="col.label"
                    :key="col.prop"
                    >
                <template slot-scope="scope">
                    <el-select v-model="scope.row[cols[key].prop]"
                               placeholder="请选择" size="mini" @change="test(scope.row.task)">
                        <el-option v-for="item in timeHours" :key="item.label"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData4.length"
                style="background-color: white">
        </el-pagination>


    </div>

</template>

<script>
    export default {
        data() {
            return {
                currentPage: 1,
                pagesize: 10,
                cols:[
                    {prop:"yuefen ",label:"1（日）"},{prop:"yuefen ",label:"2（一）"},{prop:"yuefen ",label:"3（二）"},{prop:"yuefen ",label:"4（三）"},{prop:"yuefen ",label:"5（四）"},{prop:"yuefen ",label:"6（五）"},{prop:"yuefen ",label:"7（六）"},{prop:"yuefen ",label:"8（日）"},{prop:"yuefen ",label:"9（一）"},{prop:"yuefen ",label:"10（二）"},{prop:"yuefen ",label:"11（三）"},{prop:"yuefen ",label:"12（四）"}
                    ],
                tableData4: [
                    {number:"1",month:"1",paymentPeriod:"3",standardManDay:"18",manDayTotal:"7",nomanDayTotal:"3"},
                    {number:"1",month:"1",paymentPeriod:"3",standardManDay:"18",manDayTotal:"7",nomanDayTotal:"3"},
                    {number:"1",month:"1",paymentPeriod:"3",standardManDay:"18",manDayTotal:"7",nomanDayTotal:"3"},
                    {number:"1",month:"1",paymentPeriod:"3",standardManDay:"18",manDayTotal:"7",nomanDayTotal:"3"},
                    {number:"1",month:"1",paymentPeriod:"3",standardManDay:"18",manDayTotal:"7",nomanDayTotal:"3"}
                ],
                timeHours:[{label:"0.5",value:"0.5"},{label:"1",value:"1"}],
                searchForm:{
                    oppoProjectName:'',
                    projectManager:'',
                    draftedPerson:''
                },
                form: {
                    oppoProjectName: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                options:[
                    {value:"同意",label:"同意"},  {value:"回退",label:"回退"}

                ],
                value:[],
                numName:"",
                value2:"",
                projectNameTitle:'',
                monthTitle:''
            }
        },
        mounted: function () {
            /* this.findAllProject()*/
            this.initTitle();
        },
        methods: {
            initTitle:function(){
                this.projectNameTitle=this.$route.params.projectNameTitle;
                this.monthTitle=this.$route.params.monthTitle;
                this.numName=this.$route.params.numName;
            },

            handleSizeChange: function (size) {
                this.pagesize = size
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage

            },


            handle(scope){
                /*this.$router.push({
                    name: 'workHoursApproval'
                })*/
                this.$router.push({
                    name: 'workHoursApproval',
                    /*params:{
                        projectNum:projectNum,
                        projectName:oppoProjectName,
                    }*/
                })

            },
            handleconfirm(){
                this.$refs.confirm.type="success";
                console.log(this.$refs.confirm.type);

            },
            initManhoursList: function () {
                /*var _this = this;
                var resArry = [];

                this.$myHttp({
                    method: 'get',
                    url: this.BaseUrl + 'manhour/initManhours'
                }).then(res => {
                    //成功回调方法
                    _this.Manhours = res.data.content;

                    for (var item in _this.Manhours.everyDay) {
                        resArry.push(
                            {
                                prop: _this.Manhours.everyDay[item].substring(0, 8),
                                label: _this.Manhours.everyDay[item].substring(6)
                            }
                        )
                    }
                    this.cols = resArry;
                }).catch(function () {
                })*/
            },

        }

    }
</script>
<style>
    .el-input__inner{
        height: 30px;
        line-height: 30px;
    }
</style>