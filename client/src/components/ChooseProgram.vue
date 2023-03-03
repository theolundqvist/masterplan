<script setup>
import { ref, inject, onMounted } from "vue";
import { router } from "../routes.js";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

import { fetchPrograms } from "../util/fetch.js";

function chooseProgram(e) {
  user.program = e;
  //byt flik
  router.push({ path: "/choose-year" });
}

const { user } = inject("user");

const programs = ref([]);

onMounted(() => {
  fetchPrograms()
    .then((data) => (programs.value = data))
    .catch((e) => console.log(e));
});
</script>

<template>
  <el-select class="m-2" size="large" @change="chooseProgram">
    <el-option
      v-for="item in programs"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style scoped></style>
