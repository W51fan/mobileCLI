import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

// 通过use方法加载axios插件


Vue.use(Vant);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')