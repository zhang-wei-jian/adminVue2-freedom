import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

// 下面都是我的
import VueCompositionAPI from "@vue/composition-api";
import PubSub from "@/utils/PubSub";
// console.log(PubSub);

// console.log(
//   PubSub.subscribe("sb", (sb) => {
//     console.log("触发我", sb);
//   })
// );
// PubSub.publish("sb", "你爹");

Vue.use(VueCompositionAPI);
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  created() {
    Vue.prototype.PubSub = PubSub;
  },
  

  router,
  store,
  render: (h) => h(App),
});
