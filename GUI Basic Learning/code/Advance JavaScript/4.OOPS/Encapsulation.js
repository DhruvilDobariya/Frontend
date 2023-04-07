class Student {
    #id;
    #name;

    getId() {
        return this.#id;
    }
    setId(id) {
        this.#id = id;
    }
    getName() {
        return this.#name;
    }
    setName(name) {
        this.#name = name;
    }
}

let student = new Student();
student.setId(1);
student.setName('Dhruvil Dobariya');
console.log(student.getId());
console.log(student.getName());
