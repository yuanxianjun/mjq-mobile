import Vue from 'vue';
import axios from "axios";
import localPage from './index.vue';
import 'element-ui/lib/theme-chalk/index.css';
import { Table, TableColumn, Button } from "element-ui"

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);

Vue.prototype.axios = axios;
axios
    .get(`${process.env.BASE_URL}domain.json`)
    .then(res => {
        // axios.defaults.baseURL = "http://62.234.120.239:9876/htoa/";
        axios.defaults.baseURL = res.data.baseUrl;
        new Vue({
            render: h => h(localPage)
        }).$mount('#app')
    })
    .catch(err => {
        console.log(err);
    });

