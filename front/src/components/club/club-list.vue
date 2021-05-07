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
            style="width: 100%"
            >
            <el-table-column
                type="selection" >
            </el-table-column>

            <el-table-column
                prop="name"
                label="班级名称" header-align="center" align="center">
            </el-table-column>

            <el-table-column
                prop="creator"
                label="创建人" header-align="center" align="center">
            </el-table-column>

            <el-table-column
                prop="count"
                label="班级人数" header-align="center" align="center">
            </el-table-column>

            <el-table-column
                width="160"
                label="添加日期" header-align="center" align="center">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>


            <!-- <el-table-column label="状态" header-align="center" align="center">
                <template scope="scope">
                    <span>{{ scope.row.status == 0 ? '审核中' : (scope.row.status == 1 ? '审核通过' : '审核失败') }}</span>
                </template>
            </el-table-column> -->

            <el-table-column label="操作" header-align="center" align="center">
                <template scope="scope">
                    <el-button
                        size="small"
                        type="danger"
                        v-show="scope.row.status != 0"
                        @click="handleDelete(scope.row)">删除
                    </el-button>

                    <!-- <el-button
                        size="small"
                        type="success"
                        v-show="scope.row.status == 0"
                        @click="handleStatus(scope.row)">审核
                    </el-button> -->

                    <el-button
                        size="small"
                        type="info"
                        @click="info(scope.row)">详情
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
            }
        },

        methods: {
            add(){
                this.$router.push('/admin/club-form/0');
            },
            fetchList () {
                this.load = true;

                this.func.ajaxGet(this.api.clubList, {}, res => {
                    this.tableData = res.data.clubs;
                    this.load = false;
                });
            },

            // 删除
            handleDelete(row) {
                this.func.ajaxPost(this.api.clubDelete, {id: row.id}, res => {
                    if (res.data.code === 200) {
                        let index = this.tableData.indexOf(row);
                        this.tableData.splice(index, 1);
                        this.$message.success('删除成功');
                    }
                });
            },

            // 删除
            handleStatus(row) {
                this.$confirm('确定审核通过该社团注册吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'info'
                }).then(() => {
                    this.func.ajaxPost(this.api.update, {id: row.id, status: 1}, res => {
                        if (res.data.code === 200) {
                            let index = this.tableData.indexOf(row);
                            this.tableData[index].status = 1;
                            this.$message({type: 'success', message: '审核成功!'});
                        }
                    });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消审核'
                  });          
                });
            },

            // 查看详情
            info (row) {
                console.log(row);
                this.$router.push({path: '/admin/club-info/' + row.id, params:{club_id: row.id}, query: { club_id: row.id}});
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