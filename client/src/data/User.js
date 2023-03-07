class CourseData {
  constructor() {
    this.liked = false;
    this.completed = false;
    this.grade = undefined;
    this.scratched = false;
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
  setGrade(course, grade){
    console.log(course.courseCode, grade)
    let code;
    if(typeof course === "string"){
      code = course;
    }
    else code = course.courseCode;

    if(!this.courses[code]){
      this.courses[code] = new CourseData()
    }
    this.courses[code].grade = grade;
    console.log(this.courses)
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
