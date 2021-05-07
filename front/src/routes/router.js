import Vue from "vue";
import Router from "vue-router";
import Admin from "../components/admin.vue";
import Login from "../components/common/login.vue";
import Register from "../components/common/register.vue";
import Index from "../components/index.vue";
import Word from "../components/word.vue";
import ClubForm from "../components/club/club-form.vue";
import ClubList from "../components/club/club-list.vue";
import ClubJoin from "../components/club/club-join.vue";
import ClubInfo from "../components/club/club-info.vue";
import ActivityForm from "../components/activity/activity-form.vue";
import ActivityList from "../components/activity/activity-list.vue";
import UserForm from "../components/user/user-form.vue";
import UserList from "../components/user/user-list.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/admin',
            redirect: '/admin/index',
            component: Admin,
            children: [
                {
                    path: '/admin/index',
                    component: Index
                },
                {
                    path: '/admin/club-form/:id',
                    component: ClubForm
                },
                {
                    path: '/admin/club-list',
                    component: ClubList
                },
                {
                    path: '/admin/club-join',
                    component: ClubJoin
                },
                {
                    path: '/admin/club-info/:id',
                    component: ClubInfo
                },
                {
                    path: '/admin/activity-form/:id',
                    component: ActivityForm
                },
                {
                    path: '/admin/activity-list',
                    component: ActivityList
                },
                {
                    path: '/admin/user-list',
                    component: UserList
                },
                {
                    path: '/admin/user-form/:id',
                    component: UserForm
                },
                {
                    path: '/admin/word',
                    component: Word
                }
            ]
        },
        {
            path: '/',
            component: Login
        },
        {
            path: '/register',
            component: Register
        }
    ]
});