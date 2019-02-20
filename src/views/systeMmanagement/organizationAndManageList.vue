<style>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
<template>
    <div>

        <!--<el-form-item label="活动名称">-->
        <!--<el-input v-model="form.name"></el-input>-->
        <!--</el-form-item>-->


        <el-col :span="24" style="background-color: white">

            <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
                组织管理列表
            </h2>

            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="组织编号">
                        <el-input v-model="form.name" style="width: 95%" size="small"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="6" :xs="20">
                    <el-form-item label="组织名称">
                        <el-select v-model="form.region" placeholder="请选择项目类型" size="small" style="width: 95%">
                            <el-option label="项目1" value="shanghai"></el-option>
                            <el-option label="项目2" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6" :xs="20">
                    <el-form-item label="组织简称">
                        <el-input v-model="form.name" size="small" style="width: 95%"></el-input>
                    </el-form-item>

                </el-col>
                <el-button :span="3" :xs="20" type="primary" @click="search()">查询</el-button>
                <el-button :span="3" :xs="20" type="primary" @click="showMore()">展开更多</el-button>

            </el-form>

            <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px" v-show="isShowMore">


                <el-col :span="12" :xs="20">
                    <el-form-item label="状态">
                        <el-select v-model="form.region" placeholder="请选择项目类型" style="width: 42%">
                            <el-option label="项目1" value="shanghai"></el-option>
                            <el-option label="项目2" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-form>
        </el-col>

        <el-button @click="toOrganizationAndManage()" size="small" type="primary" style="margin-top: 20px;margin-bottom: 10px">添加组织
        </el-button>


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
                    prop="orgNumber"
                    label="组织编号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="orgName"
                    label="组织名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="orgShort"
                    label="组织简称">
            </el-table-column>
            <el-table-column
                    prop="orgState"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="superiorOrganization"
                    label="上级组织">
            </el-table-column>

            <el-table-column
                    prop="orgType"
                    label="类型">
            </el-table-column>
            <el-table-column
                    prop="draftingDepartment"
                    label="拟稿部门">
            </el-table-column>
            <el-table-column
                    prop="corporateName"
                    label="公司名称">
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="280">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">查看
                    </el-button>
                    <el-button
                            size="mini"
                            @click="handleDelete(scope.$index, scope.row)">编辑
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
    data () {
      return {
        tableData3: [
          {
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },
          {
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },{
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },{
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },{
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },{
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },{
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },{
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },{
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },{
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },{
            'orgNumber': 'C20180329001',
            'orgName': 'XX项目',
            'orgShort': '编制中',
            'orgState': '内部管理项目',
            'superiorOrganization': '张三',
            'orgType': '张三',
            'draftingDepartment': '中建材信息',
            'corporateName': '2018-01-01'
          },
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
          desc: '',
        },
        isShowMore:false,
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
        value5: ''
      }

    },
    methods: {
      toOrganizationAndManage: function () {
        this.$router.push({
          name: 'organizationAndManage'
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
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
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