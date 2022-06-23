import { createApp } from 'vue'
import axios from 'axios';
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';

import router from './router'
import App from './App.vue'
import SessionStorage from './services/session-storage';


// bootstrap the app into <div id="app">
const app = createApp(App)
app.use(router)

// Reginster PrimeVue components
app.use(PrimeVue, {inputStyle: 'filled'});
app.component('Rating', Rating);
app.component('Button', Button);
app.component('Textarea', Textarea);
app.component('Paginator', Paginator);
app.component('InputText', InputText);

app.mount('#app')

/**
 * HTTP request interceptor for handling authentication
 */
axios.interceptors.request.use(
  config => {
    config.url = `http://localhost:5000${config.url}`;
    config.headers['x-user'] = SessionStorage.token;
    return config;
  },
  error => Promise.reject(error)
);

/**
 * HTTP response interceptor to redirect to login when 401 
 */
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      SessionStorage.token = undefined;
      router.push('/login');
    }
    return Promise.reject(error);
  }
);