<script setup>
import { ref } from "vue";
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const courses = ref([]); //useState i react
const value = ref("");
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
    value: "C",
    label: "C",
  },
  {
    value: "D",
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


function fetchProgramCourses(program){
   console.log(program);
    fetch("https://api.lth.lu.se/lot/courses?programmeCode=" + program + "&academicYearId=22_23")
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
    <el-select v-model="value" class="m-2" placeholder="Select" size="large" @change="$event => fetchProgramCourses($event)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-scrollbar height="1000px">
    <!-- <li v-for="c in courses">
    {{ c.name_sv }}
  </li> -->
    <p v-for="c in courses" :key="c" class="scrollbar-demo-item">{{ c.name_sv }}</p>
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
