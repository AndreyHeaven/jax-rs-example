/**
 * Created by araigorodskiy on 08.06.2017.
 */
var app = angular.module("accountManager", ['ui.bootstrap']);

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
            var usr = angular.copy(user);
            url = query + usr.login;
            delete usr.login;
            return $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: user});
        },
        deleteUser: function (user) {
            url = query + user.login;
            return $http.delete(url);
        },
        updateUser: function (user) {
            var usr = angular.copy(user);
            url = query + usr.login;
            delete usr.login;
            return $http({
                method: 'PUT',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: user});
        }
    };
});

// CRUD controller
app.controller("userController", function($scope, userFactory, $uibModal) {

        $scope.genders = [{key: "true", value: "Мужской"}, {key: "false", value: "Женский"}];

        $scope.reload = function() {
            userFactory.getUsers().then(function (response) {
                $scope.users = response.data;
            }).catch(function (response) {
                $scope.error = "Ошибка получения списка пользователей! " + response.status;
            });
        };

        $scope.add = function(personalDetail){
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'AddUserModalContent.html',
                controller: 'AddUserModalCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    item: function () {
                        return {};
                    }
                }
            });

            modalInstance.result.then(function (item) {
                $scope.save(item, true).then(function () {
                    $scope.reload()
                });

            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.edit = function(personalDetail){
            personalDetail.gender = personalDetail.gender != null
                ? (personalDetail.gender ? "true" : "false") : null;

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'AddUserModalContent.html',
                controller: 'AddUserModalCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    item: function () {
                        return personalDetail;
                    }
                }
            });

            modalInstance.result.then(function (item) {
                $scope.save(item, false).then(function () {
                    $scope.reload()
                });
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.save = function(user, isNew){
            if (user.login) {
                return (isNew ? userFactory.addUser : userFactory.updateUser)(user);
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
        // $scope.user = data;
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'DeleteUserModalContent.html',
            controller: 'DeleteUserModalCtrl',
            controllerAs: '$ctrl',
            resolve: {
                item: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (item) {
            $scope.delete(item)
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.reload();
});

app.controller('DeleteUserModalCtrl', function ($scope, $uibModalInstance, item) {
    var $ctrl = this;
    $scope.item = item;

    $ctrl.ok = function () {
        $uibModalInstance.close(item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('AddUserModalCtrl', function ($scope, $uibModalInstance, item, $filter) {
    var $ctrl = this;
    $ctrl.item = item;
    $scope.item = item;


    $ctrl.ok = function () {
        //if (typeof item.birthday === 'object'){
            item.birthday = $filter('date')(item.birthday,'dd.MM.yyyy');
        //}
        $uibModalInstance.close(item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});