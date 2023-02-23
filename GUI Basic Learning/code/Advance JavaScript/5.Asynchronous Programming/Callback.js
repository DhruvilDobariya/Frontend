let students = [
    {
        id: 1,
        name: "Dhruvil Dobariya"
    },
    {
        id: 2,
        name: "Dhaval Dobariya"
    }
];

function getStudents(){
    setTimeout(()=>{
        students.forEach(x => console.log(x));
    },1000);
}

function addStudent(student, callback){
    setTimeout(()=>{
        students.push(student);
        callback();
    },2000)
}

addStudent({id: 3, name: "Bhargav Vachhani"},getStudents);
