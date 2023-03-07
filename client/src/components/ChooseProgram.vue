<script setup>
import { ref, inject, onMounted } from "vue";
import { router, backToStartPage } from "../routes.js";
import { Back, House } from "@element-plus/icons-vue";

import { fetchPrograms } from "../util/fetch.js";

function chooseProgram(e) {
    user.program = e;
    console.log(e);
    //byt flik
    router.push({ path: "/choose-year" });
}

const { user } = inject("user");

const programs = ref([]);

onMounted(() => {
    fetchPrograms()
        .then((data) => (programs.value = data))
        .catch((e) => console.log(e));
});


</script>

<template>

	<div class="button-div">
    <el-button type="primary" :icon="Back" @click="router.back()">Tillbaka</el-button>
    <el-button type="primary" :icon="House" @click="backToStartPage()">Startsida</el-button> 
    </div>

    <div class="center">
        <h1 class="shiny">Välj Program</h1>
    </div>
    <el-scrollbar height='95%'>
        <p v-for="item in programs" :key="item.value" :value="item.value" class="scrollbar-demo-item"
            @click="chooseProgram(item.value)">
            <!-- <div @click="chooseProgram(item.value)"> -->
        <h2>{{ item.label }}</h2>
        <!-- </div> -->
        </p>

    </el-scrollbar>
</template>

<style scoped>
.shiny {
    text-shadow: #42b883ff 0px 0px 10px;
    margin-top: 3em;
}
.center {
    cursor: default;
}
.back {
    position: left;
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
}</style>
