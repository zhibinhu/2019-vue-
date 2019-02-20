<template>
    <div>
        <el-col :span="24" style="background-color: white">

            <div style="margin-left: 20px">


                <el-form :label-position="labelPosition" ref="ruleFormOne" :model="form" label-width="150px" :rules="rules"
                         style="margin-top: 50px;margin-bottom: 20px">

                    <el-col  :span="8" :xs="20">
                        <el-form-item label="部门："> <span>{{orgName}}</span></el-form-item>
                    </el-col>

                    <el-col  :span="8" :xs="20">
                        <el-form-item label="姓名："> <span>{{cname}}</span></el-form-item>
                    </el-col>
                    <el-col  :span="8" :xs="20">
                        <el-form-item label="性别："> <span>{{gender}}</span></el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="20">
                        <el-form-item label="入职日期：" prop="entryDate">
                            <el-date-picker
                                    v-model="form.entryDate"
                                    size="small"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" style="width: 95%" @change="changeDateRemind">
                            </el-date-picker>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12" :xs="20">
                        <el-form-item label="离职日期：" prop="dimissionDate">
                            <el-date-picker @change="dimissionDateJudge"
                                    v-model="form.dimissionDate"
                                    size="small"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" style="width: 95%">
                            </el-date-picker>
                        </el-form-item>

                    </el-col>


                </el-form>

                <el-col :span="24" :offset="10">

                    <el-button @click="saveProjectsInfo()" type="primary" style="margin-top: 20px;margin-bottom: 10px">提交
                    </el-button>
                    <el-button @click="close()" style="margin-top: 20px;margin-bottom: 10px">返回</el-button>

                </el-col>
            </div>

        </el-col>
    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                labelPosition:"right",
                orgName:'',
                cname:'',
                gender:'',
                form:{
                    entryDate:'',
                    entryStandardDays:'',
                    dimissionDate:'',
                    dimissionStandardDays:''
                },
                rules: {
                },
                flag1:true,
                flag2:true,
                flag3:true,
                currentMonth:'',     /*保存改之前的入职日期*/
                currentLeaveMonth:''     /*保存改之前的离职日期*/
            };
        },
        methods: {
            /*入职当月标准人天的校验：入职当月标准人天不能多余当月总天数      需求讨论以去掉此字段*/
            entryMonthDaysJudge:function(){
                if(this.form.entryStandardDays>(this.getMonthTotalDays(this.form.entryDate.split("-")[1]))){
                    this.flag2=false;
                    this.$notify({
                        title: '警告',
                        message: '你输入的入职当月总天数大于了当月总天数！',
                        type: 'warning'
                    });
                }else{
                    this.flag2=true;
                }
            },
            /*离职当月标准人天的校验：离职当月标准人天不能多余当月总天数      需求讨论以去掉此字段*/
            dimissionDaysJudge:function(){
                if(this.form.dimissionStandardDays>(this.getMonthTotalDays(this.form.dimissionDate.split("-")[1]))){
                    this.flag3=false;
                    this.$notify({
                        title: '警告',
                        message: '你输入的离职当月总天数大于了当月总天数！',
                        type: 'warning'
                    });
                }else{
                    this.flag3=true;
                }
            },
            getMonthTotalDays:function(value){
                var x=null;
                switch (value) {
                    case "01":x=31;break;
                    case "02":x=28;break;
                    case "03":x=31;break;
                    case "04":x=30;break;
                    case "05":x=31;break;
                    case "06":x=30;break;
                    case "07":x=31;break;
                    case "08":x=31;break;
                    case "09":x=30;break;
                    case "10":x=31;break;
                    case "11":x=30;break;
                    case "12":x=31;break;
                }
                return x
            },
            /*离职日期修改时，需要校验3点，1：离职日期不能早于入职日期。2：修改前的离职日期若存在工时核销，则不能修改，3：修改后的日期若存在工时核销，则不可修改。*/
            dimissionDateJudge:function(){
                if(this.form.dimissionDate<this.form.entryDate){
                    this.flag1=false;
                    this.$notify({
                        title: '警告',
                        message: '日期错误，离职时间不能早于入职时间！',
                        type: 'warning'
                    });
                }else{
                    this.flag1=true;
                }
                /*如果改前本来就有离职日期，改之前的日期与改之后的日期都需要校验当月是否有工时核销*/
                var _this=this;
                /*if(_this.currentLeaveMonth){     /!*改之前的离职日期校验 _this.currentLeaveMonth*!/
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'workhour/getUserWorkhour?mark=0&date='+_this.currentLeaveMonth+'&username='+_this.$route.query.username+'&'+ window.suffix,
                        data:{

                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.status=="error"){
                            this.$notify({
                                title: '警告',
                               /!* message: '此日期'+res.data.content+'不可修改！',*!/
                                message: '此日期存在工时填报'+'不可被修改！',
                                type: 'warning'
                            });
                            _this.form.dimissionDate=_this.currentLeaveMonth;
                        }
                    });
                    this.$myHttp({       /!*改之后的离职日期校验  _this.form.dimissionDate*!/
                        method: 'POST',
                        url: this.prefix + 'workhour/getUserWorkhour?mark=0&date='+_this.form.dimissionDate+'&username='+_this.$route.query.username+'&'+ window.suffix,
                        data:{

                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.status=="error"){
                            this.$notify({
                                title: '警告',
                                /!*message: res.data.content+'不可修改！',*!/
                                message: '所填日期之后已填报工时，请确认正确离职日期',
                                type: 'warning'
                            });
                            _this.form.dimissionDate=_this.currentLeaveMonth;
                        }
                    })
                }else{ */  /*如果本来就没有离职日期，只判断改后的日期是否被核销过 _this.form.dimissionDate*/
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'workhour/getUserWorkhour?mark=0&date='+_this.form.dimissionDate+'&username='+_this.$route.query.username+'&'+ window.suffix,
                        data:{

                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.status=="error"){
                            this.$notify({
                                title: '警告',
                               /* message: res.data.content+'不可修改！',*/
                                message: '所填日期之后已填报工时，请确认正确离职日期',
                                type: 'warning'
                            });
                            _this.form.dimissionDate='';
                        }
                    })
                //}
            },

            /*入职日期修改时，需要校验2点，1：修改前的入职日期若存在工时核销，则不能修改，2：修改后的入期若存在工时核销，则不可修改。*/
            changeDateRemind(){
                if(this.form.dimissionDate<this.form.entryDate){
                    this.flag1=false;
                    this.$notify({
                        title: '警告',
                        message: '日期错误，离职时间不能早于入职时间！',
                        type: 'warning'
                    });
                }else{
                    this.flag1=true;
                }
                var _this=this;
               /* if(_this.currentMonth){
                    /!*如果改前本来就有入职日期，改之前的日期与改之后的日期都需要校验，此步奏判断修改之前的入职日期 _this.currentMonth*!/
                    this.$myHttp({
                        method: 'POST',
                        //url: this.prefix + 'workhour/existManhourVerification?date='+_this.currentMonth+'&username='+_this.$route.query.username+'&'+ window.suffix,
                        url: this.prefix + 'workhour/getUserWorkhour?mark=1&date='+_this.currentMonth+'&username='+_this.$route.query.username+'&'+ window.suffix,
                        data:{

                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.status=="error"){
                            this.$notify({
                                title: '警告',
                               /!* message: res.data.content+'不可修改！',*!/
                                message: '此日期存在工时填报，不可被修改！',
                                type: 'warning'
                            });
                            _this.form.entryDate=_this.currentMonth;
                        }else{
                        }
                    });
                    /!*此步奏判断修改之后的入职日期 _this.form.entryDate*!/
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'workhour/getUserWorkhour?mark=1&date='+_this.form.entryDate+'&username='+_this.$route.query.username+'&'+ window.suffix,
                        data:{

                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.status=="error"){
                            this.$notify({
                                title: '警告',
                                message: '所填日期之前已填报工时，请确认正确入职日期',
                                type: 'warning'
                            });
                            _this.form.entryDate=_this.currentMonth;
                        }
                    })
                }else{*/   /*如果本来就没有入职日期，只判断改后的日期  _this.form.entryDate*/
                    this.$myHttp({
                        method: 'POST',
                        url: this.prefix + 'workhour/getUserWorkhour?mark=1&date='+_this.form.entryDate+'&username='+_this.$route.query.username+'&'+ window.suffix,
                        data:{

                        }
                    }).then(res => {
                        //成功回调方法
                        if(res.data.status=="error"){
                            this.$notify({
                                title: '警告',
                               /* message: res.data.content+'不可修改！',*/
                                message: '所填日期之前已填报工时，请确认正确入职日期',
                                type: 'warning'
                            });
                            _this.form.entryDate='';
                        }else{
                        }
                    })
                //}

            },
            saveProjectsInfo: function () {
                var _this = this;
                this.$refs['ruleFormOne'].validate((valid) => {
                    if (valid) {
                        this.ruleFormOne = true;
                    }
                    if (this.ruleFormOne) {
                        if(this.flag1==true&&this.flag2==true&&this.flag3==true){
                            this.$myHttp({
                                method: 'POST',
                                url: this.prefix + 'sysData/saveUserEX'+ window.suffix,
                                data:{
                                    "entity":{
                                        "id":_this.$route.query.id,
                                        "userId":_this.$route.query.username,
                                        "entryDate":_this.form.entryDate,
                                       /* "entryStandardDays":_this.form.entryStandardDays,*/
                                        "dimissionDate":_this.form.dimissionDate,
                                       /* "dimissionStandardDays": _this.form.dimissionStandardDays*/
                                    }
                                }
                            }).then(res => {
                                //成功回调方法
                                _this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });
                                _this.$router.push({
                                    name: 'businessSet/employeeRegistrationList',
                                    params:{
                                        currentPage:_this.currentPage
                                    }
                                });
                            })
                        }else{
                            this.$notify({
                                title: '警告',
                                message: '输入了错误的入职离职时间，请重新输入！',
                                type: 'warning'
                            });
                        }

                    }else {
                            this.$notify({
                                title: '警告',
                                message: '输入了错误的入职离职时间，请重新输入！',
                                type: 'warning'
                            });
                    }

                });
            },
            close: function () {
                var _this = this;
                this.$router.push({
                    name: 'businessSet/employeeRegistrationList',
                    params:{
                        currentPage:_this.currentPage
                    }
                });
            },
            makeDataDictionary:function () {

            }
        },
        created() {
            //跨router传参方式
            var _this = this;

            this.currentPage = this.$route.query.currentPage;
            if(this.$route.query.id){
                this.$myHttp({
                    method: 'POST',
                    url: this.prefix + "sysData/getUser" +window.suffix,
                    data: {
                        "entity": {
                            id: _this.$route.query.id
                        }
                    }
                }).then(res => {
                    //成功回调方法
                    _this.form= res.data.rows[0];
                    _this.currentMonth=res.data.rows[0].entryDate;
                    _this.currentLeaveMonth=res.data.rows[0].dimissionDate;
                    _this.orgName=res.data.rows[0].orgName;
                    _this.cname=res.data.rows[0].cname;
                    _this.gender=res.data.rows[0].gender;
                })
            }
        },
        mounted(){

        },
        computed: {
            contractAmount: {
                set: function (val) {

                    this.form.contractAmount = val * 1000
                },
                get: function (val) {

                    return this.form.contractAmount / 1000
                }
            },
            disabledJugd:function(){
                if(this.form.entryDate){
                    return false
                }else{
                    this.form.entryStandardDays=null;
                    return true
                }
            },
            disabledJugdDis:function () {
                if(this.form.dimissionDate){
                    return false
                }else{
                    this.form.dimissionStandardDays=null;
                    return true
                }
            }
        }
    };
</script>

<style>

</style>
