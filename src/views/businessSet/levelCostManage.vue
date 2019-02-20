<template>
    <div>
        <el-col :span="24" style="background-color: white;float: none;overflow: hidden">

            <el-form :model="form" label-width="90px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="类别">
                        <el-select v-model="form.type" placeholder="请选择" clearable filterable size="small" style="width: 90%">
                            <el-option
                                    v-for="item in typeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="职级">
                        <el-input v-model="form.title" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="职级代码">
                        <el-input v-model="form.code" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="6" :xs="20">
                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">
                        查询
                    </el-button>

                </el-col>
            </el-form>
        </el-col>
        <!--<el-button v-hasPermission="'newPosBtn'" @click="handleAdd()" type="primary" size="small" style="margin-top: 10px;margin-bottom: 5px">-->
            <!--<i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>新增职级-->
        <!--</el-button>-->
        <div class="tableBtnControl">
            <el-button v-show="false"  id="viewOrNot" type="primary" v-hasPermission="'posViewBtn'">查看</el-button>
            <el-button v-show="false"  id="editOrNot" type="primary" v-hasPermission="'posEditBtn'">编辑</el-button>
            <el-button v-show="false"  id="delOrNot" type="primary" v-hasPermission="'posDelBtn'">删除</el-button>
        </div>
        <my-table ref="levelCostList" :myTableData="myTableData"></my-table>
    </div>
</template>

<script>
    import myTable from '../../components/myTable'
    export default {
        data() {
            return {
                myTableData: {
                    addOppoBtnShow:true,
                    addBtnName:'新增职级',
                    addName:'addNewLevel',
                    url: 'sysData/getPositionLevel',
                    dlUrl: 'sysData/delPositionLevel',
                    viewName: '',
                    editName: 'editNewLevel',
                    isHiddenView:true,
                    nodeCode:'499651250694914048',
                    tableThead: [
                        {
                            headName: '类别',
                            headKey: 'type',
                            dirKey:"职级类型",
                            width:'155px'
                        },
                        {
                            headName: '职级',
                            headKey: 'title'
                        },
                        {
                            headName: '职级代码',
                            headKey: 'code',
                            width:'105px',
                            align:"right"

                        },
                        {
                            headName: '项目成本（人/天）',
                            headKey: 'cost',
                            width:'145px',
                            amoutKey:'金额',
                            align:"right",
                            isNumber:true
                        }
                    ],
                    entity: {},
                    ext: "",
                    conditions: [],
                    pageRequest: {},
                    sortBy:{},
                    myorderBy: '',
                   /* myorderBy:'type asc,code asc'*/
                },
                form:{
                    type:'',
                    title:'',
                    code:'',
                },
                managerIdData:[],
                statusData:[],
                typeData:[]
            }
        },
        methods:{
            handleAdd(){
                this.$router.push({
                    "name": "addNewLevel",
                    "params":{
                        /* "projectName":row.projectName,*/
                        "currentPage":this.currentPage
                    }
                })
            },
            search(){
                var _this = this;
                var myentity={};
                if (this.form.type) {
                    myentity.type=_this.form.type
                }
                if (this.form.title) {
                    myentity.title=_this.form.title
                }
                if (this.form.code) {
                    myentity.code=_this.form.code
                }
                this.myTableData.entity=myentity;
                console.log("查询条件是",this.myTableData.entity);
                this.$refs.levelCostList.findAllProject(1);
            },
            makeDataDictionary:function () {
                //职级类型
                var _this=this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                    data: {
                        "entity": {
                            "dtype": "职级类型"
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
                    _this.typeData = resArry;
                });

            }
        },
        mounted(){
            //表格外部按钮权限控制
            // this.$set(this.myTableData,'addOppoBtnShow',Boolean(document.getElementById('addOppoBtn')));
            //表格内部按钮权限控制
            this.$set(this.myTableData,'viewBtnHidden',!Boolean(document.getElementById('viewOrNot')));
            this.$set(this.myTableData,'editBtnHidden',!Boolean(document.getElementById('editOrNot')));
            this.$set(this.myTableData,'delBtnHidden',!Boolean(document.getElementById('delOrNot')));
        },
        created(){
            this.makeDataDictionary();
        },

        components: {
            myTable
        },
    }
</script>

<style scoped>

</style>