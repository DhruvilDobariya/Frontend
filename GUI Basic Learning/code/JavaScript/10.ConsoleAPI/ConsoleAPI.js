console.log("log");
console.warn("warn");
console.error("error");
console.info("info");

console.time("start time");
for(let i = 0; i < 10000; i++);
console.timeEnd("start time");

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
console.table(students);

console.group("City");
console.log("Rajkot");
console.log("Ahemdabad");
console.log("Baroda");
console.groupEnd();