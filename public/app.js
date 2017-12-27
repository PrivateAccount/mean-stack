var myApp = angular.module('myApp', []);

function mainController($scope, $http) {

    $scope.formData = {};
    $scope.layout = {
        index: '../templates/index',
        login: '../templates/login',
        admin: '../templates/admin',
        list: '../templates/list',
        form: '../templates/form',
        stats: '../templates/stats',
    };

    $scope.getIndex = function () {
        $http.get('/templates/index')
            .success(function (data) {
                $scope.mainContent = data;
            })
            .error(function (data) {});
    };

    $scope.showLoginForm = function () {
        $http.get('/templates/login')
            .success(function (data) {
                $scope.mainContent = data;
            })
            .error(function (data) {});
    };

    $scope.showAdminPanel = function () {
        $http.get('/templates/admin')
            .success(function (data) {
                $scope.mainContent = data;
            })
            .error(function (data) {});
    };

    $scope.getTodos = function () {
        $http.get('/api/todos')
            .success(function (data) {
                $scope.todos = data;
            })
            .error(function (data) {});
    };

    $scope.createTodo = function () {
        $http.post('/api/todo', $scope.formData)
            .success(function () {
                $scope.formData = {};
                $scope.getTodos();
            })
            .error(function () {});
    };

    $scope.editTodo = function (id) {
        $http.get('/api/todo/' + id)
            .success(function (data) {
                $scope.formData = data;
            })
            .error(function (data) {});
    };

    $scope.updateTodo = function (id) {
        $http.put('/api/todo/' + id, $scope.formData)
            .success(function () {
                $scope.formData = {};
                $scope.getTodos();
            })
            .error(function () {});
    };

    $scope.deleteTodo = function (id) {
        $http.delete('/api/todo/' + id)
            .success(function () {
                $scope.getTodos();
            })
            .error(function () {});
    };

    $scope.getIndex();

};
