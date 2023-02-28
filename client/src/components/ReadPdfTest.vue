<script setup>
import { ref } from "vue";
defineProps({});
defineEmits({});

function getInfo(course) {
  const plan = "https://kurser.lth.se/kursplaner/22_23/EDAG05.pdf";
  const proxy = "https://cors-anywhere.herokuapp.com/";
  console.log(proxy + plan);
  // "https://kurser.lth.se/kursplaner/" + course.courseSyllabusPath_sv + ".pdf";
  //"https://kurser.lth.se/lot/course-syllabus/" + course.courseSyllabusPath_sv;
  fetch(proxy + "google.com", {
    headers: { "X-Requested-With": "test2", Origin: "test" },
  })
    .then((res) => {
      console.log(res);
      return res.text();
    })
    .then((data) => {
      console.log(data);
    });
}

function run() {
  fetch(
    "https://api.lth.lu.se/lot/courses?programmeCode=C&academicYearId=22_23"
  )
    .then((res) => {
      if (!res.ok) throw new Exception("failed");
      return res.json();
    })
    .then((data) => {
      console.log("courses fetched");
      const courses = data.sort((a, b) => a.name_sv.localeCompare(b.name_sv)); //setState
      getInfo(courses[1]);
    });
}
</script>

<template>
  <el-button @click="run">TEST GET TENTA/MUNTA</el-button>
</template>

<style scoped></style>
