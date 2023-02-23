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
    setTimeout(()=>{
        students.push(student);
    },2000)
}

addStudent({id: 3, name: "Bhargav Vachhani"});
getStudents();

// Now if we see the out put, then it's look like this,
// { id: 1, name: 'Dhruvil Dobariya' }
// { id: 2, name: 'Dhaval Dobariya' }

// Problem : here we call first addSudent and them we call getStudents method then why we can't get out put like this,
// { id: 1, name: 'Dhruvil Dobariya' }
// { id: 2, name: 'Dhaval Dobariya' }
// { id: 3, name: 'Bhargav Vachhani' }
// Because getStudents method tack 1 second for execution and addStudent tack 2 second for complete execution, thats why getStudents execute first and after execute addStudent method.
// So problem is how we can execute addStudent method before the getStudent  
// This problem we can solve using asynchronous programming.
// Asynchronous programming can solve this problem by using three diffrent ways
// 1) By using callback
// 2) By using promises
// 3) By using async/await