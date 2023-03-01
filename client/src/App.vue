<script setup>
import Course from "./data/Course.js";
import HelloWorld from "./components/HelloWorld.vue";
import ChooseProgram from "./components/ChooseProgram.vue";
import DisplayCoursesVue from "./components/DisplayCourses.vue";
import ChildComponent from "./components/ChildComponent.vue";

//set language and time
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";

import sv from "element-plus/dist/locale/sv.mjs";
import "dayjs/locale/sv";
import { get } from "lodash";
import { ref } from "vue";

defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: sv,
    };
  },
});

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
      <DisplayCoursesVue msg="DisplayProgram"></DisplayCoursesVue>
      <!-- <HelloWorld msg="Choose your program"/>   -->
    </a>
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
