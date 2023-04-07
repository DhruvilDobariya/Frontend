class AbstractClass {
    constructor() {
        throw Error("You can't create instance of abstract class");
    }
}
class AbstractClass2 {
    constructor() {
        throw Error("You can't create instance of abstract class");
    }
}

class Student extends AbstractClass {}
