<template>
    <div style="background-color: white;margin-left: 50px;margin-right: 50px">

        <operation-table :operationTable="operationTable"></operation-table>
    </div>

</template>


<script>
    import operationTable from '../../components/operationTable.vue'
    export default {
        data() {
            return {
                operationTable:{
                    tableThead: [
                        {
                            headName: '角色',
                            headKey: 'user',
                            placeholder:'请选择角色',
                            width:'130',
                            selectData:'userData',
                            selectCode:'03'
                        },
                        {
                            headName: '技术职称',
                            width:'130',
                            headKey: 'projectName',
                            placeholder:'请选择技术职称',
                            selectData:'projectNameData',
                            selectCode:'02'
                        },
                        {
                            headName: '有效天数',
                            width:'120',
                            headKey: 'data',
                            placeholder:'请输入有效天数',
                            type:'input'
                        },
                        {
                            headName: '单位人员成本/天',
                            width:'120',
                            headKey: 'chengBen'
                        },
                        {
                            headName: '人工成本费用',
                            headKey: 'feiYong',
                            width:'120',
                        },
                        {
                            headName: '备注',
                            headKey: 'memo',
                            placeholder:'请输入备注',
                            type:'input'
                        }
                    ]
                }
            }

        },
        methods: {},
        components: {
            operationTable
        },
        mounted: function () {

        }

    }
</script>
