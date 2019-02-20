<template>
    <div>
        <div :style="{width: '100%', height: '300px',background:'#fff',float:'left',position:'relative'}">
            <div id="resUseChart" :style="{width:'100%',height:'100%'}"></div>
            <el-select class="selectMonth" size="mini" v-model="curDep" placeholder="请选择部门" @change="chartperDep">
                <el-option
                        v-for="(item,index) in allDep"
                        :key="index"
                        :label="item.orgName"
                        :value="item.orgCode">
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
        data() {
            return {
                curDep:'',
                allDep:[]
            }
        },
        methods:{
            getDep(){
                var userName=sessionStorage.getItem('userName');
                this.$myHttp({  //this.prefix+http://192.168.205.56:6008?userName='+sessionStorage.getItem('userName')
                    url:this.prefix+'/report/echart/org/listForJob?userName='+sessionStorage.getItem('userName'),
                    method:'post',
                    data:{
                        userName:sessionStorage.getItem('userName')
                    }
                }).then(res=> {
                      console.log('res--resuse-rate--',res);
                      if(res.data && res.data.length>0){
                          this.allDep=res.data;
                          this.curDep=this.allDep[0].orgCode;
                          this.chartperDep(this.curDep);
                      }else{
                          this.chartperDep(this.curDep);
                      }
                });
            },
            chartperDep(val) {
                val=val?val:this.curDep;
                this.curDep=val;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById("resUseChart"));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '资源池使用率',
                        textStyle: {
                            color: "#436EEE",
                            fontSize: 14,
                            align:'center'
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
                            formatter: '{value}%'
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
                // console.log('dataMonth---',dataMonth);
                // this.halfYearMonth=dataMonth;
                // this.curMonth=dataMonth[dataMonth.length-1];
                // this.monthArr=monthArr;
                this.$myHttp({  //this.prefix+http://192.168.205.56:6008
                    url:this.prefix+'/report/echart/org/job/get',
                    method:'post',
                    data:{
                        begin:startDate,
                        end:endDate,
                        userName:sessionStorage.getItem('userName'),//sessionStorage.getItem('userName'),
                        orgCode:val
                    }
                }).then(res=> {
                    console.log('res--echarts2-resources-----', res);
                    console.log('dataMonth---',dataMonth);
                    option.legend.data=['核销','未核销','内部管理','闲置'];
                    //series的值
                    var colorArr=['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
                    for(var k=0;k<option.legend.data.length;k++) {
                        var legendValue={};
                        legendValue.name=option.legend.data[k];
                        legendValue.type='bar';
                        legendValue.stack=true;
                        legendValue.barWidth='20';
                        legendValue.data=[];
                        legendValue.itemStyle={
                            normal:{color:colorArr[k]}
                        }
                        for(var m=0;m<dataMonth.length;m++){
                            //项目计费在每个月的值
                            var allValue = 0;
                            for (var j = 0; j < res.data.length; j++) {
                                if (res.data[j].workMonth == dataMonth[m]) {
                                    if (k==0 && res.data[j].hx) {
                                        allValue = parseFloat(res.data[j].hx);
                                    }
                                    if(k==1 && res.data[j].nohx) {
                                        allValue = parseFloat(res.data[j].nohx);
                                    }
                                    if(k==2 && res.data[j].innerManageCost) {
                                        allValue = parseFloat(res.data[j].innerManageCost);
                                    }
                                    if(k==3 && res.data[j].relaxMoneyCost) {
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
                            legendValue.data.push(allValue);
                        }
                        option.series.push(legendValue);
                    }
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                });
            },
            resize(){
                var _this=this;
                document.getElementById('resUseChart').removeAttribute('_echarts_instance_');
                _this.chartperDep(this.curDep);//资源池使用率
            }
        },
        mounted(){
            this.getDep();//获取所有部门列表

        },

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