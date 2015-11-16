'use strict';
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController(FieldService, $routeParams) {
        var model = this;
        model.addField = addField;
        model.removeField = removeField;
        model.fields = [];
        function init() {
            var fid = $routeParams.formId;
            FieldService.getFieldsForForm(fid)
                .then(function (fieldsForForm) {
                    model.fields = fieldsForForm;
                });
        }
        init();
        function addField(fieldType) {
            console.log("aya");
            var fid = $routeParams.formId;
            //var uid = $routeParams.userId;
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
                    model.fields = formFields;
                });
        }
        function removeField(fieldId) {
            var fid = $routeParams.formId;
            FieldService.deleteFieldFromForm(fid, fieldId)
                .then(function (restFields) {
                    model.fields = restFields;
                });
        }
    };
})();