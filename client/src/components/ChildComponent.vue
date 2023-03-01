<script setup>
import { ref } from "vue";
// const age = ref("");
const props = defineProps({
  courses: Array,
});
</script>

<template>
  <h1>{{ courses.length }} courses fetched</h1>
  <li v-for="c in courses">
    {{ c.name_sv }}
  </li>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
