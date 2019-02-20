<template>

    <div style="height: 300px;">
        <el-steps direction="vertical" :active="3">
            <el-step title="2018-06-13 v1.0.0" description="系统基本功能上线"></el-step>
            <el-step title="2018-06-22 v1.0.1" description="系统二次迭代"></el-step>
            <el-step title="2018-06-27 v1.0.2" :description="desc102"></el-step>
        </el-steps>
    </div>

</template>


<script>

    export default {
        data() {
            return {
                desc102:'1.系统框架：查询列表里，单击各列名能够升序和倒序。2.工时填报：“内部项目”、“外部项目”的“任务”中增加“管理”、“会议”、“方案”。3.系统框架：查询列表里，各列能够变动左右位置及各列增加、减少。4.项目信息管理：新增界面，项目类型增加研发项目。项目类型编号为7。例如：71806001是研发项目的编号。5.项目信息管理：在新增里，增加计费类型，分计费和不计费下拉(数据字典维护)，默认是计费。'
            }

        },
        components: {

        },
        methods: {



        }


    }
</script>
