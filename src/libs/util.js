import axios from 'axios';
import env from '../../build/env';
import lazyLoading from './lazyLoading.js';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import index from '../store/index.js'

let util = {};
util.title = function (title) {
    title = title || 'Portal 管理系统';
    window.document.title = title;
};

const ajaxUrl = env === 'development'
    ? '/src/data'
    : env === 'production'
        ? '.'
        : 'http://192.168.31.10:5001';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    headers:{Authorization:'Sys '+sessionStorage.getItem('token')}
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && itAccess.isArray()) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    let routerObj = {};
    routers.forEach(item => {
        if (item.name === 'otherRouter') {
            item.children.forEach((child, i) => {
                if (child.name === name) {
                    routerObj = item.children[i];
                }
            });
        } else {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    routerObj = item.children[0];
                }
            } else {
                item.children.forEach((child, i) => {
                    if (child.name === name) {
                        routerObj = item.children[i];
                    }
                });
            }
        }
    });
    return routerObj;
};

util.handleTitle = function (vm, item) {
    return item.title;
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    console.log('vm.$store.state.app.routers-111-----',vm.$store.state.app.routers)
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {

        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {

        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    if (vm.$store === undefined) {
        return;
    }
    let pageOpenedList = vm.$store.state.app.pageOpenedList;

    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {

        if (name === pageOpenedList[i].name || name === 'waiwang' ||name === 'oneProjectHoursList'|| name === 'oneMonthWorkHoursListPro'|| name === 'oneMonthWorkHoursListPro' ||name === 'onePersonAllmonthPro' || name ==='oneOppoHoursList' || name ==='oneMonthWorkHoursList' || name ==='onePersonAllmonth'
        ||name === 'innerProjectSingleMonth' || name === 'innerProjectSingleWorker') { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }

    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children && item.children.length > 0) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children && tag.children.length > 0 ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
};
util.initRouter = function (vm) {
    const constRoutes = [];
    const otherRoutes = [];

    // 404路由需要和动态路由一起注入
    const otherRouter = [{
        path: '/*',
        name: 'error-404',
        meta: {
            title: '404-页面不存在'
        },
        component: 'error-page/404'
    }];
    // 模拟异步请求
    // let menuUri = (vm.menuUri) ? vm.menuUri : vm.prefixEX + "sys/getAuthEX?resId=174";
    let token=sessionStorage.getItem('token');
    // if(uid) {
    let menuUri = (vm.menuUri) ? vm.menuUri :token ? vm.permissionPrefix + "/microarch/sys/sysuser/getMenuTree":'';
    if(menuUri==''){
        return false;
    }
    util.ajax(menuUri).then(res => {
        let menuData;
        if (vm.menuUri) {

            for (let items in res.data) {

                  for (let subItems in res.data[items].children) {

                      delete res.data[items].children[subItems].children
                  }

            }

            menuData = res.data;
        } else {

                if(res.data && res.data.ext) {
                    menuData = JSON.parse(res.data.ext);
                    for (var i = 0; i < menuData.length; i++) {
                        if (menuData[i].children && menuData[i].children.length == 1) {
                            menuData[i].title = menuData[i].children[0].title;
                        }
                    }

                }


        }

        util.initRouterNode(constRoutes, menuData);
        util.initRouterNode(otherRoutes, otherRouter);
        // 添加主界面路由
        vm.$store.commit('updateAppRouter', constRoutes.filter(item => item.children && item.children.length > 0));
        // 添加全局路由
        vm.$store.commit('updateDefaultRouter', otherRoutes);
        // 刷新界面菜单
        vm.$store.commit('updateMenulist', constRoutes.filter(item => item.children && item.children.length > 0));

        let tagsList = [];

        vm.$store.state.app.routers.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        vm.$store.commit('setTagsList', tagsList);
    });
};

// 生成路由节点
util.initRouterNode = function (routers, data) {
    // console.log('data------------,--------',data)
    for (var item of data) {
        let menu = Object.assign({}, item);
        // menu.component = import(`@/views/${menu.component}.vue`);
        menu.component = lazyLoading(menu.component);

        if (item.children && item.children.length > 0) {
            menu.children = [];
            util.initRouterNode(menu.children, item.children);
        }
        let meta = {};
        // 给页面添加标题
        meta.permission = menu.permission ? menu.permission : null;
        meta.title = menu.title ? menu.title : null;

        menu.meta = meta;

        routers.push(menu);
    }
};


/**
 * 检测数据是否重复       （使用在表单校验中）
 * @param url            校验请求的地址
 * @param entityData     校验数据
 * @param me             当前上下文（this）
 * @param message        提示信息
 * @param checkCode      筛选code
 * @param callback       校验规则回调方法
 */
util.checkData = function (checkCode, entityData, me, message, callback, url) {

    if (!util.isEmpty(entityData)) {
        axios({
            method: 'POST',
            url: url || me.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
            data: {
                "entity": entityData
            }
        }).then(res => {

            //成功回调方法
            if (res.data.total > 0) {

                callback(new Error(message));

            } else {
                callback();
            }
        });
    }
};

/**
 * 判断数据的某项属性是否为空
 * @param data
 * @returns {boolean}
 */
util.isEmpty = (data) => {

    for (let items in data) {
        if (data[items] == '') {
            return true
        }
    }
    return false

};

/**
 *
 * @param rule
 * @param value
 * @param callback
 * @param errMsg
 */
util.validatePass = (rule, value, callback, errMsg) => {

    if (value === '') {
        callback(new Error(errMsg));
    } else {
        callback();
    }

}


util.addPreZero = (num) => {

    var t = (num + '').length,
        s = '';

    for (var i = 0; i < 4 - t; i++) {
        s += '0';
    }

    return s + num;
}

//报表导出
util.exportExcel = (tableIdName,name) => {

    var _this = this;

    var wb = XLSX.utils.table_to_book(document.querySelector('#'+tableIdName))

    var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})

    try {
        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), name)
    } catch (e) {
        console.log(e, wbout)
    }
    return wbout
}

