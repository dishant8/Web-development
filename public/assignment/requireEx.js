var otherfile = require("./otherFile.js");

console.log("hello from require");

console.log(otherfile.a + otherfile.b);

var square1 = require('./square.js');

var s1 = square1(12, 23, "sq1");


s1.setWidth(111);

console.log(s1);
console.log(s1.getName);

console.log(s1.getWidth);