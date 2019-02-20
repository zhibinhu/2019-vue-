<style scoped>
    [class*=" el-icon-"], [class^=el-icon-]{
        font-size: 18px;
        color: #2D8CF0;
    }
</style>
<template>
    <el-col :span="24" style="background-color: white">
        <div style="margin-left: 50px;font-size: 15px;margin-top:20px;color: #606266">


            <el-form label-position="left" inline class="table-expand">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="月份 :">
                            <span>{{ period }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="部门名称 :">
                            <span>{{ orgName }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="姓名 :">
                            <span>{{ cname }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <el-form-item label="报工率% :">
                            <span>{{ manhourRate }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="标准人天 :">
                            <span>{{ standardUnits | keepOneDot }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="人天成本（元/天） :">
                            <span>{{ unitCost | returnFloat }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="计费人天 :">
                            <span>{{ yesFeeDays | keepOneDot }}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="计费成本（元） :">
                            <span>{{ yesFeeCost | returnFloat }}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="不计费人天 :">
                            <span>{{ noFeeDays | keepOneDot }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="不计费成本（元） :">
                            <span>{{ noFeeCost | returnFloat }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-collapse v-model="activeNames" accordion @change="handleChange" style="margin-right: 60px;margin-bottom: 50px;">
                            <el-collapse-item name="3">
                                <template slot="title">
                                    <i class="el-icon-caret-left"></i> 商机核销人天 <span>【{{sjhxDays}}】</span>
                                </template>
                                <el-col>
                                    <el-table style="width: 100%" :data="sjData" :header-cell-style="{textAlign:'left'}">
                                        <el-table-column prop="projectCode" width="100"
                                                label="商机编号">
                                        </el-table-column>
                                        <el-table-column prop="projectName"
                                                label="机会名称">
                                        </el-table-column>
                                        <el-table-column prop="manager" width="100"
                                                         label="售前经理">
                                        </el-table-column>
                                        <el-table-column prop="taskName" width="140"
                                                         label="任务">
                                        </el-table-column>
                                        <el-table-column prop="hxDays" width="100" align="right"
                                                         label="核销人天">
                                            <template slot-scope="scope">
                                                {{scope.row.hxDays | keepOneDot}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-collapse-item>
                            <el-collapse-item name="8">
                                <template slot="title">
                                    <i class="el-icon-caret-left"></i> 内部项目核销人天 <span>【{{nxhxDays}}】</span>
                                </template>
                                <el-table style="width: 100%" :data="nbData" :header-cell-style="{textAlign:'left'}">
                                    <el-table-column prop="projectCode"  width="100"
                                                     label="项目编号">
                                    </el-table-column>
                                    <el-table-column prop="projectName"
                                                     label="项目名称">
                                    </el-table-column>
                                    <el-table-column prop="feeType"  width="100"
                                                     label="计费类型">

                                         <template slot-scope="scope">
                                           <p>{{scope.row.feeType|feeTypeFil}}</p>
                                       </template>

                                    </el-table-column>
                                    <el-table-column prop="manager"  width="100"
                                                     label="项目经理">
                                    </el-table-column>
                                    <el-table-column prop="taskName"  width="120"
                                                     label="任务">
                                    </el-table-column>
                                    <el-table-column prop="hxDays"  width="100" align="right"
                                                     label="核销人天">
                                        <template slot-scope="scope">
                                            {{scope.row.hxDays | keepOneDot}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item name="7">
                                <template slot="title">
                                    <i class="el-icon-caret-left"></i> 研发项目核销人天  <span>【{{yxhxDays}}】</span>
                                </template>
                                <el-table style="width: 100%" :data="yfData" :header-cell-style="{textAlign:'left'}">
                                    <el-table-column prop="projectCode"  width="100"
                                                     label="项目编号">
                                    </el-table-column>
                                    <el-table-column prop="projectName"
                                                     label="项目名称">
                                    </el-table-column>
                                    <el-table-column prop="feeType"  width="100"
                                                     label="计费类型">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.feeType|feeTypeFil}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="manager"  width="100"
                                                     label="项目经理">
                                    </el-table-column>
                                    <el-table-column prop="taskName"  width="120"
                                                     label="任务">
                                    </el-table-column>
                                    <el-table-column prop="hxDays"  width="100" align="right"
                                                     label="核销人天">
                                        <template slot-scope="scope">
                                            {{scope.row.hxDays | keepOneDot}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item  name="5">
                                <template slot="title">
                                    <i class="el-icon-caret-left"></i> 外部项目核销人天  <span>【{{wxhxDays}}】</span>
                                </template>
                                <el-table style="width: 100%" :data="wbData" :header-cell-style="{textAlign:'left'}">
                                    <el-table-column prop="projectCode" width="100"
                                                     label="项目编号">
                                    </el-table-column>
                                    <el-table-column prop="projectName"
                                                     label="项目名称">
                                    </el-table-column>
                                    <el-table-column prop="feeType" width="100"
                                                     label="计费类型">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.feeType|feeTypeFil}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="manager" width="100"
                                                     label="项目经理">
                                    </el-table-column>
                                    <el-table-column prop="taskName" width="120"
                                                     label="任务">
                                    </el-table-column>
                                    <el-table-column prop="hxDays" width="100" align="right"
                                                     label="核销人天">
                                        <template slot-scope="scope">
                                                {{scope.row.hxDays | keepOneDot}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item  name="9">
                                <template slot="title">
                                    <i class="el-icon-caret-left"></i> 内部管理核销人天   <span>【{{nghxDays}}】</span>
                                </template>
                                <el-table style="width: 100%" :data="ngData" :header-cell-style="{textAlign:'left'}">
                                    <el-table-column prop="orgName"
                                                     label="部门名称">
                                    </el-table-column>
                                    <el-table-column prop="projectName"  width="180"
                                                     label="项目名称">
                                    </el-table-column>
                                    <el-table-column prop="taskName" width="120"
                                                     label="任务">
                                    </el-table-column>
                                    <el-table-column prop="hxDays" width="100" align="right"
                                                     label="核销人天">
                                        <template slot-scope="scope">
                                            {{scope.row.hxDays | keepOneDot}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item  name="10">
                                <template slot="title">
                                    <i class="el-icon-caret-left"></i> 商机未核销人天   <span>【{{nosjhxDays}}】</span>
                                </template>
                                <el-table style="width: 100%" :data="sj_nData" :header-cell-style="{textAlign:'left'}">
                                    <el-table-column prop="projectCode" width="180"
                                                     label="项目编号">
                                    </el-table-column>
                                    <el-table-column prop="projectName"
                                                     label="项目名称">
                                    </el-table-column>
                                    <!--<el-table-column prop="feeType" width="120"-->
                                                     <!--label="计费类型">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<p>{{scope.row.feeType|feeTypeFil}}</p>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                    <el-table-column prop="manager" width="100"
                                                     label="项目经理">
                                    </el-table-column>
                                    <el-table-column prop="taskName" width="100"
                                                     label="任务">
                                    </el-table-column>
                                    <el-table-column prop="hxDays" width="100" align="right"
                                                     label="核销人天">
                                        <template slot-scope="scope">
                                            {{scope.row.hxDays | keepOneDot}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item  name="11">
                                <template slot="title">
                                    <i class="el-icon-caret-left"></i> 内部项目未核销人天   <span>【{{nonxhxDays}}】</span>
                                </template>
                                <el-table style="width: 100%" :data="innerItem_nData" :header-cell-style="{textAlign:'left'}">
                                    <el-table-column prop="projectCode" width="180"
                                                     label="项目编号">
                                    </el-table-column>
                                    <el-table-column prop="projectName"
                                                     label="项目名称">
                                    </el-table-column>
                                    <el-table-column prop="feeType" width="120"
                                                     label="计费类型">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.feeType|feeTypeFil}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="manager" width="100"
                                                     label="项目经理">
                                    </el-table-column>
                                    <el-table-column prop="taskName" width="100"
                                                     label="任务">
                                    </el-table-column>
                                    <el-table-column prop="hxDays" width="100" align="right"
                                                     label="核销人天">
                                        <template slot-scope="scope">
                                            {{scope.row.hxDays | keepOneDot}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item  name="12">
                                <template slot="title">
                                    <i class="el-icon-caret-left"></i> 研发项目未核销人天   <span>【{{noyxhxDays}}】</span>
                                </template>
                                <el-table style="width: 100%" :data="devItem_nData" :header-cell-style="{textAlign:'left'}">
                                    <el-table-column prop="projectCode" width="180"
                                                     label="项目编号">
                                    </el-table-column>
                                    <el-table-column prop="projectName"
                                                     label="项目名称">
                                    </el-table-column>
                                    <el-table-column prop="feeType" width="120"
                                                     label="计费类型">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.feeType|feeTypeFil}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="manager" width="100"
                                                     label="项目经理">
                                    </el-table-column>
                                    <el-table-column prop="taskName" width="100"
                                                     label="任务">
                                    </el-table-column>
                                    <el-table-column prop="hxDays" width="100" align="right"
                                                     label="核销人天">
                                        <template slot-scope="scope">
                                            {{scope.row.hxDays | keepOneDot}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item  name="13">
                                <template slot="title">
                                    <i class="el-icon-caret-left"></i> 外部项目未核销人天   <span>【{{nowxhxDays}}】</span>
                                </template>
                                <el-table style="width: 100%" :data="outerItem_nData" :header-cell-style="{textAlign:'left'}">
                                    <el-table-column prop="projectCode" width="180"
                                                     label="项目编号">
                                    </el-table-column>
                                    <el-table-column prop="projectName"
                                                     label="项目名称">
                                    </el-table-column>
                                    <el-table-column prop="feeType" width="120"
                                                     label="计费类型">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.feeType|feeTypeFil}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="manager" width="100"
                                                     label="项目经理">
                                    </el-table-column>
                                    <el-table-column prop="taskName" width="100"
                                                     label="任务">
                                    </el-table-column>
                                    <el-table-column prop="hxDays" width="100" align="right"
                                                     label="核销人天">
                                        <template slot-scope="scope">
                                            {{scope.row.hxDays | keepOneDot}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                        </el-collapse>
                    </el-col>



                </el-row>
            </el-form>

        </div>
        <div style="margin-left: 20px">

            <el-col :span="24" :offset="10">
                <el-button @click="close()"  style="margin-top: 20px;margin-bottom: 10px">返回</el-button>
            </el-col>
        </div>
    </el-col>
</template>

<script>
    import util from '../../libs/util';
    export default {
        components: {},
        data() {
            return {
                period: '',
                orgName:'',
                cname:'',
                manhourRate:'',
                standardUnits:'',
                unitCost:'',
                yesFeeDays:'',
                yesFeeCost:'',
                noFeeDays:'',
                noFeeCost:'',
                sjhxDays:'',
                nxhxDays:'',
                yxhxDays:'',
                wxhxDays:'',
                nghxDays:'',
                nosjhxDays:'0',
                nonxhxDays:'0',
                noyxhxDays:'0',
                nowxhxDays:'0',
                activeNames:'',
                sjData:[],nbData:[],yfData:[],wbData:[],ngData:[],sj_nData:[],innerItem_nData:[],devItem_nData:[],outerItem_nData:[],
                feeTypeData:[]
            }
        },
        methods:{
            close: function () {
                this.$router.push({
                    "name": "statisticalAnalysis/employeesWorkRate"
                })
            },
            handleChange(){},
            handleChangeData(){
                /*内部项目*/
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix+"stats/getViewStatsWorkhourRateDetail"+window.suffix,
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username,
                            "projectType":"8",
                            "feeType":1
                        },
                        "ext": [],
                        "pageNum": 0,
                        "pageSize": 100,
                        "orderBy": "string"
                    }
                }).then(res => {
                    this.nbData = res.data.rows;
                    var _this = this;
                    console.log('类型',_this.feeTypeData);
                    this.nbData.forEach((item, index) => {
                        _this.feeTypeData.forEach((subitem,index) => {
                            if(item.feeType){
                                if(item.feeType == subitem.value){
                                    item.feeType = subitem.label;
                                }
                            }
                        });
                    });
                });
                /*商机*/
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix+"stats/getViewStatsWorkhourRateDetail"+window.suffix,
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username,
                            "projectType":"3",
                            "feeType":1
                        },
                        "ext": [],
                        "pageNum": 0,
                        "pageSize": 100,
                        "orderBy": "string"
                    }
                }).then(res => {
                    this.sjData = res.data.rows;
                });
                /*研发*/
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix+"stats/getViewStatsWorkhourRateDetail"+window.suffix,
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username,
                            "projectType":"7",
                            "feeType":1
                        },
                        "ext": [],
                        "pageNum": 0,
                        "pageSize": 100,
                        "orderBy": "string"
                    }
                }).then(res => {
                    this.yfData = res.data.rows;
                    var _this = this;
                    this.yfData.forEach((item, index) => {
                        _this.feeTypeData.forEach((subitem,index) => {
                            if(item.feeType){
                                if(item.feeType == subitem.value){
                                    item.feeType = subitem.label;
                                }
                            }
                        });
                    });
                });
                /*外部*/
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix+"stats/getViewStatsWorkhourRateDetail"+window.suffix,
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username,
                            "projectType":"5",
                            "feeType":1
                        },
                        "ext": [],
                        "pageNum": 0,
                        "pageSize": 100,
                        "orderBy": "string"
                    }
                }).then(res => {
                    this.wbData = res.data.rows;
                    var _this = this;
                    this.wbData.forEach((item, index) => {
                        _this.feeTypeData.forEach((subitem,index) => {
                            if(item.feeType){
                                if(item.feeType == subitem.value){
                                    item.feeType = subitem.label;
                                }
                            }
                        });
                    });

                });
                /*内部管理*/
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix+"stats/getViewStatsWorkhourRateDetail"+window.suffix,
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username,
                            "projectType":"9"
                        },
                        "ext": [],
                        "pageNum": 0,
                        "pageSize": 100,
                        "orderBy": "string"
                    }
                }).then(res => {
                    this.ngData = res.data.rows;
                });
                //商机未核销：projectType:3,feeType:0
                //外部项目未核销：projectType:5,feeType:0
                //研发项目未核销：projectType:7,feeType:0
                //内部项目未核销：projectType:8,feeType:0

                /*商机未核销*/
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix+"stats/getViewStatsWorkhourRateDetail"+window.suffix,
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username,
                            "projectType":"3",
                            "feeType":0
                        },
                        "ext": [],
                        "pageNum": 0,
                        "pageSize": 100,
                        "orderBy": "string"
                    }
                }).then(res => {
                    this.sj_nData = res.data.rows;
                });
                /*外部项目未核销*/
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix+"stats/getViewStatsWorkhourRateDetail"+window.suffix,
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username,
                            "projectType":"5",
                            "feeType":0
                        },
                        "ext": [],
                        "pageNum": 0,
                        "pageSize": 100,
                        "orderBy": "string"
                    }
                }).then(res => {
                    this.outerItem_nData = res.data.rows;
                    var _this = this;
                    this.outerItem_nData.forEach((item, index) => {
                        _this.feeTypeData.forEach((subitem,index) => {
                            if(item.feeType){
                                if(item.feeType == subitem.value){
                                    item.feeType = subitem.label;
                                }
                            }
                        });
                    });

                });
                /*研发项目未核销*/
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix+"stats/getViewStatsWorkhourRateDetail"+window.suffix,
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username,
                            "projectType":"7",
                            "feeType":0
                        },
                        "ext": [],
                        "pageNum": 0,
                        "pageSize": 100,
                        "orderBy": "string"
                    }
                }).then(res => {
                    this.devItem_nData = res.data.rows;
                    var _this = this;
                    this.devItem_nData.forEach((item, index) => {
                        _this.feeTypeData.forEach((subitem,index) => {
                            if(item.feeType){
                                if(item.feeType == subitem.value){
                                    item.feeType = subitem.label;
                                }
                            }
                        });
                    });
                });
                /*内部项目未核销*/
                this.$myHttp({
                    method: 'POST',
                    url:this.prefix+"stats/getViewStatsWorkhourRateDetail"+window.suffix,
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username,
                            "projectType":"8",
                            "feeType":0
                        },
                        "ext": [],
                        "pageNum": 0,
                        "pageSize": 100,
                        "orderBy": "string"
                    }
                }).then(res => {
                    this.innerItem_nData = res.data.rows;
                    var _this = this;
                    console.log('类型',_this.feeTypeData);
                    this.innerItem_nData.forEach((item, index) => {
                        _this.feeTypeData.forEach((subitem,index) => {
                            if(item.feeType){
                                if(item.feeType == subitem.value){
                                    item.feeType = subitem.label;
                                }
                            }
                        });
                    });
                });

            },
            makeDataDictionary:function () {
                var _this = this;
                function testss() {
                    return _this.$myHttp({
                        method: 'POST',
                        url: _this.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
                        data: {
                            "entity": {
                                "dtype": "计费类型"
                            },
                            "orderBy": "idx asc"
                        }
                    }).then(res => {
                        //成功回调方法
                        var resArry = [];
                        for(var items in res.data.rows){
                            resArry.push({
                                label:res.data.rows[items].dvalue,
                                value:res.data.rows[items].dkey
                            })
                        }
                        _this.feeTypeData = resArry;
                        console.log('计算',_this.feeTypeData)
                    });
                }
                this.$myHttp.all([testss()])
                    .then(_this.$myHttp.spread(function (acct, perms) {
                        // 两个请求现在都执行完成
                        _this.handleChangeData();
                    }));

            }

        },
        created(){

                var _this=this;
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + 'stats/getViewStatsWorkhourRate'+ window.suffix,   /*getViewStatsWorkhourRateDetail*/
                    data:{
                        "entity": {
                            "period":this.$route.query.period,
                            "username":this.$route.query.username
                        },
                        // 20181211 修改员工报工率只显示已审批数据 cff
                        // "ext": "string",
                        "ext": "2",
                        "pageNum": 0,
                        "pageSize": 15,
                        "orderBy": "string"
                    }
                }).then(res => {
                    //成功回调方法
                    this.period=  res.data.rows[0].period;
                    this.orgName=  res.data.rows[0].orgName;
                    this.cname=  res.data.rows[0].cname;
                    this.manhourRate=  ((res.data.rows[0].manhourRate)).toFixed(2)+"%";
                    this.standardUnits=  res.data.rows[0].standardUnits;
                    this.unitCost=  res.data.rows[0].unitCost/1000;
                    this.yesFeeDays=  res.data.rows[0].yesFeeDays;
                    this.yesFeeCost=  res.data.rows[0].yesFeeCost/1000;
                    this.noFeeDays=  res.data.rows[0].noFeeDays;
                    this.noFeeCost=  res.data.rows[0].noFeeCost/1000;
                    this.sjhxDays=  res.data.rows[0].sjhxDays;
                    this.nxhxDays=  res.data.rows[0].nxhxDays;
                    this.yxhxDays=  res.data.rows[0].yxhxDays;
                    this.wxhxDays=  res.data.rows[0].wxhxDays;
                    this.nghxDays=  res.data.rows[0].nghxDays;
                    this.nosjhxDays=  res.data.rows[0].nosjhxDays;//商机未核销人天
                    this.nonxhxDays=  res.data.rows[0].nonxhxDays;//内部项目未核销人天
                    this.noyxhxDays=  res.data.rows[0].noyxhxDays;//研发项目未核销人天
                    this.nowxhxDays=  res.data.rows[0].nowxhxDays;//外部项目未核销人天
                });
        },
        mounted:function () {
            this.makeDataDictionary();
        },
        computed:{
        },
        filters:{
            feeTypeFil:function (value) {
                return value
            },
            keepOneDot(value){//保留一位小数
                let result=(Math.round(value*100)/100).toFixed(1);
                return result;
            },
            returnFloat(value){//保留两位小数
                return util.returnFloat(value);
            }

        }

    }
</script>

<style scoped>

</style>