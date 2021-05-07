<template>
    <div class='admin'>
        <my-header></my-header>

        <div class='admin-main'>
            <div class='admin-main-right'>
                <el-menu theme="dark" class="top-menu">
                    <el-submenu index="1" v-show="user.type == 2">
                        <template slot="title">学生</template>
                        <el-menu-item index="1-1"
                                      @click="controlJump('/admin/club-join', 2)" v-show="user.club_id == 0">加入班级
                        </el-menu-item>
                        <el-menu-item index="1-1"
                                      @click="controlJump('/admin/club-info/' + user.club_id, 2)" v-show="user.club_id > 0">班级详情
                        </el-menu-item>
                        <!-- <el-menu-item index="1-2"
                                      @click="controlJump('/admin/activity-list', 2)">最新活动
                        </el-menu-item> -->
                        <!-- <router-link to="/admin/club-join">
                            <el-menu-item index="1-1">加入社团</el-menu-item>
                        </router-link>
                        
                        <router-link to="/admin/activity-list">
                            <el-menu-item index="1-2">最新活动</el-menu-item>
                        </router-link> -->
                    </el-submenu>

                    <el-submenu index="2" v-show="user.type == 0">
                        <template slot="title">管理员</template>
                        <el-menu-item index="2-1"
                                      @click="controlJump('/admin/activity-list', 0)">活动管理
                        </el-menu-item>

                        <el-menu-item index="2-2"
                                      @click="controlJump('/admin/user-list', 0)">用户管理
                        </el-menu-item>
                        <!-- <el-menu-item index="2-3"
                                      @click="controlJump('/admin/club-form', 0)">添加用户
                        </el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="3" v-show="user.type == 1">
                        <template slot="title">教师</template>
                        <el-menu-item index="3-1"
                                      @click="controlJump('/admin/club-list', 1)">班级管理
                        </el-menu-item>

                        <!-- <el-menu-item index="3-2"
                                      @click="controlJump('/admin/user-list', 1)">成员管理
                        </el-menu-item> -->

                        <el-menu-item index="3-2"
                                      @click="controlJump('/admin/activity-list', 1)">活动管理
                        </el-menu-item>

                        <!-- <el-menu-item index="3-3"
                                      @click="controlJump('/admin/user-list', 3)">留言板
                        </el-menu-item> -->
                    </el-submenu>
                    <el-menu-item index="4-1"
                                      @click="controlJump('/admin/word', 3)">留言板
                    </el-menu-item>
                </el-menu>
            </div>

            <div class='admin-main-left'>
                <router-view v-bind:user="user"></router-view>
            </div>

        </div>
    </div>
</template>

<script>
    import Header from './common/header.vue';

    export default {
        name: 'admin',

        components: {
            'my-header': Header,
        },

        computed: {
            user () {
                return this.$store.state.user;
            }
        },
        data (){
            return {
                //user: this.user
            }
        },
        methods: {
            // 跳转控制
            controlJump (target, type) {
                // if (this.user.type != type && type != 3) {
                //     this.$message.warning('当前用户无此操作权限');

                // } else {
                //     this.$router.push(target);
                // }
                this.$router.push(target);
                //this.$router.push(target);

            }
        },

    }
</script>