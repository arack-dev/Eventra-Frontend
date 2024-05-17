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
import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import SplitButton from 'primevue/splitbutton'
import Breadcrumb from "primevue/breadcrumb";
import InputGroup from "primevue/inputgroup";
import AutoComplete from "primevue/autocomplete";
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Tag from 'primevue/tag'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('p-sidebar', Sidebar)
app.component('p-button', Button)
app.component('p-avatar', Avatar)
app.component('p-toolbar', Toolbar)
app.component('p-input-text', InputText)
app.component('p-split-button', SplitButton)
app.component('p-breadcrumb', Breadcrumb)
app.component('p-input-group', InputGroup)
app.component('p-auto-complete', AutoComplete)
app.component('p-data-view',  DataView)
app.component('p-data-view-layout-options', DataViewLayoutOptions)
app.component('p-tag', Tag)


app.mount('#app')
