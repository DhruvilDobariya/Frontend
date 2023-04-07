class Student {
    id;
    name;

    // constructor(){
    //     console.log("Default constructor called");
    // }

    // A class may only have one constructor

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

// let student = new Student();

let student = new Student(1, 'Dhruvil Dobariya');
console.log(student.id);
console.log(student.name);
