import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import RegistrationPage from './pages/RegistrationPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import CreateTask from './components/Task/CreateTask.vue';
import NewTask from './components/Task/NewTask.vue';
import EditTask from './components/Task/EditTask.vue';
import ProgressTasks from './components/Task/ProgressTasks.vue';
import CanceledTasks from './components/Task/CanceledTasks.vue';
import CompletedTasks from './components/Task/CompletedTasks.vue';
import TrashedTasks from './components/Task/TrashedTasks.vue';
import SummaryPage from './components/SummaryPage.vue';
import ProfilePage from './components/ProfilePage.vue';
import { useAuthStore } from './stores/authStore';
import NProgress from 'nprogress';


const routes = [
    
         {
            path : '/',
            redirect : '/login',
        },
        {
            path : '/login',
            component : LoginPage,
            name : 'login', 
        },
        {
            path : '/register',
            component : RegistrationPage,
            name : 'register',
        },
        {
            path: '/dashboard',
            component : DashboardPage,
            name : 'dashboard',
            meta : {requiresAuth: true, },
            children : [
                {
                    path: 'profile',
                    component : ProfilePage,
                    name : 'profile',

                },

                {
                      path : 'summary',
                      component : SummaryPage,
                      name : 'summary',
                },
                {
                    path : 'create',
                    component : CreateTask,
                    name : 'create',
                },
                {
                    path : 'new-task',
                    component : NewTask,
                    name : 'new-task',
                },
                {
                     path : 'edit-task/:id',
                     component:EditTask,
                    name : 'edit-task',
                 },
                 {
                    path: 'progress',
                    component : ProgressTasks,
                    name : 'progress',
                 },
                 {
                    path: 'complete',
                    component : CompletedTasks,
                    name: 'complete',
                 },
                 {
                    path : 'cancel',
                    component : CanceledTasks,
                    name : 'cancel',

                 },
                 {
                    path : 'trash',
                    component : TrashedTasks,
                    name : 'trash',
                 }
            ],
        },
        
    
];

const router = createRouter({
    history : createWebHistory(),
    routes,
});

router.beforeEach((to,from,next)=>{
     const auth = useAuthStore();
     const isAuthenticated = auth.isAuthenticated;
      if(to.meta.requiresAuth && ! isAuthenticated){
        next({name :'login'})
      }
      else if((to.name == 'login' || to.name =='register')&& isAuthenticated){
              next({name:'summary'})
      }
      else{
        next();
      }
})

//nprogress;

router.beforeResolve((to,from,next)=>{
     if(to.name){
        NProgress.start();
     }
     next();
})
router.afterEach((to,from,next)=>{
    NProgress.done();
})
NProgress.configure({
  showSpinner: false,
  template:
    '<div class="bar" role="bar" style="background-color: red"><div class="peg"><div class="peg" ></div></div><div  class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
});

export default router;