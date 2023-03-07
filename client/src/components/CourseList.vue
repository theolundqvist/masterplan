<script setup>
import { inject, defineProps } from "vue";
const { user } = inject("user");
defineProps(["courses"]);
</script>
<template>
  <el-row>
    <el-col :span="4">
      <h2 class="center">Betyg</h2>
    </el-col>
    <el-col :span="6">
      <h2 class="center">Kursnamn</h2>
    </el-col>
    <el-col :span="4">
      <h2 class="center">Läsperiod</h2>
    </el-col>
    <el-col :span="4">
      <h2 class="center">Kurskod</h2>
    </el-col>
    <el-col :span="4">
      <h2 class="center" style="margin-bottom: 1px">Examination</h2>
      <span class="center">Experimentell heuristisk tolkning av kursplan</span>
    </el-col>
  </el-row>

  <!-- <el-scrollbar class="scrollbar-demo-item"> -->
  <div class="table-design" v-for="c in courses" :key="c.courseCode">
    <CourseListElement :course="c" />
    <el-divider class="border" />
  </div>
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
