(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService) {
        var fields = [];
        function findFields() {
            console.log("idhar aya");
            var formid = $routeParams.formId;
            FieldService.getFieldsForForm(formid)
                .then(function (fields) {
                    $scope.fields = fields;
                });
        }
        findFields();

        $scope.addField = function (fieldType) {
            var fid = $routeParams.formId;
            var newField;
            if (fieldType == "Single Line Text Field") {
                newField = { "id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field" };
            }
            else if (fieldType == "Multi Line Text Field") {
                newField = { "id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field" };
            }
            else if (fieldType == "Date Field") {
                newField = { "id": null, "label": "New Date Field", "type": "DATE" };
            }
            else if (fieldType == "Dropdown Field") {
                newField = {
                    "id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        { "label": "Option 1", "value": "OPTION_1" },
                        { "label": "Option 2", "value": "OPTION_2" },
                        { "label": "Option 3", "value": "OPTION_3" }
                    ]
                };
            }
            else if (fieldType == "Checkboxes Field") {
                newField = {
                    "id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        { "label": "Option A", "value": "OPTION_A" },
                        { "label": "Option B", "value": "OPTION_B" },
                        { "label": "Option C", "value": "OPTION_C" }
                    ]
                };
            }
            else if (fieldType == "Radio Buttons Field") {
                newField = {
                    "id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        { "label": "Option X", "value": "OPTION_X" },
                        { "label": "Option Y", "value": "OPTION_Y" },
                        { "label": "Option Z", "value": "OPTION_Z" }
                    ]
                };
            }
            var allFields = [];

            if (newField != undefined) {
                allFields.push(newField);
            }
            FieldService.createFieldForForm(fid, newField)
                .then(function (formFields) {
                    $scope.fields = formFields;
                });
        }

        $scope.removeField = function (fieldId) {
            var formid = $routeParams.formId;
            FieldService.deleteFieldFromForm(formid, fieldId)
                .then(function (fields) {
                    $scope.fields = fields;
                });
        }
    };
})();