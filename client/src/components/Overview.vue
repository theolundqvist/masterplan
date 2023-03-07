<script setup>
import { ref, inject, onMounted } from "vue";
import { router, backToStartPage } from "../routes.js";
import { Back, House } from "@element-plus/icons-vue";

import userData from "./UserData.vue";
import { fetchCourses, fetchTenta } from "../util/fetch.js";

const { user } = inject("user");
const { courses, setCourses } = inject("courses");
const programs = ref([]);

onMounted(async () => {
  user.loadFromLocalStorage();
  if (!user.year || !user.program)
    return router.replace({ path: "/choose-year" });
  fetchCourses(user.program, user.year)
    .then(setCourses)
    .catch((e) => console.log(e));
});
</script>

<template>
  <div class="button-div">
    <el-button type="primary" :icon="Back" @click="router.back()"
      >Tillbaka</el-button
    >
    <el-button type="primary" :icon="House" @click="backToStartPage()"
      >Startsida</el-button
    >
  </div>

  <el-header class="header">
    Program:
    <el-tag class="" type="success">{{ user.program }}</el-tag>
    Läsår:
    <el-tag class="" type="success">{{ user.year }}</el-tag>
    Betygssnitt:
    <el-tag class="" type="success">{{ user.getMeanGrade() }}</el-tag>
  </el-header>

  <h1>Obligatoriska kurser ÅK 1-3</h1>
  <CourseList :courses="courses.filter((x) => x.isMandatory())" />
  <h1>Valbara kurser</h1>
  <CourseList :courses="courses.filter((x) => !x.isMandatory())" />
</template>

<style scoped>
.header {
  margin-top: 4em;
}

.border-header {
  color: black;
}

.border {
  border-bottom: 2px;
  color: black;
  border-bottom-color: black;
}
.center {
  cursor: default;
}
.button-div {
  display: flex;
}

.table-buttons {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.table-design {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.scrollbar-demo-item {
  display: flex;
  align-items: left;
  justify-content: space-between;
  height: auto;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.demo-border .line {
  width: 70%;
}
</style>
