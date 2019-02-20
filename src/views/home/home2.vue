
<style lang="less" src="./home2.less" scoped></style>
<style type="text/css">
    .homePageCarousel .el-carousel__indicators{
        left:initial !important;
        right:-40px !important;
        bottom:10px !important;
    }
    .homePageCarousel .el-carousel__indicator{
        width:25px;
        height:25px;
        border-radius:50%;
        text-align:center;
        line-height:25px;
        border:1px solid #fff;
        color:#fff;
        padding:0;
        margin-left:10px;
        font-size:14px;
    }
    .homePageCarousel .is-active{
        background:#fff;
        color:#00a0e9;
    }
</style>
<template>
    <div style="min-width:800px;overflow-x:auto;">
        <div class="block">
            <span class="demonstration"><Icon type="images" size="18" style="margin-right:5px;vertical-align: middle;"></Icon>新闻图片</span>
            <el-carousel id="carousel" class="homePageCarousel" height="250px">
                <el-carousel-item v-for="(item,index) in carouselImgData" :key="index">
                    <!--<h3>{{ item }}</h3>-->
                    <img :src="'data:image/gif;base64,'+item.content" alt="" width="100%" height="100%" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="newsNotice">
            <h3>
                <span><Icon type="ios-paper-outline" size="20" style="margin-right:10px;color:#308cee;vertical-align: middle;"></Icon>新闻公告</span>
                <span class="readMore" @click="clickMore('01')">MORE<i class="el-icon-more"></i> </span>
            </h3>
            <ul>
                <li v-for="(item,index) in newsNotice" @click="linkToDetail(item.id,'01')">
                    <span class="iconHot"><img v-if="item.hotIconFlag" src="../../images/hot.png" width="20" height="20" /></span>
                    <span class="date">{{item.lastmodifiedTime | dateFil}}</span>
                    <span class="text">{{item.documentTitle}}</span>
                </li>
            </ul>
        </div>
        <div class="usualMenu">
            <h3>
                <span><Icon type="ios-paper-outline" size="20" style="margin-right:10px;color:#308cee;vertical-align: middle;"></Icon>常用菜单</span>
                <span class="readMore" @click="addNewMenu"><i class="el-icon-circle-plus-outline" style="color:#308cee;font-size:20px;display: inline-block;vertical-align: middle;"></i> </span>
            </h3>
            <ul>
                <li v-for="(item,index) in usualMenu">
                    <span class="menuText" @click="goForRoute(item.resId)">{{item.resName}}</span>
                    <i class="el-icon-close" @click="delMenu(item.id)"></i>
                </li>
            </ul>
            <div class="selectMenu" v-show="selectMenuFlag">
                <el-form size="mini" class="menuForm">
                    <el-form-item label=" " prop="preMenu" style="float:left;width:60%;margin-bottom: 0;margin-right:10px;">
                        <el-popover
                                placement="bottom"
                                width="100%"
                                trigger="click">
                            <el-tree
                                    :data="myTreeData"
                                    :props="defaultProps"
                                    node-key="id"
                                    :default-expanded-keys="firstTreeId"
                                    @node-click="handleNodeClick"
                                    ref="tree"
                                    class="treeShow">
                            </el-tree>
                            <el-input ref="preMenuInput1" v-model="ruleForm.preMenu" placeholder="请选择" readOnly slot="reference" @focus="showTree"></el-input>
                        </el-popover>
                    </el-form-item>
                   <el-button type="primary" size="mini" round @click="addMenu">确定</el-button>
                </el-form>
            </div>
        </div>
        <div class="willDo">
            <h3>
                <span><Icon type="ios-timer-outline" size="20" style="margin-right:10px;color:#308cee;vertical-align: middle;"></Icon>待办工作</span>
                <span class="currentDate">{{currentDate}}</span>
                <span class="leftWork">今日剩余工作总计</span>
            </h3>
            <ul>
                <li v-for="(item,index) in carouselData" :key="index" @click="toList(item.type)">
                    <span>{{item.willOrnot}}</span>
                    <p>{{item.total}}</p>
                </li>
                <!--<li>-->
                    <!--<span>已办</span>-->
                    <!--<p>16</p>-->
                <!--</li>-->
                <!--<li style="border-left:1px solid #ccc;">-->
                    <!--<span>待阅</span>-->
                    <!--<p>16</p>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<span>已阅</span>-->
                    <!--<p>16</p>-->
                <!--</li>-->
            </ul>
        </div>
        <div class="fastNotice">
            <h3>
                <span><Icon type="ios-list-outline" size="20" style="margin-right:10px;color:#308cee;vertical-align: middle;"></Icon>项目快讯</span>
                <span class="readMore" @click="clickMore('04')">MORE<i class="el-icon-more"></i> </span>
            </h3>
            <ul>
                <li v-for="(item,index) in projectMes" :key="index" @click="linkToDetail(item.id,'04')">
                    <!--<span class="iconHot"><img v-if="index<3" src="../../images/hot.png" width="20" height="20" /></span>-->
                    <span class="date">{{item.lastmodifiedTime  | dateFil}}</span>
                    <span class="text">{{item.documentTitle}}</span>
                </li>
            </ul>
        </div>
        <div class="fastLink">
            <h3>
                <span><Icon type="android-share-alt" sinkize="20" style="margin-right:10px;color:#308cee;vertical-align: middle;"></Icon>快速链接</span>
            </h3>
            <ul>
                <li v-for="(item,index) in fastLink" :key="index" @click="linkToWeb(item.linkUrl)">
                    <span class="menuText">{{item.linkName}}</span>
                </li>
            </ul>
        </div>
        <div v-if="workRateShowFlag" id="workerRate"  :style="{width:'35%',float:'left',height:'300px',background:'#fff',marginTop:'10px'}"></div>
    </div>
