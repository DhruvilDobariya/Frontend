// Default parameter
function sum1(a, b){
    console.log(a+b);
}

// Default parameter value
function sum2(a, b = 10){
    console.log(a+b);
}

// Rest parameter
function sum3(...arr){
    ans = 0;
    for(let element of arr){
        ans += element;
    }

    console.log(ans);
}

// Arguments as a object
// JS have a build in object which is argument that stores argument as a array.
function sum4(){
    ans = 0;
    for(let element of arguments){
        ans += element;
    }

    console.log(ans);
}

sum1(10,20);
sum2(30);
sum3(10,20,30,10);
sum4(10,20,30,10);