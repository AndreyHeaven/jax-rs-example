//Query factory
angular.module("accountManager").factory('userFactory', function ($http) {
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