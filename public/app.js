var myApp = angular.module('myApp', ['ngSanitize']).controller('mainController', [

    '$scope', '$http', '$sce',

    function ($scope, $http, $sce) {

        $scope.getIndexPage = function () {
            console.log('Request do serwera... getIndexPage');
            $http.get('/index').then(function (response) {
                console.log('łapiemy:', response);
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.showLoginForm = function () {
            console.log('Request do serwera... showLoginForm');
            $http.get('/login').then(function (response) {
                console.log('łapiemy:', response);
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.showRegisterForm = function () {
            console.log('Request do serwera... showRegisterForm');
            $http.get('/register').then(function (response) {
                console.log('łapiemy:', response);
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.showAdminPanel = function () {
            $http.get('/admin').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.getIndexPage();

    }
]);
