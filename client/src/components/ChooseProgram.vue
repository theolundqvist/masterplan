<script setup>
import { ref, inject } from "vue";
const { courses, setCourses } = inject("courses");
//const props = defineProps([]);
//
//const emit = defineEmits(["change", "delete"]);
//
//const courses = ref([]); //useState i react

const value = ref("");
const programC = "C";
const programD = "D";

const options = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "BME",
    label: "BME",
  },
  {
    value: programC,
    label: "C",
  },
  {
    value: programD,
    label: "D",
  },
  {
    value: "E",
    label: "E",
  },
  {
    value: "F",
    label: "F",
  },
  {
    value: "I",
    label: "I",
  },
  {
    value: "K",
    label: "K",
  },
  {
    value: "L",
    label: "L",
  },
  {
    value: "M",
    label: "M",
  },
  {
    value: "MD",
    label: "MD",
  },
  {
    value: "N",
    label: "N",
  },
  {
    value: "PI",
    label: "PI",
  },
  {
    value: "V",
    label: "V",
  },
  {
    value: "W",
    label: "W",
  },
];

function fetchProgramCourses(program) {
  console.log(program);
  fetch(
    "https://api.lth.lu.se/lot/courses?programmeCode=" +
      program +
      "&academicYearId=20_21"
  )
    .then((res) => {
      // console.log(res);
      if (!res.ok) throw new Exception("failed");
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      setCourses((old) =>
        data.sort((a, b) => a.year.toString().localeCompare(b.year.toString()))
      ); //setState
      //emit("change", courses.value);
    });
}
</script>

<template>
  <el-select
    v-model="value"
    class="m-2"
    size="large"
    @change="($event) => fetchProgramCourses($event)"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style scoped></style>
