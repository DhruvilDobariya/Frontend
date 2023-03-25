// JS have two technique to create class.

// OG syntax
class StudentOG{
    id = undefined;
    name = undefined;

    constructor(id, name){
        this.id = id,
        this.name = name;
    }

    getStudent(){
        return {id: this.id, name: this.name};
    }
}

// Prototype syntax
var StudentPrototype = function(){
    // constructor
    function StudentPrototype(id, name){
        this.id = id,
        this.name = name
    }

    // method
    StudentPrototype.prototype.getStudent = function(){ // don't use arrow function
        return {id: this.id, name: this.name};
    }

    return StudentPrototype;
}();

let studentOG = new StudentOG(1, "Dhruvil Dobariya");
console.log(studentOG.getStudent());

let studentPrototype = new StudentPrototype(2, "Bhargav Vachhani");
console.log(studentPrototype.getStudent());

// we use __proto__ with object and prototype with class
// user.__proto__ and User.prototype

