import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
const app = createApp(App);
app.use(ToastService);
app.use(ConfirmationService);
app.use(createPinia())

app.use(PrimeVue);
app.use(router)
app.mount('#app')
