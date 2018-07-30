
export default [
  { // Auth Routes
    path: '/auth',
    redirect: 'auth/sign-in',
    component: () => import('layouts/auth'),
    children:
    [
      { path: 'sign-in', name: 'signIn', component: () => import('pages/auth/sign-in') }
    ]
  },

  { // Main Routes
    path: '/',
    component: () => import('layouts/default'),
    meta: { authRequired: true },
    children:
    [
      { path: '/dashboard', name: 'dashboard', component: () => import('pages/index') },
      { path: '/list', name: 'list', component: () => import('pages/list') },
      { path: '/list/:id', name: 'listDetails', component: () => import('pages/listDetails') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
