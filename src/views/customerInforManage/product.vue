<template>
    <div>
        <!--<button @click="handleView">查看</button><button @click="handleEdit">修改</button><button @click="handleAdd">新增</button>-->
        <el-col :span="24" style="background-color: white">

            <el-form :model="form" label-width="90px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="产品名称">
                        <el-input v-model="form.productName" placeholder="请输入" style="width: 90%" size="small"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="负责人">
                        <el-select v-model="form.managerId" placeholder="请选择" clearable filterable size="small" style="width: 90%">

                            <el-option
                                    v-for="item in managerIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="请选择" clearable filterable size="small" style="width: 90%">

                            <el-option
                                    v-for="item in statusData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                        查询
                    </el-button>
                    <el-button style="margin-top: 5px" type="primary" size="small" @click="showMore()">展开更多</el-button>
                </el-col>
            </el-form>
            <el-form  :model="form" label-width="90px" style="margin-bottom: 20px;float: left;width: 100%;"
                     v-show="isShowMore">
                <el-col :span="6" :xs="20">
                    <el-form-item label="所属产品线">
                        <el-select v-model="form.productLineId" placeholder="请选择" clearable filterable size="small" style="width: 90%">
                            <el-option
                                    v-for="item in productLineIdData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="备注">
                        <el-input v-model="form.memo" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">&nbsp;</el-col>
            </el-form>
        </el-col>

        <!--<el-button @click="handleAdd()" type="primary" size="small" style="margin-top: 10px;margin-bottom: 5px">-->
            <!--<i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>新增产品-->
        <!--</el-button>-->

        <!--<div class="fnBtnControl">-->
            <!--&lt;!&ndash;v-hasPermission="'addProductBtn'"&ndash;&gt;-->
            <!--<el-button v-show="false"  id="addOppoBtn" type="primary">新增产品</el-button>-->
        <!--</div>-->
        <div class="tableBtnControl">
            <el-button v-show="false"  id="viewOrNot" type="primary" v-hasPermission="'productViewBtn'">查看</el-button>
            <el-button v-show="false"  id="editOrNot" type="primary" v-hasPermission="'productEditBtn'">编辑</el-button>
            <el-button v-show="false"  id="delOrNot" type="primary" v-hasPermission="'productDelBtn'">删除</el-button>
        </div>
        <my-table ref="tableProduct" :myTableData="myTableData"></my-table>
    </div>
</template>

<script>
    import myTable from '../../components/myTable'
    export default {
        data() {
            return {
                myTableData: {
                    addBtnName:'新增产品',
                    addOppoBtnShow:true,
                    url: 'sysData/getProduct',
                    dlUrl: 'sysData/delProduct',
                    viewName: 'Viewproduct',
                    editName: 'Editproduct',
                    addName:'Addproduct',
                   /* exportName:'产品管理.xlsx',*/
                    nodeCode:'499650957567590400',
                    tableThead: [
                        {
                            headName: '产品名称',
                            headKey: 'productName',
                            isNeedTips:true
                        },
                        {
                            headName: '负责人',
                            headKey: 'managerName'
                        },
                        {
                            headName: '状态',
                            headKey: 'status',
                            dirKey: '主数据状态'
                        },
                        {
                            headName: '所属产品线',
                            headKey: 'productLineName',
                            isNeedTips:true

                        },
                        {
                            headName: '备注',
                            headKey: 'memo',
                            isNeedTips:true
                        }
                    ],
                    entity:{},
                    ext:[],
                    myorderBy: ''

                },
                productLineIdData:[],
                managerIdData:[],
                form:{
                    productName:'',
                    salesLeader:'',
                    status:'',
                    productLineId:'',
                    memo:''
                },
                isShowMore: false,
                statusData:[],
                productLineNameData:[],
                managerNameData:[],
            }
        },
        components: {
            myTable
        },
        methods: {
            showMore(){
                if(!this.isShowMore){
                    this.isShowMore = true;
                }else {
                    this.isShowMore = false;
                }
                setTimeout(()=>{
                    this.$refs.tableProduct.setPaginationStyle();
                },1);
            },
            //新增
            handleAdd(row){
                this.$router.push({
                    "name": "Addproduct",
                    "params":{
                        /* "projectName":row.projectName,*/
                        "currentPage":this.currentPage
                    }
                })
            },
            search(){
                var _this = this;
                var myentity={};
                if (this.form.productName) {
                    myentity.productName=_this.form.productName
                }
                if (this.form.managerId) {
                    myentity.managerId=_this.form.managerId
                }
                if (this.form.status) {
                    myentity.status=_this.form.status
                }
                if (this.form.productLineId) {
                    myentity.productLineId=_this.form.productLineId
                }
                if (this.form.memo) {
                    myentity.memo=_this.form.memo
                }
                this.myTableData.entity=myentity;
                console.log("查询条件是",this.myTableData.entity);
                this.$refs.tableProduct.findAllProject(1);
            },
            makeDataDictionary:function () {
                //负责人
                var _this=this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'masterdata/customer/getSalePersons'+ window.suffix,
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
                    _this.managerIdData = resArry;
                });
                //产品线
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysData/getProductLine'+ window.suffix,
                    data: {
                        "entity": {

                        },
                    }
                }).then(res => {
                    //成功回调方法
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].productLineName,
                            value:res.data.rows[items].id
                        })
                    }
                    _this.productLineIdData = resArry;
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
                    var resArry = [];
                    for(var items in res.data.rows){
                        resArry.push({
                            label:res.data.rows[items].dvalue,
                            value:res.data.rows[items].dkey
                        })
                    }

                    _this.statusData = resArry;
                });

            }
        },
        created(){
            this.makeDataDictionary();
        },
        mounted: function () {
            //表格外部按钮权限控制
            // this.$set(this.myTableData,'addOppoBtnShow',Boolean(document.getElementById('addOppoBtn')));
            //表格内部按钮权限控制
            this.$set(this.myTableData,'viewBtnHidden',!Boolean(document.getElementById('viewOrNot')));
            this.$set(this.myTableData,'editBtnHidden',!Boolean(document.getElementById('editOrNot')));
            this.$set(this.myTableData,'delBtnHidden',!Boolean(document.getElementById('delOrNot')));
        },
        filters:  {},

    }
</script>

<style scoped>

</style>