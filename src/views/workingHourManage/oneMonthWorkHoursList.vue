<style>
    .el-input__inner{
        height: 30px;
        line-height: 30px;
    }
</style>

<template>

    <div>
        <el-col :span="24" style="background-color: white;margin-bottom: 10px">
            <el-form ref="form" :model="searchForm" label-width="110px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="姓名" style="margin-left: -50px">
                        <el-input v-model="searchForm.cname" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :xs="20" style="padding-top: 10px;font-size: 14px">
                    审批状态
                </el-col>
                <el-col :span="3" :xs="20">
                    <el-checkbox v-model="checked1" style="margin-top: 8px">待审批</el-checkbox>
                </el-col>
                <el-col :span="3" :xs="20">
                    <el-checkbox v-model="checked2" style="margin-top: 8px">审批通过</el-checkbox>
                </el-col>
                <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
                <el-button type="success" size="small" style="position: fixed;right: 20px ;z-index: 100;top: 120px;width: 70px" @click="back()">返回</el-button>

            </el-form>
        </el-col>
        <el-col :span="24" style="background-color: white;padding-top: 10px;padding-bottom: 10px;padding-left: 10px;font-size: 13px">
            <el-button style="margin-top: 5px" type="success" icon="el-icon-success" size="small" @click="agreenApprove">同意</el-button>
            <el-button style="margin-top: 5px" type="danger" icon="el-icon-circle-close-outline" @click="refuseApprove" size="small">退回</el-button>
            <span style="margin-right: 10px;margin-left: 10px">{{"机会名称：  "+ oppoProjectName}}</span>
            <span>{{"商机编号： " + oppoNum}}</span>
            <!--<span>{{"月份： " + month}}</span>-->
        </el-col>
        <el-table border stripe show-summary
                  :summary-method="getSummaries"
                  ref="multipleTable"
                  :data="tableData4"
                  tooltip-effect="dark"
                  style="width: 100%"
                  :header-cell-style="{textAlign:'center'}"
                  size="small"
                  @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection" width="50" align="center" :selectable='checkboxInit'>
            </el-table-column>
            <el-table-column
                    prop="period"
                    label="月份">
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="姓名">
                <template slot-scope="scope">
                    <p>{{scope.row.cname}}</p>
                </template>
            </el-table-column>
             <el-table-column
                    prop="task"
                    label="任务" width="80">
            </el-table-column>
            <el-table-column
                    prop="mandayCancel"
                    label="核销人天（天）"  min-width="105"
                    align="right">
            </el-table-column>
            <el-table-column
                    prop="auditStatus"
                    label="审批状态">
                <template slot-scope="scope">
                    <p>{{scope.row.auditStatus|auditStatusFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeEffort"
                    label="人力成本（元）"  min-width="105"
                    align="right">
                <template slot-scope="scope">
                    <p>{{scope.row.feeEffort|amountFil}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="feeBudget"
                    label="项目费用预算（元）"  min-width="130"
                    align="right">
                <template slot-scope="scope">
                    <!--<p>{{scope.row.feeBudget|amountFil}}</p>-->
                    <p>-</p>
                </template>
            </el-table-column>

            <el-table-column
                    prop="feeCur"
                    label="累计项目费用（元）"  min-width="130"
                    align="right">
                <template slot-scope="scope">
                    <!--<p>{{scope.row.feeCur|amountFil}}</p>-->
                    <p>-</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="lastmodifiedTime"
                    label="最后操作时间" min-width="155">
                <template slot-scope="scope">
                    <p>{{scope.row.lastmodifiedTime}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    v-for="(col,key) in cols"
                    :prop="col.prop"
                    :label="col.label"
                    :key="col.prop"
                    width="60">
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
    import util from '../../libs/util'

    export default {
        data() {
            return {
                currentPage: 1,
                pagesize: 15,
                tableData4: [],
                oppoProjectName:'',
                oppoNum:'',
                searchForm:{
                    cname:'',
                },
                form: {
                    oppoProjectName: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: ''
                },
                value4:[],
                value5:[],
                monthTitle:'',
                month:'',
                projectNameTitle:'',
                options:[
                    {value:"agree",label:"同意"},  {value:"refuse",label:"退回"}
                ],
                value:'',
                cols:[],
                tasks:[],
                total:null,
                mysize: 10,
                mypage: 1,
                entity:{},
                ext:'1',
                listIds:[],
                checked1:true,
                checked2:false
            }
        },
        mounted: function () {
            if(this.$route.query.oppoNum && this.$route.query.month){
                this.oppoNum = this.$route.query.oppoNum;
                this.oppoProjectName = this.$route.query.oppoProjectName;
                this.month = this.$route.query.month;

                this.entity.oppoNum=this.$route.query.oppoNum;
                this.entity.period=this.$route.query.month;

                this.findAll();
                this.initManhours();
            }
            this.makeDataDictionary()
        },
        methods: {
            /* 判断每条记录是否可勾选*/
            checkboxInit(row,index){
                if (row.optStatus==1)
                    return 1;//不可勾选
                else
                    return 0;//可勾选
            },
            back:function () {
                this.$router.push({
                    name: 'oneOppoHoursList',
                    "query":{
                        'oppoNum':this.oppoNum,
                        'oppoProjectName':this.oppoProjectName,
                        'month':this.period
                    }
                })
            },
            makeDataDictionary:function () {
                //任务查字典
                var mydtype='';
                if (this.$route.query.projectType == '3') {
                    mydtype='商机'
                } else if (this.$route.query.projectType == '5') {
                    mydtype='外部项目'
                } else if (this.$route.query.projectType == '7') {
                    mydtype='研发项目'
                } else if (this.$route.query.projectType == '8') {
                    mydtype='内部项目'
                }else if (this.$route.query.projectType == '9') {
                    mydtype='内部管理'
                }

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                        },
                        "ext": "",
                        "pageNum": 0,
                        "where": [
                            {
                                "assemble": "and",
                                "field": "dtype",
                                "opt": "=",
                                "value": mydtype
                            }
                        ],
                        "pageSize": 0,
                        "orderBy": " "
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
                    this.tasks = resArry;

                    console.log("tasksppp:",JSON.stringify(this.tasks));

                });



            },
            /*初始化表头*/
            initManhours: function () {
                var _this = this;
                var resArry = [];

                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'workhour/initByOneMonth' + window.suffix,
                    /*url:'http://192.168.99.38:9001/workhour/initByOneMonth',*/
                    data:{
                        /* month:this.$route.params.month*/
                        "entity":this.$route.query.month,
                        "ext": {},
                        "pageNum": 0,
                        "where": [
                            {
                                "assemble": "and",
                                "field": " ",
                                "opt": "=",
                                "value": " "
                            }
                        ],
                        "pageSize": 15,
                        "orderBy": " "
                    },
                    headers: {
                        'user':'songchao',
                        'id':'15302559515867820',
                        'roles':'10',//2018-11-26 16:51数据库角色编码统一高管pUser去掉用数字编码10  author cff
                        'userName':'songchao'
                    }
                }).then(res => {

                    for (var item in res.data.rows[0].workhourDetails) {
                        resArry.push(
                            {   /*把状态值status拼在key值的后面，方便后面根据入离职日期来判断每天是否可以填报*/
                                prop: res.data.rows[0].workhourDetails[item].date,
                                label: res.data.rows[0].workhourDetails[item].date.substring(6),
                            }
                        );
                    }
                    //成功回调方法
                    this.cols = resArry;
                })
            },
            sizeChange(size) {
                this.mypage = 1;
                this.mysize = size;
                this.findAll();
                this.ref = true;
            },
            currentChange(page) {
                this.mypage = page;
                this.findAll();
                this.ref = true;
                this.mypage = page;
            },
            handleSelectionChange (val) {
                var ids=[];
                for(var i in val){
                    ids.push(val[i].id);
                }
                this.listIds=ids;
            },
            findAll(){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix+ "viewWorkhour/getViewOppoDetail" + window.suffix,
                    /*url:"http://192.168.99.38:9001/viewWorkhour/getViewOppoDetail",*/
                    data: {
                        "entity": this.entity,
                        "ext": this.ext,
                        "pageNum": this.mypage-1,
                        "pageSize": this.mysize,
                        "orderBy": " "
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData4 = res.data.rows;
                    for(var i in this.tableData4){
                        var arr=this.tableData4[i].workhourDetails;
                        for(var j in arr){
                            this.tableData4[i][arr[j].date]=arr[j].amount;
                        }
                    }
                    this.total=Number(res.data.total);
                    if(this.tableData4.length==0) {
                        //把‘暂无数据’字样居左展示
                        document.getElementsByClassName('el-table__empty-text')[0].style.left = '10%';
                    }
                })
            },
            search(){
                this.entity.cname=this.searchForm.cname;
                if(this.checked1 && this.checked2){
                    this.ext="";
                } else if(this.checked1){
                    this.ext="1";
                }else if(this.checked2){
                    this.ext="2";
                }else if(!this.checked1 && !this.checked2){
                    this.entity.cname = '#####'
                }
                this.findAll();
            },
            /*同意按钮*/
            agreenApprove(row){
                if(this.listIds.length>0){
                    this.$myHttp({
                        method: 'POST',
                        url:this.prefix + "workhour/auditWorkhours" + window.suffix,
                        /*url:"http://192.168.99.38:9001/workhour/auditWorkhours",*/
                        data: {
                            "entity": this.listIds,
                            "ext": "2",
                            "pageNum": 0,
                            "pageSize": 0,
                            "orderBy": ""
                        }
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '审批'+res.data.msg,
                            type: 'success'
                        });
                        /* this.$router.push({
                             name: 'oneMonthWorkHoursList'
                         })*/
                        this.findAll();
                    })
                }else{
                    this.$notify({
                        title: '警告',
                        message: '请选择您要操作的列！',
                        type: 'warning'
                    });
                }

            },
            /*退回按钮*/
            refuseApprove(){
                if(this.listIds.length>0){
                    this.$myHttp({
                        method: 'POST',
                        url:this.prefix + "workhour/auditWorkhours" + window.suffix,
                        /* url:"http://192.168.99.38:9001/workhour/auditWorkhours",*/
                        data: {
                            "entity": this.listIds,
                            "ext": "3",
                            "pageNum": 0,
                            "pageSize": 0,
                            "orderBy": ""
                        }
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '退回'+res.data.msg,
                            type: 'success'
                        });
                        /* this.$router.push({
                             name: 'oneMonthWorkHoursList'
                         })*/
                        this.findAll();
                    })
                }else{
                    this.$notify({
                        title: '警告',
                        message: '请选择您要操作的列！',
                        type: 'warning'
                    });
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
                    if (index === 1||index === 2||index === 3||index === 5||index === 9) {
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
                    if(items == '6' || items=='7' || items=='8'){
                        resData.push(util.returnFloat(sums[items]/1000));
                    }else {
                        resData.push(util.keepOneDot(sums[items]));
                    }
                }
                resData[0] = '合计';
                resData[1] = '';
                resData[2] = '';
                resData[3] = '';
                resData[7] = '';
                resData[8] = '';
                resData[9] = '';
                //resData[10] = '';

                return resData;
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

            }

        },
        filters:{
            auditStatusFil:function(value){
                if(value==0){
                    return "草稿"
                }else if(value==1){
                    return "待审批"
                }else if(value==2){
                    return "同意"
                }else if(value==3){
                    return "退回"
                }
            }
        },
        computed:{
            taskValue(){
               for(var iterm in this.tableData4){
                   for(var m in this.tasks){
                       if(this.tableData4[iterm].task==this.tasks[m].value){
                           return this.tasks[m].label
                       }
                   }
               }
            }
        }

    }
</script>
