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
app.controller("userController", function($scope, userFactory, $uibModal) {

        var query = "/JaxRsMicroservice/rest/users/";

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
                $scope.save(item, true);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.edit = function(personalDetail){
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
                $scope.save(item, false);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.save = function(user, isNew){
            if (user.login) {
                (isNew ? userFactory.addUser : userFactory.updateUser)(user);
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

app.controller('AddUserModalCtrl', function ($scope, $uibModalInstance, item) {
    var $ctrl = this;
    $ctrl.item = item;
    $scope.item = item;


    $ctrl.ok = function () {
        $uibModalInstance.close(item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});