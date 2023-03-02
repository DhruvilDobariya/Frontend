let set = new Set();

set.add(1);
set.add(2);
set.add(1);

console.log(set);
console.log(set.size);
console.log(set.has(1));

console.log(set.keys());
console.log(set.values());

console.log(set.entries());

set.delete(2);
console.log(set);

set.clear();
console.log(set);