//文件下载
util.downloadTest = (data) => {

    if (!data) {
        return
    }
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', 'excel.jpg')

    document.body.appendChild(link)
    link.click()
}


/**
 * 获取数据字典数据 并回传给当前页面vue的实例
 * @param me         当前vue的实例
 * @param dictArray  dataName、dType
 */
util.getDictionaryData = (me,dictArray) => {

    dictArray.forEach(function (items) {
        me.$myHttp({
            method: 'POST',
            url: me.prefix + 'sysConfig/getSysDictionaryList'+ window.suffix,
            data: {
                "entity": {
                    "dtype": items.dType
                },
                "orderBy": "idx asc"
            }
        }).then(res => {
            //成功回调方法
            let resArry = [];
            for(let items in res.data.rows){
                resArry.push({
                    label:res.data.rows[items].dvalue,
                    value:res.data.rows[items].dkey
                })
            }
            me[items.dataName] = resArry;
        });
    })
}


/**
 *
 * @param me
 * @param dictArray
 */
util.getUserDataByRoleCode = (me,dictArray) => {

    dictArray.forEach(function (items) {
        me.$myHttp({
            method: 'POST',
            url: me.prefix + 'userrole/getUsersByRoleCode' + window.suffix,
            data: {
               roleCode:items.roleCode
            }
        }).then(res => {
            //成功回调方法
            let resArry = [];
            for(let items in res.data.content){
                resArry.push({
                    label:res.data.content[items].cname,
                    value:res.data.content[items].id
                })
            }
            me[items.dataName] = resArry;
        });
    })
}
//解决表格表头、表体线不对齐的问题
util.adjustTableHead=function(tableClass) {
    setTimeout(function () {
        var myTableSys = document.getElementsByClassName(tableClass);
        var myTableArr=Array.prototype.slice.call(myTableSys);
        if (myTableArr.length>0) {
            myTableArr.forEach((item,index)=>{
                var thGutter0 = item.getElementsByClassName('gutter')[0];
                var thGutter1 = item.getElementsByClassName('gutter')[1];
                if (thGutter0 != undefined) { thGutter0.style.display = 'table-cell'; }
                if (thGutter1 != undefined) { thGutter1.style.display = 'table-cell'; }
            })

        }
    }, 500);
}
util.getUserDataByStatus = (me,dictArray) => {


    dictArray.forEach(function (item) {
        me.$myHttp({
            method: 'POST',
            url: me.prefix + item.url + window.suffix,
            data: {
                "entity": {
                    "status": item.status
                }
            }
        }).then(res => {
            //成功回调方法
            console.log(res)

            let resArry = [];
            for(let items in res.data.rows){
                resArry.push({
                    label:res.data.rows[items][item.label],
                    value:res.data.rows[items][item.value]
                })
            }

            me[item.dataName] = resArry;
        });
    })
}


