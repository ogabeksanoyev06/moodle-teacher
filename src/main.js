import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AppText from "./components/shared-components/AppText";
import VueMask from "v-mask";
import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import "./assets/styles/main.scss";
import "./plugins/media/media-mixin";
import "./plugins/mixins/mixin";
import "./plugins/directives/click-outside";
import http from "./plugins/axios";
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';

Vue.use(Element, { locale });

Vue.config.productionTip = false;
const styledText = '%cStop!%c';
const style1 = 'color: red; font-weight: bold;font-size:50px';


console.log(styledText, style1, '');
Vue.use(Element)
Vue.component("AppText", AppText);
Vue.use(VueMask);
Vue.use(Toast);
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


Vue.mixin({
  data() {
    return {};
  },
  methods: {
    isEmptyObject(object) {
      return Object.keys(object).length !== 0;
    },
    notificationMessage(message, type) {
      this.$toast.open({
        message: message,
        type: type,
        position: "top-right",
      });
    },
  },
});