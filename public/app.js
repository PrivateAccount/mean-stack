var myApp = angular.module('myApp', ['ngSanitize']).controller('mainController', [

    '$scope', '$http', '$sce',

    function ($scope, $http, $sce) {

        $scope.getIndex = function () {
            $http.get('/index').then(function (response) {
                console.log(response);
                $scope.mainContent = $sce.trustAsHtml(response.content);
            });
        };

        $scope.showLoginForm = function () {
            $http.get('/login').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response);
            });
        };

        $scope.showAdminPanel = function () {
            $http.get('/admin').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response);
            });
        };

        $scope.getIndex();

    }
]);
