<template>
    <div>
        <el-button @click="toHistory()" size="small" type="primary"
                   style="margin-top: 20px;margin-bottom: 10px">流程跟踪
        </el-button>


        <el-dialog title="流程跟踪" :visible.sync="dialogVisible" :append-to-body="true" :modal-append-to-body="false" width="1000px">
            <task-list :taskListDate="taskListDate" :processInstanceId="processInstanceId"></task-list>
        </el-dialog>

        <my-table ref="tableProductLine" :myTableData="myTableData" @getSelectedData="getSelectedData"></my-table>

    </div>

</template>

<script>
    import myTable from '../../components/myTableSys'
    import Cookies from 'js-cookie';
    import taskList from './trackList.vue'
    export default {
        data () {
            return {
                taskListDate:{
                    imgSrc:'',
                    trackListUrl:''
                },

                myTableData:{
                    url:'/microarch/activiti/instance/allProcIns',
                    dlUrl: '',
                    viewName: 'viewOrder',
                    editName: 'viewOrder',
                    isHiddendelete: true,
                    isHiddenView: true,
                    isHiddenEdit: true,
                    tableThead: [
                        {
                            headName:'选择',
                            headKey:'',
                            selectionRadioButton:true,
                            isHidden:true,
                            fixedColumn:true
                        },
                        {
                            headName: '序号',
                            headKey: 'pageIndex',
                            width: 30
                        },
                        {
                            headName: '流程定义',
                            headKey: 'processDefinitionId',

                        },
                        {
                            headName: '流程实例ID',
                            headKey: 'processInstanceId',

                        },
                        /**
                        {
                            headName: 'KEY',
                            headKey: 'key',
                        },**/
                        {
                            headName: '模块名称',
                            headKey: 'moduleName'
                        },

                        {
                            headName: '业务信息',
                            headKey: 'businessInfo',

                        },
                        {
                            headName: '发起者',
                            headKey: 'applyPerson',
                            width: 27
                        },
                        {
                            headName: '当前流程节点',
                            headKey: 'curTaskName',
                        },
                        {
                            headName: '当前创建时间',
                            headKey: 'curTaskCreateTime',
                        },

                        {
                            headName: '当前处理人',
                            headKey: 'curTaskAssignee',
                            precessStatus:true,
                        },

                    ],
                    entity: {},
                    where:[],
                    conditions: [],
                    pageRequest: {},
                    myorderBy: 'id DESC',
                },
                form:{
                    orgCode:'',
                    orgName:'',
                },

                entity: {'page':'1','rows':'10','sort':'','order':''},
                page:1,
                rows:10,
                sort:"",
                order:"",

                total:"",
                pageNum:1,
                pageSize:10,

                condition:[],//查询条件
                selectionData:'',
                dialogVisible:false,
                hisPath:'',
                processInstanceId:'',
                isFirstNode:false
            }
        },
        components: {
            myTable,
            taskList
        },
        //applye2
        methods: {
            getSelectedData (val){
                var that=this;
                this.selectionData=val;
                if(val) {
                    this.processInstanceId=this.selectionData.processInstanceId;
                    console.log("msg ===", this.processInstanceId);
                    this.$myHttp({
                        method:'get',
                        url:this.permissionPrefixWork+'/microarch/activiti/trace/photo?processInstanceId='+ this.selectionData.processInstanceId,
                        responseType: 'arraybuffer'
                    }).then(res=>{
                        // console.log('imgsrc---',res)
                        return 'data:image/png;base64,' + btoa(
                            new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )
                    }).then(data => {
                        that.taskListDate.imgSrc = data
                    });
                    this.taskListDate.trackListUrl='/microarch/activiti/task/trace/list/'+ this.selectionData.processInstanceId;
                }
            },

            search(){
                var _this = this;
                var myentity=[];
                if (this.form.priority) {
                    myentity.push({"field":'priority',"opt": "like","value":_this.form.priority,"assemble": "and"});
                }

                this.myTableData.where=myentity;
                console.log("查询条件是",this.myTableData.where);
                this.$refs.tableProductLine.findAllProject(1);
                /* this.conditions=myconditions;
                this.mypage=0;
                this.mysize=10;
                */
                /* this.findAllProject(this.conditions,this.mypage,this.mysize,this.direction,this.field);*/
            },

            fileList(){

            },

            toHistory: function () {
                if(this.selectionData.length == 0) {
                    this.$message({
                        message: '未选择要查看的数据',
                        type: 'warning'
                    });
                    return null;
                }
                this.processInstanceId=this.selectionData.pid
                this.dialogVisible = true;
            }

        },
        mounted: function () {},
        filters:  {

        },
    }
</script>

