import Course from "../data/Course";
function safeFetch(url) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      return res.text().then((t) => {
        throw new Error(t);
      });
    }
    return res.json();
  });
}

function fetchPrograms() {
  return safeFetch(
    "https://api.lth.lu.se/lot/courses/programmes?kull=false"
  ).then((data) => {
    return data
      .map((x) => ({
        label: x.programmeCode + " - " + x.programme_sv,
        value: x.programmeCode,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });
}

function fetchYears(program) {
  if (!program) return Promise.reject(new Error("invalid arguments"));
  return safeFetch(
    `https://api.lth.lu.se/lot/courses/academic-years?programmeCode=${program}&includePreliminary=true`
  ).then((data) => {
    return data
      .map((x) => ({
        label: x.academicYear,
        value: x.academicYearId,
        preliminary: x.preliminary,
        current: x.current,
      }))
      .sort((a, b) => b.label.localeCompare(a.label));
  });
}

function fetchCourses(program, year) {
  if (!program || !year) return Promise.reject(new Error("invalid arguments"));
  return safeFetch(
    `https://api.lth.lu.se/lot/courses?programmeCode=${program}&academicYearId=${year}`
  ).then((data) => {
    return data.map((x) => new Course(x)).sort((a, b) => a.compare(b));
  });
}

function fetchTenta(program, year) {
  if (!program || !year) return Promise.reject(new Error("invalid arguments"));
  console.log(__APP_ENV__.SERVER_URL)
  return safeFetch(
    `${__APP_ENV__.SERVER_URL || "http://localhost:1234"}/tenta?course=${program}&year=${year}`
  ).then((data) => {
    return data;
  });
}

export { safeFetch, fetchPrograms, fetchYears, fetchCourses, fetchTenta };