/**
 *  表单提交时，获取value的值，并传回form中
 * @param form
 * @param dataList      select 数据
 * @param vKey          需定义到form中字段的的名称
 * @param vId           select数据中对应的key
 */
util.selectGet = (form,dataList,vKey,vId) => {
    let obj = {};
    obj = dataList.find((item)=>{//这里的userList就是上面遍历的数据源
        return item.value === vId;//筛选出匹配数据
    });
    if(obj==undefined){
        form[vKey]='';
        return ;
    }
    form[vKey] = obj.label
    console.log(obj.label)
}




util.returnFloat = (value,type) =>{
    const pattern = /(?=((?!\b)\d{3})+$)/g;     /*小数位前加千分符*/

    if(value){
        if(type){
            var value=(parseFloat(value).toFixed(1));
            return value;
            var xsd=value.toString().split(".");
            if(xsd.length==1){    /*没有小数的情况*/
                value=value.toString().replace(pattern, ',')+".0";
                return value;
            }
        }else{
            var value = (parseFloat(value).toFixed(2));
            var xsd = value.toString().split(".");
            /* alert(xsd);*/
            if (xsd.length == 1) {    /*没有小数的情况*/
                value = value.toString().replace(pattern, ',') + ".00";
                return value;
            }
            if (xsd.length > 1) {
                if (xsd[1].length < 2) {    /*有一位小数的情况*/
                    value = xsd[0].toString().replace(pattern, ',') + '.' + xsd[1] + "0";
                } else if (xsd[1].length >= 2) { /*有两位小数的情况*/
                    value = xsd[0].toString().replace(pattern, ',') + '.' + xsd[1];
                }
                return value;
            }
        }
    }


}
//保留一位小数
util.keepOneDot=(value)=>{
    let result='';
    if(value){
        let num=Number(value);
        result=(Math.round(num*10)/10).toFixed(1);
        return result;
    }else{
        return result;
    }
}


util.hasPermission = (childPermissionList,value)=>{
  return  childPermissionList.filter(o=>o.resUrl == value)
}


util.hasTabsPermission = (me,key)=>{


    let permissionList = JSON.parse(localStorage.getItem('permissionList'));

    let routeName = me.$route.name;

    let parentData = permissionList.filter(o => o.resUrl === routeName);

    let childPermissionArry = permissionList.filter(o => o.resParentId === parentData[0].resId).map(o => o.resUrl);

    return childPermissionArry
}
/**
 * 项目中 从数据字典中获取下拉框的数据
 * @param me            上下文
 * @param dtypeArry     当前页面需要获取的数据字典内容数组
 */
util.getSelectData = (me,dtypeArry) => {

    if(localStorage.getItem('sysDict')){
        const allDicts = JSON.parse(localStorage.getItem('sysDict'));
        dtypeArry.map(function (dtype) {
            console.log('allDicts.filter(o => o.dtype == dtype)---',allDicts.filter(o => o.dtype == dtype))
            if(!allDicts.filter(o => o.dtype == dtype)[0]){
                return ;
            }
            let subSysDicts = allDicts.filter(o => o.dtype == dtype)[0].sysDicts;
            let resArry = []
            subSysDicts.map(function (o) {
                resArry.push({
                    label:o.dvalue,
                    value:o.dkey
                })
            })
            me[dtype +'Data'] = resArry
        })
    }
}

util.clearSearchForm = function(value,value1,value2) {
    value = "";
    value1 = "";
    value2 = "";
    index.state.oppoListSearchData = "";
    //store.state.oppoListSearchData = "";

}
//所有英文名转成中文名的方法
util.engToChinese=function(value,vm) {
    let username = "";
    if(value && value != "|") {
        value = value.split('|')[0]
        axios({
            method: 'POST',
            url:vm.prefix + 'sysData/getUserByUsername',
            data: {
                "entity":{
                    username:value
                }
            }
        }).then(res => {
            username = res.data.rows[0].cname;
            return username;
        });
    }else{
        return username;
    }
}
// scrollTop animation
util.scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
    console.log('litan',55)
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    const scroll = (start, end, step) => {
        if (start === end) {
            endCallback && endCallback()
            return
        }

        let d = (start + step > end) ? end : start + step
        if (start > end) {
            d = (start - step < end) ? end : start - step
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
util.on = (function () {
    console.log('litan',22222)
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
util.off = (function () {
    console.log('litan',33333)

    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()
export default util;
