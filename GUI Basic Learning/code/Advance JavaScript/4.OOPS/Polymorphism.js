class BaseCal{
    sum(a, b){
        return a+b;
    }
    sum(a, b, c){
        return a+b+c;
    }
}

class Cal extends BaseCal{
    sum(a, b){
        return a*b;
    }
}

let baseCal = new BaseCal();
console.log(baseCal.sum(2, 3)); // output: NaN
// because js don't support overloading, it support only overriding.
console.log(baseCal.sum(2, 3, 4)); // output: 9

let cal = new Cal();
console.log(cal.sum(2,3)); // output: 6


