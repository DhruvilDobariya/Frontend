class Student {
    // we can't use static keyword directly with class, we only use static key word with propart, method amd block

    id;
    name;
    static collage = 'Collage Name';

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static getCollage() {
        return this.collage;
    }
    static setCollage(collage) {
        this.collage = collage;
    }
    static {
        console.log(this.collage);
    }
}

let student = new Student(1, 'Dhruvil Dobariya');
Student.setCollage('Darshan');

console.log(student.id);
console.log(student.name);
console.log(Student.getCollage());

let student2 = new Student(2, 'Dhaval Dobariya');

console.log(student2.id);
console.log(student2.name);
console.log(Student.getCollage());

// js don't support abstract class and interface.
