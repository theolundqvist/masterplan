<script setup>
import { ref, inject, onMounted } from "vue";
import { router } from "../routes.js";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

import { fetchYears } from "../util/fetch.js";

function chooseYear(e) {
  user.year = e;
  //byt flik
  router.push({ path: "/overview" });
}

const { user } = inject("user");

const years = ref([]);

onMounted(() => {
  if (!user.program) return router.replace({ path: "/choose-program" });
  fetchYears(user.program)
    .then((data) => (years.value = data))
    .catch((e) => {
      console.log(e);
    });
});
</script>

<template>
  <el-select class="m-2" size="large" @change="chooseYear">
    <el-option
      v-for="item in years"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style scoped></style>
