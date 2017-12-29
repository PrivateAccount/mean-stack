var myApp = angular.module('myApp', ['ngSanitize']).controller('mainController', [

    '$scope', '$http', '$sce',

    function ($scope, $http, $sce) {

        $scope.action = null;
        $scope.formData = {};

        $scope.getIndexPage = function () {
            $scope.action = 'index';
        };

        $scope.showLoginForm = function () {
            $scope.action = 'login';
        };

        $scope.showRegisterForm = function () {
            $scope.action = 'register';
        };

        $scope.showAdminPanel = function () {
            $scope.action = 'admin';
        };

        $scope.getBlogPage = function () {
            $scope.action = 'blog';
        };

        $scope.getContactPage = function () {
            $scope.action = 'contact';
        };

        $scope.doLogin = function () {
            $scope.action = 'pending';
            $http.post('/login', $scope.formData).then(function (response) {
                console.log(response);
                if (response.data.success) {
                    $scope.action = 'admin';
                } else {
                    $scope.action = 'login';
                }
            });
        };

        $scope.doRegister = function () {
            $scope.action = 'pending';
            $http.post('/register', $scope.formData).then(function (response) {
                console.log(response);
                if (response.data.success) {
                    $scope.action = 'admin';
                } else {
                    $scope.action = 'register';
                }
            });
        };

        $scope.getIndexPage();

    }

]);
