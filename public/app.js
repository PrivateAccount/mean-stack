var myApp = angular.module('myApp', ['ngSanitize']).controller('mainController', [

    '$scope', '$http', '$sce',

    function ($scope, $http, $sce) {

        $scope.getIndex = function () {
            $http.get('/index')
                .success(function (data) {
                    $scope.mainContent = $sce.trustAsHtml(data);
                })
                .error(function (data) {});
        };

        $scope.showLoginForm = function () {
            $http.get('/login')
                .success(function (data) {
                    $scope.mainContent = $sce.trustAsHtml(data);
                })
                .error(function (data) {});
        };

        $scope.showAdminPanel = function () {
            $http.get('/admin')
                .success(function (data) {
                    $scope.mainContent = $sce.trustAsHtml(data);
                })
                .error(function (data) {});
        };

        $scope.getIndex();

    }
]);
