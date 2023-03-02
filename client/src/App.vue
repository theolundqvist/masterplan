<script setup>
import Course from "./data/Course.js";
import User from "./data/User.js";
//nedan kan tas bort för kommer från router sen
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
import { ref, provide, reactive, readonly } from "vue";
import { RouterView } from "vue-router";

//state and function for getting data from ChooseProgram
const courses = ref([]);
const user = reactive(new User());

function setCourses(updateFunction) {
  //headern där är typescript
  courses.value = updateFunction(courses.value);
}

function setUser(updateFunction) {
  //headern där är typescript
  user.value = updateFunction(user.value);
}

//const user = reactive(new User());
provide("courses", { courses, setCourses });
provide("user", { user, setUser });

function getCourses(program) {
  const temp = [];
  for (var i = 0; i < program.length; i++) {
    temp.push(new Course(program[i])); //update render many times??
  }
  courses.value = temp;
}

//att skicka props
//2 alternativ
//a. prop drilling
//b. provide/inject (https://vuejs.org/guide/components/provide-inject.html)
//provide("courses", courses);
//eller: provide("courses", readonly(courses)) //hmm verkar inte funka
//så nu använder man bara "const courses = inject("courses")" i en subcomponent
//den kommer automatiskt att vara "reactiv" dvs en "ref" och uppdatera i subcomponent när den uppdateras här
//om vi också vill uppdatera vår ref från en subcomponent så kan vi göra följande

//const user = ref({ program: "", year: "", completed_courses: [] }); //hmmmm  reactive bättre än ref när det är object i
//
//function addCompletedCourse(c) {
//  user.completed_courses.push(c);
//}
//
//provide("user", {
//  user,
//  addCompletedCourse,
//});
//sen
//const {user, addCompletedCourse} = inject("user") //i subcomponent
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
