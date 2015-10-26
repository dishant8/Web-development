(function () {
    'use strict';

    angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope) {
        $scope.user = $rootScope.user;
        var user = null;
        if ($rootScope.user != null) {
            $scope.user = $rootScope.user;
            user = $rootScope.user;

            var findForms = function () {
                FormService.findAllFormsForUser(user.userName, function (formsFound) {
                    $scope.forms = formsFound;
                })
            };
            findForms();


            $scope.addForm = function (formName) {
                if (formName) {
                    var formObject = {
                        name: $scope.formName
                    }

                    FormService.createFormForUser(user.userName, formObject, function (form) {
                        $scope.forms.push(form);
                        console.log(form);
                        $scope.formName = "";
                    })
                }
                else {
                    alert("Enter name for a form");
                }
            }

            $scope.updateForm = function (formName) {
                if (formName) {
                    alert("Update form  " + formName);
                } else {
                    alert("Enter name for a form")
                }
            }

            $scope.deleteForm = function (index) {
                console.log(index);
                $scope.forms.splice(index, 1);

            }

            $scope.selectForm = function (index) {
                console.log(index);

                alert("Index of Form Selected " + index);

            }
        }
    }

})();