<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" class="form-contain">
            <el-form-item label="班级Id">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="班级名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="班级介绍">
                <el-input type="textarea" v-model="form.info"></el-input>
            </el-form-item>

            <el-form-item label="班级人数">
                <el-input v-model="form.count"></el-input>
            </el-form-item>

            <el-form-item label="班级创建人">
                <el-input v-model="form.creator"></el-input>
            </el-form-item>

            <!-- <el-form-item>
                <el-button type="info" @click="onSubmit">注册班级</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item> -->
        </el-form>

        <el-row>
            <div class="grid-content">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>班级成员</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>
                    <div class="text item" >
                        <el-table
                            ref="multipleTable"
                            :data="clubPersons"
                            border
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column
                                type="selection">
                            </el-table-column>

                            <el-table-column
                                prop="id"
                                label="id" header-align="center" align="center">
                            </el-table-column>

                            <el-table-column
                                prop="user_id"
                                label="用户id" header-align="center" align="center">
                            </el-table-column>

                            <el-table-column
                                prop="club_id"
                                label="班级id" header-align="center" align="center">
                            </el-table-column>

                            <el-table-column
                                width="160"
                                label="加入日期" header-align="center" align="center">
                                <template scope="scope">
                                    <el-icon name="time"></el-icon>
                                    <span style="margin-left: 10px">{{ scope.row.create_time}}</span>
                                </template>
                            </el-table-column>

                            <!-- <el-table-column label="状态" header-align="center" align="center">
                                <template scope="scope">
                                    <span>{{ scope.row.status == 0 ? '审核中' : (scope.row.status == 1 ? '审核通过' : '审核失败') }}</span>
                                </template>
                            </el-table-column> -->

                            <!-- <el-table-column label="操作" header-align="center" align="center">
                                <template scope="scope">
                                    <el-button
                                        size="small"
                                        type="danger"
                                        v-show="scope.row.status != 0"
                                        @click="handleStatus(scope.row, 0)">删除
                                    </el-button>

                                    <el-button
                                        size="small"
                                        type="success"
                                        v-show="scope.row.status == 0"
                                        @click="handleStatus(scope.row, 1)">审核
                                    </el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                    </div>
                </el-card>
            </div>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: 'club-info',
        computed: {
            user () {
                return this.$store.state.user;
            }
        },
        data() {
            //console.log(this.user);
            return {
                form: {
                    id: this.$route.params.id,
                    name: '',
                    info: '',
                    creator: '',
                    count: 0,
                    create_time: ''

                }, 
                clubPersons: []
            }
        },
        methods: {
            onSubmit () {
                //console.log(this.user);
                if (!this.form.name) {
                    this.$message.warning('请填写完整信息');
                    return;
                }

                this.form.creator = this.user.user_id;
                if(this.$route.params.id == 0){
                    this.func.ajaxPost(this.api.clubAdd, this.form, res => {
                        if (res.data.code === 200) {
                            this.$message.success('添加班级成功');
                            this.$router.push('/admin/club-list');
                        }
                    });
                }
                //console.log(this.form);
            },

            getParams () {
                // 将数据放在当前组件的数据内
                this.form.id = this.$route.query.club_id;
            },

            onCancel() {

            },

            handleStatus(row, type){
                if(type === 0){
                    this.func.ajaxPost(this.api.deleteClubUser, {id: row.id}, res => {
                        if (res.data.code === 200) {
                            let index = this.clubPersons.indexOf(row);
                            this.clubPersons.splice(index, 1);
                            this.$message.success('删除成功');
                        }
                    });
                }else if(type === 1){
                    this.$confirm('确定审核通过该成员加入吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'info'
                    }).then(() => {
                        this.func.ajaxPost(this.api.updateClubUser, {id: row.id, status: 1}, res => {
                            console.log(res);
                            if (res.data.code === 200) {
                                let index = this.clubPersons.indexOf(row);
                                this.clubPersons[index].status = 1;
                                this.$message({type: 'success', message: '审核成功!'});
                            }
                        });
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '取消审核'
                      });          
                    });
                }
            },

            fetch(){
               this.func.ajaxPost(this.api.clubDetail, {id: this.form.id}, res => {
                    if (res.data.code === 200) {
                        var data = res.data.club;
                        console.log(res.data);
                        for(var key in this.form){
                            this.form[key] = data.club[key];
                        }
                        this.clubPersons = data.clubPersons;

                        console.log(this.form);
                    }
                }); 
            }

        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            //'$route': 'getParams'
        },
        created () {
            this.fetch();
        }

    }
</script>