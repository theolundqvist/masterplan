<script setup>
function say(message) {
  alert(message);
}
</script>
<template>
  <h1 class="shiny">Create your Master Plan</h1>

  <el-row class="mb-4">
    <el-button class="stor" type="primary" round @click="say('Hello')"
      >Click me</el-button
    >
  </el-row>
</template>

<style scoped>
.shiny {
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
  filter: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
}
/* .el-button{ 
    padding: 1em;
    height: 10em;
    width: 20em;
}*/
</style>
