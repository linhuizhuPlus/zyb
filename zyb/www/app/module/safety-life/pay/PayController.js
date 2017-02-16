/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.controllers').controller('PayController', function ($scope, PayService) {
    var init = function () {
        $scope.payInfo = {};
        $scope.payInfo.index = 0;

        // 获取投保信息
        $scope.insureInfo = PayService.getInsureInfo();
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