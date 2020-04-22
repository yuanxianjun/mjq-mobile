import Vue from 'vue';
import axios from "axios";
import localPage from './index.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.axios = axios;      
        axios.defaults.baseURL = 'http://127.0.0.1:5000/news/';
        new Vue({
            render: h => h(localPage)
        }).$mount('#app')
    

