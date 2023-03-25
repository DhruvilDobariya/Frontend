class A{
    x = {B,C}
    method1(){
        this.x.B.prototype.method1();
        this.x.C.prototype.method1();
        console.log("A");
    }
}
class B{
    method1(){
        console.log("B");
    }
}
class C{
    method1(){
        console.log("C");
    }
}

let a = new A();
a.method1();