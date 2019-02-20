<template>
    <div>


        <el-row style="margin:0 -5px;">
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
                <div style="height:300px;background:red;margin:0 5px;margin-bottom:10px;">
                    <person-cost ref="personCharts"></person-cost>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
                <div style="height:300px;background:red;margin:0 5px;margin-bottom:10px;">
                    <e-charts ref="twoCharts"></e-charts>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
                <div style="height:300px;background:red;margin:0 5px;margin-bottom:10px;">
                    <res-use ref="resCharts"></res-use>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import personCost from './chartFolder/personCostChart';
    import eCharts from './chartFolder/chartPerMonth';
    import resUse from './chartFolder/resUseRate';
    export default {
        data(){
            return {

            }
        },
        components:{personCost,eCharts,resUse},
        methods:{

        },
        mounted(){
              var _this=this;
              window.onresize=function () {
                    _this.$refs.personCharts.resize();
                    _this.$refs.twoCharts.resize();
                    _this.$refs.resCharts.resize();
                    console.log('innerWidth---',window.innerWidth)
              }
        }
    }
</script>