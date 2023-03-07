<script setup>
import { router } from "../routes.js";
import { inject } from "vue";
const { user } = inject("user");
function cont(variable) {
  switch (variable) {
    case "fromNew":
      user.clearData();
      router.push({ path: "/choose-program" });
    case "fromStorage":
      router.push({ path: "/overview" });
  }
}
</script>
<template>
  <Animation />
  <div class="center">
    <h1 class="shiny">Skapa din egen</h1>
    <div class="buttons">
      <el-button class="stor" type="primary" round @click="cont('fromNew')"
        >Starta</el-button
      >
      <el-button class="stor" type="primary" round @click="cont('fromStorage')"
        >Fortsätt</el-button
      >
    </div>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  gap: 100pt;
}
.center {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 100pt;
  align-items: center;
  justify-content: center;
}
.shiny {
  text-shadow: #42b883ff 0px 0px 10px;
}
.stor {
  transform: scale(2);
}
.stor {
  will-change: filter;
  transition: filter 300ms;
}
.stor:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
