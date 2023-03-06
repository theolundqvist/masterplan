<script setup>
import { ref, inject, onMounted } from "vue";
import { router } from "../routes.js";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

import { fetchCourses } from "../util/fetch.js";

const { user } = inject("user");
const { courses, setCourses } = inject("courses");

const programs = ref([]);

onMounted(() => {
	user.loadFromLocalStorage();
	if (!user.year || !user.program)
		return router.replace({ path: "/choose-year" });
	fetchCourses(user.program, user.year)
		.then(setCourses)
		.catch((e) => console.log(e));
});
</script>

<template>
	<el-header class="header"> Program:
		<el-tag class="" type="success">{{ user.program }}</el-tag>
		Läsår:
		<el-tag class="" type="success">{{ user.year }}</el-tag>
	</el-header>


	<div>
		<el-row>
			<el-col :span="8">
				<h2>Kursnamn </h2>
			</el-col>
			<el-col :span="8">
				<h2> Läsperiod </h2>
			</el-col>
			<el-col :span="8">
				<h2>Kurskod</h2>
			</el-col>
		</el-row>


		<el-scrollbar class="scrollbar-demo-item">

			<div v-for="c in courses.filter((x) => x.isMandatory())" :key="c.courseCode">
				<el-row>
					
						<el-col :span="8"><h3>{{ c.name_sv }}</h3></el-col>
						<el-col :span="8"><span> <h3>{{ c.getStudyPeriods() }}</h3></span></el-col>
						<el-col :span="8"><span><h3> {{ c.courseCode }}</h3></span></el-col>
					
				</el-row>
				<el-divider class="border" />
			</div>
		</el-scrollbar>
	</div>




	<h1>Valbara kurser</h1>
	<div v-for="c in courses.filter((x) => x.choice === 'elective')" :key="c.courseCode">
		<h3>
			{{ c.name_sv }}
		</h3>
		<span>lp: {{ c.getStudyPeriods() }}</span>
	</div>
</template>

<style scoped>
.header {
	margin-top: 4em;
}

.border {
	border-bottom: 2px;
	color: black;
	border-bottom-color: black;
}

.scrollbar-demo-item {
	display: flex;
	align-items: left;
	justify-content: left;
	height: auto;
	margin: 10px;
	text-align: center;
	border-radius: 4px;
	background: var(--el-color-primary-light-9);
	color: var(--el-color-primary);
}

.demo-border .line {
	width: 70%;

}
</style>
