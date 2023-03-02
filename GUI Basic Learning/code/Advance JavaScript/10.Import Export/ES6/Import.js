import { hello, Student } from "./Export.mjs";

console.log(hello());

let student = new Student(1, "Dhruvil Dobariya");
console.log(student.getStudent());


// Nameed export:
// exports from ./Export.js.js file
// export const Student = () => {}
// export const User = () => {}

// imports:
// import a single named export
// import { Student } from "./Export.js";

// multiple named exports
// import { Student, User } from "./Export.js";

// import a different name by using "as":
// import { User as NormalUser } from "./Export.js";

// import all the named exports onto an object 
// import * as PersonManager from "./Export.js";
// PersonManager.User and PersonManager.Student

// Default
// export
// const Student = () => {}
// export default Student;

// import
// import StudentExport from "./Export.js";
