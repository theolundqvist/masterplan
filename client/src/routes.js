import App from "./App.vue";
import ChooseProgram from "./components/ChooseProgram.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [{ path: "/", component: ChooseProgram }], // short for `routes: routes`
});
export { router };
