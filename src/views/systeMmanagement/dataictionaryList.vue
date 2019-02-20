
<template>

    <div style="overflow: hidden">
        <div style="background: #fff;width: 290px;min-height: 700px;float: left">
            <el-input
                    placeholder="输入关键过滤字段"
                    v-model="filterText" style="margin: 10px;width: 90%">
            </el-input>
            <el-tree :data="dataDic" :props="defaultProps" @node-click="handleNodeClick" class="filter-tree" default-expand-all
                     :filter-node-method="filterNode" :highlight-current="true"
                     ref="treeDic" style="border: 1px solid #ddd;width: 90%;height:100%;margin: 0 10px">

            </el-tree>
        </div>
        <div  style="padding-left:300px">
            <el-col :span="24" style="background-color: white">

                <!--  <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
                      数据字典列表
                  </h2>-->

                <el-form ref="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                    <el-col :span="6" :xs="20">
                        <el-form-item label="字典类型">
                            <el-input v-model="searchDicForm.dtype" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :xs="20">
                        <el-form-item label="项目内容">
                            <el-input v-model="searchDicForm.dvalue" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :xs="20">
                        <el-form-item label="备注">
                            <el-input v-model="searchDicForm.memo" style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="searchDic()">查询</el-button>

                </el-form>


            </el-col>

            <el-button @click="addDicApprove()" type="primary" size="small" style="margin-top: 10px;margin-bottom: 10px" icon="el-icon-circle-plus-outline">新增字典
            </el-button>


            <el-table  border stripe
                       ref="multipleTable"
                       :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                       tooltip-effect="dark"
                       style="width: 100%"
                       size="small"
                       @selection-change="handleSelectionChange"
                       >
                <el-table-column
                        type="selection"
                        width="40"
                >
                </el-table-column>
                <el-table-column
                        prop="dtype"
                        label="字典类型">
                </el-table-column>
                <el-table-column
                        prop="dkey"
                        label="项目编码">
                    <template slot-scope="scope">
                        <p style="text-decoration:underline;cursor: pointer">{{scope.row.dkey}}</p>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="dvalue"
                        label="项目内容">
                </el-table-column>

                <el-table-column
                        prop="memo"
                        label="备注">
                </el-table-column>

                 <!--<el-table-column
                         prop="dicState"
                         label="状态">
                 </el-table-column>-->
                <el-table-column
                        label="操作"
                        width="110">
                    <template slot-scope="scope">
                        <el-button
                                size="mini" circle type="primary"
                                @click="editTypeOpen(scope.row)" icon="el-icon-edit" title="修改字典类型" style="font-size: 16px">
                        </el-button>
                       <!-- <el-button
                                size="mini" circle type="success"
                                @click="EditSecondlevel(scope.$index, scope.row)" icon="el-icon-tickets" title="查看详细字典数据" style="font-size: 16px">
                        </el-button>-->
                        <el-button
                                size="mini" circle type="danger"
                                @click="handleDelete(scope.$index, tableData3,scope.row)" icon="el-icon-delete" title="删除" style="font-size: 16px">
                        </el-button>


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
                    :total="tableData3.length"
                    style="background-color: white">
            </el-pagination>
        </div>
        <el-dialog title="新增数据字典" :visible.sync="dialogFormVisible" :modal-append-to-body="false"
        >

            <el-form :model="addForm" :rules="rules" ref="ruleFormAdd">
                <el-form-item label="字典类型" :label-width="formLabelWidth" prop="dictype">
                    <el-input v-model="addForm.dictype" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="项目编码" :label-width="formLabelWidth" prop="dickey" >
                    <el-input v-model="addForm.dickey" auto-complete="off" ></el-input>
                </el-form-item>

                <el-form-item label="项目内容" :label-width="formLabelWidth" prop="dicvalue">
                    <el-input v-model="addForm.dicvalue" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="备注信息" :label-width="formLabelWidth" prop="dicmemo">
                    <el-input v-model="addForm.dicmemo" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <!-- <el-button @click="dialogFormVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="confirmDicInfo()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改数据字典" :visible.sync="changeDialogFormVisible" :modal-append-to-body="false"
        >

            <el-form :model="changeForm">
                <el-form-item label="字典类型" :label-width="formLabelWidth" prop="dictype">
                    <el-input v-model="changeForm.dictype" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="项目编码" :label-width="formLabelWidth" prop="dickey" >
                    <el-input v-model="changeForm.dickey" auto-complete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="项目内容" :label-width="formLabelWidth" prop="dicvalue">
                    <el-input v-model="changeForm.dicvalue" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="备注信息" :label-width="formLabelWidth" prop="dicmemo">
                    <el-input v-model="changeForm.dicmemo" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="changeConfirmDicInfo()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
 /* import Cookies from 'js-cookie';*/

  export default {
    components: {},
    data () {
      return {
            rowId:'',
            changeDialogFormVisible:false,
            dataDic:[
               /* {label:"name"}*//*,{label:'商机阶段'},{label:'商机状态'},{label:'赢单率'}*/
            ],
            defaultProps:'',
            filterText: '',
            tableData3: [

            ],
              tableData4:[],
            currentPage: 1,
            pagesize: 15,
            searchDicForm: {
                memo: '',
                dtype: '',
                dvalue: '',
            },
            value5: '',
            isShowMore:false,
            dialogFormVisible: false,
              addForm:{
                  dictype:'',
                  dicvalue:'',
                  dicmemo:'',
                  dickey:''
              },
          changeForm:{
              dictype:'',
              dicvalue:'',
              dicmemo:'',
              dickey:''},
          label:'',
          formLabelWidth:"100px",
          addTypeBynNode:'',
          rules:{
              dictype: [
                  {required: true, message: '请输入项目类型', trigger: 'blur'}
              ],
              dickey: [
                  {required: true, message: '请输入项目编码', trigger: 'blur'}
              ],

          }
      }

    },
      watch: {
          filterText(val) {
              this.$refs.treeDic.filter(val);
          }
      },
    methods: {
        /*树过滤*/
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        /*数据字典编辑*/
        editTypeOpen:function(row){
            this.rowId = row.id;
            this.changeDialogFormVisible=true;
            this.changeForm.dickey=row.dkey;
            this.changeForm.dictype=row.dtype;
            this.changeForm.dicvalue=row.dvalue;
            this.changeForm.dicmemo=row.memo;
        },
        /*新增数据字典*/
        addDicApprove() {
            this.dialogFormVisible=true;
            if(this.addTypeBynNode){
                this.addForm.dictype=this.addTypeBynNode;
            }else{
                this.addForm.dictype=null;
            }
            this.addForm.dickey=null;
            this.addForm.dicvalue=null;
            this.addForm.dicmemo=null;
        },
        confirmDicInfo:function(){
            var addDicData={};
            var isAllowPushData = true;

            this.$refs['ruleFormAdd'].validate((valid) => {
                if (valid) {
                    this.ruleFormAdd = true
                }
            });
            if(this.ruleFormAdd){
                var _this=this;
                _this.$myHttp({
                    method:"POST",
                    url:this.prefix+"sysConfig/getSysDictionaryList"+window.suffix,
                    data: {
                        "entity":{
                            "dtype": _this.addForm.dictype
                        },
                        "pageNum": 0,
                        "pageSize": 1000
                    }
                }).then(res=> {
                        console.log(res);

                        for(var i=0;i<res.data.rows.length;i++){
                            console.log(res.data.rows[i].dkey);
                            if(this.addForm.dickey == res.data.rows[i].dkey){
                                _this.$notify({
                                    title: '警告',
                                    message: '编码重复，请重新输入',
                                    type: 'warning'
                                });
                                isAllowPushData = false;

                            }
                            /* console.log(res.data.rows[i].dkey);*/
                        }

                        if(isAllowPushData){
                            addDicData.dkey=_this.addForm.dickey;
                            addDicData.dtype=_this.addForm.dictype;

                            if(this.addForm.dickey){
                                addDicData.dkey=_this.addForm.dickey;
                            }
                            if(this.addForm.dictype){
                                addDicData.dtype=_this.addForm.dictype;
                            }
                            if(this.addForm.dicvalue){
                                addDicData.dvalue=_this.addForm.dicvalue;
                            }
                            if(this.addForm.dicmemo){
                                addDicData.memo=_this.addForm.dicmemo
                            }

                            _this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'sysConfig/saveSysDictionary'+ window.suffix,
                                data:{
                                    "entity":addDicData,
                                    "pageNum": 0,
                                    "pageSize": 1000
                                },

                            }).then(res => {
                                //成功回调方法
                                _this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });
                                _this.$router.push({
                                    name: 'dataictionaryList',
                                });
                               /* alert(addDicData.dtype)*/
                                this.findAllDataictionary(addDicData.dtype);
                                this.ruleFormAdd = false;
                                this.dialogFormVisible=false;
                                this.addForm.dickey = null;
                                this.addForm.dictype = null;
                                this.addForm.dicvalue = null;
                                this.addForm.dicmemo = null;

                            });

                        }

                    }

                );

            }
           /* this.$refs['ruleFormAdd'].resetFields();*/
        },

        changeConfirmDicInfo:function(){
            this.changeDialogFormVisible=false;
            var _this=this;
            var addDicData={};
            var isAllowPushData = true;


            addDicData.dkey=_this.changeForm.dickey;
            addDicData.dtype=_this.changeForm.dictype;

            if(this.changeForm.dickey){
                addDicData.dkey=_this.changeForm.dickey;
            }
            if(this.changeForm.dictype){
                addDicData.dtype=_this.changeForm.dictype;
            }
            if(this.changeForm.dicvalue){
                addDicData.dvalue=_this.changeForm.dicvalue;
            }
            if(this.changeForm.dicmemo){
                addDicData.memo=_this.changeForm.dicmemo
            }

            addDicData.id = this.rowId;




            _this.$myHttp({
                method: 'POST',
                url: this.prefix + 'sysConfig/saveSysDictionary'+ window.suffix,
                data:{
                    "pageNum": 0,
                    "entity":addDicData,
                    "pageSize": 1000
                },

            }).then(res => {
                //成功回调方法
                _this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                });
                _this.$router.push({
                    name: 'dataictionaryList',
                });
                this.findAllDataictionary(this.changeForm.dictype);

            });

        },

        /*点击左侧节点，右侧显示对应数据*/
        handleNodeClick(data) {

            if(data){
                var that=this;
                this.addTypeBynNode=data.label;
                this.$myHttp({
                    method:"POST",
                    url:this.prefix+"sysConfig/findByDtypeIn"+window.suffix,
                    data: {
                        "entity":{

                        },
                        "ext": data.label,
                        "pageNum": 0,
                        "pageSize": 1000
                    }
                }).then(res=> {
                        that.tableData3=res.data.rows;
                    }
                );
            }
           /* alert(this.addTypeBynNode);*/

        },
      handleSizeChange: function (size) {
        this.pagesize = size
      },
      handleCurrentChange (currentPage) {
        this.currentPage = currentPage

      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },

      /*禁用数据字典类型*/
      handleDisabled(index, row){

      },

      /*删除数据字典类型,删除行*/
        handleDelete(index,tableData3,row){

            var _this = this;
            this.$confirm('此操作将永久删除此条字典信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',

            }).then(() => {
                console.log(row.id);
                _this.$myHttp({
                    method: 'POST',
                    /*url: "http://192.168.99.90:6003/config/sysDictionaries/" + scope.row.id ,*/
                    url:this.prefix + 'sysConfig/delSysDictionary'+ window.suffix,
                    data: {
                        "entity": {},
                        "ext": [
                            row.id
                        ],
                        "pageNum": 0,
                        "pageSize": 1000,
                    }
                }).then(res => {
                    //成功回调方法
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    _this.$router.push({
                        name: 'dataictionaryList'
                    });
                    if(row.dtype){
                        this.findAllDataictionary(row.dtype);
                    }else {
                        this.findAllDataictionary();
                    }

                    /*_this.$router.go(0)*/
                   /* tableData3.splice(index, 1);*/
                });




            }).catch(() => {
               /* this.$message({
                    type: 'info',
                    message: '已取消删除'
                });*/

            });
        },

      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      showMore(){
        if(!this.isShowMore){
          this.isShowMore = true;
        }else {
          this.isShowMore = false;
        }
      },
      findAllDataictionary(dictype){
          var that=this;
            if(dictype){
                this.$myHttp({
                    method:"POST",
                    url:this.prefix+"sysConfig/getSysDictionaryList"+window.suffix,
                    data: {
                        "entity":{
                            "dtype": dictype
                        },
                        "pageNum": 0,
                        "pageSize": 1000,
                        "orderBy": "dkey desc"
                    }
                }).then(res=> {
                        that.tableData3=res.data.rows;
                    }
                );
            }else{
                this.$myHttp({
                    method:"POST",
                    url:this.prefix+"sysConfig/getSysDictionaryList"+window.suffix,
                    data: {
                        "entity":{
                        },
                        "pageNum": 0,
                        "pageSize": 1000,
                        "orderBy": "dkey desc"
                    }
                }).then(res=> {
                        that.tableData3=res.data.rows;
                    }
                );
            }

      },
        /*加载节点数据*/
        findAllDataictionaryType(){
            var that=this;
            this.$myHttp({
                method:"POST",
                url:this.prefix+"sysConfig/findDtype"+window.suffix,
                data: {
                    "entity":{
                    },
                    "ext": "",
                    "pageNum": 0,
                    "pageSize": 1000
                }
            }).then(res=> {
                    /*that.tableData3=res.data.rows;*/
                    for(var i=0;i<res.data.ext.length;i++){
                        this.dataDic.push({"label":res.data.ext[i]});
                    }
                }
            );
        },

        /*按条件搜索字典*/
        searchDic() {
            var _this = this;
            var searchData = {};
            if (this.searchDicForm.memo) {
                searchData.memo = _this.searchDicForm.memo
            }
            if (this.searchDicForm.dtype) {
                searchData.dtype = _this.searchDicForm.dtype
            }
            if (this.searchDicForm.dvalue) {
                searchData.dvalue = _this.searchDicForm.dvalue
            }

            this.$myHttp({
                method: 'POST',
                url: this.prefix + "sysConfig/getSysDictionaryList" + window.suffix,
                data: {
                    "entity": searchData,
                    "pageNum": 0,
                    "pageSize": 1000
                }
            }).then(res => {
                //成功回调方法
                this.tableData3 = res.data.rows;
            })

        },

    },
    mounted:function () {
      this.findAllDataictionary();
      this.findAllDataictionaryType();
      this.handleNodeClick();
    },

  }
</script>
<style>
    .el-button.is-circle{
        padding: 6px;
    }
    .el-input__inner{
        height: 32px;
        line-height: 32px;
    }
</style>