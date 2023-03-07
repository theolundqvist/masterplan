class CourseData {
  constructor(course) {
    this.liked = false;
    this.completed = false;
    this.grade = undefined;
    this.scratched = false;
    this.credits = course.credits;
    console.log(this.credits);
  }
}

export default class User {
  emptyState() {
    this.program = "";
    this.year = "";
    this.courses = {}; //{"code": {liked:false, grade:4}}
    this.loadedFromLocalStorage = false;
  }

  constructor() {
    this.emptyState();
  }

  getCourseData(code) {
    return this.courses[code] || new CourseData();
  }

  getGrade(course) {
    const code = course.courseCode;
    return this.courses[code]?.grade;
  }

  getMeanGrade() {
    //state.courses
    const relevantCourses = Object.entries(this.courses)
      .map((x) => ({ grade: x[1]?.grade, id: x[0], credits: x[1]?.credits }))
      .filter((x) => ["3", "4", "5"].includes(x?.grade));
    // .reduce((a, b) => a + b, 0);

    const totalGrade = relevantCourses
      .map((x) => x.grade * x.credits)
      .reduce((a, b) => Number(a) + Number(b), 0);

    const totalCredits = relevantCourses
      .map((x) => x.credits)
      .reduce((a, b) => Number(a) + Number(b), 0);
    return (totalGrade / totalCredits).toFixed(4);
  }

  setGrade(course, grade) {
    const code = course.courseCode;
    if (!this.courses[code]) {
      this.courses[code] = new CourseData(course);
    }
    this.courses[code].grade = grade;
    console.log(this.courses);
  }

  clearData() {
    window.localStorage.clear("user");
    this.emptyState();
  }

  loadFromLocalStorage() {
    const store = window.localStorage.getItem("user");
    if (store && Object.keys(this.courses).length === 0) {
      const parsed = JSON.parse(store);
      this.program = parsed.program;
      this.year = parsed.year;
      this.courses = parsed.courses;
      this.loadedFromLocalStorage = true;
    }
  }

  saveToLocalStorage() {
    //check to not write over localStorage
    window.localStorage.setItem("user", JSON.stringify(this));
  }
}
