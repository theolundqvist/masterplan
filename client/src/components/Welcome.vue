<script setup>

 function say(message) {
    alert(message);
  }
</script>
<template>
    <h1>Create your Master Plan</h1>
    <el-button type="primary" circle @click="say('Hello')"/>
    
</template>

<style scoped>
.el-button{
    padding: 1em;
    height: 10em;
    width: 20em;
}
</style>
