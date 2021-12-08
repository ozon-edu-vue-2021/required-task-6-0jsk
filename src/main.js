import Vue from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import VueVirtualScroller from 'vue-virtual-scroller';

Vue.config.productionTip = false

library.add(faCaretDown, faCaretUp);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueVirtualScroller);

new Vue({
  render: h => h(App),
}).$mount('#app')
