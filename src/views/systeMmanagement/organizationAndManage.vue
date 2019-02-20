
<template>

    <el-col :span="24" style="background-color: white" >

        <h2 style="margin-top: 30px;margin-left: 10px;margin-bottom: 50px">
            组织管理
        </h2>

        <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
            <el-col :span="8" :xs="20" >
                <el-form-item label="组织编码">
                    <font color="red" style="margin-left: -10px">*</font>

                    <el-input v-model="form.orgNumber" style="width: 95%" :disabled="true"  ></el-input>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="组织名称">
                    <font color="red" style="margin-left: -10px">*</font>
                    <el-input v-model="form.orgName" style="width: 95%" :disabled="true" ></el-input>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="上级组织">
                    <font color="red" style="margin-left: -10px">*</font>
                    <el-input v-model="form.superiorOrganization" style="width: 95%" :disabled="true" ></el-input>
                </el-form-item>

            </el-col>

        </el-form>



        <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
            <el-col :span="8" :xs="20">
                <el-form-item label="组织简称">
                    <el-input v-model="form.orgShort" style="width: 95%"  :disabled="true" ></el-input>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="状态">
                    <font color="red" style="margin-left: -10px">*</font>

                    <el-radio v-model="radio" label="1">启用</el-radio>
                    <el-radio v-model="radio" label="2">禁用</el-radio>
                </el-form-item>

            </el-col>

            <el-col :span="8" :xs="20">
                <el-form-item label="类型">
                    <font color="red" style="margin-left: -10px">*</font>
                    <el-select v-model="form.orgType" placeholder="请选择项目类型" style="width: 95%">
                        <el-option label="项目1" value="shanghai"></el-option>
                        <el-option label="项目2" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

        </el-form>

        <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
            <el-col :span="8" :xs="20">
                <el-form-item label="公司名称">
                    <el-select v-model="form.corporateName" placeholder="请选择项目类型" style="width: 95%">
                        <el-option label="项目1" value="shanghai"></el-option>
                        <el-option label="项目2" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

            </el-col>

        </el-form>


        <el-col :span="24" :offset="10">
            <el-button @click="saveProjectsInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px" >提交</el-button>
            <el-button @click="search()"  style="margin-top: 20px;margin-bottom: 10px" >取消</el-button>

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
          orgNumber: 'C20180329001',
          orgName: '',
          orgShort: '',
          orgState: '',
          superiorOrganization: '',
          orgType: '',
          draftingDepartment: '',
          corporateName: ''
        },
        radio: '1'
      };
    },
    methods: {
      saveProjectsInfo:function () {
        var _this = this;
        if(this.form.orgNumber && this.form.orgName && this.form.orgShort && this.form.orgState && this.form.superiorOrganization && this.form.orgType && this.form.draftingDepartment && this.form.corporateName){
          var param = {};
          param.orgNumber = this.form.orgNumber;
          param.orgName =  this.form.orgName;
          param.orgShort = this.form.orgShort;
          param.orgState = this.form.orgState;
          param.superiorOrganization = this.form.superiorOrganization;
          param.orgType = this.form.orgType;
          param.draftingDepartment = this.form.draftingDepartment;
          param.corporateName = this.form.corporateName;

          this.$myHttp({
            method: 'POST',
            url: 'http://192.168.31.10:5001/projectPeriods',
            data: param
          }).then(res => {
            //成功回调方法
            _this.$router.push({
              name: 'projectManagement-page'
            });
          })

        }else {
          this.$message("数据不完整");
        }
      }

    },
    created() {

    }
  };
</script>

<style>

</style>
