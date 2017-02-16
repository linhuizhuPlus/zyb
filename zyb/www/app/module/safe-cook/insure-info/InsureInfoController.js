/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.controllers').controller('SafeCookInsureInfoController', function ($scope, $state, $ionicLoading, CheckService, SafeCookInsureInfoService) {
    var price = 0; // 每份单价

    var init = function () {
        price = parseFloat(SafeCookInsureInfoService.getSelectedProduct().desc);

        $scope.baseInfo = {  // 购买份额与金额
            total: price,
            buyNum: 1
        };
        $scope.insured = {}; // 被保人信息
        $scope.policyHolder = {}; // 投保人信息
        $scope.address = {}; // 地址信息
        $scope.insurancePeriod = {}; // 保险期限

        $scope.insureInfo = {
            insuredChecked: true, // 默认被保人同投保人
            claimChecked: false // 条款是否已经阅读
        };
    };

    /**
     * 校验信息
     */
    var check = function () {
        if (!$scope.policyHolder.name) {
            return '请输入投保人姓名';
        }
        if (!$scope.policyHolder.certNo) {
            return '请输入投保人身份证号码';
        }
        if (!CheckService.checkIDCard($scope.policyHolder.certNo)) {
            return '请输入正确的投保人身份证号码';
        }
        if (!$scope.policyHolder.phoneNo) {
            return '请输入投保人手机号';
        }
        if (!CheckService.checkPhoneNumber($scope.policyHolder.phoneNo)) {
            return '请输入正确的投保人手机号';
        }
        if ($scope.policyHolder.email && !CheckService.checkEmail($scope.policyHolder.email)) {
            return '请输入正确的投保人邮箱'
        }
        if (!$scope.insured.name) {
            return '请输入被保险人姓名';
        }
        if (!$scope.insured.certNo) {
            return '请输入被保险人身份证号码';
        }
        if (!CheckService.checkIDCard($scope.insured.certNo)) {
            return '请输入正确的被保险人身份证号码';
        }
        if (!$scope.insured.phoneNo) {
            return '请输入被保险人手机号';
        }
        if (!CheckService.checkPhoneNumber($scope.insured.phoneNo)) {
            return '请输入正确的被保险人手机号';
        }
        if ($scope.insured.email && !CheckService.checkEmail($scope.insured.email)) {
            return '请输入正确的被保险人邮箱'
        }
        if (!$scope.address.address) {
            return '请输入财产地址';
        }
        if (!$scope.insurancePeriod.startDate) {
            return '请选择保险起期';
        }
        if (!$scope.insurancePeriod.endDate) {
            return '请选择保险终期';
        }
        if ($scope.insurancePeriod.startDate.getTime() > $scope.insurancePeriod.endDate.getTime()) {
            return '请确保保险终期在保险起期之后';
        }
        if (!$scope.insureInfo.claimChecked) {
            return '请同意保险条款';
        }
    };

    /**
     * 获取数字的整数部分
     * @param num
     */
    $scope.getInt = function (num) {
        return parseInt(num);
    };

    /**
     * 获取数字的小数部分，保留两位小数
     * @param num
     */
    $scope.getDecimal = function (num) {
        var fullNum = parseFloat(num);
        var intNum = parseInt(num);

        return (fullNum-intNum).toFixed(2).substring(1);
    };

    /**
     * 减少份额
     */
    $scope.sub = function () {
        if ($scope.baseInfo.buyNum > 1) {
            $scope.baseInfo.buyNum--;
            $scope.baseInfo.total = price * $scope.baseInfo.buyNum;
        }
    };

    /**
     * 增加份额
     */
    $scope.add = function () {
        $scope.baseInfo.buyNum++;
        $scope.baseInfo.total = price * $scope.baseInfo.buyNum;
    };

    /**
     * 更改被保人是否同投保人
     */
    $scope.changeInsured = function () {
        $scope.insureInfo.insuredChecked = !$scope.insureInfo.insuredChecked;
    };

    /**
     * 更改条款阅读状态
     */
    $scope.changeClaim = function () {
        $scope.insureInfo.claimChecked = !$scope.insureInfo.claimChecked;
    };

    /**
     * 投保
     */
    $scope.insure = function () {
        // 如果被保人同投保人，则将信息填入被保人
        if ($scope.insureInfo.insuredChecked) {
            angular.extend($scope.insured, $scope.policyHolder);
        }
        // 校验信息
        var message = check();
        if (message) {
            $ionicLoading.show({
                template: message,
                duration: 2000
            });

            // 清楚被保人信息
            if ($scope.insureInfo.insuredChecked) {
                $scope.insured = {};
            }
        } else {
            SafeCookInsureInfoService.insure($scope.policyHolder, $scope.insured, $scope.address, $scope.insurancePeriod, $scope.baseInfo).then(function () {
                $state.go('pay');
            }).catch(function (err) {
                $ionicLoading.show({
                    template: '投保失败',
                    duration: 2000
                });
                // 测试
                $state.go('pay');
            });
        }
    };

    init();
});