<template lang="pug">
    header
        .wrap.header-wrap
            .logo
                a(href="javascript:void(0)")(@click='toIndex')
                    img(src='../../assets/imgs/logo.svg')
                    //h1(style='font-size:20px;color:white;') 返回首页
            h1(style='font-size:20px;color:white;') 欢迎登陆*******学校管理系统
            .header-links
                li
                    button.btn(@click='login') {{ user ? user.user_name : '登录' }}
                li
                    button.btn(@click='logout') 注销
</template>

<script>
    export default {
        name: 'header',

        computed: {
            user () {
                return this.$store.state.user;
            },
        },

        methods: {
            login () {
                if (!this.user) {
                    this.$router.push('/');
                }
            },

            logout () {
                // this.func.ajaxGet(this.api.userLogout, res => {
                //     if (res.data.code === 200) {
                //         this.$store.commit('user', null);
                //         this.$router.push('/');
                //     }
                // });
                this.$store.commit('user', null);
                this.$router.push('/');
            },
            toIndex (){
                if (this.user) {
                    this.$router.push('/admin/index');
                }
            }
        }

    }
</script>