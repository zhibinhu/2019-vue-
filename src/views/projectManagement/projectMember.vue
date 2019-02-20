
<template>
    <div>
        <el-row>
            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增项目成员</el-button>
            <el-button type="primary" icon="el-icon-close">移除成员</el-button>
        </el-row><br/>
        <div>
            <el-table stripe ref="multipleTable" :data="memData3"  tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
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
        </div>
        <el-row>
            <el-dialog title="添加项目成员" :visible.sync="dialogFormVisible" >
               <!-- <el-transfer v-model="value1" :data="data"></el-transfer>-->
                <div style="text-align: center">
                    <el-transfer style="text-align: left; display: inline-block"  v-model="value4"  filterable :left-default-checked="[2, 3]" :right-default-checked="[1]"  :titles="['全部人员', '已选成员']" :button-texts="['删除', '添加']"
                            :format="{
                                 noChecked: '${total}',
                                 hasChecked: '${checked}/${total}'
                            }"
                            @change="handleChange" :data="data">
                        <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>

                    </el-transfer>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "projectMember",
        data (){
            const generateData = _ => {
                const members=["孙娟娟1","孙娟娟2","孙娟娟3","孙娟娟4","孙娟娟5","孙娟娟6","孙娟娟7","孙娟娟8","孙娟娟9","孙娟娟10","孙娟娟11",                ];
                const data = [];
                for (let j = 0; j <=members.length ; j++) {
                    const currentValue=members[j];
                    console.log(currentValue);
                    data.push({
                        key: j,
                        label: currentValue,
                    });
                }
                return data;
            };
            return {
                memData3: [
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
                formLabelWidth: '120px',
                selected:[],
                data: generateData(),
                value3: [1],
                value4: [1],
            }
        },
        mounted:{

        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
                console.log(value, direction, movedKeys);
            }
        }
    }
</script>
<style scoped>
    .el-dialog{overflow: hidden}
    .v-modal{background: #fff}
    .memActionBtn .el-button{margin: auto;width: 50px;display: block}
    .el-dialog__body{padding: 30px 40px}
</style>