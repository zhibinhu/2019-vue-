<style>
    .table-expand {
        font-size: 0;
    }

    .table-expand label {
        width: 140px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>
<template>

    <el-col :span="24" style="background-color: white">


        <div style="margin-left: 50px;font-size: 15px;margin-top:50px;color: #606266">


            <el-form label-position="left" inline class="table-expand">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="产品名称 :">
                            <span>{{ productName  }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="负责人 :">
                            <span>{{ managerName  }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="状态 :">
                            <span>{{statusValue}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="所属产品线 :">
                            <span>{{ productLineName  }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="创建人 :">
                            <span>{{createBy}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="创建时间 :">
                            <span>{{createTime}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="最后修改人 :">
                            <span>{{lastmodifiedBy }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="最后修改时间 :">
                            <span>{{lastmodifiedTime }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="备注:">
                            <span>{{ memo }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

        </div>
        <!--  'channelName','salesLeader','channelIndustry','primaryContact','channelType','telephone','email'-->

        <div style="margin-left: 20px">

            <el-col :span="24" :offset="10">
                <el-button @click="close()"  style="margin-top: 20px;margin-bottom: 10px">返回</el-button>
            </el-col>
        </div>

    </el-col>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                currentPage:'',
                productName:'',
                productLineName:'',
                managerName:'',
                status:'',
                memo:'',
                createBy:'',
                createTime:'',
                lastmodifiedBy:'',
                lastmodifiedTime:'',
                statusData:[]
            };
        },
        methods: {
            formatCreateAndModifyByFil(value,result){
                let username = "";
                if(value) {
                    value = value.split('|')[0]
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'sysData/getUserByUsername' + window.suffix,
                        data: {
                            "entity":{
                                username:value
                            }
                        }
                    }).then(res => {
                        username = res.data.rows[0].cname;
                        this[result]=username;
                    });
                }else{
                    this[result]=username;
                }
            },
            findProjectInfo: function () {
                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url:  this.prefix + 'sysData/getProduct'+ window.suffix,
                    /*url: "http://192.168.99.24:6004/channel/view",*/
                    data: {
                        /*"id": _this.$route.params.id*/
                        "entity":{
                            "id":_this.$route.query.id
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    console.log(res);
                    _this.productName =  res.data.rows[0].productName;
                    _this.productLineName =  res.data.rows[0].productLineName;
                    _this.managerName =  res.data.rows[0].managerName;
                    _this.memo =  res.data.rows[0].memo;
                    _this.createBy =  res.data.rows[0].createBy;
                    _this.createTime =  res.data.rows[0].createTime;
                    _this.lastmodifiedBy =  res.data.rows[0].lastmodifiedBy;
                    _this.lastmodifiedTime =  res.data.rows[0].lastmodifiedTime;
                    _this.status =  res.data.rows[0].status;
                    _this.formatCreateAndModifyByFil(_this.createBy,'createBy');
                    _this.formatCreateAndModifyByFil(_this.lastmodifiedBy,'lastmodifiedBy');
                });
            },
            close: function () {
                this.$router.push({
                    "name": "customerInforManage/product",
                    "params":{
                        "currentPage":this.currentPage
                    }
                })
            },
            makeDataDictionary: function () {
                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                    data: {
                        "entity": {
                            "dtype": "行业"
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.channelIndustryData = res.data.rows;
                });
                //所属业务部门
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSaleOrgs'+ window.suffix,
                    /*url:'http://192.168.99.24:6004/customer/getSaleOrgs',*/
                    data: {
                        "entity": {
                            "dtype": "所属业务部门"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].orgName,
                            value:res.data.content[items].id
                        })
                    }
                    _this.salesDepartmentData = resArry;

                });
                //销售负责人
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSalePersons'+ window.suffix,
                    /*url:'http://192.168.99.24:6004/customer/getSalePersons',*/
                    data: {
                        "entity": {
                            "dtype": "销售负责人"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].userName,
                            value:res.data.content[items].id
                        })
                    }
                    _this.salesLeaderData = resArry;
                    console.log(_this.salesLeaderData)
                });
                //状态
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    /*url:'http://192.168.99.24:6004/customer/getSalePersons',*/
                    data: {
                        "entity": {
                            "dtype": "主数据状态"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    _this.statusData = res.data.rows;
                   /* console.log(_this.statusData)*/
                    /* var resArry = [];
                     for(var items in res.data.content){
                         resArry.push({
                             label:res.data.content[items].userName,
                             value:res.data.content[items].id
                         })
                     }
                     _this.salesLeaderData = resArry;
                     console.log(_this.salesLeaderData)*/
                });
            }
        },
        created() {
            this.findProjectInfo();
            this.makeDataDictionary();
            /* this.initOppoTitle();*/
            this.currentPage = this.$route.query.currentPage;
        },
        mounted:function () {

        },
        computed:{
            statusValue:function () {
                for(var items in this.statusData){
                    if(this.statusData[items].dkey == this.status){
                        return this.statusData[items].dvalue
                    }
                }
            },
        },
        filters: {
            lastmodifiedByFil:function (value) {
                if(value){
                    return value.split('|')[1]
                }
            },
            timeFmt:function (value) {
                if(value){
                    return value.substring(0, 10)+" "+value.substring(11, 18)
                }
            },
            channelTypeFil:function (value) {
                if(value=="0"){
                    return "Distributor"
                }else if(value=="1"){
                    return "ISV"
                }else if(value=="2"){
                    return "Reseller"
                }
            }

        }
    };
</script>

<style>

</style>
