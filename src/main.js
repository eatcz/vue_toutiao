import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Button , NavBar , PullRefresh  , Form , Field , Tabbar, TabbarItem , Loading , Icon , Tab, Tabs , Cell , List } from 'vant';
Vue.use(Button)
Vue.use(NavBar )
Vue.use(Form )
Vue.use(Field)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Loading )
Vue.use(Icon)
Vue.use(Tab )
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh )
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
