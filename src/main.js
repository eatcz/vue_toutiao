import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Button , NavBar , Form , Field , Tabbar, TabbarItem , Loading , Icon } from 'vant';
Vue.use(Button)
Vue.use(NavBar )
Vue.use(Form )
Vue.use(Field)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Loading )
Vue.use(Icon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
