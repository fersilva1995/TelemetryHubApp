import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import { routes } from './routes';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { i18n } from './lang/lang'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {Display} from './Utils/Display.js'
import {Groups} from './Utils/Groups.js'


Display.start()
Vue.prototype.$display = Display

Groups.start()
Vue.prototype.$group = Groups

Vue.use(VueResource); 
Vue.http.options.root = 'http://localhost:8080';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const router = new VueRouter({ 
  routes, 
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  i18n.locale = localStorage.getItem('language') || 'en'
  return next()
})

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
