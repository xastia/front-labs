import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import UserProfile from '../views/UserProfile.vue';
import PostDetails from '../views/PostDetails.vue';

const routes = [
    { path: '/', name: 'Home', redirect: '/login' },
    { path: '/login', name: 'UserLogin', component: UserLogin },
    { path: '/register', name: 'UserRegister', component: UserRegister },
    { path: '/users/:username', name: 'UserProfile', component: UserProfile },
    { path: '/users/:username/posts/:postId', name: 'PostDetails', component: PostDetails, },
    { path: '/users/:username/posts', name: 'UserProfile', component: UserProfile, },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

