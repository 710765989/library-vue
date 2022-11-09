import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '图书馆管理系统', icon: 'dashboard' }
    }]
  },
  {
    path: '/management',
    component: Layout,
    redirect: '/management/list',
    name: 'book',
    meta: { title: '图书管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/book/list/index'),
        meta: { title: '图书列表', icon: 'table' }
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/book/list/edit'),
        meta: { title: '新增/编辑图书', icon: 'form' }
      }
    ]
  },
  {
    path: '/borrow',
    component: Layout,
    redirect: '/borrow/list',
    name: 'my',
    meta: { title: '个人管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/book/borrow/index'),
        meta: { title: '我的借阅', icon: 'table' }
      },
      // {
      //   path: 'return',
      //   name: 'return',
      //   component: () => import('@/views/book/list/edit'),
      //   meta: { title: '归还图书', icon: 'form' }
      // },
      // {
      //   path: 'renewal',
      //   name: 'renewal',
      //   component: () => import('@/views/book/list/edit'),
      //   meta: { title: '图书续借', icon: 'form' }
      // },
      {
        path: 'delay',
        name: 'delay',
        component: () => import('@/views/book/delay/index'),
        meta: { title: '延期记录', icon: 'table' }
      },
      {
        path: 'borrow',
        name: 'borrow',
        component: () => import('@/views/book/borrow/borrow')
        // meta: { title: '图书借阅', icon: 'form' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/list',
    name: 'system',
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', icon: 'user' }
      },
      // {
      //   path: 'return',
      //   name: 'return',
      //   component: () => import('@/views/book/list/edit'),
      //   meta: { title: '归还图书', icon: 'form' }
      // },
      // {
      //   path: 'renewal',
      //   name: 'renewal',
      //   component: () => import('@/views/book/list/edit'),
      //   meta: { title: '图书续借', icon: 'form' }
      // },
      // {
      //   path: 'permission',
      //   name: 'permission',
      //   component: () => import('@/views/system/permission'),
      //   meta: { title: '权限管理', icon: 'table' }
      // },
      {
        path: 'password',
        name: 'password',
        component: () => import('@/views/system/password'),
        meta: { title: '修改密码', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
