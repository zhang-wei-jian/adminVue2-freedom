import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/*** 
注意：只有当路由的子路由数量大于等于1时，子菜单才会显示
详情请见：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
hidden: true 如果设置为 true，菜单项将不会在侧边栏中显示（默认为 false）
alwaysShow: true 如果设置为 true，将始终显示根菜单
markdown
Copy code
                       如果不设置 alwaysShow，在菜单项有多个子路由时，它将变为嵌套模式，否则不会显示根菜单
redirect: noRedirect 如果设置为 noRedirect，在面包屑导航中将不会重定向
name:'router-name' 名称将由 <keep-alive> 使用（必须设置！！！）
meta : {
roles: ['admin','editor'] 控制页面角色（您可以设置多个角色）
title: 'title' 在侧边栏和面包屑中显示的名称（建议设置）
icon: 'svg-name'/'el-icon-x' 在侧边栏中显示的图标
breadcrumb: false 如果设置为 false，该项将在面包屑导航中隐藏（默认为 true）
activeMenu: '/example/list' 如果设置了路径，侧边栏将突出显示您设置的路径
}
*/ /**

constantRoutes
一个不需要权限要求的基本页面
所有角色都可以访问
*/
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  // {
  //   path: "/",
  //   component: Layout,
  //   redirect: "/dashboard",
  //   children: [
  //     {
  //       path: "dashboard",
  //       name: "Dashboard",
  //       component: () => import("@/views/dashboard/index"),
  //       meta: { title: "Dashboard", icon: "dashboard" },
  //     },
  //   ],
  // },
  /////我自己的开始///////////
  {
    path: "/",
    // component: Layout,
    redirect: "/manage",
  },
  {
    path: "/manage",
    name: "manage",
    redirect: "/manage/trademark",
    meta: {
      title: "权限管理",
      icon: "el-icon-s-help",
    },
    component: Layout,
    children: [
      {
        path: "/manage/trademark",
        name: "trademark",
        meta: {
          title: "品牌管理",
        },
        component: () => import("@/views/tradeMark/index.vue"),
      },
      {
        path: "/manage/trademarsk",
        name: "trad2emark",
        meta: {
          title: "平台属性管理",
        },
        component: () => import("@/views/typeKey"),
      },
      {
        path: "/manage/spu",
        name: "spu",
        meta: {
          title: "SPU管理",
        },
        component: () => import("@/views/SPU/index.vue"),
        // component: () => import("@/views/tradeMark/index.vue"),
      },
      {
        path: "/manage/trademadasrk",
        name: "tradedsmark",
        meta: {
          title: "SKU管理",
        },
        // component: () => import("@/views/tradeMark/index.vue"),
        component: () => import("@/views/tradeMark/index.vue"),
      },
    ],
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
