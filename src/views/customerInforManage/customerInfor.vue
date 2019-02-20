<template>
    <div>
        <el-col :span="24" style="background-color: white">

            <el-form ref="form" :model="form" label-width="90px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="客户名称">
                        <el-input v-model="form.customerName" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="销售负责人">
                        <el-select v-model="form.salesLeader" placeholder="请选择" clearable filterable size="small"
                                   style="width: 90%">

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
                        <el-input v-model="form.primaryContact" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small"
                               @click="search()">
                        查询
                    </el-button>
                    <el-button style="margin-top: 5px" type="primary" size="small" @click="showMore()">展开更多</el-button>
                </el-col>
            </el-form>
            <el-form ref="form" :model="form" label-width="90px" style="margin-bottom: 20px;float: left;width: 100%;"
                     v-show="isShowMore">
                <el-col :span="6" :xs="20">
                    <el-form-item label="渠道">
                        <el-select v-model="form.channel" placeholder="请选择" clearable filterable size="small"
                                   style="width: 90%">
                            <el-option
                                    v-for="item in channelData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="所属行业">
                        <el-select v-model="form.customerIndustry" placeholder="请选择" clearable filterable size="small"
                                   style="width: 90%">

                            <el-option
                                    v-for="item in customerIndustryData"
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
        <!--v-hasPermission="'newCustomBtn'"-->
        <el-button :disabled='permission.charAt(0)!="1"' @click="toProjectApprove()" type="primary" size="small"
                   style="margin-top: 10px;margin-bottom: 5px">
            <i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>新增客户
        </el-button>

        <!--  <el-button @click="customBtn()" type="primary" size="small" style="margin-top: 10px;margin-bottom: 5px">
              <i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>自定义列表
          </el-button>-->


        <el-dialog title="拖动调整顺序" :visible.sync="dialogTableVisible" :modal-append-to-body="false">

            <div style="width: 100%;margin-bottom: 50px;padding-left: 15px">

                <el-checkbox-group v-model="formTheadData">

                    <draggable v-model="formThead">
                        <!--<el-button plain size="small" style="height: 50px; width: 80px;margin-right: 30px" v-for="(element,index) in formThead" :key="index">-->
                        <!--{{element.label}}-->
                        <!--</el-button>-->
                        <el-checkbox v-for="(element,index) in formThead" :key="index" :label="element.value">
                            {{element.label}}
                        </el-checkbox>
                    </draggable>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirmCustom()">确 定</el-button>
  </span>
        </el-dialog>


        <el-table border stripe v-if="ref" :header-row-style="headerStyle"
                  ref="multipleTable"
                  :data="tableData3"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="400"
                  :header-cell-style="{textAlign:'center'}"
                  size="small"
                  @sort-change="change"
                  @selection-change="handleSelectionChange">

            <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="40"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column :prop="items.value" :key='index' v-for='(items , index) in formThead' :label="items.label"
                             v-if="items.isShow"
                             :width="items.width*2.5"
                             sortable="custom">
                <template slot-scope="scope">
                    <!-- <p  v-if="items.label=='项目状态'">{{scope.row[items.value]|statusFil}}</p>
                     <p  v-else-if="items.label=='是否允许填报工时'">{{scope.row[items.value]|isAllowWorkingHoursFil}}</p>-->
                    <p>{{scope.row[items.value]}}</p>
                </template>
            </el-table-column>

            <!--v-hasPermission="'viewCustomInfoBtn'"-->
            <!--v-hasPermission="'editCustomInfoBtn'"-->
            <!--v-hasPermission="'editCustomInfoBtn'"-->
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
                            @click="deleteRow(scope.$index, tableData3,scope.row)"><i class="el-icon-delete"
                                                                                      style="font-size: 11px"></i>
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
                        label: '客户名称',
                        value: 'customerName',
                        width:120,
                        isShow: true,
                    },
                    {
                        label: '销售负责人',
                        value: 'salesLeader',
                        isShow: true,
                        width:50
                    },
                    {
                        label: '所属行业',
                        value: 'customerIndustry',
                        isShow: true,
                        width:60
                    },
                    {
                        label: '渠道',
                        value: 'channel',
                        isShow: true
                    },
                    {
                        label: '主要联系人',
                        value: 'primaryContact',
                        isShow: true,
                        width:50
                    },
                    {
                        label: '电话',
                        value: 'telephone',
                        isShow: true
                    },
                    {
                        label: '电子邮件',
                        value: 'email',
                        isShow: true
                    }
                ],
                formTheadData: ['customerName', 'salesLeader', 'customerIndustry', 'channel', 'primaryContact', 'telephone', 'email'],
                customerCodeData: [],
                dialogTableVisible: false,
                isDisabled: false,
                tableData3: [],
                currentPage: 1,
                total: null,
                pagesize: 15,
                isShowMore: false,
                form: {
                    customerName: '',
                    salesLeader: '',
                    primaryContact: '',
                    channel: '',
                    customerIndustry: ''
                },
                channelData: [],
                headerStyle: {},
                customerIndustryData: [],
                salesLeaderData: [],
                ref: true,
                mysize: 10,
                mypage: 0,
                conditions: [],
                field: "lastmodifiedTime",
                direction: "down",
            }

        },
        components: {
            draggable

        },
        methods: {
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
                    if (this.formTheadData.indexOf(item.value) >= "0") {
                        item.isShow = true
                    } else {
                        item.isShow = false
                    }

                });
                //将用户选择存储本地
            },
            sizeChange(size) {
                this.ref = false;
                this.mypage = 0;
                console.log(this.mypage);
                this.mysize = size;
                var _this = this;
                this.findAllProject(this.conditions, this.mypage, this.mysize, this.direction, this.field);
                this.ref = true;
            },
            currentChange(page) {
                this.mypage = page - 1;
                this.ref = false;
                var _this = this;
                this.findAllProject(this.conditions, this.mypage, this.mysize, this.direction, this.field);
                this.ref = true;
                this.mypage = page;
            },
            change(column, prop, order) {
                this.field = "";
                this.direction = '';
                /* console.log("赋值前的字段",this.field,this.direction);*/
                if (column.prop && column.order) {
                    /*column.prop=column.prop.replace(/\_/, '|');*/
                    this.direction = column.order === 'ascending' ? 'up' : 'down';
                    this.field = column.prop;
                    this.mypage = 0;
                    this.findAllProject(this.conditions, this.mypage, this.mysize, this.direction, this.field);
                }
            },
            toProjectApprove: function () {
                this.$router.push({
                    name: 'AddcustomerInfor'
                })
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
            findAllProject(conditions, mypage, mysize, direction, field) {
                console.log("赋值后的字段", field, direction);

                /*url:"http://192.168.99.24:6004/customer/list",*/
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'masterdata/customer/list' + window.suffix,
                    data: {
                        "conditions": this.conditions,
                        "pageRequest": {
                            'pageNum': this.mypage,
                            'pageSize': this.mysize
                        },
                        "sortBy": {
                            'direction': this.direction,
                            'field': this.field
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data.content[0].content;
                    var _this = this;
                    // console.log('查字典的行业值', _this.customerIndustryData);
                    this.tableData3.forEach((item, index) => {
                        if (item.salesLeader && item.salesLeader.cname) {
                            item.salesLeader = item.salesLeader.cname;

                        }
                    });
                    this.tableData3.forEach((item, index) => {
                        /* console.log("渠道对象",item.channel);*/
                        if (item.channel && item.channel.channelName) {
                            item.channel = item.channel.channelName;

                        }
                    });
                    this.tableData3.forEach((item, index) => {
                        if (_this.customerIndustryData) {
                            _this.customerIndustryData.forEach((subitem, index) => {
                                if (item.customerIndustry) {
                                    if (item.customerIndustry == subitem.value) {
                                        item.customerIndustry = subitem.label;
                                    }
                                }
                            });
                        }
                        _this.salesLeaderData.forEach((subitem,index) => {
                            if(item.salesLeader){
                                if(item.salesLeader == subitem.value){
                                    item.salesLeader = subitem.label;
                                }
                            }
                        });
                    });
                    this.total = Number(res.data.content[0].totalElements);
                })
            },
            showMore() {
                if (!this.isShowMore) {
                    this.isShowMore = true;
                } else {
                    this.isShowMore = false;
                }
            },
            search() {

                var _this = this;
                var myconditions = [];
                if (this.form.customerName) {
                    myconditions.push({"field": 'customerName', "value": this.form.customerName});
                }
                if (this.form.salesLeader) {
                    myconditions.push({"field": 'salesLeader', "value": this.form.salesLeader});
                }
                if (this.form.primaryContact) {
                    myconditions.push({"field": 'primaryContact', "value": this.form.primaryContact});
                }
                if (this.form.channel) {
                    myconditions.push({"field": 'channel', "value": this.form.channel});
                }
                if (this.form.customerIndustry) {
                    myconditions.push({"field": 'customerIndustry', "value": this.form.customerIndustry});
                }
                console.log("查询条件是", this.conditions);
                this.conditions = myconditions;
                this.mypage = 0;
                this.mysize = 10;

                this.findAllProject(this.conditions, this.mypage, this.mysize, this.direction, this.field);

            },
            //查看
            handleView(row) {
                this.$router.push({
                    "name": "ViewcustomerInfor",
                    "params": {
                        "id": row.id,
                        /* "id":row.id,*/
                        "currentPage": this.currentPage
                    }
                })
            },
            //修改
            handleEdit(row) {
                this.$router.push({
                    "name": "EditcustomerInfor",
                    "params": {
                        /*'id':row.id,*/
                        'id': row.id,
                        "currentPage": this.currentPage
                    }
                })
            },
            //删除行
            deleteRow(index, tableData, row) {
                var _this = this;
                this.$confirm('此操作将永久删除客户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'masterdata/customer/delete' + window.suffix,
                        /*url:"http://192.168.99.24:6004/customer/delete",*/
                        data: {
                            "entity": row.id
                        }
                    }).then(res => {
                        if(res.data.status == "ok"){
                            //成功回调方法
                            _this.$router.push({
                                name: 'customerInforManage/customerInfor'
                            });
                            _this.findAllProject(this.conditions, this.mypage, this.mysize, this.direction, this.field);
                        }else{
                            this.$notify({
                                title: '提示',
                                message: res.data.content,
                                type: 'warning'
                            });
                        }

                    });
                    /* tableData.splice(index, 1);*/
                }).catch(() => {
                });
            },

            makeDataDictionary: function () {
                var _this = this;

                function test1() {   //渠道
                    return _this.$myHttp({
                        method: 'POST',
                        url: _this.prefix + 'masterdata/customer/getChannels' + window.suffix,
                        /*url:'masterdata/customer/getChannels',*/
                        data: {
                            "entity": {
                                "dtype": "渠道"
                            },
                            "orderBy": "idx asc"
                        }
                    }).then(res => {
                        //成功回调方法
                        var resArry = [];
                        for (var items in res.data.content) {
                            resArry.push({
                                label: res.data.content[items].channelName,
                                value: res.data.content[items].id
                            })
                        }
                        _this.channelData = resArry;
                    });
                }

                function test2() {   /*行业*/
                    return _this.$myHttp({
                        method: 'POST',
                        url: _this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                        data: {
                            "entity": {
                                "dtype": "行业"
                            },
                            "orderBy": "idx asc"
                        }
                    }).then(res => {
                        //成功回调方法
                        var resArry = [];
                        for (var items in res.data.rows) {
                            resArry.push({
                                label: res.data.rows[items].dvalue,
                                value: res.data.rows[items].dkey
                            })
                        }
                        _this.customerIndustryData = resArry;
                        /* console.log(_this.customerIndustryData)*/
                    });
                }

                function test3() {    //客户名称
                    return _this.$myHttp({
                        method: 'post',
                        url: _this.prefix + 'sysConfig/getCustomerList' + window.suffix,
                        data: {
                            "entity": {},
                            "orderBy": "customerName asc"
                        }
                    }).then(res => {


                        var resArry = [];
                        for (var items in res.data.rows) {
                            resArry.push({
                                label: res.data.rows[items].customerName,
                                value: res.data.rows[items].customerCode
                            });
                        }
                        _this.customerCodeData = resArry;
                    });
                }

                function test4() {
                    //销售负责人
                    return _this.$myHttp({
                        method: 'POST',
                        url: _this.prefix + 'masterdata/customer/getSalePersons' + window.suffix,
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
                        for (var items in res.data.content) {
                            resArry.push({
                                label: res.data.content[items].userName,
                                value: res.data.content[items].id
                            })
                        }
                        _this.salesLeaderData = resArry;
                        console.log(_this.salesLeaderData)
                    });
                }

                /*加载顺序问题，findAllProject方法依赖于test1(),test2(),test3(),test4()执行的结果   解决数据翻译的问题*/
                this.$myHttp.all([test1(), test2(), test3(), test4()])
                    .then(_this.$myHttp.spread(function (acct, perms) {
                        // 两个请求现在都执行完成
                        _this.findAllProject(_this.direction, _this.field);
                    }));
            }


        },
        created() {
            this.makeDataDictionary();
        },
        mounted: function () {
            /* this.findAllProject(this.direction,this.field);*/
            if (this.$route.params.currentPage) {
                this.currentPage = this.$route.params.currentPage;
            }

        },
        filters: {

            test: function (value) {
                console.log(value);
            },
            isAllowWorkingHoursFil: function (value) {
                if (value == 1) {
                    return "是"
                } else if (value == 0) {
                    return "否"
                }
            },
            contractSignTimeFil: function (value) {
                if (value) {
                    var myValue = '' + value;
                    return myValue.substring(0, 10)
                }

            },
            statusFil: function (value) {
                if (value == "01") {
                    return "进行中"
                } else if (value == "02") {
                    return "已结束"
                }
            },
            feeTypeFil: function (value) {
                if (value == "01") {
                    return "计费"
                } else if (value == "02") {
                    return "不计费"
                }
            },
            projectTypeFil: function (value) {
                if (value == '3') {
                    return '商机'
                } else if (value == '5') {
                    return '外部项目'
                } else if (value == '7') {
                    return '研发项目'
                } else if (value == '8') {
                    return '内部项目'
                } else if (value == '9') {
                    return '内部管理'
                }
            },
            totalContractAmountFil: function (value) {
                return value / 1000
            },
            createByFil: function (value) {
                if (value) {
                    return value.split('|')[1]
                }
            },
            formatFil: function (value) {
                const pattern = /(?=((?!\b)\d{3})+$)/g;
                if (value) {
                    var value = Math.round(parseFloat(value / 1000) * 100) / 100;
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
            },
            optfil(v, idx, perimission) {
                if (perimission == null || perimission == '') perimission = '0'
                if (v == null || v == '') v = '0'
                let num = Number.parseInt(perimission, 2) | Number.parseInt(v, 2);
                v = num.toString(2).length < 4 ? util.addPreZero(num.toString(2)) : num.toString(2)
                return v == null ? true : v.charAt(idx) == 1 ? false : true;
            }
        },
        computed: {
            permission() {
                if(this.myGlobal.getPermission){
                    return this.myGlobal.getPermission('499650320725442560');
                }

            }
        }
    }
</script>
<style scoped="this">
    .el-button.is-circle {
        padding: 6px
    }

    .el-checkbox + .el-checkbox {
        margin-left: 0;
    }

    .el-checkbox {
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