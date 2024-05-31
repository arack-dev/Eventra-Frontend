import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/aura-light-noir/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import './styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import FocusTrap from 'primevue/focustrap';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.directive('focustrap', FocusTrap);

app.mount('#app')
