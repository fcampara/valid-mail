import { auth } from './auth'
import { main } from './main'
export default [ auth, main,
  {
    path: '*',
    component: () => import('pages/404')
  }
]
