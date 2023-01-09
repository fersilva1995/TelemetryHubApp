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
import vSelect from 'vue-select'
import VueSidebarMenu from 'vue-sidebar-menu'
import VueResizeText from 'vue-resize-text';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


import {Display}                          from '../../../UtilsTelemetry/Display.js'
import {Groups}                           from '../../../UtilsTelemetry/Groups.js'

import action                             from '../../../UtilsTelemetry/domain/action/Action' 
import actionService                      from '../../../UtilsTelemetry/domain/action/ActionService' 

import alarm                              from '../../../UtilsTelemetry/domain/alarm/Alarm' 
import alarmService                       from '../../../UtilsTelemetry/domain/alarm/AlarmService' 

import alarmConfiguration                 from '../../../UtilsTelemetry/domain/alarmConfiguration/AlarmConfiguration' 
import alarmConfigurationService          from '../../../UtilsTelemetry/domain/alarmConfiguration/AlarmConfigurationService' 

import colorConfig                        from '../../../UtilsTelemetry/domain/colorConfig/ColorConfig' 
import colorConfigService                 from '../../../UtilsTelemetry/domain/colorConfig/ColorConfigService' 

import condition                          from '../../../UtilsTelemetry/domain/condition/Condition' 
import conditionService                   from '../../../UtilsTelemetry/domain/condition/ConditionService' 

import dashboard                          from '../../../UtilsTelemetry/domain/dashboard/Dashboard' 
import dashboardService                   from '../../../UtilsTelemetry/domain/dashboard/DashboardService' 

import devices                            from '../../../UtilsTelemetry/domain/devices/Devices' 
import devicesService                     from '../../../UtilsTelemetry/domain/devices/DevicesService' 

import display                            from '../../../UtilsTelemetry/domain/display/Display' 
import displayService                     from '../../../UtilsTelemetry/domain/display/DisplayService' 

import equipaments                        from "../../../UtilsTelemetry/domain/equipaments/Equipaments"
import equipamentsHeader                  from "../../../UtilsTelemetry/domain/equipaments/EquipamentsHeader"
import equipamentsService                 from "../../../UtilsTelemetry/domain/equipaments/EquipamentsService"

import group                              from "../../../UtilsTelemetry/domain/group/Group.js"
import groupService                       from '../../../UtilsTelemetry/domain/group/GroupsService'
import groupHeader                        from '../../../UtilsTelemetry/domain/group/GroupHeader' 

import layer                              from '../../../UtilsTelemetry/domain/layer/Layer' 
import layerService                       from '../../../UtilsTelemetry/domain/layer/LayerService' 

import measurer                           from '../../../UtilsTelemetry/domain/measurer/Measurer' 
import measurerService                    from '../../../UtilsTelemetry/domain/measurer/MeasurerService' 

import recipient                          from '../../../UtilsTelemetry/domain/recipient/Recipient' 
import recipientService                   from '../../../UtilsTelemetry/domain/recipient/RecipientService' 

import schedule                           from '../../../UtilsTelemetry/domain/schedule/Schedule' 
import scheduleService                    from '../../../UtilsTelemetry/domain/schedule/ScheduleService' 

import updater                            from '../../../UtilsTelemetry/domain/updater/Updater' 
import updaterService                     from '../../../UtilsTelemetry/domain/updater/UpdaterService' 

import user                               from '../../../UtilsTelemetry/domain/user/User' 
import userService                        from '../../../UtilsTelemetry/domain/user/UserService' 
import userHeader                         from '../../../UtilsTelemetry/domain/user/UserHeader' 

import variable                           from '../../../UtilsTelemetry/domain/variable/Variable' 
import variableService                    from '../../../UtilsTelemetry/domain/variable/VariableService' 

import variableCodes                      from '../../../UtilsTelemetry/domain/variableCodes/VariableCodes' 
import variableCodesService               from '../../../UtilsTelemetry/domain/variableCodes/VariableCodesService' 



Display.start()
Vue.prototype.$displaysT = Display

Groups.start()
Vue.prototype.$groupsT = Groups


Vue.prototype.$action = action;
Vue.prototype.$actionService = actionService;

Vue.prototype.$alarm = alarm;
Vue.prototype.$alarmService = alarmService;

Vue.prototype.$alarmConfiguration = alarmConfiguration
Vue.prototype.$alarmConfigurationService = alarmConfigurationService

Vue.prototype.$colorConfig = colorConfig;
Vue.prototype.$colorConfigService = colorConfigService;

Vue.prototype.$condition = condition;
Vue.prototype.$conditionService = conditionService;

Vue.prototype.$dashboard = dashboard;
Vue.prototype.$dashboardService = dashboardService;

Vue.prototype.$devices = devices;
Vue.prototype.$devicesService = devicesService;

Vue.prototype.$display = display;
Vue.prototype.$displayService = displayService;

Vue.prototype.$equipaments = equipaments;
Vue.prototype.$equipamentsHeader = equipamentsHeader;
Vue.prototype.$equipamentsService = equipamentsService;

Vue.prototype.$group = group; 
Vue.prototype.$groupService = groupService;
Vue.prototype.$groupHeader = groupHeader;

Vue.prototype.$layer = layer;
Vue.prototype.$layerService = layerService;

Vue.prototype.$measurer = measurer;
Vue.prototype.$measurerService = measurerService;

Vue.prototype.$recipient = recipient;
Vue.prototype.$recipientService = recipientService;

Vue.prototype.$schedule = schedule;
Vue.prototype.$scheduleService = scheduleService;

Vue.prototype.$updater = updater;
Vue.prototype.$updaterService = updaterService;

Vue.prototype.$user = user;
Vue.prototype.$userService = userService;
Vue.prototype.$userHeader = userHeader;

Vue.prototype.$variable = variable;
Vue.prototype.$variableService = variableService;

Vue.prototype.$variableCodes = variableCodes;
Vue.prototype.$variableCodesService = variableCodesService;

Vue.use(VueResource); 
Vue.http.options.root = 'http://localhost:8080';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueResizeText)

Vue.component('v-select', vSelect)
Vue.use(VueSidebarMenu)

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