</template>
<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require("echarts/lib/component/legendScroll");
    import Cookies from 'js-cookie';
    import shrinkableMenu from '../main-components/shrinkable-menu/shrinkable-menu.vue';
    export default {
        data(){
           return {
               workRateShowFlag:false,
               enterNum:0,
               workRateBox:this.$refs.workRateBox,
               workRate:null,
               carouselImgData:[],
               currentDate:'',
               carouselData:[],
               newsNotice:[],
               projectMes:[],
               usualMenu:[],
               selectMenuFlag:false,
               myTreeData:[{
                   id: '1',
                   menuName: '订单管理33',
                   // menuCode: '30',
                   childrens: [
                       {
                           id: 12,
                           pid: 1,
                           text: ''
                       }
                   ]
               }],
               defaultProps: {
                   children: 'children',
                   label: 'title'
               },
               firstTreeId:[],
               ruleForm:{
                   preMenu:'',
                   preMenuRouteName:''
               },
               fastLink:[
                   {
                       'linkName': '中建材信息数字化平台',
                       'linkUrl': 'http://cdwp.cnbmxinyun.com/login.html'
                   },
                   {
                       'linkName':'内部系统Portal',
                       'linkUrl':'http://portal.cnbmxinyun.com:6001'
                   },
                   {
                       'linkName':'禅道',
                       'linkUrl':'http://cnbmtech.5upm.com/user-login.html'
                   },
                   {
                       'linkName':'公司GitLab',
                       'linkUrl':'http://192.168.1.132/'
                   },
                   {
                       'linkName':'Office365',
                       'linkUrl':'https://www.partner.outlook.cn/owa/?path=/mail/inbox'
                   }
               ]

           }
        },
        components:{shrinkableMenu},
        computed: {
            menuList() {
                return this.$store.state.app.menuList;
            }
        },
        mounted(){
            let _this=this;
            let year=(new Date().getFullYear());
            let month=(new Date().getMonth()+1)>9?(new Date().getMonth()+1):'0'+(new Date().getMonth()+1);
            let date=new Date().getDate()>9?new Date().getDate():'0'+new Date().getDate();
            this.currentDate=year+'-'+month+'-'+date;
            this.loadLeftMenuData();//判断是否有员工使用率权限
            this.crouselImgData();//新闻图片
            this.getNewsData('01');//新闻公告
            this.getNewsData('04');//项目快讯
            this.showCrouselData();//待办工作
            this.getUsualMenu();

            window.onresize=function () {
                // console.log('this.workRateShowFlag---',_this.workRateShowFlag)
                if(_this.workRateShowFlag) {
                    document.getElementById('workerRate').removeAttribute('_echarts_instance_');
                    _this.chartWorkRate();
                }
            }
        },
        methods:{
            loadLeftMenuData(){
                this.$myHttp({
                    method: 'get',
                    url: this.permissionPrefix + "/microarch/sys/sysuser/getMenuTree"
                }).then(res => {
                    if(res.data && res.data.ext) {
                        let menuData = JSON.parse(res.data.ext);
                        let menuList = menuData;
                        for (var i = 0; i < menuList.length; i++) {
                            if (menuList[i].title == '员工使用率' && menuList[i].children && menuList[i].children[0] && menuList[i].children[0].name == 'echartsDemo/workRate/workRate') {
                                this.workRateShowFlag=true;
                                setTimeout(()=>{
                                    this.chartWorkRate();
                                },1)

                            }
                        }
                    }
                })
            },
            chartWorkRate() {
                // var workRateBox=this.workRateBox;
                // var workRate = document.createElement('div');
                // workRate.id='workerRate';
                // workRate.style='width:100%;height:100%;';
                // workRateBox.appendChild(workRate);
                // this.workRate=document.getElementById("workerRate");
                // console.log('document.getElementById("workerRate")---',document.getElementById("workerRate"));
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById("workerRate"));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: "本人报工情况",
                        textStyle: {
                            color: "#436EEE",
                            fontSize: 14
                        }
                    },
                    //鼠标触发提示数量
                    tooltip: {
                        trigger: "axis",
                        formatter: function(params) {
                            var str = '';
                            str += '<div>'+ params[0].name +'</div>';   //显示日期的函数
                            for (var i = 0; i < params.length; i++) {
                                str+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+params[i].color+';"></span>' +
                                    '<span>'+params[i].seriesName+':</span><span>'+params[i].value+'%</span><br/>';
                            }
                            return str;
                        }
                    },
                    legend: {
                        data:["政策法规","经办规程","业务场景模拟","常见问题"],
                        orient: 'vertical',
                        x:'right'
                    },
                    //x轴显示
                    xAxis: {
                        data: ["公共管理业务","基金财务业务","内控监督业务","养老待遇业务", "医疗待遇业务", "工伤待遇业务", "失业待遇业务"],
                        splitLine:{
                            show:false
                        },
                        axisLabel:{'interval':0,rotate:30},
                    },
                    //y轴显示
                    yAxis: {
                        splitLine:{
                            show:false
                        },
                        type : 'value',
                        axisLabel: {
                            color: '#666',
                            fontSize: 12,
                            formatter: '{value}%'
                        },
                    },
                    grid:{
                        left:60
                    },
                    series: [
                        // {
                        //     name: "业务场景模拟",
                        //     type: "bar",
                        //     stack: "业务",
                        //     data: [1,2,3,4,2,3,3],//（此处的<%=ywcjmnData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
                        //     barWidth : 10,
                        //     itemStyle:{
                        //     normal:{color:"#3FBB49"}
                        // }
                        // },
                        // {
                        //     name: "常见问题",
                        //     type: "bar",
                        //     stack: "业务",
                        //     data: [1,2,3,4,2,3,3],//（此处的<%=cjwtData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
                        //     barWidth : 10,
                        //     itemStyle:{
                        //     normal:{color:"#56C4A5"}
                        // }
                        // }
                    ]
                };
                var startMonth=new Date().getMonth()+1-6;
                var startMonthReal=startMonth==0?1:startMonth<0?12+startMonth:startMonth;
                startMonthReal=startMonthReal<10?'0'+startMonthReal:startMonthReal;
                var startYear=new Date().getFullYear();
                var startYearReal=startMonth<0?startYear-1:startYear;
                var endMonth=new Date().getMonth()+1-1;
                var endMonthReal=endMonth==0?12:endMonth;
                endMonthReal=endMonthReal<10?'0'+endMonthReal:endMonthReal;
                var endYear=new Date().getFullYear();
                var endYearReal=endMonth==0?endYear-1:endYear;

                var startDate=startYearReal+'-'+startMonthReal;
                var endDate=endYearReal+'-'+endMonthReal;

                console.log('startDate--',startDate,'endDate---',endDate);
                option.legend.data=['核销','未核销','内部管理','闲置'];
                //获取所有月份
                var dataMonth=[startYearReal+'-'+startMonthReal];
                startMonthReal=startMonthReal.charAt(0)=='0'?startMonthReal.substring(1):startMonthReal;
                var monthArr=[startYearReal+'年'+startMonthReal+'月'];
                for(var i=0;i<5;i++){
                    startMonthReal++;
                    if(startMonthReal>12){
                        startMonthReal=1;
                        startYearReal++;
                    }
                    monthArr.push(startYearReal+'年'+startMonthReal+'月');
                    startMonthReal=startMonthReal<10?'0'+startMonthReal:startMonthReal;
                    dataMonth.push(startYearReal+'-'+startMonthReal);
                }
                option.xAxis.data=monthArr;
                console.log('dataMonth---',dataMonth);
                // this.halfYearMonth=dataMonth;
                // this.curMonth=dataMonth[dataMonth.length-1];
                // this.monthArr=monthArr;
                var userName=sessionStorage.getItem('userName');
                console.log('userName---',userName)
                //userName='sunjialiang'
                // http://192.168.1.174:6008  this.prefix+ ?begin='+startDate+'&end='+endDate+'&userName='+userName+'
                this.$myHttp({
                    url:this.prefix+'/report/echart/person/job/get',
                    method:'post',
                    data:{
                        "begin": startDate,
                        "end": endDate,
                        "userName": userName
                    }
                }).then(res=>{
                    console.log('res--echarts--workerRate--',res);

                    //获取所有y轴数据
                    var colorArr=['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
                    for(var i=0;i<option.legend.data.length;i++) {
                        var monthData = {};
                        monthData.name =option.legend.data[i];
                        monthData.type='bar';
                        monthData.stack=true;
                        monthData.barWidth=20;
                        monthData.data=[];
                        monthData.itemStyle={
                            normal:{color:colorArr[i]}
                        }

                        for(var k=0;k<dataMonth.length;k++){
                            //项目计费在每个月的值
                            var allValue = 0;
                            for (var j = 0; j < res.data.length; j++) {
                                if (res.data[j].workMonth == dataMonth[k]) {
                                    if (i==0 && res.data[j].hx) {
                                        allValue = parseFloat(res.data[j].hx);
                                    }
                                    if(i==1 && res.data[j].nohx) {
                                        allValue = parseFloat(res.data[j].nohx);
                                    }
                                    if(i==2 && res.data[j].innerManageCost) {
                                        allValue = parseFloat(res.data[j].innerManageCost);
                                    }
                                    if(i==3 && res.data[j].relaxMoneyCost) {
                                        allValue = parseFloat(res.data[j].relaxMoneyCost);
                                    }
                                    // if (i==0 && res.data[j].projectCost) {
                                    //     allValue = parseFloat(res.data[j].projectCost);
                                    // }
                                    // if(i==1 && res.data[j].projectNoCost) {
                                    //     allValue = parseFloat(res.data[j].projectNoCost);
                                    // }
                                    // if(i==2 && res.data[j].innerManageCost) {
                                    //     allValue = parseFloat(res.data[j].innerManageCost);
                                    // }
                                    // if(i==3 && res.data[j].businessChanceCost) {
                                    //     allValue = parseFloat(res.data[j].businessChanceCost);
                                    // }
                                    // if(i==4 && res.data[j].relaxMoneyCost){
                                    //     allValue = parseFloat(res.data[j].relaxMoneyCost);
                                    // }
                                }
                            }
                            monthData.data.push(allValue);
                        }
                        option.series.push(monthData);
                    }


                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                });
            },
            linkToWeb(url){
                window.open(url,'_blank');
            },
            delMenu(id){
                var _this = this;
                this.$confirm('确定要删除该常用菜单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    _this.$myHttp({
                        method: 'post',
                        url: this.permissionPrefix+'/microarch/sys/menuCommon/delete',
                        data: {
                            "entity": {
                                "id": id
                            }
                        }
                    }).then(res => {
                        console.log('res--del--menu ----', res)
                        if(res.data.code==10000){
                            this.$message({
                                type:'success',
                                message:'删除成功'
                            });
                        }
                        _this.getUsualMenu();//刷新常用菜单列表
                    })
                });
            },
            goForRoute(resId){
                // let allList=JSON.parse(localStorage.getItem('permissionList'));
                // for(var i=0;i<allList.length;i++){
                //     if(allList[i].id==id){
                        this.$router.push({
                            name:resId
                        })
                //     }
                // }
            },
            addNewMenu(){
              this.selectMenuFlag=true;
            },
            addMenu(){
                if(this.ruleForm.preMenuRouteName='' || this.ruleForm.preMenu==''){
                    this.$message({
                        type:'warning',
                        message:'请选择常用菜单'
                    })
                    return ;
                }
                this.$myHttp({
                    method: 'post',
                    url: this.permissionPrefix+'/microarch/sys/menuCommon/save',
                    data:{
                        "entity": {
                            "resId": this.ruleForm.preMenuRouteName,
                            "resName":this.ruleForm.preMenu,
                            "userId":0
                        }

                    }
                }).then(res => {
                        console.log('res------addmenu---',res)
                    if(res.data.code==10000){
                        this.$message({
                            type:'success',
                            message:'常用菜单添加成功'
                        })
                        this.getUsualMenu();//刷新常用菜单列表
                        this.selectMenuFlag=false;
                        this.ruleForm.preMenuRouteName='';
                        this.ruleForm.preMenu='';
                    }
                });
            },
            showTree(){
                var that=this;
                var params={
                    "where": [{
                        "field": "id",
                        "opt": ">",
                        "value": "1"
                    }],
                    "pageNum": 0,
                    "pageSize": 10,
                    "orderBy": "id asc"
                };
                this.$myHttp({
                    method: 'get',
                    url: this.permissionPrefix+'/microarch/sys/sysuser/getMenuTree'
                }).then(res => {
                    let resData=JSON.parse(res.data.ext);
                    console.log('res-tree data------',resData)
                    // for(var i=0;i<resData.length;i++) {
                    //     this.firstTreeId.push(resData[i].id);
                    //     console.log('firstTreeId---', this.firstTreeId)
                    // }
                    this.myTreeData=[];
                    this.myTreeData=resData;
                    // setTimeout(function () {
                    //     for(var i=0;i<that.firstTreeId.length;i++) {
                    //         that.$refs.tree.store.nodesMap[that.firstTreeId[i]].expanded = true;
                    //     }
                    // },1000)
                    // console.log('myTreeData---------',this.myTreeData)

                })
            },
            handleNodeClick(data) {
                // console.log(data);
                if(data.component=='Main'){
                    this.$message('目录节点不可作为常用菜单！');
                }else {
                    this.ruleForm.preMenu = data.title;
                    this.ruleForm.preMenuRouteName = data.name;
                    this.$refs.preMenuInput1.focus();
                    this.$refs.preMenuInput1.blur();
                    document.body.click();
                }
            },
            crouselImgData(){
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + '/microarch/sys/images/carousel?type=01',
                }).then(res=>{
                     // console.log('resimg--crouselData---',res)
                     if(res.data){
                         this.carouselImgData=res.data;
                         setTimeout(function () {
                             var carousel=document.getElementById('carousel');
                             var indicators=carousel.getElementsByClassName('el-carousel__indicator');
                             for(var i=0;i<indicators.length;i++){
                                 indicators[i].innerHTML=i+1;
                             }
                         },0)
                     }
                })
            },
            getNewsData(type){
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + '/microarch/sys/SysDocument/findNameByOrgCode',
                    data:{
                        "entity":{
                            "documentType":type
                        }
                    }
                }).then(res=> {
                    if(type=='01') {
                        // console.log('新闻公告---', res);
                        if(res.data && res.data.rows){
                            let noticeRows=res.data.rows;
                            let nowTime=new Date().getTime();
                            let threeDay=3*24*3600*1000;
                            // console.log('noticeRows--',noticeRows,'--nowTime--',nowTime)
                            // console.log('firstData---',new Date(noticeRows[0].lastmodifiedTime).getTime())
                            // console.log('disTime--',(3*24*3600*1000));
                            for(var i=0;i<noticeRows.length;i++){
                                let everyDataTime=new Date(noticeRows[i].lastmodifiedTime).getTime();
                                let disTime=nowTime-everyDataTime;
                                if(disTime<threeDay){
                                    noticeRows[i].hotIconFlag=true;
                                }
                            }
                            this.newsNotice = noticeRows.length <= 7 ? noticeRows : noticeRows.slice(0, 7);
                        }
                    }else if(type=='04'){
                        // console.log('项目快讯---', res);
                        if(res.data && res.data.rows){
                            this.projectMes=res.data.rows.length<=6?res.data.rows:res.data.rows.slice(0,6);;
                        }
                    }

                });
            },
            getUsualMenu(){
                this.$myHttp({
                    method: 'post',
                    url: this.permissionPrefix+'/microarch/sys/menuCommon/list',
                    data:{
                        pageSize:120,
                        pageNum:0
                    }
                }).then(res=>{
                    console.log('aaaaaaaaaaaaaaaaaaaaaaaa----',res)
                    if(res.data){
                        this.usualMenu=res.data.rows;
                    }
                });
            },
            linkToDetail(id, type){
                this.$router.push({
                    "name": "newsView",
                    "params": {
                        "id": id,
                        "viewType":"home",
                        "type":type
                    },
                    'query':{
                        'id':id,
                        'viewType': 'home',
                        'type': type
                    }
                })

            },
            clickMore(type){
                this.$router.push({
                    "name": "newsList",
                    "params": {
                        "type":type
                    }
                })

            },
            showCrouselData(){
                var userName = sessionStorage.getItem('userName');
                this.$myHttp({
                    method: 'post',
                    url: this.prefix + '/microarch/activiti/task/getIndexMsg/'+userName
                }).then(res=>{
                    // console.log('res---home ===crouselData---',res);
                    if(res.data){
                        this.carouselData=[
                            {
                                willOrnot:'待办',
                                total:res.data.toDoSize,
                                type:'waitFor'
                            },
                            {
                                willOrnot:'已办',
                                total:res.data.haveSize,
                                type:'transated'
                            },
                            {
                                willOrnot:'待阅',
                                total:res.data.unReadSize,
                                type:'unRead'
                            },
                            {
                                willOrnot:'已阅',
                                total:res.data.readedSize,
                                type:'readed'
                            }
                        ];
                    }else{
                        this.carouselData=[
                            {
                                willOrnot:'待办',
                                total:0,
                                type:'waitFor'
                            },
                            {
                                willOrnot:'已办',
                                total:0,
                                type:'transated'
                            },
                            {
                                willOrnot:'待阅',
                                total:0,
                                type:'unRead'
                            },
                            {
                                willOrnot:'已阅',
                                total:0,
                                type:'readed'
                            }
                        ]
                    }

                });

            },
            toList(type) {
                console.log(type)
                if('waitFor' == type) {
                    this.toWaitFor()
                }else if('transated' == type) {
                    this.toTransated()
                }else if('unRead' == type) {
                    this.toUnRead()
                }else{
                    this.toReaded()
                }
            },
            toWaitFor(){
                this.$router.push({
                    "name": 'workFlow/toDoList',
                    "params": {
                    }
                })
            },
            toTransated(){
                this.$router.push({
                    "name": 'workFlow/haveList',
                    "params": {
                    }
                })
            },
            toUnRead(){
                this.$router.push({
                    "name": 'workFlow/encyclicList',
                    "params": {
                    }
                })
            },
            toReaded(){
                this.$router.push({
                    "name": 'workFlow/encyclicReadedList',
                    "params": {
                    }
                })
            }
        },
        filters:  {
            dateFil(value) {
                return value.substring(0,10)
            }
        }
    }
</script>