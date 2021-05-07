<template>
    <div class="login">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-form">
            <el-form-item label="账号" prop="user_name">
                <el-input type="text" v-model="loginForm.user_name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <label @click="toRegister()" style="cursor:pointer;border-bottom: 1px solid white;line-height:30px;color:white">
                    没有账号？去注册
                </label>
                <el-button type="primary" @click="submitForm('loginForm')" style="float:right">登陆</el-button>
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
                    user_name: '',
                    pass: '',
                },
                rules: {
                    user_name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    pass: [{required: true, message: '请输入密码', trigger: 'blur'}],
                }
            };
        },
        
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.func.ajaxPost(this.api.userLogin, this.loginForm, res => {

                            if (res.data.code === 200) {
                                this.$store.commit('user', res.data.user);
                                console.log(res.data.user);
                                this.$message.success('登陆成功');
                                this.$router.push('/admin');

                            }else{
                                this.$message.success('账号或密码错误!!!');
                            }

                        });

                    }
                });
            },
            
            toRegister(formName) {
                this.$router.push('/register');
            }
        },

        created () {
            if (this.$store.state.user) {
                this.$router.push('/admin');
            }
        },

    }
</script>