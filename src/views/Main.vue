<style lang="less">
    @import "./main.less";

    .el-table th {
        font-size: 12px;
        color: #5C5C5C;
        background: #dbe2eb;
    }
    .ivu-menu {
        font-size:13px
    }
    .layout-text{
        font-size:13px
    }
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                <div slot="top" class="logo-con" style="cursor:pointer;">
                    <img v-show="!shrink" @click="goIndex" src="../images/logo.png" key="max-logo"/>
                    <img v-show="shrink" @click="goIndex" src="../images/logo-min.png" key="min-logo"/>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button style="padding:2px 15px;" :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                            @click="toggleClick">
                        <Icon type="navicon" size="26"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Avatar icon="person" style="background: #619fe7;margin-right:10px;"></Avatar>
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link" style="cursor: pointer">{{ userName }}
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item name="loginout" command="handleClickUserDropdown"
                                                      style="line-height: 20px;font-size: 12px">
                                        退出登录 <i class="el-icon-remove" style="color: #F56C6C;font-size: 16px"></i>
                                    </el-dropdown-item>
                                    <el-dropdown-item name="changePassword" divided command="ChangePassword"
                                                      style="line-height: 20px;font-size: 12px">
                                        修改密码 <i class="el-icon-edit" style="color: #67C23A;font-size: 16px"></i>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <div class="messageBox" @click="showMessage">
                                <el-menu
                                        class="site-navbar__menu site-navbar__menu--right"
                                        mode="horizontal">
                                    <el-menu-item index="1" @click="showMessage" style="border-bottom: 2px solid #409eff00;">
                                        <template slot="title">
                                            <div class="el-badge" id="mesCount">
                                                <i class="el-icon-message" style="font-size: 20px;">
                                                </i>
                                                <sup class="el-badge__content is-fixed" v-show="showMesCount">{{mesCount}}</sup>
                                            </div>
                                        </template>
                                    </el-menu-item>
                                </el-menu>
                            </div>
                            <div class="logoutBox" @click="logoutWeb">
                                <Icon type="log-out" size="14" color="#999"></Icon>
                                <span>退出</span>
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <router-view @getMessageCount="getMessageCount"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import util from '@/libs/util.js';
    import myGlobal from '@/components/myGlobal.vue';
    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            myGlobal
        },
        data () {
            return {
                shrink: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                userName: '',
                mesCount: 0,
                showMesCount: false,
                timer:null,
                showPageFlag:false
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            pageTagsList () {
                // console.log('this.$store.state.app.pageOpenedList--------======------',this.$store.state.app.pageOpenedList)
                this.$store.state.app.pageOpenedList = JSON.parse(localStorage.getItem('pageOpenedList'));
                return this.$store.state.app.pageOpenedList;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            }
        },
        methods: {
            init () {
                this.getUser();
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },

            getUser: function () {
                var _this = this;
                this.userName = Cookies.get('user');
                // let userId=sessionStorage.getItem('uid');
                let pathArr = util.setCurrentPath(this, this.$route.name);
                console.log('parthArr---', pathArr);
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.$myHttp({
                    method: 'get',
                    url: this.prefix + '/microarch/sys/sysuser/getAllResources'
                }).then(res => {
                    console.log('main.vue--res--', res);
                    myGlobal.permission = res.data.rows;
                    window.localStorage.setItem('permissionList', JSON.stringify(res.data.rows));
                });
            },
            logoutWeb () {
                this.$router.push({
                    name: 'login'
                });
                sessionStorage.clear();
                localStorage.clear();
                this.$store.state.app.routers.splice(1);
                this.$store.commit('clearAllTags');// 清除上次登录后打开的标签
                util.clearSearchForm(this.$store.state.oppoListSearchData, this.$store.state.projectListCostSearchData, this.$store.state.projectListSearchData);
                this.$store.state.oppoListQueryData={};//清空商机信息管理页和项目信息管理页查询条件
                this.$store.state.projectListQueryData={};
                this.$store.state.reportListQueryData={};//项目月报
            },
            /* 退出登录与修改密码跳转 */
            handleCommand (command) {
                if (command == 'handleClickUserDropdown') {
                    // window.location = this.prefix + 'sys/logout';
                    this.$router.push({
                        name: 'login'
                    });
                    sessionStorage.clear();
                    localStorage.clear();
                    // console.log('frontRouters:',this.$store.state.app.routers)
                    this.$store.state.app.routers.splice(1);
                    this.$store.commit('clearAllTags');// 清除上次登录后打开的标签
                    // console.log('afterRouters:',this.$store.state.app.routers)
                }
                if (command == 'ChangePassword') {
                    this.$router.push({
                        name: 'changePassword'
                    });
                }
                util.clearSearchForm(this.$store.state.oppoListSearchData, this.$store.state.projectListCostSearchData, this.$store.state.projectListSearchData);
                this.$store.state.oppoListQueryData={};//清空商机信息管理页和项目信息管理页查询条件
                this.$store.state.projectListQueryData={};
                this.$store.state.reportListQueryData={};//项目月报
            },

            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            getSysDict () {
                this.$myHttp({
                    method: 'POST',
                    url: this.permissionPrefix + '/microarch/sys/sysDictHead/find',
                    data: {
                        'entity': {}
                    }
                }).then(res => {
                    localStorage.setItem('sysDict', JSON.stringify(res.data.rows));
                    console.log('sysDict---', res);
                });
            },
            getMessageCount () {
                this.$myHttp({
                    method: 'GET',
                    url: this.prefix + '/microarch/sys/message/countsUnread/'+sessionStorage.getItem('userName'),
                    data: {}
                }).then(res => {
                    this.mesCount = res.data
                    if(res.data >0 ) {
                        this.showMesCount = true
                    }else{
                        this.showMesCount = false
                    }
                });
            },
            showMessage () {
                this.$router.push({
                    name: 'sys/message/messageList'
                });
            },
            goIndex(){
                this.$router.push({
                    name:'home_index'
                })
            }
        },
        watch: {
            $route (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                localStorage.currentPageName = to.name;
            }
        },
        beforeMount() {
            //设置定时器，每30秒刷新一次
            // this.timer = setInterval(this.getMessageCount,30*1000);
        },
        beforeDestroy() {
            // clearInterval(this.timer);
            // this.timer = null;
        },
        mounted () {
            this.init();
            this.getSysDict();
            this.getMessageCount();
        }
    };
