var myApp = angular.module('myApp', ['ngSanitize']).controller('mainController', [

    '$scope', '$http', '$sce',

    function ($scope, $http, $sce) {

        $scope.getIndex = function () {
            $http.get('/index').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.showLoginForm = function () {
            $http.get('/login').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.showAdminPanel = function () {
            $http.get('/admin').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.getIndex();

    }
]);
