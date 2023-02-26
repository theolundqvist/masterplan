<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
const date = ref("");
const courses = ref([]); //useState i react

fetch("https://api.lth.lu.se/lot/courses?programmeCode=C&academicYearId=22_23")
  .then((res) => {
    console.log(res);
    if (!res.ok) throw new Exception("failed");
    return res.json();
  })
  .then((data) => {
    console.log(data);
    courses.value = data.sort((a, b) => a.name_sv.localeCompare(b.name_sv)); //setState
  });
</script>

<template>
  <h1>{{ courses.length }} courses fetched</h1>
  <li v-for="c in courses">
    {{ c.name_sv }}
  </li>
  <div class="card">
    <el-button type="primary">test</el-button>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="Välj en dag"
      :size="size"
    />
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
