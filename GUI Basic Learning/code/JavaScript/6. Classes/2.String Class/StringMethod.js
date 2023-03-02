// string is immutable
let str = "My name is Dhruvil. I am extreme lover of .Net";

console.log(str.length);  // This is a method, which return length of string.
console.log(str.indexOf("Dhruvil")); // This is a fuction, which match arg with string and return first match string index number.
console.log(str.lastIndexOf('v'));  // This is a fuction, which match arg with string and return last match string index number.
console.log(str.slice(7,21));  // This is a fuction, which return part of string from staring index(arg1) to ending index(arg2 - 1). 
console.log(str.replace(".Net", ".Net Technology")); // This is a fuction, which replace arg1 with arg2 in string.
console.log(str.split(" "));

console.log(str.substring(10, 20)); // arg1: starting index, arg2: ending index
console.log(str.substr(10,10)); // arg1: starting index, arg2: length from starting

console.log(str.charAt(1));

console.log("Name".concat(": ","Dhruvil"));

console.log(str.startsWith("My"));
console.log(str.endsWith("My"));
console.log(str.includes("Dhruvil"));

console.log("Dhruvil".padStart(10, "-"));
console.log("Dhruvil".padEnd(25, "."));

console.log("Dhruvil".repeat(3));

console.log("Dhruvil".toUpperCase());
console.log("Dhruvil".toLowerCase());

console.log("    Dhruvil    ".trim());
console.log("    Dhruvil    ".trimStart());
console.log("    Dhruvil    ".trimEnd());

console.log("Dhruvil".toString());
