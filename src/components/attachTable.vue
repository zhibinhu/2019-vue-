<style>
    .el-button.is-circle{
        padding: 6px;
    }
</style>
<template>
    <div style="background-color: white">


        <el-upload
                v-if="!attachTable.isViewButton"
                :beforeUpload="beforeAvatarUpload"
                class="upload-demo"
                :action="actionUrl"
                :headers="tokenCheck"
                :data="uploadData"
                :on-preview="handlePreview"
                :show-file-list="false"
                :on-success="success"
                :on-error="error"
                multiple>
            <el-button size="small" type="primary" style="margin-bottom: 10px">点击上传</el-button>
        </el-upload>



        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="附件名">
            </el-table-column>
            <el-table-column
                    prop="createBy"
                    label="上传人">
                <template slot-scope="scope">
                    {{scope.row.createBy}}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="140">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            circle
                            title="下载"
                            @click="downLoad(scope.row)"><i class="el-icon-download" style="font-size: 11px"></i>
                    </el-button>
                    <el-button
                            v-if="!attachTable.isViewButton"
                            size="mini"
                            type="danger"
                            circle
                            title='删除'
                            @click="deleteLoad(scope.row)"><i class="el-icon-delete" style="font-size: 11px"></i>
                    </el-button>
                </template>
            </el-table-column>

        </el-table>


    </div>

</template>

<script>
    import util from '../libs/util'
    export default {
        data () {
            return {
                tableData: [],
                total: null,
                mypage: 1,
                mysize: 10,
                actionUrl:this.uploaduri+"resource/upload"+  window.suffix ,                /*this.prefix+"resource/upload"+ + window.suffix*/
                uploadData:{
                     "bizType": this.attachTable.bizType,
                     "refId": this.attachTable.refId
                },
                uploadIds:[],
                username:'',
                tokenCheck:{Authorization:'Sys '+sessionStorage.getItem('token')}
            };
        },
        props:['attachTable'],
        methods: {
            formatCreateAndModifyByFil(value){
                if(value && value != "|") {
                    value = value.split('|')[1]
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'sysData/getUserByUsername' + window.suffix,
                        data: {
                            "entity":{
                                username:value
                            }
                        }
                    }).then(res => {
                        this.username = res.data.rows[0].cname;
                        return this.username
                    });
                }else{
                    return this.username
                }
            },
            beforeAvatarUpload(file) {
                this.uploadData.bizType = this.attachTable.bizType;
                this.uploadData.refId = this.attachTable.refId;
                console.log("bizType-----333", this.uploadData.bizType,
                    "refId-----333", this.uploadData.refId)
                const isLt2M = file.size / 1024 / 1024 < 10
                if(!isLt2M) {

                    this.$notify({
                        title: '无法上传',
                        message: '上传文件大小不能超过 10MB!',
                        type: 'warning'
                    });
                }
                return isLt2M
            },
            downLoad (row) {
                this.$myHttp({
                    method: 'get',
                    url: this.prefix + 'resource/get/'+row.id,
                    responseType:'arraybuffer'
                }).then(res=>{
                    // console.log('附件下载返回数据------',res)
                    //成功回调
                    var headers = res.headers;
                    var blob = new Blob([res.data], {
                        type: headers['content-type']
                    });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = row.name;
                    link.click();

                });
            },
            deleteLoad (row) {
                this.$confirm('此操作将永久删除资源信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'resource/del' + window.suffix,
                        /*  url:"http://192.168.1.185:6005/resource/del", */
                        data: {
                            'entity': {
                                "bizType": "oppo",
                                "refId": "string"
                            },
                            'ext': [row.id],
                            'pageNum': 0,
                            'where': [
                                {
                                    'assemble': 'and',
                                    'field': ' ',
                                    'opt': '=',
                                    'value': ' '
                                }
                            ],
                            'pageSize': 1000,
                            'orderBy': ' '
                        }
                    }).then(res => {
                        // 成功回调方法
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.findAllFile();
                    });
                });
            },
            handlePreview (file) {
                console.log(file);
            },

            findAllFile () {
                console.log("bizType-----", this.attachTable.bizType,
                    "refId-----", this.attachTable.refId)
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'resource/list' + window.suffix,
                    data: {
                        'entity': {
                            "bizType": this.attachTable.bizType,
                            "refId": this.attachTable.refId
                        },
                        'ext': [
                            {
                                'filed': ' ',
                                'from': ' ',
                                'to': ' '
                            }
                        ],
                        'pageNum': 0,
                        'where': [
                            {
                                'assemble': 'and',
                                'field': ' ',
                                'opt': '=',
                                'value': ' '
                            }
                        ],
                        'pageSize': 1000,
                        'orderBy': ' '
                    }
                }).then(res => {
                    // 成功回调方法
                    this.tableData = res.data.rows;
                    /*for(var items in res.data.rows){
                        var value = this.tableData[items].createBy.split('|')[1];
                        this.$myHttp({
                            method: 'POST',
                            url: this.prefix + 'sysData/getUserByUsername' + window.suffix,
                            data: {
                                "entity":{
                                    username:value
                                }
                            }
                        }).then(res => {
                            this.username = res.data.rows[0].cname;
                            this.tableData[items].createBy = this.username;
                        });
                        /!*Promise.all([this.formatCreateAndModifyByFil(this.tableData[items].createBy)]).then(res=>{
                            this.tableData[items].createBy = this.username;
                        })*!/
                    }*/
                    this.total = Number(res.data.total);
                });
            },
            success (response, file, fileList) {
                this.$notify({
                    title: '成功',
                    message: '上传成功！',
                    type: 'success'
                });
                if(this.attachTable.uploadIds){    /* 商机新增才走此方法*/
                    this.attachTable.uploadIds.push(response.rows[0].id);     /* 上传的图片的id，保存起来，商机新增使用*/
                }
                this.findAllFile();
            },
            error (err, file, fileList) {
                this.$notify({
                    title: '失败',
                    message: '上传失败！',
                    type: 'warning'
                });
            }
        },
        created () {
            this.findAllFile();
        }
    };
</script>