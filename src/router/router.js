import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login2019.vue')
};
export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        {path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home2.vue')},
        {
            path: 'changePassword',
            title: '修改密码',
            name: 'changePassword',
            component: () => import('@/views/changePassword.vue')
        },
        {
            path: 'sys/addUserRemindTepMage',
            title: '增加模板',
            name: 'sys/addUserRemindTepMage',
            component: () => import('@/views/sys/userRemindTepMege/userRemindTepMageAdd.vue')
        },
        {
            path: 'sys/editUserRemindTepMage',
            title: '修改模板',
            name: 'sys/editUserRemindTepMage',
            component: () => import('@/views/sys/userRemindTepMege/userRemindTepMageEdit.vue')
        },
        {
            path: 'sys/addOrganization',
            title: '组织增加',
            name: 'sys/addOrganization',
            component: () => import('@/views/sys/org/organizationAdd.vue')
        },
        {
            path: 'sys/detailOrganization',
            title: '组织查询',
            name: 'sys/detailOrganization',
            component: () => import('@/views/sys/org/organizationDetail.vue')
        },
        {
            path: 'sys/editOrganization',
            title: '组织修改',
            name: 'sys/editOrganization',
            component: () => import('@/views/sys/org/organizationEdit.vue')
        },
        {
            path: 'sys/addRoleManagement',
            title: '角色增加',
            name: 'sys/addRoleManagement',
            component: () => import('@/views/sys/role/roleManagementAdd.vue')
        },
        {
            path: 'sys/editRoleManagement',
            title: '角色修改',
            name: 'sys/editRoleManagement',
            component: () => import('@/views/sys/role/roleManagementEdit.vue')
        },
        {
            path: 'sys/detailRoleManagement',
            title: '角色查询',
            name: 'sys/detailRoleManagement',
            component: () => import('@/views/sys/role/roleManagementDetail.vue')
        },
        {
            path: 'sys/addPostManagement',
            title: '岗位增加',
            name: 'sys/addPostManagement',
            component: () => import('@/views/sys/post/postManagementAdd.vue')
        },
        {
            path: 'sys/editPostManagement',
            title: '岗位修改',
            name: 'sys/editPostManagement',
            component: () => import('@/views/sys/post/postManagementEdit.vue')
        },
        {
            path: 'sys/detailPostManagement',
            title: '岗位查询',
            name: 'sys/detailPostManagement',
            component: () => import('@/views/sys/post/postManagementDetail.vue')
        },
        {
            path:'sys/lookUser',
            title:'查看用户',
            name:'sys/lookUser',
            component:()=> import('@/views/sys/user/lookUser.vue')
        },
        {
            path: 'sys/editUser',
            title: '新增/编辑用户',
            name: 'sys/editUser',
            component: () => import('@/views/sys/user/addNewUser.vue')
        },
        {
            path:'sys/dictManagement',
            title:'字典项管理',
            name:'sys/dictManagement',
            component:()=> import('@/views/sys/dict/dictManagementEdit.vue')
        },
        {
            path:'sys/addDictManagement',
            title:'字典项管理',
            name:'sys/addDictManagement',
            component:()=> import('@/views/sys/dict/dictManagementAdd.vue')
        },
        {
            path:'sys/detailDictManagement',
            title:'查看字典项管理',
            name:'sys/detailDictManagement',
            component:()=> import('@/views/sys/dict/dictManagementDetail.vue')
        },
        {
            path:'sys/resourcesAdd',
            title:'新增资源',
            name:'sys/resourcesAdd',
            component:()=> import('@/views/sys/resources/resourcesAdd.vue')
        },
        {
            path:'sys/resourcesEdit',
            title:'资源修改',
            name:'sys/resourcesEdit',
            component:()=> import('@/views/sys/resources/resourcesAdd.vue')
        },
        {
            path:'sys/addRoleAssignment',
            title:'新增菜单',
            name:'sys/addRoleAssignment',
            component:()=> import('@/views/sys/rolePerson/roleAssignmentAdd.vue')
        },
        {
            path:'sys/shareDoc',
            title:'资料库',
            name:'sys/shareDoc',
            component:()=>import('@/views/sys/shareDoc/shareDoc.vue')
        },
        {
            path:'workFlow/mapping/addForm',
            title:'配置流程表单',
            name:'workFlow/mapping/addForm',
            component:()=> import('@/views/workFlow/mapping/addForm.vue')
        },
        {
            path:'workFlow/testFirst',
            title:'测试表单',
            name:'workFlow/testFirst',
            component:()=> import('@/views/workFlow/testFirst.vue')
        },
        {
            path:'workFlow/trackList',
            title:'流程跟踪',
            name:'workFlow/trackList',
            component:()=> import('@/views/workFlow/trackList.vue')
        },
        {
            path:'editOrder',
            title:'编辑订单',
            name:'editOrder',
            component:()=> import('@/views/sysorder/orderEdit.vue')
        },
        {
            path:'viewOrder',
            title:'查看订单',
            name:'viewOrder',
            component:()=> import('@/views/sysorder/orderView.vue')
        },
        {
            path:"workFlow/addEntrustProcess",
            title: "流程委托",
            name:"workFlow/addEntrustProcess",
            component:()=> import('@/views/workFlow/addEntrustProcess.vue')
        },
        {
            path: 'workFlow/entrustProcessView',
            title: '流程委托查看',
            name: 'workFlow/entrustProcessView',
            component: () => import('@/views/workFlow/entrust/entrustProcessView.vue')
        },
        {
            path:'workFlow/model/modelEdit',
            title:'编辑模型',
            name:'workFlow/model/modelEdit',
            component:()=> import('@/views/workFlow/model/modelEdit.vue')
        },
        {
            path:'workFlow/mapping/formCnfAdd',
            title:'工单增加',
            name:'workFlow/mapping/formCnfAdd',
            component:()=> import('@/views/workFlow/mapping/formCnfAdd.vue')
        },
        {
            path:'workFlow/mapping/formCnfEdit',
            title:'工单修改',
            name:'workFlow/mapping/formCnfEdit',
            component:()=> import('@/views/workFlow/mapping/formCnfAdd.vue')
        },
        {
            path:'sys/documentList',
            title:'信息列表',
            name:'documentList',
            component:()=> import('@/views/sys/document/documentList.vue')
        },
        {
            path:'sys/documentEdit',
            title:'信息增加',
            name:'editDocument',
            component:()=> import('@/views/sys/document/documentEdit.vue')
        },
        {
            path:'sys/documentView',
            title:'信息查看',
            name:'viewDocument',
            component:()=> import('@/views/sys/document/documentView.vue')
        },
        {
            path:'sys/newsView',
            title:'信息查看',
            name:'newsView',
            component:()=> import('@/views/sys/document/newsView.vue')
        },
        {
            path:'sys/newsList',
            title:'新闻列表',
            name:'newsList',
            component:()=> import('@/views/sys/document/newsList.vue')
        },
        {
            path:'workFlow/encyclicList',
            title:'我的待阅',
            name:'workFlow/encyclicList',
            component:()=> import('@/views/workFlow/encyclicList.vue')
        },
        {
            path:'workFlow/encyclicReadedList',
            title:'我的已阅',
            name:'workFlow/encyclicReadedList',
            component:()=> import('@/views/workFlow/encyclicReadedList.vue')
        },
        {
            path:'sys/cfieldsView',
            title:'扩展字段查看',
            name:'sys/cfieldsView',
            component:()=> import('@/views/sys/cfields/cfieldsView.vue')
        },
        {
            path:'sys/cfieldsEdit',
            title:'扩展字段编辑',
            name:'sys/cfieldsEdit',
            component:()=> import('@/views/sys/cfields/cfieldsEdit.vue')
        },
        {
            path:'sys/imagesEdit',
            title:'图片增加',
            name:'sys/imagesEdit',
            component:()=> import('@/views/sys/images/imagesEdit.vue')
        },
        {
            path:'sys/imagesView',
            title:'图片查看',
            name:'sys/imagesView',
            component:()=> import('@/views/sys/images/imagesView.vue')
        },
        {
            path:'workFlow/custRule/custRuleEdit',
            title:'流程规则编辑',
            name:'workFlow/custRule/custRuleEdit',
            component:()=> import('@/views/workFlow/custRule/custRuleEdit.vue')
        },
        {
            path: 'sys/message/messageList',
            title: '消息列表',
            name: 'sys/message/messageList',
            component: () => import('@/views/sys/message/messageList.vue')
        },
        {
            path:'sys/scheduleEdit',
            title:'定时任务编辑',
            name:'sys/scheduleEdit',
            component:()=> import('@/views/sys/schedule/scheduleEdit.vue')
        },
        {
            path:'sys/scheduleView',
            title:'定时任务查看',
            name:'sys/scheduleView',
            component:()=> import('@/views/sys/schedule/scheduleView.vue')
        },
        {
            path:'sys/scheduleLogList',
            title:'定时任务日志查看',
            name:'sys/scheduleLogList',
            component:()=> import('@/views/sys/schedule/scheduleLogList.vue')
        },
        ///////////////////////平台路由结束///////////////////////////////////
        {
            path: 'projectApprove',
            title: '项目基本信息',
            name: 'projectApprove',
            component: () => import('@/views/projectManagement/projectApprove.vue')
        },
        {
            path: 'addUser',
            title: '添加用户',
            name: 'addUser',
            component: () => import('@/views/systeMmanagement/addUser.vue')
        },
        {
            path: 'organizationAndManage',
            title: '组织管理',
            name: 'organizationAndManage',
            component: () => import('@/views/systeMmanagement/organizationAndManage.vue')
        },
        {
            path: 'projectMaintenance',
            title: '项目维护',
            name: 'projectMaintenance',
            component: () => import('@/views/projectManagement/projectMaintenance.vue')
        },
        {
            path: 'projectItemView',
            title: '项目立项查看',
            name: 'projectItemView',
            component: () => import('@/views/projectManagement/projectItemView.vue')
        },
        {
            path: 'projectItemEdite',
            title: '项目立项信息编辑',
            name: 'projectItemEdite',
            component: () => import('@/views/projectManagement/projectItemEdite.vue')
        },
        {
            path: 'addOppoProject',
            title: '商机管理',
            name: 'addOppoProject',
            component: () => import('@/views/projectManagement/addOppoProject.vue')
        },
        {
            path: 'addDataictionary',
            title: '新增字典类型',
            name: 'addDataictionary',
            component: () => import('@/views/systeMmanagement/addDataictionary.vue')
        },
        {
            path: 'dictdataView',
            title: '查看字典数据',
            name: 'dictdataView',
            component: () => import('@/views/systeMmanagement/dictdataView.vue')
        },
        {
            path: 'dictdataEdite',
            title: '编辑字典数据',
            name: 'dictdataEdite',
            component: () => import('@/views/systeMmanagement/dictdataEdite.vue')
        },
        {
            path: 'editDataictionary',
            title: '编辑字典数据',
            name: 'editDataictionary',
            component: () => import('@/views/systeMmanagement/editDataictionary.vue')
        },
        {
            path: 'workHoursApproval',
            title: '报工审批列表',
            name: 'workHoursApproval',
            component: () => import('@/views/projectManagement/workHoursApproval.vue')
        },
        {
            path: 'timeManagement',
            title: '工时填报',
            name: 'timeManagement',
            component: () => import('@/views/projectManagement/timeManagement.vue')
        },
        {
            path: 'oneProjectHoursList',
            title: '项目工时详情',
            name: 'oneProjectHoursList',
            component: () => import('@/views/workingHourManage/oneProjectHoursList.vue')
        },
        {
            path: 'personalWHDetaile',
            title: '个人工时历史',
            name: 'personalWHDetaile',
            component: () => import('@/views/projectManagement/personalWHDetaile.vue')
        },
        {
            path: 'viewOppoManagement',
            title: '商机信息查看',
            name: 'viewOppoManagement',
            component: () => import('@/views/projectManagement/viewOppoManagement.vue')
        },
        {
            path: 'viewProjectDetails',
            title: '项目详情',
            name: 'viewProjectDetails',
            component: () => import('@/views/projectManagement/viewProjectDetails.vue')
        },
        {
            path: 'oneOppoHoursList',
            title: '商机工时详情',
            name: 'oneOppoHoursList',
            component: () => import('@/views/workingHourManage/oneOppoHoursList.vue')
        },
        {
            path: 'onePersonAllmonth',
            title: '人员工时详情',
            name: 'onePersonAllmonth',
            component: () => import('@/views/workingHourManage/onePersonAllmonth.vue')
        },
        {
            path: 'oneMonthWorkHoursList',
            title: '商机月份工时详情',
            name: 'oneMonthWorkHoursList',
            component: () => import('@/views/workingHourManage/oneMonthWorkHoursList.vue')
        },
        {
            path: 'oneMonthWorkHoursListPro',
            title: '项目月份工时详情',
            name: 'oneMonthWorkHoursListPro',
            component: () => import('@/views/workingHourManage/oneMonthWorkHoursListPro.vue')
        },
        {
            path: 'onePersonAllmonth',
            title: '人员工时详情',
            name: 'onePersonAllmonth',
            component: () => import('@/views/workingHourManage/onePersonAllmonth.vue')
        },
        {
            path: 'onePersonAllmonthPro',
            title: '人员工时详情(项目)',
            name: 'onePersonAllmonthPro',
            component: () => import('@/views/workingHourManage/onePersonAllmonthPro.vue')
        },
        {
            path: 'innerProjectSingleMonth',
            title: '内部管理工时核销详情',
            name: 'innerProjectSingleMonth',
            component: () => import('@/views/workingHourManage/innerProjectSingleMonth.vue')
        },
        {
            path: 'innerProjectSingleWorker',
            title: '内部项目工时核销列表(明细)',
            name: 'innerProjectSingleWorker',
            component: () => import('@/views/workingHourManage/innerProjectSingleWorker.vue')
        },
        {
            path: 'updateContent',
            title: '更新历史',
            name: 'updateContent',
            component: () => import('@/views/systeMmanagement/updateContent.vue')
        },
        {
            path: 'EditcustomerInfor',
            title: '修改客户信息',
            name: 'EditcustomerInfor',
            component: () => import('@/views/customerInforManage/EditcustomerInfor.vue')
        },
        {
            path: 'AddcustomerInfor',
            title: '新增客户信息',
            name: 'AddcustomerInfor',
            component: () => import('@/views/customerInforManage/AddcustomerInfor.vue')
        },
        {
            path: 'ViewcustomerInfor',
            title: '查看客户信息',
            name: 'ViewcustomerInfor',
            component: () => import('@/views/customerInforManage/ViewcustomerInfor.vue')
        },
        {
            path: 'AddchannelInfor',
            title: '新增渠道信息',
            name: 'AddchannelInfor',
            component: () => import('@/views/customerInforManage/AddchannelInfor.vue')
        },
        {
            path: 'EditchannelInfor',
            title: '修改渠道信息',
            name: 'EditchannelInfor',
            component: () => import('@/views/customerInforManage/EditchannelInfor.vue')
        },
        {
            path: 'ViewchannelInfor',
            title: '查看渠道信息',
            name: 'ViewchannelInfor',
            component: () => import('@/views/customerInforManage/ViewchannelInfor.vue')
        },
        {
            path: 'ViewproductLine',
            title: '查看产品线',
            name: 'ViewproductLine',
            component: () => import('@/views/customerInforManage/ViewproductLine.vue')
        },
        {
            path: 'EditproductLine',
            title: '编辑产品线',
            name: 'EditproductLine',
            component: () => import('@/views/customerInforManage/EditproductLine.vue')
        },
        {
            path: 'Viewproduct',
            title: '查看产品',
            name: 'Viewproduct',
            component: () => import('@/views/customerInforManage/Viewproduct.vue')
        },

        {
            path: 'Addproduct',
            title: '新增产品',
            name: 'Addproduct',
            component: () => import('@/views/customerInforManage/Addproduct.vue')
        },
        {
            path: 'Editproduct',
            title: '编辑产品',
            name: 'Editproduct',
            component: () => import('@/views/customerInforManage/Editproduct.vue')
        },
        {
            path: 'AddproductLine',
            title: '新增产品线',
            name: 'AddproductLine',
            component: () => import('@/views/customerInforManage/AddproductLine.vue')
        },
        {
            path: 'addPersonnelLevel',
            title: '新增人员职级',
            name: 'addPersonnelLevel',
            component: () => import('@/views/businessSet/addPersonnelLevel.vue')
        },
        {
            path: 'editEmployeeRegistration',
            title: '新增人员入职离职信息',
            name: 'editEmployeeRegistration',
            component: () => import('@/views/businessSet/editEmployeeRegistration.vue')
        },
        {
            path: 'rateDetails',
            title: '员工报工率详情',
            name: 'rateDetails',
            component: () => import('@/views/statisticalAnalysis/rateDetails.vue')
        },
        {
            path: 'addNewLevel',
            title: '新增职级',
            name: 'addNewLevel',
            component: () => import('@/views/businessSet/addNewLevel.vue')
        },
        {
            path: 'editNewLevel',
            title: '修改职级',
            name: 'editNewLevel',
            component: () => import('@/views/businessSet/editNewLevel.vue')
        },
        {
            path: 'editPersonnelLevel',
            title: '修改人员职级',
            name: 'editPersonnelLevel',
            component: () => import('@/views/businessSet/editPersonnelLevel.vue')
        },
        {
            path: 'proAndOppoCostBudget',
            title: '成本评估',
            name: 'proAndOppoCostBudget',
            component: () => import('@/views/costBudget/proAndOppoCostBudget.vue')
        },
        {
            path: 'viewProjectCost',
            title: '项目成本明细',
            name: 'viewProjectCost',
            component: () => import('@/views/costBudget/viewProjectCost.vue')
        },
        {
            path: 'viewOppoCost',
            title: '商机成本明细',
            name: 'viewOppoCost',
            component: () => import('@/views/costBudget/viewOppoCost.vue')
        },
        {
            path: 'editProjectCost',
            title: '项目成本评估',
            name: 'editProjectCost',
            component: () => import('@/views/costBudget/editProjectCost.vue')
        },
        {
            path: 'editOppoCost',
            title: '商机成本评估',
            name: 'editOppoCost',
            component: () => import('@/views/costBudget/editOppoCost.vue')
        },
        {
            path: 'addOutPersion',
            title: '外包人员注册',
            name: 'addOutPersion',
            component: () => import('@/views/outResource/addOutPersion.vue')
        },
        {
            path: 'outresourcePersion',
            title: '外包人员管理',
            name: 'outresourcePersion',
            component: () => import('@/views/outResource/outresourcePersion.vue')
        },
        {
            path: 'editOutPersion',
            title: '修改外包人员',
            name: 'editOutPersion',
            component: () => import('@/views/outResource/addOutPersion.vue')
        },
        {
            path: 'viewOutPersion',
            title: '查看外包人员',
            name: 'viewOutPersion',
            component: () => import('@/views/outResource/viewOutPersion.vue')
        },
        {
            path: 'listSupplier',
            title: '供应商管理',
            name: 'listSupplier',
            component: () => import('@/views/supplier/listSupplier.vue')
        },
        {
            path: 'addSupplier',
            title: '添加供应商',
            name: 'addSupplier',
            component: () => import('@/views/supplier/addSupplier.vue')
        },
        {
            path: 'editSupplier',
            title: '修改供应商',
            name: 'editSupplier',
            component: () => import('@/views/supplier/editSupplier.vue')
        },
        {
            path: 'viewSupplier',
            title: '查看供应商详情',
            name: 'viewSupplier',
            component: () => import('@/views/supplier/viewSupplier.vue')
        },
        {
            path: 'listBusinessTrip',
            title: '出差申请',
            name: 'listBusinessTrip',
            component: () => import('@/views/reimbursement/listBusinessTrip.vue')
        },
        {
            path: 'addBusinessTrip',
            title: '新增出差申请',
            name: 'addBusinessTrip',
            component: () => import('@/views/reimbursement/addBusinessTrip.vue')
        },
        {
            path: 'editBusinessTrip',
            title: '修改出差申请',
            name: 'editBusinessTrip',
            component: () => import('@/views/reimbursement/addBusinessTrip.vue')
        },
        {
            path: 'viewBusinessTrip',
            title: '查看出差申请',
            name: 'viewBusinessTrip',
            component: () => import('@/views/reimbursement/viewBusinessTrip.vue')
        },
        {
            path: 'addExpenseAccount',
            title: '添加报销申请',
            name: 'addExpenseAccount',
            component: () => import('@/views/reimbursement/addExpenseAccount.vue')
        },
        {
            path: 'viewExpenseAccount',
            title: '查看报销申请',
            name: 'viewExpenseAccount',
            component: () => import('@/views/reimbursement/viewExpenseAccount.vue')
        },
        {
            path: 'editExpenseAccount',
            title: '修改报销申请',
            name: 'editExpenseAccount',
            component: () => import('@/views/reimbursement/addExpenseAccount.vue')
        },
        {
            path: 'addExpenseBusiness',
            title: '添加差旅报销申请',
            name: 'addExpenseBusiness',
            component: () => import('@/views/reimbursement/addExpenseBusiness.vue')
        },
        {
            path: 'editExpenseBusiness',
            title: '修改差旅报销申请',
            name: 'editExpenseBusiness',
            component: () => import('@/views/reimbursement/addExpenseBusiness.vue')
        },
        {
            path: 'viewExpenseBusiness',
            title: '查看报销申请',
            name: 'viewExpenseBusiness',
            component: () => import('@/views/reimbursement/viewExpenseBusiness.vue')
        },
        {
            path: 'outsourcerWorkloadInfo',
            title: '服务报告',
            name: 'outsourcerWorkloadInfo',
            component: () => import('@/views/outsourcerWorkloadInfo/outsourcerWorkloadInfo.vue')
        },
        {
            path: 'addOutsourcerWorkloadInfo',
            title: '新增服务报告',
            name: 'addOutsourcerWorkloadInfo',
            component: () => import('@/views/outsourcerWorkloadInfo/addOutsourcerWorkloadInfo.vue')
        },
        {
            path: 'viewOutsourcerWorkloadInfo',
            title: '查看服务报告',
            name: 'viewOutsourcerWorkloadInfo',
            component: () => import('@/views/outsourcerWorkloadInfo/viewOutsourcerWorkloadInfo.vue')
        },
        {
            path: 'addProjectReport',
            title: '新增项目月报',
            name: 'addProjectReport',
            component: () => import('@/views/projectReport/addNewProjectReport.vue')
        },
        {
            path: 'viewProjectReport',
            title: '查看项目月报',
            name: 'viewProjectReport',
            component: () => import('@/views/projectReport/viewProjectReport.vue')
        },
        {
            path: 'projectReport',
            title: '项目月报',
            name: 'projectReport',
            component: () => import('@/views/projectReport/reportList.vue')
        },
        {
            path: 'addSalesContract',
            title: '新增销售合同',
            name: 'addSalesContract',
            component: () => import('@/views/salesContract/addSalesContract.vue')
        },
        {
            path: 'viewSalesContract',
            title: '查看销售合同',
            name: 'viewSalesContract',
            component: () => import('@/views/salesContract/viewSalesContract.vue')
        },
        {
            path: 'listSalesContract',
            title: '销售合同管理',
            name: 'listSalesContract',
            component: () => import('@/views/salesContract/listSalesContract.vue')
        },
        {
            path: 'oursourcerWorkCount',
            title: '月度外包服务报告维护',
            name: 'oursourcerWorkCount',
            component: () => import('@/views/statisticalAnalysis/oursourcerWorkCount.vue')
        },
        {
            path: 'addPurchaseContract',
            title: '新增采购合同',
            name: 'addPurchaseContract',
            component: () => import('@/views/salesContract/addPurchaseContract.vue')
        },
        {
            path: 'viewPurchaseContract',
            title: '查看采购合同',
            name: 'viewPurchaseContract',
            component: () => import('@/views/salesContract/viewPurchaseContract.vue')
        },
        {
            path: 'listPurchaseContract',
            title: '采购合同管理',
            name: 'listPurchaseContract',
            component: () => import('@/views/salesContract/listPurchaseContract.vue')
        },


    ]
};

export const permissionRouter = {
    path: '/',
    name: 'permissionRouter',
    component: Main,
    children: []
};
// 把两个部分的router合并为一个
var otherRouterChildren = otherRouter.children;
var permissionRouterChildren = permissionRouter.children;
for (var i = 0; i < permissionRouterChildren.length; i++) {
    otherRouterChildren.push(permissionRouterChildren[i]);
}
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403
];
