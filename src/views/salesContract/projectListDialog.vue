<template>
    <div style="position: relative;">
        <el-row>
            <el-col :span="24">
                <div class="bgColor">
                    <el-row>
                        <el-form ref="form" label-width="60px">
                            <el-col :span="7" class="inputPadding">
                                <el-form-item label="项目编号" label-width="100px">
                                    <el-input v-model="projectNum" placeholder="请输入" clearable size="small"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="14" class="inputPadding" >
                                <el-form-item label="项目名称" label-width="100px">
                                    <el-input v-model="projectName" placeholder="请输入" clearable size="small"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="3" class="inputPadding" style="margin-top: 5px;">
                                <el-button type="primary" size="small" icon="el-icon-search" round @click="startQuery">查询</el-button>
                            </el-col>
                        </el-form>
                    </el-row>
                </div>
                <div class="commonTable">
                    <el-table
                            id="curTable"
                            :data="ourtableData"
                            border
                            stripe
                            :header-cell-style="{padding:'4px 0',background:'#dfebf9',fontSize:'12px'}"
                            :cell-style="{fontSize:'12px',padding:'4px 0'}"
                            @selection-change="handleSelectionChange"
                            @row-click="selectCurrentLine"
                            style="width: 100%">
                        <el-table-column
                                label-width="150px"
                                prop="projectNum"
                                label="项目编号">
                        </el-table-column>
                        <el-table-column
                                prop="projectName"
                                label="项目名称">
                        </el-table-column>
                        <el-table-column
                                prop="pmName"
                                label="项目经理">
                        </el-table-column>

                        <el-table-column label="操作" width="80px" align="center">
                            <template slot-scope="scope">
                                <a href="javascript:;" @click="confirmSelect(scope.row.projectName,scope.row.projectNum,scope.row.pmName)">选择</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            class="setMinWidth"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageNumber"
                            :page-sizes="[10, 20, 30, 40,50,100]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import util from '../../libs/util';
    export default {
        components: {

        },
        data () {
            return {
                ourtableData: [],
                id: '',
                projectNum: '',
                projectName: '',
                statusValue: '',
                pageNumber: 1,
                pageSize: 10,
                total: 1,
                radio: '',
                radioName: 'a1',
                radioLabel: false,
                managerName: '',
                //pmName:'',
                condition: [],
                statusData: [],
                entity:{},
                dirArry: ['status'],
                account: ''
            };
        },
        mounted () {
            console.log('are you OK ???????????');

            this.queryList(1, 10);/// 初始化查询用户列表
            var that = this;
            document.onkeydown = function (event) {
                if (event.keyCode == '13') {
                    that.startQuery();
                }
            };
            // 解决表格表头错位的问题
            window.onresize = function () {
                setTimeout(function () {
                    var curTable = document.getElementById('curTable');
                    var thGutter = curTable.getElementsByClassName('gutter')[0];
                    thGutter.style.display = 'table-cell';
                }, 500);
            };
            // 获取当前页面所需数据字典数据
            util.getSelectData(this, this.dirArry);
        },
        methods: {
            getCurrentRow (val, account,pmName) {
                console.log('val---', val);
                this.managerName = val;
                this.account = account;
                this.pmName = pmName;
            },
            queryList (currentPage, currentSize, conditions,entity) {
                var params = {
                    'where': conditions,
                    'pageNum': 0,
                    'pageSize': this.pageSize,   //10,
                    'orderBy': 'id asc'
                };
                params.where = conditions || [];
                params.pageNum = currentPage - 1;
                if (currentSize) {
                    params.pageSize = currentSize;
                }else {
                    params.pageSize = this.pageSize;
                }
                //params.pageSize = pageSize; //currentSize;
                console.log("queryList----currentPage",params.pageNum,"----pageSize----",params.pageSize)
                params.entity = entity || {};
                this.$myHttp({
                    method: 'post',
                    url: this.permissionPrefix + '/project/getProjectList',
                    data: params
                }).then(res => {
                    console.log('res---------List---', res);
                    if (res.data && res.data.rows) {
                        this.ourtableData = [];
                        this.total = parseInt(res.data.total);
                        for (var i = 0; i < res.data.rows.length; i++) {
                            var rowContent = {};
                            rowContent.id = res.data.rows[i].id ? res.data.rows[i].id : '';
                            rowContent.projectNum = res.data.rows[i].projectNum ? res.data.rows[i].projectNum : '';
                            rowContent.projectName = res.data.rows[i].projectName ? res.data.rows[i].projectName : '';
                            rowContent.pmName = res.data.rows[i].pmName  ? res.data.rows[i].pmName : '';
                            this.ourtableData.push(rowContent);
                        }
                        var that = this;
                        setTimeout(function () {
                            that.hideRadioLabel();// 隐藏radiobutton的label数字
                        }, 0);
                    }
                });
                setTimeout(function () {
                    var curTable = document.getElementById('curTable');
                    var thGutter = curTable.getElementsByClassName('gutter')[0];
                    thGutter.style.display = 'table-cell';
                }, 500);
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.pageNumber = 1;
                var entity={};
                var projectNum = this.projectNum.replace(/^(\s)*|(\s)*$/g, '');
                var projectName = this.projectName.replace(/^(\s)*|(\s)*$/g, '');
                if (projectNum != '') {
                    entity.projectNum = projectNum;
                }
                if (projectName != '') {
                    entity.projectName = projectName;
                }
                this.entity = entity;
                this.queryList(1, val, this.condition, entity);
            },
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`,"每页",this.pageSize);
                this.pageNumber = val;
                var entity={};
                var projectNum = this.projectNum.replace(/^(\s)*|(\s)*$/g, '');
                var projectName = this.projectName.replace(/^(\s)*|(\s)*$/g, '');
                if (projectNum != '') {
                    entity.projectNum = projectNum;
                }
                if (projectName != '') {
                    entity.projectName = projectName;
                }
                this.entity = entity;
                this.queryList(val, this.pageSize, this.condition,entity);
            },
            startQuery () {
                console.log("enter pressed ...")
                var condition = [];
                var entity={};
                var projectNum = this.projectNum.replace(/^(\s)*|(\s)*$/g, '');
                var projectName = this.projectName.replace(/^(\s)*|(\s)*$/g, '');
                if (projectNum != '') {
                    /*var projectNumObj = {
                        'field': 'projectNum',
                        'value': projectNum
                    };
                    condition.push(projectNumObj);*/
                    entity.projectNum = projectNum;
                }
                if (projectName != '') {
                    /*var projectNameObj = {
                        'field': 'projectName',
                        'value': projectName
                    };
                    condition.push(projectNameObj);*/
                    entity.projectName = projectName;
                }
                if (this.statusValue != '') {
                    var statusValueObj = {
                        'field': 'status',
                        'value': this.statusValue != 'A' ? this.statusValue : ''
                    };
                    condition.push(statusValueObj);
                }
                console.log('condition======', condition);
                console.log('entity======', entity);
                this.condition = condition;
                this.entity = entity;
                this.queryList(1, this.pageSize, condition, entity);
                this.pageNumber = 1;
                // this.pageSize = 10;
            },
            hideRadioLabel () {
                var labels = document.getElementsByClassName('el-radio__label');
                for (var i = 2; i < labels.length; i++) {
                    if (!isNaN(labels[i].innerText)) {
                        labels[i].style.display = 'none';
                    }
                }
            },
            selectCurrentLine (row, event, column) {
                this.getCurrentRow(row.projectName, row.projectNum,row.pmName);
                this.radio = row.id;
            },
            cleanSelectCondition () {
                console.log("cleanSelectCondition start ...")
                var _this = this;
                _this.entity={};
                _this.projectNum= '';
                _this.projectName= '';
                _this.pageSize=10;
                _this.pageNumber=1;
                this.queryList(1, 10);/// 初始化查询用户列表
                console.log("cleanSelectCondition over ...")
            },
            confirmSelect (projectName, projectNum,pmName) {
                this.managerName = projectName;
                this.account = projectNum;
                this.$emit('getProjectName', projectName, projectNum, pmName);
                var _this = this;
                //清除查询条件
                // _this.entity={};
                // _this.projectNum= '';
                // _this.projectName= '';
                //this.cleanSelectCondition();
                //this.queryList(1, 10);/// 初始化查询用户列表
                console.log("clean data ??? ----",_this.entity,"_this.projectNum",_this.projectNum,"_this.projectName",_this.projectName)
            }
        }
    };
</script>
<style scoped>
    .el-message-box{
        width:600px;
        height:600px;
    }
    .commonTable{
        max-height:485px;
        overflow-y:auto;
        position:relative;
    }
    .inputPadding{
        padding-left:10px;
    }
    .setMinWidth{

    }
    .el-dialog__body{
        padding-bottom:10px;
    }
    .commonTable .el-radio__label{
        display:none;
    }
    .el-button.is-circle {
        padding: 7px;
    }

    .el-tooltip {

        height: 28px;
    }
</style>
