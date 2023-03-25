let User = function(){
    function User(userId, name){
        this.userId = userId
        this.name = name;
    }

    User.prototype.display = function(){
        console.log(this.userId);
        console.log(this.name);
    }

    return User;
}();

var Person = function(){
    function Person(color){
        this.color = color;
    }
    Person.prototype.display = function(){
        console.log(this.color);
    }
    return Person;
}();

let Student = function(){
    function Student(studentId, userId, name, color){
        this.studentId = studentId;
        User.prototype.constructor(userId, name);
        Person.prototype.constructor(color);
    }

    Student.prototype.display = function(){
        User.prototype.display();
        Person.prototype.display();
        console.log(this.studentId);
    }

    return Student;
}();

let user = new Student(1, 1, "Dhruvil Dobariya", "Very White");
user.display();