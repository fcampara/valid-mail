export default [
  { // Auth Routes
    path: '/auth',
    redirect: 'auth/sign-in',
    component: () => import('layouts/auth'),
    children:
    [
      { path: 'sign-in', name: 'signIn', component: () => import('pages/auth/sign-in') },
      { path: 'sign-up', name: 'signUp', component: () => import('pages/auth/sign-up') }
    ]
  },
  { // Main Routes
    path: '/',
    redirect: '/home',
    component: () => import('layouts/default'),
    meta: { authRequired: true },
    children:
    [
      {
        path: '/home',
        name: 'home',
        component: () => import('pages/index'),
        meta: {
          breadcrumb: [
            {name: 'Home', icon: 'home', link: ''}
          ]
        }
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('pages/list'),
        meta: {
          breadcrumb: [
            {name: 'Home', icon: 'home', link: '/home'},
            {name: 'Listas', icon: 'list', link: ''}
          ]
        }
      },
      {
        path: '/list/:id',
        name: 'listDetails',
        component: () => import('pages/listDetails'),
        meta: {
          breadcrumb: [
            { name: 'Home', icon: 'home', link: '/home' },
            { name: 'Listas', icon: 'list', link: '/list' },
            { name: 'Lista validada', icon: 'spellcheck', link: '' }
          ]
        }
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
