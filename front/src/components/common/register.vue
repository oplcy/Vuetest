<template>
    <div class="register">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-form">
            <el-form-item label="账号" prop="name">
                <el-input type="text" v-model="loginForm.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="类型">
                <el-radio-group v-model="loginForm.type">
                  <el-radio label="2">学生</el-radio>
                  <el-radio label="1">教师</el-radio>
                  <el-radio label="0">管理员</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="info" @click="register('loginForm')">注册</el-button>
                <el-button type="primary" @click="cancel('loginForm')" style="float:right">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'login',
        
        data() {
            return {
                loginForm: {
                    name: '',
                    pass: '',
                    type: '2'
                },
                rules: {
                    user_name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    pass: [{required: true, message: '请输入密码', trigger: 'blur'}],
                }
            };
        },
        
        methods: {
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.loginForm);
                        this.func.ajaxPost(this.api.userRegister, this.loginForm, res => {

                            if (res.data.code === 200) {
                                this.$message.success('注册成功');
                                this.$router.push('/');

                            }

                        });

                    }
                });
            },
            
            cancel(formName) {
                this.$router.push('/');
            }
        },

        created () {
            if (this.$store.state.user) {
                this.$router.push('/admin');
            }
        },

    }
</script>