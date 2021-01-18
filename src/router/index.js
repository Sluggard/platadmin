import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '/userGroup',
        name: 'userGroup',
        meta: {
          title: '用户组管理'
        },
        component: () => import('@/views/sys/UpmsUserGroup.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/sys/upmsuser/Index.vue')
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: {
          title: '编辑用户'
        },
        component: () => import('@/views/sys/upmsuser/UserInfo.vue')
      },
      {
        path: '/organization',
        name: 'organization',
        meta: {
          title: '组织管理'
        },
        component: () => import('@/views/sys/UpmsOrganization.vue')
      },
      {
        path: '/department',
        name: 'department',
        meta: {
          title: '职位管理'
        },
        component: () => import('@/views/sys/UpmsDepartment.vue')
      },
      {
        path: '/role',
        name: 'role',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/views/sys/UpmsRole.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        meta: {
          title: '菜单管理'
        },
        component: () => import('@/views/sys/UpmsMenu.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        meta: {
          title: '资源管理'
        },
        component: () => import('@/views/sys/UpmsResource.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
