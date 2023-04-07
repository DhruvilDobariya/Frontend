function fun() {
    if (true) {
        var x = '1';
        let z = '3';
        const w = '2';
        y = 4;
    }
    console.log(x);
    // console.log(z);
    // console.log(y);
}
fun();
console.log(x);

// let and const have block level scope, but const should't modify after initialize, but let should.
// var have function level scope.
// nothing have globle level scope.
