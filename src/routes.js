import Login from './components/login/_Login.vue';
import Dashboard from './components/dashboard/_Dashboard.vue'
import Map from './components/dashboard/novoDashboard.vue'

export const routes = [
    { path: '/login', name: 'login', component: Login, title: 'Login', menu: true},
    { path: '/dashboard', name: 'dashboard', component: Dashboard, title: 'Dashboard', menu: true},
    { path: '/teste', name: 'Map-teste', component: Map, title: 'Map', menu: true},
];