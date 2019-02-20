
<template>
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

</template>

<script>
    export default {
        data() {
            return {
                projectPeriod :[],
                getprojectPeriodUrl:'http://192.168.31.10:5001/projectPeriods',
                currentPage: 1,
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

            }
        },
        created:function(){
            this.getprojectPeriod()
        },
        methods: {
            getprojectPeriod:function(){
                var projectPeriondList = [];
                this.$myHttp({
                    method: 'GET',
                    url: this.getprojectPeriodUrl,
                }).then( res => {
                   /* console.log(res);*/
                    var projectPeriondList = res.data._embedded.projectPeriods;

                    console.log(projectPeriondList);
                    this.projectPeriod = projectPeriondList;
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSubmit () {
              var _this = this;
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
            }

        },
        mounted(){
            // this.getprojectPeriod()
        }
    }
</script>
