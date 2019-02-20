<template>
    <div style="background-color: white;height: 300px">

        <el-row type="flex" class="row-bg" justify="center" style="font-size: 15px" v-if="profitFormData.isFromEdit">

            
            <el-col :span="10" style="margin-bottom: 5px"> 项目合同总额（元）</el-col>
            
            <el-col :span="6" :pull="2" style="text-align: right;">
                <el-input  size="small" style="width:200px" v-if="allSumFlag" v-model="profitFormData.contractValueResult" placeholder="请输入内容" @change="changeAmount"></el-input>
            </el-col>

        </el-row>

         <el-row type="flex" class="row-bg" justify="center" style="font-size: 15px" v-if="!profitFormData.isFromEdit">

            
            <el-col :span="10" style="margin-bottom: 5px">项目合同总额（元）</el-col>
            
            <el-col :span="6" :pull="2" style="margin-bottom: 5px;text-align: right;">{{profitFormData.contractValue|amountFmt}}</el-col>

        </el-row>


        <el-row type="flex" class="row-bg" justify="center" style="font-size: 15px">
            <el-col :span="10" style="margin-bottom: 5px">税率</el-col>
            <el-col :span="6" :pull="2" style=";text-align: right;">{{profitFormData.contractRate*100 + '%'}}

            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center" style="font-size: 15px">
            <el-col :span="10" style="margin-bottom: 5px">项目合同（不含税）总金额（元）</el-col>
            <el-col :span="6" :pull="2" style=";text-align: right;">
                {{util.returnFloat(profitFormData.allCotntactAmount/1000)}}
                <!--{{profitFormData.allCotntactAmount|amountFmt}}-->
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center" style="font-size: 15px">
            <el-col :span="10" style="margin-bottom: 5px">项目（不含税）总成本（元）</el-col>
            <el-col :span="6" :pull="2" style=";text-align: right;">
                {{util.returnFloat(profitFormData.cost/1000)}}
                <!--{{profitFormData.cost|amountFmt}}</el-col>-->
            </el-col>
        </el-row>


        <el-row type="flex" class="row-bg" justify="center" style="font-size: 15px">
            <el-col :span="10" style="margin-bottom: 5px">利润</el-col>
            <el-col :span="6" :pull="2" style=";text-align: right;">
                {{util.returnFloat(profitFormData.profit/1000)}}
                <!--{{profitFormData.profit|amountFmt}}-->
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center" style="font-size: 15px">
            <el-col :span="10" style="margin-bottom: 5px">利润率</el-col>
            <el-col :span="6" :pull="2"  style=";text-align: right;">{{profitFormData.profitargin?(profitFormData.profitargin*10000/100).toFixed(2)+'%':''}}</el-col>
        </el-row>

    </div>

</template>


<script>
    import util from '../libs/util'
    export default {
        data() {
            return {
                util:util,
                allSumFlag:true
            }
        },
        props:['profitFormData'],
        methods: {
            changeAmount(value){
                if(isNaN(Number(value))){
                    let trueValue=parseFloat(value);
                    this.$message({
                                type:'warning',
                                message:'请输入数字'
                            })
                    this.allSumFlag=false;
                    setTimeout(()=>{
                        this.allSumFlag=true;
                    },1)
                    this.profitFormData.contractValueResult=trueValue;
                    value=trueValue;
                }

                const contractValue = value*1000;   
                //税率
                const contractRate =Number(this.profitFormData.contractRate)

            
                //项目合同（不含税）总金额（元）
                const allCotntactAmount = contractValue / (1 + contractRate)
                

                // 项目（不含税）总成本（元）
                const cost = this.profitFormData.cost

                // 利润
                const profit = allCotntactAmount - cost  

                // 利润率（%）
                const profitargin = profit/allCotntactAmount  
                
                this.$store.state.oppoContractValue = value*1000;
                
        
                if(cost!= '000' && contractValue!= 0){
                    this.$set(this.profitFormData, 'contractRate', contractRate)
                    this.$set(this.profitFormData,'allCotntactAmount',allCotntactAmount)
                    this.$set(this.profitFormData,'cost',cost)
                    this.$set(this.profitFormData,'profit',profit)
                    this.$set(this.profitFormData,'profitargin',profitargin)
                }
            }
        },
        mounted: function () {

        },
        filters:{

            
        }

    }
</script>
