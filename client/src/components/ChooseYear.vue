<script setup>
import { ref, inject, onMounted } from "vue";
import { router, backToStartPage } from "../routes.js";
import { Back, House } from "@element-plus/icons-vue";

import { fetchYears } from "../util/fetch.js";

function chooseYear(e) {
  user.year = e;
  console.log(e);
  //byt flik
  router.push({ path: "/overview" });
}

const { user } = inject("user");

const years = ref([]);


onMounted(() => {
  if (!user.program) return router.replace({ path: "/choose-program" });
  fetchYears(user.program)
    .then((data) => (years.value = data))
    .then((data) =>console.log(data))
    .catch((e) => {
      console.log(e);
    });
});
</script>

<template>

<div class="button-div">
<el-button type="primary" :icon="Back" @click="router.back()">Tillbaka</el-button>
<el-button type="primary" :icon="House" @click="backToStartPage()">Startsida</el-button> 
</div>
    <el-header class="header"> Program: 
  <el-tag class="" type="success">{{ user.program }}</el-tag>
    </el-header>
<div class="center">
    <h1 class="shiny">Välj Läsår</h1>
  </div>
  <el-scrollbar height='95%'>
    <p v-for="item in years" :key="item.value" :value="item.value" 
    class="scrollbar-demo-item" @click="chooseYear(item.value)">
      <h2>{{ item.label }}</h2>
    </p>
  </el-scrollbar>
</template>

<style scoped>
.header{
  margin-top:4em;
}
.center {
    cursor: default;
}
.shiny {
  text-shadow: #42b883ff 0px 0px 10px;
}
.button-div{
	display: flex;

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
  cursor: pointer;
}
</style>
