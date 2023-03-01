<script setup>
import { ref } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

const courses = ref([]); //useState i react
const value = ref("");
const program = ref("");
const year = ref("");
const options = [
  { label: "A - Arkitektur", value: "A" },
  { label: "B - Bioteknik", value: "B" },
  { label: "BI - Brandingenjör", value: "BI" },
  { label: "BME - Medicin och teknik", value: "BME" },
  { label: "C - Infocom", value: "C" },
  { label: "D - Datateknik", value: "D" },
  { label: "E - Elektroteknik", value: "E" },
  { label: "F - Teknisk fysik", value: "F" },
  { label: "I - Industriell ekonomi", value: "I" },
  { label: "K - Kemiteknik", value: "K" },
  { label: "KID - Industridesign (kandidatutbildningen)", value: "KID" },
  { label: "KLMT - Kandidatutbildning i livsmedelsteknik", value: "KLMT" },
  { label: "L - Lantmäteri", value: "L" },
  { label: "M - Maskinteknik", value: "M" },
  { label: "MD - Maskinteknik - Teknisk design", value: "MD" },
  { label: "N - Teknisk nanovetenskap", value: "N" },
  { label: "Pi - Teknisk matematik", value: "Pi" },
  { label: "R - Risk, säkerhet och krishantering", value: "R" },
  { label: "RH - Riskhantering", value: "RH" },
  { label: "V - Väg- och vattenbyggnad", value: "V" },
  { label: "W - Ekosystemteknik", value: "W" },
  { label: "YL - Livsmedelsteknisk högskoleutbildning", value: "YL" },
  { label: "IBYA - Byggteknik med arkitektur", value: "IBYA" },
  { label: "IBYI - Byggteknik, inriktning järnvägsteknik", value: "IBYI" },
  {
    label: "IBYV - Byggteknik, inriktning väg- och trafikteknik",
    value: "IBYV",
  },
  { label: "ID - Industridesign (5 år)", value: "ID" },
  { label: "IDL - Datateknik med logistik", value: "IDL" },
  { label: "INEK - Avslutningen Industriell ekonomi", value: "INEK" },
  {
    label: "TM - Avslutningen Technology Management (för LTH-studenter)",
    value: "TM",
  },
];

// const options = [
//   {
//     value: "A",
//     label: "A",
//   },
//   {
//     value: "B",
//     label: "B",
//   },
//   {
//     value: "BME",
//     label: "BME",
//   },
//   {
//     value: "C",
//     label: "C",
//   },
//   {
//     value: "D",
//     label: "D",
//   },
//   {
//     value: "E",
//     label: "E",
//   },
//   {
//     value: "F",
//     label: "F",
//   },
//   {
//     value: "I",
//     label: "I",
//   },
//   {
//     value: "K",
//     label: "K",
//   },
//   {
//     value: "L",
//     label: "L",
//   },
//   {
//     value: "M",
//     label: "M",
//   },
//   {
//     value: "MD",
//     label: "MD",
//   },
//   {
//     value: "N",
//     label: "N",
//   },
//   {
//     value: "PI",
//     label: "PI",
//   },
//   {
//     value: "V",
//     label: "V",
//   },
//   {
//     value: "W",
//     label: "W",
//   },
// ];

const optionsDates = [
  {
    value: "07/08",
    label: "07/08",
  },
  {
    value: "08/09",
    label: "08/09",
  },
  {
    value: "09/10",
    label: "09/10",
  },
  {
    value: "10/11",
    label: "10/11",
  },
  {
    value: "11/12",
    label: "11/12",
  },
  {
    value: "12/13",
    label: "12/13",
  },
  {
    value: "13/14",
    label: "13/14",
  },
  {
    value: "14/15",
    label: "14/15",
  },
  {
    value: "15/16",
    label: "15/16",
  },
  {
    value: "16/17",
    label: "16/17",
  },
  {
    value: "17/18",
    label: "17/18",
  },
  {
    value: "18/19",
    label: "18/19",
  },
  {
    value: "19/20",
    label: "19/20",
  },
  {
    value: "20/21",
    label: "20/21",
  },
  {
    value: "21/22",
    label: "21/22",
  },
  {
    value: "22/23",
    label: "22/23",
  },
];

function fetchProgramCourses(program, year) {
  if (program == undefined || year == undefined) {
    return;
    //Error message here? "Please choose both a program and a year"
  }
  console.log(program, year);
  fetch(
    "https://api.lth.lu.se/lot/courses?programmeCode=" +
      program +
      "&academicYearId=" +
      year.replace("/", "_")
  )
    .then((res) => {
      console.log(res);
      if (!res.ok) throw new Exception("failed");
      return res.json();
    })
    .then((data) => {
      console.log(data);
      courses.value = data.sort((a, b) => a.name_sv.localeCompare(b.name_sv)); //setState
    });
}
</script>

<template>
  <el-select
    v-model="program"
    class="m-2"
    size="large"
    @change="($event) => fetchProgramCourses($event, year)"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-select
    v-model="year"
    class="m-2"
    size="large"
    @change="($event) => fetchProgramCourses(program, $event)"
  >
    <el-option
      v-for="item in optionsDates"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-scrollbar height="1000px">
    <!-- <li v-for="c in courses">
    {{ c.name_sv }}
  </li> -->
    <p v-for="c in courses" :key="c" class="scrollbar-demo-item">
      {{ c.name_sv }}
    </p>
    <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
  </el-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
