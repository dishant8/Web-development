module.exports = function (app, mongoose, db) {

    var userModel = require("./models/user.model.js")(mongoose, db);
    //    var formModel = require("./models/form.model.js")(mongoose, db);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/menu.service.server.js")(app, userModel);
    require("./services/foodCart.service.server.js")(app, userModel);
    require("./services/reciepe.service.server.js")(app, userModel);
    require("./services/review.service.server.js")(app, userModel);
    //require("./services/form.service.server.js")(app, formModel);
    //require("./services/field.service.server.js")(app, formModel);

};