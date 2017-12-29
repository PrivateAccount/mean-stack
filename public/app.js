var myApp = angular.module('myApp', ['ngSanitize']).controller('mainController', [

    '$scope', '$http', '$sce',

    function ($scope, $http, $sce) {

        $scope.formData = {};

        $scope.getIndexPage = function () {
            $http.get('/index').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.showLoginForm = function () {
            $http.get('/login').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.showRegisterForm = function () {
            $http.get('/register').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.showAdminPanel = function () {
            $http.get('/admin').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.getBlogPage = function () {
            $http.get('/blog').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.getContactPage = function () {
            $http.get('/contact').then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.content);
            });
        };

        $scope.doLogin = function () {
            console.log('login:', $scope.formData);
        };

        $scope.doRegister = function () {
            console.log('register:', $scope.formData);
        };

        $scope.getIndexPage();

    }

]);
