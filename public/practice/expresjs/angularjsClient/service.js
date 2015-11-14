module.exports = function (app) {
    var users = [
        {
            firstName: "alice",
            lastName: "wonderland",
            username: "alice",
        },
        {
            firstName: "charlie",
            lastName: "garcia",
            username: "charlie.a",
        },
        {
            firstName: "bob",
            lastName: "marley",
            username: "bob.b",
        }
    ];

    app.get("/api/user/:id", function (req, res) {
        var index = req.params.id;
        res.send(users[index]);
    })

}