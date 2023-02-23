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

function addStudent(student){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            students.push(student);
            error = false;
            if(!error){
                resolve("Student added successfully");
            }
            else{
                reject("Student not added successfully");
            }
        },2000);
    });
}

addStudent({id: 3, name: "Bhargav Vachhani"})
.then((message)=>{
    console.log(message);
    getStudents();
})
.catch((error)=>{
    console.log(error);
})
