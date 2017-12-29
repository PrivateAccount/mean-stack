var myApp = angular.module('myApp', ['ngSanitize']).controller('mainController', [

    '$scope', '$http', '$sce',

    function ($scope, $http, $sce) {

        $scope.action = null;
        $scope.layout = {
            index: '../templates/index.html',
            login: '../templates/login.html',
            register: '../templates/register.html',
            contact: '../templates/contact.html',
            blog: '../templates/blog.html',
            admin: '../templates/admin.html',
            users: '../templates/users.html',
            edit: '../templates/edit.html',
            pending: '../templates/pending.html',
        };
        $scope.formData = {};
        $scope.currentUser = {};
        $scope.usersList = [];

        $scope.getIndexPage = function () {
            $scope.action = 'index';
        };

        $scope.showLoginForm = function () {
            $scope.formData = {};
            $scope.action = 'login';
        };

        $scope.showRegisterForm = function () {
            $scope.formData = {};
            $scope.action = 'register';
        };

        $scope.showAdminPanel = function () {
            $scope.action = 'admin';
        };

        $scope.showUsersList = function () {
            $scope.action = 'pending';
            $http.get('/users').then(function (response) {
                $scope.usersList = response.data;
                $scope.action = 'users';
            });
        };

        $scope.editUser = function (id) {
            $scope.action = 'pending';
            $http.get('/user/' + id).then(function (response) {
                $scope.formData = response.data;
                $scope.action = 'edit';
            });
        };

        $scope.updateUser = function (id) {
            $scope.action = 'pending';
            $http.put('/user/' + id, $scope.formData).then(function (response) {
                console.log(response);
                $scope.action = 'users';
            });
        };

        $scope.deleteUser = function (id) {
            $scope.action = 'pending';
            $http.delete('/user/' + id).then(function (response) {
                console.log(response);
                $scope.action = 'users';
            });
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
                $scope.currentUser = response.data.result;
                console.log(response);
                if (response.data.result) {
                    $scope.action = 'admin';
                } else {
                    $scope.action = 'login';
                }
            });
        };

        $scope.doRegister = function () {
            $scope.action = 'pending';
            $http.post('/register', $scope.formData).then(function (response) {
                $scope.currentUser = {};
                $scope.action = 'index';
                console.log(response);
            });
        };

        $scope.getIndexPage();

    }

]);
