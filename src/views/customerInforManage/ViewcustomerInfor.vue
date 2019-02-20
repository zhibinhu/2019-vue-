<style>
    .table-expand {
        font-size: 0;
    }

    .table-expand label {
        width: 130px;
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

        <!--<h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">-->
        <!--项目名称：{{ProjectNameTitle}}-->
        <!--</h2>-->


        <div style="margin-left: 50px;font-size: 15px;margin-top:50px;color: #606266">


            <el-form label-position="left" inline class="table-expand">
                <el-row :gutter="20">
                    <!--<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="客户编号 :">
                            <span>{{ customerCode }}</span>
                        </el-form-item>
                    </el-col>-->
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="客户名称 :">
                            <span>{{ customerName }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="渠道 :">
                            <span>{{channelData}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="主要联系人:">
                            <span>{{ primaryContact }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="所属行业 :">
                            <span>{{customerIndustryValue}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="电话 :">
                            <span>{{telephone}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="电子邮件 :">
                            <span>{{email }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="传真 :">
                            <span>{{fax }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="网站 :">
                            <span>{{site}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="邮政编码:">
                            <span>{{postalCode }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="所属业务部门 :">
                            <span>{{salesDepartmentValue}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="销售负责人 :">
                            <span>{{salesLeaderValue }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="状态 :">
                            <span>{{status|statusFil}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="创建人 :">
                            <span>{{createBy}}</span>
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
                            <span>{{lastmodifiedTime |timeFmt}}</span>
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
                customerCode:'',
                customerName:'',
                channelName:'',
                channel:'',
                primaryContact:'',
                customerIndustry:'',
                telephone:'',
                email:'',
                fax:'',
                site:'',
                postalCode:'',
                salesDepartment:'',
                salesDepartmentData:[],
                salesLeader:'',
                salesLeaderData:[],
                status:'',
                memo:'',
                createBy:'',
                createTime:'',
                lastmodifiedBy:'',
                lastmodifiedTime:'',
                channelNameData:[],
                customerIndustryData:[]
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
                    _this.customerIndustryData = res.data.rows;
                    console.log("行业",_this.customerIndustryData);
                });
                //所属业务部门
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSaleOrgs'+ window.suffix,
                   /* url:'http://192.168.99.24:6004/customer/getSaleOrgs',*/
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
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getChannels'+ window.suffix,
                    /*url:'http://192.168.99.24:6004/customer/getChannels',*/
                    data: {
                        "entity": {
                            "dtype": "渠道"
                        },
                        "orderBy": "idx asc"
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.content){
                        resArry.push({
                            label:res.data.content[items].channelName,
                            value:res.data.content[items].id
                        })
                    }
                    _this.channelNameData = resArry;
                });
            },
            findProjectInfo: function () {

                var _this = this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/view'+ window.suffix,
                   /* url: "http://192.168.99.24:6004/customer/view",*/
                    data: {
                        'entity': _this.$route.params.id
                    }
                }).then(res => {
                    //成功回调方法
                    console.log(res.data.content);
                    this.customerName =  res.data.content.customerName;
                    this.customerIndustry =  res.data.content.customerIndustry;
                    if(res.data.content&&res.data.content.channel){
                        this.channel =  res.data.content.channel;
                    }
                    this.primaryContact =  res.data.content.primaryContact;
                    this.telephone =  res.data.content.telephone;
                    this.site =  res.data.content.site;
                    this.email =  res.data.content.email;
                    this.status =  res.data.content.status;
                    this.fax =  res.data.content.fax;
                    this.customerAddress =  res.data.content.customerAddress;
                    this.postalCode =  res.data.content.postalCode;
                    this.salesDepartment =  res.data.content.salesDepartment;
                    this.salesLeader =  res.data.content.salesLeader;
                    this.createBy =  res.data.content.createBy;
                    this.createTime =  res.data.content.createTime;
                    this.lastmodifiedBy =  res.data.content.lastmodifiedBy;
                    this.lastmodifiedTime =  res.data.content.lastmodifiedTime;
                    this.memo =  res.data.content.memo;
                    console.log(this.primaryContact);

                    this.formatCreateAndModifyByFil(this.createBy,'createBy');
                    this.formatCreateAndModifyByFil(this.lastmodifiedBy,'lastmodifiedBy');

                });

            },
            close: function () {
                this.$router.push({
                    "name": "customerInforManage/customerInfor",
                    "params":{
                        "currentPage":this.currentPage
                    }
                })
            },

        },
        created() {
            this.makeDataDictionary();
        },
        mounted:function () {
            this.findProjectInfo();
            this.currentPage = this.$route.params.currentPage;
        },
        filters: {
            channelTypeFil:function (value) {
                if(value=="0"){
                    return "Distributor"
                }else if(value=="1"){
                    return "ISV"
                }else if(value=="2"){
                    return "Reseller"
                }
            },
            statusFil:function (value) {
                if(value=="Y"||value=="true"){
                    return "激活"
                }else if(value=="N"||value=="false"){
                    return "停用"
                }
            },
            totalContractAmountFil:function (value) {
                return value/1000
            },
            createByFil:function (value) {
                if(value){
                    return value.split('|')[1]
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
            totalHumanCostFil:function (value) {
                if(value){
                    return value/1000
                }
            },

        },
        computed: {
            customerIndustryValue:function () {
                for(var items in this.customerIndustryData){
                    if(this.customerIndustryData[items].dkey == this.customerIndustry){
                        return this.customerIndustryData[items].dvalue
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
            },
            channelData:function () {
                for(var items in this.channelNameData){
                    if(this.channelNameData[items].value == this.channel){
                        console.log(this.channelNameData[items].label)
                        return this.channelNameData[items].label
                    }
                }
            },
        }
    };
</script>

<style>

</style>
