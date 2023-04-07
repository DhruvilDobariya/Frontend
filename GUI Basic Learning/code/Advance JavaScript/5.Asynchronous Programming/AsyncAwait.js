let students = [
    {
        id: 1,
        name: 'Dhruvil Dobariya',
    },
    {
        id: 2,
        name: 'Dhaval Dobariya',
    },
];

function getStudents() {
    setTimeout(() => {
        students.forEach(x => console.log(x));
    }, 1000);
}

function addStudent(student) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            students.push(student);
            error = false;
            if (!error) {
                resolve('Student added successfully');
            } else {
                reject('Student not added successfully');
            }
        }, 2000);
    });
}

async function start() {
    await addStudent({ id: 3, name: 'Bhargav Vachhani' });
    getStudents();
}

start();

// in synchronous programing, program execute un-uniform manner, it excecute depend on resource.
// but in asyncronous programming program run step by step.
