
<template>
    <div>
        <el-col :span="24" style="background-color: white">

           <!-- <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
                字典数据（sys_area_type）
            </h2>-->

            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="字典标签">
                        <el-input v-model="form.label" style="width: 90%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="6" :xs="20">
                    <el-form-item label="字典键值">
                        <el-select v-model="form.dicKey" size="small" placeholder="请选择项目类型" style="width: 90%">
                            <el-option label="项目1" value="shanghai"></el-option>
                            <el-option label="项目2" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6" :xs="20">
                    <el-form-item label="系统内置">
                        <el-select v-model="form.sysOrnot" size="small" style="width: 90%">
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-button style="margin-top: 5px" type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
                <el-button :span="3" :xs="20" type="primary" size="small" @click="showMore()">展开更多</el-button>

            </el-form>

            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px" v-show="isShowMore">
                <el-col :span="12" :xs="20">
                    <el-form-item label="选择时间" size="small">
                        <el-date-picker
                                style="width: 40%"
                                v-model="value5"
                                type="datetimerange"
                                :picker-options="pickerOptions2"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </el-form-item>


                </el-col>



            </el-form>
        </el-col>

        <el-button @click="toAddDictData()" type="primary" size="small" style="margin-top: 20px;margin-bottom: 10px">新增字典数据
        </el-button>


        <el-table  border stripe
                   ref="multipleTable"
                   :data="DictDatas"
                   tooltip-effect="dark"
                   style="width: 100%"
                   size="small"
                   @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="55"
            >
            </el-table-column>
            <el-table-column
                    prop="Diclabel"
                    label="字典标签">
            </el-table-column>
            <el-table-column
                    prop="DicKey"
                    label="字典键值" >
            </el-table-column>
            <el-table-column
                    prop="orderNum"
                    label="排序号">
            </el-table-column>
            <el-table-column
                    prop="sysOrnot"
                    label="系统内置">
            </el-table-column>
            <el-table-column width="125"
                    prop="updateTime"
                    label="更新时间">
            </el-table-column>

            <el-table-column
                    prop="dicNote"
                    label="备注信息">
            </el-table-column>
            <el-table-column
                    prop="dicState"
                    label="状态">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="280">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="editDictData(scope.$index, scope.row)" icon="el-icon-edit" title="编辑字典数据" style="color: #599EC6;font-size: 18px">
                    </el-button>
                    <el-button
                            size="mini"
                            @click="dictDataDisabled(scope.$index, scope.row)"  icon="el-icon-remove-outline" title="禁用字典数据" style="color: #E2735F;font-size: 18px">
                    </el-button>
                    <el-button
                            size="mini"
                            @click="deleteDictData(scope.$index, DictDatas)" icon="el-icon-delete" title="删除字典数据" style="color: #E2735F;font-size: 18px">
                    </el-button>
                    <el-button
                            size="mini"
                            @click="addLowerDictData(scope.$index, scope.row)"  icon="el-icon-plus" title="增加下级字典数据" style="color: #7FB662;font-size: 18px">
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
                :total="DictDatas.length"
                style="background-color: white">
        </el-pagination>


    </div>

</template>


<script>
    import Cookies from 'js-cookie';

    export default {
        data () {
            return {
                DictDatas: [ ],
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
                value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value5: '',
                isShowMore:false
            }

        },
        methods: {
            handleSizeChange: function (size) {
                this.pagesize = size
            },
            handleCurrentChange (currentPage) {
                this.currentPage = currentPage

            },
            handleSelectionChange (val) {
                this.multipleSelection = val
            },

            /* 编辑字典类型*/
            editDictData (index, row) {
                /*console.log(row.projectNum);*/
                this.$router.push({
                    "name": "dictdataEdite",
                })
            },
            /*禁用数据字典类型*/
            dictDataDisabled(index, row){
                rows[index].disabled=true
            },
            /*增加下级字典数据*/
            addLowerDictData: function () {
                this.$router.push({
                    name: 'dictdataEdite'
                })
            },
            /*删除数据字典类型*/
            deleteDictData(index, rows) {
                rows.splice(index, 1);
            },

           /* handleCommand(command) {
                this.$message('click on item ' + command);
            },*/
            showMore(){
                if(!this.isShowMore){
                    this.isShowMore = true;
                }else {
                    this.isShowMore = false;
                }
            },
            findAllDataictionary(){
                this.DictDatas = [
                    {Diclabel:"国家",DicKey:"0",orderNum:"30",sysOrnot:"是",updateTime:"2018-04-02 09:16",dicNote:"",dicState:"未知"	},
                    {Diclabel:"省份直辖市",DicKey:"1",orderNum:"40",sysOrnot:"是",updateTime:"2018-04-02 09:16",dicNote:"",dicState:"未知"	},
                    {Diclabel:"地市",DicKey:"2",orderNum:"50",sysOrnot:"是",updateTime:"2018-04-02 09:16",dicNote:"",dicState:"未知"	},
                    {Diclabel:"区县",DicKey:"3",orderNum:"60",sysOrnot:"是",updateTime:"2018-04-02 09:16",dicNote:"",dicState:"未知"	},
                    {Diclabel:"国家",DicKey:"4",orderNum:"70",sysOrnot:"是",updateTime:"2018-04-02 09:16",dicNote:"",dicState:"未知"	}

                ];
            }

        },
        mounted:function () {
            this.findAllDataictionary();
        }

    }
</script>
<style scoped>
    .el-button--mini, .el-button--mini.is-round{padding: 1px;
        border: 1px solid #ddd;
        background: #efe;}
</style>