<script setup>
import { inject, ref, defineProps } from "vue";
import { vElementVisibility } from "@vueuse/components";
import { fetchTenta } from "../util/fetch";

const { course } = defineProps(["course"]);
const c = course;

const { user } = inject("user");
const { courses } = inject("courses");

const loadedTenta = ref(false);

const tentaReplacement = ref(false);

const UG = c.gradingScale === "UG";

function onElementVisible(visible) {
  if (visible && !loadedTenta.value) {
    loadedTenta.value = true;
    if (!user.year || !user.program) return;
    if (!c.courseCode) return;
    fetchTenta(c.courseCode, user.year)
      .then((data) => {
        console.log("Fetched tenta info from server");
        course.tenta = data;
        // let correspondingCorse = courses.value.find(
        //   (x) => x.courseCode === c.courseCode
        // );
        // correspondingCorse.tenta = data;
      })
      .catch((e) => {
        if (e.message === "Failed to fetch") {
          tentaReplacement.value = true;
          loadedTenta.value = false;
        }
      });
  }
}
</script>
<template>
  <el-row v-element-visibility="onElementVisible">
    <el-col :span="4">
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
          <div v-if="UG">
            <el-radio-button label="U" />
            <el-radio-button label="G" />
          </div>
          <div v-else>
            <el-radio-button label="U" />
            <el-radio-button label="3" />
            <el-radio-button label="4" />
            <el-radio-button label="5" />
          </div>
        </el-radio-group>

        <!--KAn man lägga in en metod i @click där man avklickar de andra?-->
        <!-- <el-checkbox-button size="small" circle type="success" plain>U</el-checkbox-button>-->
      </div>
    </el-col>

    <el-col :span="6">
      <h3>{{ c.name_sv }}</h3>
    </el-col>
    <el-col :span="4"
      ><span>
        <div class="table-buttons">
          <el-button
            size="small"
            circle
            disabled
            v-for="i in [1, 2, 3, 4]"
            :type="c.isInStudyPeriod(i) ? 'success' : ''"
            >{{ i }}</el-button
          >
          <!-- <el-button :type="c.isInStudyPeriod(1) ? 'success' : ''" size="small" circle>1</el-button>  -->
        </div>
      </span></el-col
    >
    <el-col :span="4"
      ><span>
        <h3>{{ c.courseCode }}</h3>
      </span></el-col
    >
    <el-col :span="4"
      ><span>
        <h3 v-if="c.tenta">
          {{
            Object.entries(c.tenta?.exam)
              .filter((x) => x[1].verdict === "yes")
              .sort((a, b) => b[1].probability - a[1].probability)
              .map((x) => `${x[0]}_${x[1].probability}`)
              .join(", ")
          }}
        </h3>

        <h3 v-else-if="tentaReplacement">Servern svarar inte</h3>
        <!-- här vill vi lägga in från servern om kursen har tenta eller inte-->
      </span>
    </el-col>
  </el-row>
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
