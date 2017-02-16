/**
 * Created by zhang on 2017/1/8.
 */
angular.module('app.filters').filter('unit', function () {
    return function (number) {
        return (number / 10000) + '万';
    }
});