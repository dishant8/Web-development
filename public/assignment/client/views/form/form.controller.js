(function () {
    'use strict';

    angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $location) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;

        var user = null;
        var formForUpdate;

        if ($rootScope.user != null) {
            user = $rootScope.user;

            var findForms = function () {
                FormService.findAllFormsForUser(user._id)
                    .then(function (forms) {
                        $scope.forms = forms;
                    })
            };
            findForms();


            $scope.addForm = function (formName) {
                if (formName) {
                    var formObject = {
                        "idForUser": user._id,
                        "title": $scope.formName
                    }
                    console.log("IDDDD" + user._id);
                    FormService.createFormForUser(user._id, formObject)
                        .then(function (forms) {
                            $scope.forms = forms;
                            $scope.formName = "";
                        })
                }
                else {
                    alert("Enter name for a form");
                }
            }

            $scope.updateForm = function () {

                var formId = formForUpdate.id;
                var newForm = {
                    title: $scope.formName
                }
                if ($scope.formName) {
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

                FormService.deleteFormById(formId)
                    .then(function (forms) {
                        $scope.forms = forms;
                    })
            }

            $scope.selectForm = function (form) {
                $scope.selectedformOfUser = form;
                formForUpdate = form;

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