/**
 * Created by araigorodskiy on 08.06.2017.
 */
var app = angular.module("accountManager", []);

var url = "";

//Query factory
app.factory('userFactory', function ($http) {
    var query = "/JaxRsMicroservice/rest/users/";
    return {
        getUsers: function () {
            url = query;
            return $http.get(url);
        },
        getUser: function (user) {
            url = query + user.login;
            return $http.get(url);
        },
        addUser: function (user) {
            url = query;
            return $http.post(url, user);
        },
        deleteUser: function (user) {
            url = query + user.login;
            return $http.delete(url);
        },
        updateUser: function (user) {
            url = query + user.login;
            return $http.put(url, user);
        }
    };
});

// CRUD controller
app.controller("userController", function($scope, userFactory) {

        var query = "/JaxRsMicroservice/rest/users/";

        $scope.reload = function() {
            userFactory.getUsers().then(function (response) {
                $scope.users = response.data;
            }).catch(function (response) {
                $scope.error = "Ошибка получения списка пользователей! " + response.status;
            });
        };

        $scope.add = function(personalDetail){
            console.log("add");
        };

        $scope.edit = function(personalDetail){
            console.log("open");
        };

        $scope.save = function(user){
            if (user.login) {
                //TODO
            } else {
                //warning
            }
        };

        $scope.delete = function(user) {
            userFactory.deleteUser(user)
                .then(function (response) {
                    $scope.reload();
                }).catch(function (response) {
                    $scope.error = "Ошибка удаления пользователя! " + response.status;
                });
        };

    $scope.showconfirm = function (data) {
        $scope.user = data;
        $('#confirmModal').modal('show');
    };


    $scope.reload();
});