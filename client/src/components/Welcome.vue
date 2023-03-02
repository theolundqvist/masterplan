<script setup>
function say(message) {
  alert(message);
}
</script>
<template>
  <h1>Create your Master Plan</h1>

  <el-row class="mb-4">
    <el-button class="stor" type="primary" round @click="say('Hello')"
      >Click me</el-button
    >
  </el-row>
</template>

<style scoped>
.stor {
  transform: scale(2);
}
/* .el-button{ 
    padding: 1em;
    height: 10em;
    width: 20em;
}*/
</style>
