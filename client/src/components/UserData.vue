<script setup>
import { inject } from "vue";
const { user } = inject("user");
const { allCourses } = inject("courses");

</script>

<template>
  <div><h1>hej</h1></div>
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
/* .el-button{
    padding: 1em;
    height: 10em;
    width: 20em;
}*/
</style>
