<template>

    <div>

        <div class="block">
            <span>工时填报开关</span>
            <el-date-picker
                    v-model="year"
                    type="year"
                    size="small"
                    placeholder="选择年"
                    value-format="yyyy"
                    @change="getPeriod"
            >
            </el-date-picker>
        </div>
        <el-table border
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  size="small"
                >

            <el-table-column
                    prop="period"
                    label="月份"
                    align="center"
            >
            </el-table-column>

            <el-table-column
                    label="操作"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.openFlag"
                            @change="switchOpenFlag(scope)"
                            :active-text="scope.row.openFlag == true ? '打开':'关闭'">
                    </el-switch>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                tableData:[],
                multipleTable:'',
                year:''
            }
        },
        methods:{
            getPeriod:function () {
                //获取月份数据
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'manhour/config/findYearManhourSwitches' + window.suffix,
                    data:{
                        'year':this.year
                    }
                }).then(res => {
                    //成功回调方法

                    this.tableData = res.data.content;
                })
            },
            switchOpenFlag:function (value) {

                //修改开关状态
                let reqData = value.row;

                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'manhour/config/savePeriodManhourSwitch' + window.suffix,
                    data: reqData
                }).then(res => {
                    //成功回调方法
                })

            }
        },
        components:{

        },
        mounted: function () {
            this.getPeriod();
        },
    }
</script>

<style scoped>

</style>