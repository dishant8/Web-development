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

                var formId = formForUpdate._id;
                var newForm = {
                    "idForUser": user._id,
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
                var formId = form._id;
                FormService.deleteFormById(formId)
                    .then(function (forms) {
                        $scope.forms = forms;
                    })
            }

            $scope.selectForm = function (form) {
                formForUpdate = form;
                $scope.formName = form.title;
                FormService.findAllFormsForUser(user._id)
                    .then(function (forms) {
                        var formsAfterSelect = [];
                        for (var i = 0; i < forms.length; i++) {
                            if (forms[i]._id != form._id) {
                                formsAfterSelect.push(forms[i]);
                            }
                        }
                        $scope.forms = formsAfterSelect;
                    })
            }
        }
    }

})();