<!--suppress ALL -->
<template>
    <div>
        <el-tag>项目维护</el-tag><br/><br/>
        <el-tabs type="border-card" v-model="activeName2">
            <el-tab-pane name="firt"><span slot="label"><i class="el-icon-date"></i> 项目维护</span>
                <div>
                    <el-col :span="24" style="background-color: white" >

                            <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
                                项目立项
                            </h2>

                            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                                <el-col :span="8" :xs="20" >
                                    <el-form-item label="拟稿人">
                                        <el-input v-model="form.draftedPerson" style="width: 95%" :disabled="false"  ></el-input>
                                    </el-form-item>

                                </el-col>

                                <el-col :span="8" :xs="20">
                                    <el-form-item label="拟稿部门">
                                        <el-input v-model="form.draftedDepartment" style="width: 95%" :disabled="false" ></el-input>
                                    </el-form-item>

                                </el-col>

                                <el-col :span="8" :xs="20">
                                    <el-form-item label="拟稿时间">
                                        <el-input v-model="form.time" style="width: 95%" :disabled="false" ></el-input>
                                    </el-form-item>

                                </el-col>

                            </el-form>



                            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                                <el-col :span="8" :xs="20">
                                    <el-form-item label="项目编号">
                                        <el-input v-model="form.projectNum" style="width: 95%"  :disabled="false" ></el-input>
                                    </el-form-item>

                                </el-col>

                                <el-col :span="8" :xs="20">
                                    <el-form-item label="项目名称">
                                        <font color="red" style="margin-left: -10px">*</font>
                                        <el-input v-model="form.projectName" style="width: 95%"  ></el-input>
                                    </el-form-item>

                                </el-col>

                                <el-col :span="8" :xs="20">
                                    <el-form-item label="状态">
                                        <el-select v-model="form.projectState" placeholder="请选择项目类型" style="width: 95%">
                                            <el-option label="项目1" value="shanghai"></el-option>
                                            <el-option label="项目2" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                            </el-form>

                            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                                <el-col :span="8" :xs="20">
                                    <el-form-item label="项目类型">
                                        <el-select v-model="form.projectType" placeholder="请选择项目类型" style="width: 95%">
                                            <el-option label="项目1" value="shanghai"></el-option>
                                            <el-option label="项目2" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>

                                </el-col>

                                <el-col :span="8" :xs="20">
                                    <el-form-item label="项目经理">
                                        <font color="red" style="margin-left: -10px">*</font>

                                        <el-select v-model="form.projectManager" placeholder="请选择项目经理" style="width: 95%">
                                            <el-option label="项目1" value="shanghai"></el-option>
                                            <el-option label="项目2" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>


                            </el-form>


                            <el-col :span="24" :offset="10">
                                <el-button  @click="proManagerOwnProjectList">返回</el-button>
                                <el-button @click="saveProjectsInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px" >提交</el-button>
                                <el-button @click="search()"  style="margin-top: 20px;margin-bottom: 10px" >取消</el-button>

                            </el-col>

                        </el-col>
                </div>
            </el-tab-pane>

            <el-tab-pane name="second"><span slot="label"><i class="el-icon-date"></i> 项目阶段列表</span>
                <div>
                    <el-col :span="24" style="background-color: white" >
                        <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
                            项目阶段
                        </h2>

                        <el-form ref="form" :model="form" label-width="80px">
                            <el-col :span="12">
                                <el-form-item label="阶段名称">
                                    <el-input v-model="form.periodName" style="width: 95%" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="支付内容">
                                    <el-input v-model="form.periodContent" style="width: 95%" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form>
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-col :span="12">
                                <el-form-item label="选择时间">
                                    <el-date-picker
                                            style="width: 95%"
                                            v-model="value4"
                                            type="datetimerange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            align="right">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="项目经理">
                                    <el-select v-model="form.region" placeholder="请选择项目经理" style="width: 95%">
                                        <el-option label="项目1" value="shanghai"></el-option>
                                        <el-option label="项目2" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form>

                        <el-col>
                            <el-button @click="search()" type="primary" style="margin-top: 20px;margin-bottom: 10px;margin-right: 10px;float : right" >查询</el-button>
                        </el-col>
                    </el-col>
                    <el-button type="primary">主要按钮</el-button>
                    <el-button type="primary">批量删除</el-button>
                    <el-button type="primary">更多操作</el-button>
                    <el-table
                            :data="projectPeriod"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="periodName"
                                label="阶段名称">
                        </el-table-column>
                        <el-table-column
                                prop="periodStartTime"
                                label="阶段开始时间">
                        </el-table-column>
                        <el-table-column
                                prop="periodEndTime"
                                label="阶段结束时间">
                        </el-table-column>
                        <el-table-column
                                prop="periodContent"
                                label="阶段主要交付内容">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="10">
                    </el-pagination>
                </div>
            </el-tab-pane>

            <el-tab-pane name="third"><span slot="label"><i class="el-icon-menu"></i>项目成员管理</span>
                <div>
                    <el-row>
                        <el-button type="primary" icon="el-icon-plus" @click="getmembers">新增项目成员</el-button>
                        <el-button type="primary" icon="el-icon-close" @click="deletemembers">移除成员</el-button>
                    </el-row><br/>
                    <div>
                        <el-table stripe ref="multipleTable" :data="projectAllMember"  tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                            <el-table-column prop="orderNum" label="序号" width="120"></el-table-column>
                            <el-table-column prop="employeeNum" label="工号" show-overflow-tooltip> </el-table-column>
                            <el-table-column prop="mainWork" label="主要工作" show-overflow-tooltip> </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                                :total="projectAllMember.length"
                                style="background-color: white">
                        </el-pagination>
                    </div>
                    <el-row>
                        <el-dialog title="添加项目成员" :visible.sync="dialogFormVisible" style="z-index: 3000">
                            <!-- <el-transfer v-model="value1" :data="data"></el-transfer>-->
                            <div style="text-align: center">
                                <el-transfer style="text-align: left; display: inline-block"  v-model="value88"  filterable :left-default-checked="[2, 3]" :right-default-checked="[1]"  :titles="['全部人员', '已选成员']" :button-texts="['删除', '添加']"
                                             :format="{
                                 noChecked: '${total}',
                                 hasChecked: '${checked}/${total}'
                            }"
                                             @change="handleChange" :data="members">
                                    <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>

                                </el-transfer>
                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="confirmClose">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-row>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ElTabPane from "element-ui/packages/tabs/src/tab-pane";

    export default {
        components: {ElTabPane},
        name: "projectMaintenance",
        data(){
            return{
                projectNum:"1",
                userIds:[],
                currentPage: 1,
                pagesize: 10,
                projectPeriod:[],
                projectPeriodUrl:'http://192.168.31.10:5001/projectPeriods',
                members:[],
                getmembersUrl:'http://192.168.31.10:5001/authuser/findAllUsers',
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
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value5: '',
                activeName2:"firt",
                projectAllMember: [
                    {
                        name: '孙娟娟',
                        orderNum: 18,
                        employeeNum: '2015092501',
                        mainWork: '前端界面开发，ajax后台数据请求，解决bug等'
                    },
                    {
                        name: '孙娟娟',
                        orderNum: 18,
                        employeeNum: '2015092501',
                        mainWork: '前端界面开发，ajax后台数据请求，解决bug等'
                    }, {
                        name: 'John Brown',
                        orderNum: 18,
                        employeeNum: '2015092501',
                        mainWork: '前端界面开发，ajax后台数据请求，解决bug等'
                    }, {
                        name: 'John Brown',
                        orderNum: 18,
                        employeeNum: '2015092501',
                        mainWork: '前端界面开发，ajax后台数据请求，解决bug等'
                    },
                ],
                dialogFormVisible: false,
                formLabelWidth: '120px',
                selected:[],

                value3: [1],
                value88: [],
            }
        },
        created:function(){
                this.getprojectPeriod()
        },
        methods:{
            /*获取项目阶段*/
            getprojectPeriod:function () {
               /* var projectPeriondList = [];
                this.$myHttp({
                    method: 'GET',
                    url: this.projectPeriodUrl
                }).then( res => {
                    console.log(res);
                    var projectPeriondList = res.data._embedded.projectPeriods;
                    console.log(projectPeriondList);
                    this.projectPeriod = projectPeriondList;
                })*/
            },
            /*获取全部成员*/
            getmembers: function(){
                var membersList=[];
                this.dialogFormVisible = true;
                this.$myHttp({
                    method: 'GET',
                    url: this.getmembersUrl,
                }).then(res => {
                    var userlength=res.data.content.length;
                    for(var m=0;m<userlength;m++){
                        membersList.push({
                                key:res.data.content[m].id,
                                label:res.data.content[m].username
                        });
                        console.log("key"+":"+res.data.content[m].id);
                        console.log("label"+":"+res.data.content[m].username);
                        this.members=membersList;
                    }
                    console.log(this.members);
                });

            },
            /*添加项目成员确认按钮*/
            confirmClose:function(){
               this.dialogFormVisible = false;
                this.userIds=this.value88;
                console.log(this.userIds);     /* /!*userIds-->[3,10]*!/*/
                 this.$myHttp({
                     method: 'POST',
                     url: 'http://192.168.31.10:5001/projectuser/saveProjectUsers',
                     data:{
                         "projectId":"7",    /*/*projectNum-->C20180329001*/
                         "userIdArray":[],     /* 防止添加重复，暂时添加空数据*/
                     }
                 }).then(res => {
                   this.$message("添加成功");
                 });
            },
            deletemembers:function(){
              this.$message("确认删除此成员");
            },
            proManagerOwnProjectList(){
                this.$router.push({
                    "name": "proManagerOwnProjectList",
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            /*查看*/
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleCurrentChange (currentPage) {
                this.currentPage = currentPage

            },
            handleSubmit () {
                this.$myHttp({
                    method: 'post',
                    url: 'http://192.168.31.10:5001/authuser,',
                    data: {}
                }).then(res => {
                    //成功回调方法
                    _this.$router.push({
                        name: 'home_index'
                    });
                })
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = [2,3];
                console.log(this.multipleSelection);
            },
            handleDelete:function(){
              this.$message("删除成员");
            },
            select:function(){
                /*const self=this;*/
                this.$refs.selectL.backgroundColor="#eee";
                console.log( this.$refs.selectL.selected);
            },
            Unselect(){},
            selectAll(){},
            UnselectAll(){},
            //暂时无用
            handleChange(value, direction, movedKeys) {
                /*console.log(value, direction, movedKeys);*/
            }
        }
    }
</script>
<style scoped>
    .el-dialog{z-index: 3000;    position: fixed;
        left: 50%;margin-left: -25%;}
</style>