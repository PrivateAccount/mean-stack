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
            $http.post('/login', $scope.formData).then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.message);
            });
        };

        $scope.doRegister = function () {
            console.log('register:', $scope.formData);
            $http.post('/register', $scope.formData).then(function (response) {
                $scope.mainContent = $sce.trustAsHtml(response.data.message);
            });
        };

        $scope.doLoginX = function () {
            console.log('login x:', $scope.formData);
        };

        $scope.doRegisterX = function () {
            console.log('register x:', $scope.formData);
        };

        $scope.getIndexPage();

    }

]);
