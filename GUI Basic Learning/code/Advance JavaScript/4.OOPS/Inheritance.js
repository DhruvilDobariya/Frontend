class Person{
    personId;
    firstName;
    lastName;

    constructor(personId, firstName, lastName){
        this.personId = personId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getPerson(){
        console.log(this.personId + " " + this.firstName + " " + this.lastName);
        // if we don't write this then it give erro like lastName is not defined.
    }
}

class Student extends Person{
    sem;
    collage;

    constructor(personId, firstName, lastName, sem, collage){
        super(personId, firstName, lastName);
        // if we don't call base class constructor then it give erro like,
        // Must call super constructor in derived class before accessing 'this' or returning from derived constructor
        // super.personId = 2;

        this.sem = sem;
        this.collage = collage;
    }
    
    getStudent(){
        // super.getPerson();
        // console.log(super.firstName); // undefined why?
        console.log(this.personId + " " + this.firstName + " " + this.lastName + " " + this.sem + " " + this.collage);
    }
}
let student = new Student(1, "Dhruvil", "Dobariya", 8, "Darshan");
console.log(student.personId);
console.log(student.collage);

student.getPerson();
student.getStudent();