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
  <el-config-provider :locale="locale">
    <DataProvider>
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
