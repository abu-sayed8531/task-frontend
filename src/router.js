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
            children : [
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

export default router;