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
                        <el-form-item label="渠道名称 :">
                            <span>{{ channelName }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="行业 :">
                            <span>{{ channelIndustryValue }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="类型 :">
                            <span>{{channelTypeValue}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="销售负责人:">
                            <span>{{ salesLeaderValue }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="部门 :">
                            <span>{{salesDepartmentValue}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="状态 :">
                            <span>{{status|statusFil}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="渠道主要联系人 :">
                            <span>{{primaryContact }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="电话 :">
                            <span>{{telephone }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="传真 :">
                            <span>{{fax}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="网站:">
                            <span>{{site }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="电子邮件 :">
                            <span>{{email }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="创建人 :">
                            <span>{{createBy }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="创建时间 :">
                            <span>{{createTime|timeFmt }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="最后修改人 :">
                            <span>{{lastmodifiedBy}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="最后修改时间 :">
                            <span>{{lastmodifiedTime|timeFmt }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="备注 :">
                            <span>{{memo }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

        </div>
      <!--  'channelName','salesLeader','channelIndustry','primaryContact','channelType','telephone','email'-->

        <div style="margin-left: 20px">

            <el-col :span="24" :offset="10">
                <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">返回</el-button>
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
                customerCode:'',
                channelName:'',
                channelType:'',
                primaryContact:'',
                channelIndustry:'',
                salesDepartment:'',
                telephone:'',
                email:'',
                fax:'',
                site:'',
                salesLeader:'',
                status:'',
                memo:'',
                createBy:'',
                createTime:'',
                lastmodifiedBy:'',
                lastmodifiedTime:'',
                channelIndustryData:[],
                salesDepartmentData:[],
                salesLeaderData:[],
                channelTypeData:[]
            };
        },
        methods: {
            formatCreateAndModifyByFil(value,result){
                let username = "";
                if(value && value != "|") {
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
           /* initOppoTitle:function(){
                this.ProjectNameTitle=this.$route.params.projectName;
            },*/
            findProjectInfo: function () {
                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url:  this.prefix + 'masterdata/channel/view'+ window.suffix,
                    /*url: "http://192.168.99.24:6004/channel/view",*/
                    data: {
                        "entity": _this.$route.params.id

                        /*"sortBy":{
                            'direction':this.direction,
                            'field':this.field
                        }*/
                    }
                }).then(res => {
                    //成功回调方法
                    this.channelName =  res.data.content.channelName;
                    this.channelType =  res.data.content.channelType;
                    this.primaryContact =  res.data.content.primaryContact;
                    this.channelIndustry =  res.data.content.channelIndustry;
                    this.telephone =  res.data.content.telephone;
                    this.fax =  res.data.content.fax;
                    this.site =  res.data.content.site;
                    this.email =  res.data.content.email;
                    this.salesLeader =  res.data.content.salesLeader;
                    this.status =  res.data.content.status;
                    this.salesDepartment =  res.data.content.salesDepartment;
                    this.memo =  res.data.content.memo;
                    this.createTime =  res.data.content.createTime;
                    this.lastmodifiedBy =  res.data.content.lastmodifiedBy;
                    this.createBy =  res.data.content.createBy;
                    this.lastmodifiedTime =  res.data.content.lastmodifiedTime;
                    this.formatCreateAndModifyByFil(this.createBy,'createBy');
                    this.formatCreateAndModifyByFil(this.lastmodifiedBy,'lastmodifiedBy');
                });
            },
            close: function () {
                this.$router.push({
                    "name": "customerInforManage/channelInfor",
                    "params":{
                        "currentPage":this.currentPage
                    }
                })
            },
            makeDataDictionary: function () {
                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url: _this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "渠道类型"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    _this.channelTypeData = res.data.rows;
                    console.log("查出来的类型",_this.channelTypeData);
                });
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
            }
        },
        created() {
            this.findProjectInfo();
            this.makeDataDictionary();
           /* this.initOppoTitle();*/
            this.currentPage = this.$route.params.currentPage;
        },
        mounted:function () {
        },
        filters: {
            statusFil:function (value) {
                if(value=="Y"||value=="true"){
                    return "激活"
                }else if(value=="N"||value=="false"){
                    return "停用"
                }
            },

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
            /*channelTypeFil:function (value) {
                if(value=="0"){
                    return "Distributor"
                }else if(value=="1"){
                    return "ISV"
                }else if(value=="2"){
                    return "Reseller"
                }
            }*/

        },
        computed: {
            channelIndustryValue:function () {
                for(var items in this.channelIndustryData){
                    if(this.channelIndustryData[items].dkey == this.channelIndustry){
                        return this.channelIndustryData[items].dvalue
                    }
                }
            },
            channelTypeValue:function () {
                console.log('渠道类型',this.channelTypeData);
                for(var items in this.channelTypeData){
                    if(this.channelTypeData[items].dkey == this.channelType){
                        return this.channelTypeData[items].dvalue
                    }
                }
            },
            salesDepartmentValue:function () {
                for(var items in this.salesDepartmentData){
                    if(this.salesDepartmentData[items].value == this.salesDepartment){
                        return this.salesDepartmentData[items].label
                    }else if((this.salesDepartmentData[items].label == this.salesDepartment)){
                        return this.salesDepartmentData[items].label
                    }
                }
            },
            salesLeaderValue:function () {
                for(var items in this.salesLeaderData){
                    if(this.salesLeaderData[items].value == this.salesLeader){
                        return this.salesLeaderData[items].label
                    }else if((this.salesLeaderData[items].label == this.salesLeader)){
                        return this.salesLeaderData[items].label
                    }
                }
            }
        }
    };
</script>

<style>

</style>
