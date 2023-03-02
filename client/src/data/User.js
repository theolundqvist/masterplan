class CourseData {
  constructor() {
    this.liked = false;
    this.completed = false;
    this.merits = undefined;
    this.scratched = false;
  }
}

export default class User {
  constructor() {
    this.program = "";
    this.year = "";
    this.courses = {}; //{"code": {liked:false, merits:4}}
  }

  getCourseData(code) {
    return this.courses[code] || new CourseData();
  }

  loadFromLocalStorage() {
    const store = window.localStorage.getItem("user");
    if (store && Object.keys(courses) === 0) {
      const parsed = JSON.parse(store);
      this.program = parsed.program;
      this.year = parsed.year;
      this.courses = parsed.courses;
    }
  }

  saveToLocalStorage() {
    window.localStorage.setItem("user", JSON.stringify(this));
  }
}
