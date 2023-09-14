class A {
    constructor() {
        Object.assign(A.prototype, B.prototype);
    }
    sum() {
        console.log("sum method of A");
    }
}

class B {
    sum() {
        console.log("sum method of B");
    }
}
class C {
    sum() {
        console.log("sum method of C");
    }
}
class D {
    sum() {
        console.log("sum method of D");
    }
}

let a = new A();
a.sum();
