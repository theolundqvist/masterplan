<script setup>
import Course from "./data/Course.js";
import HelloWorld from "./components/HelloWorld.vue";
import ChooseProgram from "./components/ChooseProgram.vue";
import DisplayCoursesVue from "./components/DisplayCourses.vue";
import ChildComponent from "./components/ChildComponent.vue";

//locale
import "dayjs/locale/sv";
import { ElConfigProvider } from "element-plus";
import sv from "element-plus/dist/locale/sv.mjs";
import en from "element-plus/dist/locale/en.mjs";
const locale = sv;

//vue
import { ref } from "vue";
import { RouterView } from "vue-router";
//state and function for getting data from ChooseProgram
const courseArray = ref([]);
function getCourses(program) {
  var count = program.length;
  courseArray.value.length = 0;
  console.log(count);
  for (var i = 0; i < count; i++) {
    courseArray.value[i] = new Course(program[i]);
  }
}
</script>

<template>
  <el-config-provider :locale="locale">
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
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
      <ChooseProgram @change="getCourses" />
      <ChildComponent v-bind:courses="courseArray" />
    </a>
    <hr />
    <a>
      <DisplayCoursesVue></DisplayCoursesVue>
      <!-- <HelloWorld msg="Choose your program"/>   -->
    </a>
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
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
