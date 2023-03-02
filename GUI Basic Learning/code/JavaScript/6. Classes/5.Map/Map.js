let map = new Map([
    ["apple", 500],
    ["orange", 200], 
    ["banana", 300]
]);

console.log(map);
// properties
console.log(map.size);

// methods
console.log(map.get("banana"));
map.set("banana", 400);
console.log(map.get("banana"));
console.log(map.has("banana"));
map.delete("banana");
console.log(map);

console.log(map.keys());
console.log(map.values());

console.log(map.entries());

map.clear();
console.log(map);