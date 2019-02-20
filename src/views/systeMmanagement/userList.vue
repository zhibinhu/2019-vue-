
<template>
    <div>

        <el-col :span="24" style="background-color: white">

            <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
                用户列表
            </h2>

            <el-form ref="form"  label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                <el-col :span="6" :xs="20">
                    <el-form-item label="员工编号">
                        <el-input v-model="employeeNumber" size="small" style="width: 90%"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="6" :xs="20">
                    <el-form-item label="用户名">
                        <el-select v-model="userName" placeholder="请选择用户名" style="width: 90%" size="small">
                            <el-option label="项目1" value="shanghai"></el-option>
                            <el-option label="项目2" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6" :xs="20">
                    <el-form-item label="部门">
                        <el-select v-model="department" placeholder="请选择部门" style="width: 90%" size="small">
                            <el-option label="项目1" value="shanghai"></el-option>
                            <el-option label="项目2" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-button style="margin-top: 5px" :span="3" :xs="20" type="primary" size="small" icon="el-icon-search" @click="search()">查询</el-button>
                <el-button :span="3" :xs="20" type="primary" size="small" @click="showMore()">展开更多</el-button>

            </el-form>

        </el-col>

        <el-button @click="addUser()" size="small" type="primary" style="margin-top: 20px;margin-bottom: 10px">新增用户
        </el-button>


        <el-table border stripe
                ref="multipleTable"
                :data="userData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                tooltip-effect="dark"
                style="width: 100%"
                size="small"
                @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="realName"
                    label="真实姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="手机">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="lastLoginTime"
                    label="最后一次登录时间">
            </el-table-column>

            <el-table-column
                    prop="status"
                    label="状态">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
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
                :total="userData.length"
                style="background-color: white">
        </el-pagination>


    </div>

</template>

<script>
  export default {
    data () {
      return {
        userData: [
        ],
        currentPage: 1,
        pagesize: 10,
        employeeNumber:'',
        userName:'',
        department:'',
        value1: true,
        value2: true
      }

    },
    methods: {
      toProjectApprove: function () {
        this.$router.push({
          name: 'project_approve'
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
      addUser(){
        this.$router.push({
          name: 'addUser'
        })
      },
      getUserData(){
        var me = this;
        this.$myHttp({
          method: 'GET',
          url: this.prefix+'authuser/findAllUsers'+ window.suffix,
          data: {}
        }).then(res => {
          //成功回调方法
          me.userData = res.data.content;
        })
      }
    },
    mounted:function () {
      this.getUserData();
    }

  }
</script>