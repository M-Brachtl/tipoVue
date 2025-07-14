import { createRouter, createWebHistory } from 'vue-router'

// Importuj komponenty, které chceš routovat
import UserView from '../views/userView.vue'
import GlobalView from '../views/globalView.vue'

const routes = [
  { path: '/', name: 'GlobalView', component: GlobalView },
  { path: '/user', name: 'UserView', component: UserView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
