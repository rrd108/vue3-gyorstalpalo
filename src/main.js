import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCalendarDay,
  faCog,
  faFireAlt,
  faIgloo,
  faPenNib,
  faPlus,
  faSpinner,
  faTrash,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCalendarDay,
  faCog,
  faFireAlt,
  faIgloo,
  faPenNib,
  faPlus,
  faSpinner,
  faTrash,
  faUserAstronaut
)

createApp(App)
  .use(router)
  .use(createPinia())
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
