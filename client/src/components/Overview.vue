<script setup>
import { ref, inject, onMounted } from "vue";
import { router } from "../routes.js";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

import { fetchCourses } from "../util/fetch.js";

const { user } = inject("user");
const { courses, setCourses } = inject("courses");

const programs = ref([]);

onMounted(() => {
  if (!user.year || !user.program)
    return router.replace({ path: "/choose-year" });
  fetchCourses(user.program, user.year)
    .then(setCourses)
    .catch((e) => console.log(e));
});
</script>

<template>
  <div
    v-for="c in courses.filter((x) => x.choice != 'elective')"
    :key="c.courseCode"
  >
    <h3>
      {{ c.name_sv }}
    </h3>
    <span>lp: {{ c.getStudyPeriods() }}</span>
  </div>
  <h1>Valbara kurser</h1>
  <div
    v-for="c in courses.filter((x) => x.choice === 'elective')"
    :key="c.courseCode"
  >
    <h3>
      {{ c.name_sv }}
    </h3>
    <span>lp: {{ c.getStudyPeriods() }}</span>
  </div>
</template>

<style scoped></style>
