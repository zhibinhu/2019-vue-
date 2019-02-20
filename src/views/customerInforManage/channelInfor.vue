<template>
    <div>
        <el-col :span="24" style="background-color: white">

            <el-form ref="form" :model="searchForm" label-width="90px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="渠道名称">
                        <el-input v-model="searchForm.channelName" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="销售负责人">
                        <el-select v-model="searchForm.salesLeader" placeholder="请选择" clearable filterable size="small" style="width: 90%">
                            <el-option
                                    v-for="item in salesLeaderData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="主要联系人">
                        <el-input v-model="searchForm.primaryContact" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                        查询
                    </el-button>
                    <el-button style="margin-top: 5px" type="primary" size="small" @click="showMore()">展开更多</el-button>
                </el-col>
            </el-form>
            <el-form ref="form" :model="searchForm" label-width="90px" style="margin-bottom: 20px;float: left;width: 100%;"
                     v-show="isShowMore">
                <el-col :span="6" :xs="20">
                    <el-form-item label="类型">
                        <el-select v-model="searchForm.channelType" placeholder="请选择" clearable filterable size="small" style="width: 90%">
                            <el-option
                                    v-for="item in channelTypeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="行业">
                        <el-select v-model="searchForm.channelIndustry" placeholder="请选择" clearable filterable size="small" style="width: 90%">

                            <el-option
                                    v-for="item in channelIndustryData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">&nbsp;</el-col>
            </el-form>
        </el-col>
        <!--v-hasPermission="'newRoadBtn'"-->
        <el-button  :disabled='permission.charAt(0)!="1"' @click="toProjectApprove()" type="primary" size="small" style="margin-top: 10px;margin-bottom: 5px">
            <i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>新增渠道
        </el-button>

       <!-- <el-button @click="customBtn()" type="primary" size="small" style="margin-top: 10px;margin-bottom: 5px">
            <i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>自定义列表
        </el-button>-->


        <el-dialog title="拖动调整顺序" :visible.sync="dialogTableVisible" :modal-append-to-body="false">

            <div style="width: 100%;margin-bottom: 50px;padding-left: 15px">

                <el-checkbox-group v-model="formTheadData">

                    <draggable v-model="formThead">
                        <!--<el-button plain size="small" style="height: 50px; width: 80px;margin-right: 30px" v-for="(element,index) in formThead" :key="index">-->
                        <!--{{element.label}}-->
                        <!--</el-button>-->
                        <el-checkbox  v-for="(element,index) in formThead" :key="index" :label="element.value">{{element.label}}</el-checkbox>
                    </draggable>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirmCustom()">确 定</el-button>
  </span>
        </el-dialog>


        <el-table border stripe :header-row-style="styleObj"
                  ref="multipleTable"
                  :data="tableData3"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="400"
                  :header-cell-style="{textAlign:'center'}"
                  size="small"
                  @sort-change ="change"
                  @selection-change="handleSelectionChange">

            <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="40"-->
            <!--&gt;-->
            <!--</el-table-column>-->
           <!-- <el-table-column
                    prop="channelName"
                    label="渠道名称"
                    width="95" sortable
            >
            </el-table-column>-->
            <!--<el-table-column
                    prop="projectName"
                    label="项目名称"
            >
            </el-table-column>
            <el-table-column
                    prop="projectState"
                    label="项目状态"
                    width="70"
                    :formatter="projectStateFmt">
            </el-table-column>
            <el-table-column
                    label="合同签订时间"
                    width="100"
            >
                <template  slot-scope="scope">
                    <span  :style="scope.row.projectStartTime < scope.row.contractSignTime ?'color: red':''">{{scope.row.contractSignTime|contractSignTimeFil}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="pmName"
                    label="项目经理"
                    width="70">
            </el-table-column>

            <el-table-column
                    prop="pmoName"
                    label="PMO"
                    width="70">
            </el-table-column>

            <el-table-column
                    prop="projectType"
                    label="项目类型"
                    width="80"
                    :formatter="projectTypeFmt"
            >
            </el-table-column>

            <el-table-column
                    prop="signOrgName"
                    label="签订部门"
                    width="110">
            </el-table-column>

            <el-table-column
                    prop="saleName"
                    label="销售人员"
                    width="70">
            </el-table-column>

            <el-table-column
                    prop="totalContractAmount"
                    label="合同总金额(元)"
                    width="110"
                    :formatter="formatAmount">
            </el-table-column>-->
             <el-table-column :prop="items.value" :key='index' v-for='(items , index) in formThead' :label="items.label" v-if="items.isShow"
                              sortable="custom"
                              :width="items.width*2.5">
                 <template slot-scope="scope">
                    <!-- <p  v-if="items.label=='项目状态'">{{scope.row[items.value]|statusFil}}</p>
                     <p  v-else-if="items.label=='项目类型'">{{scope.row[items.value]|projectTypeFil}}</p>
                     <p  v-else-if="items.label=='计费类型'">{{scope.row[items.value]|feeTypeFil}}</p>
                     <p  v-else-if="items.label=='创建人'">{{scope.row[items.value]|createByFil}}</p>
                     <p  v-else-if="items.label=='项目开始时间'">{{scope.row[items.value]|contractSignTimeFil}}</p>
                     <p  v-else-if="items.label=='项目结束时间'">{{scope.row[items.value]|contractSignTimeFil}}</p>
                     <p  v-else-if="items.label=='最后修改人'">{{scope.row[items.value]|createByFil}}</p>
                     <p  v-else-if="items.label=='合同签订时间'">{{scope.row[items.value]|contractSignTimeFil}}</p>
                     <p  v-else-if="items.label=='合同总金额(元)'">{{scope.row[items.value]|formatFil}}</p>
                     <p  v-else-if="items.label=='是否允许填报工时'">{{scope.row[items.value]|isAllowWorkingHoursFil}}</p>-->
                     <p  v-if="items.label=='类型'">{{scope.row[items.value]|channelTypeFil}}</p>
                     <p>{{scope.row[items.value]}}</p>
                 </template>
             </el-table-column>

            <!--v-hasPermission="'viewRoadBtn'"-->
            <!--v-hasPermission="'editRoadBtn'"-->
            <!--v-hasPermission="'delRoadBtn'"-->
            <el-table-column
                    label="操作"
                    width="140">
                <template slot-scope="scope">
                    <el-button
                            :disabled='scope.row.permission|optfil(1,permission)'
                            size="mini"
                            type="success"
                            circle title="查看"
                            @click="handleView(scope.row)"><i class="el-icon-tickets" style="font-size: 11px"></i>
                    </el-button>
                    <el-button
                            :disabled='scope.row.permission|optfil(2,permission)'
                            size="mini"
                            type="primary"
                            circle title="修改"
                            @click="handleEdit(scope.row)"><i class="el-icon-edit" style="font-size: 11px"></i>
                    </el-button>
                    <el-button
                            :disabled='scope.row.permission|optfil(3,permission)'
                            size="mini"
                            type="danger"
                            circle title="删除"
                            @click="deleteRow(scope.$index, tableData3,scope.row)"><i class="el-icon-delete" style="font-size: 11px"></i>
                    </el-button>
                </template>
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
    import draggable from 'vuedraggable'

    import util from '../../libs/util'
    export default {
        data() {
            return {
                formThead: [
                    {
                        label:'渠道名称',
                        value:'channelName',
                        isShow:true,
                        width:120
                    },
                    {
                        label:'销售负责人',
                        value:'salesLeader',
                        isShow:true,
                        width:50
                    },
                    {
                        label:'行业',
                        value:'channelIndustry',
                        isShow:true,
                        width:60
                    },
                    {
                        label:'类型',
                        value:'channelType',
                        isShow:true,
                        width:50
                    },
                    {
                        label:'渠道主要联系人',
                        value:'primaryContact',
                        isShow:true,
                        width:70
                    },
                    {
                        label:'电话',
                        value:'telephone',
                        isShow:true
                    },
                    {
                        label:'电子邮件',
                        value:'email',
                        isShow:true,
                    }
                ],
                formTheadData:['channelName','salesLeader','channelIndustry','primaryContact','channelType','telephone','email'],
                dialogTableVisible: false,
                channelIndustryData:[],
                channelTypeData:[],
                isDisabled:false,
                form: '',
                tableData3: [],
                currentPage: 1,
                total:null,
                pagesize: 15,
                isShowMore: false,
                searchForm: {
                    channelName: '',
                    salesLeader: '',
                    channelIndustry: '',
                    primaryContact:'',
                    channelType:''
                },
                ref:true,
                mysize:10,
                mypage:0,
                conditions:[],
                field:"lastmodifiedTime",
                direction:"down",
                salesDepartmentData:[],
                salesLeaderData:[],
                styleObj:{
                    background:"red"
                }
            }

        },
        components: {
            draggable

        },
        methods: {
            showMore(){
                if(!this.isShowMore){
                    this.isShowMore = true;
                }else {
                    this.isShowMore = false;
                }
            },
            customBtn() {
                this.dialogTableVisible = true;
            },
            confirmCustom() {
                this.dialogTableVisible = false;
                this.mark = false;
                this.$nextTick(function () {
                    this.mark = true
                });
                this.formThead.forEach((item) => {
                    if(this.formTheadData.indexOf(item.value) >= "0"){
                        item.isShow = true
                    }else {
                        item.isShow = false
                    }

                });
                //将用户选择存储本地
            },
            sizeChange(size){
                this.ref = false;
                this.mypage=0;
                this.mysize=size;
                var _this = this;
                this.findAllProject(this.conditions,this.mypage,this.mysize,this.direction,this.field);
                this.ref = true;
            },
            currentChange(page){
                this.mypage=page-1;
                this.ref = false;
                var _this = this;
                this.findAllProject(this.conditions,this.mypage,this.mysize,this.direction,this.field);
                this.mypage=page;
                this.ref = true
            },
            change(column, prop, order ){
                if(column.prop&&column.order){
                    /*column.prop=column.prop.replace(/\_/, '|');*/
                    this.direction=column.order==='ascending'?'up':'down';
                    this.field=column.prop;
                    this.mypage=0;
                    this.findAllProject(this.conditions,this.mypage,this.mysize,this.direction,this.field);
                }
            },
            toProjectApprove: function () {
                this.$router.push({
                    name: 'AddchannelInfor'
                })
            },
            handleSizeChange: function (size) {
                this.pagesize = size
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage

            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row)
                    })
                } else {
                    this.$refs.multipleTable.clearSelection()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            findAllProject(conditions,mypage,mysize,direction,field) {
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'masterdata/channel/list' + window.suffix,
                    /*url:"http://192.168.99.24:6004/channel/list",*/
                    data: {
                        "conditions":this.conditions,
                        "pageRequest":{
                            'pageNum':this.mypage,
                            'pageSize':this.mysize
                        },
                        "sortBy":{
                            'direction':this.direction,
                            'field':this.field
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data.content[0].content;
                    var _this = this;
                    console.log('lll',this.channelIndustryData);
                    this.tableData3.forEach((item, index) => {
                        _this.channelIndustryData.forEach((subitem,index) => {
                            if(item.channelIndustry){
                                if(item.channelIndustry == subitem.value){
                                    item.channelIndustry = subitem.label;
                                }
                            }
                        });
                    });
                    this.tableData3.forEach((item, index) => {
                        _this.channelTypeData.forEach((subitem,index) => {
                            if(item.channelType){
                                if(item.channelType == subitem.value){
                                    item.channelType = subitem.label;
                                }
                            }
                        });
                    });
                    this.tableData3.forEach((item, index) => {
                        _this.salesLeaderData.forEach((subitem,index) => {
                            /*console.log(item.salesLeader);*/
                            if(item.salesLeader){
                                if(item.salesLeader == subitem.value){
                                    item.salesLeader = subitem.label;
                                }
                            }
                        });
                    });
                    this.tableData3.forEach((item, index) => {
                        _this.salesDepartmentData.forEach((subitem,index) => {
                            /*  console.log(subitem.value);*/
                            if(item.salesDepartment){
                                if(item.salesDepartment == subitem.value){
                                    item.salesDepartment = subitem.label;
                                }
                            }
                        });
                    });
                    this.tableData3.forEach((item, index) => {
                        _this.channelTypeData.forEach((subitem,index) => {
                            if(item.channelType){
                                if(item.channelType == subitem.value){
                                    item.channelType = subitem.label;
                                }
                            }
                        });
                    });
                    this.total = Number(res.data.content[0].totalElements);
                })
            },
            search() {
                var _this = this;
                var myconditions=[];
                /*channelName: '',
                    salesLeader: '',
                    channelIndustry: '',
                    primaryContact:'',
                    channelType:''*/
                if (this.searchForm.channelName) {
                    myconditions.push({"field":'channelName',"value":this.searchForm.channelName});
                }
                if (this.searchForm.salesLeader) {
                    myconditions.push({"field":'salesLeader',"value":this.searchForm.salesLeader});
                }
                if (this.searchForm.channelIndustry) {
                    myconditions.push({"field":'channelIndustry',"value":this.searchForm.channelIndustry});
                }
                if (this.searchForm.primaryContact) {
                    myconditions.push({"field":'primaryContact',"value":this.searchForm.primaryContact});
                }
                if (this.searchForm.channelType) {
                    myconditions.push({"field":'channelType',"value":this.searchForm.channelType});
                }
                this.conditions=myconditions;
                this.mypage=0;
                this.mysize=10;

                this.findAllProject(this.conditions,this.mypage,this.mysize,this.direction,this.field);
            },
            //查看
            handleView(row){
                this.$router.push({
                    "name": "ViewchannelInfor",
                    "params":{
                       /* "projectName":row.projectName,*/
                        "id":row.id,
                        "currentPage":this.currentPage
                    }
                })
            },
            //修改
            handleEdit(row){
                this.$router.push({
                    "name": "EditchannelInfor",
                    "params":{
                        'id':row.id,
                        /*  'projectNum':row.projectNum,*/
                          "currentPage":this.currentPage
                    }
                })
            },
            //删除行
            deleteRow(index, tableData,row){
                var _this = this;
                this.$confirm('此操作将永久删除渠道信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'masterdata/channel/delete'+window.suffix,
                        /*url:'http://192.168.99.24:6004/channel/delete',*/
                        data: {
                            "entity":row.id
                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.status=="error"){
                            this.$notify({
                                title: '警告',
                                message: res.data.content+'，不能被强制删除',
                                type: 'warning'
                            });
                        }
                        _this.$router.push({
                            name: 'customerInforManage/channelInfor'
                        });
                        _this.findAllProject(this.conditions,this.mypage,this.mysize,this.direction,this.field);
                    });
                    /* tableData.splice(index, 1);*/
                }).catch(() => {
                    /**/
                });
            },
            makeDataDictionary:function () {
                var _this = this;

                //渠道类型

                function test1() {

                    return _this.$myHttp({
                        method: 'POST',
                        url: _this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                        data: {
                            "entity": {
                                "dtype": "行业"
                            }
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
                        _this.channelIndustryData = resArry;
                        console.log('litan',resArry);

                    });

                }
                function test2() {
                    //所属业务部门
                    return _this.$myHttp({
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
                        var resArry = [];
                        for(var items in res.data.rows){
                            resArry.push({
                                label:res.data.rows[items].dvalue,
                                value:res.data.rows[items].dkey
                            })
                        }
                        _this.channelTypeData = resArry;
                    });
                }
                function test3() {
                    return _this.$myHttp({
                        method: 'POST',
                        url: _this.prefix + 'masterdata/customer/getSaleOrgs'+ window.suffix,
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
                }
                //销售负责人
                function test4(){
                    return _this.$myHttp({
                        method: 'POST',
                        url: _this.prefix + 'masterdata/customer/getSalePersons'+ window.suffix,
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
                    });
                }

                /*加载顺序问题，findAllProject方法依赖于test1(),test2(),test3(),test4()执行的结果   解决数据翻译的问题*/
                this.$myHttp.all([test1(),test2(),test3(),test4()])
                    .then(_this.$myHttp.spread(function (acct, perms) {
                        // 两个请求现在都执行完成
                        _this.findAllProject(_this.direction,_this.field);
                    }));
            }


        },
        mounted: function () {
            this.makeDataDictionary();
           /* this.findAllProject(this.direction,this.field);*/

            if(this.$route.params.currentPage){
                this.currentPage = this.$route.params.currentPage;
            }

        },
        filters:  {
            channelTypeFil:function (value) {
                if(value=="0"){
                    return "Distributor"
                }else if(value=="1"){
                    return "ISV"
                }else if(value=="2"){
                    return "Reseller"
                }
            },
            /*test:function(value){
                console.log(value);
            },*/
            isAllowWorkingHoursFil:function(value){
                if(value==1){
                    return "是"
                }else if(value==0){
                    return "否"
                }
            },
            contractSignTimeFil:function (value) {
                if(value){
                    var myValue = '' + value;
                    return myValue.substring(0, 10)
                }

            },
            statusFil:function (value) {
                if(value=="01"){
                    return "进行中"
                }else if(value=="02"){
                    return "已结束"
                }
            },
            feeTypeFil:function (value) {
                if(value=="01"){
                    return "计费"
                }else if(value=="02"){
                    return "不计费"
                }
            },
            projectTypeFil:function (value) {
                if (value == '3') {
                    return '商机'
                } else if (value == '5') {
                    return '外部项目'
                } else if (value == '7') {
                    return '研发项目'
                } else if (value == '8') {
                    return '内部项目'
                }else if (value == '9') {
                    return '内部管理'
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
            formatFil:function(value){
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                if(value){
                    var value=Math.round(parseFloat(value/1000)*100)/100;
                    var xsd=value.toString().split(".");
                    if(xsd.length==1){
                        value=value.toString().replace(pattern, ',')+".00";
                        return value;
                    }
                    if(xsd.length>1){
                        if(xsd[1].length<2){
                            value=value.toString().replace(pattern, ',')+"0";
                        }
                        return value;
                    }
                }
            },
            optfil(v, idx,perimission) {
                if (perimission == null || perimission == '') perimission = '0'
                if (v == null || v == '') v = '0'
                let num = Number.parseInt(perimission, 2) | Number.parseInt(v, 2);
                v = num.toString(2).length < 4 ? util.addPreZero(num.toString(2)):num.toString(2)
                return v == null ? true : v.charAt(idx) == 1 ? false : true;
             }
        },
        computed: {
            permission() {
                if(this.myGlobal.getPermission){
                    return this.myGlobal.getPermission('499650505958490112');

                }
            }
        }

    }
</script>
<style scoped="this">
    .el-button.is-circle{padding: 6px}
    .el-checkbox+.el-checkbox{
        margin-left:0;
    }
    .el-checkbox{
        width: 23%;
        border: 1px solid #ddd;
        background: #E9EAEC;
        padding: 5px 6px;
        border-radius: 5px;
        margin: 0 13px 10px 0;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }

</style>