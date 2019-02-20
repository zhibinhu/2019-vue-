<template>
    <div>
        <el-tag>项目经理查看立项信息</el-tag><br/><br/>
        <el-col :span="24" style="background-color: white">
            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="项目名称">
                        <el-input v-model="form.name" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="6" :xs="20">
                    <el-form-item label="项目类型">
                        <el-select v-model="form.type" placeholder="请选择项目类型" style="width: 90%" size="small">
                            <el-option label="项目1" value="shanghai"></el-option>
                            <el-option label="项目2" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6" :xs="20">
                    <el-form-item label="项目经理">
                        <el-select v-model="form.manager" placeholder="请选择项目经理" style="width: 90%" size="small">
                            <el-option label="项目1" value="shanghai"></el-option>
                            <el-option label="项目2" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-button :span="3" :xs="20" type="primary" size="small" style="margin-top: 5px" icon="el-icon-search" @click="search()">查询</el-button>
                <el-button :span="3" :xs="20" type="primary" size="small" @click="showMore()">展开更多</el-button>

            </el-form>

            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px" v-show="isShowMore">
                <el-col :span="12" :xs="20">
                    <el-form-item label="选择时间">
                        <el-date-picker
                                style="width: 40%"
                                v-model="value5"
                                type="datetimerange"
                                :picker-options="pickerOptions2"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                                size="small">
                        </el-date-picker>
                    </el-form-item>


                </el-col>


            </el-form>
        </el-col>

        <el-tag style="margin: 10px 0">项目列表</el-tag>
        <el-table border stripe
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                size="small"
                @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="projectNum"
                    label="项目编号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="projectName"
                    label="项目名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="projectState"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="projectType"
                    label="项目类型">
            </el-table-column>
            <el-table-column
                    prop="projectManager"
                    label="项目经理">
            </el-table-column>

            <el-table-column
                    prop="draftedPerson"
                    label="拟稿人">
            </el-table-column>
            <el-table-column
                    prop="draftedDepartment"
                    label="拟稿部门">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="拟稿时间">
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="280">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleView(scope.$index, scope.row)">查看
                    </el-button>
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>

                    <el-dropdown @command="handleCommand">



                        <el-button
                                size="mini"
                                @click="handleDelete(scope.$index, scope.row)">更多
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
</template>

<script>
    export default {
        name: "proManagerOwnProjectList",
        data(){
            return{
                tableData3: [
                    {
                        'projectNum': 'C20180329001',
                        'projectName': 'XX项目',
                        'projectState': '编制中',
                        'projectType': '内部管理项目',
                        'projectManager': '张三',
                        'draftedPerson': '张三',
                        'draftedDepartment': '中建材信息',
                        'time': '2018-01-01'
                    },
                    {
                        'projectNum': 'C20180329002',
                        'projectName': 'XX项目',
                        'projectState': '编制中',
                        'projectType': '内部管理项目',
                        'projectManager': '张三',
                        'draftedPerson': '张三',
                        'draftedDepartment': '中建材信息',
                        'time': '2018-01-01'
                    },
                    {
                        'projectNum': 'C20180329003',
                        'projectName': 'XXXX项目',
                        'projectState': '编制中',
                        'projectType': '内部管理项目',
                        'projectManager': '张三',
                        'draftedPerson': '张三',
                        'draftedDepartment': '中建材信息',
                        'time': '2018-01-01'
                    },
                    {
                        'projectNum': 'C20180329004',
                        'projectName': 'XXXX项目',
                        'projectState': '编制中',
                        'projectType': '内部管理项目',
                        'projectManager': '张三',
                        'draftedPerson': '张三',
                        'draftedDepartment': '中建材信息',
                        'time': '2018-01-01'
                    },
                    {
                        'projectNum': 'C20180329005',
                        'projectName': 'XXXX项目',
                        'projectState': '编制中',
                        'projectType': '内部管理项目',
                        'projectManager': '张三',
                        'draftedPerson': '张三',
                        'draftedDepartment': '中建材信息',
                        'time': '2018-01-01'
                    },
                    {
                        'projectNum': 'C201803290011111111111',
                        'projectName': 'XX项目',
                        'projectState': '编制中',
                        'projectType': '内部管理项目',
                        'projectManager': '张三',
                        'draftedPerson': '张三',
                        'draftedDepartment': '中建材信息',
                        'time': '2018-01-01'

                    },
                    {
                        'projectNum': 'C20180329002',
                        'projectName': 'XX项目',
                        'projectState': '编制中',
                        'projectType': '内部管理项目',
                        'projectManager': '张三',
                        'draftedPerson': '张三',
                        'draftedDepartment': '中建材信息',
                        'time': '2018-01-01'
                    },
                    {
                        'projectNum': 'C20180329003',
                        'projectName': 'XXXX项目',
                        'projectState': '编制中',
                        'projectType': '内部管理项目',
                        'projectManager': '张三',
                        'draftedPerson': '张三',
                        'draftedDepartment': '中建材信息',
                        'time': '2018-01-01'

                    },
                    {
                        'projectNum': 'C20180329004',
                        'projectName': 'XXXX项目',
                        'projectState': '编制中',
                        'projectType': '内部管理项目',
                        'projectManager': '张三',
                        'draftedPerson': '张三',
                        'draftedDepartment': '中建材信息',
                        'time': '2018-01-01'

                    }
                ],
                currentPage: 1,
                pagesize: 10,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
                value5: '',
                isShowMore:false
            }
        },
        created(){
            /*var param = {};
            param.projectName = this.form.name;
            param.projectType = this.form.type;
            param.projectManager = this.form.manager;*/
            /*按当前用户查询*/
            /*var currentUser=Cookies.get('user');*/
        },
        methods: {
            toProjectApprove: function () {
                this.$router.push({
                    name: 'projectApprove'
                })
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
            /* 查看*/
            handleView (index, row) {
                this.$router.push({
                    "name": "projectMaintenance",
                })
            },
            /* 编辑*/
            handleEdit (index, row) {
                this.$router.push({
                    "name": "projectItemEdite",
                })
            },
            /*安搜索条件查询*/
            search(){
                /*var param={};
                param.projectName = this.form.name;
                param.projectType = this.form.projectType;
                param.projectManager = this.form.manager;
                param.time = this.value5;
                this.$myHttp({
                    method: 'GET',
                    url: this.BaseUrl + 'projects',
                    data: param
                }).then(res => {
                    //成功回调方法
                    this.tableData3 = res.data._embedded.projects;
                    console.log(res.data._embedded.projects);
                })*/
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
            }

        },
    }
</script>

<style scoped>

</style>