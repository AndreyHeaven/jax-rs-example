/**
 * Created by araigorodskiy on 08.06.2017.
 */
angular.module("accountManager", [])
    .controller("userController", function($scope, $http) {

        //$scope.users = [{"login":"login2","displayName":"User User 2","password":"password2","birthday":1496916396207,"gender":false},{"login":"login1","displayName":"User User 1","password":"password1","birthday":1496916396206,"gender":true}];
        var query = "/JaxRsMicroservice/rest/users/";

        $http.get(query).
            then(function(response) {
                $scope.users = response.data;
            });
    });