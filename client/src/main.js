import { createApp } from "vue";
import { router } from "./routes";
import "./styles/index.scss"; //import styling
import App from "./App.vue";
// import "./style.css";

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.

// 5. Create and mount the root instance.
const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount("#app");

// Now the app has started!
