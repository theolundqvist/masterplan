<script setup>
function say(message) {
  alert(message);
}
</script>
<template>
  <h1 class="shiny">Create your Master Plan</h1>

  <el-row>
    <el-button class="stor" type="primary" round @click="say('Hello')"
      >Click me</el-button
    >
  </el-row>
</template>

<style scoped>
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
