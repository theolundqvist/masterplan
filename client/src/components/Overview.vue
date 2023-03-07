<script setup>
import { ref, inject, onMounted } from "vue";
import { router, backToStartPage } from "../routes.js";
import { Back, House } from "@element-plus/icons-vue";

import userData from "./UserData.vue";
import { fetchCourses, fetchTenta } from "../util/fetch.js";

const { user } = inject("user");
const { courses, setCourses } = inject("courses");
//const radioButton3 = ref("U") //behövs om vi använder radio-buttons
const programs = ref([]);

onMounted(() => {
  user.loadFromLocalStorage();
  if (!user.year || !user.program)
    return router.replace({ path: "/choose-year" });
  fetchCourses(user.program, user.year)
    .then(setCourses)
    .then(() => {
      let i = 0;
      courses.value.forEach((c) => {
        if (i < 10) {
          i++;
          fetchTenta(c.courseCode, user.year).then((data) => {
            let correspondingCorse = courses.value.find(
              (x) => x.courseCode === c.courseCode
            );
            correspondingCorse.tenta = data;
          });
        }
      });
    })
    .catch((e) => console.log(e));
});
</script>

<template>
	<div class="button-div">
		<el-button type="primary" :icon="Back" @click="router.back()">Tillbaka</el-button>
		<el-button type="primary" :icon="House" @click="backToStartPage()">Startsida</el-button>
	</div>

	<el-header class="header">
		Program:
		<el-tag class="" type="success">{{ user.program }}</el-tag>
		Läsår:
		<el-tag class="" type="success">{{ user.year }}</el-tag>
		Betygssnitt:
		<el-tag class="" type="success">{{ user.getMeanGrade() }}</el-tag>
	</el-header>

	<h1>Obligatoriska kurser ÅK 1-3</h1>
	<!-- <div> -->
	<el-row>
		<el-col :span="6">
		<h2>Betyg</h2>
		</el-col>
		<el-col :span="6">
			<h2>Kursnamn</h2>
		</el-col>
		<el-col :span="6">
			<h2>Läsperiod</h2>
		</el-col>
		<el-col :span="6">
			<h2>Kurskod</h2>
		</el-col>
	</el-row>
	<el-divider class="border-header" />

  <div
    class="table-design"
    v-for="c in courses.filter((x) => x.isMandatory())"
    :key="c.courseCode"
  >
    <el-row>
      <el-col :span="6">
        <!--<h3>Betyg här</h3>-->
        <div class="table-buttons">
          <!-- tomma fråm början, går att klicka i en åt gången, spara värdet de klickar i,
							 uppdatera värdet för varje kurs när man klickar på nytt betyg -->
          <!--<el-button size="small" circle v-for="i in ['U',3,4,5]" @click="type='success', plain" >{{ i }}</el-button> -->
          <!-- <el-button :type="c.isInStudyPeriod(1) ? 'success' : ''" size="small" circle>1</el-button>  -->

					<el-radio-group :model-value="user.getGrade(c)" @change="($e) => user.setGrade(c, $e)" size="small">
						<el-radio-button label="U" />
						<el-radio-button label="3" />
						<el-radio-button label="4" />
						<el-radio-button label="5" />
					</el-radio-group>

					<!--KAn man lägga in en metod i @click där man avklickar de andra?-->
					<!-- <el-checkbox-button size="small" circle type="success" plain>U</el-checkbox-button>-->
				</div>
			</el-col>

			<el-col :span="6">
				<h3>{{ c.name_sv }}</h3>
			</el-col>
			<el-col :span="6"><span>
					<!-- <h3>{{ c.getStudyPeriods() }}</h3> -->
					<div class="table-buttons">
						<el-button size="small" circle disabled v-for="i in [1, 2, 3, 4]"
							:type="c.isInStudyPeriod(i) ? 'success' : ''">{{ i }}</el-button>
						<!-- <el-button :type="c.isInStudyPeriod(1) ? 'success' : ''" size="small" circle>1</el-button>  -->
					</div>
				</span></el-col>
			<el-col :span="6"><span>
					<h3>{{ c.courseCode }}</h3>
				</span></el-col>
		</el-row>
		<el-divider class="border" />
	</div>
	<!-- </el-scrollbar> -->
	<!-- </div> -->

	<h1>Valbara kurser</h1>
	<div>
		<el-row>
		<el-col :span="6">
				<h2 class="center">Betyg</h2>
			</el-col>
			<el-col :span="6">
				<h2 class="center">Kursnamn</h2>
			</el-col>
			<el-col :span="6">
				<h2 class="center">Läsperiod</h2>
			</el-col>
			<el-col :span="6">
				<h2 class="center">Kurskod</h2>
			</el-col>
			<el-col :span="4">
				<h2 class="center">Examinations typ</h2>
			</el-col>
		</el-row>

    <!-- <el-scrollbar class="scrollbar-demo-item"> -->
    <div
      class="table-design"
      v-for="c in courses.filter((x) => !x.isMandatory())"
      :key="c.courseCode"
    >
      <el-row>
        <el-col :span="6">
          <div class="table-buttons">
            <!-- tomma fråm början, går att klicka i en åt gången, spara värdet de klickar i,
							 uppdatera värdet för varje kurs när man klickar på nytt betyg -->
            <!--<el-button size="small" circle v-for="i in ['U',3,4,5]" @click="type='success', plain" >{{ i }}</el-button> -->
            <!-- <el-button :type="c.isInStudyPeriod(1) ? 'success' : ''" size="small" circle>1</el-button>  -->
            <el-radio-group
              :model-value="user.getGrade(c)"
              @change="($e) => user.setGrade(c, $e)"
              size="small"
            >
              <el-radio-button label="U" />
              <el-radio-button label="3" />
              <el-radio-button label="4" />
              <el-radio-button label="5" />
            </el-radio-group>

						<!--KAn man lägga in en metod i @click där man avklickar de andra?-->
						<!-- <el-checkbox-button size="small" circle type="success" plain>U</el-checkbox-button>-->
					</div>
				</el-col>

				<el-col :span="6">
					<h3>{{ c.name_sv }}</h3>
				</el-col>
				<el-col :span="6"><span>
						<div class="table-buttons">
							<el-button size="small" circle v-for="i in [1, 2, 3, 4]"
								:type="c.isInStudyPeriod(i) ? 'success' : ''">{{ i }}</el-button>
							<!-- <el-button :type="c.isInStudyPeriod(1) ? 'success' : ''" size="small" circle>1</el-button>  -->
						</div>
					</span></el-col>
				<el-col :span="6"><span>
						<h3>{{ c.courseCode }}</h3>
					</span></el-col>
				<el-col :span="4"><span>
						<h3> Ja/Nej </h3> <!-- här vill vi lägga in från servern om kursen har tenta eller inte-->
					</span>
				</el-col>
			</el-row>
			<el-divider class="border" />
		</div>
		<!-- </el-scrollbar> -->
	</div>
</template>

<style scoped>
.header {
	margin-top: 4em;
}

.border-header {
	color: black;
}

.border {
	border-bottom: 2px;
	color: black;
	border-bottom-color: black;
}
.center {
	cursor: default;
}
.button-div {
	display: flex;
}

.table-buttons {
	display: flex;
	justify-content: center;
	margin-top: 15px;
}

.table-design {
	background: var(--el-color-primary-light-9);
	color: var(--el-color-primary);
}

.scrollbar-demo-item {
	display: flex;
	align-items: left;
	justify-content: space-between;
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
