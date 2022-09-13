import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Button , NavBar , PullRefresh  , Form , Field , Tabbar, TabbarItem , Loading , Icon , Tab, Tabs , Cell , List , ActionSheet , Popup , Row , Col , Badge , Search  , Divider} from 'vant';
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
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Search)
Vue.use(Divider)
Vue.config.productionTip = false

// 封装中间件函数插件
const directive = {
  install(Vue) {
    // 自定义指令
    Vue.directive('focus' , {
      inserted(el) {
        // 指令所在van-search组件 根标签是div input在其内部
        // 以上都是原生标签对象
        const input = document.querySelector('input')
        input.focus()
      }
    }) 
  }
}
Vue.use(directive)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
