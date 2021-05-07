<template>
    <el-form ref="form" :model="form" label-width="80px" class="form-contain" style="text-align:center;margin-top:150px;">
        <el-form-item>
            <h1 style="font-size:30px;">班级加入主页</h1>
        </el-form-item>
        <el-form-item>
            <label for="">选择班级：</label>
            <el-select v-model="form.club_id" placeholder="请选择班级">
                <el-option v-for="item in clubs"
                    :label="item.name"
                    :value="item.id" :key="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button type="info" @click="onSubmit">加入班级</el-button>
        </el-form-item>
    </el-form>
    
</template>

<script>

    export default {
        name: 'club-join',
        computed: {
            user () {
                return this.$store.state.user;
            }
        },
        data() {
            return {
                clubs: [],
                form: {
                    club_id: '',
                    user_id: '',
                    status: 0
                }
            }
        },
        methods: {
            fetchList () {
                this.func.ajaxPost(this.api.clubs, {status: 0}, res => {
                    if (res.data.code === 200) {
                        //console.log(res.data.activities);
                        this.clubs = res.data.clubs;
                    }
                });
            },
            onSubmit () {
                this.form.user_id = this.user.user_id;
                console.log(this.form);

                this.func.ajaxPost(this.api.joinClub, this.form, res => {
                    if (res.data.code === 200) {
                        this.$message.success('加入班级成功');
                        this.func.ajaxPost(this.api.userDetail, {id: this.form.user_id}, res => {
                            if (res.data.code === 200) {
                                this.$store.commit('user', res.data.data);
                                this.$router.push('/admin/club-info/' + res.data.data.club_id);
                            }
                        });
                    }
                });
            },

            onCancel () {
                this.$router.push('/admin/club-list');
            },

        },
        created () {
            this.fetchList();
        }

    }
</script>