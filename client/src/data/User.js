class CourseData {
  constructor() {
    this.liked = false;
    this.completed = false;
    this.merits = undefined;
    this.scratched = false;
  }
}

export default class User {
  emptyState() {
    this.program = "";
    this.year = "";
    this.courses = {}; //{"code": {liked:false, merits:4}}
    this.loadedFromLocalStorage = false;
  }

  constructor() {
    this.emptyState();
  }

  getCourseData(code) {
    return this.courses[code] || new CourseData();
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
