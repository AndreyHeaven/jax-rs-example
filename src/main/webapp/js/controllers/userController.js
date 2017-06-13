var app = angular.module("accountManager", ['ui.bootstrap']);

//Query factory
app.factory('userFactory', function ($http) {
    var query = "rest/users/";
    var url;
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
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: user
            });
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
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: user
            });
        }
    };
});

// CRUD контроллер
app.controller("userController", function ($scope, userFactory, $uibModal) {

    $scope.genders = [{key: "true", value: "Мужской"}, {key: "false", value: "Женский"}];

    //Загрузить все записи
    $scope.reload = function () {
        userFactory.getUsers().then(function (response) {
            $scope.users = response.data;
        }).catch(function (response) {
            $scope.error = "Ошибка получения списка пользователей! " + response.status;
        });
    };

    //Диалог редактирования
    $scope.edit = function (item) {
        var personalDetail = angular.copy(item);
        if (personalDetail) {
            personalDetail.gender = personalDetail.gender != null
                ? (personalDetail.gender ? "true" : "false") : null;
        }

        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/templates/editUserModalTemplate.html',
            controller: 'AddUserModalCtrl',
            controllerAs: '$ctrl',
            resolve: {
                item: function () {
                    return personalDetail ? personalDetail: {};
                }
            }
        });

        modalInstance.result.then(function (item) {
            $scope.reload()
        }, function () {
            $scope.reload();
        });
    };

    //Удаление записи
    $scope.delete = function (user) {
        userFactory.deleteUser(user)
            .then(function (response) {
                $scope.reload();
            }).catch(function (response) {
            $scope.error = "Ошибка удаления пользователя! " + response.status;
        });
    };

    //Диалог подтверждения удаления
    $scope.offerDel = function (data) {
        // $scope.user = data;
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/templates/deleteUserModalTemplate.html',
            controller: 'DeleteUserModalCtrl',
            controllerAs: '$ctrl',
            resolve: {
                item: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (item) {
            $scope.delete(item);
        }, function () {
            $scope.reload();
        });
    };

    $scope.reload();
});

//Контроллер удаления записи
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

//Контроллер добавления/редактирования записи
app.controller('AddUserModalCtrl', function ($scope, userFactory, $uibModalInstance, item, $filter) {
    var $ctrl = this;
    $ctrl.item = item;
    $scope.item = item;


    $scope.save = function (user, isNew) {
        return (isNew ? userFactory.addUser : userFactory.updateUser)(user);
    };

    $ctrl.ok = function (isNew) {
        //if (typeof item.birthday === 'object'){
        item.birthday = $filter('date')(item.birthday, 'dd.MM.yyyy');
        //}
        $scope.save(item, isNew).then(function () {
            $uibModalInstance.close(item);
        }).catch(function (response) {
            if (response.status === 409) {
                $scope.error = "Пользователь с данным логином уже существует";
            } else {
                $scope.error = "Ошибка сохранения";
            }
        });
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});