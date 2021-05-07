<template>
    <div class="admin-list">
        <el-table
            v-loading='load'
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
                type="selection">
            </el-table-column>

            <el-table-column
                prop="user_name"
                label="用户名" header-align="center" align="center">
            </el-table-column>

            <el-table-column
                width="160"
                label="添加日期" header-align="center" align="center">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="type"
                label="用户类型" header-align="center" align="center">
            </el-table-column>


            <el-table-column label="操作" header-align="center" align="center">
                <template scope="scope">

                    <!-- <el-dropdown trigger="click" @command="changeRole">
                        <el-button size="small"
                                   @click='curRow = scope.row'>
                            修改权限<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for='role in roles'
                                              :key='role.val'
                                              :command="role.val"
                                              :disabled="scope.row.role == role.txt">{{ role.txt }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <el-button
                        size="small"
                        type="info"
                        @click="handleEdit(scope.row)">修改
                    </el-button>

                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)">删除
                    </el-button>

                </template>
            </el-table-column>

        </el-table>
        <!-- <div class="btns">
            <router-link to="/admin/user-form">
                <el-button type="success">新增用户</el-button>
            </router-link>
            <el-button type="danger" @click="deleteMulti">批量删除</el-button>
        </div> -->
    </div>
</template>

<script>

    export default {
        name: 'list',
        data() {
            return {
                tableData: [],

                curRow: null,

                load: false, // loading
            }
        },

        methods: {
            fetchList () {
                this.load = true;

                this.func.ajaxGet(this.api.userList, {}, res => {
                    this.tableData = res.data.users;
                    //console.log(this.tableData);
                    this.load = false;
                });
            },

            // 删除
            handleDelete(row) {
                this.func.ajaxPost(this.api.userDelete, {id: row.id}, res => {
                    if (res.data.code === 200) {
                        let index = this.tableData.indexOf(row);
                        this.tableData.splice(index, 1);
                        this.$message.success('删除成功');
                    }
                });
            },

            // 编辑
            handleEdit(row) {
                this.$router.push('/admin/user-form/' + row.id);
            },

            deleteMulti () {
                let multi = this.multipleSelection
                let id = multi.map(el => {
                    return el.id;
                });

                this.func.ajaxPost(this.api.userDeleteMulti, {id}, res => {
                    if (res.data.code === 200) {
                        this.$message.success('删除成功');
                        multi.forEach(el => {
                            let i = this.tableData.indexOf(el);
                            this.tableData.splice(i, 1);
                        });
                    }
                });
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },

        created () {
            this.fetchList();
        },


    }
</script>