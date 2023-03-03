<script setup>
import { ref, watch, defineProps, inject } from "vue";
// const age = ref("");
//const props = defineProps(["courses"]); //defineProps måste vara en array av strängar annars kan man inte "watcha" den!!!!
const { courses, setCourses } = inject("courses");

//download and print info about examnination
watch(courses, (a) => {
  console.log(a);
  let i = 0;
  let slice = 2;
  a.forEach((course) => {
    i++;
    if (i > (slice - 1) * 10 && i < slice * 10) {
      const url = `http://localhost/tenta?year=${course.academicYearId}&course=${course.courseCode}`;
      const kursplan = `http://localhost/kursplan?year=${course.academicYearId}&course=${course.courseCode}`;
      fetch(url)
        .then((res) => {
          console.log(url);
          console.log(kursplan);
          console.log(course.name_sv);
          if (!res.ok)
            return res.text().then((t) => {
              throw new Error(t);
            });
          else return res.json();
        })
        .then((obj) =>
          console.log(
            obj.grading,

            "\n\n" +
              Object.entries(obj.exam)
                .filter((x) => x[1].verdict !== "no")
                .map(
                  (x) => `${x[0]}:    ${x[1].verdict}   (${x[1].probability})`
                )
                .join("\n") +
              "\n",
            "\n" +
              obj.parts.map((x) => `hp:${x.hp}, grade: ${x.grade}`).join("\n")
          )
        );
    }
  });
});
</script>

<template>
  <h1>{{ courses.length }} courses fetched</h1>
  <li v-for="c in courses">
    {{ c.name_sv }}
    <span v-for="i in [1, 2, 3, 4]">
      <span v-if="c.isInStudyPeriod(i)">; {{ i }}</span>
    </span>
  </li>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
