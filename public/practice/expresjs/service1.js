var express = require('express');
var app = express();


var courses = [
    { title: "java101", seats: 12, start: new Date() },
    { title: "java101", seats: 12, start: new Date() },
    { title: "java101", seats: 12, start: new Date() },
    { title: "java101", seats: 12, start: new Date() }
];

app.get("/api/hello", sayHello);
app.get("/api/course", function (req, res) {
    var index = req.params.id;
    console.log(index);
    res.json(courses);
})

app.delete("/api/course/:id", function (req, res) {
    var index = req.params.id;
    console.log(index);
    res.json(courses[index]);
})


app.get("/api/course/:id", function (req, res) {
    var index = req.params.id;
    console.log(index);
    res.json(courses[index]);
})

app.get("/api/json", function (req, res) {
    var course = {
        title: "java",
        seats: 23,
        start: new Date()
    };
    res.json(course);
});

function sayHello(req, res) {
    //console.log("hello");
    res.send("say Hello")
}


function getCourses(req, res) { }


app.listen(3000);
