export default class Course {
    constructor(obj) {
        var details = {};
        for (const property in obj) {
            details[property] = obj[property];
            // console.log("property = " + property + " value = " + details[property]);
        }
        return details;
    }
}
