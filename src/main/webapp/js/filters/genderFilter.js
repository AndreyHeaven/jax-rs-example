
//Фильтр для пола
angular.module("accountManager").filter('gender', function () {
    return function (item) {
        return (item != null ? (item ? "Мужской" : "Женский") : '');
    };
});