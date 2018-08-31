export const auth = { // Auth Routes
  path: '/auth',
  redirect: '/',
  component: () => import('layouts/auth'),
  children:
        [
          { path: '/', name: 'auth', component: () => import('pages/auth/app') },
          { path: 'recovery', name: 'recovery', component: () => import('pages/auth/recovery') }
        ]
}