</script>
<style scoped>
.logoutBox{
    margin-left:10px;
    border-left:1px solid #ccc;
    padding-left:15px;
    cursor: pointer;
}
    .logoutBox span{
        margin-left:5px;
        font-size: 14px;
    }

.messageBox{
    /*margin-left:10px;*/
    /*!*border-left:1px solid #ccc;*!*/
    /*padding-left:15px;*/
    cursor: pointer;
}
.topbar-btn-notice-num {
    font-size: 10px;
    color: #fff;
    background: #f54743;
    border-radius: 7px;
    padding: 1px 3px;
    position: absolute;
    line-height: 1;
    top: -6px;
    z-index: 9;
    margin-left: -3px;
    margin-top: 0;
    white-space: nowrap;
}
.el-menu-item {

    float: left;
    height: 45px;
    line-height: 45px;
    margin: 0;
    border-bottom: 2px solid transparent;
    border-bottom-color: transparent;
    color: #909399;

}
</style>
<style>
    #mesCount .el-badge__content.is-fixed{

        position: absolute;
        top: 14px;
        right: 15px;
        -webkit-transform: translateY(-50%) translateX(100%);
        transform: translateY(-50%) translateX(100%);

    }
    #mesCount .el-badge__content {
        background-color: #f56c6c;
        border-radius: 7px;
        color: #fff;
        display: inline-block;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
        border: 1px solid #fff;
    }
</style>