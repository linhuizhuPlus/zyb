/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.controllers').controller('SafeCookPayController', function ($scope, SafeCookPayService) {
    var init = function () {
        $scope.payInfo = {};
        $scope.payInfo.index = 0;

        // 获取投保信息
        $scope.insureInfo = SafeCookPayService.getInsureInfo();
    };

    /**
     * 选择tab
     * @param index
     */
    $scope.selectItem = function (index) {
        $scope.payInfo.index = index;
    };

    init();
});