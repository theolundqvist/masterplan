<script setup>
//nedan kan tas bort för kommer från router sen
import HelloWorld from "./components/HelloWorld.vue";
import ChooseProgram from "./components/ChooseProgram.vue";
import DisplayCoursesVue from "./components/DisplayCourses.vue";
import ChildComponent from "./components/ChildComponent.vue";
//vue
import { RouterView } from "vue-router";
import Animation from "./components/Animation.vue";
//locale
import "dayjs/locale/sv";
import { ElConfigProvider } from "element-plus";
import sv from "element-plus/dist/locale/sv.mjs";
import en from "element-plus/dist/locale/en.mjs";

const locale = sv;
</script>

<template>
  <Animation />
  <el-config-provider :locale="locale">
    <DataProvider>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>

      <!-- <HelloWorld msg="Vite + Vue" /> -->
      <a>
        <ChooseProgram />
        <ChildComponent />
      </a>
      <hr />
      <a>
        <DisplayCoursesVue></DisplayCoursesVue>
        <!-- <HelloWorld msg="Choose your program"/>   -->
      </a>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <h2>här renderas routes!</h2>
      <router-view></router-view>
    </DataProvider>
  </el-config-provider>
</template>

<!-- //change font -->
<style lang="stylus">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

html, body
  height: 100vh;
  width: 100vw;

body
  font-family: 'Montserrat', sans-serif;
  background: #FFF;
  position: relative;
  overflow-x: hidden;
  font-size: 100%;
  text-align: center;
</style>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
