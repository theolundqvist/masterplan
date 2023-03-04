<script setup>
import { router } from "../routes.js";
function say(message) {
  //alert(message);

  router.push({ path: "/choose-program" });
}
</script>
<template>
  <Animation />
  <div class="center">
    <h1 class="shiny">Skapa din egen</h1>
    <el-button class="stor" type="primary" round @click="say('Hello')"
      >Starta</el-button
    >
  </div>
</template>

<style scoped>
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
/* .el-button{
    padding: 1em;
    height: 10em;
    width: 20em;
}*/
</style>
