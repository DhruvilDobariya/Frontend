// Problem
console.log('Problem');
const addWith50SmartWay = num => {
    let lookup = {};
    if (num in lookup) {
        return lookup[num];
    }
    console.log('Not found, It will take time...');
    for (i = 0; i < 100000000; i++) {}
    lookup[num] = num + 50;
    return lookup[num];
};

console.log(addWith50SmartWay(100));
console.log(addWith50SmartWay(100));
console.log(addWith50SmartWay(200));
console.log(addWith50SmartWay(100));
console.log(addWith50SmartWay(200));
// It should calculate every time because,  lookup evry time overwrite, when we calling function.

// Solution
console.log('After Solution');
const addWith50WithClosure = () => {
    // outer part of function
    let lookup = {};
    return function (num) {
        // inner part of function
        if (num in lookup) {
            return lookup[num];
        }
        console.log('Not found, It will take time...');
        for (i = 0; i < 100000000; i++) {}
        lookup[num] = num + 50;
        return lookup[num];
    };
};

const initAdd50WithClosure = addWith50WithClosure();
console.log(initAdd50WithClosure(100));
console.log(initAdd50WithClosure(100));
console.log(initAdd50WithClosure(200));
console.log(initAdd50WithClosure(100));
console.log(initAdd50WithClosure(200));
