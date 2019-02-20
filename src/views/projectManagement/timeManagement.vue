
<style>

    /*.el-table__body-wrapper*/
    /*{overflow:auto}*/
    /*.el-table {*/
        /*overflow:auto*/
    /*}*/

</style>
<template>

    <div>
        <div class="container">
            <div style="margin-top: 20px">当前填报周期 {{this.$route.query.month}} 可填报工作日 {{this.$route.query.dayNum}}天</div>
            <div class="block" style="background: #fff;padding: 0 10px;">

                <el-select v-model="projectType" placeholder="请选择类型" clearable filterable @change="checkProjectType"
                           size="small">
                    <el-option
                            v-for="item in projectTypeData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>


                <el-select v-if="isShowSelectDepartment" v-model="DepartmentValue" filterable placeholder="请选择部门"
                           size="small" @change="checkDepartmentValue">
                    <el-option
                            v-for="item in DepartmentData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>


                <el-select v-model="projectValue" filterable placeholder="请选择项目" size="small" @change="getSelectLabel">
                    <el-option
                            v-for="item in projectOptions"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>


                <el-radio v-model="radio" label="Y" style="margin-left: 10px" v-if="isradio">核销</el-radio>
                <el-radio v-model="radio" label="N" style="margin-right: 10px;margin-left: 0" v-if="isradio">非核销</el-radio>

                <el-button @click="addProject()" type="primary" style="margin-top: 20px;margin-bottom: 10px"
                           size="small"><i class="el-icon-circle-plus-outline" style="margin-right: 5px"></i>增加
                </el-button>
                <el-button type="primary" style="margin-top: 20px;margin-bottom: 10px" @click="saveAllData()"
                           size="small"><i class="el-icon-document" style="margin-right: 5px"></i>保存
                </el-button>
                <el-button @click="submitAllData()" type="primary" style="margin-top: 20px;margin-bottom: 10px" size="small">
                    <i class="el-icon-document" style="margin-right: 5px"></i>提交
                </el-button>

                <el-button type="success" style="margin-top: 20px;margin-bottom: 10px;float: right"
                           size="small" @click="back"><Icon type="ios-redo" style="margin-right: 5px"/>返回
                </el-button>

            </div>
        </div>
        <el-table
                border
                stripe
                show-summary
                :summary-method="getSummaries"
                :data="tableData4"
                style="width:100%"
                :header-cell-style="{textAlign:'center'}"
                max-height="850"
                sum-text="累计工时"
                size="small"
                id="workTimeTable"
                ref="multipleTable">
            <el-table-column
                    fixed
                    prop="project"
                    label="项目"
                    width="200"

            >
            </el-table-column>
            <el-table-column
                    fixed
                    prop="task"
                    label="任务"
                    width="120"

            >
                <template slot-scope="scope">
                        <el-select v-model="scope.row.task"
                                   clearable
                                   placeholder="请选择" size="mini"
                                   :disabled="scope.row.auditStatus =='同意' || scope.row.auditStatus == '待审批' "

                        >
                            <!-- :disabled="scope.row.approveStatus == 'agree'?true:false"-->
                            <el-option v-for="item in scope.row.Tasks" :key="item.label"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                           <!-- <el-option v-for="item in Tasks" :key="item.label"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>-->
                        </el-select>
                </template>

            </el-table-column>
            <el-table-column
                    fixed
                    prop="billable"
                    label="是否核销"
                    width="90"
                    >
            </el-table-column>
            <el-table-column
                    fixed
                    prop="auditStatus"
                    label="审批状态"
                    width="90"
                    >
            </el-table-column>
            <el-table-column
                    v-for="(col,key) in cols"
                    :prop="col.prop"
                    :label="col.label"
                    :key="col.prop"
                    type="index"
                    width="110"
            >
                <template slot-scope="scope">
                        <el-input-number controls-position="right" @change="inputNumChange" :disabled="disabled(scope,col)" v-model="scope.row[cols[key].prop]" size="mini"  :step="0.5" style="width: 90px"  :min="0" :max="1">
                        </el-input-number>
                </template>
            </el-table-column>
            <!--:disabled="col.prop.substring(11,12)== 1?false:true"，这句话是通过判断key值后面拼的状态值，如果是1，就可以填，如果是0，就不可填报-->

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="70"
                    >
                <template slot-scope="scope">

                    <el-tooltip content="删除操作后请点击提交" placement="bottom" effect="light">
                        <el-button
                                size="mini"
                                icon="el-icon-delete"
                                type="danger"
                                :disabled="scope.row.auditStatus =='同意' || scope.row.auditStatus == '待审批' "
                                @click="deleteRow(scope.$index, tableData4,scope.row)">
                        </el-button>
                    </el-tooltip>

                </template>
            </el-table-column>

        </el-table>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                period:'',
                dayNum:'',
                allowPushData:true,
                allowSaveData:true,
                isShowSelectDepartment: false,
                projectType: '',
                DepartmentValue: '',
                projectValue: '',
                projectName: '',
                projectOptions: [],
                projectNum: '',
                DepartmentNum: '',
                projectTyeValue: '',
                currentPage: 1,
                pagesize: 1000,
                Manhours: '',
                cols: [],
                colsStatus:[],
                tableData4: [],
                Tasks:[],
                radio:"Y",
                spzt:'草稿',
                isradio:true,
                timeHours: [
                    {
                        label: '0.5',
                        value: '0.5'
                    },
                    {
                        label: '1',
                        value: '1'
                    }
                ],
                projectTypeData: [
                    {
                        label: '内部项目',
                        value: '8'
                    },
                    {
                        label: '研发项目',
                        value: '7'
                    },
                    {
                        label: '外部项目',
                        value: '5'
                    },
                    {
                        label: '内部管理',
                        value: '9'
                    },
                    {
                        label: '商机',
                        value: '3'
                    }
                ],
                value: '',
                BilliableLabel: 'Y',
                DepartmentData: [],
                alreadyWriteWorkhour:0,  //已填报过的数据行数
            }
        },
        methods: {
            inputNumChange(){
                    this.tableData4.push();
            },
            disabled(scope,col){

                if(scope.row.auditStatus =='同意' || scope.row.auditStatus =='待审批' ){

                    return true

                }else {

                    if(col.prop.substring(11,12) == 1){
                        return false
                    }
                    return true
                }
            },
            back(){
                this.$router.push({
                    name: 'workingHourManage/workTimeInfoMange'
                })
            },
            deleteRow(index, tableData, row) {
                if(row.auditStatus==0||row.auditStatus=='草稿'||row.auditStatus==3||row.auditStatus=='退回'){    /*只有草稿、退回状态的才可以删除*/
                    tableData.splice(index, 1);
                    if(tableData.length==0){
                        //把‘暂无数据’字样居左展示
                        setTimeout(()=>{
                            document.getElementsByClassName('el-table__empty-text')[0].style.left='10%';
                        },1)
                    }
                }else{
                    this.$notify({
                        title: '警告',
                        message: '已审批或待审批的记录不可删除！',
                        type: 'warning'
                    });
                }
            },
            /*增加按钮*/
            addProject() {
                if (this.projectType && this.projectName) {
                    let addFlag = true;
                    //如果项目类型为内部管理   则用项目名称（第三个下拉框） 取task的值
                    if (this.projectType === '9') {    /*内部管理*/
                        if (this.DepartmentValue) {

                            this.$myHttp({
                                method: 'post',
                                url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                                data: {
                                    "entity": {
                                        "dtype": this.projectName
                                    },
                                    "orderBy": "idx asc"
                                }
                            }).then(res => {

                                var Tasks = [];

                                for (var items in res.data.rows) {

                                    Tasks.push({
                                        label: res.data.rows[items].dvalue,
                                        value: res.data.rows[items].dkey
                                    })
                                }


                                if (this.projectName) {
                                    this.tableData4.push({
                                        project: this.projectName,
                                        projectNum: this.projectType + this.DepartmentValue + this.projectNum,
                                        Tasks: Tasks,
                                        billable: 'Y',
                                        auditStatus: '草稿',
                                        projectType: this.projectType
                                    });
                                }
                            })
                        } else {

                            this.$notify({
                                title: '警告',
                                message: '请选择部门！',
                                type: 'warning'
                            });
                        }
                    } else {
                        //除内部管理项目  task对应的值 用第一个下拉框获取到的项目类型  拿取对应的task
                        this.$myHttp({
                            method: 'post',
                            url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                            data: {
                                "entity": {},
                                "ext": '',
                                "pageNum": 0,
                                "where": [
                                    {
                                        "assemble": "and",
                                        "field": "dtype",
                                        "opt": "=",
                                        "value": this.projectTyeValue
                                    }
                                ],
                                "pageSize": 0,
                                "orderBy": " "
                            }
                        }).then(res => {
                            var Tasks = [];

                            for (var items in res.data.rows) {

                                Tasks.push({
                                    label: res.data.rows[items].dvalue,
                                    value: res.data.rows[items].dkey
                                })
                            }
                            //20181206新增需求 判断项目开始结束时间和状态
                            if (this.projectType === '8' || this.projectType === '7' || this.projectType === '5') {
                                this.$myHttp({
                                    method: 'POST',
                                    url: this.prefix + 'project/getProjectList',
                                    data: {
                                        "entity": {
                                            "projectNum": this.projectValue
                                        }
                                    }
                                }).then(res => {
                                    //项目开始时间
                                   /* if (new Date().getTime() < new Date(res.data.rows[0].projectStartTime).getTime()) {
                                        this.$notify({
                                            title: '警告',
                                            message: '项目还未开始！',
                                            type: 'warning'
                                        });
                                        addFlag = false;
                                    } else */
                                   /*if (new Date().getTime() >= new Date(res.data.rows[0].projectEndTime).getTime()) {//项目结束时间
                                        addFlag = false;
                                        this.$notify({
                                            title: '警告',
                                            message: '项目超期！',
                                            type: 'warning'
                                        });
                                    } else */
                                   if (res.data.rows[0].projectState == '02') {//项目状态 01 进行中 02已结束  03提前开工
                                        this.$notify({
                                            title: '警告',
                                            message: '项目已结束！',
                                            type: 'warning'
                                        });
                                        addFlag = false;
                                    }
                                    if(addFlag){
                                        if (this.projectName) {
                                            if (this.radio == "Y") {
                                                this.tableData4.push({
                                                    project: this.projectName,
                                                    Tasks: Tasks,
                                                    projectNum: this.projectNum,
                                                    billable: 'Y',
                                                    auditStatus: '草稿',
                                                    projectType: this.projectType

                                                });
                                            } else {
                                                this.tableData4.push({
                                                    project: this.projectName,
                                                    Tasks: Tasks,
                                                    projectNum: this.projectNum,
                                                    billable: 'N',
                                                    auditStatus: '草稿',
                                                    projectType: this.projectType
                                                });
                                            }
                                        }
                                    }
                                });
                            }else{
                                if (this.projectName) {
                                    if (this.radio == "Y") {
                                        this.tableData4.push({
                                            project: this.projectName,
                                            Tasks: Tasks,
                                            projectNum: this.projectNum,
                                            billable: 'Y',
                                            auditStatus: '草稿',
                                            projectType: this.projectType

                                        });
                                    } else {
                                        this.tableData4.push({
                                            project: this.projectName,
                                            Tasks: Tasks,
                                            projectNum: this.projectNum,
                                            billable: 'N',
                                            auditStatus: '草稿',
                                            projectType: this.projectType
                                        });
                                    }
                                }
                            }
                        })
                    }
                } else {
                    if (this.projectType) {
                        this.$notify({
                            title: '警告',
                            message: '请选择项目！',
                            type: 'warning'
                        });
                    } else {
                        this.$notify({
                            title: '警告',
                            message: '请选择项目类型！',
                            type: 'warning'
                        });
                    }
                }

            },
            /*保存按钮*/
            saveAllData(){
                var _this = this;
                this.allowSaveData = true;
                var mytableData=this.$refs.multipleTable.data;
                console.log('alreadyWriteWorkhour---',mytableData)
                // if(mytableData.length==0){
                //     this.$notify({
                //         title: '警告',
                //         message: '请选择任务或填报工时！',
                //         type: 'warning'
                //     });
                //     return ;
                // }
                //todo 首先恭喜你发现这个彩蛋！如果您很不幸的要修改此段代码  请不要怪我  我也是在之前的基础上打了一个丧心病狂的补丁来完成需求
                //遍历workhourDetails（每日填报的数据） 数组来判断用户是否填写了数据

                for(var row in mytableData){
                    mytableData[row].workhourDetails=[];
                    for(var key in mytableData[row]){
                        if((/[0-9]{8}/).test(key) && mytableData[row][key]){
                            mytableData[row].workhourDetails.push({ "amount":mytableData[row][key],"date": key.substring(0,8),"weekday":key.substring(9,10)});
                        }
                    }
                }

                for(var items in this.$refs.multipleTable.data){
                    if(!this.$refs.multipleTable.data[items].task){
                        this.allowSaveData = false;
                    }
                }
                // for(var items in mytableData){
                //     if(!mytableData[items].task){
                //         this.allowSaveData = false;
                //     }
                // }

                for(var items in this.$refs.multipleTable.data){

                    if(!this.$refs.multipleTable.data[items].workhourDetails){
                        this.allowSaveData = false;

                    }else {
                        if(this.$refs.multipleTable.data[items].workhourDetails.length == 0){
                            this.allowSaveData = false;
                        }
                    }



                }
                // for(var items in mytableData){
                //
                //     if(!mytableData[items].workhourDetails){
                //         this.allowSaveData = false;
                //
                //     }else {
                //         if(mytableData[items].workhourDetails.length == 0){
                //             this.allowSaveData = false;
                //         }
                //     }
                //
                //
                //
                // }

                if(this.allowSaveData){

                    for(var row in mytableData){

                        mytableData[row].period=this.$route.query.month;

                        /*去掉projectNum字段,添加projectCode字段*/

                        if(mytableData[row].projectNum){
                            mytableData[row].projectCode=mytableData[row].projectNum;
                            delete(mytableData[row].projectNum);
                        }

                        /*id是必传的，原来有就带过来，原来没有就传空的*/
                        if(mytableData[row].id){
                            mytableData[row].id=mytableData[row].id
                        }else{
                            mytableData[row].id=''
                        }

                       /* mytableData[row].id=''*/

                        if(mytableData[row].billable=="Y"){
                            mytableData[row].billable=1
                        }else{   /*为N和null时，都穿为0*/
                            mytableData[row].billable=0
                        }

                        if(mytableData[row].auditStatus=="草稿"){
                            mytableData[row].auditStatus=0
                        }else if(mytableData[row].auditStatus=="待审批"){
                            mytableData[row].auditStatus=1
                        }else if(mytableData[row].auditStatus=="同意"){
                            mytableData[row].auditStatus=2
                        }else if(mytableData[row].auditStatus=="退回"){
                            mytableData[row].auditStatus=3
                        }

                        if(mytableData[row].Tasks){
                            mytableData[row].ext=JSON.stringify(mytableData[row].Tasks)
                        }
                        delete(mytableData[row].Tasks);
                        mytableData[row].workhourDetails=[];
                        for(var key in mytableData[row]){
                            if((/[0-9]{8}/).test(key) && mytableData[row][key]){
                                mytableData[row].workhourDetails.push({ "amount":mytableData[row][key],"date": key.substring(0,8),"weekday":key.substring(9,10)});
                                delete(mytableData[row][key])
                            }
                        }
                    }

                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + 'workhour/saveAll' + window.suffix,       /*保存接口记号*/
                        data:{
                            "entity":mytableData,
                            "ext":this.$route.query.month
                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.subCode==0){
                            _this.$notify({
                                title: '成功',
                                message: '保存成功',
                                type: 'success'
                            });
                        }else{
                            _this.$notify({
                                title: '失败',
                                message: '保存失败！工时未填写',
                                type: 'warning'
                            });
                        }
                       this.initOldData()

                    }).catch(function () {
                    })
                }else {
                    this.$notify({
                        title: '警告',
                        message: '请选择任务或填报工时！',
                        type: 'warning'
                    });
                }
            },
            /*提交按钮*/
            submitAllData() {
                var _this = this;

                this.allowPushData = true;

                var mytableData=this.$refs.multipleTable.data;

                for(var row in mytableData){
                    mytableData[row].workhourDetails=[];
                    for(var key in mytableData[row]){
                        if((/[0-9]{8}/).test(key) && mytableData[row][key]){
                            mytableData[row].workhourDetails.push({ "amount":mytableData[row][key],"date": key.substring(0,8),"weekday":key.substring(9,10)});
                        }
                    }
                }

                for(var items in this.$refs.multipleTable.data){
                    if(!this.$refs.multipleTable.data[items].task){
                        this.allowPushData = false;
                    }
                }

                for(var items in this.$refs.multipleTable.data){

                    if(!this.$refs.multipleTable.data[items].workhourDetails){
                        this.allowPushData = false;

                    }else {
                        if(this.$refs.multipleTable.data[items].workhourDetails.length == 0){
                            this.allowPushData = false;
                        }
                    }

                }
                if(this.allowPushData){
                    /*构造参数数据结构*/
                    var mytableData=this.$refs.multipleTable.data;

                    for(var row in mytableData){

                        mytableData[row].period=this.$route.query.month;

                        /*去掉projectNum字段,添加projectCode字段*/

                        if(mytableData[row].projectNum){
                            mytableData[row].projectCode=mytableData[row].projectNum;
                            delete(mytableData[row].projectNum);
                        }

                        /*id是必传的，原来有就带过来，原来没有就传空的*/

                        if(mytableData[row].id){
                            mytableData[row].id=mytableData[row].id
                        }else{
                            mytableData[row].id=''
                        }

                        /* mytableData[row].id=''*/

                        if(mytableData[row].billable=="Y"){
                            mytableData[row].billable=1
                        }else{  /*为N和null时，都穿为0*/
                            mytableData[row].billable=0
                        }

                        if(mytableData[row].auditStatus=="草稿"){
                            mytableData[row].auditStatus=0
                        }else if(mytableData[row].auditStatus=="待审批"){
                            mytableData[row].auditStatus=1
                        }else if(mytableData[row].auditStatus=="同意"){
                            mytableData[row].auditStatus=2
                        }else if(mytableData[row].auditStatus=="退回"){
                            mytableData[row].auditStatus=3
                        }

                        if(mytableData[row].Tasks){
                            mytableData[row].ext=JSON.stringify(mytableData[row].Tasks)
                        }

                        delete(mytableData[row].Tasks);
                        mytableData[row].workhourDetails=[];
                        for(var key in mytableData[row]){
                            if((/[0-9]{8}/).test(key) && mytableData[row][key]){
                                mytableData[row].workhourDetails.push({ "amount":mytableData[row][key],"date": key.substring(0,8),"weekday":key.substring(9,10)});
                                delete(mytableData[row][key])
                            }
                        }
                    }

                    this.$myHttp({
                        method: 'post',
                        url: this.prefix + 'workhour/submitAll' + window.suffix,       /*保存接口记号*/
                        /*url:"http://192.168.99.38:9001/workhour/submitAll"+window.suffix,*/
                        data:{
                            "entity":mytableData,
                            "ext":this.$route.query.month
                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.subCode==0){
                            _this.$notify({
                                title: '成功',
                                message: '提交成功',
                                type: 'success'
                            });
                            _this.$router.push({
                                name: 'workingHourManage/workTimeInfoMange'
                            });
                        }else{
                            _this.$notify({
                                title: '失败',
                                message: '请选择任务或填报工时！',
                                type: 'warning'
                            });
                        }

                        this.initOldData()


                    }).catch(function () {
                    })
                }else {
                    this.$notify({
                        title: '警告',
                        message: '请选择任务或填报工时！',
                        type: 'warning'
                    });
                }

            },
            initManhours: function () {
                var resArry = [];
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + 'workhour/initByOneMonth'+window.suffix,
                    data:{
                        "entity":this.$route.query.month,
                        "ext": {},
                        "pageNum": 0,
                        "where": [
                            {
                                "assemble": "and",
                                "field": " ",
                                "opt": "=",
                                "value": " "
                            }
                        ],
                        "pageSize": 0,
                        "orderBy": " "
                    }
                }).then(res => {
                    console.log('工时填报------res----',res)
                    for (var item in res.data.rows[0].workhourDetails) {
                        resArry.push(
                            {   /*把状态值status拼在key值的后面，方便后面根据入离职日期来判断每天是否可以填报*/
                                prop: res.data.rows[0].workhourDetails[item].date+res.data.rows[0].workhourDetails[item].status,
                                label: res.data.rows[0].workhourDetails[item].date.substring(6),
                            }
                        );
                    }
                    //成功回调方法
                    this.cols = resArry;
                    this.initOldData();
                })
            },

            /*获取已有的填报记录*/
            initOldData: function () {
                this.$myHttp({
                    method: 'post',
                     url: this.prefix + 'workhour/getByOneMonth' + window.suffix,
                    data:{
                        "entity":this.$route.query.month,
                        "ext": {},
                        "pageNum": 0,
                        "where": [
                            {
                                "assemble": "and",
                                "field": "",
                                "opt": "=",
                                "value": ""
                            }
                        ],
                        "pageSize": 0,
                        "orderBy": ""
                    }
                }).then(res => {
                    //成功回调方法
                    this.tableData4 = res.data.rows;
                    this.alreadyWriteWorkhour=this.tableData4.length;
                    //过滤掉没有填报过任何工时的旧数据
                    for(var k in this.tableData4){
                        if(this.tableData4[k].workhourDetails.length==0){
                            this.tableData4.splice(k,1);
                            k--;
                        }
                    }
                    /*把 workhourDetails 对象里的数据抽取出来*/

//                    if(res.data.rows[0].auditStatus == 0){
//
//                        for(var i in this.cols){
//                            this.cols[i].prop = this.cols[i].prop.substring(0,11) + '0'
//                        }
//                    }

                    for(var i in this.tableData4){

                        /*是否核销字段*/
                        if(this.tableData4[i].billable==0){
                            this.tableData4[i].billable="N";
                        }else if(this.tableData4[i].billable==1){
                            this.tableData4[i].billable="Y";
                        }

                        /*待审批字段*/
                        if(this.tableData4[i].auditStatus==0){
                            this.tableData4[i].auditStatus="草稿";
                        }else if(this.tableData4[i].auditStatus==1){
                            this.tableData4[i].auditStatus="待审批";
                        }else if(this.tableData4[i].auditStatus==2){
                            this.tableData4[i].auditStatus="同意";
                        }else if(this.tableData4[i].auditStatus==3){
                            this.tableData4[i].auditStatus="退回";
                        }

                        /*任务字段*/
                        if(this.tableData4[i].ext){
                            this.tableData4[i].Tasks=JSON.parse(this.tableData4[i].ext);
                        }
                        /*把workhourDetails里面的数据抽取出来*/
                        var arr=this.tableData4[i].workhourDetails;
                        for(var j in arr){
                            /*把状态值拼在key值的后面，方便后面根据入离职日期来判断每天是否可以填报*/
                            if(arr[j].status==0){
                                this.tableData4[i][arr[j].date+"0"]=arr[j].amount;
                            }else{
                                this.tableData4[i][arr[j].date+"1"]=arr[j].amount;
                            }
                        }
                    }
                    if(this.tableData4.length==0) {
                        //把‘暂无数据’字样居左展示
                        document.getElementsByClassName('el-table__empty-text')[0].style.left = '10%';
                    }
                })
            },
            test: function (task) {
                if (!task) {
                    this.$Notice.warning({
                        title: '请选择任务',
                        message: '请选择任务',
                        type: 'success'
                    });
                }
            },
            handleSizeChange: function (size) {
                this.pagesize = size
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage

            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row)
                    })
                } else {
                    this.$refs.multipleTable.clearSelection()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            /*选完项目类型后，获取其他下拉框的内容*/
            checkProjectType: function (Vid) {

                var _this = this;

                if (this.projectValue) {
                    this.projectValue = ''
                }
                if (this.DepartmentValue) {
                    this.DepartmentValue = ''
                }
                if (this.projectName) {
                    this.projectName = ''
                }


                let obj = {};

                for(var items  in this.projectTypeData){
                    if(this.projectTypeData[items].value == Vid){
                        obj = this.projectTypeData[items]
                    }
                }

                this.projectTyeValue = obj.label;


                if (this.projectType === '9') {
                    //项目类型为内部管理时，要让用户选择所属部门,核销与非核销的的单选按钮不显示
                    this.isradio=false;
                    this.isShowSelectDepartment = true;
                    /*内部管理，部门默认为本人所在部门！*/
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'workhour/getOrgByLoginUser' + window.suffix,  /*新增，所属部门为当前用户所属部门 */
                        data:{
                            "entity": {

                            },
                            "ext": "string",
                            "pageNum": 0,
                            "pageSize": 0,
                            "orderBy": "string"
                        }
                    }).then(res => {
                        // 成功回调方法
                        this.DepartmentValue = res.data.rows[0].orgCode;
                    });

                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
                        data: {
                            "entity": {
                                dtype: '内部管理类型'
                            },
                            "orderBy": "idx asc"
                        }
                    }).then(res => {

                        var resArry = [];
                        for (var items in res.data.rows) {
                            resArry.push({
                                label: res.data.rows[items].dvalue,
                                value: res.data.rows[items].dkey
                            })
                        }
                        this.projectOptions = resArry;
                    });


                    //获取部门下拉数据
                    this.$myHttp({
                        method: 'POSt',
                        url: this.prefix + 'workhour/getAllOrgs' + window.suffix,
                        data:{
                            "entity": {

                            },
                            "ext": "string",
                            "pageNum": 0,
                            "pageSize": 0,
                            "orderBy": "string"
                        }
                    }).then(res => {
                        var resArry = [];
                        for (var items in res.data.rows) {
                            resArry.push({
                                label: res.data.rows[items].orgName,
                                value: res.data.rows[items].orgCode
                            });
                        }
                        this.DepartmentData = resArry;
                    })

                } else {

                    //除内部管理 情况外  隐藏所属部门选择框   核销与非核销单选框显示
                    this.isradio=true;
                    this.isShowSelectDepartment = false;


                    //内外部项目查 根据项目类型获取项目数据
                    if (this.projectType === '8' || this.projectType === '5') {

                        this.$myHttp({
                            method: 'post',
                            url: this.prefix + 'project/getProjectList' + window.suffix,
                            data: {
                                "entity": {
                                    projectType: _this.projectType
                                },
                                "orderBy":"projectName asc"
                            }
                        }).then(res => {
                            var resArry = []
                            for (var items in res.data.rows) {
                                resArry.push({
                                    label: res.data.rows[items].projectName,
                                    value: res.data.rows[items].projectNum
                                });
                            }
                            this.projectOptions = resArry;
                        })
                    } else if (this.projectType === '3') {
                        //商机   查商机项目列表
                        this.$myHttp({
                            method: 'post',
                            url: this.prefix + 'project/getOppoList' + window.suffix,
                            data: {
                                "entity": {
                                    projectType: _this.projectType,
                                    isAllowWorkingHours:true
                                },
                                "orderBy":"oppoProjectName asc"
                            }
                        }).then(res => {

                            var resArry = [];
                            for (var items in res.data.rows) {
                                resArry.push({
                                    label: res.data.rows[items].oppoProjectName,
                                    value: res.data.rows[items].oppoNum
                                });
                            }
                            this.projectOptions = resArry;
                        })
                    } else if (this.projectType === '7') {
                        //研发项目   研发项目项目列表
                        this.$myHttp({
                            method: 'post',
                            url: this.prefix + 'project/getProjectList' + window.suffix,
                            data: {
                                "entity": {
                                    projectType: _this.projectType,
                                    isAllowWorkingHours:true
                                }
                            }
                        }).then(res => {

                            var resArry = [];
                            for (var items in res.data.rows) {
                                resArry.push({
                                    label: res.data.rows[items].projectName,
                                    value: res.data.rows[items].projectNum
                                });
                            }
                            this.projectOptions = resArry;
                        })
                    }


                }
            },

            getSelectLabel: function (Vid) {
                let obj = {};
                for(var items in this.projectOptions){
                    if(this.projectOptions[items].value == Vid){
                        obj  = this.projectOptions[items]
                    }
                }

                this.projectName = obj.label;
                this.projectNum = obj.value;

            },
            checkDepartmentValue: function (Vid) {
                //部门查

                let obj = {};
                for(var items in this.DepartmentData){
                    if(this.DepartmentData[items].value == Vid){
                        obj = this.DepartmentData[items];
                    }
                }

                this.DepartmentNum = obj.value;
            },
            subfmt: function (row, column, cellValue, index) {

            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index === 1) {
                        sums[index] = '';
                        return;
                    }
                    if (index === 2||index === 3) {
                        sums[index] = '';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += ' 天';
                    } else {
                        sums[index] = '';
                    }
                });

                return sums;
            },
            setFixedBottom(value){//设置固定列距离表格底部的高度
                let fixedArea = document.getElementsByClassName('el-table__fixed');
                let fixedAreaRight = document.getElementsByClassName('el-table__fixed-right');
                let fixedFooterWrap=document.getElementsByClassName('el-table__fixed-footer-wrapper');
                let footerGutter=document.getElementsByClassName('el-table__footer-wrapper');
                fixedArea=Array.prototype.slice.call(fixedArea);
                fixedAreaRight=Array.prototype.slice.call(fixedAreaRight);
                fixedFooterWrap=Array.prototype.slice.call(fixedFooterWrap);
                footerGutter=Array.prototype.slice.call(footerGutter);


                fixedArea.map((item)=>{item.style.bottom=value+'px'});
                fixedAreaRight.map((item)=>item.style.bottom=value+'px');
                fixedFooterWrap.map((item)=>item.style.bottom='-'+value+'px');
                footerGutter.forEach((item,index)=>{
                    let tbody=item.getElementsByClassName('has-gutter')[0];
                    let firstHideCol=tbody.getElementsByClassName('is-hidden')[0];
                    let firstHideColCell=firstHideCol.getElementsByClassName('cell')[0];
                    firstHideColCell.style.visibility='visible';
                })

            },
            adjustLine(id){//调整表格竖线对齐
                let workTimeTable=document.getElementById(id);
                let gutter=workTimeTable.getElementsByClassName('gutter');
                let gutterArr=Array.prototype.slice.call(gutter);
                setTimeout(()=>{
                    gutterArr.forEach((item)=>{
                        item.style.display='table-cell';
                    })
                },100);
            }

        },
        watch:{
            tableData4(newVal,oldVal){
                if(newVal.length==0 || oldVal.length==0){
                    this.setFixedBottom('17');
                }else{
                    this.setFixedBottom('57')
                }
                this.adjustLine('workTimeTable');//调整表格竖线对齐
            }
        },
        mounted: function () {

            this.initManhours();
            //自适应调整表格竖线
            var _this=this;
            window.onresize=function () {
                _this.adjustLine('workTimeTable');
            }

        }
    }
</script>

