import App from "./App.vue";
import Welcome from "./components/Welcome.vue";
import ChooseProgram from "./components/ChooseProgram.vue";
import ChooseYear from "./components/ChooseYear.vue";
import Overview from "./components/Overview.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Welcome },
    { path: "/choose-program", component: ChooseProgram },
    { path: "/choose-year", component: ChooseYear },
    { path: "/overview", component: Overview },
  ], // short for `routes: routes`
});

function backToStartPage(){
  router.push({ path: "/" })
}
export { router, backToStartPage};
