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
  <div class="center">
    <h1 class="shiny">Välj Läsår</h1>

  </div>
  <!-- <el-select class="m-2" size="large" @change="chooseProgram"> -->

  <el-scrollbar height="1000px" >
<div @click="chooseYear">
    <p v-for="item in years" :key="item.value" :value="item.value" 
    class="scrollbar-demo-item">
     <h2>{{ item.label }}</h2>
    </p>
  
</div>  
    </el-scrollbar>
  
</template>

<style scoped>
.shiny {
  text-shadow: #42b883ff 0px 0px 10px;
  margin-top: 3em;
}
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
