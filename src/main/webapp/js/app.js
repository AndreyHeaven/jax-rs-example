/**
 * Created by araigorodskiy on 08.06.2017.
 */
angular.module("accountManager", [])
    .controller("userController", function($scope, $http) {

        //$scope.users = [{"login":"login2","displayName":"User User 2","password":"password2","birthday":1496916396207,"gender":false},{"login":"login1","displayName":"User User 1","password":"password1","birthday":1496916396206,"gender":true}];
        var query = "/JaxRsMicroservice/rest/users/";

        $scope.reload = function() {
            $http.get(query).then(function (response) {
                $scope.users = response.data;
            });
        };

        $scope.add = function(personalDetail){
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