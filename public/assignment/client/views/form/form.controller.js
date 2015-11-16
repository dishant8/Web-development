(function () {
    'use strict';

    angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope) {
        $scope.user = $rootScope.user;

        //        var formForUpdate = $scope.selectedformOfUser;
        //    console.log("FORM FOR UPDATE  " + formForUpdate.title);
        var user = null;
        var formForUpdate;

        if ($rootScope.user != null) {
            user = $rootScope.user;
            var findForms = function () {
                console.log("YOU ARE IN Controller" + user.id);
                FormService.findAllFormsForUser(user.id)
                    .then(function (forms) {
                        $scope.forms = forms;
                    })
            };
            findForms();


            $scope.addForm = function (formName) {
                if (formName) {
                    var formObject = {
                        "id": 0,
                        "title": $scope.formName
                    }

                    FormService.createFormForUser(user.id, formObject).then(function (forms) {
                        $scope.forms = forms;
                        $scope.formName = "";
                    })
                }
                else {
                    alert("Enter name for a form");
                }
            }

            $scope.updateForm = function () {
                console.log(formForUpdate.id);
                var formId = formForUpdate.id;
                var newForm = {
                    title: $scope.formName
                }
                if (formForUpdate) {
                    FormService.updateFormById(formId, newForm)
                        .then(function (forms) {
                            $scope.forms = forms;
                            $scope.formName = "";
                        })
                } else {
                    alert("Select Form to update")
                }

            }

            $scope.deleteForm = function (form) {
                var formId = form.id;
                console.log("FORM ID" + form);
                FormService.deleteFormById(formId)
                    .then(function (forms) {
                        $scope.forms = forms;
                    })
            }

            $scope.selectForm = function (form) {
                console.log("FORM----" + form);
                $scope.selectedformOfUser = form;
                formForUpdate = form;
                console.log("BCCCC  " + $scope.selectedformOfUser.title);
                $scope.formName = form.title;
                var index = $scope.forms.indexOf(form);
                FormService.selectForm(form.id)
                    .then(function (forms) {
                        $scope.forms = forms;
                    })
            }
        }
    }

})();