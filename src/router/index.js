import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeAuth from '../components/HomeAuth'
import HomeVisitor from '../components/HomeVisitor'
import HomeView from '../views/HomeView.vue'
import LogadoView from '../views/LogadoView.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import EditarPerfilView from "../views/EditarPerfilView.vue"
import CriarUsuarioView from "../views/CriarUsuarioView.vue"
import EquipeView from "../views/EquipeView.vue"
import { getAuth } from "firebase/auth"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homevisitor',
    component: HomeVisitor
  }, 
  {
    path: '/homeauth',
    name: 'homeauth',
    component: LogadoView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: '/registrar',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/editar-perfil',
    name: 'editar-perfil',
    component: EditarPerfilView
  },
  {
    path: '/criar-usuario',
    name: 'criar-usuario',
    component: CriarUsuarioView
  },
  {
    path: '/equipes',
    name: 'equipes',
    component: EquipeView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) next('/login');
  else next();
});
export default router
 /* eslint-disable */