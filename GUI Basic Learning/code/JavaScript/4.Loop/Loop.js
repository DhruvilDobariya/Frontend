// 1) While: 
var a = [1, 4, 7, 8, 21];
var i = 0;
while(i < a.length){ // array.length is a function of array, which return array length. So here a.length = 5.
    console.log(a[i]);
    i++;
}

// 2) For: 
for(var j = 0;j < a.length;j++){
    console.log(a[j]);
}

// 3) Do While: 
var k = 0;
do{
    console.log(a[k]);
    k++;
}while(k < a.length)

// 4) For Each:
a.forEach((element)=>{
    console.log(element)
});
// OR
for(let element of a){
    console.log(element);
}

// 5) For in:
for(let key in a){
    console.log(a[key]);
}
