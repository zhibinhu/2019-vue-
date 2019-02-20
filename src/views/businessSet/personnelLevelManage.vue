<template>
    <div>
        <el-col :span="24" style="background-color: white;float: none;overflow: hidden;margin-bottom: 10px">

            <el-form :model="form" label-width="90px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="部门">
                        <el-input v-model="form.orgName" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="姓名">
                        <el-input v-model="form.cname" placeholder="请输入" style="width: 90%" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="20">
                    <el-form-item label="类别">
                        <el-select v-model="form.positionLevelType" placeholder="请选择" clearable filterable size="small" style="width: 90%">
                            <el-option
                                    v-for="item in positionLevelTypeData"
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

                </el-col>
            </el-form>
        </el-col>
       <!-- <el-button @click="handleAdd()" type="primary" size="small" style="margin-top: 10px;margin-bottom: 5px">
            <i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>新增人员职级
        </el-button>-->
        <div class="tableBtnControl">
            <el-button v-show="false"  id="editOrNot" type="primary" v-hasPermission="'personPosEditBtn'">编辑</el-button>
        </div>
        <my-table ref="personnelLevelList" :myTableData="myTableData"></my-table>
    </div>
</template>

<script>
    import myTable from '../../components/myTable'
    export default {
        data() {
            return {
                myTableData: {
                    addOppoBtnShow:false,
                    addBtnName:'新增人员职级',
                    addName:'addPersonnelLevel',
                    url: 'sysData/getUser',
                    dlUrl: '',
                    viewName: '',
                    isHiddenView:true,
                    isHiddendelete:true,
                    editName: 'editPersonnelLevel',
                    nodeCode:'499651420820078592',
                    tableThead: [
                        {
                            headName: '部门',
                            headKey: 'orgName',
                            width:'125px'
                        },
                        {
                            headName: '姓名',
                            headKey: 'cname',
                            width:'85px'
                        },
                        {
                            headName: '类别',
                            headKey: 'positionLevelType',
                            dirKey:'职级类型',
                            width:'145px'
                        },
                        {
                            headName: '职级',
                            headKey: 'positionLevelTitle',
                            isNeedTips:true
                        },
                        {
                            headName: '职级代码',
                            headKey: 'positionLevelCode',
                            width:'105px',
                            align:"right"
                        },
                        {
                            headName: '项目成本（人/天）',
                            headKey: 'positionLevelCost',
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
                    myorderBy: ''
                },
                form:{
                    orgName:'',
                    cname:'',
                    positionLevelType:'',
                },
                positionLevelTypeData:[]
            }
        },
        methods:{
            search(){
                var _this = this;
                var myentity={};
                if (this.form.orgName) {
                    myentity.orgName=_this.form.orgName
                }
                if (this.form.cname) {
                    myentity.cname=_this.form.cname
                }
                if(this.form.positionLevelType){
                    myentity.positionLevelType=_this.form.positionLevelType
                }
                this.myTableData.entity=myentity;
                console.log("查询条件是",this.myTableData.entity);
                this.$refs.personnelLevelList.findAllProject(1);
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
                    _this.positionLevelTypeData = resArry;
                });

            }
        },
        created(){
            this.makeDataDictionary()
        },
        mounted(){
            //表格内部按钮权限控制
            this.$set(this.myTableData,'editBtnHidden',!Boolean(document.getElementById('editOrNot')));
        },
        components: {
            myTable
        }
    }
</script>

<style scoped>

</style>