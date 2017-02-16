angular.module('app.controllers').controller('SafeCookProductDetailController', function ($scope, $state, SafeCookProductDetailService) {
    var productCode = 'P000010';
    $scope.productDetail = {};

    var init = function () {
        getProductDetail();
    };

    /**
     * 选择查看保障范围，产品介绍还是理赔须知
     * @param index
     */
    $scope.selectItem = function (index) {
        $scope.productDetail.index = index;
    };

    /**
     * 选择产品
     * @param product
     */
    $scope.selectProduct = function (product) {
        $scope.selectedProduct = product;
        $scope.productDetail.index = 0; // 选择产品之后总是显示保障范围
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
     * 保存数据，支付跳转
     */
    $scope.pay = function () {
        SafeCookProductDetailService.setSelectedProduct($scope.selectedProduct);

        $state.go('SafeCookInsureInfo');
    };

    /**
     * 获取产品详情
     * @returns {*}
     */
    function getProductDetail() {
        return SafeCookProductDetailService.getProductDetail(productCode).then(function (data) {
            $scope.productDetail = data;

            // 将选中的产品类型选中为第一个
            $scope.selectedProduct = data && data.prodSchemeList && data.prodSchemeList[0];
            $scope.productDetail.index = 0;
        })
    }

    // 初始化页面
    init();
});