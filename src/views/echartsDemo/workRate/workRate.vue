<template>
    <div>
        <div id="workerRate" :style="{width:'35%',float:'left',height:'300px',background:'#fff',marginTop:'10px'}"></div>
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
        data(){
            return{

            }
        },
        methods:{
            chartWorkRate() {
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
                // http://192.168.1.174:6008?begin='+startDate+'&end='+endDate+'&userName='+userName+'
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
        },
        mounted(){
            this.chartWorkRate();//员工使用率

            var _this=this;
            window.onresize=function () {
                document.getElementById('workerRate').removeAttribute('_echarts_instance_');
                _this.chartWorkRate();//员工使用率
            }
        }
    }
</script>