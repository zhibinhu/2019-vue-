<template>
    <div>
    <el-row style="background-color: white;margin-bottom: 10px">
           <el-col :span="24" >
                <el-form ref="form" :model="searchForm" label-width="80px" style="margin-top: 20px;margin-bottom: 20px">
                    <el-col :span="6" :xs="20">
                        <el-form-item label="起始月份">
                            <el-date-picker size="small"   style="width: 90%"
                                    v-model="searchForm.startMonth"
                                    type="month"
                                    placeholder="选择月" value-format="yyyy-MM">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :xs="20">
                        <el-form-item label="结束月份" style="margin-left:-10px;">
                            <el-date-picker size="small"   style="width: 90%"
                                    
                                    v-model="searchForm.endMonth"   
                                    type="month"
                                    placeholder="选择月" value-format="yyyy-MM">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :xs="50">
                        <el-form-item label="项目名称">
                            <el-input v-model="searchForm.projectName" placeholder="请输入"  style="width: 90%" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :xs="50">
                        <el-form-item label="项目运行状态" label-width="100px">
                            <el-select v-model="searchForm.projectStateText" size="small" clearable style="width: 70%">
                                <el-option value="全部"></el-option>
                                <el-option value="正常"></el-option>
                                <el-option value="延迟"></el-option>
                                <el-option value="提前"></el-option>
                                <el-option value="暂停"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-col>
                        <el-button  style=" margin-top: 5px"  type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
                </el-form>
            </el-col>

    </el-row>
    <div style="margin-bottom: 5px;">
        <el-button @click="createRpeort()" type="primary" size="small" v-if="showCreateExsistReport==true"><i style="margin-right: 5px" class="el-icon-document"></i>生成已存在项目的月报</el-button>
        <el-button @click="createTheCycleReport()" type="primary" size="small" v-if="showCreateExsistReport==true"><i style="margin-right: 5px" class="el-icon-document"></i>生成当前周期月报</el-button>
    </div>
    <my-table ref="tableReport" :myTableData="myTableData"></my-table>

</div>
</template>



<script>
 import myTable from '../../components/myTable.vue';
 export default{
     data: function () {
         return {
             form: {

             },
             searchForm: {
                 startMonth: '',
                 endMonth: '',
                 projectName: '',
                 projectStateText: ''
             },
             myTableData: {
                 nodeCode: '507616699114061824',
                 searchDataName: 'reportListSearchData',
                 url: 'project/getReportList',
                 dlUrl: 'project/delProjectReport',
                 viewName: 'viewProjectReport',
                 editName: 'addProjectReport',
                 isFixRight: true,
                 tableThead: [
                     {
                         headName: '项目编号',
                         headKey: 'projectNum',
                         isFirstColumn: true,
                         isNeedFix: true
                     },

                     {
                         headName: '项目名称',
                         headKey: 'projectName',
                         isNeedTips: true
                     },
                     {
                         headName: '项目经理',
                         headKey: 'pmName'
                     },
                     {
                         headName: '周期',
                         headKey: 'cycle',
                         width: 50
                     },
                     {
                         headName: '项目完成度',
                         headKey: 'projectCompletionSchedule',
                         align: 'right',
                         width: 50
                     },
                     {
                         headName: '项目运行状态',
                         headKey: 'projectState',
                     }
                 ],
                 checkedThreadData: [{projectName: '1234'}],
                 entity: {},
                 range: [],
                 myorderBy: 'projectName asc,cycle desc'
             },
             mysearchData: [],
             myorderBy: '',
             myextData: '',
             searchRange: [],
             showCreateExsistReport: false
         };
     },
     components: {
         myTable
     },
     created () {
         if (sessionStorage.getItem('userName') == 'admin') {
             this.showCreateExsistReport = true;
         } else {
             this.showCreateExsistReport = false;
         }
         if(this.$store.state.reportListQueryData){
             console.log('searchForm--',this.searchForm)
             this.searchForm = this.$store.state.reportListQueryData.searchData?this.$store.state.reportListQueryData.searchData:{};
             this.myTableData.entity=this.searchForm;
             this.myTableData.range=this.$store.state.reportListQueryData.searchRange?this.$store.state.reportListQueryData.searchRange:[];
             setTimeout(()=>{
                 this.$refs.tableReport.findAllProject(1);
             },1)
         }
     },
     methods: {
         createRpeort () {
             var that = this;
             this.$myHttp({
                 method: 'POST',
                 url: this.prefix + 'project/createExistedProjcetReport' + window.suffix,
                 data: {
                     'entity': {}
                 }
             }).then(res => {
                 // 成功回调方法
                 console.log(res.data);
             });
         },
         createTheCycleReport () {
             this.$myHttp({
                 method: 'POST',
                 url: this.prefix + 'project/createTheCycleReport' + window.suffix,
                 data: {
                     'entity': {}
                 }
             }).then(res => {
                 // 成功回调方法
                 console.log(res.data);
             });
         },
         search () {
             let searchData = {};
             let searchRange = [];
             this.myTableData.range = [];
             if (this.searchForm.projectName) {
                 console.log('添加项目名');
                 searchData.projectName = this.searchForm.projectName;
             }
             if (this.searchForm.projectStateText) {
                 searchData.projectState = this.searchForm.projectStateText;
                 searchData.projectStateText = this.searchForm.projectStateText;
                 if (searchData.projectState == '全部') { searchData.projectState = ''; }
                 console.log('添加项目运行状态 projectState:' + searchData.projectStateText);
             }
             // this.mysearchData=searchData;
             if (this.searchForm.startMonth && this.searchForm.endMonth) {
                 console.log('根据日期查询月报');
                 searchRange = [{'field': 'cycle', 'from': this.searchForm.startMonth, 'to': this.searchForm.endMonth}];
                 this.myTableData.entity = searchData;
                 this.myTableData.range = searchRange;
                 this.$refs.tableReport.findAllProject(1);
             } else if (this.searchForm.startMonth) {
                 searchRange = [{'field': 'cycle', 'from': this.searchForm.startMonth, 'to': '2100-01'}];
                 this.myTableData.entity = searchData;
                 this.myTableData.range = searchRange;
                 this.$refs.tableReport.findAllProject(1);
             } else if (this.searchForm.endMonth) {
                 searchRange = [{'field': 'cycle', 'from': '1900-01', 'to': this.searchForm.endMonth}];
                 this.myTableData.entity = searchData;
                 this.myTableData.range = searchRange;
                 this.$refs.tableReport.findAllProject(1);
             } else {
                 this.myTableData.entity = searchData;
                 this.$refs.tableReport.findAllProject(1);
             }
             if(this.searchForm.startMonth && !this.searchForm.endMonth){
                 searchData.startMonth=this.searchForm.startMonth;
                 searchData.endMonth='';
             }else if(!this.searchForm.startMonth && this.searchForm.endMonth){
                 searchData.startMonth='';
                 searchData.endMonth=this.searchForm.endMonth;
             }else if(this.searchForm.startMonth && this.searchForm.endMonth){
                 searchData.startMonth=this.searchForm.startMonth;
                 searchData.endMonth=this.searchForm.endMonth;
             }else{
                 searchData.startMonth='';
                 searchData.endMonth='';
             }

             this.$store.state.reportListQueryData = {
                 searchData:searchData,
                 searchRange:searchRange
             };
         }

     }
 };
</script>
