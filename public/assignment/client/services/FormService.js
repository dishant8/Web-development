(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            selectForm: selectForm,
            guid: guid
        };

        return service;

        function createFormForUser(id, form) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user/" + id + "/form", form)
                .success(function (forms) {
                    deferred.resolve(forms);
                })
            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();


            $http.get("/api/assignment/form/user/" + userId)
                .success(function (forms) {
                    deferred.resolve(forms);
                })
            return deferred.promise;
        }

        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId)
                .success(function (forms) {
                    deferred.resolve(forms)
                })
            return deferred.promise;
        }

        function selectForm(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId)
                .success(function (forms) {
                    deferred.resolve(forms);
                })
            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId, newForm)
                .success(function (forms) {
                    deferred.resolve(forms);
                })
            return deferred.promise;
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }

    }

})();