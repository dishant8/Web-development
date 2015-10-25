(function () {
    angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

    function FormController($scope, FormService, $rootscope) {


        $scope.forms = FormService.forms;
        console.log($rootScope.user);
        console.log("aya");
        var formObject = {
            formName: $scope.formName
        }
    $scope.addForm = function(){
        FormService.createFormForUser($rootScope.userName, formObject, function (form) {
            console.log(form);

        })

    }

}

})();