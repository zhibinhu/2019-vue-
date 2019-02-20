<style lang="less">
    input{
        font-size: 11px;
    }
</style>

<template>


    <el-col :span="24" style="background-color: white" >

        <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
            用户管理
        </h2>

        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="80px" style="margin-top: 20px;margin-bottom: 20px;margin-left: 10px">
            <el-col :span="8" :xs="20" >
                <el-form-item label="员工编码">
                    <el-input v-model="form.employeeNumber" style="width: 95%" :disabled="true"  ></el-input>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="用户名">
                    <font color="red" style="margin-left: -10px">*</font>

                    <el-input v-model="form.userName" style="width: 95%"  ></el-input>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="名">
                    <el-input v-model="form.name" style="width: 95%"  ></el-input>
                </el-form-item>

            </el-col>

        </el-form>

        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="80px" style="margin-top: 20px;margin-bottom: 20px;margin-left: 10px">
            <el-col :span="8" :xs="20">
                <el-form-item label="姓">
                    <el-input v-model="form.surname" style="width: 95%"   ></el-input>
                </el-form-item>

            </el-col>


            <el-col :span="8" :xs="20">
                <el-form-item label="英文姓名">
                    <el-input v-model="form.englishName" style="width: 95%"  ></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="真实姓名">
                    <font color="red" style="margin-left: -10px">*</font>
                    <el-input v-model="form.realName" style="width: 95%"  ></el-input>
                </el-form-item>

            </el-col>
        </el-form>

        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="80px" style="margin-top: 20px;margin-bottom: 20px;margin-left: 10px">


            <el-col :span="8" :xs="20">
                <el-form-item label="部门">
                    <el-input v-model="form.department" style="width: 95%"  ></el-input>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="职级">
                    <el-select v-model="form.rank" placeholder="请选择部门" style="width: 95%">
                        <el-option label="项目1" value="shanghai"></el-option>
                        <el-option label="项目2" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="职位">
                    <el-select v-model="form.position" placeholder="请选择部门" style="width: 95%">
                        <el-option label="项目1" value="shanghai"></el-option>
                        <el-option label="项目2" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>


        </el-form>

        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="80px" style="margin-top: 20px;margin-bottom: 20px;margin-left: 10px">


            <el-col :span="8" :xs="20">
                <el-form-item label="成本中心">
                    <el-select v-model="form.department" placeholder="请选择部门" style="width: 95%">
                        <el-option label="项目1" value="shanghai"></el-option>
                        <el-option label="项目2" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="邮箱">
                    <font color="red" style="margin-left: -10px">*</font>
                    <el-input v-model="form.email" style="width: 95%"  ></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="联系方式">
                    <font color="red" style="margin-left: -10px">*</font>
                    <el-input v-model="form.phone" style="width: 95%"  ></el-input>
                </el-form-item>
            </el-col>


        </el-form>

        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="80px" style="margin-top: 20px;margin-bottom: 20px;margin-left: 10px">


            <el-col :span="8" :xs="20">
                <el-form-item label="员工状态">
                    <el-radio v-model="form.employeeStatus" label="1">启用</el-radio>
                    <el-radio v-model="form.employeeStatus" label="2">禁用</el-radio>
                    <el-radio v-model="form.employeeStatus" label="3">锁定</el-radio>

                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="全名">
                    <el-input v-model="form.fullName" style="width: 95%"  ></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="员工类型">
                    <el-radio v-model="form.employeeType" label="1">内部</el-radio>
                    <el-radio v-model="form.employeeType" label="2">外部</el-radio>
                </el-form-item>
            </el-col>


        </el-form>



        <el-col :span="24" :offset="10">
            <el-button @click="saveUserInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px" >提交</el-button>
            <el-button style="margin-top: 20px;margin-bottom: 10px" >取消</el-button>

        </el-col>

    </el-col>
</template>

<script>

  export default {
    name: 'projectManagement-page',
    components: {
    },
    data() {
      return {
        form: {
          employeeNumber: '0001',
          userName:'',
          draftedDepartment: '',
          name: '',
          surname: '',
          englishName:'',
          employeeType:'1',
          rank:'',
          position:'',
          email:'',
          phone:'',
          employeeStatus:'1',
          fullName:'',
          chineseName:''
        },
        labelPosition:'left',
        radio: '1'
      };
    },
    methods: {

      saveUserInfo:function () {
        if(this.checkUserData()){
          this.$myHttp({
            method: 'post',
            url: 'http://192.168.31.10:5001/authUsers',
            data: this.from
          }).then(res => {
            //成功回调方法
            this.$router.push({
              name: 'home_index'
            });
          })

        }else {
          this.$router.push({
            name: 'userList'
          });
//          this.$message({
//            message: '请输入必要信息！',
//            type: 'warning'
//          });
        }
      },
      checkUserData:function () {
        //检测用户信息填写完整性
        if(this.form.userName && this.form.chineseName && this.form.email && this.form.phone){
          return true;
        }
        return false;
      }

    }
  };
</script>

<style>

</style>
