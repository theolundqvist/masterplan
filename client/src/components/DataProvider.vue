<script setup>
import Course from "../data/Course.js";
import User from "../data/User.js";
import { ref, provide, watch, reactive } from "vue";

//state and function for getting data from ChooseProgram
const courses = ref([]);
const user = reactive(new User());

function setCourses(data) {
  courses.value = data;
}
//const user = reactive(new User());
provide("courses", { courses, setCourses });
provide("user", { user });
watch(user, () => {
  user.saveToLocalStorage();
});
</script>

<template>
  <slot></slot>
  <!-- displays children -->
</template>
