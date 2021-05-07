<template>
    <div class="admin-list">
        <el-button @click="add">添加</el-button>
        <el-table
            v-loading='load'
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
                type="selection" header-align="center" align="center">
            </el-table-column>

            <el-table-column
                prop="name"
                label="活动名称" header-align="center" align="center">
            </el-table-column>

            <el-table-column
                prop="creator"
                label="活动发起人" header-align="center" align="center">
            </el-table-column>

            <el-table-column
                width="160"
                label="活动开始日期">
                <template scope="scope" header-align="center" align="center">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
                </template>
            </el-table-column>

            <el-table-column
                width="160"
                label="活动结束日期" header-align="center" align="center">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" header-align="center" align="center">
                <template scope="scope">
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)">删除活动
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

                multipleSelection: [],

                curRow: null,

                load: false, // loading
                type: ''
            }
        },

        computed: {
            user () {
                return this.$store.state.user;
            }
        },

        methods: {
            add(){
                this.$router.push('/admin/activity-form/0');
            },
            fetchList () {
                this.load = true;
                this.func.ajaxGet(this.api.activityList, {}, res => {
                    this.tableData = res.data.activities;
                    this.load = false;
                });
            },

            // 删除
            handleDelete(row) {
                //console.log(row.id);
                this.func.ajaxPost(this.api.activityDelete, {id: row.id}, res => {
                    if (res.data.code === 200) {
                        let index = this.tableData.indexOf(row);
                        this.tableData.splice(index, 1);
                        this.$message.success('删除成功');
                    }
                });
            },

            deleteMulti () {
                let multi = this.multipleSelection
                let id = multi.map(el => {
                    return el.id;
                });

                this.func.ajaxPost(this.api.activityDeleteMulti, {id}, res => {
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