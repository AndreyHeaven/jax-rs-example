/**
 * Created by araigorodskiy on 08.06.2017.
 */
angular.module("accountManager", [])
    .controller("userController", function($scope, $http) {

        var query = "/JaxRsMicroservice/rest/users/";

        $scope.reload = function() {
            $http.get(query).then(function (response) {
                $scope.users = response.data;
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
            if (confirm('Вы действительно хотите удалить запись?')) {
                $http.delete(query + user.login)
                    .then(function (response) {
                        $scope.reload();
                    });
            }
        };

        $scope.reload();
    });