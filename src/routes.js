import Login from './components/login/_Login.vue';
import Dashboard from './components/dashboard/_Dashboard.vue'
// import Map from './components/dashboard/novoDashboard.vue'
import Users from "./components/users/UsersIndex.vue"
import Equipaments from "./components/equipaments/EquipamentsIndex.vue"
import Groups from "./components/groups/GroupsIndex.vue"

import teste from "./components/shared/RelationTable.vue"
export const routes = [
    { path: '/login', name: 'login', component: Login, title: 'Login', menu: true},
    { path: '/dashboard', name: 'dashboard', component: Dashboard, title: 'Dashboard', menu: true},
    { path: '/users', name: 'users', component: Users, title: 'Users', menu: true},
    { path: '/equipaments', name: 'equipaments', component: Equipaments, title: 'equipaments', menu: true},
    { path: '/groups', name: 'groups', component: Groups, title: 'groups', menu: true},
    { path: '/teste', name: 'teste', component: teste, title: 'teste', menu: true},
];