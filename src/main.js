import {createApp} from "vue";
import {createWebHistory, createRouter} from "vue-router";

require('./resources/js/bootstrap')
import store from './resources/js/store/index'

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// Views

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import Posts from "@/views/posts/Index";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import MyPosts from "@/views/posts/MyPosts";
import CreatePost from "@/views/posts/CreatePost";
import ViewPost from "@/views/posts/ViewPost";
import AdminPosts from "@/views/admin/AdminPosts";

// routes

const routes = [
    {
        path: "/",
        redirect: "/posts",
        component: Admin,
        meta: {
            middleware: "auth"
        },
        children: [
            {
                name: 'posts',
                path: "/posts",
                component: Posts,
                meta: {
                    title: `Posts`
                }
            },
            {
                name: 'my_posts',
                path: "/posts/me",
                component: MyPosts,
                meta: {
                    title: `My Posts`
                }
            },
            {
                name: 'create_post',
                path: "/posts/create",
                component: CreatePost,
                meta: {
                    title: `Create Post`
                }
            },
            {
                name: 'view_post',
                path: "/posts/view/:id",
                component: ViewPost,
                meta: {
                    title: `View Post`
                }
            },
        ],
    },
    {
        path: "/admin",
        redirect: "/admin/posts",
        component: Admin,
        meta: {
            middleware: "admin"
        },
        children: [
            {
                name: 'admin_posts',
                path: "/admin/posts",
                component: AdminPosts,
                meta: {
                    title: `Admin Posts`
                }
            },
        ],
    },
    {
        path: "/auth",
        redirect: "/auth/login",
        component: Auth,
        meta: {
            middleware: "guest"
        },
        children: [
            {
                name: "login",
                path: "/auth/login",
                component: Login,
                meta: {
                    title: `Login`
                }
            },
            {
                path: "/auth/register",
                component: Register,
                meta: {
                    title: `Register`
                }
            },
        ],
    },
    {path: "/:pathMatch(.*)*", redirect: "/auth/login"},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// permissions
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - ${process.env.MIX_APP_NAME}`
    if (to.meta.middleware === "guest") {
        if (store.state.auth.authenticated) {
            next({name: "posts"})
        }
        next()
    } else if (to.meta.middleware === "auth") {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({name: "login"})
        }
    } else if (to.meta.middleware === "admin") {
        if (store.state.auth.user.role === 1) {
            next()
        } else {
            next({name: "login"})
        }
    }
})
export default createApp(App).use(router).use(store).mount("#app");
