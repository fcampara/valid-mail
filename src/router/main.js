const home = {name: 'Home', icon: 'home', link: ''}
const list = {name: 'Listas', icon: 'list', link: ''}
const listValid = { name: 'Lista validada', icon: 'spellcheck', link: '' }

export const main = {
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
          breadcrumb: [ home ]
        }
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('pages/list'),
        meta: {
          breadcrumb: [ home, list ]
        }
      },
      {
        path: '/list/:id',
        name: 'listDetails',
        component: () => import('pages/listDetails'),
        meta: {
          breadcrumb: [home, list, listValid]
        }
      }
    ]
}
