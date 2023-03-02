let myDate = new Date();

myDate.setMilliseconds(45);
myDate.setSeconds(10);
myDate.setMinutes(21);
myDate.setHours(14);
myDate.setMonth(10);
myDate.setFullYear(2021);

console.log(myDate.getTime());
console.log(myDate.getFullYear());
console.log(myDate.getMonth());
console.log(myDate.getDay());
console.log(myDate.getHours());
console.log(myDate.getMinutes());
console.log(myDate.getSeconds());

myDate.setDate("20");
myDate.setTime("1635843070045");

console.log(myDate.getDate());
console.log(myDate.getTime());

// we can also have methods of UTCTime and Date, we just write UTC in all above methods, like...
myDate.setUTCFullYear(2002);
console.log(myDate.getUTCFullYear());

// Format mathods
let dt = new Date();
console.log(dt);

console.log(dt.toString());
console.log(dt.toDateString());
console.log(dt.toTimeString());

console.log(dt.toLocaleString());
console.log(dt.toLocaleDateString());
console.log(dt.toLocaleTimeString());

console.log(dt.toUTCString());
console.log(dt.toISOString());
console.log(dt.toJSON());