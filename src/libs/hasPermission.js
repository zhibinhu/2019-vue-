import util from './util'

const hasPermission = {
    install (Vue, options) {
        Vue.directive('hasPermission', {
            bind (el, binding, vnode) {

                //当前用户所有权限数据
                let permissionList = JSON.parse(localStorage.getItem('permissionList'));
                //当前页面路由名称
                let routeName = vnode.context.$route.name;
                //根据当前页路由名称 权限数据中筛选出当前页面权限数据结构

                let parentData = permissionList.filter(o => o.resUrl === routeName);


                // let childPermissionList = permissionList.filter(o => o.resParentId === parentData[0].resId);
                let childPermissionList = permissionList.filter(o => o.pid === parentData[0].id);

                if (util.hasPermission(childPermissionList,binding.value).length === 0) {
                    //如果没有对应的权限  则删除当前节点
                    if(el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                    setTimeout(function () {
                        if(el.parentNode) {
                            el.parentNode.removeChild(el);
                        }
                    },0)

                }
            }
        });
    }
};

export default hasPermission;
