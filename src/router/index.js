import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {  
        path: '/',
        name: 'Home',
        component: () => import('../pages/Home.vue'),
        meta: { title: 'Mercado' }
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('../pages/products/Index.vue'),
        meta: { title: 'Products' }
    },
    {
        path: '/products/create',
        name: 'ProductsCreate',
        component: () => import('../pages/products/Create.vue'),
        meta: { title: 'Novo Produto' }
    },
    {
        path: '/product-types',
        name: 'ProductTypes',
        component: () => import('../pages/product-types/Index.vue'),
        meta: { title: 'Tipos de Produto' }
    },
    {
        path: '/product-types/create',
        name: 'ProductTypesCreate',
        component: () => import('../pages/product-types/Create.vue'),
        meta: { title: 'Novo tipo de produto' }
    },
    {
        path: '/sales',
        name: 'Sales',
        component: () => import('../pages/sales/Index.vue'),
        meta: { title: 'Ultimas Vendas' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Mercado'
    next()
})

export default router