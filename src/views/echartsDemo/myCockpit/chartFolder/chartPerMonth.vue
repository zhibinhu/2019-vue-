<template>
<div>
    <div ref="monthDepChart" :style="{width: '100%', height: '300px',background:'#fff',float:'left',position:'relative',marginRight:'1%'}">
        <div id="peopleMonthCost" :style="{width:'100%',height:'100%'}"></div>
        <el-select class="selectMonth" size="mini" v-model="curMonth" placeholder="请选择月份" @change="chartperMonth">
            <el-option
                    v-for="(item,index) in halfYearMonth"
                    :key="index"
                    :label="item"
                    :value="item">
            </el-option>
        </el-select>
    </div>
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
    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                curMonth:'',
                halfYearMonth:[],
                monthArr:[]
            }
        },
        mounted() {
            var _this=this;
            // if(this.$refs.personCostChart) {
            //     this.chartHalfYear();
            // }
            // if(this.$refs.monthDepChart) {
                this.chartperMonth();
            // }
        },
        methods: {
            chartHalfYear() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById("peopleCostData"));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: "人力成本分布统计",
                        textStyle: {
                            color: "#436EEE",
                            fontSize: 14
                        }
                    },
                    //鼠标触发提示数量
                    tooltip: {
                        trigger: "axis"
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
                            formatter: function(value,index){
                                var value;
                                if (value >=1000) {
                                    if(value>=100000000){
                                        value=value/100000000+'亿';
                                    }else if(value>=10000000){
                                        value=value/10000000+'千万';
                                    }else if(value>=1000000){
                                        value=value/1000000+'百万';
                                    }else if(value>=100000){
                                        value=value/100000+'十万';
                                    }else if(value>=10000){
                                        value=value/10000+'万';
                                    } else{
                                        value = value / 1000 + 'k';
                                    }
                                }else if(value <1000){
                                    value = value;
                                }
                                return value
                            }
                        },
                    },
                    grid:{
                      left:60
                    },
                    series: [
                //         {
                //             name: "政策法规",
                //             type: "bar",
                //             stack: "业务",//折叠显示
                //             data: [1,2,3,4,2,3,3],//（此处的<%=zcfgData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
                //             barWidth : 10,
                //             //显示颜色
                //             itemStyle:{
                //             normal:{color:"#FFFF49"}
                //             }
                //         },
                //     {
                //     name: "经办规程",
                //         type: "bar",
                //     stack: "业务",
                //     data: [1,2,3,4,2,3,3],//（此处的<%=jbgcData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
                //     barWidth : 10,
                //     itemStyle:{
                //     normal:{color:"#FF8849"}
                // }
                // },
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
                option.legend.data=['项目计费','项目非计费','内部管理','商机','闲置'];
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
                this.halfYearMonth=dataMonth;
                this.curMonth=dataMonth[dataMonth.length-1];
                this.monthArr=monthArr;

                this.$myHttp({
                    url:this.prefix+'report/echart/person/cost/get',
                    method:'post',
                    data:{
                        begin:startDate,
                        end:endDate
                    }
                }).then(res=>{
                    console.log('res--echarts--',res);

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

                        var allXmjf=0;
                        var allXmfjf=0;
                        var allNbgl=0;
                        var allSj=0;
                        var allXz=0;
                        for(var k=0;k<dataMonth.length;k++){
                                //项目计费在每个月的值
                                var allValue = 0;
                                for (var j = 0; j < res.data.length; j++) {
                                    if (res.data[j][0] == dataMonth[k]) {
                                        if (i==0 && res.data[j][3]) {
                                            allValue += parseInt(res.data[j][3]);
                                        }
                                        if(i==1 && res.data[j][4]) {
                                            allValue += parseInt(res.data[j][4]);
                                        }
                                        if(i==2 && res.data[j][5]) {
                                             allValue += parseInt(res.data[j][5]);
                                        }
                                        if(i==3 && res.data[j][6]) {
                                             allValue += parseInt(res.data[j][6]);
                                        }
                                        if(i==4 && res.data[j][7]){
                                              allValue += parseInt(res.data[j][7]);
                                        }
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
            chartperMonth(val) {
                val=val?val:this.curMonth;

                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById("peopleMonthCost"));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text:'年月',
                        textStyle: {
                            color: "#436EEE",
                            fontSize: 14,
                            align:'center'
                        }
                    },
                    //鼠标触发提示数量
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["政策法规", "经办规程", "业务场景模拟", "常见问题"],
                        orient: 'vertical',
                        x: 'right'
                    },
                    //x轴显示
                    xAxis: {
                        data: ["公共管理业务", "基金财务业务", "内控监督业务", "养老待遇业务", "医疗待遇业务", "工伤待遇业务", "失业待遇业务"],
                        splitLine: {
                            show: false
                        },
                        axisLabel: {'interval': 0, rotate: 30},
                    },
                    //y轴显示
                    yAxis: {
                        splitLine: {
                            show: false
                        },
                        type: 'value',
                        axisLabel: {
                            color: '#666',
                            fontSize: 12,
                            formatter: function (value, index) {
                                var value;
                                if (value >= 1000) {
                                    if (value >= 100000000) {
                                        value = value / 100000000 + '亿';
                                    } else if (value >= 10000000) {
                                        value = value / 10000000 + '千万';
                                    } else if (value >= 1000000) {
                                        value = value / 1000000 + '百万';
                                    } else if (value >= 100000) {
                                        value = value / 100000 + '十万';
                                    } else if (value >= 10000) {
                                        value = value / 10000 + '万';
                                    } else {
                                        value = value / 1000 + 'k';
                                    }
                                } else if (value < 1000) {
                                    value = value;
                                }
                                return value
                            }
                        },
                    },
                    grid: {
                        left: 60
                    },
                    series: [
                        //         {
                        //             name: "政策法规",
                        //             type: "bar",
                        //             stack: "业务",//折叠显示
                        //             data: [1,2,3,4,2,3,3],//（此处的<%=zcfgData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
                        //             barWidth : 10,
                        //             //显示颜色
                        //             itemStyle:{
                        //             normal:{color:"#FFFF49"}
                        //             }
                        //         },
                        //     {
                        //     name: "经办规程",
                        //         type: "bar",
                        //     stack: "业务",
                        //     data: [1,2,3,4,2,3,3],//（此处的<%=jbgcData%>为后台传过来的数据，格式为[1,2,3,4,2,3,3],根据实际情况修改）
                        //     barWidth : 10,
                        //     itemStyle:{
                        //     normal:{color:"#FF8849"}
                        // }
                        // },
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
                option.legend.data=['项目计费','项目非计费','内部管理','商机','闲置'];
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
                this.halfYearMonth=dataMonth;
                this.curMonth=dataMonth[dataMonth.length-1];
                this.monthArr=monthArr;

                val=val?val:this.curMonth;
                this.curMonth=val?val:this.curMonth;

                var month = val.substring(5).charAt(0) == '0' ? val.substring(6) : val.substring(5);
                var year = val.substring(0, 4);
                option.title.text=year+'年'+month+'月';

                this.$myHttp({
                    url:this.prefix+'report/echart/person/cost/get',
                    method:'post',
                    data:{
                        begin:val,
                        end:val
                    }
                }).then(res=> {
                    console.log('res--echarts2--', res);
                    option.legend.data=['项目计费','项目非计费','内部管理','商机','闲置'];
                    //获取所有部门
                    var orgArr=[];
                    for(var i=0;i<res.data.length;i++){
                        orgArr.push(res.data[i][1]);
                    }
                    var allOrg=this.delRepeat(orgArr);
                    console.log('allOrg---',allOrg);
                    option.xAxis.data=allOrg;
                    //series的值
                    var colorArr=['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
                    for(var k=0;k<option.legend.data.length;k++) {
                        var legendValue={};
                        legendValue.name=option.legend.data[k];
                        legendValue.type='bar';
                        legendValue.stack=true;
                        legendValue.barWidth='30';
                        legendValue.data=[];
                        legendValue.itemStyle={
                                        normal:{color:colorArr[k]}
                                        }
                        for (var j = 0; j < allOrg.length; j++) {
                            var curOrgValue=0;
                            for (var i = 0; i < res.data.length; i++) {
                                if(k==0 && allOrg[j]==res.data[i][1]){
                                    curOrgValue=res.data[i][3]?parseInt(res.data[i][3]):0;
                                }
                                if(k==1 && allOrg[j]==res.data[i][1]){
                                    curOrgValue=res.data[i][4]?parseInt(res.data[i][4]):0;
                                }
                                if(k==2 && allOrg[j]==res.data[i][1]){
                                    curOrgValue=res.data[i][5]?parseInt(res.data[i][5]):0;
                                }
                                if(k==3 && allOrg[j]==res.data[i][1]){
                                    curOrgValue=res.data[i][6]?parseInt(res.data[i][6]):0;
                                }
                                if(k==4 && allOrg[j]==res.data[i][1]){
                                    curOrgValue=res.data[i][7]?parseInt(res.data[i][7]):0;
                                }
                            }
                            legendValue.data.push(curOrgValue);
                        }
                        option.series.push(legendValue);
                    }
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                });
            },

            delRepeat(arr){
                var newArr=[];
                var obj={};
                for(var i in arr){
                    if(!obj[arr[i]]){
                        newArr.push(arr[i]);
                        obj[arr[i]]=1;
                    }
                }
                return newArr;
            },
            resize(){
                // if(this.$refs.personCostChart){
                //     document.getElementById('peopleCostData').removeAttribute('_echarts_instance_');
                //     this.chartHalfYear();
                // }
                // if(this.$refs.monthDepChart) {
                    document.getElementById('peopleMonthCost').removeAttribute('_echarts_instance_');
                    this.chartperMonth();
                // }


            }
        }
    }
</script>
<style scoped>
    .selectMonth{
        position: absolute;
        left:50%;
        top:5px;
        margin-left:-60px;
        width:120px;
    }
</style>