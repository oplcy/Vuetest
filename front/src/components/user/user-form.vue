<template>
    <el-form ref="form" :model="form" label-width="80px" class="form-contain">
        <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="密码">
            <el-input v-model="form.pass"></el-input>
        </el-form-item>

        <el-form-item label="用户类型">
            <el-radio-group v-model="form.type">
                <el-radio label="2" value="2">学生</el-radio>
                <el-radio label="1" value="1">教师</el-radio>
                <el-radio label="0" value="0">管理员</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

    export default {
        name: 'form',
        data() {
            return {
                form: {
                    name: '',
                    pass: '',
                    type: 0,
                }
            }
        },
        methods: {
            getInfo(){
                if(this.$route.params.id == 0){
                    return;
                }
                this.func.ajaxPost(this.api.userDetail, {id: this.$route.params.id}, res => {
                    if (res.data.code === 200) {
                        console.log(res.data);
                        let data = res.data.data;
                        this.form.name = data.user_name;
                        this.form.type = data.type;
                    }
                });
            },
            onSubmit () {
                if (!this.form.name) {
                    this.$message.warning('请填写完整信息');
                    return;
                }
                if(this.$route.params.id == 0){
                    this.func.ajaxPost(this.api.userAdd, this.form, res => {
                        if (res.data.code === 200) {
                            this.$message.success('操作成功');
                            this.$router.push('/admin/user-list');
                        }
                    });
                }else{
                    this.form.id = this.$route.params.id;
                    this.func.ajaxPost(this.api.userUpdate, this.form, res => {
                        if (res.data.code === 200) {
                            this.$message.success('操作成功');
                            this.$router.push('/admin/user-list');
                        }
                    });
                }
            },

            onCancel () {
                this.$router.push('/admin/user-list');
            },

        },
        created () {
            // console.log(this.$route.params.id);
            this.getInfo();
        },

    }
</script>