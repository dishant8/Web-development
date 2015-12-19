(function () {
    angular
        .module("FoodOrderApp")
        .controller("ReciepeProfileController", ReciepeProfileController);

    function ReciepeProfileController($routeParams, ReciepeService, UserService, $location, $rootScope) {
        var user = $rootScope.user;
        var model = this;

        model.addToReciepe = addToReciepe;
        model.updateReciepe = updateReciepe;
        model.selectReciepe = selectReciepe;
        model.deleteReciepe = deleteReciepe;

        var reciepeForUpdate;

        function displayReciepe() {
            model.allReciepes = user.seller.reciepes;
        }

        displayReciepe();

        function addToReciepe() {
            if (model.reciepeName && model.reciepeDescription) {
                var reciepeName = model.reciepeName;
                var reciepeDescription = model.reciepeDescription;
                var reciepe = {
                    "reciepeName": reciepeName,
                    "reciepeDescription": reciepeDescription
                }
                ReciepeService.createNewReciepe(user._id, reciepe)
                    .then(function (user) {
                        model.reciepeName = "";
                        model.reciepeDescription = "";
                        model.allReciepes = user.seller.reciepes;
                    })
            }
            else {
                alert("Provide name and description for reciepe")
            }
        }

        function deleteReciepe(reciepeId) {
//            console.log("AYAAAA");
            ReciepeService.deleteReciepe(user._id, reciepeId)
                .then(function (user) {
                    var check = user.seller.menu;
                    for (var i = 0; i < check.length; i++) {
                        //                        console.log("DELETED" + check[i].item);
                    }
                    model.allReciepes = user.seller.reciepes;

                })
        }

        function selectReciepe(reciepeId, reciepeName, reciepeDescription) {
  //          console.log("RECIPE NAME" + reciepeName);
//            console.log("AYAAAA");
            reciepeForUpdate = reciepeId;
            model.reciepeName = reciepeName;
            model.reciepeDescription = reciepeDescription;
            var reciepeAfterSelect = [];
            //var reciepes = user.seller.reciepes;

            UserService.findUserById(user._id)
                .then(function (user) {
                    reciepes = user.seller.reciepes;
                    for (var i = 0; i < reciepes.length; i++) {
                        if (reciepes[i]._id != reciepeId) {
                            reciepeAfterSelect.push(reciepes[i]);
                        }
                    }
                    model.allReciepes = reciepeAfterSelect;
                })
        }

        function updateReciepe() {
            var reciepeId = reciepeForUpdate;
            var reciepe = {
                "_id": reciepeId,
                "reciepeName": model.reciepeName,
                "reciepeDescription": model.reciepeDescription
            }

            if (model.reciepeName) {
                ReciepeService.updateReciepe(user._id, reciepe)
                    .then(function (user) {
                        model.allReciepes = user.seller.reciepes;
                        model.reciepeName = "";
                        model.reciepeDescription = "";
                    })
            }
            else {
                alert("Select Reciepe to Edit");
            }
        }
    }
})();