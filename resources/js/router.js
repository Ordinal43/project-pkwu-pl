import Vue from 'vue'
import VueRouter from 'vue-router'
// Admin Pages
Vue.use(VueRouter)

const routes = [
    { 
        path:'/', 
        component: () => import('./components/RootCustomer' /* webpackChunkName: "js/chunk-root-customer" */),
        children: [
            { 
                path: '/', 
                component: () => import('./components/Customer/AppBazaar' /* webpackChunkName: "js/chunk-app-bazaar" */),
            },
            { 
                path: '/stands', 
                component: () => import('./components/Customer/AppAllStands' /* webpackChunkName: "js/chunk-app-all-stands" */),
            },
            { 
                path: '/products',
                component: () => import('./components/Customer/AppAllProducts' /* webpackChunkName: "js/chunk-app-all-products" */),
            },
            { 
                path: '/stands/:stand', 
                component: () => import('./components/Customer/AppStand' /* webpackChunkName: "js/chunk-app-stand" */),
            },
        ]
    },
    { 
        path:'/admin',
        component: () => import('./components/RootAdmin' /* webpackChunkName: "js/chunk-root-admin" */),
        children: [
            { 
                path: '/login', 
                component: () => import('./components/Admin/AppLogin' /* webpackChunkName: "js/chunk-app-login" */),
            },
            { 
                path: '/register', 
                component: () => import('./components/Admin/AppRegister' /* webpackChunkName: "js/chunk-app-register" */), 
            },
            { 
                path: '/admin', 
                component: () => import('./components/Admin/AppDashboard' /* webpackChunkName: "js/chunk-app-dashboard" */), 
                children: [
                    { 
                        path: '/admin', 
                        redirect: 'stands' 
                    },
                    { 
                        path: 'stands', 
                        component: () => import('./components/Admin/Pages/AppAdminStand' /* webpackChunkName: "js/chunk-app-admin-stand" */), 
                    },
                    { 
                        path: 'stands/:stand', 
                        component: () => import('./components/Admin/Pages/AppStandDetails' /* webpackChunkName: "js/chunk-app-stand-details" */), 
                        props: true
                    },
                    { 
                        path: 'transactions', 
                        component: () => import('./components/Admin/Pages/AppAdminTransaction' /* webpackChunkName: "js/chunk-app-admin-transaction" */), 
                    },
                ],
                meta: { requiresAuth: true },
            },
        ],
    },
]

const router = new VueRouter({
    routes,
    hashbang: false,
    mode: 'history',
})

import User from './helpers/User';

router.beforeEach(async (to, from, next) => {
    if(to.matched.some(route => route.meta.requiresAuth)) {
        if(!User.loggedIn()) {
            next({path: '/login', replace: true})
            return
        }
    }
    
    if(to.path === "/login" || to.path === "/register") {
        if(User.loggedIn()) {
            next({path: '/admin', replace: true})
            return
        }
    }

    next();
})

export default router;