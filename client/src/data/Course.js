export default class Course {
    constructor(obj) {
        for (const key in obj) {
            // details[key] = obj[key];
            this[key] = obj[key]
            // console.log("property = " + property + " value = " + details[property]);
        }
    }

  isInStudyPeriod(nbr){
    return false;
    // timePlans__1__startSpNr <- ex 109
    // timePlans__1__endSpNr <- ex 110
    // på något sätt betyder det vilken lp det är, se excel
    // timePlans__2 är om det går två gånger på ett år så då är det nästa gång den går.
  }


}
//lägg in de som vi vill använda som klassattribut och kommentera vad de innehåller kanske
//alternativt lägg in "isAdvanced" mycket mer nice än course.cycle????!?, 
//isåfall kan vi behålla alla kassa namn på saker och bara lägg in massa metoder för det vi vill kolla
//bestäm du

// courseId
// courseCode
// academicYearId
// academicYear
// academicYearShort
// name_sv
// name_en
// gradingScale
// credits
// cycle
// type
// status
// oldCourseCode
// newCourseCode
// homePage_sv
// homePage_en
// languageCode
// language_sv
// language_en
// departmentCode
// department_sv
// department_en
// motherDepartmentCode
// motherDepartment_sv
// motherDepartment_en
// maxParticipants
// entryRequirements
// assumedPriorKnowledge
// timeeditUrl_sv
// timeeditUrl_en
// evaluationUrl_sv
// evaluationUrl_en
// courseSyllabusPath_sv
// courseSyllabusPath_en
// suitableForeignStudents
// hasChanges
// preliminary
// id
// courseProgrammeId
// groupId
// sortOrder
// programmeStatus
// year
// fromYear
// choice
// choiceShort
// programmeCode
// programme_sv
// programme_en
// specialisationCode
// specialisation_sv
// specialisation_en
// specialisationGeneral
// footnote_sv
// footnote_en
// timePlans__1__startSpNr
// timePlans__1__endSpNr
// timePlans__1__studyPeriods__1__lecture
// timePlans__1__studyPeriods__1__exercise
// timePlans__1__studyPeriods__1__laborations
// timePlans__1__studyPeriods__1__project
// timePlans__1__studyPeriods__1__selfStudies
// timePlans__1__studyPeriods__2
// timePlans__1__studyPeriods__3
// timePlans__1__studyPeriods__4
// timePlans__1__studyPeriods__1
// timePlans__1__studyPeriods__4__lecture
// timePlans__1__studyPeriods__4__exercise
// timePlans__1__studyPeriods__4__laborations
// timePlans__1__studyPeriods__4__project
// timePlans__1__studyPeriods__4__selfStudies
// timePlans__1__studyPeriods__2__lecture
// timePlans__1__studyPeriods__2__exercise
// timePlans__1__studyPeriods__2__laborations
// timePlans__1__studyPeriods__2__project
// timePlans__1__studyPeriods__2__selfStudies
// timePlans__1__studyPeriods__3__lecture
// timePlans__1__studyPeriods__3__exercise
// timePlans__1__studyPeriods__3__laborations
// timePlans__1__studyPeriods__3__project
// timePlans__1__studyPeriods__3__selfStudies
// timePlans__2__startSpNr
// timePlans__2__endSpNr
// timePlans__2__studyPeriods__1
// timePlans__2__studyPeriods__2__lecture
// timePlans__2__studyPeriods__2__exercise
// timePlans__2__studyPeriods__2__laborations
// timePlans__2__studyPeriods__2__project
// timePlans__2__studyPeriods__2__selfStudies
// timePlans__2__studyPeriods__3
// timePlans__2__studyPeriods__4
// timePlans__3__startSpNr
// timePlans__3__endSpNr
// timePlans__3__studyPeriods__1
// timePlans__3__studyPeriods__2
// timePlans__3__studyPeriods__3__lecture
// timePlans__3__studyPeriods__3__exercise
// timePlans__3__studyPeriods__3__laborations
// timePlans__3__studyPeriods__3__project
// timePlans__3__studyPeriods__3__selfStudies
// timePlans__3__studyPeriods__4
// timePlans__4__startSpNr
// timePlans__4__endSpNr
// timePlans__4__studyPeriods__1
// timePlans__4__studyPeriods__2
// timePlans__4__studyPeriods__3
// timePlans__4__studyPeriods__4__lecture
// timePlans__4__studyPeriods__4__exercise
// timePlans__4__studyPeriods__4__laborations
// timePlans__4__studyPeriods__4__project
// timePlans__4__studyPeriods__4__selfStudies
// timePlans__2__studyPeriods__2
// timePlans__2__studyPeriods__3__lecture
// timePlans__2__studyPeriods__3__exercise
// timePlans__2__studyPeriods__3__laborations
// timePlans__2__studyPeriods__3__project
// timePlans__2__studyPeriods__3__selfStudies
// timePlans__2__studyPeriods__4__lecture
// timePlans__2__studyPeriods__4__exercise
// timePlans__2__studyPeriods__4__laborations
// timePlans__2__studyPeriods__4__project
// timePlans__2__studyPeriods__4__selfStudies
