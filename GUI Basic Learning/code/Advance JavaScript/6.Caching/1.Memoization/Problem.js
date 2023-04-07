// Problem
console.log('Problem');
const addWith50 = num => {
    console.log('It will take time...');
    for (i = 0; i < 100000000; i++) {}
    return num + 50;
};

console.log(addWith50(100));
console.log(addWith50(100));
console.log(addWith50(100));
console.log(addWith50(100));
//It should calculate value every time.

// Solution
// Now can solve this problem using memoization(Chaching)
console.log('After solution');

let lookup = {};
const addWith50SmartWay = num => {
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
// Now it should calculate once and save and after for same num it shouldn't calculate, it just return value form lookup.
